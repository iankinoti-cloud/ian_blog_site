"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
} & ComponentPropsWithoutRef<"button">;

const spring = { type: "spring", stiffness: 420, damping: 19 } as const;

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  // min-h keeps the tap target ≥44px on phones
  const base =
    "inline-flex items-center justify-center min-h-[44px] rounded-lg px-6 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors select-none";
  const variants = {
    primary: "bg-[var(--brown)] text-[var(--cream)] hover:bg-[var(--brown-dark)]",
    secondary:
      "border border-[var(--tan)] text-[var(--brown)] bg-transparent hover:bg-[var(--parchment)]",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  // Gestures live on a wrapper span so Link/button stay plain elements
  // (the vitest framer-motion mock only supports motion.<tag>).
  return (
    <motion.span
      className="inline-block"
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={spring}
      suppressHydrationWarning
    >
      {href ? (
        <Link href={href} className={classes}>
          {children}
        </Link>
      ) : (
        <button className={classes} {...props}>
          {children}
        </button>
      )}
    </motion.span>
  );
}
