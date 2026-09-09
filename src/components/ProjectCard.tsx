import { Link } from 'react-router-dom';
import type { Project, ProjectStatus } from '../data/projects';
import ProjectPreviewPlaceholder from './ProjectPreviewPlaceholder';

const statusConfig: Record<
  ProjectStatus,
  { label: string; dot: string; pulse: boolean; textColor: string; badgeBg: string }
> = {
  completed: {
    label: 'Completed',
    dot: 'bg-status-completed',
    pulse: false,
    textColor: 'text-status-completed',
    badgeBg: 'bg-status-completed/10 border-status-completed/25',
  },
  'in-progress': {
    label: 'Active Development',
    dot: 'bg-status-progress',
    pulse: true,
    textColor: 'text-status-progress',
    badgeBg: 'bg-status-progress/10 border-status-progress/25',
  },
  upcoming: {
    label: 'Upcoming / Concept',
    dot: 'bg-status-upcoming',
    pulse: false,
    textColor: 'text-status-upcoming',
    badgeBg: 'bg-status-upcoming/10 border-status-upcoming/25',
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  variant?: 'featured' | 'standard' | 'concept';
}

export default function ProjectCard({
  project,
  index,
  variant = 'standard',
}: ProjectCardProps) {
  const status = statusConfig[project.status];
  const indexLabel = String(index + 1).padStart(2, '0');

  // ─── Flagship / Featured Card (FitFlow) ───
  if (variant === 'featured') {
    return (
      <div className="group border border-border hover:border-accent/50 bg-surface rounded-sm overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0">
          {/* Intentional Schematic Preview (Photos reserved exclusively for detail page) */}
          <div className="border-b lg:border-b-0 lg:border-r border-border bg-[#141210]">
            <ProjectPreviewPlaceholder
              projectName={project.name}
              aspect="video"
              className="h-full min-h-[240px] md:min-h-[280px] rounded-none border-0"
            />
          </div>

          {/* Details Panel */}
          <div className="flex flex-col justify-between p-6 sm:p-7 md:p-8">
            <div>
              {/* Header meta */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs text-accent tracking-wider font-medium">
                  FLAGSHIP &mdash; {indexLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full border ${status.badgeBg} ${status.textColor}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="pl-3.5 border-l-2 border-accent mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-text group-hover:text-accent transition-colors duration-200">
                  {project.name}
                </h3>
                <p className="text-text-secondary text-sm mt-1.5 font-medium">
                  {project.tagline}
                </p>
              </div>

              {/* Summary */}
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {project.description[0]}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
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

            {/* Bottom Actions */}
            <div className="mt-8 pt-5 border-t border-border flex items-center justify-between">
              <Link
                to={`/project/${project.id}`}
                className="text-sm font-medium text-text-secondary group-hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
              >
                <span>View Details</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
                >
                  GitHub
                </a>
              ) : (
                <span className="font-mono text-xs text-text-muted opacity-40 select-none">
                  Source private
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Concept / Exploratory Card (Campus Query) ───
  if (variant === 'concept') {
    return (
      <div className="h-full">
        <div className="group h-full border border-dashed border-border/80 hover:border-status-upcoming/60 bg-surface/40 hover:bg-surface/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs">
          {/* Intentional Schematic Preview */}
          <div className="border-b border-dashed border-border/70 bg-[#131114]">
            <ProjectPreviewPlaceholder
              projectName={project.name}
              aspect="wide"
              className="rounded-none border-0"
            />
          </div>

          <div className="flex flex-col flex-1 p-6 sm:p-7">
            <div>
              {/* Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-text-muted tracking-wider">
                  EXPLORATION &mdash; {indexLabel}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${status.badgeBg} ${status.textColor}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="pl-3 border-l-2 border-status-upcoming/60 mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-status-upcoming transition-colors duration-200">
                  {project.name}
                </h3>
                <p className="text-text-secondary text-sm mt-1 font-medium">
                  {project.tagline}
                </p>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {project.description[0]}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2.5 py-1 rounded-sm bg-bg/60 border border-border/70 text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-auto pt-4 border-t border-dashed border-border/70 flex items-center justify-between">
              <Link
                to={`/project/${project.id}`}
                className="text-sm font-medium text-text-muted group-hover:text-text transition-colors duration-200 inline-flex items-center gap-2"
              >
                <span>Concept Brief</span>
                <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted/60">
                In Conception
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Standard / Active Development Card (GhostTraffic) ───
  return (
    <div className="h-full">
      <div className="group h-full border border-border hover:border-status-progress/60 bg-surface rounded-sm overflow-hidden transition-all duration-300 flex flex-col shadow-xs hover:shadow-md">
        {/* Intentional Schematic Preview */}
        <div className="border-b border-border bg-[#141210]">
          <ProjectPreviewPlaceholder
            projectName={project.name}
            aspect="wide"
            className="rounded-none border-0"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 sm:p-7">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-xs text-text-muted tracking-wider">
              ACTIVE &mdash; {indexLabel}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border ${status.badgeBg} ${status.textColor}`}
            >
              {status.pulse ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${status.dot} animate-status-pulse`}
                  />
                  <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.dot}`} />
                </span>
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              )}
              {status.label}
            </span>
          </div>

          <div className="pl-3 border-l-2 border-status-progress/80 mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-text group-hover:text-accent transition-colors duration-200">
              {project.name}
            </h3>
            <p className="text-text-secondary text-sm mt-1 font-medium">
              {project.tagline}
            </p>
          </div>

          <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">
            {project.description[0]}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-xs px-2.5 py-1 rounded-sm bg-bg border border-border text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <Link
              to={`/project/${project.id}`}
              className="text-sm font-medium text-text-secondary group-hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
            >
              <span>View Details</span>
              <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted hover:text-accent transition-colors"
              >
                GitHub
              </a>
            ) : (
              <span className="font-mono text-xs text-text-muted opacity-40 select-none">
                In development
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}