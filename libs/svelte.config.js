import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  // `svelte-package` (npm run build) packages everything under
  // src/lib/ to dist/ — no `package` key needed in v2+.
};
