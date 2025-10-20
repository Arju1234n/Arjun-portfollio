
import React from 'react';
import Reveal from './Reveal';
import { GraduationCap, Calendar, MapPin, Trophy, BookOpen } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Govt Engineering college Bhojpur",
      location: "Bhojpur, India",
      period: "2023 - 2027",
      description: "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and computer systems.",
      achievements: [
        "Web Development Lead",
        "Active member of Coding Club",
        "Participated in various coding competitions"
      ],
      relevantCourses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Software Engineering",
        "MERN Stack Development",
      ],
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-100/30 to-purple-100/30 animate-gradient"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-10 w-12 h-12 bg-gradient-to-r from-green-300 to-emerald-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-shimmer">
                Education
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6 rounded-full animate-shimmer"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              My academic foundation and journey in computer science.
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12 mb-16">
            {education.map((edu, index) => (
              <Reveal key={index}>
                <div 
                  className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-purple-100"
                >
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="flex items-center mb-6 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${edu.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float`}>
                    <GraduationCap size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-600 font-semibold animate-pulse">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center text-gray-500 text-sm space-y-1 sm:space-y-0 sm:space-x-4 mb-4 relative z-10">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 animate-bounce" />
                    <span>{edu.period}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1 animate-bounce" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {edu.description}
                </p>

                <div className="mb-6 relative z-10">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Trophy size={18} className="mr-2 text-yellow-500 animate-bounce" />
                    Key Achievements:
                  </h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start group/item">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0 animate-pulse"></div>
                        <span className="text-gray-700 group-hover/item:text-purple-600 transition-colors duration-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <BookOpen size={18} className="mr-2 text-blue-500 animate-pulse" />
                    Relevant Courses:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.relevantCourses.map((course, i) => (
                      <span 
                        key={i} 
                        className={`bg-gradient-to-r ${edu.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer animate-float`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Animated Border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-shimmer`}></div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;

