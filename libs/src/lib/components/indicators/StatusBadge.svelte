<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import type { IconName } from '../icons/icons';

  export type BadgeTone = 'success' | 'error' | 'warning' | 'info' | 'running' | 'neutral';

  const TONE_ICON: Record<BadgeTone, IconName> = {
    success: 'check',
    error: 'cross',
    warning: 'warn',
    info: 'info',
    running: 'refresh',
    neutral: 'shield',
  };

  interface Props {
    tone?: BadgeTone;
    label: string;
    /** override the tone's default icon */
    icon?: IconName;
    /** soft glow pulse — for live/active states */
    pulse?: boolean;
    class?: string;
  }

  let { tone = 'success', label, icon, pulse = false, class: className }: Props = $props();
</script>

<span
  class="bbg-badge bbg-badge--{tone} {className ?? ''}"
  class:bbg-badge--pulse={pulse}
  role="status"
>
  <Icon name={icon ?? TONE_ICON[tone]} size={12} class="bbg-badge__icon" />
  <span class="bbg-badge__label">{label}</span>
</span>

<style>
  .bbg-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 22px;
    padding: 0 9px;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  .bbg-badge__label {
    font-family: var(--bbg-font-mono);
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--bbg-ink);
  }

  /* ── tones: tinted chip + colored icon ─────────────────── */
  .bbg-badge--success {
    background: var(--bbg-green-dim);
    border-color: var(--bbg-green-border);
  }
  .bbg-badge--success :global(.bbg-badge__icon) {
    color: var(--bbg-green);
  }

  .bbg-badge--error {
    background: var(--bbg-red-dim);
    border-color: var(--bbg-red-border);
  }
  .bbg-badge--error :global(.bbg-badge__icon) {
    color: var(--bbg-red);
  }

  .bbg-badge--warning {
    background: var(--bbg-amber-dim);
    border-color: var(--bbg-amber-border);
  }
  .bbg-badge--warning :global(.bbg-badge__icon) {
    color: var(--bbg-amber);
  }

  .bbg-badge--info {
    background: var(--bbg-blue-dim);
    border-color: var(--bbg-blue-border);
  }
  .bbg-badge--info :global(.bbg-badge__icon) {
    color: var(--bbg-blue);
  }

  .bbg-badge--running {
    background: var(--bbg-blue-dim);
    border-color: var(--bbg-blue-border);
  }
  .bbg-badge--running :global(.bbg-badge__icon) {
    color: var(--bbg-blue);
    animation: bbg-badge-spin 1.2s linear infinite;
  }

  .bbg-badge--neutral {
    background: rgba(255, 255, 255, 0.04);
    border-color: var(--bbg-border);
  }
  .bbg-badge--neutral :global(.bbg-badge__icon) {
    color: var(--bbg-ink-soft);
  }

  /* ── live state glow ───────────────────────────────────── */
  .bbg-badge--pulse {
    animation: bbg-badge-pulse 2s ease-in-out infinite;
  }

  @keyframes bbg-badge-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bbg-badge-pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 var(--bbg-pulse-glow, rgba(61, 214, 140, 0));
    }
    50% {
      box-shadow: 0 0 0 5px var(--bbg-pulse-glow, rgba(61, 214, 140, 0.18));
    }
  }
</style>
