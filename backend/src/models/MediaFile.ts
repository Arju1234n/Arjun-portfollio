import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaFile extends Document {
  url: string;
  publicId: string;
  name: string;
  folder: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  size: number;
  width?: number;
  height?: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const mediaFileSchema = new Schema<IMediaFile>(
  {
    url:        { type: String, required: true },
    publicId:   { type: String, required: true, unique: true },
    name:       { type: String, required: true },
    folder:     { type: String, default: 'general' },
    type:       { type: String, enum: ['image', 'video', 'pdf', 'document'], default: 'image' },
    size:       { type: Number, default: 0 },
    width:      { type: Number },
    height:     { type: Number },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

mediaFileSchema.index({ folder: 1, type: 1, createdAt: -1 });

export const MediaFile = mongoose.model<IMediaFile>('MediaFile', mediaFileSchema);
