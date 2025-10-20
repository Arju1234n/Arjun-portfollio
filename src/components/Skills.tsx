import React from 'react';

const skillsData = [
  {
    title: '🧠 Frontend',
    items: [
      'HTML5, CSS3, JavaScript (ES6+)',
      'React.js, Redux, Tailwind CSS',
      'Responsive UI Design, Framer Motion Animations',
    ],
    color: 'from-pink-500 to-purple-500',
  },
  {
    title: '⚙️ Backend',
    items: [
      'Node.js, Express.js',
      'RESTful APIs, JWT Authentication',
      'MongoDB, Mongoose ORM',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: '🧩 Programming & DSA',
    items: [
      'C, C++, JavaScript',
      'Strong foundation in Data Structures & Algorithms',
      'Competitive Programming (CodeChef, LeetCode)',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: '☁️ Tools & Technologies',
    items: [
      'Git & GitHub, VS Code, Postman',
      'Vercel, Render, MongoDB Atlas',
      'Linux, Command Line Tools',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    title: '🤖 Additional Interests',
    items: [
      'AI Integration with MERN Stack',
      'System Design & Scalability Concepts',
      'Hackathon & Open Source Contributions',
    ],
    color: 'from-purple-500 to-pink-500',
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">🧠 Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((card, idx) => (
            <div
              key={idx}
              className={`rounded-3xl shadow-lg p-8 bg-gradient-to-br ${card.color} text-white flex flex-col items-start transition-transform duration-300 hover:scale-105`}
            >
              <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
              <ul className="space-y-3 text-lg">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;