import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  adminId: mongoose.Types.ObjectId;
  action: string;
  resource?: string;
  resourceId?: string;
  meta?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const activityLogSchema = new Schema<IActivityLog>(
  {
    adminId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action:     { type: String, required: true },
    resource:   { type: String },
    resourceId: { type: String },
    meta:       { type: Schema.Types.Mixed },
    ip:         { type: String },
    userAgent:  { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

activityLogSchema.index({ adminId: 1, createdAt: -1 });

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
