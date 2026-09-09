import { useState } from 'react';
import type { FormEvent } from 'react';
import { professionalLinks } from '../data/projects';
import AnimatedSection from './AnimatedSection';

// Vite environment variable for Web3Forms access key
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (!professionalLinks.email) return;
    navigator.clipboard.writeText(professionalLinks.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Check if gateway key is configured
    if (!WEB3FORMS_ACCESS_KEY) {
      setTimeout(() => {
        setStatus('error');
        setErrorMessage(
          `Form gateway unconfigured. Set VITE_WEB3FORMS_ACCESS_KEY in .env, or reach out directly via ${professionalLinks.email}`
        );
      }, 350);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          from_name: 'Portfolio Visitor',
          email,
          message,
          subject: `Portfolio Contact from ${email}`,
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message || 'Failed to send message through the gateway. Please reach out directly.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please try again or reach out directly.');
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-5 sm:px-6 md:px-8 border-t border-border">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <AnimatedSection className="mb-10 md:mb-14">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <span className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
              04 &mdash; Inquiries
            </span>
            <span className="font-mono text-xs text-text-muted">Direct Communication</span>
          </div>

          <h2 className="font-serif italic text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-text">
            Say hello.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-secondary leading-relaxed max-w-lg">
            Open to discussions regarding practical software projects, technical roles, or inquiries
            about the architecture of any work featured here.
          </p>
        </AnimatedSection>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
          {/* Form */}
          <AnimatedSection delay={0.08}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Spam bot prevention honeypot */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2 font-medium"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-surface border border-border px-4 py-3 text-text text-sm rounded-sm placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-200 font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-[11px] uppercase tracking-wider text-text-muted mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your inquiry..."
                  className="w-full bg-surface border border-border px-4 py-3 text-text text-sm rounded-sm placeholder:text-text-muted/40 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-200 font-sans resize-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group px-6 py-3 bg-text text-bg font-medium text-sm rounded-sm hover:bg-accent hover:text-bg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2 cursor-pointer"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-bg/40 border-t-bg rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${professionalLinks.email}`}
                  className="px-5 py-3 border border-border text-text-secondary text-sm rounded-sm hover:border-accent hover:text-text transition-colors duration-200 inline-flex items-center"
                >
                  Direct Mail
                </a>
              </div>

              {status === 'success' && (
                <p className="text-sm text-status-completed font-mono mt-3">
                  Message received. Thank you for reaching out.
                </p>
              )}
              {status === 'error' && (
                <div className="text-sm text-amber-300/90 font-mono mt-3 leading-relaxed">
                  <p>{errorMessage}</p>
                  <a
                    href={`mailto:${professionalLinks.email}?subject=Portfolio%20Inquiry`}
                    className="inline-block mt-2 text-accent underline hover:text-accent-hover"
                  >
                    Click to launch email client ({professionalLinks.email}) &rarr;
                  </a>
                </div>
              )}
            </form>
          </AnimatedSection>

          {/* Direct Channels Card */}
          <AnimatedSection delay={0.14} className="lg:pt-1">
            <div className="border border-border bg-surface rounded-sm overflow-hidden divide-y divide-border shadow-xs">
              <div className="px-5 py-3.5 bg-surface-raised/50 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                  Direct Channels
                </span>
                <span className="font-mono text-[10px] text-accent">Active</span>
              </div>

              {/* Email */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-mono text-[11px] text-text-muted block">Email</span>
                  <a
                    href={`mailto:${professionalLinks.email}`}
                    className="font-mono text-xs text-text-secondary hover:text-accent transition-colors truncate block"
                    title="Send email"
                  >
                    {professionalLinks.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 font-mono text-[11px] text-accent hover:text-accent-hover transition-colors px-2.5 py-1 rounded bg-accent/5 border border-accent/20 cursor-pointer"
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* GitHub */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] text-text-muted block">GitHub</span>
                  <span className="font-mono text-xs text-text-secondary">jayannnttt</span>
                </div>
                <a
                  href={professionalLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-accent-hover transition-colors"
                >
                  Profile
                </a>
              </div>

              {/* LinkedIn */}
              <div className="px-5 py-4 flex items-center justify-between gap-3">
                <div>
                  <span className="font-mono text-[11px] text-text-muted block">LinkedIn</span>
                  <span className="font-mono text-xs text-text-secondary">S Jayant</span>
                </div>
                <a
                  href={professionalLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-accent hover:text-accent-hover transition-colors"
                >
                  Connect
                </a>
              </div>

              {/* Status note */}
              <div className="px-5 py-3.5 bg-surface-raised/20 text-[11px] font-mono text-text-muted">
                Direct inquiries answered promptly
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}