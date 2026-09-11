import { useState, useEffect, useCallback } from 'react';
import { sortScreenshotsNumerically } from '../data/fitflowScreenshots';

interface ProjectCarouselProps {
  screenshots?: string[];
  projectName: string;
  className?: string;
}

export default function ProjectCarousel({
  screenshots = [],
  projectName,
  className = '',
}: ProjectCarouselProps) {
  // Sort numerically: img 1 -> img 2 -> ... -> img 9 -> img 10
  const sortedImages = sortScreenshotsNumerically(screenshots);
  const total = sortedImages.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isActualPixels, setIsActualPixels] = useState(false);

  // Clamp index purely during render to avoid cascading re-renders
  const safeIndex = Math.min(currentIndex, Math.max(0, total - 1));

  const handlePrev = useCallback(() => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  }, [safeIndex]);

  const handleNext = useCallback(() => {
    if (safeIndex < total - 1) {
      setCurrentIndex(safeIndex + 1);
    }
  }, [safeIndex, total]);

  // Keyboard navigation (ArrowLeft / ArrowRight / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape' && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isLightboxOpen]);

  if (total === 0 || !sortedImages[safeIndex]) {
    return null;
  }

  const currentImage = sortedImages[safeIndex];
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === total - 1;

  // Clean filename for the status bar
  const currentFilename =
    currentImage.replace(/\\/g, '/').split('/').pop() || `Screenshot ${safeIndex + 1}`;

  return (
    <>
      <div className={`border border-border rounded-sm overflow-hidden bg-surface shadow-xs ${className}`}>
        {/* Chrome / Meta Header */}
        <div className="border-b border-border bg-surface-raised/50 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent/70" />
            <span className="font-mono text-xs text-text-muted truncate max-w-[160px] sm:max-w-none">
              {currentFilename}
            </span>
            <span className="text-border font-mono text-xs hidden sm:inline">&middot;</span>
            <span className="font-mono text-[10px] text-text-muted/70 hidden sm:inline">
              1080p Original
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Expand / High-Res Lightbox Button */}
            <button
              type="button"
              onClick={() => {
                setIsActualPixels(false);
                setIsLightboxOpen(true);
              }}
              title="Open full-resolution preview"
              className="font-mono text-[11px] text-text-secondary hover:text-accent border border-border hover:border-accent/40 px-2.5 py-1 rounded bg-surface transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span>Expand</span>
            </button>

            {/* Counter Badge: e.g. 1 / 8 */}
            <div className="font-mono text-xs text-accent px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 shrink-0">
              {safeIndex + 1} / {total}
            </div>
          </div>
        </div>

        {/* Main Instagram-Style Viewport — Enhanced Resolution & Clarity */}
        <div className="relative bg-[#0a0908] overflow-hidden select-none min-h-[360px] sm:min-h-[480px] md:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
          <div
            onClick={() => {
              setIsActualPixels(false);
              setIsLightboxOpen(true);
            }}
            title="Click to view full resolution"
            className="w-full h-full flex items-center justify-center p-3 sm:p-5 md:p-6 cursor-zoom-in group"
          >
            <img
              key={currentImage}
              src={currentImage}
              alt={`${projectName} screenshot ${safeIndex + 1}`}
              className="max-h-[560px] sm:max-h-[640px] md:max-h-[700px] w-auto max-w-full object-contain rounded-xs shadow-md transition-all duration-300 crisp-render group-hover:opacity-95"
              loading="eager"
            />
          </div>

          {/* Overlay Floating Previous Button */}
          {!isFirst && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous image"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-text border border-white/10 hover:border-accent/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-10 shadow-lg group cursor-pointer hover:scale-105"
            >
              <span className="text-base transition-transform duration-200 group-hover:-translate-x-0.5">
                &larr;
              </span>
            </button>
          )}

          {/* Overlay Floating Next Button */}
          {!isLast && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next image"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-text border border-white/10 hover:border-accent/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 z-10 shadow-lg group cursor-pointer hover:scale-105"
            >
              <span className="text-base transition-transform duration-200 group-hover:translate-x-0.5">
                &rarr;
              </span>
            </button>
          )}
        </div>

        {/* Bottom Controls Bar */}
        <div className="px-4 py-3 border-t border-border bg-surface-raised/30 flex items-center justify-between gap-3">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={isFirst}
            className={`inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded-sm border transition-all duration-200 ${
              isFirst
                ? 'opacity-25 border-border/40 text-text-muted cursor-not-allowed pointer-events-none'
                : 'border-border bg-surface hover:bg-surface-raised text-text-secondary hover:text-accent hover:border-accent/50 cursor-pointer'
            }`}
          >
            <span>&larr;</span>
            <span>Previous</span>
          </button>

          {/* Instagram Pagination Indicator & Counter */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-accent font-medium px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
              {safeIndex + 1} / {total}
            </span>
            <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto max-w-[140px] py-1 px-1">
              {sortedImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to screenshot ${idx + 1}`}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    idx === safeIndex
                      ? 'w-4 h-1.5 bg-accent'
                      : 'w-1.5 h-1.5 bg-border hover:bg-text-muted'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={isLast}
            className={`inline-flex items-center gap-1.5 font-mono text-xs px-3.5 py-1.5 rounded-sm border transition-all duration-200 ${
              isLast
                ? 'opacity-25 border-border/40 text-text-muted cursor-not-allowed pointer-events-none'
                : 'border-border bg-surface hover:bg-surface-raised text-text-secondary hover:text-accent hover:border-accent/50 cursor-pointer'
            }`}
          >
            <span>Next</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* ─── Full-Resolution Lightbox Modal ─── */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 select-none animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between pb-3 border-b border-border/70 text-text max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-text-muted">
                {currentFilename}
              </span>
              <span className="font-mono text-xs text-accent px-2 py-0.5 rounded bg-accent/10 border border-accent/25">
                {safeIndex + 1} / {total}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Actual Pixels / Fit Screen Toggle */}
              <button
                type="button"
                onClick={() => setIsActualPixels((prev) => !prev)}
                className="font-mono text-xs px-3 py-1 rounded border border-border hover:border-accent text-text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                {isActualPixels ? 'Fit Screen' : '100% Actual Size'}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close full resolution preview"
                className="w-8 h-8 rounded border border-border/80 hover:border-accent flex items-center justify-center text-text hover:text-accent transition-colors font-mono text-sm cursor-pointer"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Modal Image Viewport */}
          <div
            className="flex-1 flex items-center justify-center overflow-auto my-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Floating Prev */}
            {!isFirst && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous screenshot"
                className="fixed left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface/80 hover:bg-surface text-text border border-border hover:border-accent backdrop-blur-sm flex items-center justify-center transition-all z-20 cursor-pointer shadow-xl text-xl"
              >
                &larr;
              </button>
            )}

            <div className={`transition-all duration-200 ${isActualPixels ? 'max-w-none' : 'max-w-full max-h-full'}`}>
              <img
                key={currentImage}
                src={currentImage}
                alt={`${projectName} original screenshot ${safeIndex + 1}`}
                className={`${
                  isActualPixels
                    ? 'w-[1918px] h-auto max-w-none'
                    : 'max-h-[82vh] max-w-full w-auto object-contain'
                } rounded-sm shadow-2xl crisp-render mx-auto`}
              />
            </div>

            {/* Modal Floating Next */}
            {!isLast && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next screenshot"
                className="fixed right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-surface/80 hover:bg-surface text-text border border-border hover:border-accent backdrop-blur-sm flex items-center justify-center transition-all z-20 cursor-pointer shadow-xl text-xl"
              >
                &rarr;
              </button>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div
            className="flex items-center justify-between pt-3 border-t border-border/70 text-text max-w-6xl w-full mx-auto font-mono text-xs text-text-muted"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Tip: Use Arrow keys to navigate &middot; Esc to close</span>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              Close &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
