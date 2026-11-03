import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, RotateCcw } from 'lucide-react';
import styles from './Nav.module.css';

interface NavLinkItem {
  num: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { num: '01', label: 'Index', href: '#hero' },
  { num: '02', label: 'Capabilities', href: '#capabilities' },
  { num: '03', label: 'About', href: '#about' },
  { num: '04', label: 'Contact', href: '#contact' },
];

interface NavProps {
  onReplayIntro?: () => void;
}

export function Nav({ onReplayIntro }: NavProps) {
  const [activeSection, setActiveSection] = useState(() => {
    const initialHash = window.location.hash;
    return NAV_LINKS.some((link) => link.href === initialHash) ? initialHash : '#hero';
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef(false);
  const protectedHashRef = useRef<string | null>(null);

  // The section crossing a consistent reading line is active, regardless of its height.
  useEffect(() => {
    let frame = 0;
    let protectedHashTimer = 0;

    const syncFromReadingPosition = () => {
      frame = 0;
      const sections = NAV_LINKS
        .map((link) => document.getElementById(link.href.slice(1)))
        .filter((section): section is HTMLElement => section !== null);
      if (sections.length === 0) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      let current = sections[0];

      if (scrollY > 2 && maxScroll > 0 && scrollY >= maxScroll - 2) {
        current = sections[sections.length - 1];
      } else if (scrollY > 2) {
        const readingLine = scrollY + Math.max(112, window.innerHeight * 0.22);
        for (const section of sections) {
          if (section.getBoundingClientRect().top + scrollY > readingLine) break;
          current = section;
        }
      }

      const nextHash = `#${current.id}`;
      setActiveSection((previous) => (previous === nextHash ? previous : nextHash));

      if (protectedHashRef.current === nextHash) {
        protectedHashRef.current = null;
        window.clearTimeout(protectedHashTimer);
      } else if (protectedHashRef.current === null && window.location.hash !== nextHash) {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}${nextHash}`,
        );
      }
    };

    const scheduleSync = () => {
      if (frame === 0) frame = window.requestAnimationFrame(syncFromReadingPosition);
    };

    const syncFromLocation = () => {
      const hash = window.location.hash;
      if (NAV_LINKS.some((link) => link.href === hash)) {
        protectedHashRef.current = hash;
        window.clearTimeout(protectedHashTimer);
        protectedHashTimer = window.setTimeout(() => {
          protectedHashRef.current = null;
          scheduleSync();
        }, 2000);
        setActiveSection(hash);
      }
      scheduleSync();
    };

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    window.addEventListener('hashchange', syncFromLocation);
    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('pageshow', syncFromLocation);

    const initialFrame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(() => {
        const initialHash = window.location.hash;
        const initialTarget = NAV_LINKS.some((link) => link.href === initialHash)
          ? document.getElementById(initialHash.slice(1))
          : null;

        if (initialTarget && initialHash !== '#hero' && window.scrollY <= 2) {
          initialTarget.scrollIntoView();
        } else {
          syncFromReadingPosition();
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(initialFrame);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.clearTimeout(protectedHashTimer);
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      window.removeEventListener('hashchange', syncFromLocation);
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('pageshow', syncFromLocation);
    };
  }, []);

  // Keep keyboard focus inside the modal menu and return it when dismissed.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = 'hidden';
    const menuToggle = menuToggleRef.current;
    const getFocusableElements = () =>
      mobileMenuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [];
    getFocusableElements()[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        restoreFocusRef.current = true;
        setMenuOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements = getFocusableElements();
        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (restoreFocusRef.current) {
        menuToggle?.focus();
        restoreFocusRef.current = false;
      }
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((href: string, fromMobile = false) => {
    setMenuOpen(false);
    setActiveSection(href);
    protectedHashRef.current = href;
    if (fromMobile) {
      restoreFocusRef.current = false;
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`${href} h1, ${href} h2`)?.focus({ preventScroll: true });
      });
    }
  }, []);

  return (
    <>
      {/* ── DESKTOP VERTICAL NAVIGATION RAIL ────────────────────────────── */}
      <aside className={styles.desktopRail} aria-label="Desktop side navigation">
        {/* Top: Identity Monogram */}
        <div className={styles.railHeader}>
          <a
            href="#hero"
            className={styles.railWordmark}
            aria-label="UNREAL PorT — return to top"
            onClick={() => handleNavClick('#hero')}
          >
            <span className={styles.monogram}>UP</span>
            <span className={styles.railIdentity}>TH!RD</span>
          </a>
        </div>

        {/* Center: Vertical Section Links */}
        <nav className={styles.railNav} aria-label="Primary portfolio navigation">
          <ul className={styles.railList}>
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href} className={styles.railItem}>
                  <a
                    href={link.href}
                    className={`${styles.railLink} ${isActive ? styles.railLinkActive : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => handleNavClick(link.href)}
                  >
                    <span className={styles.railNum}>{link.num}</span>
                    <span className={styles.railLabel}>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom: Status & Replay Intro Control */}
        <div className={styles.railFooter}>
          {onReplayIntro && (
            <button
              type="button"
              className={styles.railActionBtn}
              onClick={onReplayIntro}
              title="Replay introductory sequence"
              aria-label="Replay introductory sequence"
            >
              <RotateCcw size={14} aria-hidden="true" />
              <span className={styles.railActionLabel}>Replay</span>
            </button>
          )}

          <span className={styles.railStatus}>Selected work &amp; systems</span>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR & NAVIGATION ALTERNATIVE ──────────────────────── */}
      <header className={styles.mobileBar} role="banner">
        <a
          href="#hero"
          className={styles.mobileWordmark}
          aria-label="UNREAL PorT — back to top"
          onClick={() => handleNavClick('#hero')}
        >
          <span className={styles.mobileWordmarkMain}>UNREAL</span>
          <span className={styles.mobileWordmarkSub}>PorT</span>
        </a>

        <div className={styles.mobileActions}>
          <button
            ref={menuToggleRef}
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-dialog"
            onClick={() =>
              setMenuOpen((prev) => {
                if (prev) restoreFocusRef.current = true;
                return !prev;
              })
            }
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-dialog"
            ref={mobileMenuRef}
            className={styles.mobileMenuOverlay}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.mobileMenuInner}>
              <div className={styles.mobileMenuHeader}>
                <span className="label">Jump to section</span>
              </div>

              <ul className={styles.mobileMenuList}>
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <a
                        href={link.href}
                        className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={() => handleNavClick(link.href, true)}
                      >
                        <span className={styles.mobileLinkNum}>{link.num}</span>
                        <span className={styles.mobileLinkText}>{link.label}</span>
                        {isActive && <span className={styles.mobileActiveTag}>CURRENT</span>}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className={styles.mobileMenuFooter}>
                {onReplayIntro && (
                  <button
                    type="button"
                    className={styles.mobileReplayBtn}
                    onClick={() => {
                      setMenuOpen(false);
                      onReplayIntro();
                    }}
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    <span>Replay Cinematic Intro</span>
                  </button>
                )}
                <div className={styles.mobileFooterMeta}>
                  <span>UNREAL PorT · Selected work &amp; systems</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
