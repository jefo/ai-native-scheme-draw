<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';
  import type { OpportunityDef, SolutionState } from './types';

  /** OpportunitySolutionTree — outcome → opportunities → solutions.
   *
   *  Канон Teresa Torres: root = outcome, ветви = opportunities,
   *  листья = solutions (chosen = зелёный highlight, alternative = dimmed).
   *  Winner path получает визуальный акцент (amber border на opportunity).
   *  Dual API: data props + children slot. */

  let {
    outcome = '',
    opportunities = [] as OpportunityDef[],
    outcomeSlot,
    children,
  }: {
    outcome?: string;
    opportunities?: OpportunityDef[];
    outcomeSlot?: Snippet;
    children?: Snippet;
  } = $props();

  function oppIsWinner(opp: OpportunityDef): boolean {
    return opp.solutions.some(s => s.state === 'chosen');
  }

  function solutionColor(state: SolutionState): 'green' | 'pink' {
    return state === 'chosen' ? 'green' : 'pink';
  }
</script>

<div class="ost">
  {#if children}
    {@render children()}
  {:else}
    <!-- root — outcome -->
    <div class="ost__outcome">
      {#if outcomeSlot}
        {@render outcomeSlot()}
      {:else}
        <span class="ost__outcome-label">{outcome}</span>
      {/if}
    </div>

    <!-- branches — opportunities -->
    <div class="ost__branches">
      {#each opportunities as opp (opp.name)}
        <div class="ost__opp" class:ost__opp--winner={oppIsWinner(opp)}>
          <span class="ost__opp-name">{opp.name}</span>
          {#if oppIsWinner(opp)}
            <span class="ost__opp-badge">✓</span>
          {/if}
          <!-- solutions under this opportunity -->
          {#if opp.solutions.length > 0}
            <div class="ost__solutions">
              {#each opp.solutions as sol}
                {#if sol.state === 'chosen'}
                  <StickyNote color="green" label={sol.name} mark="check" />
                {:else}
                  <StickyNote color="pink" label={sol.name} mark="cross" />
                {/if}
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .ost {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow-y: auto;
  }

  /* ── outcome (root) ── */
  .ost__outcome {
    display: flex;
    justify-content: center;
    padding: 10px 22px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .ost__outcome-label {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 700;
    color: var(--canvas-ink);
    text-align: center;
  }

  /* ── branches row ── */
  .ost__branches {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
  }
  /* horizontal connector from root to branches (CSS-only) */
  .ost__branches::before {
    content: '';
    position: absolute;
    top: -18px;
    left: 10%;
    right: 10%;
    height: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
  }

  /* ── opportunity column ── */
  .ost__opp {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    min-width: 130px;
    position: relative;
  }
  /* vertical connector from horizontal line to each opportunity */
  .ost__opp::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    width: 1px;
    height: 14px;
    background: rgba(255, 255, 255, 0.10);
  }
  .ost__opp--winner {
    border-color: rgba(251, 191, 36, 0.50);
    background: rgba(251, 191, 36, 0.05);
  }
  .ost__opp-name {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    color: var(--canvas-ink);
    text-align: center;
  }
  .ost__opp-badge {
    font-size: 10px;
    color: var(--canvas-mark-check);
    margin-top: -6px;
  }

  .ost__solutions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
  }
</style>
