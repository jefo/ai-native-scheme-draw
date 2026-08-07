<script lang="ts">
  import { router } from './app/stores/router.svelte.ts';
  import { projectStore } from './app/stores/project.svelte.ts';
  import Dashboard from './app/pages/Dashboard.svelte';
  import Library from './app/pages/Library.svelte';
  import Project from './app/pages/Project.svelte';
  import CanvasDemo from './CanvasDemo.svelte';
</script>

{#if router.page === 'canvases'}
  <CanvasDemo />
{:else if router.page === 'library'}
  <Library />
{:else if router.page === 'project'}
  <Project />
{:else}
  <Dashboard />
{/if}
