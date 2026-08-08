<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { Gap } from '../types';

  /** Rail — основное полотно + боковая полоса аннотаций.
   *  side задаёт сторону рейла; ширина — width (по умолчанию 240px).
   *  Дети = main content, snippet rail = полоса. */
  let {
    side = 'right',
    width = '240px',
    gap = 'lg',
    children,
    rail,
  }: {
    side?: 'left' | 'right';
    width?: string;
    gap?: Gap;
    children?: Snippet;
    rail: Snippet;
  } = $props();
</script>

<div class="rail rail--{side}" style="gap: var(--stage-gap-{gap});">
  <div class="rail__main">
    {#if children}{@render children()}{/if}
  </div>
  <aside class="rail__side" style="width: {width};">
    {@render rail()}
  </aside>
</div>

<style>
  .rail {
    display: flex;
    min-width: 0;
    min-height: 0;
  }
  .rail--left {
    flex-direction: row-reverse;
  }
  .rail__main {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
  }
  .rail__side {
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
  }
  .rail--right .rail__side {
    border-left: var(--vnp-border-soft);
    padding-left: var(--stage-gap-md);
  }
  .rail--left .rail__side {
    border-right: var(--vnp-border-soft);
    padding-right: var(--stage-gap-md);
  }
</style>
