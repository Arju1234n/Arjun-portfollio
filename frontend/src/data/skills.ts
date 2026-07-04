// src/data/skills.ts
// Structured skill data with individual skill entries (not comma-separated strings).
// Used by: Skills component

export interface SkillCategory {
  id: string;
  title: string;
  emoji: string;
  ariaLabel: string;
  items: string[];
  color: string;
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    emoji: '🧠',
    ariaLabel: 'Frontend Skills',
    items: [
      'HTML5 & CSS3',
      'JavaScript (ES6+)',
      'React.js',
      'Redux',
      'Tailwind CSS',
      'Responsive UI Design',
      'Framer Motion Animations',
    ],
    color: 'from-pink-500 to-purple-500',
  },
  {
    id: 'backend',
    title: 'Backend',
    emoji: '⚙️',
    ariaLabel: 'Backend Skills',
    items: [
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'JWT Authentication',
      'MongoDB',
      'Mongoose ORM',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'dsa',
    title: 'Programming & DSA',
    emoji: '🧩',
    ariaLabel: 'Programming and Data Structures',
    items: [
      'C & C++',
      'Java',
      'JavaScript',
      'Data Structures & Algorithms',
      'Competitive Programming',
      'CodeChef & LeetCode',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'tools',
    title: 'Tools & Technologies',
    emoji: '☁️',
    ariaLabel: 'Tools and Technologies',
    items: [
      'Git & GitHub',
      'VS Code',
      'Postman',
      'Vercel & Render',
      'MongoDB Atlas',
      'Linux & CLI',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'interests',
    title: 'Additional Interests',
    emoji: '🤖',
    ariaLabel: 'Additional Interests',
    items: [
      'AI Integration with MERN Stack',
      'System Design & Scalability',
      'Hackathons',
      'Open Source Contributions',
    ],
    color: 'from-purple-500 to-pink-500',
  },
];
