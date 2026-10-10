import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Open Graph images need an absolute URL. Netlify exposes the site's primary
// URL as `URL` during builds; SITE_URL can override it (e.g. a custom domain).
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'site-url',
      transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
    },
  ],
});
