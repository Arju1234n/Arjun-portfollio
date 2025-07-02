import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: '#', name: 'GitHub' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Mail, href: '', name: 'Email' }
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-10 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-t border-purple-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-shimmer">
              Muskan Bharti
            </span>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-purple-400 hover:text-purple-600 transition-colors duration-200"
                title={social.name}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Muskan Bharti. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;