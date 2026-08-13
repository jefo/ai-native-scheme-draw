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
  import DataFlowDemo from './DataFlowDemo.svelte';
  import RateLimiterDiagram from './lib/data-flow/RateLimiterDiagram.svelte';
  import QueueDiagram from './lib/data-flow/QueueDiagram.svelte';
  import CacheAsideDiagram from './lib/data-flow/CacheAsideDiagram.svelte';
  import FailoverDiagram from './lib/data-flow/FailoverDiagram.svelte';
  import PaymentLesson from './lib/data-flow/PaymentLesson.svelte';

  // навигация по диаграммам (hash-роуты — не вбивать руками)
  const nav = [
    { page: 'payment-lesson', label: 'Урок: платёж' },
    { page: 'failover', label: 'Failover' },
    { page: 'cache-aside', label: 'Cache-aside' },
    { page: 'queue', label: 'Queue' },
    { page: 'rate-limiter', label: 'Rate limiter' },
    { page: 'data-flow', label: 'CDN' },
  ] as const;
</script>

<nav class="app-nav">
  {#each nav as item}
    <a
      href="#/{item.page}"
      class:app-nav__link--active={router.page === item.page}
      class="app-nav__link"
    >{item.label}</a>
  {/each}
</nav>

{#if router.page === 'learn-el'}
  <LearnEventLoop />
{:else if router.page === 'data-flow'}
  <DataFlowDemo />
{:else if router.page === 'rate-limiter'}
  <RateLimiterDiagram />
{:else if router.page === 'queue'}
  <QueueDiagram />
{:else if router.page === 'cache-aside'}
  <CacheAsideDiagram />
{:else if router.page === 'failover'}
  <FailoverDiagram />
{:else if router.page === 'payment-lesson'}
  <PaymentLesson />
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
