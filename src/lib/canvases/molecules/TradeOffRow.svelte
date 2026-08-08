<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from '../atoms/StickyNote.svelte';

  /** TradeOffRow — молекула trade-off матрицы: одна строка-решение.
   *  Col 1: decision (жёлтый стикер). Col 2: options (children — стикеры
   *  с mark="check"/"cross" для выбранного/пожертвованного).
   *  note — почему выбрали так (под строкой). */
  let {
    decision,
    note,
    children,
  }: {
    decision: string;
    note?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="tor">
  <div class="tor__decision">
    <StickyNote color="yellow" label={decision} />
  </div>

  <div class="tor__options">
    {@render children?.()}
  </div>

  {#if note}
    <span class="tor__note">{note}</span>
  {/if}
</div>

<style>
  .tor {
    display: grid;
    grid-template-columns: minmax(120px, 220px) 1fr;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .tor__decision {
    justify-self: center;
    min-width: 0;
  }

  .tor__options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    min-width: 0;
  }

  .tor__note {
    grid-column: 2;
    justify-self: center;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    text-align: center;
  }
</style>
