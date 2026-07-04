import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  fileUrl: string;
  fileName: string;
  publicId: string;
  version: number;
  isActive: boolean;
  downloadCount: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    fileUrl:       { type: String, required: true },
    fileName:      { type: String, required: true },
    publicId:      { type: String, required: true },
    version:       { type: Number, default: 1 },
    isActive:      { type: Boolean, default: false },
    downloadCount: { type: Number, default: 0 },
    uploadedBy:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Resume = mongoose.model<IResume>('Resume', resumeSchema);
