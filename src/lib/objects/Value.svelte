<script lang="ts">
  /** Value — измеримая величина.
   *  Канал кодирования: КОЛИЧЕСТВЕННАЯ ОТМЕТКА (бар, цифра, график, термометр, счётчик).
   *  Унарна (арность 1) — измеряет 1 Entity.
   *  Mono typeface + tabular-nums for all digits. Mint fill for bars. */
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
    <span class="value__digit {barCls}">{value}<span class="value__unit">{unit}</span></span>
  {:else if variant === 'counter'}
    <span class="value__counter">
      <span class="value__arrow" class:down={direction === 'down'}>
        {direction === 'down' ? '↓' : '↑'}
      </span>
      <span class="value__digit">{value}<span class="value__unit">{unit}</span></span>
    </span>
  {:else if variant === 'thermo'}
    <span class="value__thermo">
      <span class="value__fill {barCls}" style="transform:scaleY({(pct / 100).toFixed(3)})"></span>
    </span>
    <span class="value__digit">{value}<span class="value__unit">{unit}</span></span>
  {:else if variant === 'chart'}
    <svg class="value__chart" viewBox="0 0 60 40" width="60" height="40" aria-hidden="true">
      {#if direction === 'down'}
        <polyline points="3,6 15,12 30,22 45,30 57,36"
          fill="none" stroke="var(--vnp-bad)" stroke-width="1.5" />
      {:else}
        <polyline points="3,36 15,28 30,18 45,10 57,4"
          fill="none" stroke="var(--vnp-good)" stroke-width="1.5" />
      {/if}
    </svg>
    <span class="value__digit">{value}<span class="value__unit">{unit}</span></span>
  {:else}
    <span class="value__bar">
      <span class="value__fill {barCls}" style="transform:scaleX({(pct / 100).toFixed(3)})"></span>
    </span>
    <span class="value__digit">{value}<span class="value__unit">{unit}</span></span>
  {/if}
</div>

<style>
  .value {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .value__label {
    font-family: var(--vnp-font);
    font-size: 11px;
    color: var(--vnp-ink-soft);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .value__digit {
    font-family: var(--vnp-font-mono);
    font-size: 18px;
    font-weight: 400;
    color: var(--vnp-ink);
    font-variant-numeric: tabular-nums;
  }
  .value__unit {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-soft);
    margin-left: 1px;
    font-variant-numeric: tabular-nums;
  }
  .value__counter {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .value__arrow {
    color: var(--vnp-good);
    font-weight: 700;
    font-family: var(--vnp-font-mono);
  }
  .value__arrow.down {
    color: var(--vnp-bad);
  }
  .value__bar {
    display: inline-block;
    width: 80px;
    height: 8px;
    border: 1px solid var(--vnp-border-color);
    border-radius: 4px;
    background: transparent;
    overflow: hidden;
  }
  .value__fill {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .v-up {
    background: var(--vnp-good);
  }
  .v-down {
    background: var(--vnp-bad);
  }
  .value__thermo {
    display: inline-block;
    width: 12px;
    height: 40px;
    border: 1px solid var(--vnp-border-color);
    border-radius: 4px;
    background: transparent;
    overflow: hidden;
    position: relative;
  }
  .value__thermo .value__fill {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    transform-origin: bottom;
    transition: transform 0.4s ease;
  }
  .value__chart {
    border: 1px solid var(--vnp-border-color);
    border-radius: 4px;
    background: transparent;
  }
</style>
