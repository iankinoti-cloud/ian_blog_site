"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion, AnimatePresence, LayoutGroup,
  useMotionValue, useSpring, useTransform,
} from "framer-motion";
import StageBubblePanels from "./StageBubblePanels";

/* ─── Poker-card overlay (avatar click) ─────────────────────────────────────── */
function CardOverlay({ image, name, onClose }: { image: string; name?: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[60] flex items-center justify-center"
        style={{ backgroundColor: "rgba(30,15,5,0.72)", backdropFilter: "blur(6px)" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
      >
        <motion.div
          key="card" className="relative" style={{ perspective: 1200 }}
          onClick={(e) => e.stopPropagation()}
          initial={{ rotateY: -90, scale: 0.7, opacity: 0, y: 60 }}
          animate={{ rotateY: 0,  scale: 1,   opacity: 1, y: 0  }}
          exit={{   rotateY:  90, scale: 0.7, opacity: 0, y: 60 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl" style={{
            width: "min(82vw, 360px)",
            background: "linear-gradient(160deg, var(--parchment) 0%, var(--cream) 100%)",
            border: "2px solid var(--tan)",
            boxShadow: "0 32px 64px rgba(61,32,16,0.45), 0 0 0 1px rgba(201,168,124,0.35), inset 0 1px 0 rgba(255,255,255,0.55)",
          }}>
            <span className="absolute top-3 left-3 text-[var(--brown-muted)] font-bold text-sm leading-none select-none pointer-events-none" style={{ fontFamily: "Georgia, serif" }} aria-hidden>♠</span>
            <span className="absolute bottom-3 right-3 text-[var(--brown-muted)] font-bold text-sm leading-none select-none pointer-events-none rotate-180" style={{ fontFamily: "Georgia, serif" }} aria-hidden>♠</span>
            <div className="px-8 pt-10 pb-6 flex flex-col items-center gap-5">
              <motion.div className="rounded-xl overflow-hidden shadow-lg"
                style={{ width: "100%", border: "3px solid var(--tan)", boxShadow: "0 8px 32px rgba(61,32,16,0.3)" }}
                initial={{ scale: 0.88 }} animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={image} alt={name ?? "Developer photo"} style={{ display: "block", width: "100%", height: "auto" }} draggable={false} />
              </motion.div>
              {name && (
                <motion.div className="text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.4 }}>
                  <p className="text-xs tracking-[0.35em] uppercase text-[var(--brown-muted)] mb-1" style={{ fontFamily: "Georgia, serif" }}>Developer</p>
                  <p className="text-xl font-bold text-[var(--brown-dark)]" style={{ fontFamily: "Georgia, serif" }}>{name}</p>
                </motion.div>
              )}
            </div>
            <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, transparent, var(--tan), transparent)" }} />
          </div>
          <motion.button onClick={onClose}
            className="absolute -top-4 -right-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--cream)] font-bold text-base cursor-pointer shadow-lg"
            style={{ background: "var(--brown)", border: "2px solid var(--tan)" }}
            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            aria-label="Close photo" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.92 }}
          >✕</motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Glass hologram card ────────────────────────────────────────────────────── */
function HologramCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 30 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 30 });
  const shimX = useTransform(mx, [-0.5, 0.5], ["-40%", "40%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: "preserve-3d", perspective: 1200,
        position: "relative", overflow: "hidden", borderRadius: 20,
        // No backdrop-filter here: these cards 3D-rotate on every mouse move,
        // and re-blurring the backdrop per frame is what made the page choke.
        // The 93%-opaque base keeps the glass look without sampling the backdrop.
        background: "linear-gradient(135deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.10) 50%, rgba(201,168,124,0.14) 100%), rgba(237,227,211,0.93)",
        border: "1px solid rgba(255,255,255,0.72)",
        boxShadow: "0 28px 72px rgba(107,66,38,0.20), 0 6px 20px rgba(107,66,38,0.10), inset 0 1px 1px rgba(255,255,255,0.96)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", top: 0, left: "6%", right: "6%", height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.96), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <motion.div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.07) 45%, rgba(201,168,124,0.10) 55%, transparent 75%)", x: shimX, pointerEvents: "none", zIndex: 1 }} />
      <div style={{ padding: "clamp(22px, 3.2vw, 34px)", position: "relative", zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
}

const Divider = () => (
  <div style={{ height: 1, width: 48, background: "linear-gradient(to right, var(--tan), transparent)", margin: "14px 0" }} />
);

const techStack = [
  { category: "Frontend",    items: "React.js · Three.js · Tailwind CSS" },
  { category: "Backend",     items: "Robust APIs · Scalable Database Management" },
  { category: "Environment", items: "Command-line first development" },
];

/* ─── Easing presets ─────────────────────────────────────────────────────────── */
const EASE_OUT  = [0.22, 1, 0.36, 1] as const;
const EASE_IN   = [0.55, 0, 1, 0.45] as const;

/* ─── Main ───────────────────────────────────────────────────────────────────── */
export default function AboutParallax() {
  const [cardOpen,  setCardOpen]  = useState(false);
  const [stageOpen, setStageOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  /* Section-level mouse — drives the orbital parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cfg  = { stiffness: 50, damping: 16 };
  const smX  = useSpring(rawX, cfg);
  const smY  = useSpring(rawY, cfg);

  const bioX  = useTransform(smX, (v: number) => v *  55);
  const bioY  = useTransform(smY, (v: number) => v *  38);
  const techX = useTransform(smX, (v: number) => v * -55);
  const techY = useTransform(smY, (v: number) => v * -38);
  const photoX  = useTransform(smX, (v: number) => v * -14);
  const photoY  = useTransform(smY, (v: number) => v * -10);
  const photoRX = useTransform(smY, [-1, 1], [ 5, -5]);
  const photoRY = useTransform(smX, [-1, 1], [-5,  5]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  * 2 - 1);
    rawY.set((e.clientY - r.top)  / r.height * 2 - 1);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  /* Open stage — reset parallax so cards spring to center before flipping */
  function openStage() {
    rawX.set(0);
    rawY.set(0);
    setStageOpen(true);
  }

  /* Escape to close, body scroll lock while staged */
  useEffect(() => {
    if (!stageOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setStageOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [stageOpen]);

  /* ── Shared card content ─────────────────────────────────────────────────── */
  const bioContent = (
    <>
      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brown-muted)", fontFamily: "'Space Grotesk', sans-serif" }}>About</p>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(34px, 4.5vw, 58px)", letterSpacing: "-0.01em", color: "var(--brown-dark)", lineHeight: 0.9, marginTop: 8 }}>
        Ian Kinoti
      </h1>
      <Divider />
      <div className="mb-4 relative inline-block cursor-pointer" onClick={(e) => { e.stopPropagation(); setCardOpen(true); }}>
        <motion.img
          src="/iankinoti.jpeg" alt="Ian Kinoti — click to expand"
          className="w-14 h-14 rounded-full object-cover border-2 border-[var(--tan)] shadow-md"
          style={{ objectPosition: "center top" }}
          whileHover={{ scale: 1.08, boxShadow: "0 8px 28px rgba(61,32,16,0.3)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
        <motion.span
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[var(--cream)] shadow"
          style={{ background: "var(--brown)", border: "2px solid var(--tan)", fontSize: 9 }}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 260, damping: 18 }}
          aria-hidden
        >♠</motion.span>
      </div>
      <p style={{ fontSize: "clamp(13px, 1.35vw, 15px)", color: "var(--text-muted)", lineHeight: 1.82 }}>
        My journey started with the fundamentals, but it quickly evolved into a fascination
        with how pieces fit together. Whether it&apos;s a backend API or the precision of
        Tailwind CSS, I&apos;ve spent my time mastering tools that allow for total control
        over the user experience.
      </p>
      <p style={{ marginTop: 10, fontSize: "clamp(13px, 1.35vw, 15px)", color: "var(--text-muted)", lineHeight: 1.82 }}>
        I believe great development is 50% architecture and 50% psychology — making a
        digital interaction feel as solid as a physical one.
      </p>
    </>
  );

  const techContent = (
    <>
      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--brown-muted)", fontFamily: "'Space Grotesk', sans-serif" }}>Technical Arsenal</p>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: "clamp(26px, 3.8vw, 42px)", letterSpacing: "-0.01em", color: "var(--brown-dark)", lineHeight: 0.9, marginTop: 8 }}>
        My Stack
      </h2>
      <Divider />
      {techStack.map((item, i) => (
        <div key={item.category} style={{ display: "flex", gap: "clamp(10px, 1.6vw, 22px)", padding: "13px 0", borderBottom: i < techStack.length - 1 ? "1px solid rgba(201,168,124,0.2)" : "none" }}>
          <p style={{ width: 96, flexShrink: 0, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brown-muted)", fontFamily: "'Space Grotesk', sans-serif", paddingTop: 2 }}>{item.category}</p>
          <p style={{ fontSize: "clamp(12px, 1.25vw, 14px)", color: "var(--text)", lineHeight: 1.68 }}>{item.items}</p>
        </div>
      ))}
    </>
  );

  const ctaLink = (
    <a href="/blog" style={{ display: "inline-block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--cream)", background: "var(--brown)", borderRadius: 8, padding: "12px 28px", textDecoration: "none" }}>
      Read the Blog →
    </a>
  );

  /* ── Card flip variants ─────────────────────────────────────────────────── */
  const bioFlip = {
    visible: { opacity: 1, rotateY: 0,    x: 0,    scale: 1,    pointerEvents: "auto" as const },
    staged:  { opacity: 0, rotateY: -100, x: -140, scale: 0.88, pointerEvents: "none" as const },
  };
  const techFlip = {
    visible: { opacity: 1, rotateY: 0,   x: 0,    scale: 1,    pointerEvents: "auto" as const },
    staged:  { opacity: 0, rotateY: 100, x:  140, scale: 0.88, pointerEvents: "none" as const },
  };

  return (
    <LayoutGroup>
      {/* ══════════ DESKTOP — orbit stage ════════════════════════════════════ */}
      <div
        ref={stageRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative hidden md:block"
        style={{ height: "max(800px, calc(100vh - 80px))" }}
      >
        {/* ── Center photo — shared-element source ───────────────────────── */}
        {/* z-index 2 keeps photo BEHIND the cards (z:4) — cards float in front */}
        <div style={{ position: "absolute", left: "50%", top: "46%", transform: "translate(-50%, -50%)", zIndex: 2, width: "clamp(220px, 32vw, 400px)" }}>
          <motion.div style={{ x: photoX, y: photoY, rotateX: photoRX, rotateY: photoRY, transformStyle: "preserve-3d" }}>
            <AnimatePresence>
              {!stageOpen && (
                <motion.div
                  key="orbit-photo"
                  onClick={openStage}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 1.3, ease: EASE_OUT }}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  {/* Pulsing ring — rage-bait click hint */}
                  <motion.div
                    aria-hidden
                    animate={{ scale: [1, 1.16, 1], opacity: [0.55, 0, 0.55] }}
                    transition={{ duration: 2.8, ease: "easeInOut", repeat: Infinity, delay: 1.8 }}
                    style={{
                      position: "absolute", inset: -14, borderRadius: 28,
                      border: "1.5px solid rgba(201,168,124,0.6)",
                      pointerEvents: "none", zIndex: 0,
                    }}
                  />
                  <motion.div
                    layoutId="ian-photo-card"
                    style={{
                      borderRadius: 20, overflow: "hidden",
                      boxShadow: "0 40px 100px rgba(61,32,16,0.32), 0 8px 24px rgba(61,32,16,0.16)",
                      border: "1.5px solid rgba(201,168,124,0.4)",
                      position: "relative", zIndex: 1,
                    }}
                  >
                    <img src="/ian-cover.jpg" alt="Ian Kinoti — click to stage" draggable={false}
                      style={{ display: "block", width: "100%", height: "auto", userSelect: "none" }} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <p style={{ marginTop: 12, textAlign: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, letterSpacing: "0.36em", textTransform: "uppercase", color: "var(--brown-muted)" }}>
              Developer · Writer · Builder
            </p>
          </motion.div>
        </div>

        {/* ── Bio card ───────────────────────────────────────────────────── */}
        <motion.div
          style={{ position: "absolute", top: "5%", left: 0, x: bioX, y: bioY, zIndex: 4, width: "clamp(250px, 35vw, 400px)", perspective: 1400 }}
        >
          <motion.div
            variants={bioFlip}
            initial={{ opacity: 0, rotateY: -12, x: -40 }}
            animate={stageOpen ? "staged" : "visible"}
            transition={stageOpen
              ? { duration: 0.42, ease: EASE_IN }
              : { duration: 0.76, ease: EASE_OUT, delay: 0.22 }
            }
            onClick={openStage}
            style={{ transformOrigin: "left center", transformStyle: "preserve-3d", cursor: "pointer" }}
          >
            <HologramCard>{bioContent}</HologramCard>
          </motion.div>
        </motion.div>

        {/* ── Tech card ──────────────────────────────────────────────────── */}
        <motion.div
          style={{ position: "absolute", bottom: "10%", right: 0, x: techX, y: techY, zIndex: 4, width: "clamp(230px, 33vw, 380px)", perspective: 1400 }}
        >
          <motion.div
            variants={techFlip}
            initial={{ opacity: 0, rotateY: 12, x: 40 }}
            animate={stageOpen ? "staged" : "visible"}
            transition={stageOpen
              ? { duration: 0.42, ease: EASE_IN, delay: 0.07 }
              : { duration: 0.76, ease: EASE_OUT, delay: 0.36 }
            }
            onClick={openStage}
            style={{ transformOrigin: "right center", transformStyle: "preserve-3d", cursor: "pointer" }}
          >
            <HologramCard>{techContent}</HologramCard>
          </motion.div>
        </motion.div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <motion.div
          style={{ position: "absolute", bottom: "3%", left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 4 }}
          animate={{ opacity: stageOpen ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          initial={{ opacity: 0 }}
        >
          <motion.div animate={{ opacity: stageOpen ? 0 : 1 }} initial={{ opacity: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
            {ctaLink}
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════ MOBILE ═══════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 md:hidden pb-16 pt-4">
        {/* Mobile photo — no layoutId to avoid same-layoutId conflict with desktop DOM element */}
        <motion.div
          onClick={openStage}
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ borderRadius: 20, overflow: "hidden", cursor: "pointer",
            boxShadow: "0 24px 60px rgba(61,32,16,0.24)", border: "1.5px solid rgba(201,168,124,0.35)" }}
        >
          <img src="/ian-cover.jpg" alt="Ian Kinoti — tap to stage" draggable={false}
            style={{ display: "block", width: "100%", height: "auto" }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
          <HologramCard>{bioContent}</HologramCard>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <HologramCard>{techContent}</HologramCard>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {ctaLink}
        </motion.div>
      </div>

      {/* ══════════ STAGE OVERLAY ════════════════════════════════════════════ */}
      <AnimatePresence>
        {stageOpen && (
          <motion.div
            key="stage-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38 }}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "rgba(18, 7, 0, 0.88)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
            }}
            onClick={() => setStageOpen(false)}
          >
            {/* ── CSS glass tech bubbles — left & right columns ─────────── */}
            <StageBubblePanels />

            {/* Shared-element photo — morphs from orbit, then springs into place */}
            <div style={{ position: "relative" }}>
              {/* Gold bloom — pulses once as photo settles */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0, 0.65, 0], scale: [0.7, 1.3, 1.6] }}
                transition={{ duration: 1.6, delay: 0.44, ease: "easeOut" }}
                style={{
                  position: "absolute", inset: -48,
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(201,168,124,0.46) 0%, transparent 68%)",
                  filter: "blur(28px)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <motion.div
                layoutId="ian-photo-card"
                style={{
                  position: "relative", zIndex: 1,
                  width: "min(88vw, 460px)",
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 64px 128px rgba(0,0,0,0.72), 0 0 0 1.5px rgba(201,168,124,0.4)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Spring rise + dual-axis tilt — settles like a real object landing */}
                <motion.div
                  initial={{ rotateY: 16, rotateX: 8, scale: 0.80, y: 52 }}
                  animate={{ rotateY: 0,  rotateX: 0, scale: 1,    y: 0  }}
                  exit={{    rotateY: -10, rotateX: -4, scale: 0.90, y: -28 }}
                  transition={{
                    type: "spring",
                    stiffness: 175,
                    damping: 17,
                    delay: 0.26,
                  }}
                  style={{ perspective: 1400, transformStyle: "preserve-3d" }}
                >
                  <img src="/ian-cover.jpg" alt="Ian Kinoti"
                    style={{ display: "block", width: "100%", height: "auto" }} draggable={false} />
                </motion.div>
              </motion.div>
            </div>

            {/* Name + role — fades in after photo settles */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.5, delay: 0.52, ease: EASE_OUT }}
              style={{ textAlign: "center", marginTop: 28, pointerEvents: "none" }}
            >
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900,
                fontSize: "clamp(26px, 4vw, 44px)", letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.96)", lineHeight: 1,
              }}>IAN KINOTI</p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 10,
                letterSpacing: "0.32em", textTransform: "uppercase",
                color: "rgba(201,168,124,0.82)", marginTop: 8,
              }}>Creative Developer · AI Builder · Nairobi</p>
            </motion.div>

            {/* Tap-to-close hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.85 }}
              style={{
                position: "absolute", bottom: 28,
                fontFamily: "'Space Grotesk', sans-serif", fontSize: 9,
                letterSpacing: "0.3em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)", pointerEvents: "none",
              }}
            >Click anywhere or press Esc to close</motion.p>

            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.48, type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => setStageOpen(false)}
              aria-label="Close stage"
              style={{
                position: "fixed", top: 20, right: 20,
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(201,168,124,0.18)",
                border: "1px solid rgba(201,168,124,0.45)",
                color: "rgba(255,255,255,0.85)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 15, backdropFilter: "blur(8px)",
              }}
            >✕</motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════ AVATAR CARD OVERLAY ══════════════════════════════════════ */}
      {cardOpen && (
        <CardOverlay image="/iankinoti.jpeg" name="Ian Kinoti" onClose={() => setCardOpen(false)} />
      )}
    </LayoutGroup>
  );
}
