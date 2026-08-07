<script lang="ts">
  import {
    Entity,
    Relation,
    State,
    Value,
    Event,
    Flow,
    Compare,
    Containment,
    Hierarchy,
    Timeline,
    Cycle,
    TradeOff,
    Focus,
    Reveal,
    Highlight,
    Dim,
    Scene,
  } from './lib/index.ts';
  import BrutalistDemo from './BrutalistDemo.svelte';
</script>

<svelte:head>
  <title>Visual Narrative Library — Semantic Primitives</title>
</svelte:head>

<header class="preview-header">
  <div>
    <h1>Visual Narrative Library</h1>
    <p class="preview-sub">
      Грамматика примитивов · таксономия v2 — Semantic Objects → Predicates (HoC) → Scene
    </p>
  </div>
  <div class="preview-meta">
    <span class="badge badge--objects">5 objects</span>
    <span class="badge badge--layout">7 layout</span>
    <span class="badge badge--attention">4 attention</span>
    <span class="badge">1 scene</span>
  </div>
</header>

<main class="preview-body">
  <!-- ═══════════ СЛОЙ 1: SEMANTIC OBJECTS ═══════════ -->
  <section class="section">
    <h2 class="section-title">Semantic Objects <span class="section-desc">— что существует</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo"><Entity label="Customer" /></div>
        <div class="tile-info"><strong>Entity</strong><span>сущность · канал: форма</span></div>
        <div class="tile-variants">
          <Entity label="AI" variant="circle" />
          <Entity label="Money" variant="cube" />
          <Entity label="👤" variant="avatar" />
          <Entity label="Model" variant="plate" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Relation label="owns" /><br />
          <Relation label="creates" variant="dashed" /><br />
          <Relation label="blocks" variant="magnet" />
        </div>
        <div class="tile-info"><strong>Relation</strong><span>связь · канал: соединение</span></div>
        <div class="tile-variants">
          <Relation variant="line" />
          <Relation variant="chain" />
          <Relation variant="arrow" label="causes" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <State state="broken"><Entity label="GPU" /></State>
          <State state="growing"><Entity label="Revenue" /></State>
        </div>
        <div class="tile-info"><strong>State</strong><span>состояние · канал: модуляция</span></div>
        <div class="tile-variants">
          <State state="waiting"><Entity label="Queue" /></State>
          <State state="correct"><Entity label="Model" /></State>
          <State state="wrong"><Entity label="Config" /></State>
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <Value label="Latency" value={80} unit="ms" direction="down" variant="bar" />
          <Value label="Revenue" value={35} unit="$" variant="counter" />
        </div>
        <div class="tile-info"><strong>Value</strong><span>величина · канал: квант. отметка</span></div>
        <div class="tile-variants">
          <Value label="FPS" value={144} variant="digit" />
          <Value label="Heat" value={70} variant="thermo" />
          <Value label="Risk" value={90} direction="down" variant="chart" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <Event label="Deploy" />
          <Event label="Fail" variant="wave" />
          <Event label="Approve" variant="appear" />
        </div>
        <div class="tile-info"><strong>Event</strong><span>что произошло · канал: временной эффект</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ СЛОЙ 2: LAYOUT PREDICATES ═══════════ -->
  <section class="section">
    <h2 class="section-title">Layout Predicates <span class="section-desc">— information design (HoC)</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo">
          <Flow>
            <Entity label="Research" />
            <Relation variant="arrow" />
            <Entity label="Article" />
            <Relation variant="arrow" />
            <Entity label="Feedback" />
          </Flow>
        </div>
        <div class="tile-info"><strong>Flow</strong><span>последовательность A → B → C</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Compare>
            <Entity label="Before" />
            <Relation variant="line" />
            <Entity label="After" />
          </Compare>
        </div>
        <div class="tile-info"><strong>Compare</strong><span>сопоставление A vs B</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Containment label="System">
            <Entity label="GPU" />
          </Containment>
        </div>
        <div class="tile-info"><strong>Containment</strong><span>вложенность A inside B</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Hierarchy root="Computer">
            <Entity label="CPU" />
            <Entity label="GPU" />
            <Entity label="RAM" />
          </Hierarchy>
        </div>
        <div class="tile-info"><strong>Hierarchy</strong><span>дерево: корень → листья</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Timeline>
            <Entity label="Now" />
            <Relation variant="arrow" />
            <Entity label="Future" />
          </Timeline>
        </div>
        <div class="tile-info"><strong>Timeline</strong><span>ось времени Now → Future</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Cycle>
            <Entity label="Research" />
            <Relation variant="line" />
            <Entity label="Feedback" />
            <Relation variant="line" />
            <Entity label="Article" />
          </Cycle>
        </div>
        <div class="tile-info"><strong>Cycle</strong><span>замкнутая последовательность</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <TradeOff left="Noise ↑" right="FPS ↑">
            <Entity label="GPU" />
          </TradeOff>
        </div>
        <div class="tile-info"><strong>Trade-off</strong><span>противопоставление по осям</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ СЛОЙ 3: ATTENTION PREDICATES ═══════════ -->
  <section class="section">
    <h2 class="section-title">Attention Predicates <span class="section-desc">— механики внимания (HoC)</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo">
          <Focus><Entity label="GPU" /></Focus>
        </div>
        <div class="tile-info"><strong>Focus</strong><span>приближение (System → GPU)</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Reveal>
            <Entity label="Language" />
          </Reveal>
        </div>
        <div class="tile-info"><strong>Reveal</strong><span>скрыто → видно</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Highlight><Entity label="Hook" /></Highlight>
        </div>
        <div class="tile-info"><strong>Highlight</strong><span>акцент (свечение/обводка)</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Dim><Entity label="Noise" /></Dim>
        </div>
        <div class="tile-info"><strong>Dim</strong><span>деэмфаза остального</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ СЦЕНА: СЕМАНТИЧЕСКАЯ КОМПОЗИЦИЯ ═══════════ -->
  <section class="section">
    <h2 class="section-title">Scene <span class="section-desc">— Visual Thought Unit: объекты + предикаты = мысль (9:16)</span></h2>
    <div class="scene-row">
      <Scene title="Paradox · AI → DDD">
        <Compare>
          <div class="scene-col">
            <Entity label="Code" />
            <Value label="Cost" value={75} direction="down" variant="bar" />
          </div>
          <div class="scene-col">
            <Entity label="Model" />
            <Value label="Cost" value={85} direction="up" variant="bar" />
          </div>
        </Compare>
      </Scene>
      <Scene title="Reframe · Hero Shift">
        <Reveal>
          <Containment label="DDD">
            <Entity label="Language" />
          </Containment>
        </Reveal>
        <div class="scene-caption">«Код дешевеет — модель нет»</div>
      </Scene>
    </div>
  </section>
</main>

<footer class="preview-footer">
  Visual Narrative Library · BD visual grammar v2 · milestone 1 — грамматика примитивов на одном экране
</footer>

<BrutalistDemo />

<style>
  .preview-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 28px 32px 20px;
    border-bottom: 2px solid var(--vnp-ink);
    background: var(--vnp-paper-deep);
  }
  .preview-header h1 {
    font-size: 28px;
    letter-spacing: -0.02em;
  }
  .preview-sub {
    color: var(--vnp-ink-soft);
    font-size: 14px;
    margin-top: 4px;
  }
  .preview-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .badge {
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border: 2px solid var(--vnp-ink);
    border-radius: 999px;
    background: var(--vnp-card);
  }
  .badge--objects {
    background: #e8f0fe;
  }
  .badge--layout {
    background: #e6f4ea;
  }
  .badge--attention {
    background: #fef7e0;
  }

  .preview-body {
    padding: 24px 32px 40px;
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  .section-title {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 6px;
    border-bottom: 2px dashed var(--vnp-ink-soft);
  }
  .section-desc {
    font-weight: 400;
    color: var(--vnp-ink-soft);
    font-size: 14px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  }

  .tile {
    border: 2px solid var(--vnp-ink);
    border-radius: var(--vnp-radius);
    background: var(--vnp-card);
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-shadow: 2px 3px 0 rgba(28, 28, 28, 0.1);
  }
  .tile-demo {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 8px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: 8px;
    background: var(--vnp-paper);
  }
  .tile-demo--col {
    flex-direction: column;
    align-items: center;
  }
  .tile-info {
    display: flex;
    flex-direction: column;
  }
  .tile-info span {
    color: var(--vnp-ink-soft);
    font-size: 13px;
  }
  .tile-variants {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 6px;
    border-top: 1px dashed var(--vnp-ink-faint);
  }

  .scene-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .scene-row :global(.scene) {
    width: 320px;
    height: 569px; /* 9:16 */
  }
  .scene-col {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }
  .scene-caption {
    font-family: var(--vnp-font-hand);
    font-size: 15px;
    color: var(--vnp-ink-soft);
    margin-top: 8px;
    text-align: center;
  }

  .preview-footer {
    padding: 16px 32px;
    border-top: 2px solid var(--vnp-ink);
    font-size: 12px;
    color: var(--vnp-ink-soft);
  }
</style>
