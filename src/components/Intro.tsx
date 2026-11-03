import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import styles from './Intro.module.css';

interface IntroProps {
  onComplete: () => void;
}

type IntroStage = 'signal' | 'manifest' | 'exit';

export function Intro({ onComplete }: IntroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<IntroStage>('signal');
  const skipButtonRef = useRef<HTMLButtonElement>(null);

  const handleFinish = useCallback(() => {
    try {
      sessionStorage.setItem('unreal_intro_shown', 'true');
    } catch {
      // Ignore storage errors in restricted contexts
    }
    onComplete();
  }, [onComplete]);

  // Reduced motion bypass
  useEffect(() => {
    if (shouldReduceMotion) {
      handleFinish();
    }
  }, [shouldReduceMotion, handleFinish]);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    skipButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      } else if (e.key === 'Tab') {
        e.preventDefault();
        skipButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFinish]);

  // Keep the title sequence brief; it is an introduction, not a loading screen.
  useEffect(() => {
    if (shouldReduceMotion) return;

    const tManifest = setTimeout(() => {
      setStage('manifest');
    }, 350);
    const tExit = setTimeout(() => {
      setStage('exit');
    }, 1450);
    const tDone = setTimeout(() => {
      handleFinish();
    }, 1850);

    return () => {
      clearTimeout(tManifest);
      clearTimeout(tExit);
      clearTimeout(tDone);
    };
  }, [shouldReduceMotion, handleFinish]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          className={styles.introOverlay}
          role="dialog"
          aria-modal="true"
          aria-label="Portfolio Introduction Sequence"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Architectural Framing */}
          <div className={styles.frameContainer}>
            <span className={`${styles.frameCorner} ${styles.cornerTL}`} />
            <span className={`${styles.frameCorner} ${styles.cornerTR}`} />
            <span className={`${styles.frameCorner} ${styles.cornerBL}`} />
            <span className={`${styles.frameCorner} ${styles.cornerBR}`} />

            {/* Top Bar */}
            <div className={styles.introHeader}>
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                <span>
                  {stage === 'signal' && 'TH!RD / PERSONAL PORTFOLIO'}
                  {stage === 'manifest' && 'SYSTEMS / INTERFACES / PRACTICE'}
                </span>
              </div>

              <button
                ref={skipButtonRef}
                type="button"
                className={styles.skipButton}
                onClick={handleFinish}
                aria-label="Skip introductory animation sequence"
              >
                Skip introduction
              </button>
            </div>

            {/* Bottom Bar */}
            <div className={styles.introFooter}>
              <div className={styles.footerLeft}>
                <span>A STUDY IN SYSTEMS AND FORM</span>
                <span>·</span>
                <span>QUIET EXTERIOR / COMPLEX INTERIOR</span>
              </div>
              <div>
                <span>UNREAL PorT · 2026</span>
              </div>
            </div>
          </div>

          {/* Central Editorial Spread */}
          <div className={styles.centerStage}>
            {/* Stage A: Architectural Reticle */}
            <motion.div
              className={styles.signalGraphic}
              aria-hidden="true"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === 'signal' ? [0.8, 1.05, 1] : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.reticleOuter} />
              <div className={styles.reticleInner} />
              <div className={styles.reticleAxisX} />
              <div className={styles.reticleAxisY} />
              <div className={styles.reticleCenter} />
            </motion.div>

            {/* Stage B: Typographic Manifestation */}
            <div className={styles.titleMask}>
              <motion.h1
                className={styles.manifestTitle}
                initial={{ y: 60, opacity: 0 }}
                animate={{
                  y: stage !== 'signal' ? 0 : 60,
                  opacity: stage !== 'signal' ? 1 : 0,
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.titleUnreal}>UNREAL</span>
                <span className={styles.titlePort}>PorT</span>
              </motion.h1>
            </div>

            <motion.p
              className={styles.manifestTagline}
              initial={{ opacity: 0 }}
              animate={{ opacity: stage !== 'signal' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Architecture of Madness. Precision in the engineering.
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
