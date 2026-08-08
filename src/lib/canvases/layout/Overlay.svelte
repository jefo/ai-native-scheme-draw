<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Overlay — базовый слой + поверхностный слой (аннотации, safe zones).
   *  Верхний слой не перехватывает указатель. */
  let {
    children,
    overlay,
  }: {
    children?: Snippet;
    overlay: Snippet;
  } = $props();
</script>

<div class="overlay">
  <div class="overlay__base">
    {#if children}{@render children()}{/if}
  </div>
  <div class="overlay__layer">
    {@render overlay()}
  </div>
</div>

<style>
  .overlay {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .overlay__base {
    width: 100%;
    height: 100%;
  }
  .overlay__layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
</style>
