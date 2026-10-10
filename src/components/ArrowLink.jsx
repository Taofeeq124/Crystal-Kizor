import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { isExternal } from '../lib/links.js';
import './ArrowLink.css';

/**
 * The single link/button style used across the site.
 * External links open in a new tab with safe rel attributes and an
 * accessible hint; internal anchors use a horizontal arrow.
 */
export default function ArrowLink({ href, children, variant = 'text', className = '', external, ...rest }) {
  const ext = external ?? isExternal(href);
  const Icon = ext ? ArrowUpRight : ArrowRight;
  return (
    <a
      href={href}
      className={`arrow-link arrow-link--${variant} ${className}`}
      {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span className="arrow-link__text">{children}</span>
      <Icon className="arrow-link__icon" size={16} strokeWidth={1.25} aria-hidden="true" />
      {ext && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}
