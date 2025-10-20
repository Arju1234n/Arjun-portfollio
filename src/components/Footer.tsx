import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/Arju1234n', name: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/arjun-k-35990b21b/', name: 'LinkedIn' },
    { icon: Mail, href: 'mailto:kumararjun5230@gmail.com', name: 'Email' }
  ];

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-purple-200/40 dark:border-purple-800/40 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-xl">
            {/* gradient border overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20" />
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">
                    Arjun Kumar
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Aspiring Software Engineer • Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    title={social.name}
                    aria-label={social.name}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <social.icon size={20} className="text-purple-600 dark:text-purple-300" />
                  </a>
                ))}

                <button
                  onClick={scrollTop}
                  title="Back to top"
                  aria-label="Back to top"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Arjun Kumar. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;