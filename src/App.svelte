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
    ServiceNode,
    InfraNode,
    Pipeline,
    DeployDiff,
    ModelCard,
  } from './lib/index.ts';
</script>

<svelte:head>
  <title>Visual Narrative Library — Blueprint Engine</title>
</svelte:head>

<header class="preview-header">
  <div>
    <h1 class="preview-title">Visual Narrative Library</h1>
    <p class="preview-sub">
      Grammar of primitives — Objects → Predicates (HoC) → Scene · software · infra · AI
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
    <h2 class="section-title">Semantic Objects<span class="section-desc">— what exists in the system</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo"><Entity label="api-gateway" icon="gateway" /></div>
        <div class="tile-info"><strong>Entity</strong><span>service · channel: form + icon</span></div>
        <div class="tile-variants">
          <Entity label="llm-router" icon="model" />
          <Entity label="cache-store" icon="cache" />
          <Entity label="oncall" variant="avatar" />
          <Entity label="feature-flag" icon="git-branch" variant="plate" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Relation label="calls" /><br />
          <Relation label="publishes" variant="dashed" /><br />
          <Relation label="depends-on" variant="magnet" />
        </div>
        <div class="tile-info"><strong>Relation</strong><span>connection · channel: link</span></div>
        <div class="tile-variants">
          <Relation variant="line" />
          <Relation variant="chain" />
          <Relation variant="arrow" label="routes-to" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <State state="broken"><Entity label="gpu-node" icon="gpu" /></State>
          <State state="growing"><Entity label="replica-set" icon="container" /></State>
        </div>
        <div class="tile-info"><strong>State</strong><span>health · channel: modulation</span></div>
        <div class="tile-variants">
          <State state="waiting"><Entity label="task-queue" icon="queue" /></State>
          <State state="correct"><Entity label="terraform" icon="gear" /></State>
          <State state="wrong"><Entity label="helm-release" icon="container" /></State>
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <Value label="p99" value={320} unit="ms" direction="down" variant="bar" />
          <Value label="RPS" value={2.4} unit="k" variant="counter" />
        </div>
        <div class="tile-info"><strong>Value</strong><span>metric · channel: measurement</span></div>
        <div class="tile-variants">
          <Value label="GPU util" value={98} variant="digit" />
          <Value label="Memory" value={64} unit="GB" variant="thermo" />
          <Value label="Errors" value={0.3} unit="%" direction="down" variant="chart" />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo tile-demo--col">
          <Event label="deploy-v2.1" />
          <Event label="crashloop" variant="wave" />
          <Event label="canary-ok" variant="appear" />
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
            <Entity label="commit" icon="git-branch" />
            <Relation variant="arrow" />
            <Entity label="build" icon="container" />
            <Relation variant="arrow" />
            <Entity label="deploy" icon="deploy" />
          </Flow>
        </div>
        <div class="tile-info"><strong>Flow</strong><span>sequence commit → build → deploy</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Compare>
            <Entity label="canary" icon="deploy" />
            <Relation variant="line" />
            <Entity label="stable" icon="server" />
          </Compare>
        </div>
        <div class="tile-info"><strong>Compare</strong><span>canary vs stable diff</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Containment label="k8s-cluster">
            <Entity label="pod-7a3" icon="container" />
          </Containment>
        </div>
        <div class="tile-info"><strong>Containment</strong><span>nesting pod inside cluster</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Hierarchy root="cluster">
            <Entity label="node-1" icon="server" />
            <Entity label="node-2" icon="server" />
            <Entity label="node-3" icon="server" />
          </Hierarchy>
        </div>
        <div class="tile-info"><strong>Hierarchy</strong><span>tree: cluster → nodes</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Timeline>
            <Entity label="t₀ deploy" icon="deploy" />
            <Relation variant="arrow" />
            <Entity label="t₁ scale" icon="container" />
          </Timeline>
        </div>
        <div class="tile-info"><strong>Timeline</strong><span>deploy → scale over time</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Cycle>
            <Entity label="observe" icon="metrics" />
            <Relation variant="line" />
            <Entity label="decide" icon="model" />
            <Relation variant="line" />
            <Entity label="act" icon="deploy" />
          </Cycle>
        </div>
        <div class="tile-info"><strong>Cycle</strong><span>control loop: observe → decide → act</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <TradeOff left="Consistency ↑" right="Latency ↑">
            <Entity label="db" icon="database" />
          </TradeOff>
        </div>
        <div class="tile-info"><strong>Trade-off</strong><span>CAP theorem: consistency vs latency</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ LAYER 3: ATTENTION PREDICATES ═══════════ -->
  <section class="section">
    <h2 class="section-title">Attention Predicates<span class="section-desc">— attention mechanics (HoC)</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo">
          <Focus><Entity label="gpu-node" icon="gpu" /></Focus>
        </div>
        <div class="tile-info"><strong>Focus</strong><span>zoom-in: cluster → gpu-node</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Reveal>
            <Entity label="domain-model" icon="dataset" />
          </Reveal>
        </div>
        <div class="tile-info"><strong>Reveal</strong><span>hidden dependency → visible</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Highlight><Entity label="circuit-breaker" icon="lock" /></Highlight>
        </div>
        <div class="tile-info"><strong>Highlight</strong><span>emphasis on circuit-breaker</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Dim><Entity label="deprecated-api" icon="clock" /></Dim>
        </div>
        <div class="tile-info"><strong>Dim</strong><span>de-emphasis of deprecated API</span></div>
      </article>
    </div>
  </section>

  <!-- ═══════════ SCENE: SEMANTIC COMPOSITION ═══════════ -->
  <section class="section">
    <h2 class="section-title">Scene<span class="section-desc">— Visual Thought Unit: objects + predicates = thought (9:16)</span></h2>
    <div class="scene-row">
      <Scene title="Deploy · Canary vs Stable">
        <Compare>
          <div class="scene-col">
            <State state="growing"><Entity label="canary-v2" icon="deploy" /></State>
            <Value label="p99" value={180} unit="ms" direction="down" variant="bar" />
          </div>
          <div class="scene-col">
            <State state="completed"><Entity label="stable-v1" icon="server" /></State>
            <Value label="p99" value={210} unit="ms" variant="bar" />
          </div>
        </Compare>
      </Scene>
      <Scene title="Scale · Before vs After">
        <Reveal>
          <Containment label="autoscaler">
            <Entity label="HPA+3" icon="container" />
          </Containment>
        </Reveal>
        <div class="scene-caption">p99 drops 30ms after HPA triggers</div>
      </Scene>
    </div>
  </section>

  <!-- ═══════════ LAYER 4: ORGANISMS — domain HoC compositions ═══════════ -->
  <section class="section">
    <h2 class="section-title">Organisms<span class="section-desc">— domain HoC: primitives composed with icons + semantics</span></h2>
    <div class="grid">
      <article class="tile">
        <div class="tile-demo">
          <ServiceNode name="api-gateway" kind="gateway" health="healthy" p99={42} />
        </div>
        <div class="tile-info"><strong>ServiceNode</strong><span>service + health + p99 · kinds: api, worker, gateway, storage</span></div>
        <div class="tile-variants">
          <ServiceNode name="worker-3" kind="worker" health="degraded" p99={340} />
          <ServiceNode name="pg-store" kind="storage" health="healthy" p99={12} />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <InfraNode name="pg-primary" kind="db" metric="conn" metricValue={78} />
        </div>
        <div class="tile-info"><strong>InfraNode</strong><span>infra + typed icon + metric · kinds: db, cache, queue, lb, cdn</span></div>
        <div class="tile-variants">
          <InfraNode name="redis-main" kind="cache" metric="hit%" metricValue={94} />
          <InfraNode name="sqs-dlq" kind="queue" metric="depth" metricValue={12} metricUnit="" metricMax={50} />
          <InfraNode name="nginx" kind="lb" metric="rps" metricValue={2.4} metricUnit="k" metricMax={5} />
        </div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <Pipeline stages={[
            { name: 'lint', status: 'passing', duration: '12s' },
            { name: 'test', status: 'passing', duration: '1m03s' },
            { name: 'build', status: 'running', duration: '45s' },
            { name: 'deploy', status: 'waiting' },
          ]} />
        </div>
        <div class="tile-info"><strong>Pipeline</strong><span>CI/CD stages: lint → test → build → deploy</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <DeployDiff
            beforeName="stable-v1" beforeHealth="healthy" beforeP99={210}
            afterName="canary-v2" afterHealth="healthy" afterP99={180}
          />
        </div>
        <div class="tile-info"><strong>DeployDiff</strong><span>before/after deployment compare with metrics</span></div>
      </article>

      <article class="tile">
        <div class="tile-demo">
          <ModelCard name="llm-router" version="3.1.0" accuracy={94.2} status="ready" />
        </div>
        <div class="tile-info"><strong>ModelCard</strong><span>ML model: version + accuracy + training status</span></div>
        <div class="tile-variants">
          <ModelCard name="text-embed" version="2.0.1" accuracy={88.5} status="training" />
          <ModelCard name="v1-classifier" version="1.5.0" status="deprecated" />
        </div>
      </article>
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
    border-color: rgba(201, 152, 74, 0.18);
    color: var(--vnp-color-relation);
    opacity: 0.85;
  }
  .badge--attention {
    border-color: rgba(91, 155, 213, 0.18);
    color: var(--vnp-color-value);
    opacity: 0.8;
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
