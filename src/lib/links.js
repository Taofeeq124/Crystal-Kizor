import { ecosystem, enquiry } from '../content/site.js';

export const isExternal = (href) => /^https?:\/\//.test(href);

/**
 * Resolve an initiative's call to action. Initiatives without a verified URL
 * fall back to an enquiry rather than a dead or invented link.
 */
export function initiativeLink(item) {
  if (item.url) {
    return { href: item.url, label: item.cta, external: isExternal(item.url) };
  }
  return {
    href: enquiry.href,
    label: `Ask about ${item.short ?? item.name}`,
    external: enquiry.external,
  };
}

export const initiativeById = (id) => ecosystem.find((item) => item.id === id);
