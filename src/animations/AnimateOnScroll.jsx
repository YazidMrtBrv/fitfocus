"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "./useScrollAnimation";

export function AnimateOnScroll({
  children,
  variants,
  delay = 0,
  className = "",
  as: Component = "div",
}) {
  const { ref, isInView } = useScrollAnimation(0.1);

  const mergedVariants = {
    hidden: variants?.hidden || { opacity: 0, y: 20 },
    visible: {
      ...(variants?.visible || { opacity: 1, y: 0 }),
      transition: {
        ...(variants?.visible?.transition || { duration: 0.5 }),
        delay,
      },
    },
  };

  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={mergedVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
