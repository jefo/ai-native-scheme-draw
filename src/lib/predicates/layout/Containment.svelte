<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Containment — вложенность A inside B.
   *  Layout predicate (information design): содержимое внутри контейнера-сущности. */
  let { label = 'Container', children }: { label?: string; children?: Snippet } = $props();
</script>

<div class="containment" title="Containment: {label}">
  <span class="containment__label">{label}</span>
  <div class="containment__inner">
    {@render children?.()}
  </div>
</div>

<style>
  .containment {
    display: inline-block;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    padding: 20px 14px 14px;
    position: relative;
    background: var(--vnp-card);
    transition: border-color 0.2s ease;
  }
  .containment:hover {
    border-color: var(--vnp-zone-layout-border);
  }
  .containment__label {
    position: absolute;
    top: -9px;
    left: 12px;
    background: var(--vnp-paper);
    padding: 0 6px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--vnp-ink-soft);
    letter-spacing: 0.04em;
  }
  .containment__inner {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    padding: 4px;
  }
</style>
