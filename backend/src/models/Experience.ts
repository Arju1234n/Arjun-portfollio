import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  certificateUrl?: string;
  companyUrl?: string;
  displayOrder: number;
  color: string;
}

const experienceSchema = new Schema<IExperience>(
  {
    company:        { type: String, required: true },
    position:       { type: String, required: true },
    location:       { type: String, default: 'India' },
    startDate:      { type: String, required: true },
    endDate:        { type: String },
    current:        { type: Boolean, default: false },
    description:    { type: String, default: '' },
    achievements:   { type: [String], default: [] },
    techStack:      { type: [String], default: [] },
    certificateUrl: { type: String },
    companyUrl:     { type: String },
    displayOrder:   { type: Number, default: 0 },
    color:          { type: String, default: 'from-blue-500 to-cyan-500' },
  },
  { timestamps: true }
);

export const Experience = mongoose.model<IExperience>('Experience', experienceSchema);
