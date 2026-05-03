"use client";

import Link from "@/components/shared/Link";
import { motion } from "framer-motion";
import TagBadge from "@/components/shared/TagBadge";

export interface ArticleProps {
  title: string;
  date: string;
  preview: string;
  slug?: string;
  tags?: string[];
}

export default function Article({ title, date, preview, slug, tags }: ArticleProps) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 40px -8px rgba(107,66,38,0.18)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl border border-[var(--tan-light)] bg-[var(--parchment)] p-5 sm:p-7 shadow-sm cursor-pointer"
    >
      {tags && tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
      {slug ? (
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold text-[var(--brown-dark)] hover:text-[var(--brown)] transition-colors">
            {title}
          </h3>
        </Link>
      ) : (
        <h3 className="text-xl font-semibold text-[var(--brown-dark)]">{title}</h3>
      )}
      <small className="mt-2 block text-xs tracking-widest uppercase text-[var(--brown-muted)]">
        {date}
      </small>
      <p className="mt-3 text-[var(--text-muted)] leading-relaxed">{preview}</p>
      {slug && (
        <Link
          href={`/blog/${slug}`}
          className="mt-5 inline-block text-sm font-medium text-[var(--brown)] hover:text-[var(--brown-dark)] transition-colors"
        >
          Read more →
        </Link>
      )}
    </motion.article>
  );
}
