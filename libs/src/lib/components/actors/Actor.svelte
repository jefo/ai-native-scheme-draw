<script lang="ts">
  import Icon from '../icons/Icon.svelte';

  export type ActorRole = 'engineer' | 'analyst' | 'user';
  export type ActorMood = 'neutral' | 'happy' | 'sad';

  interface Props {
    label: string;
    role?: ActorRole;
    mood?: ActorMood;
    /** recede to 35% opacity — "who is not the focus right now" */
    dim?: boolean;
    size?: 'sm' | 'md' | 'lg';
    class?: string;
  }

  let { label, role = 'analyst', mood = 'neutral', dim = false, size = 'md', class: className }: Props =
    $props();

  const SIZE: Record<NonNullable<Props['size']>, number> = {
    sm: 20,
    md: 26,
    lg: 34,
  };

  const ROLE_TAG: Record<ActorRole, string> = {
    engineer: 'engineer',
    analyst: 'analyst',
    user: 'user',
  };

  // accessory overlays aligned to the 24x24 user glyph (head at 12,8.2)
  const ACCESSORY: Record<ActorRole, string | null> = {
    engineer: 'glasses', // two dots on the head
    analyst: null,
    user: null,
  };
</script>

<figure
  class="bbg-actor bbg-actor--{size} bbg-actor--{mood} {className ?? ''}"
  class:bbg-actor--dim={dim}
>
  <span class="bbg-actor__glyph">
    <Icon name="user" size={SIZE[size]} />
    {#if ACCESSORY[role] === 'glasses'}
      <span class="bbg-actor__glasses" aria-hidden="true">
        <i></i>
        <i></i>
      </span>
    {/if}
  </span>
  <figcaption class="bbg-actor__caption">
    <span class="bbg-actor__name">{label}</span>
    <span class="bbg-actor__role">{ROLE_TAG[role]}</span>
  </figcaption>
</figure>

<style>
  .bbg-actor {
    --bbg-actor-color: var(--bbg-ink);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin: 0;
    text-align: center;
  }

  .bbg-actor--dim {
    opacity: var(--bbg-dim-opacity);
    transition: opacity 0.2s ease;
  }

  .bbg-actor__glyph {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--bbg-panel);
    border: 1px solid var(--bbg-border);
    color: var(--bbg-actor-color);
  }

  .bbg-actor--sm .bbg-actor__glyph {
    width: 48px;
    height: 48px;
  }
  .bbg-actor--lg .bbg-actor__glyph {
    width: 78px;
    height: 78px;
  }

  /* mood colors the person */
  .bbg-actor--happy {
    --bbg-actor-color: var(--bbg-green);
  }
  .bbg-actor--sad {
    --bbg-actor-color: var(--bbg-amber);
  }
  .bbg-actor--sad .bbg-actor__glyph {
    border-color: var(--bbg-amber-border);
    background: var(--bbg-amber-dim);
  }
  .bbg-actor--happy .bbg-actor__glyph {
    border-color: var(--bbg-green-border);
    background: var(--bbg-green-dim);
  }

  /* engineer glasses: two dots over the head circle */
  .bbg-actor__glasses {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  .bbg-actor__glasses i {
    position: absolute;
    top: 34%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--bbg-actor-color);
  }

  .bbg-actor__glasses i:first-child {
    left: calc(50% - 8px);
  }
  .bbg-actor__glasses i:last-child {
    left: calc(50% + 4px);
  }

  .bbg-actor__caption {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .bbg-actor__name {
    font-size: 16px;
    font-weight: 600;
    color: var(--bbg-ink);
    line-height: 1.2;
  }

  .bbg-actor__role {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
    line-height: 1.2;
  }
</style>
