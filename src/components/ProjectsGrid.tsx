import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';
import AnimatedSection from './AnimatedSection';

export default function ProjectsGrid() {
  const fitFlow = projects.find((p) => p.id === 'fitflow') || projects[0];
  const devHub = projects.find((p) => p.id === 'devhub') || projects[1];
  const ghostTraffic = projects.find((p) => p.id === 'ghosttraffic') || projects[2];
  const campusQuery = projects.find((p) => p.id === 'campus-quer' || p.id === 'campus-query') || projects[3];

  return (
    <section id="projects" className="py-20 md:py-28 px-5 sm:px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-10 md:mb-12">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              01 &mdash; Selected Work
            </span>
            <span className="font-mono text-xs text-text-muted">
              {projects.length} Confirmed Projects
            </span>
          </div>
        </AnimatedSection>

        {/* Project Layout */}
        <div className="space-y-8">
          {/* Flagship: FitFlow */}
          <AnimatedSection delay={0.06}>
            <ProjectCard project={fitFlow} index={0} variant="featured" />
          </AnimatedSection>

          {/* Featured: DevHub */}
          <AnimatedSection delay={0.12}>
            <ProjectCard project={devHub} index={1} variant="featured" />
          </AnimatedSection>

          {/* Secondary 2-column: GhostTraffic & Campus Quer */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <AnimatedSection delay={0.18} className="h-full">
              <ProjectCard project={ghostTraffic} index={2} variant="standard" />
            </AnimatedSection>

            <AnimatedSection delay={0.24} className="h-full">
              <ProjectCard project={campusQuery} index={3} variant="concept" />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}