<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  export type ArrowTone = 'default' | 'blue' | 'green' | 'amber' | 'red';

  interface Props {
    direction?: 'right' | 'left' | 'up' | 'down';
    tone?: ArrowTone;
    /** dashed line (metadata / occasional queries) */
    dashed?: boolean;
    /** animated flowing dashes (live data movement) */
    animated?: boolean;
    /** red ✗ chip over the line (forbidden direct access) */
    blocked?: boolean;
    /** small mono label centered on the line */
    label?: string;
    /** line thickness in px */
    thickness?: number;
    class?: string;
  }

  let {
    direction = 'right',
    tone = 'default',
    dashed = false,
    animated = false,
    blocked = false,
    label,
    thickness = 2,
    class: className,
  }: Props = $props();

  const HEAD: Record<NonNullable<Props['direction']>, string> = {
    right: 'bbg-arrow__head--right',
    left: 'bbg-arrow__head--left',
    up: 'bbg-arrow__head--up',
    down: 'bbg-arrow__head--down',
  };
</script>

<div
  class="bbg-arrow bbg-arrow--{direction} bbg-arrow--{tone} {className ?? ''}"
  class:bbg-arrow--dashed={dashed}
  class:bbg-arrow--animated={animated}
  class:bbg-arrow--blocked={blocked}
  style="--bbg-arrow-thickness:{thickness}px"
>
  {#if label}
    <span class="bbg-arrow__label">{label}</span>
  {/if}
  <span class="bbg-arrow__line">
    <span class="bbg-arrow__head {HEAD[direction]}" aria-hidden="true"></span>
  </span>
  {#if blocked}
    <span class="bbg-arrow__block" role="img" aria-label="blocked">
      <Icon name="cross" size={10} strokeWidth={2.5} />
    </span>
  {/if}
</div>

<style>
  .bbg-arrow {
    --bbg-arrow-color: var(--bbg-ink-faint);
    --bbg-arrow-thickness: 2px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }

  /* ── orientations ──────────────────────────────────────── */
  .bbg-arrow--right,
  .bbg-arrow--left {
    flex-direction: row;
    width: 100%;
    min-height: calc(var(--bbg-arrow-thickness) * 4);
  }

  .bbg-arrow--up,
  .bbg-arrow--down {
    flex-direction: column;
    height: 100%;
    min-width: calc(var(--bbg-arrow-thickness) * 4);
  }

  .bbg-arrow__line {
    position: relative;
    display: block;
    flex: 1;
  }

  .bbg-arrow--right .bbg-arrow__line,
  .bbg-arrow--left .bbg-arrow__line {
    height: var(--bbg-arrow-thickness);
  }

  .bbg-arrow--up .bbg-arrow__line,
  .bbg-arrow--down .bbg-arrow__line {
    width: var(--bbg-arrow-thickness);
  }

  /* solid / dashed / animated line */
  .bbg-arrow__line {
    background-color: var(--bbg-arrow-color);
  }

  .bbg-arrow--dashed:not(.bbg-arrow--animated) .bbg-arrow__line {
    background-color: transparent;
    background-image: repeating-linear-gradient(
      90deg,
      var(--bbg-arrow-color) 0,
      var(--bbg-arrow-color) 10px,
      transparent 10px,
      transparent 16px
    );
    opacity: 0.75;
  }

  .bbg-arrow--animated .bbg-arrow__line {
    background-color: transparent;
    background-image: repeating-linear-gradient(
      90deg,
      var(--bbg-arrow-color) 0,
      var(--bbg-arrow-color) 8px,
      transparent 8px,
      transparent 16px
    );
    animation: bbg-arrow-flow 0.7s linear infinite;
  }

  @keyframes bbg-arrow-flow {
    to {
      background-position: 16px 0;
    }
  }

  /* ── arrowhead ─────────────────────────────────────────── */
  .bbg-arrow__head {
    position: absolute;
    width: 0;
    height: 0;
  }

  .bbg-arrow__head--right {
    right: -1px;
    top: 50%;
    transform: translateY(-50%);
    border-top: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-bottom: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-left: calc(var(--bbg-arrow-thickness) * 2.8) solid var(--bbg-arrow-color);
  }

  .bbg-arrow__head--left {
    left: -1px;
    top: 50%;
    transform: translateY(-50%);
    border-top: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-bottom: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-right: calc(var(--bbg-arrow-thickness) * 2.8) solid var(--bbg-arrow-color);
  }

  .bbg-arrow__head--up {
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    border-left: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-right: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-bottom: calc(var(--bbg-arrow-thickness) * 2.8) solid var(--bbg-arrow-color);
  }

  .bbg-arrow__head--down {
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    border-left: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-right: calc(var(--bbg-arrow-thickness) * 2.4) solid transparent;
    border-top: calc(var(--bbg-arrow-thickness) * 2.8) solid var(--bbg-arrow-color);
  }

  /* ── label centered on the line ────────────────────────── */
  .bbg-arrow__label {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background: var(--bbg-bg);
    border: 1px solid var(--bbg-border);
    border-radius: 4px;
    padding: 1px 8px;
    font-family: var(--bbg-font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
    pointer-events: none;
  }

  /* ── blocked chip ──────────────────────────────────────── */
  .bbg-arrow__block {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--bbg-red);
    color: #fff;
    box-shadow: 0 0 0 3px var(--bbg-bg);
  }

  /* ── tones ─────────────────────────────────────────────── */
  .bbg-arrow--blue {
    --bbg-arrow-color: var(--bbg-blue);
  }
  .bbg-arrow--green {
    --bbg-arrow-color: var(--bbg-green);
  }
  .bbg-arrow--amber {
    --bbg-arrow-color: var(--bbg-amber);
  }
  .bbg-arrow--red {
    --bbg-arrow-color: var(--bbg-red);
  }
</style>
