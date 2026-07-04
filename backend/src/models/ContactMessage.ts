import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  replied: boolean;
  repliedAt?: Date;
  createdAt: Date;
}

const contactMessageSchema = new Schema<IContactMessage>(
  {
    name:      { type: String, required: true, trim: true },
    email:     { type: String, required: true, lowercase: true, trim: true },
    subject:   { type: String, trim: true },
    message:   { type: String, required: true },
    read:      { type: Boolean, default: false },
    replied:   { type: Boolean, default: false },
    repliedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

contactMessageSchema.index({ read: 1, createdAt: -1 });

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);
