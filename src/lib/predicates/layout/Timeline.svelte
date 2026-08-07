<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Timeline — ось времени Now → Future.
   *  Layout predicate (information design): временная последовательность содержимого. */
  let { children }: { children?: Snippet } = $props();
</script>

<div class="timeline">
  <div class="timeline__track">
    <span class="timeline__marker">◉</span>
    <span class="timeline__line"></span>
    <span class="timeline__marker">◎</span>
  </div>
  <div class="timeline__labels">
    <span class="timeline__now">Now</span>
    <span class="timeline__future">Future</span>
  </div>
  <div class="timeline__content">
    {@render children?.()}
  </div>
</div>

<style>
  .timeline {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    padding: 10px 12px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
    min-width: 180px;
  }
  .timeline__track {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .timeline__line {
    flex: 1;
    height: 2.5px;
    background: var(--vnp-ink);
  }
  .timeline__marker {
    font-size: 12px;
    line-height: 1;
  }
  .timeline__labels {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--vnp-ink-soft);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .timeline__content {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
