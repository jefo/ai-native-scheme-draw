<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Timeline — ось времени Now → Future.
   *  Layout predicate (information design): временная последовательность содержимого. */
  let { children }: { children?: Snippet } = $props();
</script>

<div class="timeline">
  <div class="timeline__track">
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <circle cx="5" cy="5" r="3.5" fill="var(--vnp-good)" />
    </svg>
    <span class="timeline__line"></span>
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <circle cx="5" cy="5" r="3.5" fill="none" stroke="var(--vnp-ink-soft)" stroke-width="1.5" />
    </svg>
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
    padding: 12px;
    border: var(--vnp-border-soft);
    border-radius: var(--vnp-radius);
    min-width: 180px;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .timeline:hover {
    background: var(--vnp-card);
    border-color: var(--vnp-border-color-active);
  }
  .timeline__track {
    display: flex;
    align-items: center;
    gap: 0;
  }
  .timeline__line {
    flex: 1;
    height: 1px;
    background: var(--vnp-border-color-active);
  }
  .timeline__labels {
    display: flex;
    justify-content: space-between;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-soft);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .timeline__content {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
</style>
