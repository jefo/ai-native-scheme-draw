<script lang="ts">
  // Demo shell: hash-based page switch — #gallery (component
  // inventory), #storyboard (Router vs Controller) and
  // #lakehouse (fullscreen horizontal storyboard).
  import Gallery from './Gallery.svelte';
  import Storyboard from './Storyboard.svelte';
  import Lakehouse from './Lakehouse.svelte';

  type Page = 'gallery' | 'storyboard' | 'lakehouse';

  function pageFromHash(): Page {
    if (location.hash === '#storyboard') return 'storyboard';
    if (location.hash === '#lakehouse') return 'lakehouse';
    return 'gallery';
  }

  let page = $state<Page>(pageFromHash());

  $effect(() => {
    const onHash = () => (page = pageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  });
</script>

{#if page === 'lakehouse'}
  <!-- fullscreen deck: no shell nav, scenes own the viewport -->
  <Lakehouse />
{:else}
  <div class="shell">
    <nav class="shell-nav">
      <a href="#gallery" class="brand">SysDiag UI Kit</a>
      <div class="links">
        <a href="#gallery" class:active={page === 'gallery'}>Галерея</a>
        <a href="#storyboard" class:active={page === 'storyboard'}>Раскадровка · Router vs Controller</a>
        <a href="#lakehouse">Раскадровка · Lakehouse</a>
      </div>
    </nav>

    {#if page === 'gallery'}
      <Gallery />
    {:else}
      <Storyboard />
    {/if}
  </div>
{/if}

<style>
  .shell-nav {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 24px;
    height: 52px;
    padding: 0 32px;
    background: var(--bbg-surface);
    border-bottom: 1px solid var(--bbg-border);
  }

  .shell-nav .brand {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
    text-decoration: none;
    white-space: nowrap;
  }

  .shell-nav .links {
    display: flex;
    gap: 4px;
    margin-left: auto;
  }

  .shell-nav a:not(.brand) {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: var(--bbg-radius-sm);
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .shell-nav a:not(.brand):hover {
    color: var(--bbg-ink);
    background: rgba(255, 255, 255, 0.05);
  }

  .shell-nav a:not(.brand).active {
    color: var(--bbg-amber);
    background: var(--bbg-amber-dim);
    border-color: var(--bbg-amber-border);
  }

  @media (max-width: 860px) {
    .shell-nav {
      flex-wrap: wrap;
      height: auto;
      min-height: 52px;
      padding: 8px 16px;
      row-gap: 4px;
    }

    .links {
      flex-wrap: wrap;
      margin-left: 0;
      width: 100%;
    }
  }
</style>
