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
    border: 2px solid var(--vnp-ink);
    border-radius: var(--vnp-radius);
    padding: 22px 14px 14px;
    position: relative;
    background: var(--vnp-card);
    box-shadow: var(--vnp-shadow);
  }
  .containment__label {
    position: absolute;
    top: -10px;
    left: 12px;
    background: var(--vnp-paper);
    padding: 0 6px;
    font-size: 12px;
    font-weight: 700;
  }
  .containment__inner {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    padding: 4px;
  }
</style>
