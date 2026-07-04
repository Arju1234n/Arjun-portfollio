import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { cloudinaryV2 as cloudinary, uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary';
import { Resume } from '../models/Resume';
import { MediaFile } from '../models/MediaFile';
import { AppError } from '../middleware/error';
import { env } from '../config/env';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

export const uploadMiddleware  = upload.single('file');
export const uploadMiddlewares = upload.array('files', 10);

// ── Resume ────────────────────────────────────────────────────────────────────

/** POST /resume/upload */
export async function uploadResume(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) throw new AppError('No file uploaded', 400);
    if (env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name') throw new AppError('Cloudinary is not configured', 503);
    const result = await uploadToCloudinary(req.file.buffer, 'portfolio/resume', {
      resource_type: 'raw',
      public_id: `resume_${Date.now()}`,
    });

    const lastVersion = await Resume.findOne().sort({ version: -1 });
    const version = (lastVersion?.version ?? 0) + 1;
    await Resume.updateMany({}, { isActive: false });

    const resume = await Resume.create({
      fileUrl:    result.secure_url,
      fileName:   req.file.originalname,
      publicId:   result.public_id,
      version,
      isActive:   true,
      uploadedBy: req.user!.id,
    });

    res.status(201).json({ success: true, data: resume });
  } catch (err) { next(err); }
}

/** GET /resume */
export async function listResumes(req: Request, res: Response, next: NextFunction) {
  try {
    const resumes = await Resume.find().sort({ version: -1 }).populate('uploadedBy', 'name');
    res.json({ success: true, data: resumes });
  } catch (err) { next(err); }
}

/** PATCH /resume/:id/activate */
export async function activateResume(req: Request, res: Response, next: NextFunction) {
  try {
    await Resume.updateMany({}, { isActive: false });
    const resume = await Resume.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
    if (!resume) throw new AppError('Resume not found', 404);
    res.json({ success: true, data: resume });
  } catch (err) { next(err); }
}

/** DELETE /resume/:id */
export async function deleteResume(req: Request, res: Response, next: NextFunction) {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) throw new AppError('Resume not found', 404);
    await deleteFromCloudinary(resume.publicId, 'raw');
    await resume.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}

/** POST /resume/:id/download — increment counter */
export async function trackDownload(req: Request, res: Response, next: NextFunction) {
  try {
    await Resume.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } });
    res.json({ success: true });
  } catch (err) { next(err); }
}

// ── Media Library ─────────────────────────────────────────────────────────────

/** POST /media/upload */
export async function uploadMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files?.length) throw new AppError('No files uploaded', 400);
    if (env.CLOUDINARY_CLOUD_NAME === 'your-cloud-name') throw new AppError('Cloudinary is not configured', 503);
    const { folder = 'general' } = req.body;

    const uploaded = await Promise.all(
      files.map(async (file) => {
        const isImage = file.mimetype.startsWith('image/');
        const result = await uploadToCloudinary(file.buffer, `portfolio/${folder}`, {
          resource_type: isImage ? 'image' : 'raw',
          use_filename:  true,
        });
        return MediaFile.create({
          url:        result.secure_url,
          publicId:   result.public_id,
          name:       file.originalname,
          folder,
          type:       isImage ? 'image' : (file.mimetype === 'application/pdf' ? 'pdf' : 'document'),
          size:       result.bytes,
          width:      result.width,
          height:     result.height,
          uploadedBy: req.user!.id,
        });
      })
    );

    res.status(201).json({ success: true, data: uploaded });
  } catch (err) { next(err); }
}

/** GET /media */
export async function listMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const { folder, type, search, page = '1', limit = '30' } = req.query as Record<string, string>;
    const filter: any = {};
    if (folder) filter.folder = folder;
    if (type)   filter.type   = type;
    if (search) filter.name   = { $regex: search, $options: 'i' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      MediaFile.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      MediaFile.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, meta: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
}

/** DELETE /media/:id */
export async function deleteMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const media = await MediaFile.findById(req.params.id);
    if (!media) throw new AppError('Media not found', 404);
    await deleteFromCloudinary(media.publicId, media.type === 'image' ? 'image' : 'raw');
    await media.deleteOne();
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}
