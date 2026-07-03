"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

/*
  Two-axis ticker:
  - Outer track: continuous x scroll right → left (news headline motion)
  - Inner cards: simultaneous y bob — emblems up when banners down (bike pedal phase)
  - Doubled card set for seamless -50% loop

  Runs as pure CSS keyframes (compositor-driven, no per-frame JS) and pauses
  entirely while the strip is offscreen — it lives on every page, so it must
  not tax scrolling elsewhere.
*/

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "160px 0px" });
  const playState = inView ? "running" : "paused";

  return (
    <div
      ref={ref}
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
      <div
        style={{
          display: "flex",
          gap: 5,
          width: "max-content",
          animation: `marqueeLeft ${TICK}s linear infinite`,
          animationPlayState: playState,
          willChange: "transform",
        }}
      >
        {ALL.map((card, i) => (
          /* ── Vertical bob — phase 1 = starts high, -1 = starts low ── */
          <div
            key={i}
            style={{
              width: card.w,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              height: "clamp(148px, 20vw, 224px)",
              background: card.bg,
              boxShadow:
                "0 6px 28px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)",
              animation: `${card.phase === 1 ? "stripBobA" : "stripBobB"} ${BOB}s ease-in-out infinite`,
              animationPlayState: playState,
              willChange: "transform",
            }}
          >
            <img
              src={card.src}
              alt={card.alt}
              draggable={false}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: card.fit,
                objectPosition: "center",
                display: "block",
                userSelect: "none",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
