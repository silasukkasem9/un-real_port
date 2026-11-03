import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import styles from './Hero.module.css';

function ArchitecturalPlate() {
  return (
    <svg
      className={styles.architecturalPlate}
      viewBox="0 0 440 440"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="plate-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#765C40" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#765C40" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="220" cy="220" r="190" fill="url(#plate-glow)" />
      <rect
        x="30"
        y="30"
        width="380"
        height="380"
        fill="none"
        stroke="#AAA496"
        strokeWidth="0.8"
      />

      <circle cx="220" cy="220" r="145" fill="none" stroke="#C9C2B5" strokeWidth="0.8" />
      <circle cx="220" cy="220" r="88" fill="none" stroke="#AAA496" strokeWidth="0.8" />
      <line x1="220" y1="75" x2="220" y2="365" stroke="#C9C2B5" strokeWidth="0.8" />
      <line x1="75" y1="220" x2="365" y2="220" stroke="#C9C2B5" strokeWidth="0.8" />
      <rect x="166" y="166" width="108" height="108" fill="none" stroke="#765C40" strokeWidth="1.2" />
      <circle cx="220" cy="220" r="4" fill="#765C40" />
      <text x="42" y="52" fontFamily="Georgia, serif" fontSize="12" fill="#171916">
        A system, seen from within
      </text>
      <text x="42" y="74" fontFamily="Cascadia Mono, monospace" fontSize="8" fill="#55564F">
        CLEAR BOUNDARIES / HUMAN SCALE
      </text>
      <text x="42" y="398" fontFamily="Cascadia Mono, monospace" fontSize="8" fill="#55564F">
        USER
      </text>
      <text x="188" y="398" fontFamily="Cascadia Mono, monospace" fontSize="8" fill="#55564F">
        INTERFACE
      </text>
      <text x="340" y="398" fontFamily="Cascadia Mono, monospace" fontSize="8" fill="#765C40">
        SYSTEM
      </text>
    </svg>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const animDuration = shouldReduceMotion ? 0 : 0.8;
  const staggerDelay = shouldReduceMotion ? 0 : 0.12;
  const titleLines = ['CHAOS IN THE', 'MIND.', 'CRAFT, IN ORDER.'];

  return (
    <section id="hero" className={styles.hero} aria-label="Hero — introduction">
      {/* Editorial Header Metadata */}
      <div className={styles.metaStrip} aria-hidden="true">
        <div className={styles.metaLeft}>
          <span className={styles.metaItem}>UNREAL PorT</span>
          <span className={styles.metaSep}>/</span>
          <span className={styles.metaItem}>Personal portfolio</span>
          <span className={styles.metaSep}>/</span>
          <span className={styles.metaItem}>SYSTEMS &amp; INTERFACES</span>
        </div>
        <div className={styles.metaRight}>
          <span className={styles.metaItem}>Th!rD</span>
          <span className={styles.metaSep}>/</span>
          <span className={styles.metaItem}>2026</span>
        </div>
      </div>

      {/* Main Editorial Grid */}
      <div className={styles.grid}>
        {/* Left column — primary typography */}
        <div className={styles.colLeft}>
          {/* Identity label */}
          <motion.div
            className={styles.identityLabel}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: animDuration, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.labelLine} />
            <span className="label">Th!rD — System Designer &amp; UI Architect</span>
          </motion.div>

          {/* Large Editorial Serif Display Headline */}
          <h1 className={styles.headline} aria-label="Chaos in the mind. Craft, in order." tabIndex={-1}>
            {titleLines.map((line, i) => (
              <motion.span
                key={i}
                className={`${styles.headlineLine} ${i === 2 ? styles.headlineLineOffset : ''}`}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: animDuration,
                  delay: i * staggerDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animDuration, delay: staggerDelay * 4 }}
          >
            Architecture of Madness.
          </motion.p>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animDuration, delay: staggerDelay * 5 }}
          >
            Design for people, not systems. I explore the edge cases, then try to ship the simplest
            thing that serves the person using it.
          </motion.p>

          {/* Editorial CTAs */}
          <motion.div
            className={styles.ctaRow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animDuration, delay: staggerDelay * 6 }}
          >
            <a
              href="#capabilities"
              className={styles.ctaPrimary}
            >
              Explore Capabilities
            </a>
            <a
              href="#about"
              className={styles.ctaSecondary}
            >
              Developer Profile
            </a>
          </motion.div>
        </div>

        {/* Right column — bespoke architectural plate */}
        <motion.div
          className={styles.colRight}
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <div className={styles.plateWrapper}>
            <ArchitecturalPlate />
            <div className={styles.plateCaption}>
              <span className="label">FIGURE 01</span>
              <span className="label" style={{ color: 'var(--col-accent)' }}>
                SYSTEM TAXONOMY
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Editorial Colophon strip at bottom */}
      <div className={styles.bottomMeta} aria-hidden="true">
        <span className={styles.metaItem}>REACT 19 + TYPESCRIPT + VITE</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.metaItem}>MOTION FOR REACT</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.metaItem}>SHABULABX CASE STUDY</span>
        <span className={styles.metaSep}>·</span>
        <span className={styles.metaItem}>SOURCE-VERIFIED ARCHITECTURE</span>
      </div>

      {/* Understated scroll cue */}
      <a
        href="#capabilities"
        className={styles.scrollCue}
        aria-label="Go to capabilities section"
      >
        <span className="label">Scroll to Capabilities</span>
        <ArrowDown size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
