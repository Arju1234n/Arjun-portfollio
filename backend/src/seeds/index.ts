/**
 * Seed script — creates the initial super admin user and base content documents.
 * Run once: npm run seed
 */
import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { HeroContent, AboutContent, Stat } from '../models/Content';
import { SkillCategory, Skill } from '../models/Skill';
import { Experience } from '../models/Experience';
import { Education } from '../models/Education';
import { Certification } from '../models/Certification';
import { Project } from '../models/Project';
import { SiteSettings } from '../models/SiteSettings';
import { env } from '../config/env';

async function seed() {
  await connectDB();
  console.log('🌱 Seeding database...');

  // Super admin
  const existing = await User.findOne({ email: env.ADMIN_EMAIL });
  if (!existing) {
    await User.create({
      name:     env.ADMIN_NAME,
      email:    env.ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD,
      role:     'super_admin',
    });
    console.log(`✅ Created super admin: ${env.ADMIN_EMAIL}`);
  } else {
    console.log(`ℹ️  Super admin already exists: ${env.ADMIN_EMAIL}`);
  }

  // Hero singleton
  const hero = await HeroContent.findOne();
  if (!hero) {
    await HeroContent.create({
      name:       'Arjun Kumar',
      tagline:    'Full-Stack Developer',
      roles:      ['Full-Stack Developer', 'MERN Specialist', 'Problem Solver', 'AI / ML Enthusiast'],
      bio:        "B.Tech CSE student at GEC Bhojpur (2023–2027), building production-grade web apps with the MERN stack. Passionate about clean code, scalable systems, and shipping real products.",
      location:   'Arrah, Bihar, India',
      openToWork: true,
      stats:      [
        { value: '3+', label: 'Projects shipped' },
        { value: '12+', label: 'Technologies' },
        { value: '2+', label: 'Years coding' },
      ],
      socialLinks: [
        { platform: 'GitHub',   url: 'https://github.com/Arju1234n',             icon: 'github' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/arjun-kumar-gond', icon: 'linkedin' },
        { platform: 'Email',    url: 'mailto:kumararjun5230@gmail.com',           icon: 'mail' },
      ],
    });
    console.log('✅ Created Hero content');
  }

  // About singleton
  const about = await AboutContent.findOne();
  if (!about) {
    await AboutContent.create({
      bio: "Hi, I'm Arjun Kumar — a 2nd-year Computer Science student at Government Engineering College, Bhojpur. I specialise in building modern, full-stack web applications with the MERN stack.",
      technicalPhilosophy: 'Clean code, clear architecture, ship early and iterate. I believe in writing maintainable code that scales.',
      careerGoals: 'Long-term goal: Senior SDE at a top tech company. Building strong fundamentals in system design and distributed systems.',
      learningJourney: 'System Design & Scalability, AI Integration with MERN, Cloud & DevOps basics, TypeScript patterns',
      timeline: [
        { year: '2021', event: 'Started with HTML, CSS & JavaScript. Built first static websites.' },
        { year: '2023', event: 'Enrolled in B.Tech CSE. Joined coding clubs, started MERN development.' },
        { year: 'Jun 2025', event: 'Professional MERN training at CDAC Patna. Shipped Hospital Management System.' },
        { year: 'Now', event: 'Crafting production apps, learning system design, AI integration, and cloud patterns.' },
      ],
    });
    console.log('✅ Created About content');
  }

  // Experience
  const expCount = await Experience.countDocuments();
  if (expCount === 0) {
    await Experience.create({
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
    });
    console.log('✅ Created Experience entries');
  }

  // Education
  const eduCount = await Education.countDocuments();
  if (eduCount === 0) {
    await Education.create([
      {
        institution: 'Government Engineering College, Bhojpur',
        degree: 'Bachelor of Technology',
        field: 'Computer Science & Engineering',
        startYear: '2023',
        current: true,
        grade: '8.5 CGPA',
        description: 'Pursuing B.Tech in Computer Science with focus on software engineering, data structures, and web development.',
        displayOrder: 0,
      },
      {
        institution: 'R.G. High School, Arrah',
        degree: 'Intermediate (Class 12)',
        field: 'Science (PCM)',
        startYear: '2021',
        endYear: '2023',
        current: false,
        grade: '75%',
        description: 'Completed higher secondary education with Physics, Chemistry, and Mathematics.',
        displayOrder: 1,
      },
    ]);
    console.log('✅ Created Education entries');
  }

  // Skill Categories
  const catCount = await SkillCategory.countDocuments();
  const categories: Record<string, any> = {};
  if (catCount === 0) {
    const cats = await SkillCategory.create([
      { name: 'Frontend', emoji: '🎨', color: '#3b82f6', displayOrder: 0 },
      { name: 'Backend', emoji: '⚙️', color: '#10b981', displayOrder: 1 },
      { name: 'Database', emoji: '💾', color: '#f59e0b', displayOrder: 2 },
      { name: 'Tools & DevOps', emoji: '🛠️', color: '#8b5cf6', displayOrder: 3 },
    ]);
    cats.forEach((c: any) => { categories[c.name] = c._id; });
    console.log('✅ Created Skill Categories');
  } else {
    const cats = await SkillCategory.find();
    cats.forEach((c: any) => { categories[c.name] = c._id; });
  }

  // Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.create([
      // Frontend
      { categoryId: categories['Frontend'], name: 'React.js', level: 'advanced', percentage: 85, displayOrder: 0 },
      { categoryId: categories['Frontend'], name: 'Next.js', level: 'intermediate', percentage: 75, displayOrder: 1 },
      { categoryId: categories['Frontend'], name: 'TypeScript', level: 'intermediate', percentage: 70, displayOrder: 2 },
      { categoryId: categories['Frontend'], name: 'Tailwind CSS', level: 'advanced', percentage: 90, displayOrder: 3 },
      { categoryId: categories['Frontend'], name: 'HTML/CSS', level: 'advanced', percentage: 95, displayOrder: 4 },
      { categoryId: categories['Frontend'], name: 'JavaScript', level: 'advanced', percentage: 85, displayOrder: 5 },
      
      // Backend
      { categoryId: categories['Backend'], name: 'Node.js', level: 'advanced', percentage: 80, displayOrder: 0 },
      { categoryId: categories['Backend'], name: 'Express.js', level: 'advanced', percentage: 85, displayOrder: 1 },
      { categoryId: categories['Backend'], name: 'REST API', level: 'advanced', percentage: 85, displayOrder: 2 },
      { categoryId: categories['Backend'], name: 'JWT Auth', level: 'intermediate', percentage: 75, displayOrder: 3 },
      
      // Database
      { categoryId: categories['Database'], name: 'MongoDB', level: 'advanced', percentage: 80, displayOrder: 0 },
      { categoryId: categories['Database'], name: 'Mongoose', level: 'advanced', percentage: 80, displayOrder: 1 },
      { categoryId: categories['Database'], name: 'SQL', level: 'intermediate', percentage: 65, displayOrder: 2 },
      
      // Tools & DevOps
      { categoryId: categories['Tools & DevOps'], name: 'Git & GitHub', level: 'advanced', percentage: 85, displayOrder: 0 },
      { categoryId: categories['Tools & DevOps'], name: 'VS Code', level: 'advanced', percentage: 90, displayOrder: 1 },
      { categoryId: categories['Tools & DevOps'], name: 'Postman', level: 'advanced', percentage: 80, displayOrder: 2 },
      { categoryId: categories['Tools & DevOps'], name: 'Vercel', level: 'intermediate', percentage: 70, displayOrder: 3 },
    ]);
    console.log('✅ Created Skills');
  }

  // Projects
  const projCount = await Project.countDocuments();
  if (projCount === 0) {
    await Project.create([
      {
        title: 'Hospital Management System',
        slug: 'hospital-management-system',
        shortDescription: 'Full-stack MERN application for managing hospital operations, appointments, and patient records.',
        fullDescription: 'A comprehensive hospital management system built with MERN stack featuring user authentication, role-based access control, appointment scheduling, patient record management, and admin dashboard. Includes features like doctor availability management, prescription handling, and billing system.',
        category: 'Full-Stack',
        status: 'published',
        featured: true,
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
        githubUrl: 'https://github.com/Arju1234n',
        displayOrder: 0,
      },
      {
        title: 'Personal Portfolio Website',
        slug: 'personal-portfolio',
        shortDescription: 'Modern portfolio website with admin CMS built using Next.js and TypeScript.',
        fullDescription: 'A professional portfolio website featuring a custom-built admin dashboard for content management. Built with Next.js 15, TypeScript, and MongoDB. Includes features like project showcase, blog system, contact form, analytics tracking, and theme customization.',
        category: 'Full-Stack',
        status: 'published',
        featured: true,
        techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
        liveUrl: 'https://arjunkumar.dev',
        displayOrder: 1,
      },
      {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        shortDescription: 'Feature-rich e-commerce application with shopping cart and payment integration.',
        fullDescription: 'A modern e-commerce platform with product catalog, shopping cart, user authentication, order management, and payment gateway integration. Built with React and Node.js.',
        category: 'Full-Stack',
        status: 'published',
        featured: false,
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
        displayOrder: 2,
      },
    ]);
    console.log('✅ Created Projects');
  }

  // Certifications
  const certCount = await Certification.countDocuments();
  if (certCount === 0) {
    await Certification.create([
      {
        name: 'MERN Stack Development',
        organization: 'CDAC Patna',
        year: 2025,
        displayOrder: 0,
      },
      {
        name: 'JavaScript Algorithms and Data Structures',
        organization: 'freeCodeCamp',
        year: 2024,
        verifyUrl: 'https://freecodecamp.org/certification',
        displayOrder: 1,
      },
      {
        name: 'Responsive Web Design',
        organization: 'freeCodeCamp',
        year: 2023,
        verifyUrl: 'https://freecodecamp.org/certification',
        displayOrder: 2,
      },
    ]);
    console.log('✅ Created Certifications');
  }

  // Stats
  const statCount = await Stat.countDocuments();
  if (statCount === 0) {
    await Stat.create([
      { label: 'Projects shipped', value: '5', suffix: '+', displayOrder: 0 },
      { label: 'Technologies', value: '15', suffix: '+', displayOrder: 1 },
      { label: 'Years coding', value: '3', suffix: '+', displayOrder: 2 },
      { label: 'GitHub Repos', value: '20', suffix: '+', displayOrder: 3 },
    ]);
    console.log('✅ Created Stats');
  }

  // Site settings singleton
  const settings = await SiteSettings.findOne();
  if (!settings) {
    await SiteSettings.create({});
    console.log('✅ Created Site Settings');
  }

  console.log('✅ Seed complete');
  await disconnectDB();
  process.exit(0);
}

seed().catch((err) => { console.error('Seed failed:', err); process.exit(1); });
