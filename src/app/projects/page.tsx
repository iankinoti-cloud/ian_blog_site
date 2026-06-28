import ProjectCard from "@/components/shared/ProjectCard";
import { FadeUp, StaggerContainer, StaggerItem, PageTransition } from "@/components/shared/Motion";
import { getAllProjects } from "@/lib/projects";

const allProjects = getAllProjects();

export default function ProjectsPage() {
  return (
    <PageTransition>
      {/* Ghost watermark */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(140px, 28vw, 280px)",
          letterSpacing: "-0.02em",
          color: "transparent",
          WebkitTextStroke: "1px rgba(201,168,124,0.12)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        WORK
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <FadeUp>
          <div className="mb-10">
            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--brown-muted)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Work
            </p>
            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(52px, 9vw, 88px)",
                letterSpacing: "-0.01em",
                color: "var(--brown-dark)",
                lineHeight: 0.88,
                marginTop: 8,
              }}
            >
              Projects
            </h1>
            <div className="mt-5 h-px w-12 bg-[var(--tan)]" />
            <p className="mt-6 max-w-xl text-[var(--text-muted)] leading-relaxed">
              A selection of things I&rsquo;ve built end to end — from a Kenyan artisan
              marketplace with simulated escrow payments to a hospital records system
              and a sprint-based project tracker.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="flex flex-col gap-6">
          {allProjects.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </PageTransition>
  );
}
