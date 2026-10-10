import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { EASE } from './motion.jsx';
import './BackToTop.css';

/**
 * Floating return-to-top control, shown once the visitor is past the hero.
 * It is a real link to #top, so it works with or without JavaScript
 * (smooth scrolling comes from CSS and respects reduced motion).
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * 1.2));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#top"
          className="back-to-top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <ArrowUp size={18} strokeWidth={1.25} aria-hidden="true" />
          <span className="visually-hidden">Back to top</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
