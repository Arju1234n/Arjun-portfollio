import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  name: string;
  organization: string;
  year: number;
  imageUrl?: string;
  credentialId?: string;
  verifyUrl?: string;
  displayOrder: number;
}

const certificationSchema = new Schema<ICertification>(
  {
    name:         { type: String, required: true },
    organization: { type: String, required: true },
    year:         { type: Number, required: true },
    imageUrl:     { type: String },
    credentialId: { type: String },
    verifyUrl:    { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Certification = mongoose.model<ICertification>('Certification', certificationSchema);
