<script lang="ts">
  import {
    Scene, ContextMap, CapabilityMap, DependencyGraph,
    CausalChain, LearnerJourney, EvidenceMap, StateMachine,
    SequenceDiagram, FeedbackLoop,
  } from './lib/index.ts';
  import { eventLoopKnowledge } from './lib/canvases/knowledge-model.ts';
  import './lib/canvases/canvas-theme.css';

  /** Cognitive operation → Representation mapping.
   *  Each entry: what ID needs the learner to see → which framework. */

  interface RepEntry {
    operation: string;
    question: string;
    reveals: string;
    framework: string;
    family: 'Knowledge' | 'Mechanism' | 'Reasoning';
  }

  const matrix: RepEntry[] = [
    { operation: 'Instantiate', question: 'Что существует?', reveals: 'сущности и их связи', framework: 'ContextMap', family: 'Knowledge' },
    { operation: 'Decompose', question: 'Что должен уметь learner?', reveals: 'capabilities из методов', framework: 'CapabilityMap (group)', family: 'Knowledge' },
    { operation: 'Sequence', question: 'Что идёт до чего?', reveals: 'prerequisite order', framework: 'DependencyGraph', family: 'Knowledge' },
    { operation: 'Relate', question: 'Как понятия связаны?', reveals: 'semantic relationships', framework: 'ContextMap', family: 'Knowledge' },
    { operation: 'Cause', question: 'Почему X ведёт к Y?', reveals: 'причинный механизм', framework: 'CausalChain', family: 'Mechanism' },
    { operation: 'Transform', question: 'Какие состояния возможны?', reveals: 'states, transitions, guards', framework: 'StateMachine', family: 'Mechanism' },
    { operation: 'Interact', question: 'Кто с кем взаимодействует?', reveals: 'участники и порядок во времени', framework: 'SequenceDiagram', family: 'Mechanism' },
    { operation: 'Feedback', question: 'Как система стабилизируется?', reveals: 'control loop, deviation → correction', framework: 'FeedbackLoop', family: 'Mechanism' },
    { operation: 'Discover', question: 'Как learner открывает концепт?', reveals: 'когнитивный путь: confusion → model', framework: 'LearnerJourney', family: 'Knowledge' },
    { operation: 'Justify', question: 'Почему верить утверждению?', reveals: 'claims + evidence', framework: 'EvidenceMap', family: 'Knowledge' },
  ];

  const families = [
    { key: 'Knowledge', label: 'Knowledge / Concept Systems', desc: 'Структура знания: что существует, как связано, что от чего зависит' },
    { key: 'Mechanism', label: 'Mechanism / Explanatory Systems', desc: 'Поведение системы: последовательность, состояние, причинность, обратная связь' },
    { key: 'Reasoning', label: 'Reasoning / Decision Systems', desc: 'Принятие решений: сравнение, фильтрация, trade-off, синтез' },
  ];
</script>

<div class="theme-canvas">
  <div class="rmdemo">
    <header class="rmdemo__header">
      <h1 class="rmdemo__title">Representation Selection Matrix</h1>
      <p class="rmdemo__sub">Cognitive operation → Representational system → Live example</p>
    </header>

    <!-- FAMILY OVERVIEW -->
    <section class="rmdemo__section">
      <div class="rmdemo__families">
        {#each families as f}
          <div class="rmdemo__family">
            <span class="rmdemo__family-label">{f.label}</span>
            <span class="rmdemo__family-desc">{f.desc}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- MATRIX -->
    <section class="rmdemo__section">
      <h2 class="rmdemo__section-title">Matrix</h2>
      <div class="rmdemo__matrix">
        {#each matrix as row, i}
          <div class="rmdemo__row">
            <div class="rmdemo__cell rmdeo__cell--op">
              <span class="rmdemo__cell-label">operation</span>
              <span class="rmdemo__cell-value">{row.operation}</span>
            </div>
            <div class="rmdemo__cell rmdeo__cell--q">
              <span class="rmdemo__cell-label">question</span>
              <span class="rmdemo__cell-value">{row.question}</span>
            </div>
            <div class="rmdemo__cell rmdeo__cell--reveal">
              <span class="rmdemo__cell-label">reveals</span>
              <span class="rmdemo__cell-value">{row.reveals}</span>
            </div>
            <div class="rmdemo__cell rmdeo__cell--fw">
              <span class="rmdemo__cell-label">framework</span>
              <span class="rmdemo__cell-value">{row.framework}</span>
            </div>
            <span class="rmdemo__family-tag rmdeo__family--{row.family}">{row.family}</span>
          </div>
        {/each}
      </div>
    </section>

    <!-- LIVE EXAMPLES: Event Loop through different projections -->
    <section class="rmdemo__section">
      <h2 class="rmdemo__section-title">Live: Event Loop через 4 проекции</h2>
      <p class="rmdemo__section-desc">
        Один domain (Event Loop) — четыре разных cognitive question → четыре разных representation.
        Это не «четыре способа нарисовать одно и то же». Это четыре разных ответа на четыре разных вопроса.
      </p>

      <div class="rmdemo__grid">
        <!-- Structure: ContextMap -->
        <div class="rmdemo__frame">
          <span class="rmdemo__badge">structure · Что существует?</span>
          <Scene title="Structure — ContextMap">
            <ContextMap
              contexts={[
                { name: 'JS Runtime', entities: ['Call Stack', 'Heap'] },
                { name: 'Web APIs', entities: ['setTimeout', 'fetch', 'DOM Events'] },
                { name: 'Task Queue', entities: ['macrotasks'] },
                { name: 'Microtask Q', entities: ['Promise.then', 'queueMicrotask'] },
                { name: 'Render', entities: ['Style', 'Layout', 'Paint'] },
              ]}
              connections={[
                { from: 'JS Runtime', to: 'Web APIs', label: 'delegates' },
                { from: 'Web APIs', to: 'Task Queue', label: 'enqueues' },
                { from: 'Web APIs', to: 'Microtask Q', label: 'enqueues' },
                { from: 'Microtask Q', to: 'JS Runtime', label: 'drains first' },
                { from: 'Task Queue', to: 'JS Runtime', label: 'next tick' },
                { from: 'JS Runtime', to: 'Render', label: 'triggers' },
              ]}
            />
          </Scene>
        </div>

        <!-- Sequence: SequenceDiagram -->
        <div class="rmdemo__frame">
          <span class="rmdemo__badge">sequence · Кто с кем и когда?</span>
          <Scene title="Sequence — SequenceDiagram">
            <SequenceDiagram
              participants={[
                { id: 'js', label: 'JS Engine' },
                { id: 'timer', label: 'Timer API' },
                { id: 'queue', label: 'Task Queue' },
                { id: 'eloop', label: 'Event Loop' },
                { id: 'stack', label: 'Call Stack' },
              ]}
              messages={[
                { from: 'js', to: 'timer', label: 'setTimeout(fn, 0)' },
                { from: 'timer', to: 'queue', label: 'enqueue callback' },
                { from: 'queue', to: 'eloop', label: 'ready' },
                { from: 'eloop', to: 'stack', label: 'push callback' },
                { from: 'stack', to: 'js', label: 'execute fn()', isReturn: true },
              ]}
            />
          </Scene>
        </div>

        <!-- State: StateMachine -->
        <div class="rmdemo__frame">
          <span class="rmdemo__badge">state · Какие состояния возможны?</span>
          <Scene title="State — StateMachine">
            <StateMachine
              states={[
                { id: 'scheduled', label: 'scheduled', initial: true },
                { id: 'waiting', label: 'waiting' },
                { id: 'queued', label: 'queued' },
                { id: 'executing', label: 'executing' },
                { id: 'completed', label: 'completed', terminal: true },
              ]}
              transitions={[
                { from: 'scheduled', to: 'waiting', label: 'timer starts' },
                { from: 'waiting', to: 'queued', label: 'timer expires' },
                { from: 'queued', to: 'executing', label: 'event loop picks' },
                { from: 'executing', to: 'completed', label: 'fn returns' },
              ]}
            />
          </Scene>
        </div>

        <!-- Feedback: FeedbackLoop -->
        <div class="rmdemo__frame">
          <span class="rmdemo__badge">feedback · Как цикл стабилизируется?</span>
          <Scene title="Feedback — FeedbackLoop">
            <FeedbackLoop
              loop={{
                nodes: [
                  { id: 'idle', label: 'Idle' },
                  { id: 'micro', label: 'Drain microtasks' },
                  { id: 'macro', label: 'Pick macrotask' },
                  { id: 'exec', label: 'Execute' },
                  { id: 'render', label: 'Render' },
                ],
                edges: [
                  { from: 'idle', to: 'micro', label: 'stack empty' },
                  { from: 'micro', to: 'macro', label: 'micro queue drained' },
                  { from: 'macro', to: 'exec', label: 'task selected' },
                  { from: 'exec', to: 'render', label: 'task done' },
                  { from: 'render', to: 'idle', label: 'frame painted' },
                ],
                annotation: 'Event Loop Cycle',
              }}
            />
          </Scene>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .rmdemo { min-height: 100vh; padding: 40px 28px 80px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
  .rmdemo__header { text-align: center; max-width: 720px; }
  .rmdemo__title { font: var(--vnp-font) 28px/700; color: var(--canvas-ink); margin: 0 0 8px; letter-spacing: -0.02em; }
  .rmdemo__sub { font: var(--vnp-font-mono) 12px/500; color: var(--canvas-ink-soft); margin: 0; letter-spacing: 0.03em; text-transform: uppercase; }
  .rmdemo__section { width: 100%; max-width: 1080px; display: flex; flex-direction: column; gap: 14px; }
  .rmdemo__section-title { font: var(--vnp-font) 18px/700; color: var(--canvas-ink); margin: 0; letter-spacing: -0.01em; }
  .rmdemo__section-desc { font: var(--vnp-font) 13px/1.5; color: var(--canvas-ink-soft); margin: 0; max-width: 700px; }

  /* families */
  .rmdemo__families { display: flex; gap: 14px; flex-wrap: wrap; }
  .rmdemo__family { flex: 1 1 0; min-width: 220px; padding: 14px 16px; border: var(--canvas-stroke); border-radius: 8px; background: var(--canvas-panel-bg); display: flex; flex-direction: column; gap: 4px; }
  .rmdemo__family-label { font: var(--vnp-font) 13px/700; color: var(--canvas-ink); letter-spacing: -0.01em; }
  .rmdemo__family-desc { font: var(--vnp-font) 11px/1.4; color: var(--canvas-ink-soft); }

  /* matrix rows */
  .rmdemo__matrix { display: flex; flex-direction: column; gap: 2px; }
  .rmdemo__row { display: flex; align-items: center; gap: 10px; padding: 8px 14px; border-radius: 6px; background: var(--canvas-panel-bg); border: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; }
  .rmdemo__cell { display: flex; flex-direction: column; gap: 1px; }
  .rmdemo__cell--op { min-width: 100px; flex: 0 0 auto; }
  .rmdemo__cell--q { min-width: 160px; flex: 1 1 auto; }
  .rmdemo__cell--reveal { min-width: 140px; flex: 1 1 auto; }
  .rmdemo__cell--fw { min-width: 150px; flex: 0 0 auto; }
  .rmdemo__cell-label { font: var(--vnp-font-mono) 8px/600; text-transform: uppercase; letter-spacing: 0.10em; color: var(--canvas-ink-soft); opacity: 0.5; }
  .rmdemo__cell-value { font: var(--vnp-font) 12px/600; color: var(--canvas-ink); letter-spacing: -0.01em; }
  .rmdemo__family-tag { font: var(--vnp-font-mono) 9px/600; text-transform: uppercase; letter-spacing: 0.06em; padding: 2px 8px; border-radius: 3px; flex: 0 0 auto; }
  .rmdeo__family--Knowledge { color: var(--vnp-info); border: 1px solid color-mix(in srgb, var(--vnp-info) 35%, transparent); }
  .rmdeo__family--Mechanism { color: var(--canvas-highlight-ink); border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 35%, transparent); }
  .rmdeo__family--Reasoning { color: var(--canvas-mark-check); border: 1px solid color-mix(in srgb, var(--canvas-mark-check) 35%, transparent); }

  /* live examples */
  .rmdemo__grid { display: flex; flex-direction: column; gap: 32px; width: 100%; }
  .rmdemo__frame { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .rmdemo__badge { font: var(--vnp-font-mono) 10px/600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--canvas-ink-soft); padding-left: 4px; }
  .rmdemo__frame :global(.scene) { aspect-ratio: 16 / 9; height: auto; }
</style>
