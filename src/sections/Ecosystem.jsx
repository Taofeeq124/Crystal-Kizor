import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import DarkSection from '../components/DarkSection.jsx';
import Picture from '../components/Picture.jsx';
import ArrowLink from '../components/ArrowLink.jsx';
import { Eyebrow, Reveal, RevealLines, EASE } from '../components/motion.jsx';
import { ecosystem } from '../content/site.js';
import images from '../content/images.json';
import { initiativeLink } from '../lib/links.js';
import './Ecosystem.css';

/**
 * The seven initiatives as one index rather than seven cards. On desktop a
 * sticky "stage" shows the initiative being read — driven by scroll position,
 * hover and keyboard focus — while the list carries all the content, so
 * nothing depends on the stage being seen.
 */
export default function Ecosystem() {
  const [active, setActive] = useState(ecosystem[0].id);
  const listRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll('[data-id]') ?? [];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.dataset.id)),
      { rootMargin: '-48% 0px -48% 0px' },
    );
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  const current = ecosystem.find((item) => item.id === active);
  const currentIndex = ecosystem.indexOf(current);

  return (
    <DarkSection id="ecosystem" className="ecosystem" aria-labelledby="ecosystem-title">
      <div className="wrap">
        <header className="ecosystem__head">
          <Eyebrow index="02">The ecosystem</Eyebrow>
          <RevealLines
            id="ecosystem-title"
            className="display ecosystem__title"
            lines={['One conviction,', <em key="e">seven ways</em>, 'of acting on it.']}
          />
          <Reveal as="p" className="ecosystem__intro" delay={0.2}>
            Every initiative answers the same question from a different angle: how can design, knowledge and
            community make everyday life measurably better? Studio COKA and TEA Architects are where the ideas are
            built. The others are where they are made, taught, spoken about and lived.
          </Reveal>
        </header>

        <div className="ecosystem__body">
          <div className="ecosystem__stage" aria-hidden="true">
            <div className="stage">
              <div className="stage__viewport">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.id}
                  className="stage__frame"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  {current.logo ? (
                    <div className="stage__logo">
                      <img src={images[current.logo].src} alt="" width={images[current.logo].width} height={images[current.logo].height} />
                    </div>
                  ) : current.image ? (
                    <Picture name={current.image} alt="" sizes="36vw" className="stage__image" />
                  ) : (
                    <div className="stage__mark">
                      <span className="stage__ring" />
                      <span className="stage__letters display">{current.mark}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              </div>
              <div className="stage__caption">
                <span className="label">
                  0{currentIndex + 1} — {current.strand}
                </span>
                <span className="stage__name display">{current.short ?? current.name}</span>
              </div>
            </div>
          </div>

          <ol className="ecosystem__list" ref={listRef}>
            {ecosystem.map((item, i) => {
              const link = initiativeLink(item);
              return (
                <li
                  key={item.id}
                  data-id={item.id}
                  className={`initiative ${item.core ? 'initiative--core' : ''} ${active === item.id ? 'is-active' : ''}`}
                  onPointerEnter={() => setActive(item.id)}
                  onFocusCapture={() => setActive(item.id)}
                >
                  <Reveal className="initiative__inner">
                    <p className="initiative__strand label">
                      <span aria-hidden="true">0{i + 1}</span>
                      {item.strand}
                      {item.role && <span className="initiative__role">{item.role}</span>}
                    </p>
                    <h3 className="initiative__name display">
                      {item.name}
                    </h3>
                    {item.logo && (
                      <div className="initiative__logo">
                        <img
                          src={images[item.logo].src}
                          alt={`${item.name} logo`}
                          width={images[item.logo].width}
                          height={images[item.logo].height}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                    {!item.logo && item.image && (
                      <Picture
                        name={item.image}
                        alt={item.alt ?? ''}
                        sizes="90vw"
                        className={`initiative__mobile-image ${item.core ? '' : 'initiative__mobile-image--wide'}`}
                      />
                    )}
                    <p className="initiative__text">{item.text}</p>
                    <ArrowLink href={link.href} external={link.external} className="initiative__cta">
                      {link.label}
                    </ArrowLink>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </DarkSection>
  );
}
