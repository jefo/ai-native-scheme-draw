<script lang="ts">
  import type { Snippet } from 'svelte';
  import Axis from './atoms/Axis.svelte';
  import Territory from './atoms/Territory.svelte';
  import Player from './atoms/Player.svelte';
  import Tension from './atoms/Tension.svelte';
  import Vector from './atoms/Vector.svelte';
  import { setPositioningCtx } from './positioning-context';
  import type {
    MapAxisDef,
    MapPlayerDef,
    MapTerritoryDef,
    MapTensionDef,
    MapVectorDef,
  } from './types';

  /** Positioning Map — карта «сравнить / противопоставить».
   *
   *  Dual API:
   *  1. Slots (DSL-режим): children = примитивы грамматики
   *     <Axis id="x" low="Manual" high="Autonomous" />
   *     <Player name="Us" x={82} y={80} state="focus" />
   *     <Tension between={["Us","Miro"]} label="Rigor vs playfulness" />
   *  2. Data (пропс-режим): axes / territories / players / tensions / vectors.
   *
   *  Игроки регистрируются по имени в контексте — связки Tension/Vector
   *  ссылаются на имена, геометрию решает канвас (meaning before geometry). */

  const resolve = (v: number | string): number => {
    if (typeof v === 'number') return Math.min(100, Math.max(0, v));
    return { low: 12, medium: 50, high: 88 }[v] ?? 50;
  };

  let {
    axes = [] as MapAxisDef[],
    territories = [] as MapTerritoryDef[],
    players = [] as MapPlayerDef[],
    tensions = [] as MapTensionDef[],
    vectors = [] as MapVectorDef[],
    showLegend = true,
    children,
  }: {
    axes?: MapAxisDef[];
    territories?: MapTerritoryDef[];
    players?: MapPlayerDef[];
    tensions?: MapTensionDef[];
    vectors?: MapVectorDef[];
    showLegend?: boolean;
    children?: Snippet;
  } = $props();

  /** Семантический слой = бокс сетки (inset такой же, как у gridlines):
   *  координаты игроков в % откладываются от НЕГО, а не от плота. */
  let layerEl = $state<HTMLDivElement | null>(null);

  const ctx = $state({
    points: {} as Record<string, { x: number; y: number }>,
    ratio: 1,
    resolve,
  });

  setPositioningCtx(ctx);

  $effect(() => {
    const el = layerEl;
    if (!el) return;
    const measure = () => {
      ctx.ratio = el.clientWidth / Math.max(1, el.clientHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });

  const LEGEND_STATES = [
    { key: 'default', label: 'default' },
    { key: 'focus', label: 'focus' },
    { key: 'competitor', label: 'competitor' },
    { key: 'reference', label: 'reference' },
    { key: 'unknown', label: 'unknown' },
    { key: 'emerging', label: 'emerging' },
  ] as const;
</script>

<div class="pom">
  <div class="pom__plot">
    <div class="pom__grid"></div>
    <div class="pom__layer" bind:this={layerEl}>
      {#if children}
        {@render children()}
      {:else}
        {#each axes as a}
          <Axis id={a.id} label={a.label} low={a.low} high={a.high} />
        {/each}
        {#each territories as t}
          <Territory x={t.x} y={t.y} label={t.label} width={t.width} height={t.height} tone={t.tone} />
        {/each}
        {#each players as p}
          <Player name={p.name} x={p.x} y={p.y} state={p.state ?? 'default'} />
        {/each}
        {#each tensions as t}
          <Tension between={t.between} label={t.label} />
        {/each}
        {#each vectors as v}
          <Vector from={v.from} to={v.to} label={v.label} />
        {/each}
      {/if}
    </div>
  </div>

  {#if showLegend}
    <div class="pom__legend">
      {#each LEGEND_STATES as s}
        <span class="pom__legend-item">
          <span class="pom__legend-mark pom__legend-mark--{s.key}"></span>
          {s.label}
        </span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .pom {
    /* геометрия плота: отступы для осей и их подписей */
    --pom-inset-x: 14px;
    --pom-inset-y: 12px;
    --pom-inset-b: 34px;
    --pom-inset-l: 44px;

    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
    padding: 12px;
  }
  .pom__plot {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    border: var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    overflow: hidden;
  }
  .pom__grid {
    position: absolute;
    inset: var(--pom-inset-y) var(--pom-inset-x) var(--pom-inset-b) var(--pom-inset-l);
    background-image:
      linear-gradient(to right, var(--canvas-plot-grid) 1px, transparent 1px),
      linear-gradient(to bottom, var(--canvas-plot-grid) 1px, transparent 1px);
    background-size: 25% 25%, 25% 25%;
  }
  /* семантический слой — та же геометрия, что у сетки: % координаты
     атомов откладываются от бокса сетки, а не от всего плота */
  .pom__layer {
    position: absolute;
    inset: var(--pom-inset-y) var(--pom-inset-x) var(--pom-inset-b) var(--pom-inset-l);
  }
  .pom__legend {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 6px 16px;
    justify-content: center;
    align-items: center;
    padding-top: 8px;
    border-top: var(--vnp-border-soft);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--canvas-ink-soft);
  }
  .pom__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .pom__legend-mark {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--canvas-ink);
  }
  .pom__legend-mark--focus {
    width: 10px;
    height: 10px;
    background: var(--canvas-highlight-ink);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--canvas-highlight-ink) 22%, transparent);
  }
  .pom__legend-mark--competitor {
    background: transparent;
    border: 1.5px solid var(--canvas-mark-cross);
  }
  .pom__legend-mark--reference {
    background: transparent;
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
    width: 7px;
    height: 7px;
  }
  .pom__legend-mark--unknown {
    background: transparent;
    border: 1.5px dashed var(--canvas-ink-soft);
  }
  .pom__legend-mark--emerging {
    background: transparent;
    border: 1.5px solid var(--canvas-sticky-blue-border);
  }
</style>
