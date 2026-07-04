// src/data/navigation.ts
// Single source of truth for navigation items.
// Used by: Header, CommandPalette, SectionDots
import { Home, User, Briefcase, Wrench, FolderKanban, Award, Mail, FileText } from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'home',         label: 'Home',       href: '#home',          icon: Home,         color: 'pink'   },
  { id: 'about',        label: 'About',      href: '#about',         icon: User,         color: 'purple' },
  { id: 'experience',   label: 'Experience', href: '#experience',    icon: Briefcase,    color: 'blue'   },
  { id: 'projects',     label: 'Projects',   href: '#projects',      icon: FolderKanban, color: 'green'  },
  { id: 'skills',       label: 'Skills',     href: '#skills',        icon: Wrench,       color: 'orange' },
  { id: 'certifications', label: 'Certs',    href: '#certifications',icon: Award,        color: 'yellow' },
  { id: 'resume',       label: 'Resume',     href: '#resume',        icon: FileText,     color: 'indigo' },
  { id: 'contact',      label: 'Contact',    href: '#contact',       icon: Mail,         color: 'red'    },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];

/** Map a tailwind color name to its gradient pair */
export const COLOR_TO_GRADIENT: Record<string, string> = {
  pink:   'from-pink-500 to-purple-500',
  purple: 'from-purple-500 to-blue-500',
  blue:   'from-blue-500 to-cyan-500',
  green:  'from-green-500 to-emerald-500',
  orange: 'from-orange-500 to-red-500',
  cyan:   'from-cyan-500 to-blue-500',
  red:    'from-red-500 to-pink-500',
  indigo: 'from-indigo-500 to-purple-500',
  yellow: 'from-yellow-500 to-orange-500',
};

/** Section IDs tracked by SectionDots */
export const SECTION_IDS = NAV_ITEMS.map((i) => i.id);
