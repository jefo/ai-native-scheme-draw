<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Zone — semantic placement.
   *  Внутри <Grid>: name → именованная область (grid-area).
   *  Вне сетки: placement — safe-top / safe-bottom / fill / center
   *  относительно Stage (safe зоны Shorts через --stage-safe-*). */
  let {
    name,
    placement,
    children,
  }: {
    name?: string;
    placement?: 'safe-top' | 'safe-bottom' | 'fill' | 'center';
    children?: Snippet;
  } = $props();
</script>

{#if placement}
  <div class="zone zone--{placement}">
    {#if children}{@render children()}{/if}
  </div>
{:else if name}
  <div class="zone" style="grid-area: {name};">
    {#if children}{@render children()}{/if}
  </div>
{:else}
  <div class="zone">
    {#if children}{@render children()}{/if}
  </div>
{/if}

<style>
  .zone {
    min-width: 0;
    min-height: 0;
  }
  .zone--safe-top {
    position: absolute;
    top: var(--stage-safe-top);
    left: var(--stage-safe-left);
    right: var(--stage-safe-right);
  }
  .zone--safe-bottom {
    position: absolute;
    bottom: var(--stage-safe-bottom);
    left: var(--stage-safe-left);
    right: var(--stage-safe-right);
  }
  .zone--fill {
    position: absolute;
    inset: 0;
  }
  .zone--center {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
