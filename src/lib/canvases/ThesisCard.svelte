<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ThesisDef } from './types';

  /** ThesisCard — операция мышления: синтезировать продуктовую ставку.
   *
   *  Claim (текст тезиса) → anatomy (buyer / job / stake — три тега).
   *  Dual API: data (thesis) или children slot. */

  let {
    thesis = { claim: '', buyer: '', job: '', stake: '' } as ThesisDef,
    children,
  }: {
    thesis?: ThesisDef;
    children?: Snippet;
  } = $props();
</script>

<div class="ths">
  {#if children}
    {@render children()}
  {:else}
    <span class="ths__label">PRODUCT THESIS</span>

    <div class="ths__claim">
      <p class="ths__claim-text">
        {@html thesis.claim
          .replace(thesis.buyer, `<b>${thesis.buyer}</b>`)
          .replace(thesis.job, `<b>${thesis.job}</b>`)
          .replace(thesis.stake, `<b>${thesis.stake}</b>`)}
      </p>
    </div>

    <div class="ths__anatomy">
      {#if thesis.buyer}
        <span class="ths__tag"><em>buyer</em> {thesis.buyer}</span>
      {/if}
      {#if thesis.job}
        <span class="ths__sep">·</span>
        <span class="ths__tag"><em>job</em> {thesis.job}</span>
      {/if}
      {#if thesis.stake}
        <span class="ths__sep">·</span>
        <span class="ths__tag"><em>ставка</em> {thesis.stake}</span>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ths {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    padding: 20px 28px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  .ths__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--canvas-ink-soft);
  }

  .ths__claim {
    padding: 20px 28px;
    border: 1px solid var(--canvas-sticky-yellow-border);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    box-shadow:
      var(--canvas-note-shadow),
      0 0 20px color-mix(in srgb, var(--canvas-sticky-yellow-border) 20%, transparent);
    max-width: 560px;
  }
  .ths__claim-text {
    font-family: var(--vnp-font);
    font-size: 18px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
    margin: 0;
  }
  .ths__claim-text :global(b) {
    font-weight: 700;
    color: var(--vnp-info);
  }

  .ths__anatomy {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .ths__tag {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    padding: 3px 10px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent);
    border-radius: 4px;
    background: var(--canvas-panel-bg);
  }
  .ths__tag em {
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }
  .ths__sep {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--canvas-ink-soft);
    opacity: 0.35;
    align-self: center;
  }
</style>
