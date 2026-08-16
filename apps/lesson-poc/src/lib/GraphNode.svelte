<script lang="ts">
  // Локальный примитив урока — узел графа со scope-меткой.
  // Композиция из китовых токенов (не лезем в kit): имя + опциональный
  // scope-бейдж + состояния highlight / dim / strike.
  interface Props {
    name: string;
    scope?: 'REQUEST' | 'DEFAULT';
    /** «выделяется» — янтарное кольцо внимания */
    highlight?: boolean;
    /** «уходит в тень» — не фокус сейчас */
    dim?: boolean;
    /** перечёркнутый scope — ошибочная модель */
    strike?: boolean;
  }

  let {
    name,
    scope,
    highlight = false,
    dim = false,
    strike = false,
  }: Props = $props();
</script>

<div class="node" class:node--highlight={highlight} class:node--dim={dim}>
  <span class="node__name">{name}</span>
  {#if scope}
    <span
      class="node__scope node__scope--{scope.toLowerCase()}"
      class:node__scope--strike={strike}
    >
      {scope}
    </span>
  {/if}
</div>

<style>
  .node {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: var(--bbg-panel);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    white-space: nowrap;
    transition: opacity 0.2s ease, border-color 0.15s ease;
  }

  .node__name {
    font-family: var(--bbg-font);
    font-size: 18px;
    font-weight: 600;
    color: var(--bbg-ink);
  }

  .node__scope {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid transparent;
    border-radius: 999px;
    padding: 2px 10px;
  }

  /* REQUEST = внимание (янтарь), DEFAULT = нейтральный (серый) */
  .node__scope--request {
    background: var(--bbg-amber-dim);
    border-color: var(--bbg-amber-border);
    color: var(--bbg-amber);
  }

  .node__scope--default {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--bbg-border);
    color: var(--bbg-ink-soft);
  }

  .node__scope--strike {
    text-decoration: line-through;
  }

  .node--highlight {
    border-color: var(--bbg-amber);
    box-shadow: 0 0 0 1px var(--bbg-amber);
  }

  .node--dim {
    opacity: var(--bbg-dim-opacity);
  }
</style>
