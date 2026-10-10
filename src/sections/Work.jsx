import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Picture from '../components/Picture.jsx';
import { Eyebrow, MaskImage, Reveal, RevealLines, EASE } from '../components/motion.jsx';
import { work } from '../content/site.js';
import './Work.css';

function Figure({ image, index, className = '', sizes, parallax = false, alt }) {
  return (
    <figure className={`work-figure ${className}`}>
      <MaskImage className="work-figure__frame" parallax={parallax} strength={5}>
        <Picture name={image.key} alt={alt ?? image.caption} sizes={sizes} />
      </MaskImage>
      <figcaption>
        <span className="work-figure__num" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        {image.caption}
      </figcaption>
    </figure>
  );
}

function Built() {
  const { built } = work;
  const sizes = ['(min-width: 960px) 46vw, 100vw', '(min-width: 960px) 30vw, 50vw', '(min-width: 960px) 26vw, 50vw', '(min-width: 960px) 22vw, 50vw', '(min-width: 960px) 26vw, 50vw'];
  return (
    <div className="built">
      <div className="built__grid">
        {built.images.map((image, i) => (
          <Figure
            key={image.key}
            image={image}
            index={i}
            sizes={sizes[i]}
            parallax={i === 0}
            className={`built__fig built__fig--${i + 1}`}
          />
        ))}

        <div className="built__text">
          <p className="label work-kicker">{built.label}</p>
          <h3 className="display built__title">{built.title}</h3>
          <p className="built__credit label">{built.credit}</p>
          <Reveal as="p">{built.text}</Reveal>
        </div>
      </div>
    </div>
  );
}

function Concepts() {
  const { concepts } = work;
  const [selected, setSelected] = useState(0);
  const tabs = useRef([]);
  const reduce = useReducedMotion();
  const project = concepts.projects[selected];

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern).
  const onKeyDown = (e) => {
    const n = concepts.projects.length;
    const next = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (selected + next + n) % n;
    setSelected(i);
    tabs.current[i]?.focus();
  };

  return (
    <div className="concepts">
      <div className="concepts__head">
        <p className="label work-kicker">{concepts.label}</p>
        <h3 className="display concepts__title">{concepts.title}</h3>
        <p className="concepts__text">{concepts.text}</p>
        <div className="concepts__tabs" role="tablist" aria-label="Concept studies" onKeyDown={onKeyDown}>
          {concepts.projects.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`tab-${p.id}`}
              aria-selected={i === selected}
              aria-controls={`panel-${p.id}`}
              tabIndex={i === selected ? 0 : -1}
              className="concepts__tab"
              onClick={() => setSelected(i)}
            >
              <span className="concepts__tab-num" aria-hidden="true">
                0{i + 1}
              </span>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.id}
          id={`panel-${project.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${project.id}`}
          className="concepts__panel"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <figure className="concepts__main">
            <MaskImage className="concepts__main-frame">
              <Picture name={project.images[0].key} alt={project.images[0].caption} sizes="(min-width: 960px) 50vw, 100vw" />
            </MaskImage>
            <figcaption>{project.images[0].caption} — concept visualisation</figcaption>
          </figure>
          <div className="concepts__aside">
            <p className="label concepts__type">{project.type}</p>
            <h4 className="display concepts__name">{project.name}</h4>
            <p>{project.text}</p>
            <div className="concepts__pair">
              {project.images.slice(1).map((image, i) => (
                <figure key={image.key}>
                  <MaskImage className="concepts__pair-frame" delay={0.1 + i * 0.1}>
                    <Picture name={image.key} alt={image.caption} sizes="(min-width: 960px) 20vw, 50vw" />
                  </MaskImage>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="work__head">
          <Eyebrow index="03">Selected work</Eyebrow>
          <RevealLines
            id="work-title"
            className="display work__title"
            lines={['Work in the world,', <em key="e">and work in progress.</em>]}
          />
        </header>
        <Built />
        <Concepts />
      </div>
    </section>
  );
}
