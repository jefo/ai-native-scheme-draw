<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Gap } from '../types';

  /** Stack — вертикальный поток. Отступы — ступени шкалы Stage. */
  let {
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    style,
    children,
  }: {
    gap?: Gap;
    align?: 'start' | 'center' | 'stretch' | 'end';
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    style?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="stack" style="gap: var(--stage-gap-{gap}); align-items: {align}; justify-content: {justify}; {style}">
  {#if children}{@render children()}{/if}
</div>

<style>
  .stack {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
  }
</style>
