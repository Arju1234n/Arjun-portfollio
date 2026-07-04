import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  grade?: string;
  description?: string;
  achievements: string[];
  displayOrder: number;
}

const educationSchema = new Schema<IEducation>(
  {
    institution:  { type: String, required: true },
    degree:       { type: String, required: true },
    field:        { type: String, required: true },
    startYear:    { type: String, required: true },
    endYear:      { type: String },
    current:      { type: Boolean, default: false },
    grade:        { type: String },
    description:  { type: String },
    achievements: { type: [String], default: [] },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education = mongoose.model<IEducation>('Education', educationSchema);
