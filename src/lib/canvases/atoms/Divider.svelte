<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Divider — hairline-разделитель с опциональной подписью по центру. */
  let {
    label,
    children,
  }: {
    label?: string;
    children?: Snippet;
  } = $props();
</script>

{#if label || children}
  <div class="divider" role="separator">
    <span class="divider__line"></span>
    <span class="divider__content">{#if children}{@render children()}{:else}{label}{/if}</span>
    <span class="divider__line"></span>
  </div>
{:else}
  <div class="divider" role="separator">
    <span class="divider__line"></span>
  </div>
{/if}

<style>
  .divider {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .divider__line {
    flex: 1 1 auto;
    height: 1px;
    background: var(--canvas-plot-axis);
  }
  .divider__content {
    flex: 0 0 auto;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--canvas-ink-soft);
  }
</style>
