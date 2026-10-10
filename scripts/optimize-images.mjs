/**
 * Image pipeline — run with `npm run images`.
 *
 * Reads the original supplied assets from /Images (large PNG/JPEG files,
 * ~120 MB) and writes web-ready versions to /public/images:
 *   - photographs → WebP at two widths for srcset
 *   - logos → transparent PNGs in espresso and ivory ink. The supplied
 *     logos sit on an ivory paper background; this extracts the original
 *     artwork via luminance → alpha so it works on light and dark sections
 *     without redrawing it.
 *   - favicons and an Open Graph image
 *
 * It also writes src/content/images.json (dimensions + dominant colour)
 * so every <img> can reserve its space and avoid layout shift.
 *
 * The output is committed, so the deploy never needs the originals or sharp.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'Images');
const OUT = path.join(ROOT, 'public', 'images');
const MANIFEST = path.join(ROOT, 'src', 'content', 'images.json');

const WIDTHS = [720, 1440];

const PHOTOS = {
  // Portraits of Crystal
  'portrait-studio': 'Crystal_s pictures/Architectural Studio Portrait.png',
  'portrait-editorial': 'Crystal_s pictures/Earthy Editorial Portrait by African Architecture.png',
  'portrait-desk': 'Crystal_s pictures/Poised in a Warm Design Studio.png',
  'portrait-confident': 'Crystal_s pictures/Confident Designer in Studio Workspace.png',
  'portrait-podcast': 'Crystal_s pictures/Cozy Architecture Podcast Workspace.png',

  // Built work — photographs watermarked STUDIO.COKA
  'home-front': 'Nature Home Images/25.png',
  'home-cantilever': 'Nature Home Images/Shade with Cantilevers.jpeg',
  'home-garden': 'Nature Home Images/New tree_back garden.jpeg',
  'home-lounge': 'Nature Home Images/Dividers.jpeg',
  'home-sitting': 'Nature Home Images/Family Sitting Room 2.jpeg',
  'home-stair': 'Nature Home Images/78FFAF38-4097-40FA-93AB-CE632EFB666E_1_105_c.jpeg',
  'home-facade': 'Nature Home Images/7292B8D4-723A-4F36-AA1C-51F390A3813B_1_105_c 2 2.jpeg',

  // Concept visualisations (renders)
  'earth-exterior': 'Nature Home Images 2 /1.png',
  'earth-dining': 'Nature Home Images 2 /2.jpeg',

  // Tree canopy cropped from the front-garden photograph (Alive and Free panel)
  'canopy': { file: 'Nature Home Images/Front View with Tree shade.jpeg', extract: { left: 0, top: 0, width: 440, height: 550 } },
  'earth-bedroom': 'Nature Home Images 2 /4.jpeg',
  'earth-bath': 'Nature Home Images 2 /6.jpeg',
  'cc-courtyard': 'Community Centre Project Images/IMG_2105 2.JPG',
  'cc-exterior': 'Community Centre Project Images/IMG_2102 2.PNG',
  'cc-gallery': 'Community Centre Project Images/IMG_2103 2.PNG',
};

const LOGOS = {
  'logo-horizontal': 'Logos Varitions/HORIZONTAL LOGO.png',
  'logo-primary': 'Logos Varitions/PRIMARY LOGO.png',
  'logo-monogram': 'Logos Varitions/MONOGRAM LOGO.png',
  'logo-signature': 'Logos Varitions/SIGNATURE LOGO.png',
  'logo-circle': 'Logos Varitions/SOCIAL PROFILE LOGO.png',
};

// Initiative logos, supplied with white backgrounds. Trimmed and kept as-is;
// the page blends them onto ivory with mix-blend-mode: multiply.
const INITIATIVE_LOGOS = {
  'logo-ako': 'Initiative Logos/AKO Alliance.webp',
  'logo-tea': 'Initiative Logos/TEA Architects.png',
};

async function initiativeLogo(key, rel, manifest) {
  const file = `${key}.webp`;
  const { data, info } = await sharp(path.join(SRC, rel))
    .flatten({ background: '#ffffff' })
    .trim({ background: '#ffffff', threshold: 20 })
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#ffffff' })
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toBuffer({ resolveWithObject: true });
  await fs.writeFile(path.join(OUT, file), data);
  manifest[key] = { width: info.width, height: info.height, src: `/images/${file}` };
}

const INKS = { ink: [39, 20, 7], ivory: [247, 243, 237] };

const hex = ({ r, g, b }) => '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('');

async function photo(key, spec, manifest) {
  const { file, extract } = typeof spec === 'string' ? { file: spec } : spec;
  let input = sharp(path.join(SRC, file)).rotate();
  if (extract) input = sharp(await input.extract(extract).toBuffer());
  const { width, height } = await input.metadata();
  const { dominant } = await input.clone().stats();
  const widths = WIDTHS.filter((w) => w < width).concat(width > WIDTHS.at(-1) ? [] : [width]);
  const files = [];
  for (const w of [...new Set(widths)]) {
    const file = `${key}-${w}.webp`;
    await input.clone().resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(path.join(OUT, file));
    files.push({ w, file });
  }
  manifest[key] = {
    width,
    height,
    color: hex(dominant),
    src: `/images/${files.at(-1).file}`,
    srcSet: files.map(({ w, file }) => `/images/${file} ${w}w`).join(', '),
  };
}

/** Extract the logo artwork from its paper background into an alpha mask. */
async function logoMask(rel) {
  const { data, info } = await sharp(path.join(SRC, rel))
    .removeAlpha()
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // Paper is ~240 luminance, ink ~35. Map that range to alpha with a soft
  // floor so the paper texture disappears but anti-aliased edges survive.
  const PAPER = 228, INK = 60;
  const alpha = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i++) {
    const a = (PAPER - data[i]) / (PAPER - INK);
    alpha[i] = Math.round(Math.max(0, Math.min(1, a)) * 255);
  }
  return { alpha, info };
}

async function logo(key, rel, manifest) {
  const { alpha, info } = await logoMask(rel);
  const { width, height } = info;
  // Trim to the artwork's bounding box so layout spacing is controlled in CSS.
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (alpha[y * width + x] > 24) {
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
  const pad = 2;
  const box = {
    left: Math.max(0, minX - pad),
    top: Math.max(0, minY - pad),
    width: Math.min(width, maxX + pad) - Math.max(0, minX - pad) + 1,
    height: Math.min(height, maxY + pad) - Math.max(0, minY - pad) + 1,
  };
  for (const [ink, [r, g, b]] of Object.entries(INKS)) {
    const rgba = Buffer.alloc(width * height * 4);
    for (let i = 0; i < alpha.length; i++) {
      rgba[i * 4] = r; rgba[i * 4 + 1] = g; rgba[i * 4 + 2] = b; rgba[i * 4 + 3] = alpha[i];
    }
    await sharp(rgba, { raw: { width, height, channels: 4 } })
      .extract(box)
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(OUT, `${key}-${ink}.png`));
  }
  manifest[key] = { width: box.width, height: box.height };
}

async function icons() {
  const pub = path.join(ROOT, 'public');
  const mono = path.join(OUT, 'logo-monogram-ink.png');
  const tile = async (size, pad, file) => {
    const mark = await sharp(mono)
      .resize(size - pad * 2, size - pad * 2, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: '#F7F3ED' } })
      .composite([{ input: mark, gravity: 'centre' }])
      .png()
      .toFile(path.join(pub, file));
  };
  await tile(32, 2, 'favicon-32.png');
  await tile(180, 26, 'apple-touch-icon.png');
  await tile(512, 72, 'icon-512.png');

  // Open Graph card: portrait on the right, primary logo on ivory at left.
  const portrait = await sharp(path.join(SRC, PHOTOS['portrait-studio']))
    .resize(460, 630, { fit: 'cover', position: 'top' })
    .toBuffer();
  const wordmark = await sharp(path.join(OUT, 'logo-primary-ink.png')).resize({ width: 560 }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#F7F3ED' } })
    .composite([
      { input: wordmark, left: 90, top: 190 },
      { input: portrait, left: 740, top: 0 },
    ])
    .jpeg({ quality: 82 })
    .toFile(path.join(pub, 'og-image.jpg'));
}

await fs.rm(OUT, { recursive: true, force: true });
await fs.mkdir(OUT, { recursive: true });
const manifest = {};
for (const [k, rel] of Object.entries(PHOTOS)) await photo(k, rel, manifest);
for (const [k, rel] of Object.entries(LOGOS)) await logo(k, rel, manifest);
for (const [k, rel] of Object.entries(INITIATIVE_LOGOS)) await initiativeLogo(k, rel, manifest);
await icons();
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${Object.keys(manifest).length} assets to public/images`);
