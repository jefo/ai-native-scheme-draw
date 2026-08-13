<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  /** SemanticNode — семантически нагруженный узел (простая молекула: глиф + подпись).
   *  Атом = глиф (iconpack системного дизайна). Смысл несёт глиф, не подпись.
   *  Форма: круг-контейнер под глиф, моно-лейбл под ним.
   *
   *  status — runtime-состояние узла (управляется state management):
   *    'active'   — норма, глиф полный, опциональное mint-свечение
   *    'standby'  — резерв: приглушён, пунктирная граница
   *    'dead'     — мёртв: приглушён, rose-граница, красный крест-бейдж */
  let {
    x = 0,
    y = 0,
    icon = '',
    label = '',
    color = 'var(--vnp-color-entity)',
    r = 46,
    status = 'active',
    glow = false,
  }: {
    x?: number;
    y?: number;
    icon?: string;
    label?: string;
    color?: string;
    r?: number;
    status?: 'active' | 'standby' | 'dead';
    glow?: boolean;
  } = $props();
</script>

<g transform="translate({x} {y})">
  {#if glow && status === 'active'}
    <circle r={r + 7} fill="none" stroke="var(--vnp-glow)" stroke-width="2" opacity="0.8" />
  {/if}

  <circle
    r={r}
    fill="var(--vnp-card)"
    stroke={status === 'dead' ? 'var(--vnp-bad)' : 'var(--vnp-border-color-active)'}
    stroke-width="1"
    stroke-dasharray={status === 'standby' ? '4 4' : undefined}
  />

  <g
    transform="translate({-r * 0.38} {-r * 0.38})"
    style="color: {status === 'dead' ? 'var(--vnp-bad)' : color}; opacity: {status === 'standby' ? 0.55 : status === 'dead' ? 0.6 : 1}"
  >
    <Icon name={icon} size={r * 0.76} />
  </g>

  {#if status === 'dead'}
    <!-- красный крест: мёртвый узел -->
    <g transform="translate({r * 0.72} {-r * 0.72})">
      <circle r="9" fill="var(--vnp-bad)" />
      <line x1="-4" y1="-4" x2="4" y2="4" stroke="var(--vnp-paper)" stroke-width="2.2" />
      <line x1="-4" y1="4" x2="4" y2="-4" stroke="var(--vnp-paper)" stroke-width="2.2" />
    </g>
  {:else if status === 'standby'}
    <text x={r * 0.55} y={-r * 0.6} class="snode__badge">standby</text>
  {/if}

  {#if label}
    <text y={r + 22} text-anchor="middle" class="snode__label {status === 'dead' ? 'snode__label--dead' : ''}">{label}</text>
  {/if}
</g>

<style>
  .snode__label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    fill: var(--vnp-ink-soft);
  }

  .snode__label--dead {
    fill: var(--vnp-bad);
    text-decoration: line-through;
  }

  .snode__badge {
    font-family: var(--vnp-font-mono);
    font-size: 8.5px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    fill: var(--vnp-ink-faint);
  }
</style>
