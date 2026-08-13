<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';
  import CompositeNode from './CompositeNode.svelte';

  /** PaymentLesson — diagram-lesson: distributed state на платёжном кейсе.
   *
   *  Гипотеза: диаграмма = render(model, state). Урок разыгрывает
   *  когнитивную траекторию через 6 сцен (moves). Каждая сцена МЕНЯЕТ
   *  модель читателя, а не добавляет элементы.
   *
   *  Инварианты (контракт урока):
   *  - state transition — первичная визуальная единица; сервисы вторичны
   *  - Event — отдельный визуальный объект (ромб), не подпись на стрелке
   *  - pending имеет временную семантику: request и webhook в разных
   *    temporal contexts (метка later)
   *  - retry внутри Payment machine, Order остаётся created
   *  - payment.succeeded — единственный мост Payment → Order
   *  - финал = реконструкция уже увиденного, не новая схема
   *  - fulfillment появляется только после Order → paid
   *  - retry имеет guard: attempts < max_attempts
   */

  // ═══ state (single source of truth) ═══
  let scene = $state(1);            // 1..6
  let attempts = $state(0);         // retry counter
  const MAX_ATTEMPTS = 3;

  // ═══ dispatchers ═══
  function next() { if (scene < 6) scene += 1; }
  function prev() { if (scene > 1) scene -= 1; }
  function retry() { if (attempts < MAX_ATTEMPTS) attempts += 1; }
  function giveUp() { attempts = MAX_ATTEMPTS; } // лимит исчерпан → cancelled
  function reset() { scene = 1; attempts = 0; }

  // ═══ selectors ($derived): состояние → визуал ═══
  const maxReached = $derived(attempts >= MAX_ATTEMPTS);

  // сцена 1 — инфраструктура (где живут машины)
  const s1 = $derived(scene >= 1);
  // сцена 2 — заказ создан
  const s2 = $derived(scene >= 2);
  // сцена 3 — breakpoint: pending и время
  const s3 = $derived(scene >= 3);
  // сцена 4 — три исхода
  const s4 = $derived(scene >= 4);
  // сцена 5 — retry
  const s5 = $derived(scene >= 5);
  // сцена 6 — финал: две машины + событие-мост
  const s6 = $derived(scene >= 6);

  const narration = $derived(
    scene === 1
      ? 'Где живёт платёж: между клиентом и банком есть PSP'
      : scene === 2
        ? 'Заказ создан — но ещё НЕ оплачен: created'
        : scene === 3
          ? 'Банк не обязан отвечать сразу: request → ??? → pending'
          : scene === 4
            ? 'Три исхода: succeeded / declined / pending'
            : scene === 5
              ? maxReached
                ? 'Лимит попыток исчерпан → заказ cancelled'
                : 'Отказ → retry внутри Payment, заказ ждёт (created)'
              : 'Две машины. payment.succeeded — единственный мост',
  );

  const sceneTitle = $derived(
    scene === 1
      ? '1 · Где живёт платёж'
      : scene === 2
        ? '2 · Заказ создан ≠ оплачен'
        : scene === 3
          ? '3 · Время входит в модель'
          : scene === 4
            ? '4 · Три исхода, не два'
            : scene === 5
              ? '5 · Retry внутри Payment'
              : '6 · Согласование двух машин',
  );
</script>

<div class="pl">
  <header class="pl__header">
    <h1 class="pl__title">Что происходит, когда ты оплачиваешь заказ</h1>
    <p class="pl__sub">diagram-lesson · distributed state · две state machines</p>
  </header>

  <!-- фраза нарратора: драйвер сцен -->
  <div class="pl__narration">
    <span class="pl__dot"></span>
    <span class="pl__scene-title">{sceneTitle}</span>
    <span class="pl__scene-text">{narration}</span>
  </div>

  <svg class="pl__svg" viewBox="0 0 1200 640" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="pl-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
      <marker id="pl-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="pl-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-warn)" />
      </marker>
      <marker id="pl-rose" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-bad)" />
      </marker>
      <marker id="pl-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-value)" />
      </marker>
    </defs>

    <!-- ══════════ СЦЕНА 1: инфраструктура (где живут машины) ══════════ -->
    <g opacity={s1 ? 1 : 0.15}>
      <text x="60" y="40" class="pl__act">Инфраструктура: путь запроса</text>
      <line x1="196" y1="130" x2="420" y2="130" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#pl-copper)" />
      <text x="310" y="120" class="pl__edge">1 · заказ</text>
      <line x1="660" y1="130" x2="880" y2="130" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#pl-copper)" />
      <text x="770" y="120" class="pl__edge">2 · авторизация</text>

      <SemanticNode x={130} y={130} icon="user" label="Client" color="var(--vnp-good)" />
      <SemanticNode x={500} y={130} icon="server" label="Order Service" color="var(--vnp-color-entity)" />
      <SemanticNode x={740} y={130} icon="gateway" label="PSP" color="var(--vnp-color-relation)" />
      <SemanticNode x={980} y={130} icon="database" label="Bank" color="var(--vnp-color-value)" />
    </g>

    <!-- ══════════ СЦЕНА 2: заказ создан ══════════ -->
    <g opacity={s2 ? 1 : 0.15}>
      <text x="60" y="240" class="pl__act">Заказ создан — но ещё НЕ оплачен</text>
      <line x1="500" y1="176" x2="440" y2="300" stroke="var(--vnp-color-entity)" stroke-width="1.5" marker-end="url(#pl-copper)" />
      <text x="452" y="240" class="pl__edge">create</text>

      <!-- ORDER state machine (рождается) -->
      <CompositeNode x={220} y={310} w={440} h={150} title="ORDER" tone="var(--vnp-color-entity)">
        <SemanticNode x={100} y={60} icon="logs" label="created" color="var(--vnp-color-entity)" status="active" glow />
      </CompositeNode>
    </g>

    <!-- ══════════ СЦЕНА 3: время входит в модель ══════════ -->
    <g opacity={s3 ? 1 : 0.15}>
      <text x="60" y="500" class="pl__act">Время входит в модель: request → ??? → pending → later → webhook</text>

      <!-- PAYMENT state machine (раскрывается) -->
      <CompositeNode x={720} y={310} w={440} h={300} title="PAYMENT" tone="var(--vnp-color-relation)">
        <!-- initiated → pending -->
        <SemanticNode x={60} y={60} icon="pipeline" label="initiated" color="var(--vnp-color-relation)" status="active" />
        <line x1="150" y1="80" x2="220" y2="80" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#pl-copper)" />

        <!-- pending — временной контекст: дальше будет later -->
        <SemanticNode x={260} y={60} icon="clock" label="pending" color="var(--vnp-warn)" status="active" glow />
      </CompositeNode>

      <!-- временной разрыв: later -->
      <g transform="translate(940 380)">
        <line x1="0" y1="0" x2="0" y2="80" stroke="var(--vnp-warn)" stroke-width="1" stroke-dasharray="4 4" opacity="0.7" />
        <text x="10" y="40" class="pl__later">later</text>
      </g>
      <text x="980" y="500" class="pl__edge pl__edge--miss">webhook: банк сообщит сам</text>
    </g>

    <!-- ══════════ СЦЕНА 4: три исхода ══════════ -->
    <g opacity={s4 ? 1 : 0.15}>
      <text x="60" y="30" class="pl__act">Три исхода, не два</text>

      <!-- succeeded → Order paid -->
      <line x1="950" y1="410" x2="950" y2="560" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#pl-mint)" />
      <text x="958" y="480" class="pl__edge pl__edge--hit">succeeded</text>

      <!-- declined → retry внутри Payment -->
      <line x1="770" y1="410" x2="770" y2="560" stroke="var(--vnp-bad)" stroke-width="1.5" marker-end="url(#pl-rose)" />
      <text x="600" y="480" class="pl__edge pl__edge--miss">declined</text>
    </g>

    <!-- ══════════ СЦЕНА 5: retry внутри Payment, Order ждёт ══════════ -->
    <g opacity={s5 ? 1 : 0.15}>
      <text x="60" y="560" class="pl__act">Retry — внутри Payment machine</text>

      <!-- retry цикл внутри PAYMENT -->
      <path d="M820 620 C 700 620, 700 540, 780 530" fill="none" stroke="var(--vnp-warn)" stroke-width="1.5" marker-end="url(#pl-amber)" />
      <text x="640" y="600" class="pl__edge pl__edge--miss">retry · attempts {attempts}/{MAX_ATTEMPTS}</text>
      {#if maxReached}
        <text x="640" y="630" class="pl__edge pl__edge--miss">лимит исчерпан → cancelled</text>
      {/if}

      <!-- Order остаётся created: подпись-связка -->
      <text x="300" y="480" class="pl__edge">Order: created — ждёт</text>
    </g>

    <!-- ══════════ СЦЕНА 6: финал — согласование двух машин ══════════ -->
    <g opacity={s6 ? 1 : 0.15}>
      <text x="60" y="30" class="pl__act">Две машины. Событие — мост</text>

      <!-- реконструкция: те же узлы, инфраструктура приглушена -->
      <CompositeNode x={120} y={60} w={440} h={200} title="ORDER STATE MACHINE" tone="var(--vnp-color-entity)">
        <SemanticNode x={60} y={60} icon="logs" label="created" color="var(--vnp-color-entity)" />
        <line x1="150" y1="80" x2="220" y2="80" stroke="var(--vnp-color-entity)" stroke-width="1.5" marker-end="url(#pl-copper)" />
        <SemanticNode x={260} y={60} icon="logs" label="paid" color="var(--vnp-good)" status="active" glow />
        <!-- fulfillment: только после paid -->
        <line x1="350" y1="80" x2="380" y2="140" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#pl-mint)" />
        <text x="392" y="120" class="pl__edge pl__edge--hit">fulfillment</text>
      </CompositeNode>

      <CompositeNode x={680} y={60} w={440} h={200} title="PAYMENT STATE MACHINE" tone="var(--vnp-color-relation)">
        <SemanticNode x={60} y={60} icon="pipeline" label="initiated" color="var(--vnp-color-relation)" />
        <line x1="150" y1="80" x2="220" y2="80" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#pl-copper)" />
        <SemanticNode x={260} y={60} icon="clock" label="pending" color="var(--vnp-warn)" status="active" />
        <line x1="350" y1="80" x2="380" y2="140" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#pl-mint)" />
        <text x="392" y="120" class="pl__edge pl__edge--hit">succeeded</text>
      </CompositeNode>

      <!-- EVENT — отдельный объект (ромб), единственный мост -->
      <g transform="translate(580 150)">
        <polygon points="0,-18 26,0 0,18 -26,0" fill="var(--vnp-card)" stroke="var(--vnp-good)" stroke-width="1.5" />
        <text y="5" text-anchor="middle" class="pl__event">payment.succeeded</text>
      </g>
      <line x1="620" y1="132" x2="660" y2="132" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#pl-mint)" />
      <line x1="580" y1="168" x2="500" y2="180" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#pl-mint)" />
    </g>
  </svg>

  <!-- ═══ пульт: сцены + retry ═══ -->
  <div class="pl__controls">
    <button class="pl__btn" onclick={() => prev()} disabled={scene === 1}>← сцена</button>
    <button class="pl__btn" onclick={() => next()} disabled={scene === 6}>сцена →</button>
    {#if scene === 5}
      <button class="pl__btn" onclick={() => retry()} disabled={maxReached}>retry ({attempts}/{MAX_ATTEMPTS})</button>
      <button class="pl__btn pl__btn--ghost" onclick={() => giveUp()} disabled={maxReached}>сдаться</button>
    {/if}
    <button class="pl__btn pl__btn--ghost" onclick={() => reset()}>сброс</button>
  </div>
</div>

<style>
  .pl {
    max-width: 1240px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .pl__header { margin-bottom: 14px; }

  .pl__title {
    font-family: var(--vnp-font-display);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--vnp-ink);
    margin: 0 0 6px;
  }

  .pl__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-ink-soft);
    margin: 0;
  }

  .pl__narration {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    padding: 8px 14px;
    border-radius: 6px;
    border: var(--vnp-border);
    background: var(--vnp-card);
  }

  .pl__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--vnp-good);
    animation: pulse 1.2s ease-in-out infinite;
    flex: 0 0 auto;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .pl__scene-title {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-good);
    white-space: nowrap;
  }

  .pl__scene-text {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    color: var(--vnp-ink);
  }

  .pl__svg {
    width: 100%;
    height: auto;
    border: var(--vnp-border);
    border-radius: 8px;
    background: var(--vnp-card);
  }

  .pl__act {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    fill: var(--vnp-ink);
  }

  .pl__edge {
    font-family: var(--vnp-font-mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    fill: var(--vnp-ink-soft);
  }

  .pl__edge--hit { fill: var(--vnp-good); }
  .pl__edge--miss { fill: var(--vnp-warn); }

  .pl__later {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-style: italic;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    fill: var(--vnp-warn);
  }

  .pl__event {
    font-family: var(--vnp-font-mono);
    font-size: 9.5px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    fill: var(--vnp-good);
  }

  .pl__controls {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-wrap: wrap;
  }

  .pl__btn {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--vnp-ink);
    background: var(--vnp-card-raised);
    border: var(--vnp-border-active);
    border-radius: 6px;
    padding: 8px 14px;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
  }

  .pl__btn:hover:not(:disabled) {
    border-color: var(--vnp-good);
    color: var(--vnp-good);
  }

  .pl__btn:disabled {
    opacity: 0.4;
    cursor: default;
  }

  .pl__btn--ghost {
    color: var(--vnp-ink-soft);
  }
</style>
