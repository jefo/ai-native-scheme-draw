<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ProcessMapStageDef } from './types';

  /** ProcessMap — линейный flow стадий с акцентом на bottleneck.
   *
   *  Каждая стадия: метка → состояние (цвет), актор (моно-лейбл), метрика.
   *  Bottleneck стадия получает amber highlight + предупредительный значок.
   *  Опционально: ветвление на стадии (branches) — параллельные выходы.
   *  Dual API: data (stages) или children slot. */

  let {
    stages = [] as ProcessMapStageDef[],
    children,
  }: {
    stages?: ProcessMapStageDef[];
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
</style>
