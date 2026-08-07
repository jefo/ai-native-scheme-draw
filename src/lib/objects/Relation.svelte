<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Relation — связь между сущностями.
   *  Канал кодирования: СОЕДИНЕНИЕ. Визуальные варианты: arrow, line, dashed, magnet, chain.
   *  Бинарна (арность 2) — соединяет ≥2 Entity. */
  let {
    label = '',
    variant = 'arrow',
    children,
  }: {
    label?: string;
    variant?: 'arrow' | 'line' | 'dashed' | 'magnet' | 'chain';
    children?: Snippet;
  } = $props();
</script>

<div class="relation relation--{variant}" title="Relation: {label || 'связь'}">
  <span class="relation__dot"></span>
  <span class="relation__body">
    {#if variant === 'arrow'}
      <svg viewBox="0 0 60 12" width="60" height="12" aria-hidden="true">
        <line x1="4" y1="6" x2="44" y2="6" stroke="currentColor" stroke-width="1.5" />
        <polygon points="58,6 44,0 44,12" fill="currentColor" />
      </svg>
    {:else if variant === 'line'}
      <svg viewBox="0 0 60 12" width="60" height="12" aria-hidden="true">
        <line x1="4" y1="6" x2="56" y2="6" stroke="currentColor" stroke-width="1.5" />
      </svg>
    {:else if variant === 'dashed'}
      <svg viewBox="0 0 60 12" width="60" height="12" aria-hidden="true">
        <line x1="4" y1="6" x2="56" y2="6" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" />
      </svg>
    {:else if variant === 'magnet'}
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <path d="M5 3v5a4 4 0 0 0 8 0V3" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <line x1="7" y1="3" x2="11" y2="3" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    {:else if variant === 'chain'}
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <circle cx="5" cy="6" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <circle cx="13" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5" fill="none"/>
        <line x1="7" y1="7.5" x2="11" y2="10.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    {/if}
    {#if children}
      <span class="relation__inline">{@render children()}</span>
    {/if}
  </span>
  <span class="relation__dot"></span>
  {#if label}
    <span class="relation__label">{label}</span>
  {/if}
</div>

<style>
  .relation {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--vnp-ink-soft);
    font-size: 12px;
    font-style: italic;
    white-space: nowrap;
    transition: color 0.2s ease;
  }
  .relation:hover {
    color: var(--vnp-ink);
  }
  .relation__body {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .relation__inline {
    font-style: normal;
    font-weight: 600;
    padding: 0 4px;
    color: var(--vnp-ink);
  }
  .relation__dot {
    width: 4px;
    height: 4px;
    border-radius: 1px;
    background: currentColor;
  }
  .relation__label {
    color: var(--vnp-ink-soft);
    font-style: italic;
  }

  /* active relation → mint */
  .relation--magnet {
    color: var(--vnp-good);
  }
</style>
