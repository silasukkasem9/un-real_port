import { useCallback, useState } from 'react';
import { MotionConfig } from 'motion/react';
import './App.css';
import { Nav } from './components/Nav';
import { Intro } from './components/Intro';
import { Hero } from './sections/Hero';
import { Capabilities } from './sections/Capabilities';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return sessionStorage.getItem('unreal_intro_shown') !== 'true';
    } catch {
      return true;
    }
  });

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    window.requestAnimationFrame(() => {
      const targetId = window.location.hash.slice(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      const targetHeading =
        targetSection?.querySelector<HTMLElement>('h1, h2') ??
        document.querySelector<HTMLElement>('#hero h1');
      targetHeading?.focus({ preventScroll: true });
    });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <>
        {showIntro && <Intro onComplete={handleIntroComplete} />}
        <div className="appContent" inert={showIntro} aria-hidden={showIntro}>
          <Nav onReplayIntro={handleReplayIntro} />
          <main id="main-content">
            <Hero />
            <Capabilities />
            <About />
            <Contact />
          </main>
        </div>
      </>
    </MotionConfig>
  );
}

export default App;
