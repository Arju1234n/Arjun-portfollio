import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import slugify from 'slugify';
import { Project } from '../models/Project';
import { AppError } from '../middleware/error';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinary';
import { env } from '../config/env';

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new AppError('Only image uploads are allowed', 400) as any);
    cb(null, true);
  },
});

export const uploadCoverMiddleware = imageUpload.single('image');
export const uploadGalleryMiddleware = imageUpload.array('images', 12);

const pick = (obj: any, keys: string[]) =>
  Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]));

const PROJECT_FIELDS = [
  'title',
  'slug',
  'shortDescription',
  'fullDescription',
  'category',
  'status',
  'featured',
  'coverImage',
  'gallery',
  'demoVideo',
  'architectureDiagram',
  'githubUrl',
  'liveUrl',
  'docsUrl',
  'techStack',
  'features',
  'problemStatement',
  'solution',
  'myRole',
  'challenges',
  'learnings',
  'metrics',
  'displayOrder',
  'publishedAt',
];

const isValidUrl = (value?: string) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const normalizeProjectPayload = (body: any) => {
  const payload = pick(body, PROJECT_FIELDS);
  for (const field of ['githubUrl', 'liveUrl', 'docsUrl', 'coverImage']) {
    if (payload[field] === '') delete payload[field];
    if (payload[field] && !isValidUrl(payload[field])) throw new AppError(`${field} must be a valid URL`, 400);
  }
  if (payload.slug) payload.slug = slugify(payload.slug, { lower: true, strict: true });
  if (payload.title && !payload.slug) payload.slug = slugify(payload.title, { lower: true, strict: true });
  if (payload.status === 'published' && !payload.publishedAt) payload.publishedAt = new Date();
  return payload;
};

const cloudinaryPublicIdFromUrl = (url?: string) => {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return null;
  const [, path] = url.split('/upload/');
  const withoutVersion = path.replace(/^v\d+\//, '');
  return withoutVersion.replace(/\.[a-zA-Z0-9]+$/, '');
};

/** GET /projects */
export async function listProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, featured, page = '1', limit = '20', search, category, tech } = req.query as Record<string, string>;
    const filter: any = {};
    if (status)   filter.status   = status;
    if (featured) filter.featured = featured === 'true';
    if (category) filter.category = category;
    if (tech)     filter.techStack = { $in: tech.split(',').map((t) => new RegExp(`^${t.trim()}$`, 'i')) };
    if (search)   filter.$or = [
      { title:            { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { techStack:        { $regex: search, $options: 'i' } },
    ];

    const safePage = Math.max(parseInt(page, 10) || 1, 1);
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const skip  = (safePage - 1) * safeLimit;
    const [items, total] = await Promise.all([
      Project.find(filter).sort({ displayOrder: 1, createdAt: -1 }).skip(skip).limit(safeLimit),
      Project.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, meta: { page: safePage, limit: safeLimit, total, totalPages: Math.ceil(total / safeLimit) } });
  } catch (err) { next(err); }
}

/** GET /projects/featured */
export async function listFeaturedProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = Math.min(Math.max(parseInt(String(req.query.limit ?? '6'), 10) || 6, 1), 24);
    const items = await Project.find({ status: 'published', featured: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .limit(limit);
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
}

/** GET /projects/slug/:slug */
export async function getPublishedProjectBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findOne({ slug: req.params.slug, status: 'published' });
    if (!project) throw new AppError('Project not found', 404);
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

/** POST /projects */
export async function createProject(req: Request, res: Response, next: NextFunction) {
  try {
    const { title } = req.body;
    if (!title) throw new AppError('Title is required', 400);
    const payload = normalizeProjectPayload(req.body);
    const slug = payload.slug || slugify(title, { lower: true, strict: true });
    const existing = await Project.exists({ slug });
    if (existing) throw new AppError('Project slug already exists', 409);
    const count = await Project.countDocuments();
    const project = await Project.create({ ...payload, title, slug, displayOrder: payload.displayOrder ?? count });
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
}

/** GET /projects/:id */
export async function getProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new AppError('Project not found', 404);
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

/** PATCH /projects/:id */
export async function updateProject(req: Request, res: Response, next: NextFunction) {
  try {
    const updates = normalizeProjectPayload(req.body);
    if (updates.slug) {
      const existing = await Project.exists({ slug: updates.slug, _id: { $ne: req.params.id } });
      if (existing) throw new AppError('Project slug already exists', 409);
    }
    const previous = await Project.findById(req.params.id);
    if (!previous) throw new AppError('Project not found', 404);

    const project = await Project.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!project) throw new AppError('Project not found', 404);

    const deletedImageIds: string[] = [];
    if (typeof updates.coverImage === 'string' && previous.coverImage && previous.coverImage !== updates.coverImage) {
      const id = cloudinaryPublicIdFromUrl(previous.coverImage);
      if (id) deletedImageIds.push(id);
    }
    if (Array.isArray(updates.gallery)) {
      const nextGallery = new Set(updates.gallery);
      for (const image of previous.gallery) {
        if (!nextGallery.has(image)) {
          const id = cloudinaryPublicIdFromUrl(image);
          if (id) deletedImageIds.push(id);
        }
      }
    }
    if (deletedImageIds.length) {
      await Promise.allSettled(deletedImageIds.map((id) => deleteFromCloudinary(id)));
    }

    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

export const replaceProject = updateProject;

/** DELETE /projects/:id */
export async function deleteProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) throw new AppError('Project not found', 404);
    const ids = [project.coverImage, ...project.gallery].map(cloudinaryPublicIdFromUrl).filter(Boolean) as string[];
    await Promise.allSettled(ids.map((id) => deleteFromCloudinary(id)));
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) { next(err); }
}

/** POST /projects/reorder */
export async function reorderProjects(req: Request, res: Response, next: NextFunction) {
  try {
    const { order }: { order: { id: string; displayOrder: number }[] } = req.body;
    await Promise.all(order.map(({ id, displayOrder }) => Project.findByIdAndUpdate(id, { displayOrder })));
    res.json({ success: true, message: 'Reordered' });
  } catch (err) { next(err); }
}

export async function publishProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'published', publishedAt: new Date() }, { new: true });
    if (!project) throw new AppError('Project not found', 404);
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

export async function draftProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, { status: 'draft' }, { new: true });
    if (!project) throw new AppError('Project not found', 404);
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

export async function toggleFeaturedProject(req: Request, res: Response, next: NextFunction) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) throw new AppError('Project not found', 404);
    project.featured = typeof req.body.featured === 'boolean' ? req.body.featured : !project.featured;
    await project.save();
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
}

/** POST /projects/:id/view */
export async function incrementView(req: Request, res: Response, next: NextFunction) {
  try {
    await Project.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });
    res.json({ success: true });
  } catch (err) { next(err); }
}

export async function uploadCoverImage(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new AppError('No image uploaded', 400);
    if (env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name') throw new AppError('Cloudinary is not configured', 503);
    const previous = await Project.findById(req.params.id);
    if (!previous) throw new AppError('Project not found', 404);
    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/projects/covers', { resource_type: 'image' });
    const project = await Project.findByIdAndUpdate(req.params.id, { coverImage: result.secure_url }, { new: true });
    if (!project) throw new AppError('Project not found', 404);
    const oldCoverId = cloudinaryPublicIdFromUrl(previous.coverImage);
    if (oldCoverId) await deleteFromCloudinary(oldCoverId);
    res.status(201).json({ success: true, data: { url: result.secure_url, project } });
  } catch (err) { next(err); }
}

export async function uploadGalleryImages(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) throw new AppError('No images uploaded', 400);
    if (env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name') throw new AppError('Cloudinary is not configured', 503);
    const uploaded = await Promise.all(
      files.map((file) => uploadToCloudinary(file.buffer, 'portfolio/projects/gallery', { resource_type: 'image' }))
    );
    const urls = uploaded.map((item) => item.secure_url);
    const project = await Project.findByIdAndUpdate(req.params.id, { $push: { gallery: { $each: urls } } }, { new: true });
    if (!project) throw new AppError('Project not found', 404);
    res.status(201).json({ success: true, data: { urls, project } });
  } catch (err) { next(err); }
}
