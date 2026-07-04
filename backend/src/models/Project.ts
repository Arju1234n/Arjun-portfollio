import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  coverImage?: string;
  gallery: string[];
  demoVideo?: string;
  architectureDiagram?: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  techStack: string[];
  features: string[];
  problemStatement?: string;
  solution?: string;
  myRole?: string;
  challenges?: string;
  learnings?: string;
  metrics: Record<string, string>;
  displayOrder: number;
  publishedAt?: Date;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title:            { type: String, required: true, trim: true },
    slug:             { type: String, required: true, unique: true, lowercase: true },
    shortDescription: { type: String, required: true },
    fullDescription:  { type: String, default: '' },
    category:         { type: String, default: 'web' },
    status:           { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    featured:         { type: Boolean, default: false },
    coverImage:       { type: String },
    gallery:          { type: [String], default: [] },
    demoVideo:        { type: String },
    architectureDiagram: { type: String },
    githubUrl:        { type: String },
    liveUrl:          { type: String },
    docsUrl:          { type: String },
    techStack:        { type: [String], default: [] },
    features:         { type: [String], default: [] },
    problemStatement: { type: String },
    solution:         { type: String },
    myRole:           { type: String },
    challenges:       { type: String },
    learnings:        { type: String },
    metrics:          { type: Schema.Types.Mixed, default: {} },
    displayOrder:     { type: Number, default: 0 },
    publishedAt:      { type: Date },
    viewCount:        { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ status: 1, displayOrder: 1 });
projectSchema.index({ featured: 1 });

export const Project = mongoose.model<IProject>('Project', projectSchema);
