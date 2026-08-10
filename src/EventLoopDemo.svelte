<script lang="ts">
  import {
    Scene,
    CapabilityMap,
    DependencyGraph,
    CausalChain,
    LearnerJourney,
    EvidenceMap,
    ContextMap,
  } from './lib/index.ts';
  import { eventLoopKnowledge } from './lib/canvases/knowledge-model.ts';
  import './lib/canvases/canvas-theme.css';

  const causal = $derived(
    eventLoopKnowledge.relationships
      .filter(r => r.type === 'causes')
      .map(r => ({ from: eventLoopKnowledge.entities.find(e => e.id === r.from)?.name ?? r.from, to: eventLoopKnowledge.entities.find(e => e.id === r.to)?.name ?? r.to, mechanism: r.label ?? '' }))
  );

  const evidenceClaims = $derived([
    {
      statement: 'Микрозадачи (Promise.then) выполняются до макрозадач (setTimeout)',
      evidence: [
        { type: 'benchmark' as const, description: 'Promise.resolve().then(() => 3) выполнится до setTimeout(() => 2, 0)' },
        { type: 'source' as const, description: 'HTML Spec §8.1.7.3: microtask checkpoint между macrotasks' },
      ],
    },
    {
      statement: 'Event Loop нельзя заблокировать бесконечными микрозадачами — браузер замерзает',
      evidence: [
        { type: 'example' as const, description: 'Рекурсивный queueMicrotask блокирует render бесконечно — UI не отвечает' },
        { type: 'counterexample' as const, description: 'Рекурсивный setTimeout даёт браузеру дышать между задачами' },
      ],
    },
    {
      statement: 'requestAnimationFrame выполняется после микрозадач, перед render',
      evidence: [
        { type: 'benchmark' as const, description: 'rAF callback всегда после Promise.then в том же цикле event loop' },
        { type: 'analogy' as const, description: 'rAF — последний шанс изменить DOM перед тем, как браузер нарисует кадр' },
      ],
    },
  ]);

  const ctxBoxes = [
    { name: 'JS Engine', entities: ['Call Stack', 'Heap', 'Garbage Collector'] },
    { name: 'Web APIs', entities: ['setTimeout', 'fetch', 'DOM Events', 'rAF'] },
    { name: 'Task Queue', entities: ['setTimeout cb', 'I/O cb', 'UI Event cb'] },
    { name: 'Microtask Queue', entities: ['Promise.then', 'queueMicrotask', 'MutationObserver'] },
    { name: 'Render Pipeline', entities: ['Style', 'Layout', 'Paint', 'Composite'] },
  ];
  const ctxConns = [
    { from: 'JS Engine', to: 'Web APIs', label: 'delegates to' },
    { from: 'Web APIs', to: 'Task Queue', label: 'enqueues' },
    { from: 'Web APIs', to: 'Microtask Queue', label: 'enqueues' },
    { from: 'Microtask Queue', to: 'JS Engine', label: 'drains into' },
    { from: 'Task Queue', to: 'JS Engine', label: 'pulls from' },
    { from: 'JS Engine', to: 'Render Pipeline', label: 'triggers' },
  ];
</script>

<div class="theme-canvas">
  <div class="eldemo">
    <header class="eldemo__header">
      <h1 class="eldemo__title">Как работает Event Loop</h1>
      <p class="eldemo__sub">Knowledge Model → Cognitive Projection → Framework</p>
    </header>

    <!-- KNOWLEDGE MODEL -->
    <section class="eldemo__section">
      <h2 class="eldemo__section-title">Knowledge Model</h2>
      <p class="eldemo__section-desc">
        {eventLoopKnowledge.description}
      </p>
      <div class="eldemo__frame">
        <span class="eldemo__badge">source · {eventLoopKnowledge.entities.length} entities · {eventLoopKnowledge.relationships.length} relationships</span>
        <Scene title="Event Loop — Knowledge Model">
          <ContextMap contexts={ctxBoxes} connections={ctxConns} />
        </Scene>
      </div>
    </section>

    <!-- PROJECTIONS -->
    <section class="eldemo__section">
      <h2 class="eldemo__section-title">Projections</h2>

      <div class="eldemo__grid">
        <!-- Capability: what must learner understand -->
        <div class="eldemo__frame">
          <span class="eldemo__badge">capability · что должен уметь learner?</span>
          <Scene title="Capability Projection">
            <CapabilityMap
              mode="group"
              methods={[
                { name: 'синхронное выполнение' },
                { name: 'колбэки' },
                { name: 'Promise.then' },
                { name: 'setTimeout' },
                { name: 'requestAnimationFrame' },
                { name: 'рендер-пайплайн' },
              ]}
              capabilities={[
                { name: 'EVENT LOOP', description: 'механизм координации асинхронных операций' },
              ]}
              provocation="JS однопоточный — значит, синхронный"
            />
          </Scene>
        </div>

        <!-- Causal: the mechanism -->
        <div class="eldemo__frame">
          <span class="eldemo__badge">causal · почему работает именно так?</span>
          <Scene title="Causal Projection">
            <CausalChain
              steps={[
                { from: 'Синхронный код', to: 'Call Stack пуст', mechanism: 'выполнился → стек опустел' },
                { from: 'Call Stack пуст', to: 'Microtask Queue drained', mechanism: 'Event Loop: сначала все микрозадачи' },
                { from: 'Microtask Queue drained', to: 'Macrotask выполняется', mechanism: 'одна макрозадача из Task Queue' },
                { from: 'Macrotask выполняется', to: 'Render', mechanism: 'браузер рисует кадр между задачами' },
                { from: 'Render', to: 'Следующая задача', mechanism: 'цикл повторяется: micro → macro → render' },
              ]}
            />
          </Scene>
        </div>

        <!-- Journey: cognitive discovery -->
        <div class="eldemo__frame">
          <span class="eldemo__badge">journey · как learner открывает?</span>
          <Scene title="Learner Journey">
            <LearnerJourney
              stages={[
                { state: 'confusion', description: 'Видит код', content: 'console.log(1); setTimeout(() => log(2)); Promise.resolve().then(() => log(3)); log(4)' },
                { state: 'prediction', description: 'Думает: 1, 2, 3, 4', content: 'setTimeout 0 — значит сразу после синхронного кода' },
                { state: 'observation', description: 'Видит: 1, 4, 3, 2', content: 'СТОП. Promise обогнал setTimeout. Почему?' },
                { state: 'explanation', description: 'Microtasks перед macrotasks', content: 'Promise.then — микрозадача. setTimeout — макрозадача. Event Loop drain-ит microtasks полностью между macrotasks.' },
                { state: 'model', description: 'Строит модель', content: 'Call Stack → Microtask Queue → Task Queue → Render. Может предсказать ЛЮБОЙ порядок.' },
                { state: 'application', description: 'Применяет', content: 'Понимает почему бесконечный microtask вешает UI, а макрозадача — нет. Выбирает правильный инструмент.' },
              ]}
            />
          </Scene>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .eldemo {
    min-height: 100vh;
    padding: 40px 28px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }
  .eldemo__header { text-align: center; max-width: 720px; }
  .eldemo__title { font: var(--vnp-font) 28px/700; color: var(--canvas-ink); margin: 0 0 8px; letter-spacing: -0.02em; }
  .eldemo__sub { font: var(--vnp-font-mono) 12px/500; color: var(--canvas-ink-soft); margin: 0; letter-spacing: 0.03em; text-transform: uppercase; }
  .eldemo__section { width: 100%; max-width: 1080px; display: flex; flex-direction: column; gap: 14px; }
  .eldemo__section-title { font: var(--vnp-font) 18px/700; color: var(--canvas-ink); margin: 0; letter-spacing: -0.01em; }
  .eldemo__section-desc { font: var(--vnp-font) 13px/1.5; color: var(--canvas-ink-soft); margin: 0; max-width: 700px; }
  .eldemo__grid { display: flex; flex-direction: column; gap: 32px; width: 100%; }
  .eldemo__frame { width: 100%; display: flex; flex-direction: column; gap: 8px; }
  .eldemo__badge { font: var(--vnp-font-mono) 10px/600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--canvas-ink-soft); padding-left: 4px; }
  .eldemo__frame :global(.scene) { aspect-ratio: 16 / 9; height: auto; }
</style>
