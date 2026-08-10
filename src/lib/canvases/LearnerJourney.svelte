<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { JourneyStageDef, JourneyState } from './types';

  /** LearnerJourney — операция мышления: показать когнитивный путь открытия.
   *
   *  Горизонтальный flow стадий познания: Confusion → Prediction → Observation
   *  → Explanation → Model → Application. Каждая стадия — стеклянный чип
   *  (нейтральный glass паттерн) с моно-лейблом состояния и описанием.
   *  Когнитивное состояние тонирует границу чипа семантическим цветом:
   *  confusion — rose, prediction — amber, observation — cyan,
   *  explanation — нейтральный, model — mint, application — зелёный с glow. */

  let {
    stages = [] as JourneyStageDef[],
    children,
  }: {
    stages?: JourneyStageDef[];
    children?: Snippet;
  } = $props();

  function stateClass(state: JourneyState): string {
    switch (state) {
      case 'confusion':
        return 'lj__stage--confusion';
      case 'prediction':
        return 'lj__stage--prediction';
      case 'observation':
        return 'lj__stage--observation';
      case 'explanation':
        return 'lj__stage--explanation';
      case 'model':
        return 'lj__stage--model';
      case 'application':
        return 'lj__stage--application';
      default:
        return '';
    }
  }
</script>

<div class="lj">
  {#if children}
    {@render children()}
  {:else}
    {#each stages as stage, i (stage.state)}
      <div class="lj__stage {stateClass(stage.state)}">
        <span class="lj__state">{stage.state}</span>
        <span class="lj__desc">{stage.description}</span>
        {#if stage.content}
          <span class="lj__content">{stage.content}</span>
        {/if}
      </div>
      {#if i < stages.length - 1}
        <span class="lj__arrow" aria-hidden="true">→</span>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .lj {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── stage chip ── */
  .lj__stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 16px;
    min-width: 100px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.10);
    background: var(--canvas-panel-bg);
    text-align: center;
  }

  .lj__stage--confusion {
    border-color: color-mix(in srgb, var(--canvas-mark-cross) 45%, transparent);
  }
  .lj__stage--prediction {
    border-color: color-mix(in srgb, var(--canvas-highlight-ink) 45%, transparent);
  }
  .lj__stage--observation {
    border-color: color-mix(in srgb, var(--canvas-sticky-blue-border) 45%, transparent);
  }
  .lj__stage--explanation {
    border-color: rgba(255, 255, 255, 0.10);
  }
  .lj__stage--model {
    border-color: color-mix(in srgb, var(--canvas-mark-check) 45%, transparent);
  }
  .lj__stage--application {
    border-color: var(--canvas-sticky-green-border);
    box-shadow: 0 0 14px color-mix(in srgb, var(--canvas-sticky-green-border) 30%, transparent);
  }

  .lj__state {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .lj__desc {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
  }
  .lj__content {
    font-family: var(--vnp-font);
    font-size: 11px;
    color: var(--canvas-ink-soft);
  }

  /* ── arrow ── */
  .lj__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 14px;
    color: var(--canvas-ink-soft);
    opacity: 0.4;
    flex-shrink: 0;
    line-height: 1;
  }
</style>
