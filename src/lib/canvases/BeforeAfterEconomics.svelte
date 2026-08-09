<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BeforeAfterSideDef, UnitShiftDef } from './types';
  import StickyNote from './atoms/StickyNote.svelte';

  /** BeforeAfterEconomics — смена экономической модели: OLD vs NEW.
   *
   *  Две колонки с метриками + акцент unit shift (старая единица → новая).
   *  Это НЕ trade-off (выбор между опциями), а before/after comparison.
   *  Dual API: data props + named slots. */

  let {
    before = { label: '', price: '', unit: '', throughput: '', time: '' } as BeforeAfterSideDef,
    after = { label: '', price: '', unit: '', throughput: '', time: '' } as BeforeAfterSideDef,
    unitShift = { from: '', to: '' } as UnitShiftDef,
    beforeSlot,
    afterSlot,
    unitShiftSlot,
    children,
  }: {
    before?: BeforeAfterSideDef;
    after?: BeforeAfterSideDef;
    unitShift?: UnitShiftDef;
    beforeSlot?: Snippet;
    afterSlot?: Snippet;
    unitShiftSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="bae">
  {#if children}
    {@render children()}
  {:else}
    <div class="bae__comparison">
      <!-- OLD model -->
      <div class="bae__side bae__side--old">
        {#if beforeSlot}
          {@render beforeSlot()}
        {:else}
          <h4 class="bae__side-label">{before.label}</h4>
          <div class="bae__metric">
            <span class="bae__metric-num">{before.price}</span>
          </div>
          <div class="bae__metric-row">
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">unit</span>
              <span class="bae__metric-sm-value">{before.unit}</span>
            </span>
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">throughput</span>
              <span class="bae__metric-sm-value">{before.throughput}</span>
            </span>
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">time</span>
              <span class="bae__metric-sm-value">{before.time}</span>
            </span>
          </div>
        {/if}
      </div>

      <div class="bae__arrow" aria-hidden="true">→</div>

      <!-- NEW model -->
      <div class="bae__side bae__side--new">
        {#if afterSlot}
          {@render afterSlot()}
        {:else}
          <h4 class="bae__side-label">{after.label}</h4>
          <div class="bae__metric">
            <span class="bae__metric-num bae__metric-num--new">{after.price}</span>
          </div>
          <div class="bae__metric-row">
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">unit</span>
              <span class="bae__metric-sm-value">{after.unit}</span>
            </span>
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">throughput</span>
              <span class="bae__metric-sm-value">{after.throughput}</span>
            </span>
            <span class="bae__metric-sm">
              <span class="bae__metric-sm-label">time</span>
              <span class="bae__metric-sm-value">{after.time}</span>
            </span>
          </div>
        {/if}
      </div>
    </div>

    <!-- unit shift callout -->
    {#if unitShiftSlot || (unitShift.from && unitShift.to)}
      <div class="bae__shift">
        <span class="bae__shift-line"></span>
        <div class="bae__shift-body">
          {#if unitShiftSlot}
            {@render unitShiftSlot()}
          {:else}
            <span class="bae__shift-label">VALUE UNIT SHIFT</span>
            <div class="bae__shift-pair">
              <StickyNote color="pink" label={unitShift.from} mark="cross" />
              <span class="bae__shift-arrow">→</span>
              <StickyNote color="green" label={unitShift.to} mark="check" />
            </div>
          {/if}
        </div>
        <span class="bae__shift-line"></span>
      </div>
    {/if}
  {/if}
</div>

<style>
  .bae {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 14px 16px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* ── comparison row ── */
  .bae__comparison {
    display: flex;
    align-items: center;
    gap: 14px;
    justify-content: center;
  }

  /* ── side panels ── */
  .bae__side {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: var(--canvas-panel-bg);
    min-width: 140px;
  }
  .bae__side--old {
    border-color: var(--canvas-sticky-pink-border);
  }
  .bae__side--new {
    border-color: var(--canvas-sticky-green-border);
  }
  .bae__side-label {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 700;
    color: var(--canvas-ink);
    text-align: center;
    margin: 0;
  }
  .bae__metric-num {
    font-family: var(--vnp-font);
    font-size: 22px;
    font-weight: 700;
    color: var(--canvas-ink);
  }
  .bae__metric-num--new {
    color: var(--canvas-mark-check);
  }

  /* metric mini-row */
  .bae__metric-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .bae__metric-sm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .bae__metric-sm-label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }
  .bae__metric-sm-value {
    font-family: var(--vnp-font);
    font-size: 12px;
    font-weight: 600;
    color: var(--canvas-ink);
  }

  /* arrow */
  .bae__arrow {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.16);
    flex-shrink: 0;
  }

  /* ── shift callout ── */
  .bae__shift {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
  }
  .bae__shift-line {
    flex: 1 1 auto;
    height: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
  }
  .bae__shift-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }
  .bae__shift-label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: var(--canvas-ink-soft);
  }
  .bae__shift-pair {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .bae__shift-arrow {
    font-size: 16px;
    color: var(--canvas-ink-soft);
  }
</style>
