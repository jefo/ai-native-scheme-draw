<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ProcessMapStageDef, ContrastSideDef } from './types';

  /** ProcessMap — две операции мышления:
   *
   *  mode="flow" (default): линейный flow стадий с акцентом на bottleneck.
   *    Каждая стадия: метка → состояние (цвет), актор (моно-лейбл), метрика.
   *
   *  mode="contrast": противопоставить одиночный вызов конвейеру.
   *    Две колонки: «как ты думаешь» (single) vs «что это на самом деле» (pipeline). */

  let {
    mode = 'flow' as 'flow' | 'contrast',
    // flow mode
    stages = [] as ProcessMapStageDef[],
    // contrast mode
    left,
    right,
    leftSlot,
    rightSlot,
    children,
  }: {
    mode?: 'flow' | 'contrast';
    stages?: ProcessMapStageDef[];
    left?: ContrastSideDef;
    right?: ContrastSideDef;
    leftSlot?: Snippet;
    rightSlot?: Snippet;
    children?: Snippet;
  } = $props();

  function stateClass(state: string): string {
    return state === 'bottleneck' ? 'pmap__step--bottleneck'
      : state === 'blocked' ? 'pmap__step--blocked'
      : '';
  }
</script>

<div class="pmap">
  {#if children}
    {@render children()}
  {:else if mode === 'contrast'}
    <!-- ═══ CONTRAST MODE: single call vs pipeline ═══ -->
    <div class="pmap__contrast">
      <!-- LEFT: single call -->
      <div class="pmap__side pmap__side--single">
        {#if leftSlot}
          {@render leftSlot()}
        {:else if left}
          <span class="pmap__side-label">{left.label}</span>
          {#if left.singleCall}
            <div class="pmap__call-chip">
              <span class="pmap__call-dot"></span>
              <span class="pmap__call-label">{left.singleCall}</span>
            </div>
          {/if}
          {#if left.note}
            <span class="pmap__side-note">{left.note}</span>
          {/if}
        {/if}
      </div>

      <!-- vs divider -->
      <div class="pmap__vs">
        <span class="pmap__vs-label">vs</span>
      </div>

      <!-- RIGHT: pipeline -->
      <div class="pmap__side pmap__side--pipeline">
        {#if rightSlot}
          {@render rightSlot()}
        {:else if right}
          <span class="pmap__side-label">{right.label}</span>
          {#if right.stages}
            <div class="pmap__pipe">
              {#each right.stages as stage, i}
                <span class="pmap__pipe-chip">{stage}</span>
                {#if i < right.stages.length - 1}
                  <span class="pmap__pipe-arrow">→</span>
                {/if}
              {/each}
            </div>
            <div class="pmap__pipe-dots">
              {#each right.stages as _, i}
                <span class="pmap__pipe-dot" style="animation-delay:{i * 0.15}s"></span>
              {/each}
            </div>
          {/if}
          {#if right.note}
            <span class="pmap__side-note">{right.note}</span>
          {/if}
        {/if}
      </div>
    </div>
  {:else}
    <div class="pmap__flow">
      {#each stages as stage, i (stage.name)}
        <div class="pmap__step {stateClass(stage.state)}">
          <div class="pmap__step-chip">
            {#if stage.state === 'bottleneck'}
              <span class="pmap__step-warn">⚠</span>
            {:else if stage.state === 'blocked'}
              <span class="pmap__step-warn">✕</span>
            {/if}
            <span class="pmap__step-name">{stage.name}</span>
          </div>
          {#if stage.actor}
            <span class="pmap__step-actor">{stage.actor}</span>
          {/if}
          {#if stage.metric}
            <span class="pmap__step-metric">{stage.metric.label}: {stage.metric.value}</span>
          {/if}
          {#if stage.branches && stage.branches.length > 0}
            <div class="pmap__branches">
              {#each stage.branches as b}
                <span class="pmap__branch">{b.name}</span>
              {/each}
            </div>
          {/if}
        </div>
        {#if i < stages.length - 1}
          <div class="pmap__arrow" aria-hidden="true">→</div>
        {/if}
      {/each}
    </div>
  {/if}
</div>

<style>
  .pmap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow-x: auto;
  }

  /* ── flow row ── */
  .pmap__flow {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
  }

  /* ── step ── */
  .pmap__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: var(--canvas-panel-bg);
    min-width: 80px;
    transition: border-color 0.2s, background 0.2s;
  }

  .pmap__step--bottleneck {
    border-color: rgba(251, 191, 36, 0.50);
    background: rgba(251, 191, 36, 0.07);
  }
  .pmap__step--blocked {
    border-color: rgba(251, 113, 133, 0.40);
    background: rgba(251, 113, 133, 0.05);
  }

  .pmap__step-chip {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .pmap__step-warn {
    font-size: 11px;
    line-height: 1;
  }
  .pmap__step-name {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    color: var(--canvas-ink);
  }
  .pmap__step-actor {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }
  .pmap__step-metric {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--canvas-ink-soft);
    text-align: center;
  }

  /* ── branches ── */
  .pmap__branches {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding-top: 4px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    width: 100%;
  }
  .pmap__branch {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--canvas-ink-soft);
    padding: 2px 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
  }

  /* ── arrow ── */
  .pmap__arrow {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.18);
    padding: 10px 6px 0;
    flex-shrink: 0;
    line-height: 1;
  }

  /* ── CONTRAST MODE: single vs pipeline ── */
  .pmap__contrast {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 14px 18px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
    flex-wrap: wrap;
  }

  .pmap__side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 20px;
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .pmap__side--single {
    border: 1px solid color-mix(in srgb, var(--canvas-sticky-pink-border) 50%, transparent);
    flex: 0 1 auto;
    min-width: 140px;
  }
  .pmap__side--pipeline {
    border: 1px solid color-mix(in srgb, var(--canvas-sticky-blue-border) 50%, transparent);
    flex: 1 1 auto;
    min-width: 240px;
  }

  .pmap__side-label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: var(--canvas-ink-soft);
  }
  .pmap__side-note {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    text-align: center;
    line-height: 1.4;
    opacity: 0.65;
  }

  /* single call chip */
  .pmap__call-chip {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .pmap__call-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--canvas-ink-soft);
    flex: none;
  }
  .pmap__call-label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
  }

  /* vs divider */
  .pmap__vs {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 0 6px;
  }
  .pmap__vs-label {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 700;
    color: var(--canvas-mark-cross);
    text-transform: uppercase;
    letter-spacing: 0.10em;
  }

  /* pipeline chips */
  .pmap__pipe {
    display: flex;
    align-items: center;
    gap: 3px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .pmap__pipe-chip {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    padding: 6px 14px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    color: var(--canvas-ink);
    white-space: nowrap;
  }
  .pmap__pipe-arrow {
    font-size: 14px;
    color: var(--canvas-ink-soft);
    opacity: 0.4;
    flex-shrink: 0;
  }
  .pmap__pipe-dots {
    display: flex;
    gap: 7px;
    justify-content: center;
  }
  .pmap__pipe-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--vnp-info);
    opacity: 0.5;
  }
</style>
