import type { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const viewportConfig = {
  once: true,
  margin: '-80px',
};

// Respect prefers-reduced-motion
export function getReducedMotionVariants(variants: Variants): Variants {
  return Object.fromEntries(
    Object.entries(variants).map(([key, value]) => [
      key,
      typeof value === 'object' && 'y' in value
        ? { ...value, y: 0, x: 0, scale: 1 }
        : value,
    ]),
  );
}
