// src/data/education.ts

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  relevantCourses: string[];
  color: string;
}

export const EDUCATION_DATA: Education[] = [
  {
    id: 'gec-bhojpur',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Government Engineering College, Bhojpur',
    location: 'Bhojpur, India',
    period: '2023 – 2027',
    description:
      'Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and computer systems.',
    achievements: [
      'Web Development Lead',
      'Active member of Coding Club',
      'Participated in various coding competitions',
    ],
    relevantCourses: [
      'Data Structures & Algorithms',
      'Database Management Systems',
      'Software Engineering',
      'MERN Stack Development',
    ],
    color: 'from-purple-500 to-pink-500',
  },
];
