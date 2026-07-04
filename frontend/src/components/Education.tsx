'use client';
// src/components/Education.tsx
import React from 'react';
import Reveal from './Reveal';
import SectionHeading from './ui/SectionHeading';
import { GraduationCap, Calendar, MapPin, Trophy, BookOpen } from 'lucide-react';
import { EDUCATION_DATA } from '@/data/education';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <SectionHeading
          title="Education"
          label="Academic background"
          subtitle="My computer science foundation."
          align="left"
        />

        <div className="flex flex-col gap-8">
          {EDUCATION_DATA.map((edu) => (
            <Reveal key={edu.id}>
              <div className="card p-8 group">
                {/* Header row */}
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors duration-200">
                    <GraduationCap size={22} className="text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{edu.degree}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} aria-hidden="true" /> {edu.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} aria-hidden="true" /> {edu.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">{edu.description}</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                      <Trophy size={14} className="text-amber-500" aria-hidden="true" /> Achievements
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" aria-hidden="true" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Courses */}
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                      <BookOpen size={14} className="text-blue-500" aria-hidden="true" /> Key Courses
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
