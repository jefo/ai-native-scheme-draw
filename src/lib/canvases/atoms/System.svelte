<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Граница среды: шаги внутри выполняются в её контексте.
   *  Шаги — дети; канвас рисует их в горизонтальном треке внутри полосы. */
  let {
    label,
    children,
  }: {
    label: string;
    children?: Snippet;
  } = $props();
</script>

<div class="uf-step uf-system">
  <span class="uf-system__label">{label}</span>
  <div class="uf-system__track">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style>
  .uf-system {
    position: relative;
    border: 1px dashed var(--canvas-sticky-blue-border);
    background: color-mix(in srgb, var(--canvas-sticky-blue-border) 7%, transparent);
    border-radius: 8px;
    padding: 18px 16px 12px;
  }
  .uf-system__label {
    position: absolute;
    top: -9px;
    left: 14px;
    background: var(--vnp-card);
    padding: 0 6px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--vnp-info);
    white-space: nowrap;
  }
  .uf-system__track {
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>
