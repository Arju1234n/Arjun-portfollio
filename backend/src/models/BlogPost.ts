import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  publishedAt?: Date;
  scheduledAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  readTime?: number;
  viewCount: number;
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title:          { type: String, required: true, trim: true },
    slug:           { type: String, required: true, unique: true, lowercase: true },
    content:        { type: String, default: '' },
    excerpt:        { type: String, default: '' },
    coverImage:     { type: String },
    category:       { type: String, default: 'general' },
    tags:           { type: [String], default: [] },
    status:         { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    publishedAt:    { type: Date },
    scheduledAt:    { type: Date },
    seoTitle:       { type: String },
    seoDescription: { type: String },
    readTime:       { type: Number },
    viewCount:      { type: Number, default: 0 },
    authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
