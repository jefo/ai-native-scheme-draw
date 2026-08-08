<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';
  import CanvasSection from './molecules/CanvasSection.svelte';

  /**
   * Lean Canvas (Ash Maurya) — каноническая сетка 9 блоков.
   *
   * Канон сетки (3 колонки × 4 ряда):
   *   problem (высокий, 2 ряда) | solution            | key metrics
   *   (продолжение problem)     | uvp (highlight)     | unfair advantage
   *   channels                  | customer segments   | cost structure
   *   revenue streams (во всю ширину)
   *
   * Dual API на каждый блок: data (string[]) → дефолтные стикеры,
   * либо named slot для полного контроля.
   */
  let {
    problem = [],
    solution = [],
    keyMetrics = [],
    uvp = [],
    unfairAdvantage = [],
    channels = [],
    customerSegments = [],
    costStructure = [],
    revenueStreams = [],
    problemSlot,
    solutionSlot,
    keyMetricsSlot,
    uvpSlot,
    unfairAdvantageSlot,
    channelsSlot,
    customerSegmentsSlot,
    costStructureSlot,
    revenueStreamsSlot,
  }: {
    problem?: string[];
    solution?: string[];
    keyMetrics?: string[];
    uvp?: string[];
    unfairAdvantage?: string[];
    channels?: string[];
    customerSegments?: string[];
    costStructure?: string[];
    revenueStreams?: string[];
    problemSlot?: Snippet;
    solutionSlot?: Snippet;
    keyMetricsSlot?: Snippet;
    uvpSlot?: Snippet;
    unfairAdvantageSlot?: Snippet;
    channelsSlot?: Snippet;
    customerSegmentsSlot?: Snippet;
    costStructureSlot?: Snippet;
    revenueStreamsSlot?: Snippet;
  } = $props();
</script>

<div class="lc">
  <div class="lc__grid">
    <!-- ═══ Problem: высокая колонка (2 ряда), подсказка канона ═══ -->
    <CanvasSection label="Problem" area="problem" hint="Existing Alternatives">
      {#if problemSlot}
        {@render problemSlot()}
      {:else}
        {#each problem as item}
          <StickyNote color="pink" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Solution" area="solution">
      {#if solutionSlot}
        {@render solutionSlot()}
      {:else}
        {#each solution as item}
          <StickyNote color="green" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Key Metrics" area="metrics">
      {#if keyMetricsSlot}
        {@render keyMetricsSlot()}
      {:else}
        {#each keyMetrics as item}
          <StickyNote color="blue" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <!-- ═══ UVP: центральная ячейка, highlight-тон ═══ -->
    <CanvasSection label="Unique Value Proposition" area="uvp" tone="highlight">
      {#if uvpSlot}
        {@render uvpSlot()}
      {:else}
        {#each uvp as item}
          <StickyNote color="orange" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Unfair Advantage" area="advantage">
      {#if unfairAdvantageSlot}
        {@render unfairAdvantageSlot()}
      {:else}
        {#each unfairAdvantage as item}
          <StickyNote color="purple" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Channels" area="channels">
      {#if channelsSlot}
        {@render channelsSlot()}
      {:else}
        {#each channels as item}
          <StickyNote color="blue" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Customer Segments" area="segments" hint="Early Adopters">
      {#if customerSegmentsSlot}
        {@render customerSegmentsSlot()}
      {:else}
        {#each customerSegments as item}
          <StickyNote color="yellow" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <CanvasSection label="Cost Structure" area="cost">
      {#if costStructureSlot}
        {@render costStructureSlot()}
      {:else}
        {#each costStructure as item}
          <StickyNote color="pink" label={item} />
        {/each}
      {/if}
    </CanvasSection>

    <!-- ═══ Revenue: во всю ширину снизу ═══ -->
    <CanvasSection label="Revenue Streams" area="revenue">
      {#if revenueStreamsSlot}
        {@render revenueStreamsSlot()}
      {:else}
        {#each revenueStreams as item}
          <StickyNote color="green" label={item} />
        {/each}
      {/if}
    </CanvasSection>
  </div>
</div>

<style>
  .lc {
    width: 100%;
    height: 100%;
    padding: 10px;
  }

  .lc__grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr auto;
    grid-template-areas:
      'problem solution metrics'
      'problem uvp advantage'
      'channels segments cost'
      'revenue revenue revenue';
    gap: 10px;
    height: 100%;
  }

  /* ── responsive: на узких экранах вертикальный стек ── */
  @media (max-width: 520px) {
    .lc__grid {
      grid-template-columns: 1fr;
      grid-template-rows: none;
      grid-template-areas:
        'problem'
        'solution'
        'metrics'
        'uvp'
        'advantage'
        'channels'
        'segments'
        'cost'
        'revenue';
    }
  }
</style>
