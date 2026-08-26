import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * A soft, mouse-reactive mesh of glowing blobs used behind the hero.
 * Isolated in its own component and driven entirely by Framer Motion's
 * useMotionValue/useSpring (never React state) so pointer tracking never
 * triggers a re-render of the parent tree.
 */
export default function InteractiveField({ className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 40, damping: 20, mass: 1 });
  const smy = useSpring(my, { stiffness: 40, damping: 20, mass: 1 });

  const blob1X = useTransform(smx, [0, 1], ["-6%", "10%"]);
  const blob1Y = useTransform(smy, [0, 1], ["-6%", "8%"]);
  const blob2X = useTransform(smx, [0, 1], ["8%", "-10%"]);
  const blob2Y = useTransform(smy, [0, 1], ["6%", "-8%"]);

  const handlePointerMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
      className={`pointer-events-auto absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        className="absolute h-[60%] w-[60%] rounded-full opacity-[0.28] blur-[90px]"
        style={{
          left: blob1X,
          top: blob1Y,
          background: "radial-gradient(circle, var(--color-brass-400), transparent 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 h-[55%] w-[55%] rounded-full opacity-[0.22] blur-[100px]"
        style={{
          right: blob2X,
          bottom: blob2Y,
          background: "radial-gradient(circle, var(--color-emerald-600), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--color-brass-200)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}
