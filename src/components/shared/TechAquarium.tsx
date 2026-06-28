"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/*
  Tech-aquarium overlay — 14 glass bubbles floating site-wide.
  Fixed, pointer-events:none so nothing is blocked.
  Depth illusion: large/blurry = background; small/crisp = foreground.
*/

const BUBBLES = [
  { src: "/bubbles/openai.png",     alt: "OpenAI"     },
  { src: "/bubbles/gemini.png",     alt: "Gemini"     },
  { src: "/bubbles/perplexity.png", alt: "Perplexity" },
  { src: "/bubbles/figma.png",      alt: "Figma"      },
  { src: "/bubbles/github.png",     alt: "GitHub"     },
  { src: "/bubbles/html5.png",      alt: "HTML5"      },
  { src: "/bubbles/css3.png",       alt: "CSS3"       },
  { src: "/bubbles/react.png",      alt: "React"      },
  { src: "/bubbles/python.png",     alt: "Python"     },
  { src: "/bubbles/tailwind.png",   alt: "Tailwind"   },
  { src: "/bubbles/typescript.png", alt: "TypeScript" },
  { src: "/bubbles/javascript.png", alt: "JavaScript" },
  { src: "/bubbles/flutter.png",    alt: "Flutter"    },
  { src: "/bubbles/hashnode.png",   alt: "Hashnode"   },
];

/* Deterministic pseudo-random — stable across SSR + hydration */
function rand(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function TechAquarium() {
  const configs = useMemo(() =>
    BUBBLES.map((b, i) => {
      const r = (n: number) => rand(i * 19 + n);

      /* depth: 0 = deep background, 1 = close foreground */
      const depth = r(0);
      const deep  = depth < 0.35;
      const close = depth > 0.72;

      const size    = deep  ? 88 + r(1) * 42           // 88–130px  background
                    : close ? 42 + r(1) * 22            // 42–64px   foreground
                    :         60 + r(1) * 28;           // 60–88px   midground

      const opacity = deep  ? 0.22 + r(2) * 0.16       // 0.22–0.38 — ghostlike
                    : close ? 0.52 + r(2) * 0.20        // 0.52–0.72 — vivid
                    :         0.36 + r(2) * 0.20;       // 0.36–0.56

      const blur    = deep  ? 2.5 : close ? 0 : 1;

      return {
        ...b,
        left:     r(3) * 88 + 2,           // 2–90 vw
        top:      r(4) * 85 + 2,           // 2–87 vh
        size,
        opacity,
        blur,
        duration: 9 + r(5) * 11,           // 9–20 s
        delay:    r(6) * 8,                // 0–8 s staggered entry
        driftY:   28 + r(7) * 60,          // 28–88 px
        driftX:   10 + r(8) * 30,          // 10–40 px
        rot:       3 + r(9) * 10,          // 3–13 deg
        yDir:     r(10) > 0.5 ? 1 : -1,
        xDir:     r(11) > 0.5 ? 1 : -1,
      };
    }), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {configs.map((cfg) => (
        <motion.div
          key={cfg.alt}
          initial={{ opacity: 0 }}
          animate={{
            y:       [0, cfg.yDir * cfg.driftY, cfg.yDir * -cfg.driftY * 0.55, 0],
            x:       [0, cfg.xDir * cfg.driftX, cfg.xDir * -cfg.driftX * 0.4,  0],
            rotate:  [0, cfg.rot, -cfg.rot * 0.65, 0],
            opacity: cfg.opacity,
          }}
          transition={{
            y:       { duration: cfg.duration,        ease: "easeInOut", repeat: Infinity, delay: cfg.delay },
            x:       { duration: cfg.duration * 1.45, ease: "easeInOut", repeat: Infinity, delay: cfg.delay + 0.5 },
            rotate:  { duration: cfg.duration * 0.88, ease: "easeInOut", repeat: Infinity, delay: cfg.delay },
            opacity: { duration: 1.8, delay: cfg.delay },
          }}
          style={{
            position: "absolute",
            left:  `${cfg.left}%`,
            top:   `${cfg.top}%`,
            width:  cfg.size,
            height: cfg.size,
            willChange: "transform",
            filter: [
              cfg.blur > 0 ? `blur(${cfg.blur}px)` : "",
              "drop-shadow(0 6px 18px rgba(0,0,0,0.09))",
            ].filter(Boolean).join(" "),
          }}
        >
          <img
            src={cfg.src}
            alt={cfg.alt}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              userSelect: "none",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
