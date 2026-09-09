import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Direction the element enters from */
  from?: 'bottom' | 'left' | 'none';
}

/**
 * Wraps content in a scroll-triggered entrance animation.
 * Uses Framer Motion's useInView with once:true so it only plays once.
 * Default: fade + subtle upward slide (24px).
 */
export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  from = 'bottom',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' });

  const initial = {
    opacity: 0,
    y: from === 'bottom' ? 20 : 0,
    x: from === 'left' ? -16 : 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
