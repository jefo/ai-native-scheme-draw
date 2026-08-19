<script lang="ts">
  // Узел графа с накопленной историей scope (event sourcing).
  // scopes — последовательность состояний: [DEFAULT, REQUEST] рендерится как
  // «DEFAULT → REQUEST». Переход виден как событие, а не свёртка состояния.
  interface Props {
    name: string;
    /** накопленная история scope (в порядке появления) */
    scopes?: ('REQUEST' | 'DEFAULT')[];
    /** «выделяется» — янтарное кольцо внимания */
    highlight?: boolean;
  }

  let { name, scopes = [], highlight = false }: Props = $props();
</script>

<div class="node" class:node--highlight={highlight}>
  <span class="node__name">{name}</span>
  {#if scopes.length > 0}
    <span class="node__scopes">
      {#each scopes as s, i (i)}
        {#if i > 0}<span class="node__arrow" aria-hidden="true">→</span>{/if}
        <span class="node__scope node__scope--{s.toLowerCase()}">{s}</span>
      {/each}
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
    transition: border-color 0.15s ease;
  }

  .node__name {
    font-family: var(--bbg-font);
    font-size: 18px;
    font-weight: 600;
    color: var(--bbg-ink);
  }

  .node__scopes {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  /* стрелка перехода между состояниями — событие, не декорация */
  .node__arrow {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--bbg-ink-faint);
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

  /* REQUEST = янтарь, DEFAULT = нейтральный */
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

  .node--highlight {
    border-color: var(--bbg-amber);
    box-shadow: 0 0 0 1px var(--bbg-amber);
  }
</style>
