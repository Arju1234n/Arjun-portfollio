import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeProvider';
import ThemeScroll from './components/ThemeScroll';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import SectionDivider from './components/SectionDivider';
import CursorTrail from './components/CursorTrail';
import SectionDots from './components/SectionDots';
import Toast from './components/Toast';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 theme-transition scrollbar-light dark:scrollbar-dark">
        <ScrollProgress />
        <CursorTrail />
        <SectionDots />
        <Toast />
        <Header />
        <CommandPalette />
        {/* Hero removed per request */}
        <About />
        <SectionDivider flip />
        <Education />
        <SectionDivider flip />
        <Skills />
        <SectionDivider />
        <Resume />
        <SectionDivider flip />
        <Contact />
        <Footer />
        <ThemeScroll />
      </div>
    </ThemeProvider>
  );
}

export default App;