<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';
  import type { CustomerProfileMetricDef } from './types';

  /** CustomerProfile — портрет buyer'а: кто, что делает, что мешает.
   *
   *  Каноническая форма: заголовок-роль → метрики → jobs (amber) → pains (rose)
   *  → цена продукта (callout). Dual API: data props + named slots. */

  let {
    role = '',
    metrics = [] as CustomerProfileMetricDef[],
    jobs = [] as string[],
    pains = [] as string[],
    productPrice = '' as string,
    roleSlot,
    metricsSlot,
    jobsSlot,
    painsSlot,
    priceSlot,
    children,
  }: {
    role?: string;
    metrics?: CustomerProfileMetricDef[];
    jobs?: string[];
    pains?: string[];
    productPrice?: string;
    roleSlot?: Snippet;
    metricsSlot?: Snippet;
    jobsSlot?: Snippet;
    painsSlot?: Snippet;
    priceSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="cp">
  {#if children}
    {@render children()}
  {:else}
    <!-- ═══ role header ═══ -->
    {#if roleSlot}
      {@render roleSlot()}
    {:else if role}
      <h3 class="cp__role">{role}</h3>
    {/if}

    <!-- ═══ metrics (budget / goal / bottleneck) ═══ -->
    {#if metricsSlot}
      {@render metricsSlot()}
    {:else if metrics.length > 0}
      <div class="cp__metrics">
        {#each metrics as m}
          <div class="cp__metric">
            <span class="cp__metric-label">{m.label}</span>
            <span class="cp__metric-value">{m.value}</span>
          </div>
        {/each}
      </div>
    {/if}

    <!-- ═══ jobs (JTBD — amber chips) ═══ -->
    {#if jobs.length > 0 || jobsSlot}
      <div class="cp__section">
        <h4 class="cp__section-title">Jobs</h4>
        <div class="cp__chips">
          {#if jobsSlot}
            {@render jobsSlot()}
          {:else}
            {#each jobs as j}
              <StickyNote color="yellow" label={j} />
            {/each}
          {/if}
        </div>
      </div>
    {/if}

    <!-- ═══ pains (rose chips) ═══ -->
    {#if pains.length > 0 || painsSlot}
      <div class="cp__section">
        <h4 class="cp__section-title">Pains</h4>
        <div class="cp__chips">
          {#if painsSlot}
            {@render painsSlot()}
          {:else}
            {#each pains as p}
              <StickyNote color="pink" label={p} />
            {/each}
          {/if}
        </div>
      </div>
    {/if}

    <!-- ═══ product price callout ═══ -->
    {#if productPrice || priceSlot}
      <div class="cp__price">
        <span class="cp__price-line"></span>
        {#if priceSlot}
          {@render priceSlot()}
        {:else}
          <span class="cp__price-value">{productPrice}</span>
        {/if}
        <span class="cp__price-line"></span>
      </div>
    {/if}
  {/if}
</div>

<style>
  .cp {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 18px 24px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow-y: auto;
  }

  /* ── role ── */
  .cp__role {
    font-family: var(--vnp-font);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
    text-transform: uppercase;
    margin: 0 0 2px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    width: 100%;
  }

  /* ── metrics ── */
  .cp__metrics {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .cp__metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  .cp__metric-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .cp__metric-value {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 600;
    color: var(--canvas-ink);
  }

  /* ── section (jobs / pains) ── */
  .cp__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  .cp__section-title {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: var(--canvas-ink-soft);
    margin: 0;
    text-align: center;
  }
  .cp__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  /* ── price callout ── */
  .cp__price {
    display: flex;
    align-items: center;
    gap: 14px;
    width: 100%;
    margin-top: 4px;
  }
  .cp__price-line {
    flex: 1 1 auto;
    height: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
  }
  .cp__price-value {
    font-family: var(--vnp-font);
    font-size: 22px;
    font-weight: 700;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
