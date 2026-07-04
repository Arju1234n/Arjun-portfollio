// src/data/certifications.ts

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'js-coursera',
    title: 'JavaScript (Beginner to Advanced)',
    issuer: 'Coursera',
    date: '2024',
    url: undefined, // Replace with real credential URL
  },
  {
    id: 'react-meta',
    title: 'React Fundamentals',
    issuer: 'Meta / Coursera',
    date: '2024',
    url: undefined,
  },
  {
    id: 'dsa-udemy',
    title: 'Data Structures & Algorithms',
    issuer: 'Udemy',
    date: '2025',
    url: undefined,
  },
  {
    id: 'git-google',
    title: 'Git & GitHub',
    issuer: 'Google',
    date: '2024',
    url: undefined,
  },
];
