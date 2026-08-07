<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from '../icons/Icon.svelte';

  /** Entity — сущность: то, что существует.
   *  Канал кодирования: ФОРМА + ИКОНОГРАФИЯ.
   *  `icon` prop принимает ключ из библиотеки (25 domain-specific outline icons).
   *  Варианты (card, cube, circle, plate, avatar) — геометрические модификаторы. */
  let {
    label = '',
    variant = 'card',
    icon = '',
    children,
  }: {
    label?: string;
    variant?: 'card' | 'icon' | 'avatar' | 'cube' | 'circle' | 'plate';
    icon?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="entity entity--{variant}" title="Entity: {label || 'сущность'}">
  {#if children}
    {@render children()}
  {:else}
    {#if icon}
      <span class="entity__ico"><Icon name={icon} /></span>
    {:else if variant === 'avatar'}
      <span class="entity__ico"><Icon name="user" /></span>
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
    gap: 7px;
    border: 1px solid var(--vnp-color-entity-border);
    background:
      linear-gradient(var(--vnp-color-entity-dim), var(--vnp-color-entity-dim)),
      var(--vnp-card);
    border-radius: var(--vnp-radius);
    padding: 8px 14px;
    font-weight: 600;
    font-size: 14px;
    white-space: nowrap;
    color: var(--vnp-ink);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .entity:hover {
    background:
      linear-gradient(var(--vnp-color-entity-dim), var(--vnp-color-entity-dim)),
      var(--vnp-card-raised);
    border-color: rgba(45, 212, 191, 0.2);
  }
  .entity:focus-visible {
    outline: 1px solid var(--vnp-good);
    outline-offset: 2px;
  }

  .entity__ico {
    display: flex;
    align-items: center;
    color: var(--vnp-color-entity);
    flex-shrink: 0;
  }
  .entity__label {
    color: var(--vnp-ink);
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
  .entity--plate .entity__ico {
    color: var(--vnp-ink-soft);
  }
  .entity--cube {
    transform: rotate(-1deg);
  }
  .entity--avatar {
    padding: 5px 14px 5px 8px;
    border-radius: var(--vnp-radius);
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
