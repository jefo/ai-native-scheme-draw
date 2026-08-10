<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { BuyerJobDef } from './types';

  /** BuyerJobMap — операция мышления: связать workflow с buyer'ом.
   *
   *  Контекст (workflow из предыдущего шага) → provocation
   *  (зачёркнутый ложный вывод) → buyer-карточки с ролями, jobs и
   *  product shapes. Winner-путь получает зелёный акцент.
   *  Dual API: data (buyers) + named slots (memory + provocation). */

  let {
    buyers = [] as BuyerJobDef[],
    memoryLabel = '',
    memoryItems = [] as string[],
    provocation = '',
    memorySlot,
    provocationSlot,
    children,
  }: {
    buyers?: BuyerJobDef[];
    memoryLabel?: string;
    memoryItems?: string[];
    provocation?: string;
    memorySlot?: Snippet;
    provocationSlot?: Snippet;
    children?: Snippet;
  } = $props();
</script>

<div class="bjm">
  {#if children}
    {@render children()}
  {:else}
    <!-- memory zone -->
    {#if memorySlot || memoryItems.length > 0}
      <div class="bjm__memory">
        {#if memorySlot}
          {@render memorySlot()}
        {:else}
          {#if memoryLabel}
            <span class="bjm__memory-label">{memoryLabel}</span>
          {/if}
          <div class="bjm__memory-row">
            {#each memoryItems as item, i}
              <span class="bjm__memory-chip">{item}</span>
              {#if i < memoryItems.length - 1}
                <span class="bjm__memory-arrow">→</span>
              {/if}
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <!-- provocation -->
    {#if provocationSlot || provocation}
      <div class="bjm__provocation">
        {#if provocationSlot}
          {@render provocationSlot()}
        {:else}
          <span class="bjm__provocation-label">{provocation}</span>
          <span class="bjm__provocation-strike"></span>
        {/if}
      </div>
    {/if}

    <!-- buyer cards -->
    <div class="bjm__buyers">
      {#each buyers as b}
        <div class="bjm__buyer" class:bjm__buyer--winner={b.winner}>
          <span class="bjm__buyer-role">{b.role}</span>
          <span class="bjm__buyer-job">{b.job}</span>
          <span class="bjm__buyer-shape">{b.shape}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .bjm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* memory */
  .bjm__memory {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    opacity: 0.62;
  }
  .bjm__memory-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .bjm__memory-row {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .bjm__memory-chip {
    font-family: var(--vnp-font);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 4px 10px;
    border-radius: 6px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 28%, transparent);
    background: var(--canvas-panel-bg);
    color: var(--canvas-ink);
    white-space: nowrap;
  }
  .bjm__memory-arrow {
    font-size: 12px;
    color: var(--canvas-ink-soft);
    opacity: 0.3;
  }

  /* provocation */
  .bjm__provocation {
    position: relative;
    padding: 8px 20px;
    border: 1px solid color-mix(in srgb, var(--canvas-mark-cross) 45%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .bjm__provocation-label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--canvas-mark-cross);
  }
  .bjm__provocation-strike {
    position: absolute;
    top: 50%;
    left: 8px;
    right: 8px;
    height: 2px;
    background: var(--canvas-mark-cross);
    border-radius: 2px;
    transform: translateY(-50%) rotate(-6deg);
    opacity: 0.45;
  }

  /* buyers */
  .bjm__buyers {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    width: 100%;
  }
  .bjm__buyer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;
    padding: 14px 18px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 28%, transparent);
    background: var(--canvas-panel-bg);
    min-width: 160px;
    flex: 1 1 0;
  }
  .bjm__buyer--winner {
    border-color: var(--canvas-sticky-green-border);
    box-shadow: 0 0 14px color-mix(in srgb, var(--canvas-sticky-green-border) 16%, transparent);
  }
  .bjm__buyer-role {
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
  }
  .bjm__buyer-job {
    font-family: var(--vnp-font);
    font-size: 12px;
    line-height: 1.4;
    color: var(--canvas-ink-soft);
    text-align: center;
    max-width: 180px;
  }
  .bjm__buyer-shape {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--vnp-info);
    padding: 3px 10px;
    border: 1px solid var(--canvas-sticky-blue-border);
    border-radius: 4px;
    background: var(--canvas-sticky-blue);
  }
</style>
