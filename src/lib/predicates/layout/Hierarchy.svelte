<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Hierarchy — дерево: корень → уровень → листья.
   *  Layout predicate (information design): иерархическая структура содержимого. */
  let { root = 'Root', children }: { root?: string; children?: Snippet } = $props();
</script>

<div class="hierarchy">
  <span class="hierarchy__root">{root}</span>
  <svg class="hierarchy__branch" viewBox="0 0 20 14" width="20" height="14" aria-hidden="true">
    <line x1="10" y1="0" x2="10" y2="10" stroke="var(--vnp-ink)" stroke-width="2" />
    <line x1="2" y1="10" x2="18" y2="10" stroke="var(--vnp-ink)" stroke-width="2" />
    <line x1="4" y1="10" x2="4" y2="14" stroke="var(--vnp-ink)" stroke-width="2" />
    <line x1="10" y1="10" x2="10" y2="14" stroke="var(--vnp-ink)" stroke-width="2" />
    <line x1="16" y1="10" x2="16" y2="14" stroke="var(--vnp-ink)" stroke-width="2" />
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
    padding: 10px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
  }
  .hierarchy__root {
    font-weight: 800;
    font-size: 14px;
  }
  .hierarchy__leaves {
    display: inline-flex;
    gap: 12px;
    align-items: flex-start;
  }
</style>
