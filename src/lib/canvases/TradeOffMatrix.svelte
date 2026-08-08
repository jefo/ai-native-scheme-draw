<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';
  import TradeOffRow from './molecules/TradeOffRow.svelte';
  import type { TradeOffRow as TradeOffRowData } from './types';

  /**
   * Trade-off Matrix — организм: что выбрали, чем пожертвовали.
   *
   * Каноническая форма: строка = решение (жёлтый стикер), варианты =
   * стикеры с бейджем ✓ (chosen, зелёный) / ✗ (sacrificed, розовый).
   *
   * Dual API:
   *   Data mode:  rows={[{ decision, options: [{ label, chosen }], note }]}
   *   Slots mode: children Snippet — композиция из молекул TradeOffRow.
   */
  let {
    rows = [],
    children,
  }: {
    rows?: TradeOffRowData[];
    children?: Snippet;
  } = $props();
</script>

<div class="tom">
  <div class="tom__rows">
    {#if children}
      {@render children()}
    {:else}
      {#each rows as r}
        <TradeOffRow decision={r.decision} note={r.note}>
          {#each r.options as o}
            <StickyNote
              color={o.chosen ? 'green' : 'pink'}
              label={o.label}
              mark={o.chosen ? 'check' : 'cross'}
            />
          {/each}
        </TradeOffRow>
      {/each}
    {/if}
  </div>

  <!-- ═══ Легенда ═══ -->
  <div class="tom__legend">
    <span class="tom__legend-item">
      <span class="tom__mark tom__mark--check">✓</span>chosen
    </span>
    <span class="tom__legend-item">
      <span class="tom__mark tom__mark--cross">✗</span>sacrificed
    </span>
  </div>
</div>

<style>
  .tom {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .tom__rows {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    min-height: 0;
  }

  .tom__legend {
    flex: 0 0 auto;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    border-top: var(--canvas-stroke);
    margin-top: 10px;
    padding-top: 10px;
  }
  .tom__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--canvas-ink-soft);
  }
  .tom__mark {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--canvas-ink);
    color: var(--vnp-card);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .tom__mark--check {
    background: var(--canvas-mark-check);
  }
  .tom__mark--cross {
    background: var(--canvas-mark-cross);
  }
</style>
