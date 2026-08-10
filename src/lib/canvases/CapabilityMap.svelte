<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { CapabilityMapSideDef, CapabilityMapGapDef, MethodDef, CapabilityGroupDef } from './types';

  /** CapabilityMap — две операции мышления:
   *
   *  mode="gap" (default): разрыв между возможностью и потребностью.
   *    Две панели — capability (cyan) и need (amber), между ними GAP-индикатор.
   *
   *  mode="group": сгруппировать методы/фичи в capability.
   *    Methods (нейтральные чипы) → provocation (зачёркнутый ложный вывод) →
   *    capabilities (циановые плашки-результаты). */

  let {
    mode = 'gap' as 'gap' | 'group',
    // gap mode
    capability = { name: '', metrics: [] } as CapabilityMapSideDef,
    need = { name: '', metrics: [] } as CapabilityMapSideDef,
    gap = { label: '' } as CapabilityMapGapDef,
    capabilitySlot,
    needSlot,
    gapSlot,
    // group mode
    methods = [] as MethodDef[],
    capabilities = [] as CapabilityGroupDef[],
    provocation = '',
    methodsSlot,
    capabilitiesSlot,
    provocationSlot,
    children,
  }: {
    mode?: 'gap' | 'group';
    capability?: CapabilityMapSideDef;
    need?: CapabilityMapSideDef;
    gap?: CapabilityMapGapDef;
    capabilitySlot?: Snippet;
    needSlot?: Snippet;
    gapSlot?: Snippet;
    methods?: MethodDef[];
    capabilities?: CapabilityGroupDef[];
    provocation?: string;
    methodsSlot?: Snippet;
    capabilitiesSlot?: Snippet;
    provocationSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="cmap">
  {#if children}
    {@render children()}
  {:else if mode === 'group'}
    <!-- ═══ GROUP MODE: methods → provocation → capabilities ═══ -->
    <div class="cmap__group">
      <!-- zone 1: methods -->
      <div class="cmap__group-zone cmap__group-zone--in">
        {#if methodsSlot}
          {@render methodsSlot()}
        {:else}
          <div class="cmap__group-chips">
            {#each methods as m}
              <span class="cmap__group-chip">{m.name}</span>
            {/each}
          </div>
        {/if}
      </div>

      <!-- zone 2: provocation (false label, crossed out) -->
      {#if provocationSlot || provocation}
        <div class="cmap__group-provocation">
          {#if provocationSlot}
            {@render provocationSlot()}
          {:else}
            <span class="cmap__group-provocation-label">{provocation}</span>
            <span class="cmap__group-provocation-strike"></span>
          {/if}
          <span class="cmap__group-stop">СТОП</span>
        </div>
      {/if}

      <!-- zone 3: capabilities (result) -->
      <div class="cmap__group-zone cmap__group-zone--out">
        {#if capabilitiesSlot}
          {@render capabilitiesSlot()}
        {:else}
          {#each capabilities as c}
            <div class="cmap__group-cap">
              <span class="cmap__group-cap-name">{c.name}</span>
              {#if c.description}
                <span class="cmap__group-cap-desc">{c.description}</span>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
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

  /* ── GROUP MODE: methods → provocation → capabilities ── */
  .cmap__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 14px 20px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .cmap__group-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 18px;
    border-radius: 8px;
    border: var(--canvas-stroke);
    background: var(--canvas-panel-bg);
    width: 100%;
  }
  .cmap__group-zone--in {
    opacity: 0.68;
  }
  .cmap__group-zone--out {
    border-color: var(--canvas-sticky-blue-border);
    box-shadow: 0 0 18px color-mix(in srgb, var(--canvas-sticky-blue-border) 20%, transparent);
  }

  /* method chips */
  .cmap__group-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }
  .cmap__group-chip {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 7px 15px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    background: var(--canvas-panel-bg);
    color: var(--canvas-ink);
    white-space: nowrap;
  }

  /* provocation: crossed-out label */
  .cmap__group-provocation {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 8px 22px;
    border: 1px solid color-mix(in srgb, var(--canvas-mark-cross) 45%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .cmap__group-provocation-label {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--canvas-mark-cross);
  }
  .cmap__group-provocation-strike {
    position: absolute;
    top: 50%;
    left: 10px;
    right: 10px;
    height: 2px;
    background: var(--canvas-mark-cross);
    border-radius: 2px;
    transform: translateY(-50%) rotate(-7deg);
    opacity: 0.5;
    pointer-events: none;
  }
  .cmap__group-stop {
    font-family: var(--vnp-font-mono);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.14em;
    color: var(--canvas-mark-cross);
    border: 1.5px solid var(--canvas-mark-cross);
    border-radius: 4px;
    padding: 2px 10px;
  }

  /* capability result plates */
  .cmap__group-cap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 14px 28px;
    border: 1px solid var(--canvas-sticky-blue-border);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    box-shadow:
      var(--canvas-note-shadow),
      0 0 18px color-mix(in srgb, var(--canvas-sticky-blue-border) 24%, transparent);
  }
  .cmap__group-cap-name {
    font-family: var(--vnp-font);
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--canvas-ink);
  }
  .cmap__group-cap-desc {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }
</style>
