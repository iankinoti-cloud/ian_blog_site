"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp } from "@/components/shared/Motion";

export interface AboutProps {
  name?: string;
  image: string;
  about: string;
  techStack?: { category: string; items: string }[];
}

/** Poker-card reveal overlay */
function CardOverlay({ image, name, onClose }: { image: string; name?: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(30, 15, 5, 0.72)", backdropFilter: "blur(6px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      >
        {/* Card wrapper — stops click propagation so only backdrop click closes */}
        <motion.div
          key="card"
          className="relative"
          style={{ perspective: 1200 }}
          onClick={(e) => e.stopPropagation()}
          initial={{ rotateY: -90, scale: 0.7, opacity: 0, y: 60 }}
          animate={{ rotateY: 0, scale: 1, opacity: 1, y: 0 }}
          exit={{ rotateY: 90, scale: 0.7, opacity: 0, y: 60 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* The card itself */}
          <div
            className="relative overflow-hidden rounded-2xl shadow-2xl"
            style={{
              width: "min(82vw, 360px)",
              background: "linear-gradient(160deg, var(--parchment) 0%, var(--cream) 100%)",
              border: "2px solid var(--tan)",
              boxShadow:
                "0 32px 64px rgba(61,32,16,0.45), 0 0 0 1px rgba(201,168,124,0.35), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          >
            {/* Card corner decorations (poker-style suits) */}
            <span
              className="absolute top-3 left-3 text-[var(--brown-muted)] font-bold text-sm leading-none select-none pointer-events-none"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
              aria-hidden
            >
              ♠
            </span>
            <span
              className="absolute bottom-3 right-3 text-[var(--brown-muted)] font-bold text-sm leading-none select-none pointer-events-none rotate-180"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.05em" }}
              aria-hidden
            >
              ♠
            </span>

            {/* Photo */}
            <div className="px-8 pt-10 pb-6 flex flex-col items-center gap-5">
              <motion.div
                className="rounded-xl overflow-hidden shadow-lg"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  border: "3px solid var(--tan)",
                  boxShadow: "0 8px 32px rgba(61,32,16,0.3)",
                }}
                initial={{ scale: 0.88 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={image}
                  alt={name ?? "Developer photo"}
                  className="w-full h-full object-cover object-top"
                  draggable={false}
                />
              </motion.div>

              {name && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                >
                  <p
                    className="text-xs tracking-[0.35em] uppercase text-[var(--brown-muted)] mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Developer
                  </p>
                  <p
                    className="text-xl font-bold text-[var(--brown-dark)]"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {name}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Thin gold line at bottom */}
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, var(--tan), transparent)" }} />
          </div>

          {/* Close button outside the card */}
          <motion.button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--cream)] font-bold text-base cursor-pointer shadow-lg"
            style={{ background: "var(--brown)", border: "2px solid var(--tan)" }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            aria-label="Close photo"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
          >
            ✕
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function About({ name, image, about, techStack = [] }: AboutProps) {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <aside>
      {/* ── Section 1: The Person ── */}
      <div className="max-w-2xl mb-14 md:mb-24">
        <FadeUp>
          {name && (
            <>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">About</p>
              <h2 className="mt-2 text-3xl sm:text-5xl font-bold text-[var(--brown-dark)]">{name}</h2>
              <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
            </>
          )}

          {/* Clickable profile photo */}
          <div className="mt-8 relative inline-block group cursor-pointer" onClick={() => setCardOpen(true)}>
            <motion.img
              src={image}
              alt="Developer profile photo — click to expand"
              className="w-24 h-24 rounded-full object-cover border-2 border-[var(--tan)] shadow-md"
              whileHover={{ scale: 1.07, boxShadow: "0 8px 28px rgba(61,32,16,0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            />
            {/* Subtle hint badge */}
            <motion.span
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs text-[var(--cream)] shadow"
              style={{ background: "var(--brown)", border: "2px solid var(--tan)" }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
              aria-hidden
            >
              ♠
            </motion.span>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-10 text-lg text-[var(--text-muted)] leading-relaxed">{about}</p>
        </FadeUp>
      </div>

      {/* ── Divider ── */}
      {techStack.length > 0 && (
        <>
          <FadeUp>
            <div className="mb-14 md:mb-24 h-px w-full bg-[var(--tan-light)]" />
          </FadeUp>

          {/* ── Section 2: Tech Stack ── */}
          <div className="max-w-2xl">
            <FadeUp>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">
                Technical Arsenal
              </p>
              <h3 className="mt-2 text-3xl font-bold text-[var(--brown-dark)]">My Stack</h3>
              <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
            </FadeUp>

            <div className="mt-10 flex flex-col gap-8">
              {techStack.map((item, i) => (
                <FadeUp key={item.category} delay={i * 0.1}>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 border-b border-[var(--tan-light)] pb-6">
                    <p className="sm:w-28 sm:shrink-0 text-xs tracking-widest uppercase text-[var(--brown-muted)] sm:pt-1">
                      {item.category}
                    </p>
                    <p className="text-[var(--text)] leading-relaxed">{item.items}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Poker-card overlay */}
      {cardOpen && (
        <CardOverlay image={image} name={name} onClose={() => setCardOpen(false)} />
      )}
    </aside>
  );
}
