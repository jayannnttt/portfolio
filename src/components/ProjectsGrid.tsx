import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import AnimatedSection from './AnimatedSection';

export default function ProjectsGrid() {
  const fitFlow = projects.find((p) => p.id === 'fitflow') || projects[0];
  const ghostTraffic = projects.find((p) => p.id === 'ghosttraffic') || projects[1];
  const campusQuery = projects.find((p) => p.id === 'campus-query') || projects[2];

  return (
    <section id="projects" className="py-20 md:py-28 px-5 sm:px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              01 &mdash; Selected Work
            </span>
            <span className="font-mono text-xs text-text-muted">
              {projects.length} Confirmed Projects
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
              Crafted with intent.
            </h2>
            <p className="text-text-secondary text-sm md:text-base max-w-md leading-relaxed">
              Real projects focused on functionality, architecture, and problem solving &mdash; no
              fictional showcase apps.
            </p>
          </div>
        </AnimatedSection>

        {/* Project Layout */}
        <div className="space-y-8">
          {/* Flagship: FitFlow */}
          <AnimatedSection delay={0.06}>
            <ProjectCard project={fitFlow} index={0} variant="featured" />
          </AnimatedSection>

          {/* Secondary 2-column: GhostTraffic & Campus Query */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <AnimatedSection delay={0.12} className="h-full">
              <ProjectCard project={ghostTraffic} index={1} variant="standard" />
            </AnimatedSection>

            <AnimatedSection delay={0.18} className="h-full">
              <ProjectCard project={campusQuery} index={2} variant="concept" />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}