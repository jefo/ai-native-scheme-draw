<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Frame — bounded-контейнер с фиксированным aspect.
   *  Standalone-аналог Stage: задаёт кадр, когда родитель не даёт его. */
  let {
    aspect = 'auto',
    children,
  }: {
    aspect?: '16:9' | '9:16' | '1:1' | 'auto';
    children?: Snippet;
  } = $props();

  const RATIO: Record<Exclude<typeof aspect, 'auto'>, string> = {
    '16:9': '16 / 9',
    '9:16': '9 / 16',
    '1:1': '1 / 1',
  };
</script>

<div class="frame" style={aspect === 'auto' ? undefined : `aspect-ratio: ${RATIO[aspect]};`}>
  {#if children}{@render children()}{/if}
</div>

<style>
  .frame {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 0;
    min-height: 0;
  }
</style>
