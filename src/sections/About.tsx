import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import styles from './About.module.css';

const TECH_AREAS = [
  {
    category: 'Architecture & Foundations',
    items: ['Component Isolation', 'REST/JSON Contract Design', 'Prisma Schema Modeling', 'Data Flow Boundaries'],
  },
  {
    category: 'Frontend Engineering',
    items: ['React 19 & TypeScript', 'Vite Bundler Tooling', 'Motion for React', 'CSS Modules / Tokens'],
  },
  {
    category: 'Backend & Infrastructure',
    items: ['Express.js Services', 'MySQL Persistence', 'JWT Authentication', 'Linux Environments'],
  },
  {
    category: 'Methodologies',
    items: ['Data Honesty First', 'Defensive Error Handling', 'Accessible Semantic UI', 'Protocol Inspection'],
  },
];

export function About() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className={styles.inner}>
        {/* Section header */}
        <div className={styles.sectionHeader} ref={headerRef}>
          <motion.span
            className="label"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            03 / Developer Identity
          </motion.span>
          <motion.h2
            id="about-heading"
            className={styles.sectionTitle}
            tabIndex={-1}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            The<br />Developer
          </motion.h2>
        </div>

        {/* Body grid */}
        <div className={styles.bodyGrid}>
          {/* Left: editorial text */}
          <motion.div
            className={styles.textColumn}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className={styles.leadText}>
              Design for people, not for systems. Good architecture should make life simpler on the human side.
            </p>

            <div className={styles.bodyText}>
              <p>
                Operating under the pseudonym <strong>Th!rD</strong> (GitHub: <code className="mono">silasukkasem9</code>),
                I am an IT student drawn to the tension between structural precision and human needs. A system
                can be elegant on paper and still be a nuisance to use; the people on the other side of it matter.
              </p>
              <p>
                I overthink by nature, not by job title: I explore alternatives, tug at assumptions, and occasionally
                discover that an edge case has brought a friend. The trick is knowing when to stop exploring and
                ship the simplest thing that serves the user.
              </p>
              <p>
                “Architecture of Madness” is my shorthand for ambitious ideas arriving in a slightly chaotic order.
                The engineering should make them coherent: clear boundaries, honest evidence, and abstractions that
                earn their keep. More layers are not automatically more thoughtful.
              </p>
              <p>
                My pieces are a mix of projects and experiments, not a shelf of supposedly finished products.
                ShabulabX has a source-backed case study; Linux system environments remain an area of exploration.
                I want to keep building, and to be clear about what is complete, ongoing, or still an idea.
              </p>
            </div>
          </motion.div>

          {/* Right: Technical Toolkit & Stack Ecosystem */}
          <div className={styles.skillsColumn}>
            <div className={styles.skillsHeader}>
              <span className="label">Ecosystem &amp; Tooling Footprint</span>
            </div>
            <div className={styles.skillsGrid}>
              {TECH_AREAS.map((group, i) => (
                <motion.div
                  key={group.category}
                  className={styles.skillGroup}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  animate={headerInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                >
                  <h3 className={styles.skillCategory}>{group.category}</h3>
                  <ul className={styles.skillItems}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.skillItem}>
                        <span className={styles.skillDot} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Authentic Engineering Status Bar */}
        <div className={styles.statsBar} role="list" aria-label="Developer Profile & Working Orientation">
          {[
            { label: 'Role / Focus', value: 'SYSTEM DESIGN', note: 'Architecture' },
            { label: 'Identity', value: 'TH!RD', note: 'silasukkasem9' },
            { label: 'Core Principle', value: 'DATA HONESTY', note: 'Zero Masquerade' },
            { label: 'Status', value: 'ACTIVE', note: 'Open to Dialogue' },
          ].map((stat) => (
            <div key={stat.label} className={styles.statItem} role="listitem">
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              {stat.note && <span className={styles.statNote}>{stat.note}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
