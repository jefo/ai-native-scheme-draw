<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { EvidenceClaimDef, EvidenceType } from './types';

  /** EvidenceMap — операция мышления: обосновать утверждение.
   *
   *  Claim (что заявляем) + grounds (почему в это верить): каждый claim —
   *  карточка с утверждением-чипом и рядом evidence-чипов разных типов
   *  (benchmark / example / counterexample / source / analogy).
   *  Dual API: data (claims) или children slot. */

  const EVIDENCE_LABELS: Record<EvidenceType, string> = {
    benchmark: 'BENCH',
    example: 'EX',
    counterexample: 'COUNTER',
    source: 'SRC',
    analogy: 'ANALOGY',
  };

  let {
    claims = [] as EvidenceClaimDef[],
    children,
  }: {
    claims?: EvidenceClaimDef[];
    children?: Snippet;
  } = $props();
</script>

<div class="evmap">
  {#if children}
    {@render children()}
  {:else}
    {#each claims as claim, i}
      {#if i > 0}
        <div class="evmap__divider"></div>
      {/if}

      <section class="evmap__claim">
        <p class="evmap__statement">{claim.statement}</p>

        {#if claim.evidence.length > 0}
          <div class="evmap__evidence">
            {#each claim.evidence as item}
              <span class="evmap__chip">
                <em class="evmap__chip-type">{EVIDENCE_LABELS[item.type]}</em>
                {item.description}
              </span>
            {/each}
          </div>
        {/if}
      </section>
    {/each}
  {/if}
</div>

<style>
  .evmap {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .evmap__divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  .evmap__claim {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 18px;
    border: 1px solid var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    flex-shrink: 0;
  }

  .evmap__statement {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.45;
    color: var(--canvas-ink);
    text-align: center;
    margin: 0;
    padding: 10px 18px;
    border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 45%, transparent);
    border-radius: 8px;
    background: color-mix(in srgb, var(--canvas-sticky-yellow) 8%, transparent);
  }

  .evmap__evidence {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .evmap__chip {
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.03em;
    color: var(--canvas-ink-soft);
    padding: 3px 9px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent);
    border-radius: 4px;
    background: var(--canvas-panel-bg);
  }

  .evmap__chip-type {
    font-style: normal;
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-highlight-ink);
  }
</style>
