import { handleAnchorClick } from '../lib/scroll';
import { personalInfo, professionalLinks } from '../data/projects';

export default function Footer() {
  return (
    <footer className="py-10 px-5 sm:px-6 md:px-8 border-t border-border bg-[#0b0a09]">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs font-bold text-text tracking-[0.16em]">
            {personalInfo.name}
          </span>
          <p className="font-mono text-[11px] text-text-muted mt-1">
            &copy; {new Date().getFullYear()} &mdash; Engineered with intent and restraint.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-mono text-xs text-text-muted">
          <a
            href="#projects"
            onClick={(e) => handleAnchorClick(e, '/#projects')}
            className="hover:text-text transition-colors duration-150"
          >
            Work
          </a>
          <a
            href="#experience"
            onClick={(e) => handleAnchorClick(e, '/#experience')}
            className="hover:text-text transition-colors duration-150"
          >
            Experience
          </a>
          <a
            href="#skills"
            onClick={(e) => handleAnchorClick(e, '/#skills')}
            className="hover:text-text transition-colors duration-150"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, '/#contact')}
            className="hover:text-text transition-colors duration-150"
          >
            Contact
          </a>
          <a
            href={professionalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href={professionalLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${professionalLinks.email}`}
            className="hover:text-accent transition-colors duration-150"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}