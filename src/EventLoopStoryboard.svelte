<script lang="ts">
  import {
    Scene, ContextMap, SequenceDiagram, StateMachine,
    CausalChain, FeedbackLoop,
  } from './lib/index.ts';
  import './lib/canvases/canvas-theme.css';

  /** ═══════════════════════════════════════════════════════════════
   *  EVENT LOOP STORYBOARD — two-dimensional architecture
   *  ───────────────────────────────────────────────────────────────
   *  Dimension 1 (Knowledge → Representation):
   *    Knowledge Model → Cognitive Projection → Framework → Visual
   *
   *  Dimension 2 (Learner → Learning):
   *    Current Model → Gap → Capability → Journey → Target Model
   *
   *  They intersect at the Learner Experience.
   *  ═══════════════════════════════════════════════════════════════ */

  interface JourneyStep {
    step: number;
    phase: string;                // learner journey phase
    // Dimension 2: Learner
    currentModel: string;
    gap: string;                  // misconception or missing piece
    // Dimension 1: Knowledge
    projection: string;           // cognitive projection: structure | temporal | state | causal
    question: string;             // the question this projection answers
    framework: string;            // representational framework selected
    // Narration
    narration: string;
    whatLearnerDoes: string;      // observable learner action at this step
  }

  const journey: JourneyStep[] = [
    {
      step: 1, phase: 'PREDICT',
      currentModel: 'setTimeout(fn, 0) выполняет fn сразу, как только синхронный код закончился. Promise — просто "быстрее".',
      gap: 'Ученик не различает macrotask и microtask — для него всё «асинхронное» одинаково.',
      projection: 'structure',
      question: 'Из чего состоит runtime?',
      framework: 'ContextMap',
      narration: 'Прежде чем опровергать — покажи карту. Ученик должен увидеть: JS Engine, Web APIs, две очереди, Event Loop — это разные сущности. Без этой карты любой пример будет магией.',
      whatLearnerDoes: 'Смотрит на карту runtime. Видит: Task Queue и Microtask Queue — разные.',
    },
    {
      step: 2, phase: 'OBSERVE CONTRADICTION',
      currentModel: 'setTimeout(..., 0) — значит «сразу после синхронного кода». Ожидание: A, B, C, D.',
      gap: 'Ученик не видит механизм — видит только результат. Нужно показать путь callback от регистрации до выполнения.',
      projection: 'temporal',
      question: 'В каком порядке происходят события?',
      framework: 'SequenceDiagram',
      narration: 'Не говори ответ. Покажи последовательность: JS → Timer API → Queue → Event Loop → Stack. Ученик сам увидит, где setTimeout «ждёт».',
      whatLearnerDoes: 'Смотрит на sequence diagram. Видит: между setTimeout и выполнением callback — четыре шага.',
    },
    {
      step: 3, phase: 'LOCALIZE',
      currentModel: 'Callback либо «ждёт», либо «выполняется». Два состояния.',
      gap: 'Ученик не различает «queued» (в очереди) и «executing» (на стеке). Отсюда иллюзия, что setTimeout(0) = мгновенно.',
      projection: 'state',
      question: 'Какие состояния у callback?',
      framework: 'StateMachine',
      narration: 'Пять состояний, не два. «Queued» — не то же самое, что «executing». Покажи переходы: scheduled → waiting → queued → executing → completed.',
      whatLearnerDoes: 'Видит: между «waiting» и «executing» есть «queued». Понимает, где задержка.',
    },
    {
      step: 4, phase: 'REVEAL MECHANISM',
      currentModel: 'Promise быстрее setTimeout, потому что «оптимизирован» или «браузер так решил».',
      gap: 'Ученик не знает про microtask checkpoint: Event Loop drain-ит ВСЕ microtasks перед КАЖДОЙ macrotask.',
      projection: 'causal',
      question: 'Почему Promise.then() оказывается раньше setTimeout?',
      framework: 'CausalChain',
      narration: 'Это не «быстрее». Это другой механизм. Стек опустел → drain microtasks → только потом macrotask. Причина — не оптимизация, а архитектура event loop.',
      whatLearnerDoes: 'Понимает причинный механизм: microtask checkpoint между macrotasks. Может объяснить почему.',
    },
    {
      step: 5, phase: 'BUILD MODEL',
      currentModel: 'Event Loop — это «шестерёнка», которая по очереди достаёт задачи и выполняет.',
      gap: 'Ученик видит линейный процесс, а не замкнутый control loop с render между итерациями.',
      projection: 'causal + temporal',
      question: 'Как цикл замыкается и стабилизируется?',
      framework: 'FeedbackLoop',
      narration: 'Event Loop — не линейный процесс. Это control cycle: micro → macro → render → micro → ... Бесконечный. Стабильный. Предсказуемый.',
      whatLearnerDoes: 'Видит замкнутый цикл. Понимает: render происходит между задачами, не во время.',
    },
    {
      step: 6, phase: 'RE-PREDICT',
      currentModel: 'Ученик полагается на запоминание правил: «micro перед macro, promise перед setTimeout».',
      gap: 'Запоминание ≠ модель. Ученик должен уметь предсказать порядок в НОВОМ коде, который он не видел.',
      projection: 'temporal + state',
      question: 'Можешь предсказать порядок для нового примера?',
      framework: 'SequenceDiagram + StateMachine (мысленно)',
      narration: 'Теперь ученик сам — Event Loop. Дай новый пример. Попроси предсказать. Если модель построена — предскажет правильно. Если нет — вернись к шагу 3.',
      whatLearnerDoes: 'Предсказывает порядок для нового кода. Правильно. Модель работает.',
    },
  ];

  // Knowledge Model summary (domain truth, not a diagram)
  const knowledgeModelEntities = [
    'Call Stack — LIFO, синхронное выполнение',
    'Web APIs — Timer, fetch, DOM (вне JS-потока)',
    'Task Queue — макрозадачи: setTimeout, I/O, UI events',
    'Microtask Queue — микрозадачи: Promise.then, queueMicrotask',
    'Event Loop — цикл: micro → macro → render → repeat',
    'Microtask checkpoint — drain ВСЕХ microtasks перед КАЖДОЙ macrotask',
  ];

  // Learner model summary
  const learnerModel = {
    capability: 'Predict event-loop execution order from code',
    currentSummary: 'Всё асинхронное одинаково. setTimeout(fn, 0) = сразу. Promise = просто быстрее.',
    targetSummary: 'Различает macrotask/microtask. Знает путь callback. Может предсказать порядок для любого кода.',
    evidenceOfUnderstanding: 'Ученику дан новый пример кода с setTimeout, Promise, и синхронными вызовами. Он правильно предсказывает порядок вывода и объясняет почему.',
  };
</script>

<div class="theme-canvas">
  <div class="sb">
    <header class="sb__header">
      <h1 class="sb__title">Event Loop Storyboard</h1>
      <p class="sb__sub">Two-dimensional architecture: Knowledge → Representation × Learner → Learning</p>
    </header>

    <!-- ═══ DIMENSION 2: LEARNER MODEL ═══ -->
    <section class="sb__model">
      <h2 class="sb__section-title">Learner Model</h2>
      <div class="sb__model-grid">
        <div class="sb__model-card sb__model-card--current">
          <span class="sb__model-label">Current Model</span>
          <p class="sb__model-text">{learnerModel.currentSummary}</p>
        </div>
        <div class="sb__model-card sb__model-card--gap">
          <span class="sb__model-label">Cognitive Gap</span>
          <p class="sb__model-text">Ученик не различает macrotask queue и microtask queue. Для него всё «асинхронное» — одно и то же.</p>
        </div>
        <div class="sb__model-card sb__model-card--capability">
          <span class="sb__model-label">Capability (observable)</span>
          <p class="sb__model-text">{learnerModel.capability}</p>
        </div>
        <div class="sb__model-card sb__model-card--target">
          <span class="sb__model-label">Target Model</span>
          <p class="sb__model-text">{learnerModel.targetSummary}</p>
        </div>
      </div>
      <div class="sb__evidence">
        <span class="sb__evidence-label">Evidence of understanding:</span>
        <span class="sb__evidence-text">{learnerModel.evidenceOfUnderstanding}</span>
      </div>
    </section>

    <!-- ═══ DIMENSION 1: KNOWLEDGE MODEL ═══ -->
    <section class="sb__model">
      <h2 class="sb__section-title">Knowledge Model — Domain Truth</h2>
      <div class="sb__km">
        {#each knowledgeModelEntities as e}
          <span class="sb__km-chip">{e}</span>
        {/each}
      </div>
    </section>

    <!-- ═══ LEARNER JOURNEY — the axis ═══ -->
    <section class="sb__model">
      <h2 class="sb__section-title">Learner Journey — where the two dimensions meet</h2>

      <div class="sb__journey-flow">
        {#each journey as j, i}
          <div class="sb__jstep">
            <span class="sb__jstep-phase">{j.phase}</span>
            {#if i < journey.length - 1}
              <span class="sb__jstep-arrow">↓</span>
            {/if}
          </div>
        {/each}
      </div>

      <!-- frames -->
      <div class="sb__frames">
        {#each journey as j}
          <div class="sb__frame">
            <!-- header -->
            <div class="sb__frame-head">
              <span class="sb__frame-num">{j.step}</span>
              <div class="sb__frame-meta">
                <span class="sb__frame-phase">{j.phase}</span>
                <span class="sb__frame-q">{j.question}</span>
              </div>
            </div>

            <!-- two dimensions side by side -->
            <div class="sb__dims">
              <!-- Dimension 2: Learner -->
              <div class="sb__dim sb__dim--learner">
                <span class="sb__dim-label">Learner → Learning</span>
                <div class="sb__dim-block sb__dim-block--current">
                  <span class="sb__dim-chip">current</span>
                  <span class="sb__dim-text">{j.currentModel}</span>
                </div>
                <div class="sb__dim-block sb__dim-block--gap">
                  <span class="sb__dim-chip">gap</span>
                  <span class="sb__dim-text">{j.gap}</span>
                </div>
                <div class="sb__dim-block sb__dim-block--action">
                  <span class="sb__dim-chip">learner does</span>
                  <span class="sb__dim-text">{j.whatLearnerDoes}</span>
                </div>
              </div>

              <!-- Dimension 1: Knowledge -->
              <div class="sb__dim sb__dim--knowledge">
                <span class="sb__dim-label">Knowledge → Representation</span>
                <div class="sb__dim-block sb__dim-block--proj">
                  <span class="sb__dim-chip">projection</span>
                  <span class="sb__dim-text">{j.projection}</span>
                </div>
                <div class="sb__dim-block sb__dim-block--fw">
                  <span class="sb__dim-chip">framework</span>
                  <span class="sb__dim-text">{j.framework}</span>
                </div>
              </div>
            </div>

            <!-- visual representation -->
            <div class="sb__scene">
              <Scene title={j.question}>
                {#if j.step === 1}
                  <ContextMap
                    contexts={[
                      { name: 'JS Engine', entities: ['Call Stack', 'Heap'] },
                      { name: 'Web APIs', entities: ['Timer', 'fetch', 'DOM'] },
                      { name: 'Microtask Q', entities: ['Promise.then', 'queueMicrotask'] },
                      { name: 'Task Queue', entities: ['setTimeout cb', 'I/O cb'] },
                      { name: 'Render', entities: ['Style', 'Layout', 'Paint'] },
                    ]}
                    connections={[
                      { from: 'JS Engine', to: 'Web APIs', label: 'delegates' },
                      { from: 'Web APIs', to: 'Task Queue', label: 'enqueues' },
                      { from: 'Web APIs', to: 'Microtask Q', label: 'enqueues' },
                      { from: 'Microtask Q', to: 'JS Engine', label: 'drains first' },
                      { from: 'Task Queue', to: 'JS Engine', label: 'next tick' },
                      { from: 'JS Engine', to: 'Render', label: 'triggers' },
                    ]}
                  />
                {:else if j.step === 2}
                  <SequenceDiagram
                    participants={[
                      { id: 'js', label: 'JS Engine' },
                      { id: 'timer', label: 'Timer API' },
                      { id: 'q', label: 'Task Queue' },
                      { id: 'el', label: 'Event Loop' },
                      { id: 'cs', label: 'Call Stack' },
                    ]}
                    messages={[
                      { from: 'js', to: 'timer', label: 'setTimeout(fn, 0)' },
                      { from: 'timer', to: 'q', label: 'enqueue cb' },
                      { from: 'q', to: 'el', label: 'ready' },
                      { from: 'el', to: 'cs', label: 'push fn' },
                      { from: 'cs', to: 'js', label: 'fn() done', isReturn: true },
                    ]}
                  />
                {:else if j.step === 3}
                  <StateMachine
                    states={[
                      { id: 'sched', label: 'scheduled', initial: true },
                      { id: 'wait', label: 'waiting' },
                      { id: 'q', label: 'queued' },
                      { id: 'exec', label: 'executing' },
                      { id: 'done', label: 'completed', terminal: true },
                    ]}
                    transitions={[
                      { from: 'sched', to: 'wait', label: 'timer starts' },
                      { from: 'wait', to: 'q', label: 'expires' },
                      { from: 'q', to: 'exec', label: 'EL picks' },
                      { from: 'exec', to: 'done', label: 'returns' },
                    ]}
                  />
                {:else if j.step === 4}
                  <CausalChain
                    steps={[
                      { from: 'Синхронный код', to: 'Microtask Queue', mechanism: 'Стек опустел → drain microtasks' },
                      { from: 'Microtask Queue', to: 'Task Queue', mechanism: 'Дренирована полностью → macrotask' },
                      { from: 'Task Queue', to: 'Render', mechanism: 'Macrotask выполнен → render' },
                    ]}
                  />
                {:else if j.step === 5}
                  <FeedbackLoop
                    loop={{
                      nodes: [
                        { id: 'idle', label: 'Idle' },
                        { id: 'micro', label: 'Microtasks' },
                        { id: 'macro', label: 'Macrotask' },
                        { id: 'exec', label: 'Execute' },
                        { id: 'render', label: 'Render' },
                      ],
                      edges: [
                        { from: 'idle', to: 'micro', label: 'stack empty' },
                        { from: 'micro', to: 'macro', label: 'drained' },
                        { from: 'macro', to: 'exec', label: 'picked' },
                        { from: 'exec', to: 'render', label: 'done' },
                        { from: 'render', to: 'idle', label: 'frame painted' },
                      ],
                      annotation: 'Event Loop — control cycle',
                    }}
                  />
                {:else if j.step === 6}
                  <SequenceDiagram
                    participants={[
                      { id: 'js', label: 'JS Engine' },
                      { id: 'mt', label: 'Microtask Q' },
                      { id: 'tq', label: 'Task Queue' },
                      { id: 'el', label: 'Event Loop' },
                      { id: 'cs', label: 'Call Stack' },
                    ]}
                    messages={[
                      { from: 'js', to: 'mt', label: 'Promise.then(fn)' },
                      { from: 'js', to: 'tq', label: 'setTimeout(fn, 0)' },
                      { from: 'mt', to: 'el', label: 'ready (micro)' },
                      { from: 'el', to: 'cs', label: 'push micro' },
                      { from: 'cs', to: 'js', label: 'micro done', isReturn: true },
                      { from: 'tq', to: 'el', label: 'ready (macro)' },
                      { from: 'el', to: 'cs', label: 'push macro' },
                    ]}
                  />
                {/if}
              </Scene>
            </div>

            <!-- narration -->
            <div class="sb__narration">
              <span class="sb__narration-label">🎙</span>
              <p class="sb__narration-text">{j.narration}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>
</div>

<style>
  .sb { min-height: 100vh; padding: 40px 28px 100px; display: flex; flex-direction: column; align-items: center; gap: 48px; }
  .sb__header { text-align: center; max-width: 720px; }
  .sb__title { font: var(--vnp-font) 28px/700; color: var(--canvas-ink); margin: 0 0 8px; letter-spacing: -0.02em; }
  .sb__sub { font: var(--vnp-font-mono) 12px/500; color: var(--canvas-ink-soft); margin: 0; letter-spacing: 0.03em; text-transform: uppercase; }
  .sb__section-title { font: var(--vnp-font) 16px/700; color: var(--canvas-ink); margin: 0 0 12px; letter-spacing: -0.01em; }

  /* sections */
  .sb__model { width: 100%; max-width: 1080px; display: flex; flex-direction: column; }

  /* learner model cards */
  .sb__model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-bottom: 12px; }
  .sb__model-card { padding: 12px 14px; border-radius: 8px; border: 1px solid; display: flex; flex-direction: column; gap: 4px; }
  .sb__model-card--current { border-color: color-mix(in srgb, var(--canvas-mark-cross) 40%, transparent); background: color-mix(in srgb, var(--canvas-mark-cross) 5%, transparent); }
  .sb__model-card--gap { border-color: color-mix(in srgb, var(--canvas-highlight-ink) 40%, transparent); background: color-mix(in srgb, var(--canvas-sticky-yellow) 6%, transparent); }
  .sb__model-card--capability { border-color: var(--canvas-sticky-blue-border); background: color-mix(in srgb, var(--canvas-sticky-blue) 50%, transparent); }
  .sb__model-card--target { border-color: var(--canvas-sticky-green-border); background: color-mix(in srgb, var(--canvas-sticky-green) 50%, transparent); }
  .sb__model-label { font: var(--vnp-font-mono) 9px/600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--canvas-ink-soft); }
  .sb__model-text { font: var(--vnp-font) 12px/1.45; color: var(--canvas-ink); margin: 0; }

  .sb__evidence { display: flex; gap: 8px; align-items: baseline; padding: 8px 14px; border: var(--canvas-stroke); border-radius: 6px; background: var(--canvas-panel-bg); flex-wrap: wrap; }
  .sb__evidence-label { font: var(--vnp-font-mono) 10px/600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--canvas-ink-soft); flex-shrink: 0; }
  .sb__evidence-text { font: var(--vnp-font) 12px/1.4; color: var(--canvas-ink); }

  /* knowledge model chips */
  .sb__km { display: flex; flex-wrap: wrap; gap: 8px; }
  .sb__km-chip { font: var(--vnp-font-mono) 10px/500; color: var(--canvas-ink-soft); padding: 5px 12px; border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent); border-radius: 6px; background: var(--canvas-panel-bg); }

  /* journey flow */
  .sb__journey-flow { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 28px; padding: 10px 16px; border: var(--canvas-stroke); border-radius: 8px; background: var(--canvas-panel-bg); }
  .sb__jstep { display: flex; align-items: center; gap: 4px; }
  .sb__jstep-phase { font: var(--vnp-font-mono) 10px/600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--vnp-info); padding: 3px 10px; border: 1px solid color-mix(in srgb, var(--vnp-info) 35%, transparent); border-radius: 4px; background: color-mix(in srgb, var(--vnp-info) 8%, transparent); }
  .sb__jstep-arrow { font-size: 14px; color: var(--canvas-ink-soft); opacity: 0.3; }

  /* frames */
  .sb__frames { display: flex; flex-direction: column; gap: 40px; width: 100%; }
  .sb__frame { display: flex; flex-direction: column; gap: 10px; }
  .sb__frame-head { display: flex; align-items: center; gap: 14px; }
  .sb__frame-num { font: var(--vnp-font-mono) 28px/700; color: var(--canvas-ink-soft); opacity: 0.25; min-width: 36px; }
  .sb__frame-phase { font: var(--vnp-font) 16px/700; color: var(--vnp-info); letter-spacing: -0.01em; }
  .sb__frame-q { font: var(--vnp-font-mono) 11px/500; color: var(--canvas-ink-soft); }

  /* two dimensions */
  .sb__dims { display: flex; gap: 10px; flex-wrap: wrap; }
  .sb__dim { flex: 1 1 0; min-width: 240px; display: flex; flex-direction: column; gap: 6px; padding: 10px 14px; border-radius: 8px; }
  .sb__dim--learner { border: 1px solid color-mix(in srgb, var(--vnp-info) 25%, transparent); background: color-mix(in srgb, var(--vnp-info) 4%, transparent); }
  .sb__dim--knowledge { border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 25%, transparent); background: color-mix(in srgb, var(--canvas-sticky-yellow) 4%, transparent); }
  .sb__dim-label { font: var(--vnp-font-mono) 8px/600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--canvas-ink-soft); opacity: 0.5; margin-bottom: 2px; }
  .sb__dim-block { display: flex; flex-direction: column; gap: 2px; }
  .sb__dim-chip { font: var(--vnp-font-mono) 8px/600; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.5; }
  .sb__dim-block--current .sb__dim-chip { color: var(--canvas-mark-cross); }
  .sb__dim-block--gap .sb__dim-chip { color: var(--canvas-highlight-ink); }
  .sb__dim-block--action .sb__dim-chip { color: var(--vnp-info); }
  .sb__dim-block--proj .sb__dim-chip { color: var(--canvas-highlight-ink); }
  .sb__dim-block--fw .sb__dim-chip { color: var(--canvas-ink-soft); }
  .sb__dim-text { font: var(--vnp-font) 11px/1.4; color: var(--canvas-ink); }

  /* visual scene */
  .sb__scene :global(.scene) { aspect-ratio: 16 / 9; height: auto; }

  /* narration */
  .sb__narration { display: flex; align-items: flex-start; gap: 8px; padding: 10px 14px; border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 30%, transparent); border-radius: 8px; background: color-mix(in srgb, var(--canvas-sticky-yellow) 6%, transparent); }
  .sb__narration-label { font-size: 14px; flex-shrink: 0; padding-top: 1px; }
  .sb__narration-text { font: var(--vnp-font) 12px/1.5; color: var(--canvas-ink); margin: 0; }
</style>
