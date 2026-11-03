import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import styles from './Cursor.module.css';

// Detect hover capability synchronously (SSR-safe guard)
function supportsHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// Only show custom cursor on non-touch devices
export function Cursor() {
  const shouldReduceMotion = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  // Evaluate once at mount — avoids setState-in-effect pattern
  const [active] = useState<boolean>(() => supportsHover());
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!active || shouldReduceMotion) return;

    document.body.classList.add('custom-cursor-active');

    let frame: number;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      frame = requestAnimationFrame(tick);
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest('a, button, [role="link"], [tabindex]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(frame);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [active, shouldReduceMotion]);

  if (!active || shouldReduceMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`${styles.ring} ${isHovering ? styles.ringActive : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
