"use client";

import { motion } from "framer-motion";

/*
  Two-axis ticker:
  - Outer track: continuous x scroll right → left (news headline motion)
  - Inner cards: simultaneous y bob — emblems up when banners down (bike pedal phase)
  - Doubled card set for seamless -50% loop
*/

const AMP  = 26;   // vertical bob amplitude (px)
const BOB  = 3.4;  // one full bob cycle (seconds)
const TICK = 22;   // full horizontal loop (seconds) — slower = more editorial

const BASE = [
  { src: "/ian-emblem.jpeg", alt: "IAN Creative emblem",  fit: "contain" as const, bg: "#ffffff", w: "clamp(152px, 21vw, 252px)", phase:  1 },
  { src: "/ian-banner.png",  alt: "IAN Kinoti banner",    fit: "contain" as const, bg: "#060606", w: "clamp(308px, 43vw, 524px)", phase: -1 },
  { src: "/ian-emblem.jpeg", alt: "IAN Creative emblem",  fit: "contain" as const, bg: "#ffffff", w: "clamp(152px, 21vw, 252px)", phase:  1 },
  { src: "/ian-banner.png",  alt: "IAN Kinoti banner",    fit: "contain" as const, bg: "#060606", w: "clamp(308px, 43vw, 524px)", phase: -1 },
];

// Duplicated — outer track animates to -50% of max-content = exactly one set
const ALL = [...BASE, ...BASE];

export default function FooterParallaxStrip() {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        overflow: "hidden",                       // clips horizontal overflow only
        padding: "clamp(44px, 6vw, 68px) 0",     // vertical breathing room for the bob
        background: "var(--cream)",
      }}
    >
      {/* ── Horizontal ticker track ──────────────────────────────────── */}
      <motion.div
        style={{ display: "flex", gap: 5, width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: TICK,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {ALL.map((card, i) => (
          /* ── Vertical bob — phase 1 = starts high, -1 = starts low ── */
          <motion.div
            key={i}
            animate={{
              y: [card.phase * AMP, card.phase * -AMP, card.phase * AMP],
            }}
            transition={{
              duration: BOB,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{
              width: card.w,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              height: "clamp(148px, 20vw, 224px)",
              background: card.bg,
              boxShadow:
                "0 6px 28px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
              willChange: "transform",
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: card.fit,
                objectPosition: "center",
                display: "block",
                userSelect: "none",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
