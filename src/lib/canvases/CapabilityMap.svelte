<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { CapabilityMapSideDef, CapabilityMapGapDef } from './types';

  /** CapabilityMap — разрыв между возможностью и потребностью.
   *
   *  Две панели: capability (cyan) и need (amber). Между ними — GAP-индикатор.
   *  Dual API: data props + named slots. */

  let {
    capability = { name: '', metrics: [] } as CapabilityMapSideDef,
    need = { name: '', metrics: [] } as CapabilityMapSideDef,
    gap = { label: '' } as CapabilityMapGapDef,
    capabilitySlot,
    needSlot,
    gapSlot,
    children,
  }: {
    capability?: CapabilityMapSideDef;
    need?: CapabilityMapSideDef;
    gap?: CapabilityMapGapDef;
    capabilitySlot?: Snippet;
    needSlot?: Snippet;
    gapSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="cmap">
  {#if children}
    {@render children()}
  {:else}
    <div class="cmap__panels">
      <!-- capability panel -->
      <div class="cmap__panel cmap__panel--capability">
        {#if capabilitySlot}
          {@render capabilitySlot()}
        {:else}
          <h4 class="cmap__panel-title">{capability.name}</h4>
          {#if capability.description}
            <p class="cmap__panel-desc">{capability.description}</p>
          {/if}
          {#each capability.metrics as m}
            <div class="cmap__metric">
              <span class="cmap__metric-label">{m.label}</span>
              <span class="cmap__metric-value">{m.value}</span>
            </div>
          {/each}
        {/if}
      </div>

      <!-- gap connector -->
      <div class="cmap__gap">
        {#if gapSlot}
          {@render gapSlot()}
        {:else}
          <div class="cmap__gap-line"></div>
          <span class="cmap__gap-label">{gap.label}</span>
          <div class="cmap__gap-line"></div>
        {/if}
      </div>

      <!-- need panel -->
      <div class="cmap__panel cmap__panel--need">
        {#if needSlot}
          {@render needSlot()}
        {:else}
          <h4 class="cmap__panel-title">{need.name}</h4>
          {#if need.description}
            <p class="cmap__panel-desc">{need.description}</p>
          {/if}
          {#each need.metrics as m}
            <div class="cmap__metric">
              <span class="cmap__metric-label">{m.label}</span>
              <span class="cmap__metric-value">{m.value}</span>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .cmap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .cmap__panels {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    justify-content: center;
  }

  /* ── panel ── */
  .cmap__panel {
    flex: 1 1 0;
    min-width: 0;
    max-width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 18px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: var(--canvas-panel-bg);
  }
  .cmap__panel--capability {
    border-color: var(--canvas-sticky-blue-border);
  }
  .cmap__panel--need {
    border-color: var(--canvas-sticky-yellow-border);
  }

  .cmap__panel-title {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 700;
    color: var(--canvas-ink);
    text-align: center;
    margin: 0;
  }
  .cmap__panel-desc {
    font-family: var(--vnp-font);
    font-size: 12px;
    color: var(--canvas-ink-soft);
    text-align: center;
    margin: 0;
    line-height: 1.45;
  }

  .cmap__metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1px;
  }
  .cmap__metric-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }
  .cmap__metric-value {
    font-family: var(--vnp-font);
    font-size: 16px;
    font-weight: 600;
    color: var(--canvas-ink);
  }

  /* ── gap ── */
  .cmap__gap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    min-width: 50px;
  }
  .cmap__gap-line {
    width: 1px;
    height: 24px;
    background: rgba(251, 113, 133, 0.35);
  }
  .cmap__gap-label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: var(--canvas-mark-cross);
    text-align: center;
    line-height: 1.3;
    max-width: 60px;
  }
</style>
