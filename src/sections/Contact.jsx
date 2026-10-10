import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Logo from '../components/Logo.jsx';
import Picture from '../components/Picture.jsx';
import { Eyebrow, MaskImage, Reveal, RevealLines } from '../components/motion.jsx';
import { enquiry, pathways } from '../content/site.js';
import { initiativeById, initiativeLink, isExternal } from '../lib/links.js';
import './Contact.css';

/** Turn a pathway definition into a concrete link + destination label. */
function resolve(path) {
  if (path.href) return { href: path.href, destination: path.label, external: isExternal(path.href) };
  if (path.to === 'enquiry') return { href: enquiry.href, destination: path.label, external: enquiry.external };
  const item = initiativeById(path.to);
  const link = initiativeLink(item);
  return {
    href: link.href,
    destination: item.url ? item.name : `${item.short ?? item.name} · enquire`,
    external: link.external,
  };
}

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap contact__grid">
        <div className="contact__intro">
          <Eyebrow index="05">Begin</Eyebrow>
          <RevealLines
            id="contact-title"
            className="display contact__title"
            lines={['Where would', 'you like to', <em key="e">begin?</em>]}
          />
          <Reveal as="p" className="contact__lede" delay={0.15}>
            Choose the route that fits what you have in mind — a building, a collaboration, a classroom or a
            conversation.
          </Reveal>
          <MaskImage className="contact__portrait" delay={0.1}>
            <Picture
              name="portrait-desk"
              alt="Crystal Kizor at her desk among material samples, resting her chin on her hand"
              sizes="(min-width: 960px) 30vw, 90vw"
            />
          </MaskImage>
        </div>

        <div className="contact__routes">
          <ol className="pathways">
            {pathways.map((path, i) => {
              const { href, destination, external } = resolve(path);
              const Icon = external ? ArrowUpRight : ArrowRight;
              return (
                <Reveal as="li" key={path.intent} delay={i * 0.04}>
                  <a
                    href={href}
                    className="pathway"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className="pathway__num" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="pathway__intent display">{path.intent}</span>
                    <span className="pathway__dest label">
                      {destination}
                      <Icon size={16} strokeWidth={1.25} aria-hidden="true" />
                    </span>
                    {external && <span className="visually-hidden"> (opens in a new tab)</span>}
                  </a>
                </Reveal>
              );
            })}
          </ol>

          <Reveal className="signoff">
            <Logo variant="signature" alt="Crystal Kizor signature" className="signoff__signature" />
            <p>
              For all other enquiries,{' '}
              <a
                href={enquiry.href}
                className="signoff__link"
                {...(enquiry.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {enquiry.external ? 'send Crystal a message on LinkedIn' : enquiry.label}
                {enquiry.external && <span className="visually-hidden"> (opens in a new tab)</span>}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
