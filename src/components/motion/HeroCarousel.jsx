import { useEffect, useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AbstractPanel from "../ui/AbstractPanel";

export default function HeroCarousel({ slides, interval = 5000, className = "" }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(timerRef.current);
  }, [paused, interval, slides.length]);

  const slide = slides[index];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.variant + index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0"
        >
          <AbstractPanel variant={slide.variant} tone={slide.tone} className="h-full w-full" animated={false} />
        </motion.div>
      </AnimatePresence>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`caption-${index}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-5 left-5 z-10 max-w-[70%]"
        >
          <p className="eyebrow text-brass-300">{slide.eyebrow}</p>
          <p className="mt-1 font-display text-lg text-paper">{slide.caption}</p>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-ink/70 active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-paper backdrop-blur-sm transition-transform duration-200 hover:scale-105 hover:bg-ink/70 active:scale-95"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <div className="absolute right-5 top-5 z-10 flex gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.variant + i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-brass-400" : "w-1.5 bg-paper/40 hover:bg-paper/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
