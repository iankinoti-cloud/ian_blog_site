"use client";

// Parallax columns adapted from Skiper UI's Skiper30 (skiper-ui.com, @gurvinder-singh02) — restyled for IAN Creative.

import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type WallImage = { src: string; alt: string };

// Columns read left → right; factors control how fast each column drifts.
const COLUMNS: { images: WallImage[]; top: string; factor: number; mobileHidden?: boolean }[] = [
  {
    top: "-42%",
    factor: 1.6,
    images: [
      { src: "/savage.jpeg", alt: "Savage — IAN Creative artwork" },
      { src: "/bubble-grid.jpeg", alt: "Bubble grid study" },
      { src: "/ian-creative-card.jpeg", alt: "IAN Creative brand card" },
    ],
  },
  {
    top: "-88%",
    factor: 2.6,
    images: [
      { src: "/v4vendetta.jpeg", alt: "V for Vendetta — artwork" },
      { src: "/ian-banner.png", alt: "IAN Creative banner" },
      { src: "/limited-edition.jpeg", alt: "Limited edition print" },
    ],
  },
  {
    top: "-42%",
    factor: 1.1,
    images: [
      { src: "/ian-emblem.jpeg", alt: "IAN Creative emblem" },
      { src: "/bubble-scattered.jpeg", alt: "Scattered bubbles study" },
      { src: "/ian-cover.jpg", alt: "Ian Kinoti — cover portrait" },
    ],
  },
  {
    top: "-70%",
    factor: 2.3,
    mobileHidden: true,
    images: [
      { src: "/limited-edition.jpeg", alt: "Limited edition print — detail" },
      { src: "/bubble-grid.jpeg", alt: "Bubble grid study — detail" },
      { src: "/v4vendetta.jpeg", alt: "V for Vendetta — detail" },
    ],
  },
];

const FRAME = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 100%), rgba(237,227,211,0.4)",
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow:
    "0 6px 28px rgba(107,66,38,0.14), 0 1px 4px rgba(107,66,38,0.08), inset 0 1px 1px rgba(255,255,255,0.7)",
} as const;

function Column({
  images,
  top,
  y,
  mobileHidden,
}: {
  images: WallImage[];
  top: string;
  y: MotionValue<number>;
  mobileHidden?: boolean;
}) {
  return (
    <motion.div
      className={`relative h-full w-1/2 sm:w-1/3 md:w-1/4 flex-col gap-[2vw] ${
        mobileHidden ? "hidden md:flex" : "flex"
      }`}
      style={{ y, top }}
      suppressHydrationWarning
    >
      {images.map((img) => (
        <div
          key={img.src + img.alt}
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ ...FRAME, aspectRatio: "3 / 4" }}
        >
          <img
            src={img.src}
            alt={img.alt}
            draggable={false}
            className="pointer-events-none h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
}

/** Scroll-driven studio wall — brand artwork drifting at different speeds */
export default function StudioWall() {
  const gallery = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [viewportH, setViewportH] = useState(0);

  useEffect(() => {
    const resize = () => setViewportH(window.innerHeight);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  const drift = reducedMotion ? 0 : viewportH;
  const y0 = useTransform(progress, [0, 1], [0, drift * COLUMNS[0].factor]);
  const y1 = useTransform(progress, [0, 1], [0, drift * COLUMNS[1].factor]);
  const y2 = useTransform(progress, [0, 1], [0, drift * COLUMNS[2].factor]);
  const y3 = useTransform(progress, [0, 1], [0, drift * COLUMNS[3].factor]);
  const ys = [y0, y1, y2, y3];

  return (
    <section aria-label="Studio wall — artwork gallery">
      {/* Full-bleed escape from the max-w-4xl layout container */}
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-16 pb-8 text-center">
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[var(--brown-muted)]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            The Studio Wall
          </p>
          <h2
            className="mt-3 text-[var(--brown-dark)]"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(34px, 5.5vw, 56px)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            Pieces from the IAN Creative universe
          </h2>
          <p className="mt-3 text-sm text-[var(--brown-muted)]">scroll — the wall moves with you</p>
        </div>

        <div
          ref={gallery}
          className="relative box-border flex h-[130vh] md:h-[165vh] gap-[2vw] overflow-hidden p-[2vw]"
          style={{
            background:
              "linear-gradient(to bottom, var(--cream) 0%, var(--parchment) 12%, var(--parchment) 88%, var(--cream) 100%)",
          }}
        >
          {COLUMNS.map((col, i) => (
            <Column key={i} images={col.images} top={col.top} y={ys[i]} mobileHidden={col.mobileHidden} />
          ))}
        </div>
      </div>
    </section>
  );
}
