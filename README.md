# Crystal Kizor — Personal Brand Website

A responsive, single-page personal website showcasing Crystal Kizor's work, ideas, and initiatives.

**Built with:** React 19, JavaScript, Vite, Motion for React, CSS, and Lucide icons.

## Getting Started

**Requirements:** Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

```bash
npm run build
npm run preview
```

The production build is generated in `dist/`.

## Deployment

The project is configured for [Netlify](https://www.netlify.com/) using `netlify.toml`.

1. Push the source code to GitHub.
2. Import the repository into Netlify.
3. Deploy using the existing configuration.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

## Project Structure

```text
├── public/              # Images, icons and static assets
├── scripts/             # Image optimization script
├── src/
│   ├── components/      # Reusable UI components
│   ├── sections/        # Website sections
│   ├── content/
│   │   ├── site.js      # Website content and links
│   │   └── images.json  # Generated image manifest
│   ├── styles/          # Global styles and design tokens
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── netlify.toml
├── vite.config.js
└── package.json
```

## Updating Content

Edit `src/content/site.js` to update website copy, initiative information, and links.

Unconfirmed initiative destinations and contact details use an enquiry fallback rather than fabricated URLs.

## Images

Optimized images are included in the repository, so the original source photographs are not required for deployment.

To regenerate optimized images after changing the source assets, run:

```bash
npm run images
```

## Technical Highlights

- Responsive layouts for desktop, tablet, and mobile.
- Motion effects with reduced-motion support.
- Optimized WebP images and lazy loading.
- Accessible navigation and interactive components.
- SEO metadata and social-sharing previews.
- Deferred YouTube loading for improved performance.
- Netlify configuration for production builds and security headers.

## Content Verification

Some project details, initiative relationships, and contact destinations require confirmation. Concept imagery is identified as such, and unverified claims are not presented as established facts.
