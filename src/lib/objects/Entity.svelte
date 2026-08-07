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
      <span class="entity__avatar">👤</span>
    {:else if variant === 'icon'}
      <span class="entity__icon">◈</span>
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
    padding: 10px 16px;
    font-weight: 600;
    white-space: nowrap;
    box-shadow: 2px 3px 0 rgba(28, 28, 28, 0.12);
  }
  .entity--circle {
    border-radius: 999px;
  }
  .entity--plate {
    border: var(--vnp-border-soft);
    background: transparent;
  }
  .entity--cube {
    transform: rotate(-2deg);
  }
  .entity--avatar {
    border-radius: 999px;
    padding: 6px 16px 6px 8px;
  }
  .entity__icon {
    font-size: 20px;
    color: var(--vnp-ink-soft);
  }
  .entity__avatar {
    font-size: 18px;
  }
  .entity__cube {
    width: 14px;
    height: 14px;
    border: 2px solid var(--vnp-ink);
    transform: rotate(45deg);
    display: inline-block;
  }
  .entity__circle {
    width: 14px;
    height: 14px;
    border: 2px solid var(--vnp-ink);
    border-radius: 999px;
    display: inline-block;
  }
</style>
