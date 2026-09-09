import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { handleAnchorClick } from '../lib/scroll';
import { personalInfo, professionalLinks, projects } from '../data/projects';

const statusColors: Record<string, string> = {
  completed: 'bg-status-completed',
  'in-progress': 'bg-status-progress',
  upcoming: 'bg-status-upcoming',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  'in-progress': 'Active',
  upcoming: 'Upcoming',
};

const tickerItems = [
  'FitFlow',
  'GhostTraffic',
  'Campus Query',
  'Python',
  'C',
  'C++',
  'HTML',
  'CSS',
  'FitFlow',
  'GhostTraffic',
  'Campus Query',
  'Python',
  'C',
  'C++',
  'HTML',
  'CSS',
];

// Stagger variants for hero entrance
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Subtle interactive highlight on desktop
  useEffect(() => {
    const el = nameRef.current;
    if (!el || window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', `${x}%`);
      el.style.setProperty('--my', `${y}%`);
    };

    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section className="pt-24 sm:pt-28 md:pt-32 pb-0 px-5 sm:px-6 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        {/* Main hero grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start"
        >
          {/* Left: Editorial Identity */}
          <div>
            {/* Name — exact full name in editorial serif */}
            <motion.div variants={itemVariants}>
              <h1
                ref={nameRef}
                className="font-serif text-[clamp(4.25rem,13vw,8.5rem)] leading-[0.88] tracking-[-0.03em] text-text italic select-none"
              >
                {personalInfo.name}
              </h1>
            </motion.div>

            {/* Academic profile & Tagline */}
            <motion.div variants={itemVariants} className="mt-6 space-y-3 max-w-lg">
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                Student at{' '}
                <span className="text-text font-medium">
                  {personalInfo.education.institution}
                </span>
                , currently pursuing{' '}
                <span className="text-text font-medium">
                  {personalInfo.education.degree}
                </span>
                .
              </p>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                Building practical software &mdash; focused on clear architecture, measured
                engineering, and real utility.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                onClick={(e) => handleAnchorClick(e, '/#projects')}
                className="group px-5 py-2.5 bg-text text-bg font-medium text-sm hover:bg-accent hover:text-bg transition-all duration-200 rounded-sm inline-flex items-center gap-2"
              >
                <span>View Work</span>
                <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>

              <a
                href="#experience"
                onClick={(e) => handleAnchorClick(e, '/#experience')}
                className="px-5 py-2.5 border border-border text-text-secondary font-medium text-sm hover:border-border-hover hover:text-text transition-all duration-200 rounded-sm"
              >
                Experience
              </a>

              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, '/#contact')}
                className="px-5 py-2.5 border border-border text-text-secondary font-medium text-sm hover:border-border-hover hover:text-text transition-all duration-200 rounded-sm"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* External channels */}
            <motion.div
              variants={itemVariants}
              className="mt-7 flex flex-wrap items-center gap-5 font-mono text-xs text-text-muted"
            >
              <a
                href={professionalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="GitHub Profile"
              >
                GitHub
              </a>
              <a
                href={professionalLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${professionalLinks.email}`}
                className="hover:text-accent transition-colors"
                aria-label="Send an email"
              >
                Email
              </a>
            </motion.div>
          </div>

          {/* Right: Project Status Board */}
          <motion.div variants={itemVariants} className="lg:pt-2">
            <div className="border border-border bg-surface rounded-sm overflow-hidden shadow-xs">
              {/* Institution Context bar */}
              <div className="px-4 py-2.5 border-b border-border bg-surface-raised/40 flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span className="truncate">SRM Ramapuram, Chennai</span>
                <span className="text-accent shrink-0 ml-2">CSE (AI/ML)</span>
              </div>

              {/* Header bar */}
              <div className="px-4 py-3 border-b border-border flex items-center justify-between bg-surface-raised/20">
                <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  Project Index
                </span>
                <span className="font-mono text-[11px] text-accent tracking-wider">
                  3 Active Tracks
                </span>
              </div>

              {/* Project entries */}
              <div className="divide-y divide-border">
                {projects.map((project) => (
                  <a
                    key={project.id}
                    href="#projects"
                    onClick={(e) => handleAnchorClick(e, '/#projects')}
                    className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-raised transition-colors duration-150 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Status dot */}
                      <span
                        className={`shrink-0 w-2 h-2 rounded-full ${statusColors[project.status]} ${
                          project.status === 'in-progress' ? 'animate-status-pulse' : ''
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text group-hover:text-accent transition-colors duration-150 truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-text-muted truncate mt-0.5 font-mono">
                          {project.technologies.join(' &middot; ')}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 ml-3 font-mono text-[10px] text-text-muted opacity-80 uppercase tracking-wider">
                      {statusLabels[project.status]}
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border bg-surface-raised/20 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Focus
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  HTML &middot; CSS &middot; Python &middot; C &middot; C++
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Marquee Ticker */}
        <div
          className="mt-14 sm:mt-16 border-t border-border overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="relative flex py-3">
            <div className="flex gap-8 animate-marquee whitespace-nowrap font-mono text-[11px] text-text-muted uppercase tracking-widest">
              {tickerItems.map((item, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>{item}</span>
                  <span className="text-accent/40">&sdot;</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
