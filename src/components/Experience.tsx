import AnimatedSection from './AnimatedSection';
import { experiences } from '../data/projects';

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 px-5 sm:px-6 md:px-8 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              02 &mdash; Experience
            </span>
            <span className="font-mono text-xs text-text-muted">Past Engagement</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
              Past experience.
            </h2>
            <p className="text-text-secondary text-sm md:text-base max-w-md leading-relaxed">
              Previous student organization and technical domain tenure &mdash; concluded role.
            </p>
          </div>
        </AnimatedSection>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <AnimatedSection key={exp.id} delay={idx * 0.08}>
              <div className="border border-border bg-surface rounded-sm p-6 sm:p-8 hover:border-border-hover transition-colors duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Organization & Domain */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-border bg-surface-raised text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-text-muted/60" />
                        Previous Role &middot; Concluded
                      </span>
                    </div>

                    <div className="pl-3.5 border-l-2 border-accent mt-3">
                      <h3 className="text-2xl sm:text-3xl font-bold text-text">
                        {exp.organization}
                      </h3>
                      <p className="text-text-secondary text-base mt-1 font-medium">
                        {exp.domain}
                      </p>
                    </div>
                  </div>

                  {/* Right: Timeline & Duration */}
                  <div className="flex flex-col lg:items-end gap-1.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-border/70 font-mono">
                    <span className="text-sm sm:text-base text-text font-medium">
                      {exp.period}
                    </span>
                    <span className="text-xs text-accent">
                      Duration: {exp.duration}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
