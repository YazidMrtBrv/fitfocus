export const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const projectsGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const projectCard = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const skillsList = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const skillItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const skillBar = (level) => ({
  hidden: { width: "0%" },
  visible: {
    width: "0%",
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
  animate: {
    width: level,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
});

export const sectionTitle = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const sectionLine = {
  hidden: { width: 0 },
  visible: {
    width: "4rem",
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};
