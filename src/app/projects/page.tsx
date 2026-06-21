import ProjectCard from "@/components/shared/ProjectCard";
import { FadeUp, StaggerContainer, StaggerItem, PageTransition } from "@/components/shared/Motion";
import { getAllProjects } from "@/lib/projects";

const allProjects = getAllProjects();

export default function ProjectsPage() {
  return (
    <PageTransition>
      <FadeUp>
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--brown-muted)]">Work</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-[var(--brown-dark)]">Projects</h1>
          <div className="mt-4 h-px w-12 bg-[var(--tan)]" />
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
    </PageTransition>
  );
}
