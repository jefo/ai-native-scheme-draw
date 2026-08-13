<script lang="ts">
  // LessonBoard — доска: learner projection по derived.
  // Рисует ТОЛЬКО то, что runtime разрешил: visible ноды, ?-слоты для hidden,
  // reveal по гейту, reasoning после reveal. Фазы дёргают actions.
  import { paymentLesson } from '../lessons/paymentLesson';
  import { createLessonRuntime } from '../lesson-runtime/createLessonRuntime.svelte.ts';
  import type { LessonDefinition } from '../lesson-runtime/lesson-types';

  let { lesson = paymentLesson as LessonDefinition } = $props();

  const { state, derived, actions } = createLessonRuntime(lesson);

  const PHASE_LABELS = {
    prior: 'Известное',
    task: 'Задача',
    prediction: 'Твой прогноз',
    reveal: 'Доска',
    reasoning: 'Почему',
    update: 'Модель',
    check: 'Проверка',
  } as const;
</script>

<div class="lb">
  <header class="lb__head">
    <span class="lb__objective">{lesson.objective}</span>
    <span class="lb__progress">{state.sceneIndex + 1}/{lesson.scenes.length}</span>
  </header>

  <section class="lb__board">
    <!-- фазовый контент: каждая фаза показывает своё -->
    {#if state.phase === 'prior' && derived.scene.prior}
      <div class="lb__panel lb__panel--prior">
        <span class="lb__tag">{PHASE_LABELS.prior}</span>
        <p>{derived.scene.prior}</p>
      </div>
    {/if}

    {#if (state.phase === 'task' || state.phase === 'prediction') && derived.scene.task}
      <div class="lb__panel lb__panel--task">
        <span class="lb__tag">{PHASE_LABELS.task}</span>
        <p>{derived.scene.task}</p>
      </div>
    {/if}

    {#if derived.showPrediction && derived.scene.prediction}
      <div class="lb__panel lb__panel--prediction">
        <span class="lb__tag">{PHASE_LABELS.prediction}</span>
        <p>{derived.scene.prediction}</p>
      </div>
    {/if}

    {#if derived.showContradiction && derived.scene.reveal}
      <div class="lb__panel lb__panel--reveal">
        <span class="lb__tag">{PHASE_LABELS.reveal}</span>
        <p>{derived.scene.reveal}</p>
      </div>
    {/if}

    {#if derived.showReasoning && derived.scene.reasoning}
      <div class="lb__panel lb__panel--reasoning">
        <span class="lb__tag">{PHASE_LABELS.reasoning}</span>
        <p>{derived.scene.reasoning}</p>
      </div>
    {/if}

    {#if state.phase === 'update' && derived.scene.update}
      <div class="lb__panel lb__panel--update">
        <span class="lb__tag">{PHASE_LABELS.update}</span>
        <div class="lb__nodes">
          {#each Object.entries(derived.scene.update.visible ?? []) as [node]}
            <span class="lb__node">{node}</span>
          {/each}
        </div>
      </div>
    {/if}

    {#if state.phase === 'check' && derived.scene.check}
      <div class="lb__panel lb__panel--check">
        <span class="lb__tag">{PHASE_LABELS.check}</span>
        <p>{derived.scene.check}</p>
      </div>
    {/if}
  </section>

  <footer class="lb__controls">
    <button
      class="lb__btn"
      onclick={() => actions.makePrediction('paid')}
      disabled={state.predictionMade || state.phase !== 'prediction'}
    >прогноз</button>
    <button
      class="lb__btn lb__btn--primary"
      onclick={() => actions.reveal()}
      disabled={!derived.canReveal}
      title={derived.canReveal ? '' : 'сначала дай прогноз'}
    >показать</button>
    <button class="lb__btn" onclick={() => actions.nextPhase()}>дальше</button>
    <button class="lb__btn lb__btn--ghost" onclick={() => actions.reset()}>сброс</button>
  </footer>
</div>

<style>
  .lb {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 900px;
    margin: 0 auto;
    padding: 16px;
    font-family: var(--vnp-font-mono, monospace);
  }

  .lb__head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid color-mix(in srgb, var(--vnp-ink, #000) 20%, transparent);
  }

  .lb__objective {
    font-size: 13px;
    line-height: 1.4;
  }

  .lb__progress {
    font-size: 12px;
    opacity: 0.6;
    white-space: nowrap;
  }

  .lb__board {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 260px;
    border: 1px dashed color-mix(in srgb, var(--vnp-ink, #000) 25%, transparent);
    border-radius: 10px;
    padding: 14px;
  }

  .lb__panel {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 14px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--vnp-paper-deep, #fff) 60%, transparent);
  }

  .lb__panel p {
    margin: 0;
    font-size: 14px;
    line-height: 1.55;
  }

  .lb__tag {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.55;
  }

  .lb__panel--prior { border-left: 3px solid #888; }
  .lb__panel--task { border-left: 3px solid #e8b339; }
  .lb__panel--prediction { border-left: 3px solid #7fb3e0; }
  .lb__panel--reveal { border-left: 3px solid #e05252; }
  .lb__panel--reasoning { border-left: 3px solid #8a5cf6; }
  .lb__panel--update { border-left: 3px solid #4a9e6e; }
  .lb__panel--check { border-left: 3px solid #4a9e6e; }

  .lb__nodes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .lb__node {
    padding: 4px 10px;
    border: 1px solid currentColor;
    border-radius: 999px;
    font-size: 12px;
  }

  .lb__controls {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lb__btn {
    padding: 8px 16px;
    border: 1px solid currentColor;
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    font: inherit;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .lb__btn:hover:not(:disabled) {
    background: color-mix(in srgb, currentColor 10%, transparent);
  }

  .lb__btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .lb__btn--primary {
    border-color: #4a9e6e;
    color: #4a9e6e;
  }

  .lb__btn--ghost {
    opacity: 0.5;
  }
</style>
