<script lang="ts">
  import { Scene, ContextMap, SequenceDiagram, StateMachine, CausalChain, FeedbackLoop } from './lib/index.ts';
  import './lib/canvases/canvas-theme.css';

  /** Каждый шаг — event, применённый к aggregate (тому, что ученик уже знает).
   *  После шага aggregate целостен: ученик может ответить на вопрос шага полностью.
   *  Следующий шаг восстанавливает aggregate (memory) + добавляет новое. */

  interface AggregateState {
    label: string;
    items: string[];
  }
</script>

<div class="theme-canvas">
  <div class="ld">
    <header class="ld__hero">
      <h1 class="ld__title">Как работает Event Loop</h1>
      <p class="ld__sub">8 шагов. После каждого — aggregate целостен. Ничего не надо держать в голове.</p>
    </header>

    <!-- ═══ STEP 1: PREDICT ═══ -->
    <section class="ld__step">
      <span class="ld__num">1</span>
      <h2 class="ld__q">Что выведет этот код?</h2>
      <div class="ld__code">
        <code>console.log(<b>"A"</b>);</code>
        <code>setTimeout(() => console.log(<b>"B"</b>), <b>0</b>);</code>
        <code>Promise.resolve().then(() => console.log(<b>"C"</b>));</code>
        <code>console.log(<b>"D"</b>);</code>
      </div>
      <div class="ld__predict">
        <span class="ld__predict-answer">A, B, C, D — по порядку?</span>
      </div>
      <!-- aggregate после шага 1: пока ничего, только prediction -->
    </section>

    <!-- ═══ STEP 2: OBSERVE ═══ -->
    <section class="ld__step">
      <span class="ld__num">2</span>
      <h2 class="ld__q">Реальность — не A,B,C,D</h2>
      <div class="ld__reveal">
        <div class="ld__reveal-col">
          <span class="ld__reveal-label">Ожидание</span>
          <span class="ld__reveal-val ld__reveal-val--wrong">A → B → C → D</span>
        </div>
        <span class="ld__reveal-vs">≠</span>
        <div class="ld__reveal-col">
          <span class="ld__reveal-label">Реальность</span>
          <span class="ld__reveal-val ld__reveal-val--right">A → D → C → B</span>
        </div>
      </div>
      <p class="ld__insight">Promise.then(C) обогнал setTimeout(B, 0). Это не «оптимизация». Это <b>разные очереди</b>.</p>
      <!-- aggregate: знает, что ожидание ≠ реальность, есть загадка -->
    </section>

    <!-- ═══ STEP 3: STRUCTURE — закрываем вопрос «из чего состоит» ═══ -->
    <section class="ld__step">
      <span class="ld__num">3</span>
      <h2 class="ld__q">Из чего состоит runtime?</h2>

      <!-- memory: что уже знаем (сжато) -->
      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">A,D — sync first</span>
        <span class="ld__mem-chip">C (Promise) before B (setTimeout)</span>
      </div>

      <p class="ld__insight">Чтобы понять почему — нужна карта. Вот кто здесь живёт.</p>

      <div class="ld__frame">
        <Scene>
          <ContextMap
            contexts={[
              { name: 'JS Engine', entities: ['Call Stack', 'Heap'] },
              { name: 'Web APIs', entities: ['Timer', 'fetch', 'DOM'] },
              { name: 'Event Loop', entities: ['drain microtasks', 'pick macrotask', 'trigger render'] },
              { name: 'Microtask Queue', entities: ['Promise.then', 'queueMicrotask'] },
              { name: 'Task Queue', entities: ['setTimeout cb', 'I/O events'] },
              { name: 'Render', entities: ['Style', 'Layout', 'Paint'] },
            ]}
            connections={[
              { from: 'JS Engine', to: 'Web APIs', label: 'delegates' },
              { from: 'Web APIs', to: 'Task Queue', label: 'enqueues' },
              { from: 'Web APIs', to: 'Microtask Queue', label: 'enqueues' },
              { from: 'Event Loop', to: 'Microtask Queue', label: 'drains first' },
              { from: 'Event Loop', to: 'Task Queue', label: 'picks next' },
              { from: 'Event Loop', to: 'JS Engine', label: 'pushes to stack' },
              { from: 'Event Loop', to: 'Render', label: 'triggers' },
            ]}
          />
        </Scene>
      </div>

      <!-- закрытие aggregate: что теперь целостно -->
      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Теперь ты знаешь: <b>Event Loop — центр управления.</b> Две очереди — Microtask и Task. Event Loop решает, что и когда выполнять. Promise.then идёт в Microtask. setTimeout — в Task.</span>
      </div>
    </section>

    <!-- ═══ STEP 4: MISCONCEPTION — flow showing the learner's current model ═══ -->
    <section class="ld__step">
      <span class="ld__num">4</span>
      <h2 class="ld__q">Ты сейчас думаешь так:</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">Microtask Queue</span>
        <span class="ld__mem-chip">Task Queue</span>
        <span class="ld__mem-chip">Event Loop — главный</span>
      </div>

      <!-- MISCONCEPTION: Event Loop as passive courier -->
      <div class="ld__misconception">
        <span class="ld__misconception-label">Твоя текущая модель</span>
        <div class="ld__courier-flow">
          <span class="ld__courier-node">setTimeout(fn, 0)</span>
          <span class="ld__courier-arrow">→</span>
          <span class="ld__courier-node ld__courier-node--ghost">Event Loop<br><small>«курьер»</small></span>
          <span class="ld__courier-arrow">→</span>
          <span class="ld__courier-node">fn()<br><small>выполнилось</small></span>
        </div>
        <p class="ld__misconception-why">Модель «курьер»: setTimeout → callback ждёт → Event Loop переносит → выполнилось.<br><b>Здесь Event Loop — пассивный. Он просто moving parts.</b></p>
      </div>

      <p class="ld__insight">Но в этой модели <b>нет арбитража.</b> Нет проверки стека. Нет выбора между очередями. Нет условий.</p>
    </section>

    <!-- ═══ STEP 5: ARBITRATOR — contrast: Event Loop as active decision-maker ═══ -->
    <section class="ld__step">
      <span class="ld__num">5</span>
      <h2 class="ld__q">А на самом деле — кто принимает решение?</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">Microtask Queue</span>
        <span class="ld__mem-chip">Task Queue</span>
        <span class="ld__mem-chip">модель «курьер» — ложная</span>
        <span class="ld__mem-chip">Event Loop — главный</span>
      </div>

      <p class="ld__insight">Event Loop — не курьер. Он <b>вышибала у сцены.</b> Вот что происходит — и как меняется состояние после каждого шага.</p>

<p class="ld__insight">Event Loop — не курьер. Он <b>вышибала у сцены.</b> Все герои — на своих местах. История идёт сверху вниз.</p>

      <!-- Stage-based storytelling: characters in fixed positions, steps below -->
      <div class="ld__stage">
        <!-- CHARACTERS — always visible in fixed positions -->
        <div class="ld__cast">
          <div class="ld__actor ld__actor--js">
            <span class="ld__actor-name">JS-код</span>
            <span class="ld__actor-role">пишет и выполняет</span>
          </div>
          <div class="ld__actor ld__actor--timer">
            <span class="ld__actor-name">Timer API</span>
            <span class="ld__actor-role">внешний помощник</span>
          </div>
          <div class="ld__actor ld__actor--eloop">
            <span class="ld__actor-name">Event Loop</span>
            <span class="ld__actor-role">арбитр</span>
          </div>
          <div class="ld__actor ld__actor--vip">
            <span class="ld__actor-name">VIP-очередь</span>
            <span class="ld__actor-role">Microtask</span>
          </div>
          <div class="ld__actor ld__actor--normal">
            <span class="ld__actor-name">Обычная очередь</span>
            <span class="ld__actor-role">Task</span>
          </div>
          <div class="ld__actor ld__actor--stack">
            <span class="ld__actor-name">Стек</span>
            <span class="ld__actor-role">сцена</span>
          </div>
          <div class="ld__actor ld__actor--browser">
            <span class="ld__actor-name">Браузер</span>
            <span class="ld__actor-role">зритель</span>
          </div>
        </div>

        <!-- STEPS — numbered interactions between characters -->
        <div class="ld__steps">
          <div class="ld__step-row">
            <span class="ld__step-num">1</span>
            <span class="ld__step-from">JS-код</span>
            <span class="ld__step-arrow">→ setTimeout(fn, 0) →</span>
            <span class="ld__step-to">Timer API</span>
            <span class="ld__step-state"><span class="ld__mini-stack"><span class="ld__mini-frame">D</span><span class="ld__mini-frame">A</span></span> VIP: — | Обычная: —</span>
          </div>
          <div class="ld__step-row">
            <span class="ld__step-num">2</span>
            <span class="ld__step-from">Timer API</span>
            <span class="ld__step-arrow">→ ставит callback →</span>
            <span class="ld__step-to">Обычная</span>
            <span class="ld__step-state"><span class="ld__mini-stack"><span class="ld__mini-frame">D</span><span class="ld__mini-frame">A</span></span> VIP: — | <b>Обычная: [fn]</b></span>
          </div>
          <div class="ld__step-row">
            <span class="ld__step-num">3</span>
            <span class="ld__step-from">Promise.then</span>
            <span class="ld__step-arrow">→ ставит callback →</span>
            <span class="ld__step-to">VIP-очередь</span>
            <span class="ld__step-state"><span class="ld__mini-stack"><span class="ld__mini-frame">D</span><span class="ld__mini-frame">A</span></span> <b>VIP: [pr]</b> | Обычная: [fn]</span>
          </div>
          <div class="ld__step-row ld__step-row--key">
            <span class="ld__step-num">4</span>
            <span class="ld__step-from">Стек</span>
            <span class="ld__step-arrow">→ опустел →</span>
            <span class="ld__step-to">Event Loop</span>
            <span class="ld__step-state"><span class="ld__mini-stack ld__mini-stack--empty"><span class="ld__mini-frame ld__mini-frame--empty">∅</span></span> <b>VIP: [pr]</b> | Обычная: [fn]</span>
          </div>
          <div class="ld__step-row ld__step-row--key">
            <span class="ld__step-num">5</span>
            <span class="ld__step-from">Event Loop</span>
            <span class="ld__step-arrow">→ drain ВСЕХ →</span>
            <span class="ld__step-to">VIP → Стек</span>
            <span class="ld__step-state"><span class="ld__mini-stack"><span class="ld__mini-frame">pr()</span></span> <b>VIP: пусто ✓</b> | Обычная: [fn]</span>
          </div>
          <div class="ld__step-row ld__step-row--key">
            <span class="ld__step-num">6</span>
            <span class="ld__step-from">Event Loop</span>
            <span class="ld__step-arrow">→ берёт ОДНУ →</span>
            <span class="ld__step-to">Обычная → Стек</span>
            <span class="ld__step-state"><span class="ld__mini-stack"><span class="ld__mini-frame">fn()</span></span> VIP: пусто | <b>Обычная: пусто ✓</b></span>
          </div>
          <div class="ld__step-row">
            <span class="ld__step-num">7</span>
            <span class="ld__step-from">Стек</span>
            <span class="ld__step-arrow">→ render →</span>
            <span class="ld__step-to">Браузер</span>
            <span class="ld__step-state">A, D, C, B — зритель видит результат</span>
          </div>
          <div class="ld__step-loop">
            <span class="ld__step-loop-icon">↻</span>
            <span>Event Loop возвращается к шагу 4. Бесконечно.</span>
          </div>
        </div>
      </div>

      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Теперь ты знаешь: <b>Event Loop — вышибала, не курьер.</b> Он решает, кто идёт на сцену. Правила простые: сначала все из VIP, потом один из обычных, потом показать зрителю. Повторить.</span>
      </div>
    </section>

    <!-- ═══ STEP 6: STATE — aggregate = structure + sequence + state ═══ -->
    <section class="ld__step">
      <span class="ld__num">6</span>
      <h2 class="ld__q">В каком состоянии находится callback?</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">путь: Timer → Queue → Loop → Stack</span>
        <span class="ld__mem-chip">Microtask ≠ Task</span>
      </div>

      <div class="ld__frame">
        <Scene>
          <StateMachine
            states={[
              { id: 'sched', label: 'scheduled', initial: true },
              { id: 'wait', label: 'waiting' },
              { id: 'queued', label: 'queued' },
              { id: 'exec', label: 'executing' },
              { id: 'done', label: 'completed', terminal: true },
            ]}
            transitions={[
              { from: 'sched', to: 'wait', label: 'timer starts' },
              { from: 'wait', to: 'queued', label: 'expires' },
              { from: 'queued', to: 'exec', label: 'EL picks' },
              { from: 'exec', to: 'done', label: 'returns' },
            ]}
          />
        </Scene>
      </div>

      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Теперь ты знаешь: <b>5 состояний, не 2. «Queued» ≠ «Executing».</b> Между ними — Event Loop arbitration. Здесь setTimeout(0) «ждёт».</span>
      </div>
    </section>

    <!-- ═══ STEP 7: CAUSAL — aggregate += causal ═══ -->
    <section class="ld__step">
      <span class="ld__num">7</span>
      <h2 class="ld__q">Почему Promise.then обгоняет setTimeout?</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">Microtask Queue ≠ Task Queue</span>
        <span class="ld__mem-chip">callback: 5 состояний</span>
        <span class="ld__mem-chip">путь: Timer → Queue → Loop → Stack</span>
      </div>

      <div class="ld__frame">
        <Scene>
          <CausalChain
            steps={[
              { from: 'Синхронный код', to: 'Microtask Queue', mechanism: 'Call Stack опустел → Event Loop drain-ит ВСЕ microtasks' },
              { from: 'Microtask Queue', to: 'Macrotask', mechanism: 'Microtask Queue пуста → берём ОДНУ macrotask из Task Queue' },
              { from: 'Macrotask', to: 'Следующий цикл', mechanism: 'Macrotask выполнен → render → micro → macro → ...' },
            ]}
          />
        </Scene>
      </div>

      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Теперь ты знаешь: <b>Microtask checkpoint.</b> Event Loop drain-ит ВСЕ microtasks перед КАЖДОЙ macrotask. Promise.then — microtask. setTimeout — macrotask. Причина — архитектура, не оптимизация.</span>
      </div>
    </section>

    <!-- ═══ STEP 8: FEEDBACK — aggregate += feedback ═══ -->
    <section class="ld__step">
      <span class="ld__num">8</span>
      <h2 class="ld__q">Как цикл замыкается?</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Уже знаем:</span>
        <span class="ld__mem-chip">micro перед macro</span>
        <span class="ld__mem-chip">microtask checkpoint</span>
        <span class="ld__mem-chip">5 состояний callback</span>
      </div>

      <div class="ld__frame">
        <Scene>
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
        </Scene>
      </div>

      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Теперь ты знаешь: <b>Event Loop — бесконечный control cycle.</b> Micro → macro → render → micro. Предсказуемо. Стабильно. Для любого кода.</span>
      </div>
    </section>

    <!-- ═══ STEP 9: RE-PREDICT — полный aggregate проверяется ═══ -->
    <section class="ld__step ld__step--final">
      <span class="ld__num">9</span>
      <h2 class="ld__q">Теперь ты. Что выведет этот код?</h2>

      <div class="ld__mem">
        <span class="ld__mem-label">Твой aggregate — всё, что ты теперь знаешь:</span>
        <span class="ld__mem-chip">Microtask Queue ≠ Task Queue</span>
        <span class="ld__mem-chip">micro перед macro</span>
        <span class="ld__mem-chip">callback: 5 состояний</span>
        <span class="ld__mem-chip">microtask checkpoint</span>
        <span class="ld__mem-chip">control cycle</span>
      </div>

      <div class="ld__code">
        <code>console.log(<b>"1"</b>);</code>
        <code>setTimeout(() => console.log(<b>"2"</b>), <b>10</b>);</code>
        <code>Promise.resolve().then(() => {'{'}</code>
        <code>  console.log(<b>"3"</b>);</code>
        <code>  setTimeout(() => console.log(<b>"4"</b>), <b>0</b>);</code>
        <code>{'}'});</code>
        <code>console.log(<b>"5"</b>);</code>
      </div>

      <div class="ld__answer">
        <span class="ld__answer-label">Правильный ответ:</span>
        <span class="ld__answer-val">1 → 5 → 3 → 2 → 4</span>
      </div>

      <div class="ld__close">
        <span class="ld__close-icon">✓</span>
        <span class="ld__close-text">Синхронный код (1,5) → microtask (3, ставит setTimeout(4,0)) → macrotask 2 (10ms) → macrotask 4 (0ms, но зарегистрирована ПОЗЖЕ — когда microtask checkpoint уже прошёл). <b>Ты можешь это предсказать.</b> Aggregate собран.</span>
      </div>
    </section>
  </div>
</div>

<style>
  .ld { min-height: 100vh; padding: 48px 28px 100px; display: flex; flex-direction: column; align-items: center; gap: 56px; }
  .ld__hero { text-align: center; max-width: 640px; }
  .ld__title { font: var(--vnp-font) 32px/700; color: var(--canvas-ink); margin: 0 0 10px; letter-spacing: -0.02em; }
  .ld__sub { font: var(--vnp-font) 15px/1.45; color: var(--canvas-ink-soft); margin: 0; }

  /* step */
  .ld__step { width: 100%; max-width: 960px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .ld__step--final { padding: 28px 22px; border: 1px solid var(--canvas-sticky-green-border); border-radius: 12px; background: color-mix(in srgb, var(--canvas-sticky-green) 30%, transparent); }
  .ld__num { font: var(--vnp-font-mono) 48px/700; color: var(--canvas-ink-soft); opacity: 0.18; }
  .ld__q { font: var(--vnp-font) 20px/700; color: var(--canvas-ink); margin: 0; letter-spacing: -0.01em; text-align: center; }

  /* memory — aggregate state from previous steps */
  .ld__mem { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; padding: 8px 14px; border: var(--canvas-stroke); border-radius: 8px; background: var(--canvas-panel-bg); max-width: 720px; }
  .ld__mem-label { font: var(--vnp-font-mono) 9px/600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--canvas-ink-soft); opacity: 0.5; margin-right: 4px; }
  .ld__mem-chip { font: var(--vnp-font-mono) 10px/500; color: var(--canvas-ink-soft); padding: 3px 10px; border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 20%, transparent); border-radius: 4px; background: var(--vnp-card); white-space: nowrap; }

  /* code */
  .ld__code { display: flex; flex-direction: column; gap: 3px; padding: 16px 22px; border: var(--canvas-stroke); border-radius: 8px; background: var(--vnp-paper); font: var(--vnp-font-mono) 14px/1.6; color: var(--canvas-ink-soft); min-width: 340px; }
  .ld__code b { color: var(--canvas-ink); font-weight: 600; }

  /* predict */
  .ld__predict-answer { font: var(--vnp-font) 16px/600; color: var(--canvas-ink-soft); }

  /* reveal */
  .ld__reveal { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center; }
  .ld__reveal-col { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 14px 22px; border-radius: 8px; }
  .ld__reveal-col:first-child { border: 1px solid color-mix(in srgb, var(--canvas-mark-cross) 40%, transparent); background: color-mix(in srgb, var(--canvas-mark-cross) 5%, transparent); }
  .ld__reveal-col:last-child { border: 1px solid var(--canvas-sticky-green-border); background: color-mix(in srgb, var(--canvas-sticky-green) 8%, transparent); }
  .ld__reveal-label { font: var(--vnp-font-mono) 10px/600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--canvas-ink-soft); }
  .ld__reveal-val { font: var(--vnp-font-mono) 18px/700; letter-spacing: 0.03em; }
  .ld__reveal-val--wrong { color: var(--canvas-mark-cross); }
  .ld__reveal-val--right { color: var(--canvas-mark-check); }
  .ld__reveal-vs { font: var(--vnp-font-mono) 28px/700; color: var(--canvas-ink-soft); opacity: 0.3; }

  /* insight */
  .ld__insight { font: var(--vnp-font) 15px/1.5; color: var(--canvas-ink); margin: 0; text-align: center; max-width: 620px; }
  .ld__insight b { color: var(--vnp-info); }

  /* close — aggregate consistency checkpoint */
  .ld__close { display: flex; align-items: flex-start; gap: 8px; padding: 10px 16px; border: 1px solid var(--canvas-sticky-green-border); border-radius: 8px; background: color-mix(in srgb, var(--canvas-sticky-green) 12%, transparent); max-width: 640px; }
  .ld__close-icon { color: var(--canvas-mark-check); font: var(--vnp-font-mono) 14px/700; flex-shrink: 0; padding-top: 1px; }
  .ld__close-text { font: var(--vnp-font) 13px/1.45; color: var(--canvas-ink); }
  .ld__close-text b { color: var(--vnp-info); }

  /* frame */
  .ld__frame { width: 100%; }
  .ld__frame :global(.scene) { aspect-ratio: 16 / 9; height: auto; }

  /* answer */
  .ld__answer { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; justify-content: center; }
  .ld__answer-label { font: var(--vnp-font-mono) 11px/600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--canvas-ink-soft); }
  .ld__answer-val { font: var(--vnp-font-mono) 18px/700; color: var(--canvas-mark-check); letter-spacing: 0.04em; }

  /* ═══ STAGE-BASED STORYTELLING — fixed characters, eye follows arrows ═══ */
  .ld__stage { width: 100%; max-width: 760px; display: flex; flex-direction: column; gap: 14px; }

  /* cast — characters in fixed positions */
  .ld__cast { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; align-items: flex-start; padding: 14px 18px; border: var(--canvas-stroke); border-radius: 12px; background: var(--canvas-panel-bg); }
  .ld__actor { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 14px; border-radius: 8px; border: 1px solid; min-width: 90px; }
  .ld__actor-name { font: var(--vnp-font) 12px/700; color: var(--canvas-ink); letter-spacing: -0.01em; text-align: center; }
  .ld__actor-role { font: var(--vnp-font-mono) 8px/500; color: var(--canvas-ink-soft); text-transform: uppercase; letter-spacing: 0.05em; }
  .ld__actor--js { border-color: var(--canvas-sticky-green-border); background: color-mix(in srgb, var(--canvas-sticky-green) 50%, transparent); }
  .ld__actor--timer { border-color: color-mix(in srgb, var(--canvas-ink-soft) 30%, transparent); background: var(--canvas-panel-bg); }
  .ld__actor--eloop { border-color: var(--vnp-info); background: var(--canvas-sticky-blue); box-shadow: 0 0 14px color-mix(in srgb, var(--vnp-info) 28%, transparent); }
  .ld__actor--vip { border-color: var(--canvas-sticky-blue-border); background: color-mix(in srgb, var(--canvas-sticky-blue) 50%, transparent); }
  .ld__actor--normal { border-color: color-mix(in srgb, var(--canvas-ink-soft) 30%, transparent); background: var(--canvas-panel-bg); }
  .ld__actor--stack { border-color: var(--canvas-sticky-green-border); background: color-mix(in srgb, var(--canvas-sticky-green) 40%, transparent); }
  .ld__actor--browser { border-color: color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent); background: var(--canvas-panel-bg); opacity: 0.7; }

  /* steps — numbered interactions between characters */
  .ld__steps { display: flex; flex-direction: column; gap: 2px; }
  .ld__step-row { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 6px; background: var(--canvas-panel-bg); border: 1px solid rgba(255,255,255,0.04); flex-wrap: wrap; }
  .ld__step-row--key { background: color-mix(in srgb, var(--vnp-info) 6%, transparent); border-color: color-mix(in srgb, var(--vnp-info) 20%, transparent); }
  .ld__step-num { font: var(--vnp-font-mono) 13px/700; color: var(--canvas-ink-soft); opacity: 0.35; min-width: 18px; }
  .ld__step-from { font: var(--vnp-font) 12px/700; color: var(--canvas-ink); letter-spacing: -0.01em; padding: 2px 8px; border-radius: 4px; background: var(--vnp-card); border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent); white-space: nowrap; }
  .ld__step-arrow { font: var(--vnp-font-mono) 10px/500; color: var(--canvas-ink-soft); white-space: nowrap; }
  .ld__step-to { font: var(--vnp-font) 12px/700; color: var(--canvas-ink); letter-spacing: -0.01em; padding: 2px 8px; border-radius: 4px; background: var(--vnp-card); border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent); white-space: nowrap; }
  .ld__step-state { font: var(--vnp-font-mono) 9px/500; color: var(--canvas-ink-soft); margin-left: auto; }
  .ld__step-state b { font-weight: 600; color: var(--canvas-highlight-ink); }

  /* mini stack — visual LIFO representation */
  .ld__mini-stack { display: inline-flex; flex-direction: column-reverse; align-items: stretch; gap: 0; border: 1px solid var(--canvas-sticky-green-border); border-radius: 4px; overflow: hidden; vertical-align: middle; margin-right: 4px; background: var(--vnp-card); }
  .ld__mini-stack--empty { border-style: dashed; opacity: 0.45; }
  .ld__mini-frame { font: var(--vnp-font-mono) 9px/600; color: var(--canvas-ink); padding: 1px 7px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.06); background: color-mix(in srgb, var(--canvas-sticky-green) 25%, transparent); min-width: 24px; }
  .ld__mini-frame:last-child { border-bottom: none; }
  .ld__mini-frame--empty { background: transparent; color: var(--canvas-ink-soft); }

  .ld__step-loop { display: flex; align-items: center; gap: 8px; padding: 10px 14px; background: color-mix(in srgb, var(--vnp-info) 4%, transparent); border-radius: 6px; font: var(--vnp-font) 12px/1.4; color: var(--canvas-ink-soft); }
  .ld__step-loop-icon { font-size: 16px; color: var(--vnp-info); flex-shrink: 0; }


  /* ═══ MISCONCEPTION FLOW — learner's current (wrong) courier model ═══ */
  .ld__misconception { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 22px; border: 1px solid color-mix(in srgb, var(--canvas-mark-cross) 40%, transparent); border-radius: 10px; background: color-mix(in srgb, var(--canvas-mark-cross) 4%, transparent); }
  .ld__misconception-label { font: var(--vnp-font-mono) 9px/600; text-transform: uppercase; letter-spacing: 0.10em; color: var(--canvas-mark-cross); }
  .ld__courier-flow { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; }
  .ld__courier-node { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 18px; border-radius: 8px; font: var(--vnp-font) 13px/600; color: var(--canvas-ink); letter-spacing: -0.01em; text-align: center; background: var(--canvas-panel-bg); border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent); }
  .ld__courier-node small { font: var(--vnp-font-mono) 9px/500; color: var(--canvas-ink-soft); }
  .ld__courier-node--ghost { border-style: dashed; opacity: 0.65; }
  .ld__courier-arrow { font-size: 20px; color: var(--canvas-ink-soft); opacity: 0.4; }
  .ld__misconception-why { font: var(--vnp-font) 12px/1.45; color: var(--canvas-mark-cross); margin: 0; text-align: center; max-width: 500px; }
  .ld__misconception-why b { color: var(--canvas-mark-cross); }
</style>
