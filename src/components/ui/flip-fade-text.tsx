"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type FlipFadeTextProps = {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
  /** ms each word stays on screen */
  interval?: number;
  /** per-word hold times (ms) — overrides `interval` positionally */
  intervals?: number[];
  /** false: play the list once, then hold the last word */
  loop?: boolean;
  /** pause cycling (e.g. while scrolled offscreen) */
  active?: boolean;
  /** fires when a non-looping run reaches the last word */
  onComplete?: () => void;
};

export function FlipFadeText({
  words,
  className = "",
  style,
  interval = 1400,
  intervals,
  loop = true,
  active = true,
  onComplete,
}: FlipFadeTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!active) return;
    const hold = intervals?.[index] ?? interval;
    if (!loop && index === words.length - 1) {
      const done = setTimeout(() => onComplete?.(), hold);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => setIndex((i) => (i + 1) % words.length), hold);
    return () => clearTimeout(t);
  }, [index, interval, intervals, loop, active, onComplete, words.length]);

  return (
    <span
      className={`relative inline-grid place-items-center ${className}`}
      style={{ perspective: 800, ...style }}
    >
      {/* Invisible sizer — reserves width of the longest word so nothing jumps */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {words.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="col-start-1 row-start-1 inline-block"
          initial={{ opacity: 0, rotateX: 82, y: 14, filter: "blur(8px)" }}
          animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, rotateX: -82, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "50% 100%", backfaceVisibility: "hidden" }}
          suppressHydrationWarning
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
