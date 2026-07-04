'use client';
// src/hooks/usePortfolioData.ts
// One custom hook per portfolio section.
// Each hook fetches from the backend API and returns { data, loading }.
// Components keep small fallback data so they render immediately while the API
// call completes. Project data itself stays API-only.

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

// Re-export for convenience
export { apiFetch } from '@/lib/api';

// ─── Shared helper ────────────────────────────────────────────────────────────

function useFetch<T>(path: string, fallback: T, options: { refreshMs?: number } = {}) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      try {
        setLoad(true);
        setError(null);
        
        const result = await apiFetch<T>(path);
        
        if (!cancelled) {
          setData(result);
          setError(null);
          setLoad(false);
        }
      } catch (err: any) {
        if (!cancelled) {
          const errorMsg = err?.message || 'Unknown error';
          setError(errorMsg);
          setLoad(false);
        }
      }
    };
    
    fetchData();
    const onFocus = () => fetchData();
    window.addEventListener('focus', onFocus);
    const interval = options.refreshMs ? window.setInterval(fetchData, options.refreshMs) : undefined;
    
    return () => {
      cancelled = true;
      window.removeEventListener('focus', onFocus);
      if (interval) window.clearInterval(interval);
    };
  }, [options.refreshMs, path]);

  return { data, loading, error };
}

// ─── API types (mirrors backend models) ──────────────────────────────────────

export interface ApiHero {
  name: string;
  tagline: string;
  roles: string[];
  bio: string;
  location: string;
  openToWork: boolean;
  stats: { value: string; label: string }[];
  terminalLines: string[];
}

export interface ApiAbout {
  bio: string;
  technicalPhilosophy: string;
  careerGoals: string;
  learningJourney: string;
  timeline: { year: string; event: string }[];
}

export interface ApiExperience {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
  companyUrl?: string;
  color: string;
  displayOrder: number;
}

export interface ApiProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  coverImage?: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  techStack: string[];
  features?: string[];
  problemStatement?: string;
  solution?: string;
  myRole?: string;
  challenges?: string;
  learnings?: string;
  metrics?: Record<string, string>;
  displayOrder: number;
  updatedAt?: string;
}

export interface ApiSkillCategory {
  _id: string;
  name: string;
  emoji: string;
  color: string;
  displayOrder: number;
}

export interface ApiSkill {
  _id: string;
  categoryId: { _id: string; name: string; emoji: string; color: string } | string;
  name: string;
  level: string;
  percentage: number;
  displayOrder: number;
}

export interface ApiCertification {
  _id: string;
  name: string;
  organization: string;
  year: number;
  verifyUrl?: string;
  displayOrder: number;
}

export interface ApiStat {
  _id: string;
  label: string;
  value: string;
  suffix?: string;
  displayOrder: number;
}

export interface ApiResume {
  _id: string;
  fileUrl: string;
  fileName: string;
  version: number;
  isActive: boolean;
  uploadedAt?: string;
}

// ─── Fallback data (mirrors src/data/ static files) ──────────────────────────

const HERO_FALLBACK: ApiHero = {
  name: 'Arjun Kumar',
  tagline: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'MERN Specialist', 'Problem Solver', 'AI / ML Enthusiast'],
  bio: "B.Tech CSE student at GEC Bhojpur (2023–2027), building production-grade web apps with the MERN stack.",
  location: 'Arrah, Bihar, India',
  openToWork: true,
  stats: [
    { value: '3+', label: 'Projects shipped' },
    { value: '12+', label: 'Technologies' },
    { value: '2+', label: 'Years coding' },
  ],
  terminalLines: [],
};

const ABOUT_FALLBACK: ApiAbout = {
  bio: "Hi, I'm Arjun Kumar — a 2nd-year Computer Science student at Government Engineering College, Bhojpur. I specialise in building modern, full-stack web applications with the MERN stack.",
  technicalPhilosophy: '',
  careerGoals: 'Long-term goal: Senior SDE at a top tech company.',
  learningJourney: 'System Design & Scalability, AI Integration with MERN, Cloud & DevOps basics, TypeScript patterns',
  timeline: [
    { year: '2021', event: 'Started with HTML, CSS & JavaScript. Built first static websites.' },
    { year: '2023', event: 'Enrolled in B.Tech CSE. Joined coding clubs, started MERN development.' },
    { year: 'Jun 2025', event: 'Professional MERN training at CDAC Patna. Shipped Hospital Management System.' },
    { year: 'Now', event: 'Crafting production apps, learning system design, AI integration, and cloud patterns.' },
  ],
};

const EXPERIENCE_FALLBACK: ApiExperience[] = [
  {
    _id: 'cdac-mern',
    company: 'Centre for Development of Advanced Computing (CDAC) Patna',
    position: 'MERN Stack Training',
    location: 'India',
    startDate: 'June 2025',
    endDate: 'July 2025',
    current: false,
    description: 'Completed professional training in MERN Stack (MongoDB, Express.js, React.js, Node.js).',
    achievements: [
      'Built Hospital Management System as a capstone project',
      'Implemented user authentication, dashboard, and appointment scheduling',
      'Gained practical experience in RESTful API design and Git collaboration',
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'RESTful API', 'Git'],
    color: 'from-blue-500 to-cyan-500',
    displayOrder: 0,
  },
];

const PROJECT_FALLBACK: ApiProject[] = [];

const SKILL_CATEGORY_FALLBACK: ApiSkillCategory[] = [];
const SKILL_FALLBACK: ApiSkill[] = [];
const CERTIFICATION_FALLBACK: ApiCertification[] = [];
const STAT_FALLBACK: ApiStat[] = [];
const RESUME_FALLBACK: ApiResume[] = [];

// ─── Exported hooks ───────────────────────────────────────────────────────────

export function useHero()           { return useFetch<ApiHero>('/hero', HERO_FALLBACK); }
export function useAbout()          { return useFetch<ApiAbout>('/about', ABOUT_FALLBACK); }
export function useExperience()     { return useFetch<ApiExperience[]>('/experience', EXPERIENCE_FALLBACK); }
export function useProjects()        { return useFetch<ApiProject[]>('/projects?status=published&limit=100', PROJECT_FALLBACK, { refreshMs: 30000 }); }
export function useFeaturedProjects(){ return useFetch<ApiProject[]>('/projects/featured', PROJECT_FALLBACK, { refreshMs: 30000 }); }
export function useSkillCategories(){ return useFetch<ApiSkillCategory[]>('/skills/categories', SKILL_CATEGORY_FALLBACK); }
export function useSkills()         { return useFetch<ApiSkill[]>('/skills', SKILL_FALLBACK); }
export function useCertifications() { return useFetch<ApiCertification[]>('/certifications', CERTIFICATION_FALLBACK); }
export function useStats()          { return useFetch<ApiStat[]>('/stats', STAT_FALLBACK); }
export function useResume()         { return useFetch<ApiResume[]>('/resume', RESUME_FALLBACK); }
