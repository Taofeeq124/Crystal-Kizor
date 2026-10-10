import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/**
 * A statement whose words darken as it is read — scroll-linked, never
 * scroll-jacking. Words listed in `emphasis` are set in italic.
 */
export default function ScrollText({ text, emphasis = [], className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const words = text.split(' ');

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const clean = word.replace(/[^\p{L}]/gu, '').toLowerCase();
        const italic = emphasis.includes(clean);
        const range = [i / words.length, (i + 1) / words.length];
        return (
          <Word key={i} progress={scrollYProgress} range={range} italic={italic} still={reduce}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range, italic, still }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const Tag = italic ? motion.em : motion.span;
  return (
    <>
      <Tag style={still ? undefined : { opacity }}>{children}</Tag>{' '}
    </>
  );
}
