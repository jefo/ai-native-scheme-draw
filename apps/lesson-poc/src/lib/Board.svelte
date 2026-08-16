<script lang="ts">
  // Локальный примитив — постоянная геометрия доски (из секции 0 сценария):
  // CONTEXT/TITLE сверху, PRIMARY WORKSPACE в центре, RULE/ANNOTATION снизу.
  // 16:9, ничего не дробится на колонки — текст живёт рядом с объектом.
  import type { Snippet } from 'svelte';

  interface Props {
    title?: string;
    rule?: string;
    children: Snippet;
  }

  let { title, rule, children }: Props = $props();
</script>

<div class="board">
  <header class="board__title">
    <span class="board__title-text">{title}</span>
  </header>

  <div class="board__workspace">
    {@render children()}
  </div>

  <footer class="board__rule">
    {#if rule}
      <span class="board__rule-text">{rule}</span>
    {/if}
  </footer>
</div>

<style>
  .board {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bbg-bg);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    overflow: hidden;
  }

  .board__title {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 56px;
    padding: 12px 24px;
    border-bottom: 1px solid var(--bbg-border);
  }

  .board__title-text {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--bbg-ink-soft);
  }

  .board__workspace {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    min-height: 0;
  }

  .board__rule {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 8px 24px;
    border-top: 1px solid var(--bbg-border);
  }

  .board__rule-text {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--bbg-amber);
  }
</style>
