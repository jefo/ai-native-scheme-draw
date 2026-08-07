<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Hierarchy — дерево: корень → уровень → листья.
   *  Layout predicate (information design): иерархическая структура содержимого. */
  let { root = 'Root', children }: { root?: string; children?: Snippet } = $props();
</script>

<div class="hierarchy">
  <span class="hierarchy__root">{root}</span>
  <svg class="hierarchy__branch" viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
    <line x1="10" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1.5" />
    <line x1="2" y1="10" x2="18" y2="10" stroke="currentColor" stroke-width="1.5" />
    <line x1="4" y1="10" x2="4" y2="14" stroke="currentColor" stroke-width="1.5" />
    <line x1="10" y1="10" x2="10" y2="14" stroke="currentColor" stroke-width="1.5" />
    <line x1="16" y1="10" x2="16" y2="14" stroke="currentColor" stroke-width="1.5" />
  </svg>
  <div class="hierarchy__leaves">
    {@render children?.()}
  </div>
</div>

<style>
  .hierarchy {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    padding: 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    color: var(--vnp-ink-soft);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .hierarchy:hover {
    background:
      linear-gradient(var(--vnp-zone-layout), var(--vnp-zone-layout)),
      var(--vnp-card);
    border-color: var(--vnp-zone-layout-border);
  }
  .hierarchy__root {
    font-family: var(--vnp-font-mono);
    font-weight: 600;
    font-size: 12px;
    color: var(--vnp-ink);
    letter-spacing: 0.02em;
  }
  .hierarchy__leaves {
    display: inline-flex;
    gap: 12px;
    align-items: flex-start;
  }
</style>
