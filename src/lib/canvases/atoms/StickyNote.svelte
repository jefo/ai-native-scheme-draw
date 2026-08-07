<script lang="ts">
  import type { Snippet } from 'svelte';

  /** StickyNote — атом канвасов: цветной стикер как в Miro.
   *  Цвета: yellow (Jobs), pink (Pains/Pain Relievers), green (Gains/Gain Creators), blue (Products).
   *  Dual API: `label` для быстрого текста, `children` Snippet для полного контроля. */
  let {
    color = 'yellow',
    label = '',
    children,
  }: {
    color?: 'yellow' | 'pink' | 'green' | 'blue';
    label?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="sticky sticky--{color}">
  {#if children}
    <span class="sticky__body">{@render children()}</span>
  {:else if label}
    <span class="sticky__body">{label}</span>
  {/if}
  <span class="sticky__fold"></span>
</div>

<style>
  .sticky {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 14px 12px;
    min-width: 64px;
    min-height: 40px;
    border: 1px solid transparent;
    border-radius: 2px 2px 4px 2px;
    box-shadow: var(--canvas-note-shadow);
    position: relative;
    font-family: var(--canvas-font-marker, 'Caveat', cursive);
    font-size: 14px;
    line-height: 1.3;
    color: var(--canvas-ink);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    cursor: default;
  }

  /* ── rotation: чередование для естественного вида ── */
  .sticky:nth-child(odd) {
    transform: rotate(1.5deg);
  }
  .sticky:nth-child(even) {
    transform: rotate(-1.2deg);
  }
  .sticky:hover {
    transform: rotate(0deg) scale(1.03);
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.14);
    z-index: 1;
  }

  .sticky__body {
    position: relative;
    z-index: 1;
    white-space: pre-wrap;
    word-break: break-word;
    text-align: center;
  }

  /* ── fold: складка стикера сверху ── */
  .sticky__fold {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 10px;
    background: rgba(0, 0, 0, 0.06);
    border-radius: 0 0 0 4px;
    z-index: 0;
  }

  /* ── palette ── */
  .sticky--yellow {
    background: var(--canvas-sticky-yellow);
    border-color: var(--canvas-sticky-yellow-border);
  }
  .sticky--pink {
    background: var(--canvas-sticky-pink);
    border-color: var(--canvas-sticky-pink-border);
  }
  .sticky--green {
    background: var(--canvas-sticky-green);
    border-color: var(--canvas-sticky-green-border);
  }
  .sticky--blue {
    background: var(--canvas-sticky-blue);
    border-color: var(--canvas-sticky-blue-border);
  }
</style>
