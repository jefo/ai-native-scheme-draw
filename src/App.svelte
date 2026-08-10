<script lang="ts">
  import { router } from './app/stores/router.svelte.ts';
  import { projectStore } from './app/stores/project.svelte.ts';
  import Dashboard from './app/pages/Dashboard.svelte';
  import Library from './app/pages/Library.svelte';
  import Project from './app/pages/Project.svelte';
  import CanvasDemo from './CanvasDemo.svelte';
  import RunwayDemo from './RunwayDemo.svelte';
  import IDPipelineDemo from './IDPipelineDemo.svelte';
  import EventLoopDemo from './EventLoopDemo.svelte';
  import RepMatrixDemo from './RepMatrixDemo.svelte';
  import EventLoopStoryboard from './EventLoopStoryboard.svelte';
  import LearnEventLoop from './LearnEventLoop.svelte';
</script>

{#if router.page === 'learn-el'}
  <LearnEventLoop />
{:else if router.page === 'el-storyboard'}
  <EventLoopStoryboard />
{:else if router.page === 'rep-matrix'}
  <RepMatrixDemo />
{:else if router.page === 'event-loop'}
  <EventLoopDemo />
{:else if router.page === 'id-pipeline'}
  <IDPipelineDemo />
{:else if router.page === 'runway'}
  <RunwayDemo />
{:else if router.page === 'canvases'}
  <CanvasDemo />
{:else if router.page === 'library'}
  <Library />
{:else if router.page === 'project'}
  <Project />
{:else}
  <Dashboard />
{/if}
