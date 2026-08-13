<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';

  /** FailoverDiagram — демо state management (R&D: reducer-механика).
   *
   *  Гипотеза: диаграмма = render(model, state). model статичен,
   *  state меняется dispatcher'ами, селекторы ($derived) проектируют
   *  state в визуал. Нарратор говорит → dispatch → состояние → картинка.
   *
   *  История: высоконагруженный дизайн.
   *    healthy   → фронт шлёт запросы, балансер роутит на основную БД
   *    «БД умерла» → основная БД dead (крест, disabled), поток обрывается
   *    «балансер нашёл новую БД» → резервная БД active, поток переключён
   */

  // ═══ state (single source of truth) ═══
  type NodeState = 'active' | 'standby' | 'dead';

  let phase = $state<'healthy' | 'degraded' | 'recovered'>('healthy');
  let db1 = $state<NodeState>('active');   // основная БД
  let db2 = $state<NodeState>('standby');  // резервная БД

  // ═══ dispatchers (reducer-actions) ═══
  function killPrimary() {
    db1 = 'dead';
    phase = 'degraded';
  }

  function promoteReplica() {
    db2 = 'active';
    phase = 'recovered';
  }

  function reset() {
    db1 = 'active';
    db2 = 'standby';
    phase = 'healthy';
  }

  // ═══ selectors ($derived): состояние → визуал ═══
  const narration = $derived(
    phase === 'healthy'
      ? 'Запросы идут: фронт → балансер → основная БД'
      : phase === 'degraded'
        ? 'База данных умерла. Поток оборван.'
        : 'Балансер переключил поток на новую БД',
  );

  // ребро «балансер → БД» живо, только если БД active
  const edgeToDb1 = $derived(db1 === 'active');
  const edgeToDb2 = $derived(db2 === 'active');

  // мёртвая БД затемняет и свой входящий поток
  const db1Dead = $derived(db1 === 'dead');

  const phaseClass = $derived(
    phase === 'healthy' ? 'fdemo__narration--ok'
      : phase === 'degraded' ? 'fdemo__narration--bad'
        : 'fdemo__narration--recovered',
  );
</script>

<div class="fdemo">
  <header class="fdemo__header">
    <h1 class="fdemo__title">Что происходит, когда база данных умирает</h1>
    <p class="fdemo__sub">high-load · state → reducer → selectors → render</p>
  </header>

  <!-- фраза нарратора: драйвер состояний -->
  <div class="fdemo__narration {phaseClass}">
    <span class="fdemo__dot"></span>
    {narration}
  </div>

  <svg class="fdemo__svg" viewBox="0 0 1200 560" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="fo-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="fo-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
      <marker id="fo-rose" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-bad)" />
      </marker>
    </defs>

    <!-- ═══ поток: фронт → балансер ═══ -->
    <line x1="196" y1="300" x2="440" y2="300" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#fo-copper)" />

    <!-- ═══ поток: балансер → основная БД (жив, пока active) ═══ -->
    {#if edgeToDb1}
      <path d="M560 280 C 620 220, 700 220, 780 180" fill="none" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#fo-copper)" />
    {:else if db1Dead}
      <!-- оборванный поток: пунктир к мёртвой БД -->
      <path d="M560 280 C 620 220, 700 220, 780 180" fill="none" stroke="var(--vnp-bad)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.5" marker-end="url(#fo-rose)" />
    {/if}

    <!-- ═══ поток: балансер → резервная БД (появляется при promote) ═══ -->
    {#if edgeToDb2}
      <path d="M560 320 C 620 380, 700 380, 780 420" fill="none" stroke="var(--vnp-good)" stroke-width="2" marker-end="url(#fo-mint)" />
    {:else}
      <path d="M560 320 C 620 380, 700 380, 780 420" fill="none" stroke="var(--vnp-border-color)" stroke-width="1" stroke-dasharray="3 5" opacity="0.5" />
    {/if}

    <!-- ═══ узлы ═══ -->
    <SemanticNode x={130} y={300} icon="user" label="Frontend" color="var(--vnp-good)" />

    <SemanticNode x={500} y={300} icon="load-balancer" label="Balancer" color="var(--vnp-color-relation)" glow />

    <SemanticNode x={850} y={160} icon="database" label="Primary DB" color="var(--vnp-color-value)" status={db1} glow={db1 === 'active'} />

    <SemanticNode x={850} y={440} icon="database" label="Replica DB" color="var(--vnp-color-value)" status={db2} glow={db2 === 'active'} />
  </svg>

  <!-- ═══ пульт: dispatchers ═══ -->
  <div class="fdemo__controls">
    <button class="fdemo__btn" onclick={() => killPrimary()}>БД умерла</button>
    <button class="fdemo__btn" onclick={() => promoteReplica()}>Балансер нашёл новую БД</button>
    <button class="fdemo__btn fdemo__btn--ghost" onclick={() => reset()}>Сброс</button>
  </div>
</div>

<style>
  .fdemo {
    max-width: 1240px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .fdemo__header { margin-bottom: 14px; }

  .fdemo__title {
    font-family: var(--vnp-font-display);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--vnp-ink);
    margin: 0 0 6px;
  }

  .fdemo__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-ink-soft);
    margin: 0;
  }

  /* фраза нарратора — текущее состояние, движимое dispatcher'ами */
  .fdemo__narration {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
    padding: 6px 14px;
    border-radius: 6px;
    border: var(--vnp-border);
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    letter-spacing: 0.04em;
    background: var(--vnp-card);
  }

  .fdemo__narration--ok { color: var(--vnp-good); border-color: var(--vnp-color-entity-border); }
  .fdemo__narration--bad { color: var(--vnp-bad); border-color: rgba(239, 68, 68, 0.35); }
  .fdemo__narration--recovered { color: var(--vnp-good); border-color: var(--vnp-color-entity-border); }

  .fdemo__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    animation: pulse 1.2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .fdemo__svg {
    width: 100%;
    height: auto;
    border: var(--vnp-border);
    border-radius: 8px;
    background: var(--vnp-card);
  }

  .fdemo__controls {
    display: flex;
    gap: 10px;
    margin-top: 14px;
  }

  .fdemo__btn {
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

  .fdemo__btn:hover {
    border-color: var(--vnp-good);
    color: var(--vnp-good);
  }

  .fdemo__btn--ghost {
    color: var(--vnp-ink-soft);
  }
</style>
