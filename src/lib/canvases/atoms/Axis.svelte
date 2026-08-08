<script lang="ts">
  /** Ось Positioning Map: линия + подписи концов + заголовок.
   *  Сетка и отступы плота объявлены через --pom-inset-* (задаёт PositioningMap). */
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
    left: var(--pom-inset-l);
    right: var(--pom-inset-x);
    bottom: var(--pom-inset-b);
    height: 1px;
  }
  .pom-axis--y .pom-axis__line {
    left: var(--pom-inset-l);
    top: var(--pom-inset-y);
    bottom: var(--pom-inset-b);
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
    left: var(--pom-inset-l);
    bottom: 10px;
  }
  .pom-axis--x .pom-axis__end--high {
    right: var(--pom-inset-x);
    bottom: 10px;
  }
  .pom-axis--y .pom-axis__end--low {
    left: calc(var(--pom-inset-l) - 8px);
    bottom: var(--pom-inset-b);
    transform: translateX(-100%);
  }
  .pom-axis--y .pom-axis__end--high {
    left: calc(var(--pom-inset-l) - 8px);
    top: var(--pom-inset-y);
    transform: translateX(-100%);
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
    bottom: 8px;
    transform: translateX(-50%);
  }
  .pom-axis__title-wrap {
    position: absolute;
    left: 6px;
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
