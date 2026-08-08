<script lang="ts">
  /** Ось Positioning Map: линия + подписи концов + заголовок.
   *
   *  Рендерится ВНУТРИ семантического слоя (.pom__layer), поэтому линии
   *  идут по его рёбрам (left: 0 / right: 0 / bottom: 0) — это рёбра бокса
   *  сетки. Подписи концов x и заголовок свисают в нижний жёлоб
   *  (--pom-inset-b); подписи концов y — чипы ВНУТРИ сетки у концов линии
   *  (в левом жёлобе 44px горизонтальная подпись обрезалась бы). */
  let {
    id,
    label,
    low,
    high,
  }: {
    id: 'x' | 'y';
    label: string;
    low: string;
    high: string;
  } = $props();
</script>

{#if id === 'x'}
  <div class="pom-axis pom-axis--x">
    <span class="pom-axis__line"></span>
    <span class="pom-axis__end pom-axis__end--low">{low}</span>
    <span class="pom-axis__end pom-axis__end--high">{high}</span>
    <span class="pom-axis__title">{label}</span>
  </div>
{:else}
  <div class="pom-axis pom-axis--y">
    <span class="pom-axis__line"></span>
    <span class="pom-axis__end pom-axis__end--low">{low}</span>
    <span class="pom-axis__end pom-axis__end--high">{high}</span>
    <span class="pom-axis__title-wrap"><span class="pom-axis__title">{label}</span></span>
  </div>
{/if}

<style>
  .pom-axis {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
  }
  .pom-axis__line {
    position: absolute;
    background: var(--canvas-plot-axis);
  }
  .pom-axis--x .pom-axis__line {
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
  }
  .pom-axis--y .pom-axis__line {
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
  }
  .pom-axis__end {
    position: absolute;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.03em;
    color: var(--canvas-ink-soft);
  }
  .pom-axis--x .pom-axis__end--low {
    left: 0;
    bottom: -20px;
  }
  .pom-axis--x .pom-axis__end--high {
    right: 0;
    bottom: -20px;
  }
  /* концы y — чипы внутри сетки у концов линии (жёлоб 44px узок
     для горизонтальной подписи) */
  .pom-axis--y .pom-axis__end--low {
    left: 8px;
    bottom: 8px;
    background: var(--vnp-card);
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 30%, transparent);
    border-radius: 3px;
    padding: 2px 7px;
  }
  .pom-axis--y .pom-axis__end--high {
    left: 8px;
    top: 8px;
    background: var(--vnp-card);
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 30%, transparent);
    border-radius: 3px;
    padding: 2px 7px;
  }
  .pom-axis__title {
    position: absolute;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--canvas-ink-soft);
  }
  .pom-axis--x .pom-axis__title {
    left: 50%;
    bottom: -28px;
    transform: translateX(-50%);
  }
  /* y-заголовок вертикальный — живёт в левом жёлобе; wrap в координатах
     слоя: левый край жёлоба = calc(-1 * inset-l + 8px) */
  .pom-axis__title-wrap {
    position: absolute;
    left: calc(-1 * var(--pom-inset-l) + 8px);
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
  }
  .pom-axis--y .pom-axis__title {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
</style>
