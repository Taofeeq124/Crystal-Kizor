import Picture from '../components/Picture.jsx';
import ScrollText from '../components/ScrollText.jsx';
import { Eyebrow, MaskImage, Reveal } from '../components/motion.jsx';
import { philosophy } from '../content/site.js';
import './Philosophy.css';

export default function Philosophy() {
  return (
    <section id="philosophy" className="philosophy" aria-labelledby="philosophy-title">
      <div className="wrap">
        <Eyebrow as="h2" id="philosophy-title" index="01">
          Point of view
        </Eyebrow>

        <ScrollText
          text={philosophy.statement}
          emphasis={['climate', 'culture', 'people']}
          className="display philosophy__statement"
        />

        <div className="philosophy__grid">
          <div className="philosophy__media">
            <MaskImage className="philosophy__portrait" parallax>
              <Picture
                name="portrait-editorial"
                alt="Crystal Kizor seated in a timber armchair beside books on African architecture"
                sizes="(min-width: 960px) 40vw, 90vw"
              />
            </MaskImage>
            <MaskImage className="philosophy__inset" delay={0.2}>
              <Picture
                name="home-garden"
                alt="A newly planted tree in the paved garden of a home by Studio COKA"
                sizes="(min-width: 960px) 18vw, 45vw"
              />
            </MaskImage>
          </div>

          <div className="philosophy__text">
            {philosophy.body.map((para, i) => (
              <Reveal as="p" key={i} delay={i * 0.08} className={i === 0 ? 'philosophy__lead' : undefined}>
                {para}
              </Reveal>
            ))}

            <ol className="principles">
              {philosophy.principles.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.08} className="principle">
                  <span className="principle__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="principle__title display">{p.title}</h3>
                  <p className="principle__text">{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
