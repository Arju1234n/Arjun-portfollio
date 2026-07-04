import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteSettings extends Document {
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
    twitterHandle?: string;
    canonicalUrl?: string;
  };
  theme: {
    primaryColor: string;
    accentColor: string;
    defaultMode: 'dark' | 'light';
    logoUrl?: string;
    faviconUrl?: string;
    fontFamily: string;
  };
  navigation: { label: string; href: string; icon?: string; order: number; visible: boolean }[];
  footer: {
    copyright: string;
    quickLinks: { label: string; href: string }[];
    socialLinks: { platform: string; url: string }[];
    contactEmail: string;
  };
  analytics: {
    enableTracking: boolean;
    googleAnalyticsId?: string;
  };
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    seo: {
      metaTitle:       { type: String, default: 'Arjun Kumar — Full-Stack Developer' },
      metaDescription: { type: String, default: '' },
      keywords:        { type: [String], default: [] },
      ogImage:         { type: String },
      twitterHandle:   { type: String },
      canonicalUrl:    { type: String },
    },
    theme: {
      primaryColor:  { type: String, default: '#7c3aed' },
      accentColor:   { type: String, default: '#a78bfa' },
      defaultMode:   { type: String, enum: ['dark', 'light'], default: 'dark' },
      logoUrl:       { type: String },
      faviconUrl:    { type: String },
      fontFamily:    { type: String, default: 'Inter' },
    },
    navigation: { type: Schema.Types.Mixed, default: [] },
    footer: {
      copyright:    { type: String, default: `© ${new Date().getFullYear()} Arjun Kumar` },
      quickLinks:   { type: Schema.Types.Mixed, default: [] },
      socialLinks:  { type: Schema.Types.Mixed, default: [] },
      contactEmail: { type: String, default: '' },
    },
    analytics: {
      enableTracking:     { type: Boolean, default: true },
      googleAnalyticsId:  { type: String },
    },
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
