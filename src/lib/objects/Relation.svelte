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
        <line x1="0" y1="6" x2="46" y2="6" stroke="currentColor" stroke-width="2.5" />
        <polygon points="60,6 44,0 44,12" fill="currentColor" />
      </svg>
    {:else if variant === 'line'}
      <svg viewBox="0 0 60 12" width="60" height="12" aria-hidden="true">
        <line x1="0" y1="6" x2="60" y2="6" stroke="currentColor" stroke-width="2.5" />
      </svg>
    {:else if variant === 'dashed'}
      <svg viewBox="0 0 60 12" width="60" height="12" aria-hidden="true">
        <line x1="0" y1="6" x2="60" y2="6" stroke="currentColor" stroke-width="2.5" stroke-dasharray="6 5" />
      </svg>
    {:else if variant === 'magnet'}
      <span class="relation__magnet">🧲</span>
    {:else if variant === 'chain'}
      <span class="relation__chain">⛓</span>
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
    color: var(--vnp-ink);
    font-size: 13px;
    font-style: italic;
    white-space: nowrap;
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
  }
  .relation__dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: currentColor;
  }
  .relation__magnet,
  .relation__chain {
    font-size: 16px;
  }
  .relation__label {
    color: var(--vnp-ink-soft);
  }
</style>
