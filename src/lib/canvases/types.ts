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

/* ═══ Customer Profile grammar — операция мышления: портрет buyer'а ═══
 *
 *  Профилирующая карточка: роль, метрики (бюджет/цель/ограничение),
 *  jobs (что делает), pains (что мешает), цена продукта.
 *  Каноническая форма: Strategyzer Customer Profile + JTBD-персона. */

export interface CustomerProfileMetricDef {
  label: string;
  value: string;
}

/* ═══ Process Map grammar — операция мышления: показать процесс и узкое место ═══
 *
 *  Линейный flow стадий. Каждая стадия — шаг с опциональным актором и метрикой.
 *  Bottleneck — стадия с состоянием 'bottleneck' (amber highlight).
 *  Опционально: ветвление на стадии (branches) — например, multiple creatives. */

export type StageState = 'normal' | 'bottleneck' | 'blocked';

export interface ProcessMapStageDef {
  name: string;
  actor?: string;
  state: StageState;
  metric?: { label: string; value: string };
  branches?: { name: string }[];
}

/* ═══ Capability Map grammar — операция мышления: показать разрыв между возможностью и потребностью ═══
 *
 *  Две панели: Capability (что уже существует) и Need (что требуется).
 *  GAP — индикатор несоответствия между ними. */

export interface CapabilityMapSideDef {
  name: string;
  description?: string;
  metrics: { label: string; value: string }[];
}

export interface CapabilityMapGapDef {
  label: string;
}

/* ═══ Before/After Economics grammar — операция мышления: показать смену экономической модели ═══
 *
 *  Две колонки: OLD vs NEW. Каждая: цена → единица → throughput → время.
 *  Unit shift — ключевой акцент: старая единица покупки → новая. */

export interface BeforeAfterSideDef {
  label: string;
  price: string;
  unit: string;
  throughput: string;
  time: string;
}

export interface UnitShiftDef {
  from: string;
  to: string;
}

/* ═══ Opportunity Solution Tree grammar — операция мышления: outcome → opportunities → solutions ═══
 *
 *  Канон Teresa Torres. Root = desired buyer outcome. Level 1 = opportunities.
 *  Level 2 = solutions с состоянием chosen | alternative.
 *  Winner path = цепочка, где solutions отмечены 'chosen'. */

export type SolutionState = 'chosen' | 'alternative';

export interface OpportunityDef {
  name: string;
  solutions: { name: string; state: SolutionState }[];
}

/* ═══ Grouping grammar (CapabilityMap mode="group") — операция мышления: сгруппировать ═══
 *
 *  Методы/фичи как входы → capability как результат группировки.
 *  Provocation — ложный вывод, который зачёркивается перед результатом. */

export interface MethodDef {
  name: string;
}

export interface CapabilityGroupDef {
  name: string;
  description?: string;
}

/* ═══ Contrast grammar (ProcessMap mode="contrast") — операция мышления: противопоставить ═══
 *
 *  Две колонки: «как ты думаешь» (одиночный вызов) vs «что это на самом деле» (конвейер).
 *  kind = 'single' → один чип с подписью; 'pipeline' → цепочка стадий + API-точки. */

export interface ContrastSideDef {
  kind: 'single' | 'pipeline';
  label: string;
  note?: string;
  singleCall?: string;
  stages?: string[];
}

/* ═══ Buyer Job grammar — операция мышления: связать workflow с buyer'ом ═══
 *
 *  Роль → job (какую работу закрывает) → product shape (форма продукта).
 *  winner = true → зелёный акцент (выбранный путь). */

export interface BuyerJobDef {
  role: string;
  job: string;
  shape: string;
  winner?: boolean;
}

/* ═══ Decision Matrix grammar — операция мышления: отфильтровать ═══
 *
 *  Критерии (constraints) сверху, кандидаты снизу с вердиктом.
 *  pass = ✓ зелёный, partial = ~ янтарный, fail = ✗ розовый (приглушён). */

export type Verdict = 'pass' | 'partial' | 'fail';

export interface DecisionCandidateDef {
  name: string;
  verdict: Verdict;
  why: string;
}

/* ═══ Thesis grammar — операция мышления: синтезировать ═══
 *
 *  Claim (ставка) + anatomy (buyer / job / stake). */

export interface ThesisDef {
  claim: string;
  buyer: string;
  job: string;
  stake: string;
}

/* ═══ Dependency Graph grammar — операция мышления: упорядочить prerequisites ═══
 *
 *  Узлы концептов с зависимостями. Визуально: цепочка сверху вниз,
 *  стрелки показывают «что нужно понять до чего». */

export interface DependencyNodeDef {
  id: string;
  label: string;
  requires: string[];
}

/* ═══ Causal Chain grammar — операция мышления: показать причинный механизм ═══
 *
 *  Вертикальная цепочка: каждая стрелка аннотирована механизмом (почему X ведёт к Y). */

export interface CausalStepDef {
  from: string;
  to: string;
  mechanism: string;
}

/* ═══ Learner Journey grammar — операция мышления: показать когнитивный путь ═══
 *
 *  Стадии открытия: Confusion → Prediction → Observation → Explanation → Model.
 *  Каждая стадия имеет когнитивное состояние и описание. */

export type JourneyState = 'confusion' | 'prediction' | 'observation' | 'explanation' | 'model' | 'application';

export interface JourneyStageDef {
  state: JourneyState;
  description: string;
  content?: string;
}

/* ═══ Evidence Map grammar — операция мышления: обосновать утверждение ═══
 *
 *  Claim (утверждение) + evidence (подтверждения разного типа). */

export type EvidenceType = 'benchmark' | 'example' | 'counterexample' | 'source' | 'analogy';

export interface EvidenceItemDef {
  type: EvidenceType;
  description: string;
}

export interface EvidenceClaimDef {
  statement: string;
  evidence: EvidenceItemDef[];
}

/* ═══ Context Map grammar — операция мышления: показать границы подсистем ═══
 *
 *  Бounded contexts с сущностями внутри и labelled connections между ними. */

export interface ContextBoxDef {
  name: string;
  entities: string[];
}

export interface ContextConnectionDef {
  from: string;
  to: string;
  label: string;
}

/* ═══ State Machine grammar — операция мышления: увидеть изменение состояния ═══
 *
 *  Nodes = states, edges = transitions. Initial state → ... → terminal.
 *  Guards опциональны: условие на переходе. */

export interface StateNodeDef {
  id: string;
  label: string;
  initial?: boolean;
  terminal?: boolean;
}

export interface StateTransitionDef {
  from: string;
  to: string;
  label?: string;   // guard / event name
}

/* ═══ Sequence Diagram grammar — операция мышления: увидеть взаимодействие во времени ═══
 *
 *  Participants = вертикальные линии жизни, messages = горизонтальные стрелки.
 *  Время течёт сверху вниз. */

export interface SequenceParticipantDef {
  id: string;
  label: string;
}

export interface SequenceMessageDef {
  from: string;
  to: string;
  label: string;
  /** Опционально: ответ (возврат) — рисуется пунктиром. */
  isReturn?: boolean;
}

/* ═══ Feedback Loop grammar — операция мышления: увидеть control loop ═══
 *
 *  Циклическая цепочка: Desired → Observe → Actual → Diff → Act → ...
 *  Центральная аннотация описывает, что стабилизируется. */

export interface FeedbackNodeDef {
  id: string;
  label: string;
}

export interface FeedbackEdgeDef {
  from: string;
  to: string;
  label?: string;
}

/** Замыкающая дуга — визуально возвращается к началу цикла. */
export interface FeedbackLoopDef {
  nodes: FeedbackNodeDef[];
  edges: FeedbackEdgeDef[];
  annotation?: string;
}
