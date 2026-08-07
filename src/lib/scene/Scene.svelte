<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Scene — Visual Thought Unit: одна объясняемая мысль.
   *  Единственное место СЕМАНТИЧЕСКОЙ композиции: объекты + предикаты = мысль,
   *  которой не было в объектах по отдельности.
   *  Формат экрана: TikTok 9:16 — контент в центральной зоне.
   *  Dark header with mint title, blueprint grid on stage, hairline borders. */
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
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
  /* subtle blueprint grid inside scene — lighter than page grid */
  .scene::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 32px 32px;
    pointer-events: none;
    border-radius: 8px;
  }
  .scene__header {
    flex: 0 0 auto;
    padding: 10px 14px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-good);
    border-bottom: var(--vnp-border);
    background: var(--vnp-paper-deep);
    position: relative;
    z-index: 1;
  }
  .scene__stage {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
  .scene__footer {
    flex: 0 0 auto;
    height: 38px;
    border-top: var(--vnp-border);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
  .scene__reaction {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-soft);
  }
</style>
