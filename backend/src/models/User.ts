import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export type UserRole = 'super_admin' | 'admin' | 'editor';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  refreshTokenVersion: number;
  loginHistory: { ip: string; userAgent: string; at: Date }[];
  lastLoginAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const loginHistorySchema = new Schema(
  { ip: String, userAgent: String, at: { type: Date, default: Date.now } },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name:                 { type: String, required: true, trim: true },
    email:                { type: String, required: true, unique: true, lowercase: true, trim: true },
    password:             { type: String, required: true, minlength: 8, select: false },
    role:                 { type: String, enum: ['super_admin', 'admin', 'editor'], default: 'editor' },
    avatar:               { type: String },
    refreshTokenVersion:  { type: Number, default: 0 },
    loginHistory:         { type: [loginHistorySchema], default: [] },
    lastLoginAt:          { type: Date },
    isActive:             { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
