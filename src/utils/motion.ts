import type { Variants, Transition } from 'framer-motion';

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: custom * 0.08,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 28,
      stiffness: 350,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
