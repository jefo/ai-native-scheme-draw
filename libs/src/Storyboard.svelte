<script lang="ts">
  // Storyboard page: 6 Stage scenes on "Router vs Controller".
  // Cognitive path: pain (spaghetti) → Router (address) →
  // Controller (orchestration) → hospital metaphor → trade-offs.
  import {
    Panel,
    Comparison,
    Divider,
    Icon,
    StatusBadge,
    Arrow,
    Actor,
    Stage,
  } from './lib/index';

  const SCENES = [
    { id: 'scene-0', label: '0 · Intro' },
    { id: 'scene-1', label: '1 · Боль' },
    { id: 'scene-2', label: '2 · Router' },
    { id: 'scene-3', label: '3 · Controller' },
    { id: 'scene-4', label: '4 · Больница' },
    { id: 'scene-5', label: '5 · Trade-offs' },
  ];
</script>

<main class="sb-page">
  <!-- ══════════ page header ══════════ -->
  <header class="sb-head">
    <h1>Router vs Controller</h1>
    <p>
      Раскадровка из 6 сцен: от спагетти-кода в одном файле к двум слоям —
      маршрутизация (ГДЕ?) и оркестрация (ЧТО ДЕЛАТЬ?) — с закреплением
      метафорой больницы и итоговой шкалой трейд-оффов.
    </p>
    <div class="sb-chips">
      <span class="sb-chip">6 сцен</span>
      <span class="sb-chip">3:30</span>
      <span class="sb-chip">боль → Router → Controller → аналогия → итог</span>
    </div>
    <nav class="sb-nav" aria-label="сцены">
      {#each SCENES as s}
        <a href="#{s.id}">{s.label}</a>
      {/each}
    </nav>
  </header>

  <!-- ══════════ scene 0: intro ══════════ -->
  <section class="sb-scene" id="scene-0">
    <Stage
      index={0}
      title="Постановка вопроса"
      timecode="00:00 – 00:15"
      goal="Зафиксировать путаницу в терминах и показать точку старта — HTTP-запрос."
    >
      <div class="sb-scene0">
        <Panel label="Browser" icon="browser" tone="blue">
          <div class="sb-req">GET /profile</div>
        </Panel>
        <div class="flow-col">
          <Arrow tone="default" label="HTTP" />
        </div>
        <div class="sb-server">
          <div class="sb-floats">
            <span class="sb-floating">
              <Icon name="compass" size={16} /> Router?
            </span>
            <span class="sb-floating sb-floating--con">
              <Icon name="console" size={16} /> Controller?
            </span>
          </div>
          <Panel label="Server" icon="server" badge="black box">
            <div class="sb-blackbox">
              <Icon name="question" size={30} />
              <span class="sb-bb-label">что происходит внутри?</span>
            </div>
          </Panel>
        </div>
      </div>
    </Stage>
  </section>

  <!-- ══════════ scene 1: the pain ══════════ -->
  <section class="sb-scene" id="scene-1">
    <Stage
      index={1}
      title="Наивный монолит — главная боль"
      timecode="00:15 – 00:50"
      goal="Показать, почему обработка запросов в одном месте ведёт к архитектурному хаосу."
    >
      <div class="sb-reveal">
        <Icon name="spark" size={16} />
        <span>чёрный ящик раскрывается — внутри один файл</span>
      </div>

      <Panel label="server.js" icon="log" tone="red" badge="monolith">
        <pre class="sb-code"><span class="c-comment">// всё в одном месте: адрес, данные, ответ</span>
<span class="c-blue">if (url == '/profile')</span> &#123;                          <span class="c-comment">← проверка адреса</span>
&nbsp;&nbsp;<span class="c-green">const user = db.findUser(123)</span>                       <span class="c-comment">← запрос к БД</span>
&nbsp;&nbsp;<span class="c-orange">res.send('&lt;h1&gt;Profile: ' + user.name + '&lt;/h1&gt;')</span>    <span class="c-comment">← сборка ответа</span>
&#125;</pre>
        <div class="sb-pains">
          <StatusBadge tone="warning" label="Спагетти-код — тяжело читать" icon="warn" />
          <StatusBadge tone="warning" label="Связность — смена URL ломает работу с БД" icon="warn" />
          <StatusBadge tone="warning" label="Невозможно тестировать" icon="warn" />
        </div>
      </Panel>
    </Stage>
  </section>

  <!-- ══════════ scene 2: the router ══════════ -->
  <section class="sb-scene" id="scene-2">
    <Stage
      index={2}
      title="Слой 1 — маршрутизация"
      timecode="00:50 – 01:30"
      goal="Показать решение проблемы навигации через ввод Роутера."
    >
      <div class="sb-constraint">
        <Icon name="compass" size={16} />
        Constraint 1: Address Matching <span>(Where?)</span>
      </div>

      <div class="sb-scene2">
        <div class="sb-req">GET /profile</div>
        <div class="sb-arrow-cell">
          <Arrow tone="amber" />
        </div>

        <Panel label="Router" icon="compass" tone="blue" badge="layer 1">
          <div class="sb-table">
            <div class="sb-table-row">
              <span class="sb-t-m">GET</span>
              <span class="sb-t-p">/</span>
              <span class="sb-t-h">ShowHome</span>
            </div>
            <div class="sb-table-row sb-table-row--match">
              <span class="sb-t-m">GET</span>
              <span class="sb-t-p">/profile</span>
              <span class="sb-t-h">ShowProfile</span>
            </div>
            <div class="sb-table-row">
              <span class="sb-t-m">POST</span>
              <span class="sb-t-p">/login</span>
              <span class="sb-t-h">DoLogin</span>
            </div>
          </div>
        </Panel>

        <div class="sb-arrow-cell">
          <Arrow tone="green" label="matched" />
        </div>
        <div class="sb-handler">
          <Icon name="bolt" size={16} />
          ShowProfile
        </div>
      </div>

      <StatusBadge
        tone="success"
        label="Capability: ссылки (URL) можно менять, не трогая код обработки"
        icon="thumbsup"
      />
    </Stage>
  </section>

  <!-- ══════════ scene 3: the controller ══════════ -->
  <section class="sb-scene" id="scene-3">
    <Stage
      index={3}
      title="Слой 2 — оркестрация"
      timecode="01:30 – 02:15"
      goal="Показать решение проблемы выполнения логики через ввод Контроллера."
    >
      <div class="sb-constraint">
        <Icon name="console" size={16} />
        Constraint 2: Business Orchestration <span>(What to do?)</span>
      </div>

      <div class="sb-scene3">
        <div class="sb-col-left">
          <div class="sb-side-v">
            <Icon name="browser" size={20} />
            <span class="sb-req">Client</span>
            <Arrow direction="left" tone="green" label="200 OK" />
          </div>
        </div>

        <div class="sb-col-main">
          <Panel label="JSON Formatter" icon="json" tone="blue">
            <span class="sb-caption">сериализация</span>
          </Panel>
          <div class="sb-v">
            <Arrow direction="up" tone="green" label="запакуй данные" />
          </div>
          <Panel label="UserProfileController" icon="console" tone="amber" badge="layer 2">
            <span class="sb-caption">узловой центр: оркестрирует 3 внешних сервиса</span>
          </Panel>
          <div class="sb-v">
            <Arrow direction="down" tone="blue" label="дай данные юзера 123" />
          </div>
          <Panel label="Database" icon="database" tone="blue">
            <span class="sb-caption">users · id 123</span>
          </Panel>
        </div>

        <div class="sb-col-right">
          <div class="sb-side-h">
            <div class="sb-arrow-cell">
              <Arrow direction="right" tone="amber" label="проверь сессию" />
            </div>
            <Panel label="Auth Service" icon="lock" tone="blue">
              <span class="sb-caption">сессия валидна</span>
            </Panel>
          </div>
        </div>
      </div>

      <StatusBadge
        tone="success"
        label="Capability: бизнес-логика независима от веб-адресов и HTTP"
        icon="thumbsup"
      />
    </Stage>
  </section>

  <!-- ══════════ scene 4: hospital metaphor ══════════ -->
  <section class="sb-scene" id="scene-4">
    <Stage
      index={4}
      title="Ментальная модель — аналогия с больницей"
      timecode="02:15 – 02:50"
      goal="Закрепить разницу через метафору из реального мира."
    >
      <div class="sb-hospital">
        <Panel label="Стойка ресепшен — Router" icon="compass" tone="blue">
          <div class="sb-room">
            <Actor label="Администратор" role="user" size="sm" />
            <div class="sb-journal">
              <div class="sb-journal-row"><span>14:00</span><span>каб. 204</span></div>
              <div class="sb-journal-row"><span>14:20</span><span>каб. 211</span></div>
              <div class="sb-journal-row"><span>14:40</span><span>каб. 204</span></div>
            </div>
          </div>
          <div class="sb-bubbles">
            <div class="sb-bubble sb-bubble--pat">«Болит ухо»</div>
            <div class="sb-bubble sb-bubble--admin">→ Кабинет №204</div>
          </div>
        </Panel>

        <Divider orientation="vertical" label="больница" tone="blue" />

        <Panel label="Кабинет врача №204 — Controller" icon="console" tone="amber">
          <div class="sb-room">
            <Actor label="Врач" role="user" size="sm" />
            <div class="sb-proc">
              <div class="sb-proc-row">
                <span class="sb-proc-n">1</span> Медсестра — взять кровь
              </div>
              <div class="sb-proc-row">
                <span class="sb-proc-n">2</span> Рентген — снимок
              </div>
              <div class="sb-proc-row">
                <span class="sb-proc-n">3</span> Рецепт — выписать
              </div>
            </div>
          </div>
          <div class="sb-bubbles">
            <div class="sb-bubble sb-bubble--doc">«Врач управляет процессом»</div>
          </div>
        </Panel>
      </div>
    </Stage>
  </section>

  <!-- ══════════ scene 5: trade-offs ══════════ -->
  <section class="sb-scene" id="scene-5">
    <Stage
      index={5}
      title="Финальное сравнение и Trade-offs"
      timecode="02:50 – 03:30"
      goal="Дать итоговую матрицу решений и показать, когда паттерны избыточны."
    >
      <Comparison columns={2}>
        <Panel label="Router" icon="compass" tone="blue">
          <div class="sb-qa">
            <span class="sb-q sb-q--blue">ГДЕ?</span>
            <span class="sb-a">диспетчеризация путей</span>
          </div>
        </Panel>
        <Panel label="Controller" icon="console" tone="amber">
          <div class="sb-qa">
            <span class="sb-q sb-q--amber">ЧТО ДЕЛАТЬ?</span>
            <span class="sb-a">оркестрация бизнес-логики</span>
          </div>
        </Panel>
      </Comparison>

      <div class="sb-axis">
        <div class="sb-axis-row">
          <span>Одностраничный скрипт / затычка</span>
          <span>Растущее веб-приложение</span>
        </div>
        <div class="sb-axis-bar">
          <div class="sb-axis-progress"></div>
          <span class="sb-axis-mark" aria-hidden="true"></span>
        </div>
        <div class="sb-axis-row sb-axis-badges">
          <StatusBadge tone="warning" label="1 файла достаточно — Router и Controller избыточны" />
          <StatusBadge
            tone="success"
            label="разделение Router + Controller обязательно"
            icon="thumbsup"
          />
        </div>
      </div>
    </Stage>
  </section>
</main>

<style>
  .sb-page {
    max-width: 1160px;
    margin: 0 auto;
    padding: 56px 32px 96px;
    display: flex;
    flex-direction: column;
    gap: 56px;
  }

  /* ── page header ───────────────────────────────────────── */
  .sb-head {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sb-head h1 {
    font-size: 38px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  .sb-head p {
    color: var(--bbg-ink);
    max-width: 640px;
  }

  .sb-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sb-chip {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    border: 1px solid var(--bbg-border);
    border-radius: 999px;
    padding: 4px 12px;
  }

  .sb-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 4px;
  }

  .sb-nav a {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    text-decoration: none;
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    padding: 6px 12px;
  }

  .sb-nav a:hover {
    color: var(--bbg-ink);
    border-color: var(--bbg-border-strong);
  }

  .sb-scene {
    scroll-margin-top: 70px;
  }

  /* ── shared bits ───────────────────────────────────────── */
  .sb-constraint {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--bbg-ink);
  }

  .sb-constraint :global(svg) {
    color: var(--bbg-amber);
  }

  .sb-constraint span {
    color: var(--bbg-ink);
    font-weight: 400;
  }

  .sb-req {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--bbg-amber);
    background: var(--bbg-amber-dim);
    border: 1px solid var(--bbg-amber-border);
    border-radius: var(--bbg-radius-sm);
    padding: 8px 14px;
    white-space: nowrap;
    width: max-content;
  }

  .sb-caption {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  .sb-arrow-cell {
    min-width: 80px;
  }

  .flow-col {
    display: flex;
    align-items: center;
    padding: 0 14px;
  }

  /* ── scene 0 ───────────────────────────────────────────── */
  .sb-scene0 {
    display: grid;
    grid-template-columns: minmax(180px, 1fr) 110px minmax(200px, 1fr);
    align-items: center;
    gap: 0 10px;
  }

  .sb-server {
    position: relative;
  }

  .sb-floats {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 2;
    white-space: nowrap;
  }

  .sb-floating {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bbg-bg);
    border: 1px solid var(--bbg-border-strong);
    border-radius: 999px;
    padding: 6px 12px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  .sb-floating :global(svg) {
    color: var(--bbg-amber);
  }

  .sb-floating--con :global(svg) {
    color: var(--bbg-blue);
  }

  .sb-blackbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #0b0b0b;
    border: 1px dashed var(--bbg-border-strong);
    border-radius: 8px;
    padding: 32px 20px;
  }

  .sb-blackbox :global(svg) {
    color: var(--bbg-amber);
  }

  .sb-bb-label {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  /* ── scene 1 ───────────────────────────────────────────── */
  .sb-reveal {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-ink);
  }

  .sb-reveal :global(svg) {
    color: var(--bbg-amber);
  }

  .sb-code {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    line-height: 1.8;
    background: #0d0d0d;
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 16px 18px;
    overflow-x: auto;
    color: var(--bbg-ink);
    white-space: pre;
  }

  .c-blue {
    color: var(--bbg-blue);
  }
  .c-green {
    color: var(--bbg-green);
  }
  .c-orange {
    color: var(--bbg-amber);
  }
  .c-comment {
    color: var(--bbg-ink-soft);
  }

  .sb-pains {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* ── scene 2 ───────────────────────────────────────────── */
  .sb-scene2 {
    display: grid;
    grid-template-columns: auto minmax(70px, 110px) minmax(260px, 1fr) minmax(70px, 110px) auto;
    align-items: center;
    gap: 0 8px;
  }

  .sb-table {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    overflow: hidden;
  }

  .sb-table-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    border-top: 1px solid var(--bbg-border);
    color: var(--bbg-ink);
  }

  .sb-table-row:first-child {
    border-top: none;
  }

  .sb-table-row--match {
    background: var(--bbg-amber-dim);
    color: var(--bbg-ink);
    box-shadow: inset 3px 0 0 var(--bbg-amber);
  }

  .sb-t-m {
    color: var(--bbg-blue);
    font-weight: 600;
    width: 44px;
  }

  .sb-table-row--match .sb-t-m {
    color: var(--bbg-amber);
  }

  .sb-t-h {
    margin-left: auto;
    color: var(--bbg-ink);
    font-weight: 400;
  }

  .sb-handler {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--bbg-ink);
    background: var(--bbg-green-dim);
    border: 1px solid var(--bbg-green-border);
    border-radius: 8px;
    padding: 10px 16px;
    white-space: nowrap;
  }

  .sb-handler :global(svg) {
    color: var(--bbg-green);
  }

  /* ── scene 3 ───────────────────────────────────────────── */
  .sb-scene3 {
    display: grid;
    grid-template-columns: 170px 1fr 220px;
    align-items: center;
    gap: 0 20px;
  }

  .sb-col-main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-self: center;
    width: min(360px, 100%);
  }

  .sb-v {
    height: 60px;
    display: flex;
    justify-content: center;
  }

  .sb-col-left {
    display: flex;
    justify-content: center;
  }

  .sb-col-right {
    display: flex;
    justify-content: center;
  }

  .sb-side-v {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .sb-side-h {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .sb-side-h .sb-arrow-cell {
    flex: 1;
  }

  .sb-side-v :global(svg) {
    color: var(--bbg-ink);
  }

  /* ── scene 4 ───────────────────────────────────────────── */
  .sb-hospital {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: stretch;
    gap: 18px;
  }

  .sb-room {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 14px;
  }

  .sb-journal {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    overflow: hidden;
    flex: 1;
  }

  .sb-journal-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 6px 12px;
    border-top: 1px solid var(--bbg-border);
    color: var(--bbg-ink);
  }

  .sb-journal-row:first-child {
    border-top: none;
  }

  .sb-journal-row span:last-child {
    color: var(--bbg-blue);
  }

  .sb-proc {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .sb-proc-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    padding: 6px 12px;
  }

  .sb-proc-n {
    color: var(--bbg-amber);
    font-weight: 700;
  }

  .sb-bubbles {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sb-bubble {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border-strong);
    border-radius: 8px;
    padding: 8px 12px;
    max-width: 92%;
  }

  .sb-bubble--pat {
    border-color: var(--bbg-amber-border);
  }

  .sb-bubble--admin {
    border-color: var(--bbg-blue-border);
    align-self: flex-end;
  }

  .sb-bubble--doc {
    border-color: var(--bbg-green-border);
  }

  /* ── scene 5 ───────────────────────────────────────────── */
  .sb-qa {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .sb-q {
    font-family: var(--bbg-font-mono);
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  .sb-q--blue {
    color: var(--bbg-blue);
  }

  .sb-q--amber {
    color: var(--bbg-amber);
  }

  .sb-a {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
    font-weight: 400;
  }

  .sb-axis {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;
  }

  .sb-axis-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  .sb-axis-bar {
    position: relative;
    height: 10px;
    background: var(--bbg-border);
    border-radius: 999px;
  }

  .sb-axis-progress {
    height: 100%;
    width: 38%;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--bbg-border-strong), var(--bbg-amber));
  }

  .sb-axis-mark {
    position: absolute;
    top: 50%;
    left: 38%;
    width: 18px;
    height: 18px;
    background: var(--bbg-amber);
    border: 3px solid var(--bbg-bg);
    border-radius: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .sb-axis-badges {
    align-items: center;
  }

  @media (max-width: 860px) {
    .sb-scene0,
    .sb-scene2,
    .sb-scene3,
    .sb-hospital {
      grid-template-columns: 1fr;
    }

    .sb-floats {
      top: -14px;
    }

    /* collapse the auto track minimum so 1fr tracks shrink to the
       viewport and nowrap rows wrap instead of overflowing */
    .sb-scene0 > *,
    .sb-scene2 > *,
    .sb-scene3 > *,
    .sb-hospital > * {
      min-width: 0;
    }

    .sb-side-h {
      flex-wrap: wrap;
      min-width: 0;
    }

    /* arrow cell keeps a floor wide enough for its centered label */
    .sb-side-h .sb-arrow-cell {
      flex: 1 1 170px !important;
    }

    .sb-scene2 {
      justify-items: start;
    }

    .sb-table-row {
      flex-wrap: wrap;
    }
  }
</style>
