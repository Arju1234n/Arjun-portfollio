import mongoose, { Schema, Document } from 'mongoose';

/** Singleton document — only one Hero document should exist */
export interface IHeroContent extends Document {
  name: string;
  tagline: string;
  roles: string[];
  bio: string;
  location: string;
  openToWork: boolean;
  ctaButtons: { label: string; href: string; variant: 'primary' | 'ghost'; icon?: string }[];
  stats: { value: string; label: string }[];
  socialLinks: { platform: string; url: string; icon: string }[];
  terminalLines: string[];
  updatedAt: Date;
}

/** Singleton document — only one About document should exist */
export interface IAboutContent extends Document {
  bio: string;
  technicalPhilosophy: string;
  careerGoals: string;
  learningJourney: string;
  timeline: { year: string; event: string }[];
  updatedAt: Date;
}

/** Singleton stat cards */
export interface IStat extends Document {
  label: string;
  value: string;
  suffix?: string;
  displayOrder: number;
}

const heroSchema = new Schema<IHeroContent>(
  {
    name:       { type: String, default: 'Arjun Kumar' },
    tagline:    { type: String, default: 'Full-Stack Developer' },
    roles:      { type: [String], default: ['Full-Stack Developer', 'MERN Specialist', 'Problem Solver', 'AI / ML Enthusiast'] },
    bio:        { type: String, default: '' },
    location:   { type: String, default: 'Arrah, Bihar, India' },
    openToWork: { type: Boolean, default: true },
    ctaButtons: { type: Schema.Types.Mixed, default: [] },
    stats:      { type: Schema.Types.Mixed, default: [] },
    socialLinks:{ type: Schema.Types.Mixed, default: [] },
    terminalLines:{ type: [String], default: [] },
  },
  { timestamps: true }
);

const aboutSchema = new Schema<IAboutContent>(
  {
    bio:                   { type: String, default: '' },
    technicalPhilosophy:   { type: String, default: '' },
    careerGoals:           { type: String, default: '' },
    learningJourney:       { type: String, default: '' },
    timeline:              { type: Schema.Types.Mixed, default: [] },
  },
  { timestamps: true }
);

const statSchema = new Schema<IStat>(
  {
    label:        { type: String, required: true },
    value:        { type: String, required: true },
    suffix:       { type: String },
    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const HeroContent  = mongoose.model<IHeroContent>('HeroContent', heroSchema);
export const AboutContent = mongoose.model<IAboutContent>('AboutContent', aboutSchema);
export const Stat         = mongoose.model<IStat>('Stat', statSchema);
