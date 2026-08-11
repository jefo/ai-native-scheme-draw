import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Dev server hosts the demo gallery. The library itself is published
// with `svelte-package` (npm run build), not by this config.
export default defineConfig({
  plugins: [svelte()],
  server: {
    port: 5174,
    strictPort: true,
  },
});
