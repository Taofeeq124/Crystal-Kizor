# Crystal Kizor — Personal Brand Website

A single-page personal brand site for Crystal Kizor: architect, interior designer, speaker and Lead Principal of Studio COKA.

**Stack:** React 19 · JavaScript · Vite · Motion (for React) · Lucide icons · self-hosted fonts (Fontsource) · Netlify

---

## Run locally

Requires Node 20.19+ or 22.12+ (Vite 8 requirement).

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build → dist/
npm run preview    # serve the production build locally (http://localhost:4173)
```

`npm run images` regenerates the optimised images (see [Images](#images)). You only need it when the source photographs change.

## Deploy to Netlify

The repo includes `netlify.toml`, which sets the build command (`npm run build`), the publish folder (`dist`), the Node version, cache headers and an SPA fallback.

**Option A: Git-based (recommended)**
1. Push the project to GitHub, GitLab or Bitbucket.
2. In Netlify: **Add new site → Import an existing project**, then pick the repo.
3. Netlify reads `netlify.toml`, so the build settings need no changes. Click **Deploy**.

**Option B: Drag and drop**
1. Run `npm run build`.
2. Drag the `dist/` folder onto https://app.netlify.com/drop.
   - Note: the Open Graph image URL is set at build time from Netlify's `URL` variable. With drag and drop, build with `SITE_URL=https://your-domain.com npm run build` so social previews resolve.

**Option C: CLI**

```bash
npx netlify-cli deploy --build --prod
```

### Environment variables

None are required.

| Variable   | Required | Purpose |
|------------|----------|---------|
| `SITE_URL` | No       | Absolute site URL for Open Graph tags. On Netlify, the built-in `URL` variable is used automatically, so set this only for a custom domain or a non-Netlify build. |

## Project structure

```
├── index.html               # document shell: title, meta description, Open Graph, favicons
├── netlify.toml             # build, SPA fallback, cache + security headers
├── vite.config.js           # React plugin + injects the absolute site URL into index.html
├── scripts/
│   └── optimize-images.mjs  # source photos/logos → WebP, transparent logos, favicons, OG card
├── public/
│   ├── images/              # generated output, committed (do not edit by hand)
│   ├── media/               # TEDx video poster (self-hosted)
│   └── favicon-32.png, apple-touch-icon.png, icon-512.png, og-image.jpg, robots.txt
└── src/
    ├── main.jsx             # entry: fonts + global styles
    ├── App.jsx              # page composition + MotionConfig (reduced motion)
    ├── content/
    │   ├── site.js          # ALL copy, links and initiative data, edited here
    │   └── images.json      # generated: dimensions, srcset, placeholder colour per image
    ├── lib/links.js         # link helpers (fallback for unverified initiative URLs)
    ├── components/
    │   ├── Header.jsx/.css  # sticky header, active-section nav, accessible mobile menu
    │   ├── motion.jsx       # Reveal, RevealLines, MaskImage, Eyebrow (all animation primitives)
    │   ├── ScrollText.jsx   # scroll-linked statement in the philosophy section
    │   ├── DarkSection.jsx  # light → dark panel transition
    │   ├── Picture.jsx      # responsive <img> from the manifest (no layout shift)
    │   ├── Logo.jsx         # supplied logo artwork in espresso or ivory
    │   ├── ArrowLink.jsx/.css
    │   └── VideoFacade.jsx/.css  # click-to-load YouTube embed
    ├── sections/            # Hero, Philosophy, Ecosystem, Work, Talks, Contact, Footer (+ CSS each)
    └── styles/
        ├── tokens.css       # colour, type, spacing and motion tokens (CSS variables)
        └── base.css         # reset, type primitives, shared layout helpers
```

## Editing content

Copy, URLs and initiative data all live in **`src/content/site.js`**, so you don't need to touch any layout code to change them.

- **Initiative links:** set `url` on an item in `ecosystem`. While it's `null`, the call to action becomes an honest "Ask about …" link to the enquiry channel instead of a dead link.
- **Enquiry email:** set `contactEmail`. Every enquiry CTA then switches from LinkedIn to `mailto:` automatically.

## Images

The original assets (≈120 MB of PNG/JPEG) live in `/Images` and are git-ignored. `npm run images` turns them into:

- WebP at 720 px and full width (max 1440 px) for `srcset`, ≈4 MB in total.
- **Transparent logos.** The supplied logos sit on an ivory paper background. The script turns the original artwork's luminance into alpha (no redrawing), so the same marks work on light and dark sections.
- Favicons from the monogram, and a 1200×630 Open Graph card.
- `src/content/images.json`, which stores the width, height and dominant colour of every image, so the page reserves space before images load.

The generated output is committed, so Netlify never needs the originals or `sharp`.

---

## Content still needed

These items are needed before launch. None of them were invented on the site.

| Item | Where to set it | Current behaviour |
|------|-----------------|-------------------|
| Studio COKA URL | `ecosystem[studio-coka].url` | "Ask about Studio COKA" → LinkedIn |
| ELEvated URL + product photography | `ecosystem[elevated].url` / `.image` | Enquiry fallback; panel uses the earth-and-timber dining **concept render** as a stand-in |
| Alive and Free URL | `ecosystem[alive-and-free].url` | Enquiry fallback; panel uses a tree-canopy crop from the supplied front-garden photo |
| Enquiry email | `contactEmail` | Enquiries go to LinkedIn |
| ELEvated / Studio COKA / Alive and Free logos | add a `logo` key (see AKO and TEA) | Photography shown instead |

Supplied and live: **AKO Alliance** (https://akoalliance.com/) and **TEA Architects** (https://tea-architects.co.uk/), both with logos.
| Project name / location of the photographed home | `work.built` | Described generically as "a completed residence by Studio COKA" |
| Status / authorship of the rendered concepts | `work.concepts` | Labelled "Concept visualisation" |

### Facts to confirm

- **Off-grid hospital.** The copy says her path "runs through Nigeria's first fully off-grid hospital", which follows the brief's wording. Her specific role isn't stated because it couldn't be verified publicly.
- **Reuters Connect item.** The headline shown comes from the URL slug ("A Nigerian eye hospital redefines climate-smart design"). The page returned 403 to automated checks, and Reuters Connect may require a login. The site doesn't claim this report names Crystal.
- **TEDx talk.** The title, event (TEDxPortHarcourt) and channel (TEDx Talks) were confirmed through YouTube's oEmbed API, which also reports the video as embeddable. The one-sentence introduction is framed as the question the title poses. Check that it matches the talk.
- **TEA.** The brief described TEA as "The Effective Architect", an education platform. The supplied URL and logo are for **TEA Architects**, a RIBA Chartered practice in Bath, and the site doesn't mention Crystal. The page now uses the name and description from that website and groups TEA under "Build". Confirm Crystal's relationship to it.
- **AKO Alliance.** The description follows akoalliance.com, which doesn't mention Crystal by name.
- **Photographs.** The "Nature Home Images" photographs carry the STUDIO.COKA watermark and are presented as Studio COKA's built work. The "Nature Home Images 2" and "Community Centre" images are renders and are labelled as concepts.

## Key technical decisions

- **React + Vite, no router.** It's one page, so anchor links do the navigation. A router would add weight without solving anything.
- **Content separated from layout.** `site.js` is the single source of truth, and components only render it.
- **One animation library.** Motion handles enter reveals (`whileInView`), scroll-linked effects (`useScroll`/`useTransform`) and exit animations (`AnimatePresence`). Simple hover states are plain CSS transitions.
- **Reveals that can't strand content.**
  - Text and images are always in the DOM. Only opacity, transform and clip-path animate.
  - The viewport margin treats anything above the screen as already seen, so anchor jumps never leave hidden content behind.
- **Reduced motion.** `<MotionConfig reducedMotion="user">` plus `useReducedMotion()` in the scroll-linked effects. CSS animations are disabled under `prefers-reduced-motion`.
- **No scroll hijacking.** Scroll-linked effects read the native scroll position and never control it.
- **Performance.**
  - Responsive WebP with explicit dimensions, and only the hero image preloaded.
  - Below-the-fold images lazy-load.
  - Fonts are self-hosted: two families and five faces.
  - The YouTube player (≈1 MB) loads only when the visitor presses play, from the privacy-enhanced `youtube-nocookie.com` domain.
- **Accessibility.**
  - Semantic landmarks, a skip link and one `<h1>`.
  - Visible focus styles and `aria-current` on the active nav item.
  - Mobile menu: focus moves into it and is trapped there, Escape closes it, and focus returns to the toggle.
  - Ecosystem panel: the sticky visual is decorative (`aria-hidden`), and all its content is in the list.
  - The concept tabs follow the ARIA tabs pattern, with arrow-key support.
  - External links open in a new tab with `rel="noopener noreferrer"` and a screen-reader hint.
