<script lang="ts">
  import type { Snippet } from 'svelte';

  /** StickyNote — атом канвасов: стеклянный чип с неоновой кромкой.
   *  Цвет = семантика: amber (jobs/decisions), rose (pains/sacrificed),
   *  mint (gains/chosen), cyan (products/data), orange (UVP), violet (advantage).
   *  `mark` — бейдж в углу: 'check' (✓ выбран) | 'cross' (✗ пожертвован).
   *  Dual API: `label` для быстрого текста, `children` Snippet для полного контроля. */
  let {
    color = 'yellow',
    label = '',
    mark,
    children,
  }: {
    color?: 'yellow' | 'pink' | 'green' | 'blue' | 'orange' | 'purple';
    label?: string;
    mark?: 'check' | 'cross';
    children?: Snippet;
  } = $props();

  const markGlyph = $derived(mark === 'check' ? '✓' : mark === 'cross' ? '✗' : '');
  const markTitle = $derived(mark === 'check' ? 'chosen' : mark === 'cross' ? 'sacrificed' : '');
</script>

<div class="sticky sticky--{color}">
  {#if children}
    <span class="sticky__body">{@render children()}</span>
  {:else if label}
    <span class="sticky__body">{label}</span>
  {/if}
  {#if mark}
    <span class="sticky__mark sticky__mark--{mark}" title={markTitle}>{markGlyph}</span>
  {/if}
</div>

<style>
  .sticky {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    min-width: 64px;
    min-height: 34px;
    border: 1px solid;
    border-radius: 8px;
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.35;
    color: var(--canvas-ink);
    position: relative;
    transition: transform 0.15s ease, filter 0.15s ease, box-shadow 0.15s ease;
    cursor: default;
  }

  .sticky:hover {
    transform: translateY(-2px);
    filter: brightness(1.12);
    z-index: 1;
  }

  .sticky__body {
    position: relative;
    z-index: 1;
    white-space: pre-wrap;
    word-break: break-word;
    text-align: center;
  }

  /* ── mark: бейдж выбора (✓ / ✗) в углу, кольцо из фона ── */
  .sticky__mark {
    position: absolute;
    top: -6px;
    left: -6px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid var(--vnp-paper);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }
  .sticky__mark--check {
    background: var(--canvas-mark-check);
    color: var(--vnp-paper);
  }
  .sticky__mark--cross {
    background: var(--canvas-mark-cross);
    color: var(--vnp-paper);
  }

  /* ── palette: стеклянные чипы, цвет = семантика ── */
  .sticky--yellow {
    background: var(--canvas-sticky-yellow);
    border-color: var(--canvas-sticky-yellow-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-yellow-border) 28%, transparent);
  }
  .sticky--pink {
    background: var(--canvas-sticky-pink);
    border-color: var(--canvas-sticky-pink-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-pink-border) 28%, transparent);
  }
  .sticky--green {
    background: var(--canvas-sticky-green);
    border-color: var(--canvas-sticky-green-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-green-border) 28%, transparent);
  }
  .sticky--blue {
    background: var(--canvas-sticky-blue);
    border-color: var(--canvas-sticky-blue-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-blue-border) 28%, transparent);
  }
  .sticky--orange {
    background: var(--canvas-sticky-orange);
    border-color: var(--canvas-sticky-orange-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-orange-border) 28%, transparent);
  }
  .sticky--purple {
    background: var(--canvas-sticky-purple);
    border-color: var(--canvas-sticky-purple-border);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-purple-border) 28%, transparent);
  }
</style>
