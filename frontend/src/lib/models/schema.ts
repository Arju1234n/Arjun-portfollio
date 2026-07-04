// src/lib/models/schema.ts
// Mongoose data models — stubbed until mongoose is installed.
// To activate: npm install mongoose, then uncomment all code below.

export {}; // placeholder export to satisfy isolatedModules

/*
import mongoose, { Schema, Document, Model } from 'mongoose';

// ─── User ──────────────────────────────────────────────────────────────────────
export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

// ─── Project ────────────────────────────────────────────────────────────────────
export interface IProject extends Document {
  title: string;
  description: string;
  content: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  slug: string;
  status: 'active' | 'archived' | 'draft';
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  content: String,
  technologies: [{ type: String, trim: true }],
  githubUrl: String,
  liveUrl: String,
  imageUrl: String,
  slug: { type: String, required: true, unique: true },
  status: { type: String, enum: ['active', 'archived', 'draft'], default: 'active' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
ProjectSchema.index({ status: 1, order: 1 });

// ─── Blog ───────────────────────────────────────────────────────────────────────
export interface IBlog extends Document {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  tags: string[];
  isDraft: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true, maxlength: 200000 },
  excerpt: String,
  slug: { type: String, required: true, unique: true },
  tags: [String],
  isDraft: { type: Boolean, default: true },
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now },
});
BlogSchema.index({ isDraft: 1, publishedAt: -1 });

// ─── Message ─────────────────────────────────────────────────────────────────────
export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true, maxlength: 5000 },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// ─── Subscriber ──────────────────────────────────────────────────────────────────
export interface ISubscriber extends Document {
  email: string;
  subscribedAt: Date;
  active: boolean;
}

const SubscriberSchema = new Schema<ISubscriber>({
  email: { type: String, required: true, unique: true, lowercase: true },
  subscribedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
});

// ─── Exports ─────────────────────────────────────────────────────────────────────
export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>('User', UserSchema);

export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>('Project', ProjectSchema);

export const Blog: Model<IBlog> =
  mongoose.models.Blog ?? mongoose.model<IBlog>('Blog', BlogSchema);

export const Message: Model<IMessage> =
  mongoose.models.Message ?? mongoose.model<IMessage>('Message', MessageSchema);

export const Subscriber: Model<ISubscriber> =
  mongoose.models.Subscriber ?? mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
*/
