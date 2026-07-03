"use client";

import { motion } from "framer-motion";

export default function TagBadge({ tag }: { tag: string }) {
  return (
    <motion.span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-medium tracking-wide text-[var(--brown)] backdrop-blur-sm select-none"
      whileHover={{ y: -2, scale: 1.06 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      style={{
        background: "rgba(255,255,255,0.38)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "inset 0 1px 1px rgba(255,255,255,0.7), 0 1px 4px rgba(107,66,38,0.07)",
      }}
      suppressHydrationWarning
    >
      {tag}
    </motion.span>
  );
}
