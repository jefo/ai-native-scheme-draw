import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// Монорепо: резолвим kit напрямую из исходников (libs/src/lib),
// а не из собранного пакета (dist в .gitignore, его нет в чистом клоне).
const kitSrc = fileURLToPath(new URL('../../libs/src/lib', import.meta.url));

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  resolve: {
    alias: [
      { find: 'sysdiag-ui-kit/styles/tokens.css', replacement: kitSrc + '/styles/tokens.css' },
      { find: 'sysdiag-ui-kit', replacement: kitSrc + '/index.ts' },
    ],
  },
  server: {
    port: 5175,
    strictPort: true,
  },
});
