import images from '../content/images.json';

/**
 * Responsive image from the generated manifest. Width/height are always set
 * so the browser reserves space (no layout shift); the dominant colour shows
 * while the file loads.
 */
export default function Picture({ name, alt, sizes = '100vw', priority = false, className, style, ...rest }) {
  const img = images[name];
  if (!img) throw new Error(`Unknown image "${name}"`);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={{ backgroundColor: img.color, ...style }}
      {...rest}
    />
  );
}
