<script lang="ts">
  import { getPositioningCtx } from '../positioning-context';
  import type { MapValue } from '../types';

  /** Вектор — направление движения игрока (стратегический сдвиг).
   *  from: имя игрока; to: имя игрока или координаты.
   *  Янтарная линия + стрелка в конце + подпись вдоль линии. */
  let {
    from,
    to,
    label,
  }: {
    from: string;
    to: string | { x: MapValue; y: MapValue };
    label?: string;
  } = $props();

  const ctx = getPositioningCtx();

  const start = $derived(ctx.points[from]);
  const end = $derived.by(() => {
    if (typeof to === 'string') return ctx.points[to];
    return { x: ctx.resolve(to.x), y: ctx.resolve(to.y) };
  });

  const geom = $derived.by(() => {
    if (!start || !end) return null;
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const ratio = Math.max(0.1, ctx.ratio);
    const len = Math.sqrt(dx * dx + (dy * dy) / (ratio * ratio));
    const angle = (Math.atan2(dy, dx * ratio) * 180) / Math.PI;
    return {
      len,
      angle,
      lx: start.x + dx * 0.55,
      ly: start.y + dy * 0.55,
      ex: end.x,
      ey: end.y,
    };
  });
</script>

{#if start && end && geom}
  <div class="vector">
    <div
      class="vector__line"
      style="left: {start.x}%; top: {start.y}%; width: {geom.len}%; transform: rotate({geom.angle}deg);"
    ></div>
    <svg
      class="vector__head"
      style="left: {geom.ex}%; top: {geom.ey}%; transform: translate(-50%, -50%) rotate({geom.angle}deg);"
      width="8"
      height="7"
      viewBox="0 0 8 7"
    >
      <polygon points="0,0 8,3.5 0,7" fill="var(--canvas-highlight-ink)" />
    </svg>
    {#if label}
      <span class="vector__label" style="left: {geom.lx}%; top: {geom.ly}%;">{label}</span>
    {/if}
  </div>
{/if}

<style>
  .vector {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }
  .vector__line {
    position: absolute;
    height: 1.5px;
    background: var(--canvas-highlight-ink);
    opacity: 0.85;
    transform-origin: left center;
  }
  .vector__head {
    position: absolute;
    overflow: visible;
  }
  .vector__label {
    position: absolute;
    transform: translate(-50%, -130%);
    background: var(--vnp-card);
    border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 35%, transparent);
    border-radius: 3px;
    padding: 2px 8px;
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--canvas-highlight-ink);
    white-space: nowrap;
  }
</style>
