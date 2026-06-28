"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

type Controls = ReturnType<typeof useAnimation>;

// ── IAN shadows ──────────────────────────────────────────────
const SHADOW_IAN =
  "2px 2px 0 #d9d0bc, 4px 4px 0 #c8bfa8, 6px 6px 0 #b8ae96, " +
  "8px 8px 0 #a89e86, 10px 10px 0 #968e78, 12px 12px 0 #847e6a, " +
  "14px 14px 0 #706a58, 16px 16px 0 #5c5748, 18px 18px 0 #484438, " +
  "20px 20px 0 #363228, 22px 22px 16px rgba(0,0,0,0.35)";

const SHADOW_IAN_GLOW =
  "0 0 14px rgba(245,239,226,0.98), 0 0 32px rgba(200,184,154,0.8), 0 0 64px rgba(200,184,154,0.45)";

// ── CREATIVE filters ──────────────────────────────────────────
const FILTER_CREATIVE =
  "drop-shadow(3px 3px 0 #00000070) drop-shadow(6px 6px 0 #00000050) " +
  "drop-shadow(9px 9px 0 #00000030) drop-shadow(0 12px 20px rgba(0,0,0,0.45))";

const FILTER_CREATIVE_GLOW =
  "drop-shadow(0 0 10px rgba(245,239,226,0.95)) drop-shadow(0 0 24px rgba(200,184,154,0.75)) " +
  "drop-shadow(0 0 48px rgba(200,184,154,0.4))";

const GRADIENT_SILK =
  "linear-gradient(160deg, #4a4a4a 0%, #0a0a0a 18%, #3a3a3a 30%, #080808 46%, #5a5a5a 56%, #111 68%, #222 80%, #050505 100%)";

// ── Shared float loops ────────────────────────────────────────
function ianFloatLoop(controls: Controls, index: number) {
  controls.start({
    y: [0, -10, 0],
    transition: {
      duration: 2.8,
      delay: index * 0.22,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  });
}

function creativeFloatLoop(controls: Controls, index: number) {
  controls.start({
    y: [0, -7, 0],
    transition: {
      duration: 3.0,
      delay: index * 0.18,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  });
}

// ── IAN letter ────────────────────────────────────────────────
function BannerLetter({ ch, index }: { ch: string; index: number }) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const hoveredRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    controls
      .start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 85, damping: 13, delay: 0.2 + index * 0.15 },
      })
      .then(() => {
        if (!hoveredRef.current) ianFloatLoop(controls, index);
      });
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      controls.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleHoverStart = useCallback(() => {
    hoveredRef.current = true;
    setIsHovered(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    controls.stop();
    controls.start({ y: -22, scale: 1.2, transition: { type: "spring", stiffness: 420, damping: 11 } });
  }, [controls]);

  const handleHoverEnd = useCallback(() => {
    hoveredRef.current = false;
    setIsHovered(false);
    controls
      .start({ y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } })
      .then(() => { if (!hoveredRef.current) ianFloatLoop(controls, index); });
  }, [controls, index]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 80, scale: 1 }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        display: "inline-block",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(72px, 18vw, 280px)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.02em",
        color: isHovered ? "#ffffff" : "#f5efe2",
        textShadow: isHovered ? SHADOW_IAN_GLOW : SHADOW_IAN,
        transition: "text-shadow 0.15s ease-out, color 0.15s ease-out",
        lineHeight: 0.82,
        cursor: "default",
        userSelect: "none",
        willChange: "transform",
      }}
      aria-hidden="true"
    >
      {ch}
    </motion.span>
  );
}

// ── CREATIVE letter ───────────────────────────────────────────
function CreativeLetter({ ch, index }: { ch: string; index: number }) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const hoveredRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    controls
      .start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 80, damping: 13, delay: 0.75 + index * 0.07 },
      })
      .then(() => {
        if (!hoveredRef.current) creativeFloatLoop(controls, index);
      });
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      controls.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleHoverStart = useCallback(() => {
    hoveredRef.current = true;
    setIsHovered(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    controls.stop();
    controls.start({ y: -18, scale: 1.18, transition: { type: "spring", stiffness: 420, damping: 11 } });
  }, [controls]);

  const handleHoverEnd = useCallback(() => {
    hoveredRef.current = false;
    setIsHovered(false);
    controls
      .start({ y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } })
      .then(() => { if (!hoveredRef.current) creativeFloatLoop(controls, index); });
  }, [controls, index]);

  return (
    <motion.span
      initial={{ opacity: 0, y: 60, scale: 1 }}
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        display: "inline-block",
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: "clamp(36px, 9vw, 140px)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        lineHeight: 0.88,
        cursor: "default",
        userSelect: "none",
        willChange: "transform",
        // On hover: white + glow filter. At rest: silk gradient clip.
        background: isHovered ? "none" : GRADIENT_SILK,
        WebkitBackgroundClip: isHovered ? "unset" : "text",
        WebkitTextFillColor: isHovered ? "#ffffff" : "transparent",
        backgroundClip: isHovered ? "unset" : "text",
        color: "#ffffff",
        filter: isHovered ? FILTER_CREATIVE_GLOW : FILTER_CREATIVE,
        transition: "filter 0.15s ease-out",
      }}
      aria-hidden="true"
    >
      {ch}
    </motion.span>
  );
}

// ── BORN TO BE variants ───────────────────────────────────────
const bornVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const bornLetterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ── Banner ────────────────────────────────────────────────────
export default function IanCreativeBanner() {
  const midControls = useAnimation();
  const bottomControls = useAnimation();

  useEffect(() => {
    midControls.start({
      opacity: 1,
      scale: 1,
      transition: { delay: 1.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    });
    bottomControls.start({
      opacity: 1,
      y: 0,
      transition: { delay: 1.6, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    });
    return () => {
      midControls.stop();
      bottomControls.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#e8e4de",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
      }}
    >
      {/* Halftone texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #00000018 1px, transparent 1px)",
          backgroundSize: "6px 6px",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Blueprint circles */}
      {[
        { w: "53%", top: "-8%", right: "-7%", left: undefined },
        { w: "37%", top: "2%",  right: "-2%", left: undefined },
        { w: "58%", top: "8%",  right: undefined, left: "-21%" },
        { w: "21%", top: "35%", right: undefined, left: "7%" },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.12)",
            width: c.w,
            paddingBottom: c.w,
            top: c.top,
            right: c.right,
            left: c.left,
            zIndex: 0,
          }}
        />
      ))}

      {/* Cert badge */}
      <div
        style={{
          position: "absolute",
          top: "4%",
          left: "4%",
          width: "clamp(70px, 10vw, 90px)",
          fontSize: "clamp(5px, 0.8vw, 6.5px)",
          lineHeight: 1.5,
          color: "#333",
          border: "1px solid #999",
          padding: "4px 5px",
          background: "rgba(255,255,255,0.5)",
          zIndex: 10,
          fontFamily: "monospace",
          letterSpacing: "0.03em",
        }}
      >
        <span style={{ fontSize: "clamp(7px, 1vw, 9px)", fontWeight: 700, letterSpacing: "0.15em", color: "#c0392b" }}>
          IAN CREATIVE
        </span>
        <br />
        IC-CRTV-2026 ●<br />
        BRAND ARCHITECTURE<br />
        REG. NO. IAC-0001-KE
        <div style={{ display: "flex", gap: "4px", marginTop: "3px", alignItems: "center" }}>
          {["CE", "KC", "IC"].map((t) => (
            <span key={t} style={{ border: "1px solid #555", padding: "1px 3px", fontSize: "clamp(5px, 0.7vw, 7px)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── TOP ZONE ──────────────────────────────────────────── */}
      <div style={{ position: "relative", padding: "5% 5% 3%", zIndex: 2 }}>

        {/* BORN TO BE */}
        <motion.div
          variants={bornVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            gap: "clamp(6px, 1.8vw, 18px)",
            letterSpacing: "0.38em",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(8px, 1.3vw, 13px)",
            fontWeight: 900,
            color: "#111",
            textTransform: "uppercase",
            marginBottom: "clamp(4px, 0.8vw, 8px)",
            flexWrap: "wrap",
          }}
        >
          {["B","O","R","N","·","T","O","·","B","E"].map((ch, i) =>
            ch === "·" ? (
              <span key={i} style={{ width: "clamp(6px, 1.2vw, 14px)", opacity: 0 }} />
            ) : (
              <motion.span key={i} variants={bornLetterVariants}>{ch}</motion.span>
            )
          )}
        </motion.div>

        {/* IAN */}
        <div aria-label="IAN" style={{ lineHeight: 0.82, userSelect: "none" }}>
          {["I", "A", "N"].map((ch, i) => (
            <BannerLetter key={ch} ch={ch} index={i} />
          ))}
        </div>

        {/* CREATIVE */}
        <div
          aria-label="CREATIVE"
          style={{
            marginTop: "clamp(-10px, -1.5vw, -28px)",
            paddingLeft: "clamp(4px, 0.8vw, 8px)",
            userSelect: "none",
            display: "block",
          }}
        >
          {"CREATIVE".split("").map((ch, i) => (
            <CreativeLetter key={i} ch={ch} index={i} />
          ))}
        </div>

        {/* Systems badge */}
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            right: "4%",
            fontSize: "clamp(4.5px, 0.7vw, 6.5px)",
            lineHeight: 1.6,
            color: "#444",
            fontFamily: "monospace",
            textAlign: "right",
            zIndex: 10,
          }}
        >
          SYSTEMS GROUP (c)<br />
          COMPLY(non) PRH ICES-33-20/in(o)p<br />
          <span style={{ letterSpacing: "0.2em", fontSize: "clamp(5px, 0.9vw, 8px)" }}>⊙⊙</span>
          &nbsp;&nbsp;□<br />
          Customs (X) KTLSU04492:049-2
        </div>
      </div>

      {/* ── MID ZONE ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={midControls}
        style={{
          position: "relative",
          background: "linear-gradient(to bottom, #d4cec5 0%, #1a1a1a 55%, #0d0d0d 100%)",
          minHeight: "clamp(160px, 28vw, 380px)",
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "clamp(180px, 44vw, 380px)", height: "clamp(155px, 40vw, 340px)",
            background: "radial-gradient(ellipse 60% 40% at 50% 35%, #2a2a2a 0%, transparent 70%), linear-gradient(to bottom, #1c1c1c 0%, #0a0a0a 60%, transparent 100%)",
            clipPath: "polygon(20% 100%, 12% 65%, 18% 45%, 28% 28%, 38% 18%, 50% 10%, 62% 18%, 72% 28%, 82% 45%, 88% 65%, 80% 100%)",
            zIndex: 3,
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "clamp(75px, 18vw, 160px)", left: "50%", transform: "translateX(-50%)",
            width: "clamp(55px, 14vw, 120px)", height: "clamp(60px, 15vw, 130px)",
            background: "radial-gradient(ellipse at 40% 35%, #3a3a3a 0%, #111 60%, #050505 100%)",
            borderRadius: "50% 50% 40% 40% / 55% 55% 45% 45%",
            zIndex: 5,
            boxShadow: "inset -8px -8px 20px rgba(0,0,0,0.8), 2px -4px 20px rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "clamp(62px, 14vw, 130px)", left: "50%", transform: "translateX(-50%)",
            width: "clamp(55px, 14vw, 120px)", height: "clamp(55px, 14vw, 120px)",
            zIndex: 6,
          }}
        >
          {[40, -40].map((deg) => (
            <div
              key={deg}
              style={{
                position: "absolute", width: "115%", height: "clamp(8px, 1.8vw, 18px)",
                background: "#f5efe2", top: "50%", left: "50%",
                transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                borderRadius: "3px", boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", width: "100%", height: "1px", background: "#333", top: "50%", left: 0, opacity: 0.12, zIndex: 0 }} />
        <div style={{ position: "absolute", width: "1px", height: "100%", background: "#333", left: "50%", top: 0, opacity: 0.12, zIndex: 0 }} />
      </motion.div>

      {/* ── BOTTOM ZONE ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={bottomControls}
        style={{
          background: "#0d0d0d",
          padding: "clamp(14px, 3vw, 32px) clamp(18px, 5vw, 44px) clamp(18px, 4vw, 40px)",
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(12px, 2.4vw, 26px)",
            fontWeight: 900,
            letterSpacing: "0.22em",
            color: "#f5efe2",
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "clamp(8px, 1.5vw, 18px)",
          }}
        >
          IAN&nbsp;
          <em style={{ fontStyle: "normal", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 300, fontSize: "clamp(10px, 2vw, 22px)", letterSpacing: "0.1em" }}>
            ×
          </em>
          &nbsp;CREATIVE
        </div>
        <p
          style={{
            fontSize: "clamp(8px, 1.1vw, 11.5px)",
            lineHeight: 1.75,
            color: "#aaa",
            maxWidth: "100%",
            textAlign: "left",
            fontWeight: 300,
            letterSpacing: "0.01em",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <strong style={{ color: "#f5efe2", fontWeight: 500 }}>&ldquo;IAN Creative&rdquo;</strong> is about embracing
          intensity, originality, and relentless self-belief in the pursuit of standing out. It reflects the idea that
          greatness isn&rsquo;t built in comfort — it&rsquo;s forged through pressure, late nights, risks, and moments
          where quitting feels easier than continuing. To{" "}
          <strong style={{ color: "#f5efe2", fontWeight: 500 }}>create</strong> is to push beyond limits, to refine
          your identity through struggle until what remains is something unforgettable. Being iconic isn&rsquo;t about
          chasing attention; it&rsquo;s about becoming so authentic, so sharp, and so consistent that your presence
          speaks before you do.
        </p>
      </motion.div>
    </div>
  );
}
