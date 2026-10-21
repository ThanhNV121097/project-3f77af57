import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * The site's one reveal: 16px up and a fade, 600ms, as a section enters.
 * `delay` staggers a group. With prefers-reduced-motion it draws the end
 * state and nothing moves.
 */
export default function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.75, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
