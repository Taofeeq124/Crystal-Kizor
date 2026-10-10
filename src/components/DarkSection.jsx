import { useRef } from 'react';
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * Light → dark transition. The espresso surface starts inset to the page
 * gutters, like a print panel on the ivory page, and widens to full bleed
 * as the section scrolls into view. Purely presentational: content sits on
 * top and is never hidden by the effect.
 */
export default function DarkSection({ id, className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.15'] });
  const p = useTransform(scrollYProgress, [0, 1], [0.85, 0]);
  const clipPath = useMotionTemplate`inset(0 calc(var(--gutter) * ${p}) 0 calc(var(--gutter) * ${p}))`;

  return (
    <section ref={ref} id={id} className={`dark-section theme-dark ${className}`} {...rest}>
      <motion.div className="dark-section__bg" style={reduce ? undefined : { clipPath }} aria-hidden="true" />
      <div className="dark-section__content">{children}</div>
    </section>
  );
}
