<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../icons/Icon.svelte';
  import type { IconName } from '../icons/icons';

  export type PanelTone = 'default' | 'blue' | 'green' | 'amber' | 'red';

  interface Props {
    /** mono uppercase header label */
    label?: string;
    icon?: IconName;
    /** colored border + tinted header */
    tone?: PanelTone;
    /** small chip at the right of the header (e.g. "S3", "v2") */
    badge?: string;
    /** `inset` = nested depth look for layer stacks */
    variant?: 'card' | 'inset';
    class?: string;
    children?: Snippet;
  }

  let {
    label,
    icon,
    tone = 'default',
    badge,
    variant = 'card',
    class: className,
    children,
  }: Props = $props();
</script>

<section
  class="bbg-panel bbg-panel--{variant} bbg-panel--{tone} {className ?? ''}"
  class:bbg-panel--bare={!label && !icon && !badge}
>
  {#if label || icon || badge}
    <header class="bbg-panel__head">
      {#if icon}
        <Icon name={icon} size={14} class="bbg-panel__icon" />
      {/if}
      {#if label}
        <span class="bbg-panel__label">{label}</span>
      {/if}
      {#if badge}
        <span class="bbg-panel__badge">{badge}</span>
      {/if}
    </header>
  {/if}
  <div class="bbg-panel__body">
    {@render children?.()}
  </div>
</section>

<style>
  .bbg-panel {
    background: var(--bbg-panel);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    padding: 12px 14px;
    min-width: 0;
  }

  .bbg-panel--inset {
    background: var(--bbg-panel-inset);
    border-radius: var(--bbg-radius-sm);
  }

  /* tone: colored border + colored header icon */
  .bbg-panel--blue {
    border-color: var(--bbg-blue-border);
  }
  .bbg-panel--green {
    border-color: var(--bbg-green-border);
  }
  .bbg-panel--amber {
    border-color: var(--bbg-amber-border);
  }
  .bbg-panel--red {
    border-color: var(--bbg-red-border);
  }

  .bbg-panel__head {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    user-select: none;
  }

  .bbg-panel__icon {
    color: var(--bbg-ink-faint);
    flex: none;
  }
  .bbg-panel--blue :global(.bbg-panel__icon) {
    color: var(--bbg-blue);
  }
  .bbg-panel--green :global(.bbg-panel__icon) {
    color: var(--bbg-green);
  }
  .bbg-panel--amber :global(.bbg-panel__icon) {
    color: var(--bbg-amber);
  }
  .bbg-panel--red :global(.bbg-panel__icon) {
    color: var(--bbg-red);
  }

  .bbg-panel__label {
    font-family: var(--bbg-font-mono);
    font-size: 10.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .bbg-panel__badge {
    margin-left: auto;
    font-family: var(--bbg-font-mono);
    font-size: 10px;
    color: var(--bbg-ink-faint);
    border: 1px solid var(--bbg-border);
    border-radius: 999px;
    padding: 1px 7px;
    white-space: nowrap;
  }

  .bbg-panel--bare {
    padding: 10px;
  }

  .bbg-panel__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
