import { useState } from 'react';
import { Play } from 'lucide-react';
import './VideoFacade.css';

/**
 * Lightweight YouTube embed: shows a self-hosted poster and only loads the
 * player (≈1 MB of third-party script) when the visitor chooses to play.
 * Uses the privacy-enhanced youtube-nocookie domain.
 */
export default function VideoFacade({ id, title, poster }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video__poster" onClick={() => setPlaying(true)}>
          <img src={poster} alt="" width="1280" height="720" loading="lazy" decoding="async" />
          <span className="video__play" aria-hidden="true">
            <Play size={22} strokeWidth={1.25} />
          </span>
          <span className="video__label label">Play the talk</span>
          <span className="visually-hidden">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
