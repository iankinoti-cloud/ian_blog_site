"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { getAllProjects } from "@/lib/projects";
import type { Project } from "@/lib/projects";

const all = getAllProjects();
const row1 = [...all, ...all];
const row2 = [...[...all].reverse(), ...[...all].reverse()];

function MarqueeCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      style={{
        width: "clamp(210px, 21vw, 272px)",
        height: "clamp(290px, 29vw, 370px)",
        flexShrink: 0,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow:
          "0 6px 28px rgba(107,66,38,0.15), 0 1px 4px rgba(107,66,38,0.08), inset 0 1px 1px rgba(255,255,255,0.18)",
      }}
    >
      {/* Cover photo */}
      <img
        src="/ian-cover.jpg"
        alt={project.title}
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 8%",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Dark gradient base so glass panel blends into image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(14,8,3,0.88) 0%, rgba(14,8,3,0.45) 45%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      {/* Glass content panel */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(12px, 1.4vw, 16px) clamp(14px, 1.6vw, 18px)",
          backdropFilter: "blur(10px) saturate(150%)",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%), rgba(20,10,4,0.55)",
          borderTop: "1px solid rgba(201,168,124,0.2)",
        }}
      >
        {/* Top shimmer on glass panel */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(201,168,124,0.5), transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Stack tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 7 }}>
          {project.stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(201,168,124,0.9)",
                border: "1px solid rgba(201,168,124,0.3)",
                borderRadius: 100,
                padding: "2px 7px",
                background: "rgba(201,168,124,0.08)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Title */}
        <p
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(17px, 1.9vw, 22px)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "#f5efe2",
            lineHeight: 1.15,
            marginBottom: 5,
          }}
        >
          {project.title}
        </p>

        {/* Blurb — 2 line clamp */}
        <p
          style={{
            fontSize: "clamp(9.5px, 1vw, 11px)",
            color: "rgba(245,239,226,0.48)",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {project.blurb}
        </p>
      </div>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Project[];
  direction: "left" | "right";
  duration: number;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={{ overflow: "hidden", paddingTop: 16, paddingBottom: 16 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        style={{
          display: "flex",
          gap: "clamp(12px, 1.4vw, 18px)",
          width: "max-content",
          animation: `${direction === "left" ? "marqueeLeft" : "marqueeRight"} ${duration}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((project, i) => (
          <MarqueeCard key={`${project.slug}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectMarquee() {
  return (
    // Full-bleed breakout from max-w-4xl container
    <section
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        paddingTop: "clamp(40px, 6vw, 64px)",
        paddingBottom: "clamp(40px, 6vw, 64px)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(237,227,211,0.18) 20%, rgba(237,227,211,0.18) 80%, transparent 100%)",
      }}
    >
      {/* Section label */}
      <p
        style={{
          textAlign: "center",
          fontSize: 11,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--brown-muted)",
          marginBottom: "clamp(20px, 3vw, 32px)",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        Projects
      </p>

      <MarqueeRow items={row1} direction="left"  duration={30} />
      <MarqueeRow items={row2} direction="right" duration={42} />
    </section>
  );
}
