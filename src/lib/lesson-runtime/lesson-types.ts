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
  revealed: boolean;       // reveal показан?
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
