"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import IanCreativeBanner from "./IanCreativeBanner";
import { FlipFadeText } from "@/components/ui/flip-fade-text";

const INTRO_BUBBLES = [
  { src: "/bubbles/js-bubble.jpeg", alt: "JavaScript", delay: 0.15 },
  { src: "/bubbles/html-bubble.jpeg", alt: "HTML5", delay: 0.38 },
  { src: "/bubbles/py-bubble.jpeg", alt: "Python", delay: 0.61 },
];

const WORDS = ["Calm.", "Crafted.", "Kinetic."];

const BUBBLE_FRAME = {
  border: "1px solid rgba(255,255,255,0.75)",
  boxShadow:
    "0 10px 36px rgba(107,66,38,0.22), 0 2px 8px rgba(107,66,38,0.1), inset 0 1px 1px rgba(255,255,255,0.85)",
  background: "#fff",
} as const;

function IntroBubble({ src, alt, delay }: { src: string; alt: string; delay: number }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      draggable={false}
      className="rounded-full object-cover select-none"
      style={{
        width: "clamp(72px, 20vw, 116px)",
        height: "clamp(72px, 20vw, 116px)",
        ...BUBBLE_FRAME,
      }}
      initial={{ opacity: 0, scale: 0.3, rotateX: 90, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 20,
        delay,
        filter: { duration: 0.5, delay },
        opacity: { duration: 0.35, delay },
      }}
      suppressHydrationWarning
    />
  );
}

/**
 * First-landing sequence: tech bubbles flip-fade in, three words cycle,
 * then the curtain lifts on the IAN Creative banner (with a bubble at its
 * shoulder). Plays once per session; tap skips; reduced motion skips.
 */
export default function LandingHero({ children }: { children?: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"intro" | "revealed">("intro");

  const finish = useCallback(() => {
    setPhase("revealed");
    try {
      sessionStorage.setItem("ian-intro-seen", "1");
    } catch {
      /* private mode — replaying is fine */
    }
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ian-intro-seen") === "1";
    } catch {
      /* ignore */
    }
    if (seen || reducedMotion) finish();
  }, [reducedMotion, finish]);

  // Belt-and-braces: never trap the visitor behind the curtain
  useEffect(() => {
    if (phase !== "intro") return;
    const t = setTimeout(finish, 5200);
    return () => clearTimeout(t);
  }, [phase, finish]);

  return (
    <>
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="landing-intro"
            aria-hidden="true"
            onClick={finish}
            className="fixed inset-0 z-[70] flex cursor-pointer flex-col items-center justify-center gap-8 px-6"
            style={{
              background:
                "radial-gradient(ellipse 60% 44% at 80% -8%, rgba(201,168,124,0.18) 0%, transparent 70%), var(--cream)",
            }}
            exit={{ opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            suppressHydrationWarning
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {INTRO_BUBBLES.map((b) => (
                <IntroBubble key={b.src} {...b} />
              ))}
            </div>

            <FlipFadeText
              words={WORDS}
              loop={false}
              interval={1250}
              onComplete={finish}
              className="uppercase text-[var(--brown-dark)]"
              // Barlow Condensed 900 — the house display voice; big, calm, kinetic
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(44px, 11vw, 92px)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                textShadow: "0 2px 24px rgba(201,168,124,0.35)",
              }}
            />

            <motion.p
              className="absolute bottom-8 text-[10px] tracking-[0.35em] uppercase text-[var(--brown-muted)]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 1, duration: 0.6 }}
              suppressHydrationWarning
            >
              tap to skip
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The page beneath the curtain */}
      <div className="relative">
        <motion.div
          initial={false}
          animate={
            phase === "revealed" ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.985 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          suppressHydrationWarning
        >
          <IanCreativeBanner />
          {children}
        </motion.div>

        {/* The bubble at the name's shoulder */}
        <motion.img
          src="/bubbles/js-bubble.jpeg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute -top-3 right-1 z-10 rounded-full object-cover select-none sm:-top-5 sm:right-3"
          style={{
            width: "clamp(52px, 9vw, 84px)",
            height: "clamp(52px, 9vw, 84px)",
            ...BUBBLE_FRAME,
          }}
          initial={{ scale: 0, rotate: -14 }}
          animate={
            phase === "revealed"
              ? { scale: 1, rotate: 0, y: [0, -8, 0] }
              : { scale: 0, rotate: -14 }
          }
          transition={{
            scale: { type: "spring", stiffness: 260, damping: 18, delay: 0.45 },
            rotate: { type: "spring", stiffness: 260, damping: 18, delay: 0.45 },
            y: { duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: 1.1 },
          }}
          suppressHydrationWarning
        />
      </div>
    </>
  );
}
