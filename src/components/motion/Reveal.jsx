import { motion } from "framer-motion";

/**
 * Fades + lifts content into view once, the first time it enters the
 * viewport. Wrap sections/cards in this instead of animating on mount.
 */
export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div", ...props }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** Parent wrapper that staggers its motion children's entrance. */
export function RevealGroup({ children, className = "", stagger = 0.08, ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const revealItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};
