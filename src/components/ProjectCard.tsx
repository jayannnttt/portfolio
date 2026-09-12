import { useState } from 'react';
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const screenshots = project.screenshots || [];
  const hasScreenshots = screenshots.length > 0;
  const currentImage = hasScreenshots ? screenshots[activeImageIndex] : project.banner;

  // ─── Flagship / Featured Card (FitFlow) ───
  if (variant === 'featured') {
    return (
      <div className="group border border-border hover:border-accent/50 bg-surface rounded-sm overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md">
        {/* Project Preview Banner — Full-Width Natural Aspect Ratio for Maximum Visual Clarity */}
        <div className="border-b border-border bg-[#12100e] overflow-hidden">
          {project.banner ? (
            <Link
              to={`/project/${project.id}`}
              className="block relative w-full aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden group/img"
            >
              <img
                src={project.banner}
                alt={`${project.name} Banner`}
                className="w-full h-full object-cover object-center transition-all duration-300 group-hover/img:scale-[1.01] crisp-render"
                loading="eager"
              />
            </Link>
          ) : (
            <ProjectPreviewPlaceholder
              projectName={project.name}
              aspect="wide"
              className="rounded-none border-0"
            />
          )}
        </div>

        {/* Details Panel */}
        <div className="p-6 sm:p-7 md:p-8">
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

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-6 lg:gap-10 items-start">
            <div>
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
              <p className="text-text-muted text-sm leading-relaxed">
                {project.description[0]}
              </p>
            </div>

            <div className="flex flex-col justify-between h-full space-y-6">
              {/* Technologies */}
              <div>
                <span className="font-mono text-[11px] text-text-muted block mb-2.5 uppercase tracking-wider">
                  Technologies
                </span>
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
              <div className="pt-4 border-t border-border flex items-center justify-between">
                <Link
                  to={`/project/${project.id}`}
                  className="text-sm font-medium text-text-secondary group-hover:text-accent transition-colors duration-200 inline-flex items-center gap-2"
                >
                  <span>View Project</span>
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
      </div>
    );
  }

  // ─── Concept / Exploratory Card (Campus Query) ───
  if (variant === 'concept') {
    return (
      <div className="h-full">
        <div className="group h-full border border-dashed border-border/80 hover:border-status-upcoming/60 bg-surface/40 hover:bg-surface/60 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs">
          {/* Project Preview Thumbnail / Banner — No link for concept */}
          <div className="border-b border-dashed border-border/70 bg-[#131114] overflow-hidden">
            {project.banner ? (
              <div className="block relative aspect-[21/9] overflow-hidden">
                <img
                  src={project.banner}
                  alt={`${project.name} Banner`}
                  className="w-full h-full object-cover object-center crisp-render"
                  loading="lazy"
                />
              </div>
            ) : (
              <ProjectPreviewPlaceholder
                projectName={project.name}
                aspect="wide"
                className="rounded-none border-0"
              />
            )}
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

            {/* Bottom Actions — Removed View Details link for Campus Query */}
            <div className="mt-auto pt-4 border-t border-dashed border-border/70 flex items-center justify-between">
              <span className="font-mono text-xs text-text-muted/80 inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-status-upcoming/70" />
                <span>Concept Stage</span>
              </span>
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
        {/* Project Preview Thumbnail / Interactive Screenshot Showcase */}
        <div className="border-b border-border bg-[#0e0c0a] overflow-hidden relative group/img">
          {currentImage ? (
            <div className="relative aspect-[21/9] sm:aspect-[16/9] overflow-hidden bg-[#0a0908] flex items-center justify-center">
              <Link
                to={`/project/${project.id}`}
                className="block w-full h-full"
                title={`${project.name} — View details`}
              >
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={`${project.name} preview ${hasScreenshots ? activeImageIndex + 1 : ''}`}
                  className="w-full h-full object-contain object-center transition-all duration-300 crisp-render p-1.5 group-hover/img:scale-[1.01]"
                  loading="lazy"
                />
              </Link>

              {/* Prev / Next controls if multiple screenshots */}
              {hasScreenshots && screenshots.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        prev === 0 ? screenshots.length - 1 : prev - 1
                      );
                    }}
                    aria-label="Previous screenshot"
                    title="Previous screenshot"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 hover:bg-black text-text border border-white/15 hover:border-accent/60 flex items-center justify-center text-xs transition-all z-10 cursor-pointer shadow-md opacity-85 group-hover/img:opacity-100"
                  >
                    &larr;
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImageIndex((prev) =>
                        (prev + 1) % screenshots.length
                      );
                    }}
                    aria-label="Next screenshot"
                    title="Next screenshot"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 hover:bg-black text-text border border-white/15 hover:border-accent/60 flex items-center justify-center text-xs transition-all z-10 cursor-pointer shadow-md opacity-85 group-hover/img:opacity-100"
                  >
                    &rarr;
                  </button>

                  {/* Counter badge */}
                  <div className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent px-2 py-0.5 rounded bg-black/85 border border-accent/30 backdrop-blur-xs z-10 select-none pointer-events-none">
                    {activeImageIndex + 1} / {screenshots.length}
                  </div>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 bg-black/65 px-2 py-0.5 rounded-full backdrop-blur-xs">
                    {screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setActiveImageIndex(idx);
                        }}
                        aria-label={`Show screenshot ${idx + 1}`}
                        className={`transition-all duration-200 rounded-full cursor-pointer ${
                          idx === activeImageIndex
                            ? 'w-3 h-1 bg-accent'
                            : 'w-1 h-1 bg-white/40 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <ProjectPreviewPlaceholder
              projectName={project.name}
              aspect="wide"
              className="rounded-none border-0"
            />
          )}
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
              <span>View Project</span>
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