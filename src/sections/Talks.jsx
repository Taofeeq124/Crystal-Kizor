import { ArrowUpRight } from 'lucide-react';
import DarkSection from '../components/DarkSection.jsx';
import ArrowLink from '../components/ArrowLink.jsx';
import VideoFacade from '../components/VideoFacade.jsx';
import { Eyebrow, Reveal, RevealLines } from '../components/motion.jsx';
import { media, talks, enquiry } from '../content/site.js';
import './Talks.css';

export default function Talks() {
  const { tedx } = media;
  return (
    <DarkSection id="talks" className="talks" aria-labelledby="talks-title">
      <div className="wrap">
        <header className="talks__head">
          <Eyebrow index="04">Talks &amp; media</Eyebrow>
          <p className="talks__event label">{tedx.event}</p>
          <RevealLines
            id="talks-title"
            className="display talks__title"
            lines={['Indigenous architecture', <em key="e">and identity</em>]}
          />
          <Reveal as="p" className="talks__intro" delay={0.15}>
            {talks.intro}
          </Reveal>
        </header>

        <Reveal className="talks__video">
          <VideoFacade
            id={tedx.id}
            title={`${tedx.title} | Crystal Kizor | ${tedx.event}`}
            poster="/media/tedx-poster.webp"
          />
          <div className="talks__video-meta">
            <span className="label">Crystal Kizor · {tedx.event}</span>
            <ArrowLink href={tedx.url}>Watch on YouTube</ArrowLink>
          </div>
        </Reveal>

        <div className="talks__grid">
          <Reveal className="speaking">
            <h3 className="display speaking__title">Invite Crystal to speak</h3>
            <p>
              Keynotes, panels, lectures and workshops on the built environment — what we build, who it serves
              and what it says about us.
            </p>
            <ul className="speaking__topics" aria-label="Speaking topics">
              {talks.topics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <ArrowLink href={enquiry.href} external={enquiry.external} variant="outline">
              Send a speaking enquiry
            </ArrowLink>
          </Reveal>

          <div className="channels">
            <h3 className="label channels__title">Read, watch, follow</h3>
            <ul>
              {talks.channels.map((c, i) => (
                <Reveal as="li" key={c.source} delay={i * 0.06}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="channel">
                    <span className="channel__source label">{c.source}</span>
                    <span className="channel__title display">{c.title}</span>
                    <span className="channel__action">
                      {c.action}
                      <ArrowUpRight size={16} strokeWidth={1.25} aria-hidden="true" />
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DarkSection>
  );
}
