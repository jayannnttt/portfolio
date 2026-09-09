import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { handleAnchorClick } from '../lib/scroll';
import { personalInfo, professionalLinks } from '../data/projects';

const navLinks = [
  { label: 'Work', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0e0d0c]/90 backdrop-blur-md border-b border-border shadow-xs'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="mx-auto max-w-[1100px] flex items-center justify-between px-5 sm:px-6 md:px-8 py-4"
          aria-label="Main Navigation"
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="font-mono text-sm font-semibold tracking-[0.14em] text-text hover:text-accent transition-colors duration-200"
            aria-label={`${personalInfo.name} Home`}
          >
            {personalInfo.name}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {isHome ? (
              <>
                <div className="flex items-center gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-sm text-text-secondary hover:text-text transition-colors duration-150 font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="w-px h-4 bg-border" aria-hidden="true" />

                <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                  <a
                    href={professionalLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={professionalLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`mailto:${professionalLinks.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    Email
                  </a>
                </div>
              </>
            ) : (
              <Link
                to="/"
                className="text-sm font-medium text-text-secondary hover:text-accent flex items-center gap-2 transition-colors"
              >
                <span>&larr;</span>
                <span>All Projects</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 -mr-2 rounded-sm text-text hover:text-accent transition-colors focus:outline-none cursor-pointer"
            aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-current transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[61px] z-40 bg-surface/98 backdrop-blur-md border-b border-border md:hidden"
          >
            <nav className="flex flex-col px-6 py-6" aria-label="Mobile Navigation">
              {isHome ? (
                <>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        handleAnchorClick(e, link.href);
                        closeMenu();
                      }}
                      className="text-base font-medium text-text hover:text-accent transition-colors py-3 border-b border-border/40 last:border-0"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-5 flex items-center gap-5 font-mono text-xs text-text-muted">
                    <a
                      href={professionalLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                      onClick={closeMenu}
                    >
                      GitHub
                    </a>
                    <a
                      href={professionalLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                      onClick={closeMenu}
                    >
                      LinkedIn
                    </a>
                    <a
                      href={`mailto:${professionalLinks.email}`}
                      className="hover:text-accent transition-colors"
                      onClick={closeMenu}
                    >
                      Email
                    </a>
                  </div>
                </>
              ) : (
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="text-base font-medium text-text hover:text-accent py-3 flex items-center gap-2"
                >
                  <span>&larr;</span>
                  <span>All Projects</span>
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
