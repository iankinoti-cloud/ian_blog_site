"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import TagBadge from "./TagBadge";
import type { Post } from "@/lib/posts";
export type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Pointer position across the card, normalised to -0.5..0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-4, 4]), {
    stiffness: 220,
    damping: 22,
  });

  // Tilt only where a fine pointer exists — phones get whileTap instead
  const [tiltEnabled, setTiltEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setTiltEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setTiltEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!tiltEnabled || reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      whileHover={{
        y: -6,
        boxShadow:
          "0 24px 64px -8px rgba(107,66,38,0.22), 0 6px 20px rgba(107,66,38,0.1), inset 0 1px 1px rgba(255,255,255,0.92)",
      }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="group rounded-2xl backdrop-blur-sm backdrop-saturate-150 p-5 sm:p-7 cursor-pointer relative overflow-hidden"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 50%, rgba(201,168,124,0.1) 100%), rgba(237,227,211,0.52)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow:
          "0 4px 24px rgba(107,66,38,0.08), 0 1px 4px rgba(107,66,38,0.06), inset 0 1px 1px rgba(255,255,255,0.78)",
        willChange: "transform",
      }}
      suppressHydrationWarning
    >
      {/* Top-edge glass shimmer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.88), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} />
        ))}
      </div>

      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold text-[var(--brown-dark)] hover:text-[var(--brown)] transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="mt-2 text-xs tracking-widest uppercase text-[var(--brown-muted)]">{post.date}</p>
      <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{post.excerpt}</p>

      {/* py-2 pads the tap target without changing the visual rhythm */}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-3 inline-flex items-center gap-1 py-2 text-sm font-medium text-[var(--brown)] hover:text-[var(--brown-dark)] transition-colors"
      >
        Read more
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1.5"
        >
          →
        </span>
      </Link>
    </motion.article>
  );
}
