"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

// Shadow constants
const SHADOW_3D_NAV =
  "1px 1px 0 #c8b89a, 2px 2px 0 #b8a88a, 3px 3px 0 #a8987a, 4px 4px 0 #887060, 5px 5px 7px rgba(0,0,0,0.65)";
const SHADOW_GLOW =
  "0 0 10px rgba(242,237,228,0.95), 0 0 24px rgba(200,184,154,0.75), 0 0 48px rgba(200,184,154,0.35)";
const SHADOW_3D_HERO =
  "1px 1px 0 #5a3018, 2px 2px 0 #4e2912, 3px 3px 0 #42220e, 4px 4px 0 #371c0a, " +
  "5px 5px 0 #2d1607, 6px 6px 0 #241104, 7px 7px 12px rgba(0,0,0,0.5)";

type Controls = ReturnType<typeof useAnimation>;

function doFloat(controls: Controls, index: number, amp: number) {
  controls.start({
    y: [0, -amp, 0],
    scale: 1,
    transition: {
      duration: 2.8,
      delay: index * 0.18,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
    },
  });
}

interface LetterProps {
  ch: string;
  index: number;
  wiggleTrigger: number;
  baseStyle: React.CSSProperties;
  baseShadow: string;
  baseColor: string;
  amp: number;
  hoverScale: number;
  hoverY: number;
}

function AnimatedLetter({
  ch, index, wiggleTrigger, baseStyle, baseShadow, baseColor, amp, hoverScale, hoverY,
}: LetterProps) {
  const controls = useAnimation();
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);

  // Start floating on mount
  useEffect(() => {
    doFloat(controls, index, amp);
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // On nav click: spring-land, then resume floating
  useEffect(() => {
    if (wiggleTrigger === 0) return;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    controls.stop();
    controls.start({
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 18, delay: index * 0.06 },
    });
    resumeTimer.current = setTimeout(() => {
      if (!hoveredRef.current) doFloat(controls, index, amp);
    }, 2000 + index * 80);
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wiggleTrigger]);

  const handleHoverStart = useCallback(() => {
    hoveredRef.current = true;
    setIsHovered(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    controls.stop();
    controls.start({
      y: hoverY,
      scale: hoverScale,
      transition: { type: "spring", stiffness: 420, damping: 11 },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, hoverY, hoverScale]);

  const handleHoverEnd = useCallback(() => {
    hoveredRef.current = false;
    setIsHovered(false);
    controls
      .start({
        y: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      })
      .then(() => {
        if (!hoveredRef.current) doFloat(controls, index, amp);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controls, index, amp]);

  return (
    <motion.span
      animate={controls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      style={{
        ...baseStyle,
        textShadow: isHovered ? SHADOW_GLOW : baseShadow,
        color: isHovered ? "#ffffff" : baseColor,
        transition: "text-shadow 0.15s ease-out, color 0.15s ease-out",
        display: "inline-block",
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

interface AnimatedNameProps {
  size?: "hero" | "nav";
  wiggleTrigger?: number;
}

export default function AnimatedName({ size = "hero", wiggleTrigger = 0 }: AnimatedNameProps) {
  const name = "IAN KINOTI";
  const isHero = size === "hero";

  const baseStyle: React.CSSProperties = {
    fontSize: isHero ? "clamp(3rem, 8vw, 5.5rem)" : "1.875rem",
    fontWeight: isHero ? 900 : 700,
    letterSpacing: isHero ? "0.1em" : "0.18em",
    lineHeight: isHero ? 1 : undefined,
  };

  const baseShadow = isHero ? SHADOW_3D_HERO : SHADOW_3D_NAV;
  const baseColor  = isHero ? "#e8d4b0" : "#f2ede4";
  const amp        = isHero ? 8 : 5;
  const hoverScale = isHero ? 1.35 : 1.25;
  const hoverY     = isHero ? -18 : -10;
  const spaceWidth = isHero ? "1.1em" : "0.25em";

  const letters = name.split("").map((ch, i) => ({ ch, i }));

  return (
    <span aria-label="Ian Kinoti" style={{ display: "inline-flex", alignItems: "baseline" }}>
      {letters.map(({ ch, i }) => {
        if (ch === " ") {
          return <span key={i} style={{ display: "inline-block", width: spaceWidth }} />;
        }
        return (
          <AnimatedLetter
            key={i}
            ch={ch}
            index={i}
            wiggleTrigger={wiggleTrigger}
            baseStyle={baseStyle}
            baseShadow={baseShadow}
            baseColor={baseColor}
            amp={amp}
            hoverScale={hoverScale}
            hoverY={hoverY}
          />
        );
      })}
    </span>
  );
}

