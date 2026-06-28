"use client";

import { useRef } from "react";
import {
  motion, useScroll, useTransform, useSpring, MotionValue,
  useMotionValue, AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import type { Post } from "@/lib/posts";

/* ─── Hologram glass card ────────────────────────────────────────────────── */
function HologramCard({ children }: { children: React.ReactNode }) {
  const ref   = useRef<HTMLDivElement>(null);
  const mx    = useMotionValue(0);
  const my    = useMotionValue(0);
  const rotX  = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 30 });
  const rotY  = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 30 });
  const shimX = useTransform(mx, [-0.5, 0.5], ["-45%", "45%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  }

  return (
    <motion.div
      ref={ref} onMouseMove={onMove} onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: "preserve-3d", perspective: 1200,
        position: "relative", overflow: "hidden", borderRadius: 18,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 50%, rgba(201,168,124,0.18) 100%), rgba(237,227,211,0.92)",
        border: "1px solid rgba(255,255,255,0.75)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.48), 0 8px 24px rgba(0,0,0,0.32), inset 0 1px 1px rgba(255,255,255,0.96)",
        backdropFilter: "blur(32px) saturate(180%)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", top: 0, left: "6%", right: "6%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.96), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <motion.div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.08) 42%, rgba(201,168,124,0.12) 54%, transparent 76%)", x: shimX, pointerEvents: "none", zIndex: 1 }} />
      <div style={{ padding: "clamp(20px, 3vw, 32px)", position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Floating post card ─────────────────────────────────────────────────── */
function PostFloatCard({ post, index }: { post: Post; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: isEven ? -2 : 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      style={{
        alignSelf: isEven ? "flex-start" : "flex-end",
        width: "clamp(280px, 52vw, 520px)",
      }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
        <HologramCard>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 9, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "var(--brown)",
                border: "1px solid rgba(201,168,124,0.5)", borderRadius: 100,
                padding: "2px 10px", background: "rgba(201,168,124,0.12)",
              }}>{tag}</span>
            ))}
          </div>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
            fontSize: "clamp(22px, 3.5vw, 38px)", letterSpacing: "-0.01em",
            color: "var(--brown-dark)", lineHeight: 0.95, marginBottom: 10,
          }}>{post.title}</h2>
          <div style={{ height: 1, width: 36, background: "linear-gradient(to right, var(--tan), transparent)", marginBottom: 12 }} />
          <p style={{
            fontSize: "clamp(12px, 1.3vw, 14px)", color: "var(--text-muted)", lineHeight: 1.75,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
          }}>{post.excerpt}</p>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "var(--brown-muted)", textTransform: "uppercase" }}>{post.date}</span>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--brown)" }}>Read →</span>
          </div>
        </HologramCard>
      </Link>
    </motion.div>
  );
}

/* ─── Typography helpers ─────────────────────────────────────────────────── */
const mono = "'Space Grotesk', 'Courier New', monospace";
const cond = "'Barlow Condensed', sans-serif";

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
      <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{label}:</span>
      <span style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function CornerMark({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  return (
    <div aria-hidden style={{ position: "absolute", width: 18, height: 18, ...(pos.includes("t") ? { top: 18 } : { bottom: 18 }), ...(pos.includes("l") ? { left: 18 } : { right: 18 }), pointerEvents: "none" }}>
      <svg viewBox="0 0 18 18" fill="none" style={{ width: "100%", opacity: 0.45 }}>
        {pos === "tl" && <path d="M0 9V0h9" stroke="white" strokeWidth="1.2"/>}
        {pos === "tr" && <path d="M18 9V0H9" stroke="white" strokeWidth="1.2"/>}
        {pos === "bl" && <path d="M0 9v9h9" stroke="white" strokeWidth="1.2"/>}
        {pos === "br" && <path d="M18 9v9H9" stroke="white" strokeWidth="1.2"/>}
      </svg>
    </div>
  );
}

/* ─── Scroll-driven chapter ──────────────────────────────────────────────── */
function Chapter({
  src, alt, objectPosition = "center center",
  overlay, posts, index, noImage = false,
}: {
  src: string; alt: string; objectPosition?: string;
  overlay: React.ReactNode | ((p: MotionValue<number>) => React.ReactNode);
  posts: Post[]; index: number; noImage?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPosts     = posts.length > 0;

  // Track scroll progress through this chapter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── Image layer: drifts up (parallax) + zooms out (cinematic pull-back) */
  const imgY     = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.10, 1.0]);

  /* ── Overlay text: rises and fades away before cards arrive */
  const textY       = useTransform(scrollYProgress, [0, 0.38], ["0%", "-18%"]);
  const textOpacity = useTransform(scrollYProgress, [0.04, 0.32], [1, 0]);

  /* ── Ghost chapter number: blooms in and fades */
  const numScale   = useTransform(scrollYProgress, [0, 0.5], [1, 1.18]);
  const numOpacity = useTransform(scrollYProgress, [0, 0.08, 0.4], [0, 0.14, 0]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>

      {/* ── Sticky viewport ─────────────────────────────────────────── */}
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        width: "100vw", marginLeft: "calc(50% - 50vw)",
        overflow: "hidden", zIndex: 0,
      }}>
        {/* Parallax image — oversized so drift has room */}
        {noImage ? (
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, #1a1a1a 0%, #080808 100%)" }} />
        ) : (
          <motion.div style={{
            y: imgY, scale: imgScale,
            position: "absolute", top: "-15%", left: 0, right: 0,
            height: "130%", willChange: "transform",
          }}>
            <img
              src={src} alt={alt} draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition, display: "block", userSelect: "none" }}
            />
          </motion.div>
        )}

        {/* Ghost chapter number — blooms behind everything */}
        <motion.div aria-hidden style={{
          position: "absolute", top: "50%", left: "50%",
          translateX: "-50%", translateY: "-50%",
          fontFamily: cond, fontWeight: 900,
          fontSize: "clamp(180px, 38vw, 480px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.22)",
          letterSpacing: "-0.06em", lineHeight: 1,
          userSelect: "none", pointerEvents: "none",
          zIndex: 1,
          scale: numScale, opacity: numOpacity,
        }}>
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Overlay text — lifts out as cards rise */}
        <motion.div style={{ y: textY, opacity: textOpacity, position: "absolute", inset: 0, zIndex: 2 }}>
          {typeof overlay === "function" ? overlay(scrollYProgress) : overlay}
        </motion.div>

        {/* Bottom dissolve into dark */}
        <div aria-hidden style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "32%",
          background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)",
          pointerEvents: "none", zIndex: 5,
        }} />

        <CornerMark pos="tl" /><CornerMark pos="tr" />
        <CornerMark pos="bl" /><CornerMark pos="br" />
      </div>

      {/* ── Cards float over the sticky ─────────────────────────────── */}
      {hasPosts && (
        <div style={{
          position: "relative", zIndex: 10,
          marginTop: "-100vh", paddingTop: "28vh",
          paddingBottom: "clamp(32px, 5vw, 56px)",
        }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 32px)",
            display: "flex", flexDirection: "column",
            gap: "clamp(16px, 2.5vw, 24px)",
          }}>
            {posts.map((post, i) => (
              <PostFloatCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      )}

      {!hasPosts && <div style={{ height: "22vh" }} />}
    </div>
  );
}

/* ─── Panel overlays ─────────────────────────────────────────────────────── */
function SavageOverlay() {
  return (
    <>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)" }} />
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ position: "absolute", top: 28, left: 24, display: "flex", flexDirection: "column", gap: 3 }}>
        <SpecLine label="TYPE"   value="TRX-DURMaC(2o)" />
        <SpecLine label="DOT"    value="N9e(t)T M33430 1" />
        <SpecLine label="CLASS"  value="43R · 04092 0.4(t)" />
        <SpecLine label="SERIES" value="03" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.12 }}
        style={{ position: "absolute", top: 24, right: 24, border: "1.5px solid rgba(255,255,255,0.55)", padding: "5px 11px", textAlign: "center" }}>
        <p style={{ fontFamily: mono, fontSize: 8, letterSpacing: "0.22em", color: "white", textTransform: "uppercase" }}>△ CAUTION △</p>
        <p style={{ fontFamily: mono, fontSize: 7, letterSpacing: "0.18em", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>EXTREME HEAT</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", bottom: "clamp(32px, 8vh, 80px)", left: "clamp(16px, 3vw, 36px)" }}>
        <div style={{ position: "relative" }}>
          <p style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(72px, 18vw, 180px)", lineHeight: 0.85, color: "white", letterSpacing: "-0.03em" }}>SAV</p>
          <span style={{ position: "absolute", top: "32%", right: "-clamp(32px,5vw,60px)", fontFamily: mono, fontSize: "clamp(6px, 0.8vw, 9px)", letterSpacing: "0.24em", color: "white", textTransform: "uppercase", whiteSpace: "nowrap" }}>&#39;UNTAMED</span>
        </div>
        <div style={{ position: "relative" }}>
          <span style={{ position: "absolute", top: "18%", left: 2, fontFamily: mono, fontSize: "clamp(6px, 0.8vw, 9px)", letterSpacing: "0.24em", color: "white", textTransform: "uppercase" }}>RELENTLESS</span>
          <span style={{ position: "absolute", bottom: "14%", right: "clamp(8px,1.5vw,20px)", fontFamily: mono, fontSize: "clamp(6px, 0.8vw, 9px)", letterSpacing: "0.24em", color: "white", textTransform: "uppercase" }}>FEARLESS</span>
          <p style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(72px, 18vw, 180px)", lineHeight: 0.85, letterSpacing: "-0.03em", color: "white" }}>AGE</p>
        </div>
      </motion.div>
    </>
  );
}

function VendettaOverlay() {
  return (
    <>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)" }} />
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ position: "absolute", top: "50%", left: 24, transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 5 }}>
        <SpecLine label="CC"     value="1103CC" />
        <SpecLine label="ENGINE" value="DESMOSEDICI V4" />
        <div style={{ height: "0.5px", background: "rgba(255,255,255,0.2)", margin: "5px 0" }} />
        <SpecLine label="0–100"  value="2.8 SEC" />
        <SpecLine label="TOP"    value="300 KM/H" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.12 }}
        style={{ position: "absolute", top: 28, right: 24, display: "flex", flexDirection: "column", gap: 3 }}>
        <SpecLine label="POWER"  value="215 HP" />
        <SpecLine label="TORQUE" value="123.6 NM" />
        <SpecLine label="RPM"    value="14,500" />
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", right: "clamp(16px, 3vw, 36px)", bottom: "clamp(32px, 8vh, 80px)" }}>
        {["V4", "VEND", "ETTA"].map(line => (
          <p key={line} style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(56px, 13vw, 152px)", lineHeight: 0.86, color: "white", letterSpacing: "-0.03em", textAlign: "right" }}>{line}</p>
        ))}
        <p style={{ fontFamily: mono, fontSize: "clamp(7px, 0.8vw, 9px)", letterSpacing: "0.22em", color: "rgba(255,255,255,0.45)", textAlign: "right", marginTop: 8, textTransform: "uppercase" }}>
          TITANIUM · V4S · TITANIUM
        </p>
      </motion.div>
    </>
  );
}

function IanCreativeOverlay() {
  return (
    <>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.42)" }} />
      <div aria-hidden style={{ position: "absolute", top: 20, left: 20, right: 20, bottom: 20, border: "0.5px solid rgba(255,255,255,0.18)", pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: "clamp(180px, 28vw, 300px)" }}>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.38)" }} />
          <p style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.38em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", whiteSpace: "nowrap" }}>MADE BY</p>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.38)" }} />
        </div>
        <p style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(28px, 6vw, 76px)", letterSpacing: "0.12em", color: "white", textTransform: "uppercase" }}>IAN CREATIVE</p>
        <svg viewBox="0 0 96 52" fill="none" style={{ width: "clamp(44px, 6.5vw, 76px)", opacity: 0.82 }}>
          <rect x="0" y="4" width="10" height="44" fill="white"/>
          <polygon points="20,4 32,4 44,38 44,4 54,4 54,48 44,48 32,14 32,48 20,48" fill="white"/>
          <rect x="60" y="4" width="10" height="44" fill="white"/>
          <rect x="60" y="4" width="36" height="10" fill="white"/>
          <rect x="60" y="21" width="28" height="10" fill="white"/>
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: "clamp(180px, 28vw, 300px)", marginTop: 4 }}>
          <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.38)" }} />
          <div style={{ flex: 1, height: "0.5px", background: "rgba(255,255,255,0.38)" }} />
        </div>
      </motion.div>
    </>
  );
}

function LimitedEditionOverlay({ progress }: { progress: MotionValue<number> }) {
  const S  = 52;                           // max spread in px
  const R: [number, number] = [0, 0.44];  // assembly range of scroll progress

  /* 4 horizontal parallel lines per border — symmetric spread from both sides */
  const ya = useTransform(progress, R, [-S, 0]);
  const yb = useTransform(progress, R, [-S * 0.36, 0]);
  const yc = useTransform(progress, R, [ S * 0.36, 0]);
  const yd = useTransform(progress, R, [ S, 0]);
  const yV = [ya, yb, yc, yd];

  /* 4 vertical parallel lines per border */
  const xa = useTransform(progress, R, [-S, 0]);
  const xb = useTransform(progress, R, [-S * 0.36, 0]);
  const xc = useTransform(progress, R, [ S * 0.36, 0]);
  const xd = useTransform(progress, R, [ S, 0]);
  const xV = [xa, xb, xc, xd];

  /* Text reveals only after frame is sealed */
  const textAlpha = useTransform(progress, [0.38, 0.58], [0, 1]);
  /* Lines fade in immediately so the scatter is visible from the start */
  const lineAlpha = useTransform(progress, [0, 0.07], [0, 1]);

  const line = (style: React.CSSProperties, mv: MotionValue<number>, axis: "y" | "x", key: string) => (
    <motion.div key={key} style={{ position: "absolute", background: "white", opacity: lineAlpha, [axis]: mv, ...style }} />
  );

  return (
    <>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.68)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "clamp(260px, 42vw, 520px)", height: "clamp(140px, 28vh, 260px)" }}>

          {/* Top border — 4 horizontal lines converging from above + below */}
          {yV.map((y, i) => line({ top: 0, left: 0, right: 0, height: 1.5 }, y, "y", `t${i}`))}
          {/* Bottom border — mirrored spread */}
          {yV.map((y, i) => line({ bottom: 0, left: 0, right: 0, height: 1.5 }, yV[3 - i], "y", `b${i}`))}
          {/* Left border — 4 vertical lines converging from left + right */}
          {xV.map((x, i) => line({ top: 0, bottom: 0, left: 0, width: 1.5 }, x, "x", `l${i}`))}
          {/* Right border — mirrored spread */}
          {xV.map((x, i) => line({ top: 0, bottom: 0, right: 0, width: 1.5 }, xV[3 - i], "x", `r${i}`))}

          {/* Text — appears once frame is closed */}
          <motion.div style={{
            opacity: textAlpha,
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "clamp(10px, 2vw, 22px) clamp(18px, 3vw, 36px)",
          }}>
            <p style={{ fontFamily: cond, fontWeight: 900, fontSize: "clamp(36px, 8.5vw, 108px)", letterSpacing: "0.06em", color: "white", lineHeight: 0.9 }}>LIMITED</p>
            <div style={{ height: "0.5px", background: "rgba(255,255,255,0.45)", margin: "clamp(8px, 1.2vw, 14px) 0", alignSelf: "stretch" }} />
            <p style={{ fontFamily: mono, fontSize: "clamp(9px, 1.2vw, 13px)", letterSpacing: "0.5em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase" }}>EDITION</p>
          </motion.div>
        </div>

        <motion.p style={{
          opacity: textAlpha, position: "absolute", bottom: "6%",
          fontFamily: mono, fontSize: "clamp(7px, 0.85vw, 10px)",
          letterSpacing: "0.3em", color: "rgba(255,255,255,0.32)", textTransform: "uppercase",
        }}>
          IAN CREATIVE · EST. 2024
        </motion.p>
      </div>
    </>
  );
}

/* ─── Section progress line ─────────────────────────────────────────────── */
function ProgressLine({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useSpring(progress, { stiffness: 120, damping: 28 });
  return (
    <motion.div
      style={{
        position: "fixed", right: 14, top: "18%",
        height: "64%", width: 1,
        background: "rgba(255,255,255,0.10)",
        zIndex: 100, pointerEvents: "none", borderRadius: 1,
        transformOrigin: "top",
      }}
    >
      <motion.div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(201,168,124,0.9), rgba(255,255,255,0.5))",
        scaleY, transformOrigin: "top", borderRadius: 1,
      }} />
    </motion.div>
  );
}

/* ─── Export ─────────────────────────────────────────────────────────────── */
export default function BlogParallaxHero({ posts }: { posts: Post[] }) {
  const heroRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const savage   = posts.slice(0, 2);
  const vendetta = posts.slice(2, 4);
  const limited  = posts.slice(4);

  return (
    <div ref={heroRef} style={{ position: "relative", marginBottom: "clamp(64px, 10vw, 112px)" }}>
      {/* Progress line — fills as you scroll through all 4 chapters */}
      <ProgressLine progress={scrollYProgress} />

      <Chapter src="/savage.jpeg"      alt="SAVAGE"          objectPosition="center 15%" overlay={<SavageOverlay />}        posts={savage}   index={0} />
      <Chapter src="/v4vendetta.jpeg"  alt="V4 VENDETTA"     objectPosition="center 30%" overlay={<VendettaOverlay />}       posts={vendetta} index={1} />
      <Chapter src=""                  alt=""                 overlay={<IanCreativeOverlay />}    posts={[]}       index={2} noImage />
      <Chapter src="" alt="" overlay={(p) => <LimitedEditionOverlay progress={p} />} posts={limited} index={3} noImage />
    </div>
  );
}
