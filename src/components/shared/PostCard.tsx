"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TagBadge from "./TagBadge";
import type { Post } from "@/lib/posts";
export type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      whileHover={{
        y: -6,
        boxShadow:
          "0 24px 64px -8px rgba(107,66,38,0.22), 0 6px 20px rgba(107,66,38,0.1), inset 0 1px 1px rgba(255,255,255,0.92)",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-2xl backdrop-blur-xl backdrop-saturate-150 p-5 sm:p-7 cursor-pointer relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 50%, rgba(201,168,124,0.1) 100%), rgba(237,227,211,0.52)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow:
          "0 4px 24px rgba(107,66,38,0.08), 0 1px 4px rgba(107,66,38,0.06), inset 0 1px 1px rgba(255,255,255,0.78)",
        willChange: "transform",
      }}
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

      <Link
        href={`/blog/${post.slug}`}
        className="mt-5 inline-block text-sm font-medium text-[var(--brown)] hover:text-[var(--brown-dark)] transition-colors"
      >
        Read more →
      </Link>
    </motion.article>
  );
}
