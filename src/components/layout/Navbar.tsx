"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import AnimatedName from "@/components/shared/AnimatedName";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [wiggleTrigger, setWiggleTrigger] = useState(0);

  const handleNavClick = useCallback(() => {
    setWiggleTrigger((n) => n + 1);
  }, []);

  return (
    <header className="w-full border-b border-[var(--tan-light)] bg-[var(--parchment)]">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="no-underline"
          aria-label="Ian Kinoti — Home"
          onClick={handleNavClick}
        >
          <AnimatedName size="nav" wiggleTrigger={wiggleTrigger} />
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm tracking-wide text-[var(--brown-muted)] hover:text-[var(--brown-dark)] transition-colors uppercase"
                onClick={handleNavClick}
              >
                {link.label}
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px bg-[var(--brown)] block"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
