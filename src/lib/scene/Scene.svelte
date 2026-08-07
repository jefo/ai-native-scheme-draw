<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Scene — Visual Thought Unit: одна объясняемая мысль.
   *  Единственное место СЕМАНТИЧЕСКОЙ композиции: объекты + предикаты = мысль,
   *  которой не было в объектах по отдельности.
   *  Формат экрана: TikTok 9:16 — контент в центральной зоне (безопасные 10%/20%). */
  let {
    title = '',
    children,
  }: {
    title?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="scene">
  {#if title}
    <header class="scene__header">{title}</header>
  {/if}
  <main class="scene__stage">
    {@render children?.()}
  </main>
  <footer class="scene__footer">
    <span class="scene__reaction"></span>
  </footer>
</div>

<style>
  .scene {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: var(--vnp-paper);
    border: 2px solid var(--vnp-ink);
    border-radius: 18px;
    overflow: hidden;
    position: relative;
  }
  .scene__header {
    flex: 0 0 auto;
    padding: 10px 14px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-ink-soft);
    border-bottom: 1px dashed var(--vnp-ink-soft);
  }
  .scene__stage {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow: hidden;
  }
  .scene__footer {
    flex: 0 0 auto;
    height: 38px;
    border-top: 1px dashed var(--vnp-ink-soft);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scene__reaction {
    font-family: var(--vnp-font-hand);
    font-size: 14px;
    color: var(--vnp-ink-soft);
  }
</style>
