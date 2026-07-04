// src/data/experience.ts

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
  color: string;
  link?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: 'cdac-mern',
    title: 'MERN Stack Training',
    company: 'Centre for Development of Advanced Computing (CDAC) Patna',
    location: 'India',
    period: 'June 2025 – July 2025',
    description:
      'Completed professional training in MERN Stack (MongoDB, Express.js, React.js, Node.js).',
    achievements: [
      'Worked in a team to develop a Hospital Management System as a capstone project',
      'Designed and implemented frontend using React and backend APIs with Node.js and Express',
      'Integrated MongoDB for managing patient, doctor, and appointment data efficiently',
      'Implemented features like user authentication, dashboard, and appointment scheduling',
      'Gained practical experience in RESTful API design, Git collaboration, and deployment workflow',
    ],
    skills: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'RESTful API',
      'Git',
      'Hospital Management System',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
];
