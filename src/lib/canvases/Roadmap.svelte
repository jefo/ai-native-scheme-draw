<script lang="ts">
  import type { Snippet } from 'svelte';
  import Horizon from './atoms/Horizon.svelte';
  import Phase from './atoms/Phase.svelte';
  import Milestone from './atoms/Milestone.svelte';
  import Dependency from './atoms/Dependency.svelte';
  import { setRoadmapCtx, type RoadmapCtx } from './roadmap-context';
  import type { RoadmapHorizonDef, RoadmapDependencyDef } from './types';

  /** Roadmap — организм «показать причинную прогрессию».
   *
   *  Три зоны-панели (Now/Next/Later) в ряд — регистр канвас-кита
   *  (панель + чипы, как Lean Canvas): фазы — нейтральные карточки,
   *  вехи — mint-чипы с ромбом (единственный семантический цвет
   *  грамматики — достижение). Вехи регистрируются в реестре по имени,
   *  Dependency связывает их по имени пунктирной дугой — геометрию
   *  решает канвас.
   *
   *  Dual API: data (horizons + dependencies) или слоты (дети = грамматика:
   *  Horizon с Phase/Milestone внутри + Dependency по имени вехи). */

  let {
    horizons = [] as RoadmapHorizonDef[],
    dependencies = [] as RoadmapDependencyDef[],
    showLegend = true,
    children,
  }: {
    horizons?: RoadmapHorizonDef[];
    dependencies?: RoadmapDependencyDef[];
    showLegend?: boolean;
    children?: Snippet;
  } = $props();

  let trackEl = $state<HTMLDivElement | null>(null);

  const ctx = $state<RoadmapCtx>({
    milestones: {},
    trackEl: null,
    w: 1,
    h: 1,
  });
  setRoadmapCtx(ctx);

  $effect(() => {
    ctx.trackEl = trackEl;
  });

  $effect(() => {
    const el = trackEl;
    if (!el) return;
    const measure = () => {
      ctx.w = Math.max(1, el.clientWidth);
      ctx.h = Math.max(1, el.clientHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });
</script>

<div class="roadmap">
  <div class="roadmap__track" bind:this={trackEl}>
    {#if children}
      {@render children()}
    {:else}
      {#each horizons as h (h.label)}
        <Horizon label={h.label}>
          {#each h.steps as s (s.kind === 'phase' ? s.label : s.name)}
            {#if s.kind === 'phase'}
              <Phase label={s.label} />
            {:else}
              <Milestone name={s.name} />
            {/if}
          {/each}
        </Horizon>
      {/each}
      {#each dependencies as d (d.from + d.to)}
        <Dependency from={d.from} to={d.to} />
      {/each}
    {/if}
  </div>
  {#if showLegend}
    <div class="roadmap__legend">
      <span class="roadmap__legend-item">
        <span class="roadmap__legend-mark roadmap__legend-mark--horizon"></span>horizon
      </span>
      <span class="roadmap__legend-item">
        <span class="roadmap__legend-mark roadmap__legend-mark--phase"></span>phase
      </span>
      <span class="roadmap__legend-item">
        <span class="roadmap__legend-mark roadmap__legend-mark--milestone"></span>milestone
      </span>
      <span class="roadmap__legend-item">
        <span class="roadmap__legend-mark roadmap__legend-mark--dependency"></span>dependency
      </span>
    </div>
  {/if}
</div>

<style>
  .roadmap {
    display: flex;
    flex-direction: column;
    gap: var(--stage-gap-md);
    padding: 10px 12px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .roadmap__track {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: stretch;
    gap: 16px;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  .roadmap__legend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding-top: var(--stage-gap-sm);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .roadmap__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .roadmap__legend-mark {
    display: inline-block;
    width: 8px;
    height: 8px;
    flex: none;
  }
  .roadmap__legend-mark--horizon {
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
  }
  .roadmap__legend-mark--phase {
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
    background: var(--canvas-panel-bg);
  }
  .roadmap__legend-mark--milestone {
    background: var(--vnp-good);
    transform: rotate(45deg);
    border-radius: 2px;
  }
  .roadmap__legend-mark--dependency {
    background: repeating-linear-gradient(
      90deg,
      var(--vnp-info) 0 4px,
      transparent 4px 7px
    );
    border-radius: 2px;
  }
</style>
