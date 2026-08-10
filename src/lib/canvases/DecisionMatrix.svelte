<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DecisionCandidateDef } from './types';

  /** DecisionMatrix — операция мышления: отфильтровать кандидатов критериями.
   *
   *  Критерии (constraints) сверху → кандидаты снизу с вердиктами.
   *  pass = ✓ зелёный, partial = ~ янтарный, fail = ✗ розовый (приглушён).
   *  Dual API: data (criteria + candidates) + named slots. */

  let {
    criteria = [] as string[],
    candidates = [] as DecisionCandidateDef[],
    criteriaSlot,
    candidatesSlot,
    children,
  }: {
    criteria?: string[];
    candidates?: DecisionCandidateDef[];
    criteriaSlot?: Snippet;
    candidatesSlot?: Snippet;
    children?: Snippet;
  } = $props();

  function verdictMark(v: string): string {
    return v === 'pass' ? '✓' : v === 'partial' ? '~' : '✗';
  }
</script>

<div class="dmx">
  {#if children}
    {@render children()}
  {:else}
    <!-- criteria zone -->
    {#if criteriaSlot || criteria.length > 0}
      <div class="dmx__criteria">
        {#if criteriaSlot}
          {@render criteriaSlot()}
        {:else}
          {#each criteria as c}
            <span class="dmx__criterion">{c}</span>
          {/each}
        {/if}
      </div>
    {/if}

    <!-- candidates zone -->
    {#if candidatesSlot || candidates.length > 0}
      <div class="dmx__candidates">
        {#if candidatesSlot}
          {@render candidatesSlot()}
        {:else}
          {#each candidates as c}
            <div class="dmx__cand dmx__cand--{c.verdict}">
              <span class="dmx__cand-name">{c.name}</span>
              <span class="dmx__cand-mark">{verdictMark(c.verdict)}</span>
              <span class="dmx__cand-why">{c.why}</span>
            </div>
          {/each}
        {/if}
      </div>
    {/if}
  {/if}
</div>

<style>
  .dmx {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 16px 22px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* criteria chips */
  .dmx__criteria {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: center;
    padding: 10px 16px;
    border: var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .dmx__criterion {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    padding: 4px 10px;
    border: 1px solid color-mix(in srgb, var(--canvas-sticky-yellow-border) 40%, transparent);
    border-radius: 4px;
    background: color-mix(in srgb, var(--canvas-sticky-yellow) 12%, transparent);
  }

  /* candidates */
  .dmx__candidates {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    width: 100%;
  }
  .dmx__cand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 14px 18px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 28%, transparent);
    background: var(--canvas-panel-bg);
    min-width: 130px;
    flex: 1 1 0;
  }
  .dmx__cand--pass {
    border-color: var(--canvas-sticky-green-border);
  }
  .dmx__cand--partial {
    border-color: var(--canvas-sticky-yellow-border);
  }
  .dmx__cand--fail {
    border-color: var(--canvas-sticky-pink-border);
    opacity: 0.60;
  }

  .dmx__cand-name {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
  }
  .dmx__cand-mark {
    font-family: var(--vnp-font-mono);
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }
  .dmx__cand--pass .dmx__cand-mark { color: var(--canvas-mark-check); }
  .dmx__cand--partial .dmx__cand-mark { color: var(--canvas-highlight-ink); }
  .dmx__cand--fail .dmx__cand-mark { color: var(--canvas-mark-cross); }

  .dmx__cand-why {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--canvas-ink-soft);
    text-align: center;
    line-height: 1.35;
    max-width: 150px;
  }
</style>
