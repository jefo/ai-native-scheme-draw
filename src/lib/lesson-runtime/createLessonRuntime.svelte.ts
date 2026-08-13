// src/lib/lesson-runtime/createLessonRuntime.svelte.ts
// Runes живут в .svelte.ts модулях (Svelte 5). Runtime урок-агностичен:
// знает фазы/гейты/проекцию, не знает предметных понятий (инвариант high-level-plan).

import type {
  LessonDefinition,
  LessonDerived,
  LessonPhase,
  LessonState,
  LessonActions,
} from './lesson-types';

const PHASE_ORDER: LessonPhase[] = [
  'prior',
  'task',
  'prediction',
  'reveal',
  'reasoning',
  'update',
  'check',
];

export function createLessonRuntime(definition: LessonDefinition) {
  let state = $state<LessonState>({
    sceneIndex: 0,
    phase: 'prior',
    revealed: false,
    predictionMade: false,
    answers: {},
  });

  // ── transitions (dispatchers) ──
  function nextPhase() {
    const i = PHASE_ORDER.indexOf(state.phase);
    if (i < PHASE_ORDER.length - 1) {
      state.phase = PHASE_ORDER[i + 1];
    } else {
      // цикл завершён: следующая сцена, сброс
      const next = state.sceneIndex + 1;
      if (next < definition.scenes.length) {
        state.sceneIndex = next;
        state.phase = 'prior';
        state.revealed = false;
        state.predictionMade = false;
      }
    }
  }

  function makePrediction(answer: string) {
    state.predictionMade = true;
    state.answers[definition.scenes[state.sceneIndex].id] = answer;
  }

  function reveal() {
    // гейт: нельзя раскрыть ответ до попытки ученика (педагогический инвариант)
    if (!state.predictionMade) return;
    state.revealed = true;
  }

  function goToScene(index: number) {
    if (index < 0 || index >= definition.scenes.length) return;
    state.sceneIndex = index;
    state.phase = 'prior';
    state.revealed = false;
    state.predictionMade = false;
  }

  function reset() {
    goToScene(0);
  }

  // ── selectors ($derived) ──
  const derived = $derived<LessonDerived>({
    get scene() {
      return definition.scenes[state.sceneIndex];
    },
    get canReveal() {
      return state.predictionMade && !state.revealed;
    },
    get showPrediction() {
      return PHASE_ORDER.indexOf(state.phase) >= PHASE_ORDER.indexOf('prediction');
    },
    get showContradiction() {
      return state.revealed;
    },
    get showReasoning() {
      return PHASE_ORDER.indexOf(state.phase) >= PHASE_ORDER.indexOf('reasoning');
    },
    get progress() {
      return definition.scenes.length === 0
        ? 0
        : state.sceneIndex / definition.scenes.length;
    },
  });

  const actions: LessonActions = { nextPhase, makePrediction, reveal, goToScene, reset };

  return { state, derived, actions };
}
