import { Award, ExternalLink } from 'lucide-react';

type Cert = {
  title: string;
  issuer: string;
  date: string;
  url?: string;
};

const certs: Cert[] = [
  { title: 'JavaScript (Beginner to Advanced)', issuer: 'Coursera', date: '2024', url: '#' },
  { title: 'React Fundamentals', issuer: 'Meta / Coursera', date: '2024', url: '#' },
  { title: 'Data Structures & Algorithms', issuer: 'Udemy', date: '2025', url: '#' },
  { title: 'Git & GitHub', issuer: 'Google', date: '2024', url: '#' },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 transition-colors duration-300" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 mx-auto rounded-full animate-shimmer" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certs.map((c) => (
            <div key={c.title} className="group relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-purple-100 dark:border-purple-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md">
                  <Award size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{c.title}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{c.issuer} • {c.date}</div>
                </div>
              </div>
              {c.url && (
                <a href={c.url} className="mt-4 inline-flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300 hover:underline">
                  View Credential <ExternalLink size={14} />
                </a>
              )}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
