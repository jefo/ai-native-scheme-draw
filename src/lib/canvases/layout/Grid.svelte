<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Gap } from '../types';

  /** Grid — семантическая сетка по именованным областям.
   *  areas: "header header / sidebar main" (CSS grid-template-areas).
   *  Размещение детей — через <Zone name="...">, координаты не видны
   *  consumer-коду. */
  let {
    areas,
    gap = 'md',
    columns,
    rows,
    style,
    children,
  }: {
    areas: string;
    gap?: Gap;
    /** Необязательный шаблон колонок, напр. "160px repeat(6, 1fr)". */
    columns?: string;
    rows?: string;
    style?: string;
    children?: Snippet;
  } = $props();
</script>

<div
  class="grid"
  style="gap: var(--stage-gap-{gap}); grid-template-areas: {areas}; {columns ? `grid-template-columns: ${columns};` : ''} {rows ? `grid-template-rows: ${rows};` : ''} {style}"
>
  {#if children}{@render children()}{/if}
</div>

<style>
  .grid {
    display: grid;
    min-width: 0;
    min-height: 0;
  }
</style>
