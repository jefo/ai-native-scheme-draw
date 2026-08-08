<script lang="ts">
  import { getPositioningCtx } from '../positioning-context';

  /** Натяжение между двумя игроками — карта выражает конфликт.
   *  Точки связываются по имени; линию и подпись рисует канвас.
   *  Розовый пунктир + подпись в чипе на середине. */
  let {
    between,
    label,
  }: {
    between: [string, string];
    label?: string;
  } = $props();

  const ctx = getPositioningCtx();

  const a = $derived(between[0] ? ctx.points[between[0]] : undefined);
  const b = $derived(between[1] ? ctx.points[between[1]] : undefined);

  const geom = $derived.by(() => {
    if (!a || !b) return null;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const ratio = Math.max(0.1, ctx.ratio);
    const len = Math.sqrt(dx * dx + (dy * dy) / (ratio * ratio));
    const angle = (Math.atan2(dy, dx * ratio) * 180) / Math.PI;
    return {
      len,
      angle,
      mx: (a.x + b.x) / 2,
      my: (a.y + b.y) / 2,
    };
  });
</script>

{#if a && b && geom}
  <div class="tension">
    <div
      class="tension__line"
      style="left: {a.x}%; top: {a.y}%; width: {geom.len}%; transform: rotate({geom.angle}deg);"
    ></div>
    {#if label}
      <span class="tension__label" style="left: {geom.mx}%; top: {geom.my}%;">{label}</span>
    {/if}
  </div>
{/if}

<style>
  .tension {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
  }
  .tension__line {
    position: absolute;
    height: 1.5px;
    background: repeating-linear-gradient(90deg, var(--canvas-plot-tension) 0 5px, transparent 5px 10px);
    transform-origin: left center;
  }
  .tension__label {
    position: absolute;
    transform: translate(-50%, -50%);
    background: var(--vnp-card);
    border: 1px solid color-mix(in srgb, var(--canvas-mark-cross) 40%, transparent);
    border-radius: 3px;
    padding: 2px 8px;
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--canvas-mark-cross);
    white-space: nowrap;
  }
</style>
