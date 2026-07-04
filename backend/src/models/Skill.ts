import mongoose, { Schema, Document } from 'mongoose';

export interface ISkillCategory extends Document {
  name: string;
  emoji: string;
  color: string;
  displayOrder: number;
}

export interface ISkill extends Document {
  categoryId: mongoose.Types.ObjectId;
  name: string;
  icon?: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  percentage: number;
  displayOrder: number;
}

const skillCategorySchema = new Schema<ISkillCategory>(
  {
    name:         { type: String, required: true, unique: true },
    emoji:        { type: String, default: '🔧' },
    color:        { type: String, default: 'from-blue-500 to-cyan-500' },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const skillSchema = new Schema<ISkill>(
  {
    categoryId:   { type: Schema.Types.ObjectId, ref: 'SkillCategory', required: true },
    name:         { type: String, required: true },
    icon:         { type: String },
    level:        { type: String, enum: ['beginner','intermediate','advanced','expert'], default: 'intermediate' },
    percentage:   { type: Number, min: 0, max: 100, default: 75 },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ categoryId: 1, displayOrder: 1 });

export const SkillCategory = mongoose.model<ISkillCategory>('SkillCategory', skillCategorySchema);
export const Skill = mongoose.model<ISkill>('Skill', skillSchema);
