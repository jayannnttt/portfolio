import AnimatedSection from './AnimatedSection';

const skillData = [
  {
    name: 'HTML',
    index: '01',
    note: 'Structure, semantic markup, and accessible document tree',
    usage: 'FitFlow Web Interface',
  },
  {
    name: 'CSS',
    index: '02',
    note: 'Visual styling, layout systems, and responsive design',
    usage: 'FitFlow & Portfolio',
  },
  {
    name: 'Python',
    index: '03',
    note: 'Backend scripting, algorithmic data processing, and APIs',
    usage: 'FitFlow, GhostTraffic, Campus Query',
  },
  {
    name: 'C',
    index: '04',
    note: 'Low-level systems programming and memory-conscious routines',
    usage: 'GhostTraffic Network Engine',
  },
  {
    name: 'C++',
    index: '05',
    note: 'Object-oriented architecture and performance-critical computing',
    usage: 'Core Problem Solving',
  },
] as const;

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 px-5 sm:px-6 md:px-8 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-12 md:mb-16">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              03 &mdash; Technical Skills
            </span>
            <span className="font-mono text-xs text-text-muted">Confirmed Core Stack</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
              Technical foundation.
            </h2>
            <p className="text-text-secondary text-sm md:text-base max-w-md leading-relaxed">
              Core programming languages and web technologies applied directly in projects and
              system engineering.
            </p>
          </div>
        </AnimatedSection>

        {/* Editorial Skills Table */}
        <div className="divide-y divide-border border-b border-border">
          {skillData.map((skill, i) => (
            <AnimatedSection key={skill.name} delay={i * 0.05}>
              <div className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr_auto] gap-x-6 md:gap-x-10 items-baseline py-6 sm:py-7 group hover:bg-surface/50 px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-xs transition-colors duration-150">
                {/* Index */}
                <span className="font-mono text-xs text-text-muted group-hover:text-accent transition-colors self-center">
                  {skill.index}
                </span>

                {/* Name and Description */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                  <h3 className="font-mono text-2xl sm:text-3xl md:text-4xl font-medium text-text group-hover:text-accent transition-colors duration-200 tracking-tight">
                    {skill.name}
                  </h3>
                  <span className="text-sm text-text-muted mt-1 sm:mt-0 leading-normal">
                    {skill.note}
                  </span>
                </div>

                {/* Project Usage Badge */}
                <span className="hidden sm:inline-flex items-center font-mono text-xs text-text-muted/80 bg-bg border border-border px-3 py-1 rounded-sm self-center">
                  {skill.usage}
                </span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}