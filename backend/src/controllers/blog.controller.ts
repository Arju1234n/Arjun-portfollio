import { Request, Response, NextFunction } from 'express';
import slugify from 'slugify';
import { BlogPost } from '../models/BlogPost';
import { AppError } from '../middleware/error';

/** GET /blog */
export async function listPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, category, search, page = '1', limit = '20' } = req.query as Record<string, string>;
    const filter: any = {};
    if (status)   filter.status   = status;
    if (category) filter.category = category;
    if (search)   filter.$or = [
      { title:   { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [items, total] = await Promise.all([
      BlogPost.find(filter).sort({ publishedAt: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit)).populate('authorId','name'),
      BlogPost.countDocuments(filter),
    ]);
    res.json({ success: true, data: items, meta: { page: parseInt(page), limit: parseInt(limit), total, totalPages: Math.ceil(total / parseInt(limit)) } });
  } catch (err) { next(err); }
}

/** POST /blog */
export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, content, ...rest } = req.body;
    if (!title) throw new AppError('Title required', 400);
    const slug = slugify(title, { lower: true, strict: true });
    const readTime = Math.ceil((content ?? '').replace(/<[^>]+>/g, '').split(/\s+/).length / 200);
    const post = await BlogPost.create({ title, content, slug, readTime, authorId: req.user!.id, ...rest });
    res.status(201).json({ success: true, data: post });
  } catch (err) { next(err); }
}

/** GET /blog/:id */
export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await BlogPost.findById(req.params.id).populate('authorId','name');
    if (!post) throw new AppError('Post not found', 404);
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
}

/** PATCH /blog/:id */
export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const updates: any = { ...req.body };
    if (updates.title) updates.slug = slugify(updates.title, { lower: true, strict: true });
    if (updates.content) updates.readTime = Math.ceil(updates.content.replace(/<[^>]+>/g,'').split(/\s+/).length / 200);
    if (updates.status === 'published') updates.publishedAt = updates.publishedAt ?? new Date();
    const post = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!post) throw new AppError('Post not found', 404);
    res.json({ success: true, data: post });
  } catch (err) { next(err); }
}

/** DELETE /blog/:id */
export async function deletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) throw new AppError('Post not found', 404);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) { next(err); }
}
