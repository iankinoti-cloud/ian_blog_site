"use client";

import { motion } from "framer-motion";
import TagBadge from "./TagBadge";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -4, boxShadow: "0 12px 40px -8px rgba(107,66,38,0.18)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-2xl border border-[var(--tan-light)] bg-[var(--parchment)] p-5 sm:p-7 shadow-sm"
    >
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
