import { useReducedMotion, motion } from 'motion/react';
import Picture from '../components/Picture.jsx';
import ArrowLink from '../components/ArrowLink.jsx';
import { MaskImage, RevealLines, EASE } from '../components/motion.jsx';
import { hero } from '../content/site.js';
import './Hero.css';

/**
 * Opening choreography (≈1.6s total, nothing blocks interaction):
 * portrait wipes up → headline lines rise → intro, actions and meta fade in →
 * header settles last (see Header).
 */
export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease: EASE, delay },
        };

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__grid wrap">
        <div className="hero__copy">
          <motion.p className="hero__kicker label" {...fade(0.2)}>
            {hero.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </motion.p>

          <RevealLines as="h1" id="hero-title" className="display hero__title" lines={hero.headline} delay={0.25} onMount />

          <motion.p className="hero__intro" {...fade(0.75)}>
            {hero.intro}
          </motion.p>

          <motion.div className="hero__actions" {...fade(0.9)}>
            <ArrowLink href="#work" variant="solid">
              Explore the work
            </ArrowLink>
            <ArrowLink href="#talks">Watch the TEDx talk</ArrowLink>
          </motion.div>
        </div>

        <figure className="hero__figure">
          <MaskImage className="hero__image" onMount parallax strength={4}>
            <Picture
              name="portrait-studio"
              alt="Crystal Kizor leaning on a travertine desk in her studio, in front of a wall of architectural drawings and material samples"
              sizes="(min-width: 960px) 42vw, 100vw"
              priority
            />
          </MaskImage>
          <motion.figcaption className="hero__caption" {...fade(1.1)}>
            <span className="label">In the studio</span>
            <span>Crystal Kizor, Lead Principal of Studio&nbsp;COKA</span>
          </motion.figcaption>
        </figure>
      </div>

      <motion.div className="hero__meta wrap" {...fade(1.2)}>
        <dl>
          {hero.meta.map((item) => (
            <div key={item.label}>
              <dt className="label">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <a href="#philosophy" className="hero__scroll label">
          <span>Scroll</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </motion.div>
    </section>
  );
}
