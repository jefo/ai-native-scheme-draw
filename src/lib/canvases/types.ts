/** Общие типы канвасов — формализованных систем мышления. */

/** Ступень отступа шкалы Stage (density масштабирует значения). */
export type Gap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Тип ребра в фич-диаграмме (FODA-нотация):
 *  mandatory ● / optional ○ / alternative ○ (1 of N) / excluded ✕ */
export type FeatureKind = 'mandatory' | 'optional' | 'alternative' | 'excluded';

/** Узел дерева фич. Рекурсивный: children — подфичи. */
export interface FeatureTree {
  label: string;
  kind?: FeatureKind;
  children?: FeatureTree[];
}

/** Вариант в строке trade-off матрицы: выбранный (chosen) или пожертвованный. */
export interface TradeOffOption {
  label: string;
  chosen?: boolean;
}

/** Строка trade-off матрицы: одно решение и его варианты. */
export interface TradeOffRow {
  /** Вопрос/решение. */
  decision: string;
  /** Варианты — ровно один помечен chosen. */
  options: TradeOffOption[];
  /** Почему выбрали именно так (необязательно). */
  note?: string;
}

/* ═══ Positioning Map grammar — операция мышления: сравнить / противопоставить ═══ */

/** Координата на карте: число 0–100 (%) или семантическая ступень. */
export type MapValue = number | 'low' | 'medium' | 'high';

/** Состояние игрока на карте позиционирования. */
export type PlayerState =
  | 'default'    // нейтральная точка
  | 'focus'      // ключевой игрок («мы»)
  | 'competitor' // конкурент
  | 'reference'  // референс для сравнения
  | 'unknown'    // неопределившийся
  | 'emerging';  // входит на рынок

/** Ось карты: имя + подписи концов. Геометрию (линию, сетку) рисует канвас. */
export interface MapAxisDef {
  id: 'x' | 'y';
  label: string;
  low: string;
  high: string;
}

/** Территория — зона рынка на карте (тонированная область). */
export interface MapTerritoryDef {
  x: number;
  y: number;
  label: string;
  width?: number;
  height?: number;
  tone?: 'cyan' | 'violet' | 'amber' | 'mint' | 'rose' | 'orange';
}

/** Игрок — участник рынка. Регистрируется на канвасе по name. */
export interface MapPlayerDef {
  name: string;
  x: MapValue;
  y: MapValue;
  state?: PlayerState;
}

/** Натяжение — конфликт между двумя игроками. Точки связываются по имени,
 *  геометрию (линию, подпись) решает канвас. */
export interface MapTensionDef {
  between: [string, string];
  label?: string;
}

/** Вектор — направление движения игрока (к точке или к другому игроку). */
export interface MapVectorDef {
  from: string;
  to: string | { x: MapValue; y: MapValue };
  label?: string;
}

/* ═══ Story grammar — операция мышления: проследить трансформацию ═══
 *
 *  User Story (Domain Storytelling): Actor → Action → Artifact → System →
 *  Handoff → Decision → Outcome. Шаги — это последовательность; канвас
 *  собирает из них цепочку. Artifact — связующая entity: одно и то же имя
 *  в разных местах стори соединяется нитью («Brief — это entity в модели,
 *  а не кусок UI»). */

/** Субъект действия — человек, роль или система. */
export interface StoryActorDef {
  kind: 'actor';
  name: string;
}

/** Действие: глагол + объект, выполняет actor. */
export interface StoryActionDef {
  kind: 'action';
  label: string;
  actor?: string;
}

/** Связующая entity — что производится и трансформируется. Повтор имени
 *  = тот же артефакт, канвас связывает вхождения нитью. */
export interface StoryArtifactDef {
  kind: 'artifact';
  name: string;
}

/** Граница среды: шаги внутри system выполняются в её контексте. */
export interface StorySystemDef {
  kind: 'system';
  label: string;
  steps: StoryStepDef[];
}

/** Передача артефакта между акторами. */
export interface StoryHandoffDef {
  kind: 'handoff';
  from: string;
  to: string;
  artifact?: string;
}

/** Развилка в цепочке. */
export interface StoryDecisionDef {
  kind: 'decision';
  label: string;
  actor?: string;
}

/** Конечное состояние — реализованная ценность. */
export interface StoryOutcomeDef {
  kind: 'outcome';
  label: string;
}

/** Шаг стори — рекурсивный union (system содержит шаги). */
export type StoryStepDef =
  | StoryActorDef
  | StoryActionDef
  | StoryArtifactDef
  | StorySystemDef
  | StoryHandoffDef
  | StoryDecisionDef
  | StoryOutcomeDef;

/* ═══ Roadmap grammar — операция мышления: показать причинную прогрессию ═══
 *
 *  Каузальный путь (не календарь): горизонтальный хребет из фаз, вехи-ромбы
 *  на стыках фаз, хорайзоны (Now/Next/Later) — зоны-колонны, зависимости —
 *  дуги по имени вехи (реестр имён, как Player и Artifact). */

/** Сегмент хребта — этап работы. */
export interface RoadmapPhaseDef {
  kind: 'phase';
  label: string;
}

/** Веха на стыке фаз — точка-ромб на хребте. name = ключ реестра
 *  (на него ссылается Dependency). */
export interface RoadmapMilestoneDef {
  kind: 'milestone';
  name: string;
}

/** Шаг внутри хорайзона: фаза или веха. */
export type RoadmapStepDef = RoadmapPhaseDef | RoadmapMilestoneDef;

/** Зона-колонна (Now/Next/Later): группа фаз и вех. */
export interface RoadmapHorizonDef {
  kind: 'horizon';
  label: string;
  steps: RoadmapStepDef[];
}

/** Причинная связь между вехами. Точки связываются по имени,
 *  геометрию (дугу над хребтом) решает канвас. */
export interface RoadmapDependencyDef {
  kind: 'dependency';
  from: string;
  to: string;
}

/* ═══ System Diagram grammar — операция мышления: показать identity loop ═══
 *
 *  Три узла и рёбра между ними. Роль узла = семантический цвет чипа.
 *  Focus — акцент на зрителе. Ребро — связь с подписью (enables, builds).
 *  Каноническая форма: Capability → Buyer → Product. */

export type SystemDiagramRole = 'capability' | 'buyer' | 'product';

export interface SystemDiagramNodeDef {
  id: string;
  label: string;
  role: SystemDiagramRole;
}

export interface SystemDiagramEdgeDef {
  from: string;
  to: string;
  label?: string;
}
