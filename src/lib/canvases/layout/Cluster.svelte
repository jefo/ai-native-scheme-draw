<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Gap } from '../types';

  /** Cluster — горизонтальный поток с переносом (чипы, подписи, ряды). */
  let {
    gap = 'md',
    align = 'center',
    justify = 'center',
    style,
    children,
  }: {
    gap?: Gap;
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'space-between';
    style?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="cluster" style="gap: var(--stage-gap-{gap}); align-items: {align}; justify-content: {justify}; {style}">
  {#if children}{@render children()}{/if}
</div>

<style>
  .cluster {
    display: flex;
    flex-wrap: wrap;
    min-width: 0;
  }
</style>
