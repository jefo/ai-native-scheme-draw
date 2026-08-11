<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** vertical = comparison splitter between two columns */
    orientation?: 'horizontal' | 'vertical';
    /** optional centered mono label */
    label?: string;
    tone?: 'default' | 'blue' | 'green' | 'amber' | 'red';
    class?: string;
    /** extra content flanking the label (e.g. an Icon) */
    children?: Snippet;
  }

  let { orientation = 'horizontal', label, tone = 'default', class: className, children }: Props =
    $props();
</script>

<div
  class="bbg-divider bbg-divider--{orientation} bbg-divider--{tone} {className ?? ''}"
  class:bbg-divider--labeled={label || children}
>
  {#if orientation === 'horizontal' && (label || children)}
    <span class="bbg-divider__label">
      {#if children}
        {@render children()}
      {/if}
      {#if label}
        <span class="bbg-divider__text">{label}</span>
      {/if}
    </span>
  {/if}
</div>

<style>
  .bbg-divider {
    --bbg-divider-color: var(--bbg-border-strong);
    display: flex;
    align-items: center;
    flex: none;
  }

  /* ── horizontal ─────────────────────────────────────────── */
  .bbg-divider--horizontal {
    flex-direction: row;
    gap: 10px;
    width: 100%;
  }

  .bbg-divider--horizontal::before,
  .bbg-divider--horizontal::after {
    content: '';
    height: 1px;
    background: var(--bbg-divider-color);
    flex: 1;
  }

  .bbg-divider--labeled::before,
  .bbg-divider--labeled::after {
    flex: 1;
  }

  /* ── vertical ───────────────────────────────────────────── */
  .bbg-divider--vertical {
    flex-direction: column;
    width: 1px;
    min-height: 60px;
    align-self: stretch;
  }

  .bbg-divider--vertical::before {
    content: '';
    width: 1px;
    background: var(--bbg-divider-color);
    flex: 1;
  }

  .bbg-divider__label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: var(--bbg-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
  }

  /* ── tones ──────────────────────────────────────────────── */
  .bbg-divider--blue {
    --bbg-divider-color: var(--bbg-blue-border);
  }
  .bbg-divider--green {
    --bbg-divider-color: var(--bbg-green-border);
  }
  .bbg-divider--amber {
    --bbg-divider-color: var(--bbg-amber-border);
  }
  .bbg-divider--red {
    --bbg-divider-color: var(--bbg-red-border);
  }
  .bbg-divider--blue .bbg-divider__label {
    color: var(--bbg-blue);
  }
  .bbg-divider--green .bbg-divider__label {
    color: var(--bbg-green);
  }
  .bbg-divider--amber .bbg-divider__label {
    color: var(--bbg-amber);
  }
  .bbg-divider--red .bbg-divider__label {
    color: var(--bbg-red);
  }
</style>
