import React, { useState } from 'react';
import Reveal from './Reveal';
import { Code, Database, Cloud, Zap, Star, Heart, Sparkles } from 'lucide-react';

const TiltCard: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  const [style, setStyle] = useState<{ transform: string } | undefined>();
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 10;
    setStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)` });
  };
  const handleLeave = () => setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)' });
  return (
    <div
      className={className}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};

const About = () => {
  const highlights = [
    {
      icon: Code,
      title: "Web Development",
      description: "Learning and building with React, Node.js, and modern web technologies",
      color: "from-pink-500 to-purple-500",
      iconColor: "text-pink-400"
    },
    {
      icon: Database,
      title: "Programming Skills",
      description: "Strong foundation in Java, JavaScript, and Python programming languages",
      color: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-400"
    },
    {
      icon: Cloud,
      title: "Applied Learning",
      description: "Hands-on practice via team builds and personal exploration of real-world problems",
      color: "from-green-500 to-emerald-500",
      iconColor: "text-green-400"
    },
  ];

  const traits = [
    { name: 'Problem Solving', color: 'from-pink-400 to-purple-400', icon: Zap },
    { name: 'Team Collaboration', color: 'from-blue-400 to-cyan-400', icon: Heart },
    { name: 'Continuous Learning', color: 'from-green-400 to-emerald-400', icon: Star },
    { name: 'Innovation', color: 'from-orange-400 to-red-400', icon: Sparkles }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/30 to-purple-100/30 dark:via-purple-500/10 dark:to-pink-500/10 animate-gradient transition-colors duration-300"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-20 h-20 bg-gradient-to-r from-purple-300 to-pink-300 dark:from-purple-500 dark:to-pink-500 rounded-full opacity-20 dark:opacity-10 animate-float transition-colors duration-300"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-gradient-to-r from-blue-300 to-cyan-300 dark:from-blue-500 dark:to-cyan-500 rounded-full opacity-20 dark:opacity-10 animate-float transition-colors duration-300" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-r from-green-300 to-emerald-300 dark:from-green-500 dark:to-emerald-500 rounded-full opacity-20 dark:opacity-10 animate-float transition-colors duration-300" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent transition-colors duration-300">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 mx-auto mb-6 rounded-full animate-shimmer transition-colors duration-300"></div>

            <p className="text-lg text-purple-700 dark:text-purple-300 font-semibold mb-4 transition-colors duration-300">
              Hi, I’m Arjun Kumar, a 2nd-year Computer Science and Engineering student at Government Engineering College, Bhojpur.
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">MERN</span>
              <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">DSA</span>
              <span className="px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">System Design</span>
              <span className="px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border border-pink-200 dark:border-pink-800">AI Integration</span>
            </div>
          </div>

          <Reveal>
            <div className="text-center mb-12">
              <div className="relative max-w-3xl mx-auto px-6 py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800 transition-colors duration-300">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-purple-400 dark:bg-purple-600 rounded-full opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-pink-400 dark:bg-pink-600 rounded-full opacity-70 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              
                {/* Profile image inside About card */}
                <div className="mb-6 flex justify-center">
                  <div className="relative w-28 h-28 md:w-32 md:h-32">
                    <div className="absolute -inset-0.5 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-purple-500 via-pink-500 to-blue-500 animate-spin-slow opacity-80 blur-[1px]"></div>
                    <div className="relative w-full h-full rounded-full p-0.5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/50 dark:border-gray-700/50">
                      <img
                        src="/arjun.jpg"
                        alt="Arjun Kumar profile"
                        loading="lazy"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 space-y-4 text-left md:text-left md:grid md:grid-cols-2 md:gap-6">
                  <p className="flex items-start gap-3">
                    <Code size={18} className="mt-1 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <span>
                      Hi, I’m Arjun Kumar, currently pursuing Computer Science and Engineering student in 2nd year at Government Engineering College, Bhojpur. I’m deeply interested in software development, especially building modern, responsive, and dynamic web applications using the <span className="text-purple-600 dark:text-purple-400 font-semibold">MERN Stack</span> — MongoDB, Express.js, React.js, and Node.js.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Zap size={18} className="mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    <span>
                      I enjoy solving real-world problems through code and regularly sharpen my <span className="text-blue-600 dark:text-blue-400 font-semibold">DSA</span> and Competitive Programming skills. My recent work includes many projects (solo and team), which deepened my understanding of backend logic, team collaboration, and UI quality.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Sparkles size={18} className="mt-1 text-purple-500 dark:text-purple-400 flex-shrink-0" />
                    <span>
                      I’m currently learning <span className="text-purple-600 dark:text-purple-400 font-semibold">system design</span> and <span className="text-purple-600 dark:text-purple-400 font-semibold">AI integration</span> to become a complete Software Development Engineer (SDE). My long-term goal is to work at a top tech company where I can innovate, collaborate, and grow as a developer.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Heart size={18} className="mt-1 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                    <span>
                      When I’m not coding, I love spending time in the gym, exploring new technologies, or reading about startups and innovation.
                    </span>
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:from-purple-700 hover:to-pink-700 transition-colors"
                  >
                    Contact Me
                  </a>
                  <a
                    href="#resume"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                  >
                    View Resume
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="max-w-4xl mx-auto mb-20">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-12 text-center group">
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent transition-colors duration-300">
                    My Journey
                  </span>
                  <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transform origin-left transition-all duration-300 group-hover:scale-x-150"></div>
                </h3>
                
                {/* Modern timeline layout */}
                <div className="relative">
                  {/* Timeline line with gradient glow */}
                  <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 transform -translate-x-1/2 hidden md:block shadow-lg"></div>
                  <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-3 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 dark:from-purple-600 dark:via-pink-600 dark:to-blue-600 transform -translate-x-1/2 hidden md:block opacity-20 blur-sm"></div>
                  
                  {/* Timeline items */}
                  <div className="space-y-16">
                    {/* Item 1 */}
                    <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center group">
                      {/* Timeline dot with rings */}
                      <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2 hidden md:block z-10">
                        <div className="w-5 h-5 bg-purple-500 dark:bg-purple-400 rounded-full shadow-lg relative">
                          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-40 bg-purple-500 dark:bg-purple-400"></div>
                        </div>
                        <div className="absolute -inset-2 bg-purple-500/20 dark:bg-purple-400/20 rounded-full blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="md:text-right md:pr-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-purple-100 dark:border-purple-800 transition-all duration-300 md:ml-auto group-hover:shadow-purple-500/20 group-hover:scale-105 group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3 transition-colors duration-300">
                          Early Interest in Technology
                          <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200 dark:border-purple-800">Phase 1</span>
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-300 relative z-10">
                          Started my journey with a passion for <span className="text-purple-600 dark:text-purple-400 font-semibold transition-colors duration-300">programming</span> in high school, learning the basics of <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">HTML, CSS, and JavaScript</span> through online resources and tutorials.
                        </p>
                      </div>
                      <div className="hidden md:block"></div>
                    </div>
                    
                    {/* Item 2 */}
                    <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center group">
                      {/* Timeline dot with rings */}
                      <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2 hidden md:block z-10">
                        <div className="w-5 h-5 bg-pink-500 dark:bg-pink-400 rounded-full shadow-lg relative">
                          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-40 bg-pink-500 dark:bg-pink-400"></div>
                        </div>
                        <div className="absolute -inset-2 bg-pink-500/20 dark:bg-pink-400/20 rounded-full blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="hidden md:block"></div>
                      <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-pink-100 dark:border-pink-800 transition-all duration-300 md:ml-8 group-hover:shadow-pink-500/20 group-hover:scale-105 group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 dark:from-pink-500/20 dark:to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h4 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-3 transition-colors duration-300">
                          College Education
                          <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 border border-pink-200 dark:border-pink-800">Phase 2</span>
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-300 relative z-10">
                          Currently pursuing <span className="text-purple-600 dark:text-purple-400 font-semibold transition-colors duration-300">Computer Science Engineering</span> at <span className="text-pink-600 dark:text-pink-400 font-semibold transition-colors duration-300">Government Engineering College, Bhojpur</span>. Focusing on <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">data structures</span>, <span className="text-green-600 dark:text-green-400 font-semibold transition-colors duration-300">algorithms</span>, and building a strong technical foundation.
                        </p>
                      </div>
                    </div>
                    
                    {/* Item 3 */}
                    <div className="relative md:grid md:grid-cols-2 md:gap-8 items-center group">
                      {/* Timeline dot with rings */}
                      <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2 hidden md:block z-10">
                        <div className="w-5 h-5 bg-blue-500 dark:bg-blue-400 rounded-full shadow-lg relative">
                          <div className="absolute inset-0 rounded-full animate-ping-slow opacity-40 bg-blue-500 dark:bg-blue-400"></div>
                        </div>
                        <div className="absolute -inset-2 bg-blue-500/20 dark:bg-blue-400/20 rounded-full blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="md:text-right md:pr-8 p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100 dark:border-blue-800 transition-all duration-300 md:ml-auto group-hover:shadow-blue-500/20 group-hover:scale-105 group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 transition-colors duration-300">
                          Current Focus
                          <span className="ml-2 align-middle text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Now</span>
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg transition-colors duration-300 relative z-10">
                          Exploring <span className="text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-300">full-stack development</span> with MERN stack, participating in <span className="text-pink-600 dark:text-pink-400 font-semibold transition-colors duration-300">coding competitions</span>, and building <span className="text-green-600 dark:text-green-400 font-semibold transition-colors duration-300">personal projects</span> to enhance my practical skills.
                        </p>
                      </div>
                      <div className="hidden md:block"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                {traits.map((trait, index) => (
                  <div
                    key={trait.name}
                    className={`group relative overflow-hidden bg-gradient-to-r ${trait.color} text-white px-6 py-3 rounded-full font-medium shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-pointer`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Modern shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    {/* Modern glass effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Content with improved spacing and animation */}
                    <div className="flex items-center gap-3 relative z-10">
                      <trait.icon size={18} className="animate-pulse" />
                      <span className="tracking-wide">{trait.name}</span>
                    </div>
                    
                    {/* Subtle particle effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-70 transition-opacity duration-300 animate-ping"></div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {highlights.map((highlight, index) => (
              <TiltCard 
                key={index}
                className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100 dark:border-purple-800"
              >
                {/* Glass morphism background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 dark:from-gray-700/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center relative z-10">
                  {/* Modern floating icon with 3D effect */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${highlight.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 animate-float`} style={{boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'}}>
                    <highlight.icon size={36} className="text-white transform transition-transform duration-300 group-hover:rotate-[-12deg]" />
                  </div>
                  
                  {/* Modern typography with gradient */}
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300">
                    {highlight.title}
                  </h4>
                  
                  {/* Clean description text */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {highlight.description}
                  </p>
                </div>

                {/* Modern hover effect with gradient border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                
                {/* Modern floating accent elements with varied sizes and positions */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float" style={{ animationDuration: '6s', animationDelay: `${index * 0.3}s` }}></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float" style={{ animationDuration: '8s', animationDelay: `${index * 0.4}s` }}></div>
                <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-float" style={{ animationDuration: '7s', animationDelay: `${index * 0.5}s` }}></div>
              </TiltCard>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;

