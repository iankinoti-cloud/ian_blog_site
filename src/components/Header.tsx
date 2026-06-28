"use client";

import Link from "@/components/shared/Link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import AnimatedName from "@/components/shared/AnimatedName";

export interface HeaderProps {
  name: string;
  navLinks: { href: string; label: string }[];
}

export default function Header({ name, navLinks }: HeaderProps) {
  const [wiggleTrigger, setWiggleTrigger] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Read actual scroll position on mount — catches hard-refresh mid-page
    setScrolled(window.scrollY > 10);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback(() => {
    setWiggleTrigger((n) => n + 1);
    setMenuOpen(false);
  }, []);

  // Always glass — never transparent on refresh or at scrollY=0
  const headerBg = scrolled || menuOpen
    ? "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%), rgba(237,227,211,0.82)"
    : "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 100%), rgba(237,227,211,0.62)";
  const headerBorder = scrolled || menuOpen
    ? "1px solid rgba(255,255,255,0.55)"
    : "1px solid rgba(255,255,255,0.28)";
  const headerShadow = scrolled || menuOpen
    ? "0 2px 24px rgba(107,66,38,0.10), inset 0 1px 1px rgba(255,255,255,0.7)"
    : "0 1px 8px rgba(107,66,38,0.04), inset 0 1px 1px rgba(255,255,255,0.5)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500"
      style={{
        background: headerBg,
        borderBottom: headerBorder,
        boxShadow: headerShadow,
        backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(160%)" : "blur(8px) saturate(130%)",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px) saturate(160%)" : "blur(8px) saturate(130%)",
      }}
    >
      <h1 className="sr-only">{name}</h1>
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link
          href="/"
          className="no-underline"
          aria-label={`${name} — Home`}
          onClick={handleNavClick}
        >
          <AnimatedName size="nav" wiggleTrigger={wiggleTrigger} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
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
                  suppressHydrationWarning
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <motion.span
            className="block h-0.5 w-6 rounded-full bg-[var(--brown)]"
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22 }}
            suppressHydrationWarning
          />
          <motion.span
            className="block h-0.5 w-6 rounded-full bg-[var(--brown)]"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.18 }}
            suppressHydrationWarning
          />
          <motion.span
            className="block h-0.5 w-6 rounded-full bg-[var(--brown)]"
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.22 }}
            suppressHydrationWarning
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-[var(--tan-light)]"
            style={{ background: "var(--parchment)" }}
          >
            <ul className="flex flex-col px-6 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm tracking-widest uppercase text-[var(--brown-muted)] hover:text-[var(--brown-dark)] transition-colors border-b border-[var(--tan-light)] last:border-0"
                    onClick={handleNavClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
