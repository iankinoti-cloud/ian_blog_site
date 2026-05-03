"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import TagBadge from "./TagBadge";
import type { Post } from "@/lib/posts";
export type { Post } from "@/lib/posts";

export default function PostCard({ post }: { post: Post }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 40px -8px rgba(107,66,38,0.18)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl border border-[var(--tan-light)] bg-[var(--parchment)] p-5 sm:p-7 shadow-sm cursor-pointer"
    >
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
