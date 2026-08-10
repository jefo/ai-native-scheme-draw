<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { CausalStepDef } from './types';

  /** CausalChain — операция мышления: показать причинный механизм.
   *
   *  Вертикальная цепочка «почему X ведёт к Y»: каждый шаг —
   *  from-чип → стрелка ↓, аннотированная механизмом → to-чип.
   *  Следующий шаг стартует с предыдущего to. */

  let {
    steps = [] as CausalStepDef[],
    children,
  }: {
    steps?: CausalStepDef[];
    children?: Snippet;
  } = $props();
</script>

<div class="cchain">
  {#if children}
    {@render children()}
  {:else}
    {#each steps as step, i (step.from + '→' + step.to)}
      {#if i > 0}
        <span class="cchain__link-gap" aria-hidden="true"></span>
      {/if}
      <span class="cchain__chip">{step.from}</span>
      <span class="cchain__arrow" aria-hidden="true">↓</span>
      <span class="cchain__mech">{step.mechanism}</span>
      <span class="cchain__chip">{step.to}</span>
    {/each}
  {/if}
</div>

<style>
  .cchain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── from/to chip: neutral glass ── */
  .cchain__chip {
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 9px 16px;
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
    max-width: 100%;
    box-sizing: border-box;
  }

  /* ── mechanism annotation: arrow + labelled chip ── */
  .cchain__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 16px;
    color: var(--canvas-ink-soft);
    opacity: 0.5;
    line-height: 1;
  }

  .cchain__mech {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    padding: 3px 10px;
    border-radius: 4px;
    border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 35%, transparent);
    background: color-mix(in srgb, var(--canvas-sticky-yellow) 10%, transparent);
    text-align: center;
  }

  /* ── gap between steps ── */
  .cchain__link-gap {
    height: 2px;
  }
</style>
