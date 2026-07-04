// src/data/socials.ts
// Single source of truth for social links.
// Used by: Contact, Footer
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/Arju1234n',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arjun-k-35990b21b/',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/', // Update with your Twitter handle
    icon: Twitter,
  },
  {
    name: 'Email',
    url: 'mailto:kumararjun5230@gmail.com',
    icon: Mail,
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];
