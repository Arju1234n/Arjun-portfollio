import { FileText, Clock } from 'lucide-react';

const Resume = () => {
  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/30 dark:to-blue-900/30 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-100/30 to-blue-100/30 dark:via-purple-500/10 dark:to-pink-500/10 animate-gradient transition-colors duration-300"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 dark:from-purple-400 dark:via-pink-400 dark:to-blue-400 bg-clip-text text-transparent transition-colors duration-300">
              Resume
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 mx-auto mb-10 rounded-full animate-shimmer transition-colors duration-300"></div>

          <div className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-purple-100 dark:border-purple-800">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-float"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float" style={{ animationDuration: '7s' }}></div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <FileText className="text-purple-600 dark:text-purple-400" size={36} />
              <h3 className="text-2xl font-bold">Resume Coming Soon</h3>
            </div>

            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              I’m polishing my resume. It will be available here as a downloadable PDF shortly.
            </p>

            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <Clock size={16} />
              <span>Check back soon or contact me for the latest copy.</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                disabled
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white opacity-70 cursor-not-allowed"
              >
                Download PDF (soon)
              </button>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-medium border border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
