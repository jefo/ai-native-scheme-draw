<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Gap } from '../types';

  /** Split — двухпанельная композиция с фиксированным отношением.
   *  Named snippets primary/secondary; ориентация horizontal|vertical. */
  let {
    ratio = '1:1',
    orientation = 'horizontal',
    gap = 'lg',
    primary,
    secondary,
  }: {
    ratio?: '1:1' | '2:1' | '1:2' | '3:1' | '1:3';
    orientation?: 'horizontal' | 'vertical';
    gap?: Gap;
    primary: Snippet;
    secondary: Snippet;
  } = $props();

  const COLS = $derived({
    '1:1': '1fr 1fr',
    '2:1': '2fr 1fr',
    '1:2': '1fr 2fr',
    '3:1': '3fr 1fr',
    '1:3': '1fr 3fr',
  }[ratio]);
</script>

<div
  class="split split--{orientation}"
  style="gap: var(--stage-gap-{gap}); --split-cols: {COLS};"
>
  <div class="split__pane">{@render primary()}</div>
  <div class="split__pane">{@render secondary()}</div>
</div>

<style>
  .split {
    display: grid;
    min-width: 0;
    min-height: 0;
  }
  .split--horizontal {
    grid-template-columns: var(--split-cols);
  }
  .split--vertical {
    grid-template-rows: var(--split-cols);
  }
  .split__pane {
    min-width: 0;
    min-height: 0;
  }
</style>
