<script lang="ts">
  import type { Snippet } from 'svelte';
  import StorySteps from './molecules/StorySteps.svelte';
  import { setStoryCtx, type StoryCtx } from './story-context';
  import type { StoryStepDef } from './types';

  /** Story — организм «проследить трансформацию».
   *
   *  Лёгкий след (не полная дисциплина Domain Storytelling: свои
   *  примитивы и нотация у неё вне скоупа). Дети = шаги в порядке
   *  стори (Actor → Action → Artifact → System → Handoff → Decision →
   *  Outcome); канвас собирает из них цепочку: коннекторы между шагами,
   *  а повторные вхождения Artifact соединяет нитью (реестр имён).
   *
   *  Dual API: data (steps) или слоты (дети = грамматика). */

  interface Thread {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    len: number;
    angle: number;
    mx: number;
    my: number;
  }

  let {
    steps = [] as StoryStepDef[],
    showLegend = true,
    children,
  }: {
    steps?: StoryStepDef[];
    showLegend?: boolean;
    children?: Snippet;
  } = $props();

  let stageEl = $state<HTMLDivElement | null>(null);

  const ctx = $state<StoryCtx>({
    stageEl: null,
    ratio: 1,
    artifactPositions: {},
  });
  setStoryCtx(ctx);

  $effect(() => {
    ctx.stageEl = stageEl;
  });

  $effect(() => {
    const el = stageEl;
    if (!el) return;
    const measure = () => {
      ctx.ratio = el.clientWidth / Math.max(1, el.clientHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  });

  // Нити: повторные вхождения артефакта соединяются пунктиром.
  const threads = $derived.by(() => {
    const out: Thread[] = [];
    const ratio = Math.max(0.1, ctx.ratio);
    for (const name of Object.keys(ctx.artifactPositions)) {
      const list = (ctx.artifactPositions[name] ?? []).filter((p) => p !== undefined);
      if (list.length < 2) continue;
      for (let i = 1; i < list.length; i++) {
        const a = list[i - 1];
        const b = list[i];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.sqrt(dx * dx + (dy * dy) / (ratio * ratio));
        const angle = (Math.atan2(dy, dx * ratio) * 180) / Math.PI;
        out.push({
          x1: a.x,
          y1: a.y,
          x2: b.x,
          y2: b.y,
          len,
          angle,
          mx: (a.x + b.x) / 2,
          my: (a.y + b.y) / 2,
        });
      }
    }
    return out;
  });
</script>

<div class="story">
  <div class="story__track" bind:this={stageEl}>
    {#if children}
      {@render children()}
    {:else}
      <StorySteps {steps} />
    {/if}
    {#each threads as t, i (i)}
      <div
        class="story__thread"
        style="left: {t.x1}%; top: {t.y1}%; width: {t.len}%; transform: rotate({t.angle}deg);"
      ></div>
      <span class="story__thread-glyph" style="left: {t.mx}%; top: {t.my}%;">↩</span>
    {/each}
  </div>
  {#if showLegend}
    <div class="story__legend">
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--actor"></span>actor
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--action"></span>action
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--artifact"></span>artifact
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--system"></span>system
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--handoff">⇄</span>handoff
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--decision"></span>decision
      </span>
      <span class="story__legend-item">
        <span class="story__legend-mark story__legend-mark--outcome">✓</span>outcome
      </span>
    </div>
  {/if}
</div>

<style>
  .story {
    display: flex;
    flex-direction: column;
    gap: var(--stage-gap-md);
    padding: 12px 14px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
  }
  .story__track {
    position: relative;
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
    min-width: 0;
  }
  .story__track :global(.uf-step) {
    flex: 0 1 auto;
    /* min-width уважаем из атомов (не схлопывать в щепки) */
    min-width: unset;
    /* containing block для коннектора ::after (иначе стрелки
       якорятся к треку и сваливаются у его правого края) */
    position: relative;
  }
  /* коннекторы: стрелка между шагами (кроме последнего в треке) */
  .story__track :global(.uf-step:not(:last-child))::after {
    content: '→';
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translate(50%, -50%);
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--canvas-ink-soft);
    z-index: 2;
    pointer-events: none;
  }

  /* нить артефакта: повторное вхождение того же имени */
  .story__thread {
    position: absolute;
    height: 1px;
    background: repeating-linear-gradient(
      90deg,
      var(--canvas-sticky-blue-border) 0 5px,
      transparent 5px 10px
    );
    transform-origin: left center;
    z-index: 3;
    pointer-events: none;
  }
  .story__thread-glyph {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 3;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-info);
    background: var(--vnp-card);
    border-radius: 3px;
    padding: 0 3px;
    pointer-events: none;
  }

  .story__legend {
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
  .story__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .story__legend-mark {
    display: inline-block;
    width: 8px;
    height: 8px;
    flex: none;
  }
  .story__legend-mark--actor {
    background: var(--vnp-info);
    border-radius: 50%;
  }
  .story__legend-mark--action {
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
  }
  .story__legend-mark--artifact {
    background: var(--vnp-info);
    transform: rotate(45deg);
    border-radius: 2px;
  }
  .story__legend-mark--system {
    border: 1px dashed var(--canvas-ink-soft);
    border-radius: 2px;
  }
  .story__legend-mark--handoff {
    width: auto;
    color: var(--canvas-ink-soft);
    font-size: 10px;
    line-height: 1;
  }
  .story__legend-mark--decision {
    background: var(--canvas-highlight-ink);
    transform: rotate(45deg);
    border-radius: 2px;
  }
  .story__legend-mark--outcome {
    width: auto;
    color: var(--vnp-good);
    font-size: 10px;
    line-height: 1;
  }
</style>
