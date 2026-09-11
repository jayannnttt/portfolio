import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import type { ProjectStatus } from '../data/projects';
import ProjectPreviewPlaceholder from '../components/ProjectPreviewPlaceholder';
import ProjectCarousel from '../components/ProjectCarousel';
import AnimatedSection from '../components/AnimatedSection';

const statusConfig: Record<
  ProjectStatus,
  { label: string; dot: string; textColor: string; badgeBg: string; note: string }
> = {
  completed: {
    label: 'Completed',
    dot: 'bg-status-completed',
    textColor: 'text-status-completed',
    badgeBg: 'bg-status-completed/10 border-status-completed/25',
    note: 'Core features implemented, validated, and functional.',
  },
  'in-progress': {
    label: 'Active Development',
    dot: 'bg-status-progress',
    textColor: 'text-status-progress',
    badgeBg: 'bg-status-progress/10 border-status-progress/25',
    note: 'Currently undergoing active engineering and iterative testing.',
  },
  upcoming: {
    label: 'Upcoming / Concept',
    dot: 'bg-status-upcoming',
    textColor: 'text-status-upcoming',
    badgeBg: 'bg-status-upcoming/10 border-status-upcoming/25',
    note: 'In the architectural planning and conceptual specification phase.',
  },
};

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const currentIndex = projects.findIndex((p) => p.id === id);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold text-text mb-3">Project Not Found</h1>
        <p className="text-sm text-text-muted mb-6">The requested project track does not exist.</p>
        <Link
          to="/"
          className="text-sm font-medium px-4 py-2 border border-border bg-surface text-text hover:border-accent rounded-sm transition-colors"
        >
          &larr; Return Home
        </Link>
      </div>
    );
  }

  const status = statusConfig[project.status];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;

  return (
    <article className="py-12 md:py-20 px-5 sm:px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-accent transition-colors"
          >
            <span>&larr;</span>
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Project Header */}
        <AnimatedSection className="mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-0.5 rounded-full border ${status.badgeBg} ${status.textColor}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <span className="text-border font-mono text-xs">&middot;</span>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
              Track {String(currentIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <h1 className="font-serif italic text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-text mb-4">
            {project.name}
          </h1>

          <p className="text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
        </AnimatedSection>

        {/* Interface Screenshots / Schematic Area (Dedicated strictly to application interface) */}
        <AnimatedSection delay={0.04} className="mb-14">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {hasScreenshots ? 'Interface Screenshots' : 'Interface Schematic'}
              </span>
              <span className="font-mono text-[11px] text-text-muted">
                {hasScreenshots
                  ? `${screenshots.length} Captured View${screenshots.length > 1 ? 's' : ''}`
                  : 'Architectural Wireframe'}
              </span>
            </div>

            {hasScreenshots ? (
              /* Instagram-Style Image Carousel */
              <ProjectCarousel
                screenshots={screenshots}
                projectName={project.name}
              />
            ) : (
              /* Wireframe / Schematic placeholder until screenshots are added */
              <div>
                <ProjectPreviewPlaceholder
                  projectName={project.name}
                  aspect="wide"
                  className="shadow-sm"
                />
                <div className="mt-3 flex items-center justify-between text-text-muted text-[11px] font-mono">
                  <span>Intentional architectural wireframe</span>
                  <span>Screenshots will appear here when added</span>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Details & Metadata Grid */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
          {/* Main Description */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-8">
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4 pb-3 border-b border-border">
                  System Overview
                </h2>
                <div className="space-y-4">
                  {project.description.map((para, i) => (
                    <p key={i} className="text-text-secondary text-base leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-widest text-text-muted mb-4 pb-3 border-b border-border">
                  Execution State
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">{status.note}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Technical Details Sidebar */}
          <AnimatedSection delay={0.14}>
            <div className="border border-border bg-surface rounded-sm divide-y divide-border shadow-xs">
              <div className="px-5 py-3.5 bg-surface-raised/50">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Technical Parameters
                </span>
              </div>

              {/* Technologies */}
              <div className="px-5 py-4">
                <span className="font-mono text-[11px] text-text-muted block mb-3">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2.5 py-1 rounded-sm bg-bg border border-border text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="px-5 py-4 space-y-2.5">
                <span className="font-mono text-[11px] text-text-muted block mb-1">
                  Availability
                </span>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-accent hover:text-accent-hover transition-colors py-1"
                  >
                    <span>GitHub Repository</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted opacity-50 py-1">
                    <span>Source Repository</span>
                    <span>Private</span>
                  </div>
                )}

                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs text-accent hover:text-accent-hover transition-colors py-1"
                  >
                    <span>Live Deployment</span>
                  </a>
                ) : (
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted opacity-50 py-1">
                    <span>Public Demo</span>
                    <span>In development</span>
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Project Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            to="/#projects"
            className="text-sm font-medium text-text-secondary hover:text-text transition-colors inline-flex items-center gap-2"
          >
            <span>&larr;</span>
            <span>All Projects</span>
          </Link>

          {nextProject && (
            <Link
              to={`/project/${nextProject.id}`}
              className="text-sm font-medium text-text-secondary hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span>Next: {nextProject.name}</span>
              <span>&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}