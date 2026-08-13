# Svelte SPA as Lesson Runtime — Implementation Plan (junior-plan)

> Имплементационный уровень. Высокоуровневый контракт (что строим, зачем, инварианты): `high-level-plan.md` в этой же папке.
> Этот план — как реализовать контракт конкретными изменениями в коде.

> **For agentic workers:** REQUIRED SUB-SKILL: executing-plans (inline). Субагенты исключены (фрагментация контекста, single-voice урок).
> Шаги используют checkbox (`- [ ]`) синтаксис.

**Goal:** Перестроить PaymentLesson в трёхслойную архитектуру Lesson Definition → Lesson Runtime → Svelte View: рантайм урока как Svelte SPA, где Definition — plain data (педагогика), Runtime — state/derived/фазы/гейты (исполнение), View — проекция на доску.

**Architecture:** Канон instructional board (2026-08-12-instructional-board.md): диаграмма = управляемый диалог ученик↔доска. Board Episode: Prior→Task→Prediction→Contradiction→Reasoning→Model update→Check→New problem. Два графа: Author (полная модель) / Learner (projection с `?`-слотами). Runtime enforce-ит педагогическую механику: нельзя REVEAL до PREDICTION.

**Tech Stack:** Svelte 5 (runes: `$state`, `$derived`), TypeScript, Vite. Верификация: `npm run build` + playwright-скриншот (vision недоступен — рендер судит Eugene). Юнит-тест-раннер НЕ добавляем (непроверенный инструмент, лаб-машина).

## Global Constraints

- Definition = **plain data** (объекты/строки/массивы, без функций/классов) — сериализуемость для будущей AI-генерации/Git/валидации
- Runtime **урок-агностичен**: не знает про PSP/платёж; знает про фазы, гейты, сцены. Всё предметное — в Definition
- Педагогическая последовательность фаз: TASK → PREDICTION → REVEAL → REASONING → UPDATE → CHECK (enforce runtime'ом)
- Гейты: `canReveal` (false до prediction), `showPrediction`, `showContradiction`, `showReasoning`
- View рисует **learner projection**: visible/hidden ноды, `?`-слоты вместо преждевременных ответов
- Не строим generic-движок: первый урок — платёжный, но в педагогической форме; обобщение — на втором уроке
- Верификация каждого Task: `npm run build` (должен пройти) + playwright-скриншот (Eugene судит)
- Никаких новых зависимостей (непроверенное не добавляем)

---

### Task 1: Типы Lesson Runtime

**Files:**
- Create: `src/lib/lesson-runtime/lesson-types.ts`

**Interfaces:**
- Consumes: — (первый таск)
- Produces: `LessonDefinition`, `SceneDef`, `Phase`, `LessonPhase`, `LessonState`, `LessonDerived`, `LessonActions` — используются всеми следующими тасками

- [ ] **Step 1: Написать типы**

```ts
// src/lib/lesson-runtime/lesson-types.ts

/** Фаза педагогического эпизода (enforce порядок в runtime). */
export type LessonPhase =
  | 'prior'        // активация известного
  | 'task'         // задача ученику
  | 'prediction'   // ожидаемая гипотеза ученика
  | 'reveal'       // доска показывает противоречие/ответ
  | 'reasoning'    // think-aloud: почему так
  | 'update'       // обновление модели
  | 'check';       // проверка понимания

/** Один Board Episode (Instructional Move). */
export interface SceneDef {
  id: string;
  /** Что ученик уже знает (активируется на фазе prior). */
  prior?: string;
  /** Вопрос/задача ученику. */
  task?: string;
  /** Ожидаемая гипотеза (показывается на фазе prediction). */
  prediction?: string;
  /** Что доска раскрывает (противоречие или ответ). */
  reveal?: string;
  /** Think-aloud: reasoning эксперта. */
  reasoning?: string;
  /** Обновление модели: видимые сущности/состояния после сцены. */
  update?: Record<string, unknown>;
  /** Проверка: вопрос на подтверждение понимания. */
  check?: string;
  /** Новый вопрос, ведущий к следующей сцене. */
  nextProblem?: string;
  /** Что скрыто до reveal (learner projection). */
  hidden?: string[];
}

/** Lesson Definition — plain data, источник правды. */
export interface LessonDefinition {
  id: string;
  objective: string;
  priorKnowledge: string[];
  scenes: SceneDef[];
}

/** Runtime-состояние (writable). */
export interface LessonState {
  sceneIndex: number;
  phase: LessonPhase;
  revealed: boolean;      // reveal показан?
  predictionMade: boolean; // ученик дал гипотезу?
  answers: Record<string, string>; // ответы на check
}

/** Derived-состояние (вычисляется из state, селекторы). */
export interface LessonDerived {
  scene: SceneDef;
  canReveal: boolean;       // false до prediction
  showPrediction: boolean;  // фаза prediction или позже
  showContradiction: boolean; // reveal показан и есть противоречие
  showReasoning: boolean;   // reasoning показан
  progress: number;         // 0..1 по сценам
}

/** Действия (dispatchers). */
export interface LessonActions {
  nextPhase(): void;
  makePrediction(answer: string): void;
  reveal(): void;
  goToScene(index: number): void;
  reset(): void;
}
```

- [ ] **Step 2: Проверить сборку типов**

Run: `cd /root/projects/visual-narrative-lib && npx svelte-check --tsconfig ./tsconfig.json 2>&1 | tail -5`
Expected: нет ошибок по новому файлу (или только pre-existing).

- [ ] **Step 3: Commit**

```bash
git add src/lib/lesson-runtime/lesson-types.ts
git commit -m "lesson-runtime: типы Lesson Definition / State / Derived / Actions"
```

---

### Task 2: Runtime — state/$derived/фазы/гейты

**Files:**
- Create: `src/lib/lesson-runtime/createLessonRuntime.ts`

**Interfaces:**
- Consumes: `LessonDefinition`, `LessonPhase`, `LessonState`, `LessonDerived`, `LessonActions` из Task 1
- Produces: `createLessonRuntime(definition: LessonDefinition): { state, derived, actions }` — чистая функция-фабрика, урок-агностичная

- [ ] **Step 1: Реализовать фабрику рантайма**

```ts
// src/lib/lesson-runtime/createLessonRuntime.ts
import type { LessonDefinition, LessonDerived, LessonPhase, LessonState, LessonActions } from './lesson-types';

const PHASE_ORDER: LessonPhase[] = ['prior', 'task', 'prediction', 'reveal', 'reasoning', 'update', 'check'];

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
    if (i < PHASE_ORDER.length - 1) state.phase = PHASE_ORDER[i + 1];
    else { state.phase = 'prior'; state.revealed = false; state.predictionMade = false; }
  }

  function makePrediction(answer: string) {
    state.predictionMade = true;
    state.answers[definition.scenes[state.sceneIndex].id] = answer;
  }

  function reveal() {
    if (!state.predictionMade) return; // гейт: нельзя reveal до prediction
    state.revealed = true;
  }

  function goToScene(index: number) {
    if (index < 0 || index >= definition.scenes.length) return;
    state.sceneIndex = index;
    state.phase = 'prior';
    state.revealed = false;
    state.predictionMade = false;
  }

  function reset() { goToScene(0); }

  // ── selectors ($derived) ──
  const derived = $derived<LessonDerived>({
    get scene() { return definition.scenes[state.sceneIndex]; },
    get canReveal() { return state.predictionMade && !state.revealed; },
    get showPrediction() {
      return PHASE_ORDER.indexOf(state.phase) >= PHASE_ORDER.indexOf('prediction');
    },
    get showContradiction() { return state.revealed; },
    get showReasoning() {
      return PHASE_ORDER.indexOf(state.phase) >= PHASE_ORDER.indexOf('reasoning');
    },
    get progress() { return state.sceneIndex / definition.scenes.length; },
  });

  const actions: LessonActions = { nextPhase, makePrediction, reveal, goToScene, reset };

  return { state, derived, actions };
}
```

- [ ] **Step 2: Сборка**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built` (Svelte 5 runes корректны; если svelte-check ругается на `$state` вне компонента — см. Step 3 fallback).

- [ ] **Step 3 (fallback, если runes вне компонента не собираются):**

Svelte 5 runes (`$state`/`$derived`) работают в `.svelte.ts` модулях. Переименовать:
```bash
git mv src/lib/lesson-runtime/createLessonRuntime.ts src/lib/lesson-runtime/createLessonRuntime.svelte.ts
```
и обновить импорты в следующих тасках. Проверить сборку снова.

- [ ] **Step 4: Commit**

```bash
git add src/lib/lesson-runtime/createLessonRuntime.svelte.ts src/lib/lesson-runtime/createLessonRuntime.ts 2>/dev/null
git commit -m "lesson-runtime: фабрика рантайма — state/derived/фазы/гейт canReveal"
```

---

### Task 3: Definition платёжного урока (plain data)

**Files:**
- Create: `src/lib/lessons/paymentLesson.ts`

**Interfaces:**
- Consumes: `LessonDefinition` из Task 1
- Produces: `paymentLesson: LessonDefinition` — 9 эпизодов по согласованной таблице (request/response → PSP → 3 исхода → pending → время → webhook → declined → retry/guard → две машины)

- [ ] **Step 1: Написать definition (первый эпизод полностью как образец)**

```ts
// src/lib/lessons/paymentLesson.ts
import type { LessonDefinition } from '../lesson-runtime/lesson-types';

export const paymentLesson: LessonDefinition = {
  id: 'payment-lesson',
  objective: 'Объяснить, что происходит с заказом, если платёж не даёт окончательного ответа сразу',
  priorKnowledge: ['http-request-response', 'микросервисы: сервис + БД'],
  scenes: [
    {
      id: 'post-pay',
      prior: 'Ты знаешь request/response: послал запрос — получил ответ.',
      task: 'Что произойдёт после POST /pay?',
      prediction: 'response → Order = paid',
      reveal: 'POST /pay → ??? (ответа нет: запрос ушёл в систему, которая может не ответить сразу)',
      reasoning: 'Твоя модель request/response предполагает мгновенный финальный ответ. Но платёж — не обычный запрос: решение принимает не одна система.',
      update: { visible: ['client', 'order'], hidden: ['psp', 'bank', 'webhook'] },
      check: 'Почему request/response не описывает платёж?',
      nextProblem: 'Кто вообще отвечает на POST /pay?',
      hidden: ['psp', 'bank'],
    },
    // ... эпизоды 2-9 заполняются по согласованной таблице:
    // 2: client→order→psp→bank (кто решает), 3: три исхода s/d/p,
    // 4: pending → order=?, 5: время/later, 6: webhook, 7: declined→retry,
    // 8: guard max→cancelled, 9: две машины + payment.succeeded мост
  ],
};
```

- [ ] **Step 2: Заполнить эпизоды 2–9** (по таблице из обсуждения: prior → problem → prediction → reveal → reasoning → update → nextProblem; контент story — из согласованной канвы, не выдумывать новые факты)

- [ ] **Step 3: Сборка + рендер-верификация пустого состояния**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built`

- [ ] **Step 4: Commit**

```bash
git add src/lib/lessons/paymentLesson.ts
git commit -m "lessons: paymentLesson definition (9 эпизодов, plain data)"
```

---

### Task 4: View — LessonBoard (learner projection)

**Files:**
- Create: `src/lib/lesson-view/LessonBoard.svelte`
- Reuse: `src/lib/data-flow/SemanticNode.svelte`, `CompositeNode.svelte` (примитивы модели представления, соответствуют дизайну)

**Interfaces:**
- Consumes: `createLessonRuntime` (Task 2), `paymentLesson` (Task 3)
- Produces: `<LessonBoard />` — доска: SVG-организм, рендерит ТОЛЬКО derived (visible ноды, `?`-слоты, reveal-контент, reasoning-строка)

- [ ] **Step 1: Каркас доски**

```svelte
<!-- src/lib/lesson-view/LessonBoard.svelte -->
<script lang="ts">
  import { paymentLesson } from '../lessons/paymentLesson';
  import { createLessonRuntime } from '../lesson-runtime/createLessonRuntime.svelte.ts';
  import SemanticNode from '../data-flow/SemanticNode.svelte';

  const { state, derived, actions } = createLessonRuntime(paymentLesson);
</script>

<!-- Шапка: objective + progress -->
<!-- Тело: SVG-доска — visible ноды по derived.scene.update,
     скрытые — как пунктирные слоты '?', reveal — по derived.showContradiction,
     reasoning — по derived.showReasoning -->
<!-- Пульт: фазы по derived/actions -->
```

- [ ] **Step 2: Рендер по derived (learner projection)**

Правила (канон instructional board):
- `?`-слот: узел в `hidden`, пока не `showContradiction` → рисовать пунктирный контур с `?`
- reveal-текст: показать при `showContradiction`
- reasoning: показать при `showReasoning`
- prediction: показать при `showPrediction` (гипотеза ученика/ожидаемая)

- [ ] **Step 3: Пульт-фазы** (кнопки: «задача», «дать прогноз», «показать», «почему», «дальше» — каждая дёргает `actions.nextPhase`/`makePrediction`/`reveal`)

- [ ] **Step 4: Сборка + рендер первой сцены**

Run: `npm run build 2>&1 | tail -3` && playwright-скриншот `#/payment-lesson`
Expected: `✓ built`, PNG показывает prior/task доску с `?`-слотами, без reveal

- [ ] **Step 5: Commit**

```bash
git add src/lib/lesson-view/LessonBoard.svelte
git commit -m "lesson-view: LessonBoard — learner projection, ?-слоты, reveal/reasoning по derived"
```

---

### Task 5: Пересборка PaymentLesson (роут)

**Files:**
- Modify: `src/lib/data-flow/PaymentLesson.svelte` → тонкий враппер над `LessonBoard` (или удалить, роут на LessonBoard)
- Modify: `src/App.svelte` (роут `payment-lesson` → `LessonBoard`)
- Modify: `src/app/stores/router.svelte.ts` (без изменений — роут уже есть)

**Interfaces:**
- Consumes: `LessonBoard` (Task 4)
- Produces: рабочий роут `#/payment-lesson`, старый монолит PaymentLesson.svelte удаляется

- [ ] **Step 1: Заменить PaymentLesson.svelte**

```svelte
<!-- src/lib/data-flow/PaymentLesson.svelte -->
<script lang="ts">
  import LessonBoard from '../lesson-view/LessonBoard.svelte';
</script>
<LessonBoard />
```

- [ ] **Step 2: Проверить роут + полный рендер-цикл**

Run: `npm run build 2>&1 | tail -3`
Затем playwright: пройти все фазы всех 9 сцен, скриншот каждого состояния в `/tmp/payment-lesson-v2/`
Expected: полный цикл без падений, PNG каждого эпизода

- [ ] **Step 3: Commit**

```bash
git add src/lib/data-flow/PaymentLesson.svelte src/App.svelte src/lib/lesson-view/
git commit -m "lesson: PaymentLesson → LessonBoard (Definition→Runtime→View), монолит удалён"
```

---

### Task 6: Финальная верификация (verification-before-completion)

**Files:** — (без кода)

- [ ] **Step 1: Полный цикл сборки**

Run: `npm run build 2>&1 | tail -3`
Expected: `✓ built`, 0 ошибок

- [ ] **Step 2: Рендер всех состояний**

Run: playwright-скрипт по всем фазам всех сцен → `/tmp/payment-lesson-v2/*.png`
Expected: каждая PNG существует, не пустая (file-проверка), состояния различаются

- [ ] **Step 3: Само-ревью против канона instructional board**

Проверить: reveal не показывается до prediction (гейт в runtime); `?`-слоты есть в hidden; reasoning — после reveal; learner projection ≠ author graph (полный граф не вываливается сразу); финальная сцена — две машины + event-мост.

- [ ] **Step 4: Commit финальный**

```bash
git add -A
git commit -m "lesson-runtime v2: Definition→Runtime→View, instructional board канон"
git push
```

---

## Self-Review

- **Spec coverage:** Канон instructional board покрыт: Prior (SceneDef.prior) ✓, Task ✓, Prediction ✓, Contradiction (reveal + showContradiction) ✓, Reasoning ✓, Model update (SceneDef.update) ✓, Check ✓, New problem (nextProblem) ✓, Author/Learner графы (hidden + ?-слоты) ✓, критерий «reveal не раньше prediction» (гейт canReveal) ✓.
- **Placeholder scan:** Эпизоды 2–9 в Task 3 помечены «по согласованной таблице» — это НЕ placeholder по смыслу (таблица согласована в чате), но план требует раскрыть их до исполнения; Step 2 Task 3 — явный шаг заполнения перед сборкой.
- **Type consistency:** `createLessonRuntime` → `{ state, derived, actions }`; `derived.scene/update/hidden`; `actions.nextPhase/makePrediction/reveal/goToScene/reset` — согласованы между Task 1–4. `LessonBoard` потребляет `derived` и `actions` — имена совпадают.
- **Гейт canReveal:** `reveal()` не срабатывает без `predictionMade` — педагогика enforce в рантайме, не в UI.
