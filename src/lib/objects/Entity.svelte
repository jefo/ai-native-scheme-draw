<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Entity — сущность: то, что существует.
   *  Канал кодирования: ФОРМА. Визуальные варианты: card, icon, avatar, cube, circle, plate.
   *  Самодостаточный объект (арность 0) — подложка для State/Value/Relation/Event. */
  let {
    label = '',
    variant = 'card',
    children,
  }: {
    label?: string;
    variant?: 'card' | 'icon' | 'avatar' | 'cube' | 'circle' | 'plate';
    children?: Snippet;
  } = $props();
</script>

<div class="entity entity--{variant}" title="Entity: {label || 'сущность'}">
  {#if children}
    {@render children()}
  {:else}
    {#if variant === 'avatar'}
      <span class="entity__avatar">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="5" r="3" stroke="currentColor" stroke-width="1.5"/>
          <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </span>
    {:else if variant === 'icon'}
      <span class="entity__icon">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.5"/>
        </svg>
      </span>
    {:else if variant === 'cube'}
      <span class="entity__cube"></span>
    {:else if variant === 'circle'}
      <span class="entity__circle"></span>
    {/if}
    {#if label}
      <span class="entity__label">{label}</span>
    {/if}
  {/if}
</div>

<style>
  .entity {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: var(--vnp-border);
    background: var(--vnp-card);
    border-radius: var(--vnp-radius);
    padding: 8px 14px;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    color: var(--vnp-ink);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .entity:hover {
    background: var(--vnp-card-raised);
    border-color: var(--vnp-border-color-active);
  }
  .entity:focus-visible {
    outline: 1px solid var(--vnp-good);
    outline-offset: 2px;
  }

  .entity--circle {
    border-radius: var(--vnp-radius);
    padding: 8px 14px;
  }
  .entity--plate {
    border: var(--vnp-border-soft);
    background: transparent;
  }
  .entity--plate:hover {
    background: rgba(255, 255, 255, 0.03);
  }
  .entity--cube {
    transform: rotate(-1deg);
  }
  .entity--avatar {
    padding: 5px 14px 5px 8px;
    border-radius: var(--vnp-radius);
  }

  .entity__icon {
    display: flex;
    align-items: center;
    color: var(--vnp-ink-soft);
  }
  .entity__avatar {
    display: flex;
    align-items: center;
    color: var(--vnp-ink-soft);
  }
  .entity__cube {
    width: 12px;
    height: 12px;
    border: 1px solid var(--vnp-border-color-active);
    transform: rotate(45deg);
    display: inline-block;
  }
  .entity__circle {
    width: 10px;
    height: 10px;
    border: 1px solid var(--vnp-border-color-active);
    border-radius: 2px;
    display: inline-block;
  }
</style>
