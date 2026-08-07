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
</script>

<svelte:head>
  <title>Visual Narrative Library — Blueprint Engine</title>
</svelte:head>

<header class="preview-header">
  <div>
    <h1 class="preview-title">Visual Narrative Library</h1>
    <p class="preview-sub">
      Grammar of primitives — Semantic Objects → Predicates (HoC) → Scene
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
  <!-- ═══════════ LAYER 1: SEMANTIC OBJECTS ═══════════ -->
  <section class="section">
    <h2 class="section-title">Semantic Objects<span class="section-desc">— что существует</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo"><Entity label="Customer" /></div>
        <div class="tile-info"><strong>Entity</strong><span>entity · channel: form</span></div>
        <div class="tile-variants">
          <Entity label="AI" variant="circle" />
          <Entity label="Money" variant="cube" />
          <Entity label="User" variant="avatar" />
          <Entity label="Model" variant="plate" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Relation label="owns" /><br />
          <Relation label="creates" variant="dashed" /><br />
          <Relation label="blocks" variant="magnet" />
        </div>
        <div class="tile-info"><strong>Relation</strong><span>connection · channel: link</span></div>
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
        <div class="tile-info"><strong>State</strong><span>state · channel: modulation</span></div>
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
        <div class="tile-info"><strong>Value</strong><span>quantity · channel: metric</span></div>
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
        <div class="tile-info"><strong>Event</strong><span>what happened · channel: temporal</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ LAYER 2: LAYOUT PREDICATES ═══════════ -->
  <section class="section">
    <h2 class="section-title">Layout Predicates<span class="section-desc">— information design (HoC)</span></h2>
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
        <div class="tile-info"><strong>Flow</strong><span>sequence A → B → C</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Compare>
            <Entity label="Before" />
            <Relation variant="line" />
            <Entity label="After" />
          </Compare>
        </div>
        <div class="tile-info"><strong>Compare</strong><span>juxtaposition A vs B</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Containment label="System">
            <Entity label="GPU" />
          </Containment>
        </div>
        <div class="tile-info"><strong>Containment</strong><span>nesting A inside B</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Hierarchy root="Computer">
            <Entity label="CPU" />
            <Entity label="GPU" />
            <Entity label="RAM" />
          </Hierarchy>
        </div>
        <div class="tile-info"><strong>Hierarchy</strong><span>tree: root → leaves</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Timeline>
            <Entity label="Now" />
            <Relation variant="arrow" />
            <Entity label="Future" />
          </Timeline>
        </div>
        <div class="tile-info"><strong>Timeline</strong><span>time axis Now → Future</span></div>
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
        <div class="tile-info"><strong>Cycle</strong><span>closed loop sequence</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <TradeOff left="Noise ↑" right="FPS ↑">
            <Entity label="GPU" />
          </TradeOff>
        </div>
        <div class="tile-info"><strong>Trade-off</strong><span>axis opposition</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ LAYER 3: ATTENTION PREDICATES ═══════════ -->
  <section class="section">
    <h2 class="section-title">Attention Predicates<span class="section-desc">— attention mechanics (HoC)</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo">
          <Focus><Entity label="GPU" /></Focus>
        </div>
        <div class="tile-info"><strong>Focus</strong><span>zoom-in (System → GPU)</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Reveal>
            <Entity label="Language" />
          </Reveal>
        </div>
        <div class="tile-info"><strong>Reveal</strong><span>hidden → visible</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Highlight><Entity label="Hook" /></Highlight>
        </div>
        <div class="tile-info"><strong>Highlight</strong><span>emphasis (glow ring)</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Dim><Entity label="Noise" /></Dim>
        </div>
        <div class="tile-info"><strong>Dim</strong><span>de-emphasis of the rest</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ SCENE: SEMANTIC COMPOSITION ═══════════ -->
  <section class="section">
    <h2 class="section-title">Scene<span class="section-desc">— Visual Thought Unit: objects + predicates = thought (9:16)</span></h2>
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
        <div class="scene-caption">Code gets cheaper — model doesn't</div>
      </Scene>
    </div>
  </section>
</main>

<footer class="preview-footer">
  <span>Visual Narrative Library</span>
  <span>Blueprint Engine · v2 grammar · milestone 1</span>
</footer>

<style>
  .preview-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 28px 32px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    background: var(--vnp-paper-deep);
  }
  .preview-title {
    font-family: var(--vnp-font);
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--vnp-ink);
  }
  .preview-sub {
    color: var(--vnp-ink-soft);
    font-size: 13px;
    margin-top: 4px;
    font-family: var(--vnp-font-mono);
  }
  .preview-meta {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
  .badge {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    padding: 3px 10px;
    border: 1px solid var(--vnp-border-color);
    border-radius: var(--vnp-radius-chip);
    color: var(--vnp-ink-soft);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .badge--objects {
    border-color: rgba(45, 212, 191, 0.2);
    color: var(--vnp-good);
  }
  .badge--layout {
    border-color: rgba(45, 212, 191, 0.15);
    color: var(--vnp-good);
    opacity: 0.8;
  }
  .badge--attention {
    border-color: rgba(45, 212, 191, 0.12);
    color: var(--vnp-good);
    opacity: 0.65;
  }

  .preview-body {
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .section-title {
    font-family: var(--vnp-font);
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: var(--vnp-ink);
  }
  .section-desc {
    font-weight: 400;
    color: var(--vnp-ink-soft);
    font-size: 13px;
    margin-left: 8px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }

  .tile {
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    background: var(--vnp-card);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .tile:hover {
    border-color: var(--vnp-border-color-active);
    background: var(--vnp-card-raised);
  }
  .tile-demo {
    min-height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    padding: 12px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: var(--vnp-radius-sm);
    background:
      radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px),
      var(--vnp-paper);
    background-size: 16px 16px;
  }
  .tile-demo--col {
    flex-direction: column;
    align-items: center;
  }
  .tile-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .tile-info strong {
    font-size: 14px;
    color: var(--vnp-ink);
  }
  .tile-info span {
    font-family: var(--vnp-font-mono);
    color: var(--vnp-ink-soft);
    font-size: 11px;
  }
  .tile-variants {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }

  .scene-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
  }
  .scene-row :global(.scene) {
    width: 320px;
    height: 569px;
  }
  .scene-col {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }
  .scene-caption {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    color: var(--vnp-ink-soft);
    margin-top: 10px;
    text-align: center;
  }

  .preview-footer {
    display: flex;
    justify-content: space-between;
    padding: 14px 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
</style>
