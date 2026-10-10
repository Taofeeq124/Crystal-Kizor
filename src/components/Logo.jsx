import images from '../content/images.json';

/**
 * The supplied Crystal Kizor logo artwork (extracted onto transparency by
 * scripts/optimize-images.mjs). `tone` picks the espresso or ivory ink.
 */
export default function Logo({ variant = 'horizontal', tone = 'ink', alt = 'Crystal Kizor', className, ...rest }) {
  const key = `logo-${variant}`;
  const { width, height } = images[key];
  return (
    <img
      src={`/images/${key}-${tone}.png`}
      width={width}
      height={height}
      alt={alt}
      className={className}
      decoding="async"
      {...rest}
    />
  );
}
