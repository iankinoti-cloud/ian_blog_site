"use client";

import { motion } from "framer-motion";
import TagBadge from "./TagBadge";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{
        y: -6,
        boxShadow:
          "0 24px 64px -8px rgba(107,66,38,0.22), 0 6px 20px rgba(107,66,38,0.1), inset 0 1px 1px rgba(255,255,255,0.92)",
      }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="rounded-2xl backdrop-blur-xl backdrop-saturate-150 p-5 sm:p-7 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 50%, rgba(201,168,124,0.1) 100%), rgba(237,227,211,0.52)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow:
          "0 4px 24px rgba(107,66,38,0.08), 0 1px 4px rgba(107,66,38,0.06), inset 0 1px 1px rgba(255,255,255,0.78)",
        willChange: "transform",
      }}
    >
      {/* Top-edge glass shimmer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(255,255,255,0.88), transparent)",
          pointerEvents: "none",
        }}
      />

      <div className="mb-3 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <TagBadge key={tech} tag={tech} />
        ))}
      </div>

      <h2 className="text-xl font-semibold text-[var(--brown-dark)]">{project.title}</h2>
      <p className="mt-2 text-[var(--text-muted)] leading-relaxed">{project.blurb}</p>
      <p className="mt-3 text-sm text-[var(--text-muted)] leading-relaxed">{project.description}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--brown)] hover:text-[var(--brown-dark)] transition-colors"
          >
            Live site →
          </a>
        )}
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[var(--brown-muted)] hover:text-[var(--brown-dark)] transition-colors"
        >
          {project.secondaryRepoUrl ? "Backend repo" : "View repo"} →
        </a>
        {project.secondaryRepoUrl && (
          <a
            href={project.secondaryRepoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--brown-muted)] hover:text-[var(--brown-dark)] transition-colors"
          >
            {project.secondaryRepoLabel ?? "Other repo"} →
          </a>
        )}
      </div>
    </motion.article>
  );
}
