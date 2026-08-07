<script lang="ts">
  /** Value — измеримая величина.
   *  Канал кодирования: КОЛИЧЕСТВЕННАЯ ОТМЕТКА (бар, цифра, график, термометр, счётчик).
   *  Унарна (арность 1) — измеряет 1 Entity. Имя величины — Amount/Level/Score, не имя вещи. */
  let {
    label = '',
    value = 0,
    unit = '',
    variant = 'bar',
    max = 100,
    direction = 'up',
  }: {
    label?: string;
    value?: number;
    unit?: string;
    variant?: 'bar' | 'digit' | 'chart' | 'thermo' | 'counter';
    max?: number;
    direction?: 'up' | 'down';
  } = $props();

  const pct = $derived(Math.max(0, Math.min(100, (value / max) * 100)));
  const barCls = $derived(direction === 'down' ? 'v-down' : 'v-up');
</script>

<div class="value" title="Value: {label} = {value}{unit}">
  <span class="value__label">{label || 'Value'}</span>

  {#if variant === 'digit'}
    <span class="value__digit {barCls}">{value}{unit}</span>
  {:else if variant === 'counter'}
    <span class="value__counter">
      <span class="value__arrow" class:down={direction === 'down'}>{direction === 'down' ? '↓' : '↑'}</span>
      <span class="value__digit">{value}{unit}</span>
    </span>
  {:else if variant === 'thermo'}
    <span class="value__thermo">
      <span class="value__fill {barCls}" style="height:{pct}%"></span>
    </span>
    <span class="value__digit">{value}{unit}</span>
  {:else if variant === 'chart'}
    <svg class="value__chart" viewBox="0 0 60 40" width="60" height="40" aria-hidden="true">
      {#if direction === 'down'}
        <polyline points="0,6 15,12 30,22 45,30 60,38" fill="none" stroke="var(--vnp-bad)" stroke-width="2.5" />
      {:else}
        <polyline points="0,38 15,30 30,22 45,12 60,4" fill="none" stroke="var(--vnp-good)" stroke-width="2.5" />
      {/if}
    </svg>
    <span class="value__digit">{value}{unit}</span>
  {:else}
    <span class="value__bar">
      <span class="value__fill {barCls}" style="width:{pct}%"></span>
    </span>
    <span class="value__digit">{value}{unit}</span>
  {/if}
</div>

<style>
  .value {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
  }
  .value__label {
    font-size: 12px;
    color: var(--vnp-ink-soft);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .value__digit {
    font-size: 18px;
    font-variant-numeric: tabular-nums;
  }
  .value__counter {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .value__arrow {
    color: var(--vnp-good);
    font-weight: 800;
  }
  .value__arrow.down {
    color: var(--vnp-bad);
  }
  .value__bar {
    display: inline-block;
    width: 80px;
    height: 12px;
    border: 2px solid var(--vnp-ink);
    border-radius: 6px;
    background: var(--vnp-card);
    overflow: hidden;
  }
  .value__fill {
    display: block;
    height: 100%;
    transition: width 0.4s ease;
  }
  .v-up {
    background: var(--vnp-good);
  }
  .v-down {
    background: var(--vnp-bad);
  }
  .value__thermo {
    display: inline-block;
    width: 16px;
    height: 44px;
    border: 2px solid var(--vnp-ink);
    border-radius: 8px;
    background: var(--vnp-card);
    overflow: hidden;
    position: relative;
  }
  .value__thermo .value__fill {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .value__chart {
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: 4px;
    background: var(--vnp-card);
  }
</style>
