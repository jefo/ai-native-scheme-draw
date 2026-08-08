<script lang="ts">
  /** Территория — зона рынка на Positioning Map.
   *  Тонированная область с пунктирной границей; размер в % плота. */
  let {
    x,
    y,
    label,
    width = 40,
    height = 26,
    tone = 'cyan',
  }: {
    x: number;
    y: number;
    label: string;
    width?: number;
    height?: number;
    tone?: 'cyan' | 'violet' | 'amber' | 'mint' | 'rose' | 'orange';
  } = $props();
</script>

<div
  class="territory territory--{tone}"
  style="left: {x}%; top: {y}%; width: {width}%; height: {height}%;"
>
  <span class="territory__label">{label}</span>
</div>

<style>
  .territory {
    position: absolute;
    transform: translate(-50%, -50%);
    border: 1px dashed;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    min-width: 60px;
    min-height: 32px;
  }
  .territory__label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .territory--cyan {
    background: color-mix(in srgb, var(--canvas-sticky-blue-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-blue-border) 45%, transparent);
  }
  .territory--violet {
    background: color-mix(in srgb, var(--canvas-sticky-purple-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-purple-border) 45%, transparent);
  }
  .territory--amber {
    background: color-mix(in srgb, var(--canvas-sticky-yellow-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-yellow-border) 45%, transparent);
  }
  .territory--mint {
    background: color-mix(in srgb, var(--canvas-sticky-green-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-green-border) 45%, transparent);
  }
  .territory--rose {
    background: color-mix(in srgb, var(--canvas-sticky-pink-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-pink-border) 45%, transparent);
  }
  .territory--orange {
    background: color-mix(in srgb, var(--canvas-sticky-orange-border) 12%, transparent);
    border-color: color-mix(in srgb, var(--canvas-sticky-orange-border) 45%, transparent);
  }
</style>
