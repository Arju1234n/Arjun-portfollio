import mongoose, { Schema, Document } from 'mongoose';

export interface IPageView extends Document {
  path: string;
  referrer?: string;
  userAgent?: string;
  country?: string;
  device?: string;
  browser?: string;
  createdAt: Date;
}

const pageViewSchema = new Schema<IPageView>(
  {
    path:      { type: String, required: true },
    referrer:  { type: String },
    userAgent: { type: String },
    country:   { type: String },
    device:    { type: String },
    browser:   { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

pageViewSchema.index({ path: 1, createdAt: -1 });
pageViewSchema.index({ createdAt: -1 });

export const PageView = mongoose.model<IPageView>('PageView', pageViewSchema);
