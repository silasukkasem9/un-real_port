import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Mail, ExternalLink, Copy, Check } from 'lucide-react';
import styles from './Contact.module.css';

const CONTACT_INFO = {
  email: 'silasukkasem9@gmail.com',
  github: 'https://github.com/silasukkasem9',
  githubDisplayName: 'Th!rD',
  githubUsername: 'silasukkasem9',
};

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | null>(null);

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.');
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopyStatus('copied');
    } catch (error) {
      console.error('Unable to copy the contact email.', error);
      setCopyStatus('failed');
    }
    window.setTimeout(() => setCopyStatus(null), 2400);
  };

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-heading">
      <div className={styles.inner} ref={ref}>
        {/* Closing display statement */}
        <motion.div
          className={styles.statement}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 48 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label" style={{ display: 'block', marginBottom: 'var(--sp-6)' }}>
            04 / Contact &amp; Connection
          </span>
          <h2 id="contact-heading" className={styles.headline} tabIndex={-1}>
            <span className={styles.headlineMain}>Let&apos;s</span>
            <span className={styles.headlineAccent}>Build</span>
            <span className={styles.headlineDim}>Something</span>
            <span className={styles.headlineThin}>Real.</span>
          </h2>
        </motion.div>

        {/* Contact body */}
        <motion.div
          className={styles.body}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className={styles.links} aria-label="Direct contact links">
            <div className={styles.emailAction}>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className={styles.contactLink}
                aria-label={`Send email to ${CONTACT_INFO.email}`}
              >
                <span className={styles.contactLinkIcon} aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span className={styles.contactLinkText}>
                  <span className={styles.contactLinkLabel}>Email Direct</span>
                  <span className={styles.contactLinkSublabel}>{CONTACT_INFO.email}</span>
                </span>
                <ExternalLink size={14} className={styles.contactLinkArrow} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                aria-label={copyStatus === 'copied' ? 'Email copied' : copyStatus === 'failed' ? 'Copy failed' : 'Copy email address'}
                className={styles.copyButton}
              >
                {copyStatus === 'copied' ? <Check size={14} /> : <Copy size={14} />}
                <span>{copyStatus === 'copied' ? 'COPIED' : copyStatus === 'failed' ? 'UNAVAILABLE' : 'COPY EMAIL'}</span>
              </button>
            </div>

            {/* Verified GitHub link */}
            <a
              href={CONTACT_INFO.github}
              className={styles.contactLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub profile: ${CONTACT_INFO.githubDisplayName} (@${CONTACT_INFO.githubUsername})`}
            >
              <span className={styles.contactLinkIcon} aria-hidden="true">
                <GitHubIcon />
              </span>
              <span className={styles.contactLinkText}>
                <span className={styles.contactLinkLabel}>GitHub // {CONTACT_INFO.githubDisplayName}</span>
                <span className={styles.contactLinkSublabel}>github.com/{CONTACT_INFO.githubUsername}</span>
              </span>
              <ExternalLink size={14} className={styles.contactLinkArrow} aria-hidden="true" />
            </a>
          </div>

          <p className={styles.tagline}>
            Focusing on clean component architecture, interface ergonomics, and distributed boundaries.
            Open to technical discussions, architectural reviews, and collaborative challenges.
          </p>
        </motion.div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.footerWordmark}>UNREAL PorT</span>
            <span className="label">Selected work / systems</span>
          </div>
          <div className={styles.footerRight}>
            <span className="label">Built with React + TypeScript + Vite</span>
            <span className="label">Motion for React &amp; Lucide</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
