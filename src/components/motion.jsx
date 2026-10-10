/**
 * Motion primitives shared by every section. Kept deliberately small:
 *   <Reveal>      fade + rise as an element enters the viewport
 *   <RevealLines> editorial line-by-line reveal inside overflow masks
 *   <MaskImage>   image uncovered by a clip-path wipe, with optional parallax
 *
 * All of them render real content in the DOM (never conditionally), so
 * text is readable by assistive tech and search engines even before or
 * without animation. With prefers-reduced-motion they render statically.
 */
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export const EASE = [0.22, 1, 0.36, 1];
// The huge top margin treats anything *above* the viewport as already seen,
// so content skipped by an anchor jump or a fast scroll is never left hidden.
const VIEWPORT = { once: true, margin: '100000px 0px -10% 0px' };

export function Reveal({ as = 'div', delay = 0, y = 28, children, ...rest }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Component>
  );
}

const linesParent = {
  hidden: {},
  visible: (delay = 0) => ({ transition: { staggerChildren: 0.09, delayChildren: delay } }),
};
const lineChild = {
  hidden: { y: '108%' },
  visible: { y: '0%', transition: { duration: 1.1, ease: EASE } },
};

/**
 * Splits a heading into lines that slide up from behind a mask.
 * `onMount` plays immediately (used in the hero); otherwise on scroll.
 */
export function RevealLines({ as = 'h2', lines, className, delay = 0, onMount = false, ...rest }) {
  const reduce = useReducedMotion();
  const Component = motion[as];
  const trigger = onMount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };
  return (
    <Component
      className={className}
      initial={reduce ? false : 'hidden'}
      variants={linesParent}
      custom={delay}
      {...trigger}
      {...rest}
    >
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          {/* trailing space keeps words separate in the accessible name */}
          <motion.span variants={lineChild}>{line}</motion.span>{' '}
        </span>
      ))}
    </Component>
  );
}

/**
 * Image revealed by an upward clip-path wipe while the photograph settles
 * from a slight zoom. With `parallax`, the image drifts gently against the
 * scroll (the frame stays fixed, so it never overlaps neighbouring content).
 */
export function MaskImage({ children, className = '', parallax = false, delay = 0, onMount = false, strength = 7 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const useParallax = parallax && !reduce;

  const frame = {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    visible: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 1.4, ease: EASE, delay } },
  };
  const inner = {
    hidden: { scale: 1.14 },
    visible: { scale: 1, transition: { duration: 1.8, ease: EASE, delay } },
  };
  const trigger = onMount ? { animate: 'visible' } : { whileInView: 'visible', viewport: VIEWPORT };

  return (
    <motion.div
      ref={ref}
      className={`mask-image ${className}`}
      initial={reduce ? false : 'hidden'}
      variants={frame}
      {...trigger}
    >
      <motion.div className="mask-image__inner" variants={inner}>
        <motion.div
          className="mask-image__parallax"
          style={useParallax ? { y, scale: 1 + (strength * 2.2) / 100 } : undefined}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Eyebrow({ index, children, as: Tag = 'p', id, className = '' }) {
  return (
    <Tag id={id} className={`eyebrow label ${className}`}>
      <span className="eyebrow__num" aria-hidden="true">
        {index}
      </span>
      <span>{children}</span>
    </Tag>
  );
}
