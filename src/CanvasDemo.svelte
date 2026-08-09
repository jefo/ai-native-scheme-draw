<script lang="ts">
  import {
    ValuePropositionCanvas,
    LeanCanvas,
    FeatureModel,
    TradeOffMatrix,
    TradeOffRow,
    FeatureNode,
    PositioningMap,
    Axis,
    Territory,
    Player,
    Tension,
    Vector,
    Story,
    Actor,
    Action,
    Artifact,
    System,
    Handoff,
    Decision,
    Outcome,
    Roadmap,
    Horizon,
    Phase,
    Milestone,
    Dependency,
    SystemDiagram,
    CustomerProfile,
    ProcessMap,
    CapabilityMap,
    Stage,
    Stack,
    Split,
    Rail,
    Overlay,
    Zone,
    Divider,
    Scene,
    StickyNote,
  } from './lib/index.ts';
  import './lib/canvases/canvas-theme.css';
</script>

<div class="theme-canvas">
  <div class="cdemo">
    <header class="cdemo__header">
      <h1 class="cdemo__title">Canvas Demo — VPC · Lean · Feature Model · Trade-offs · Positioning Map · User Story · Roadmap · Composition</h1>
      <p class="cdemo__sub">16:9 · technical editorial · composition system</p>
    </header>

    <div class="cdemo__grid">
      <!-- ═══ VPC — slots mode ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">vpc · slots</span>
        <Scene title="Value Proposition Canvas">
          <ValuePropositionCanvas
            customerJobsSlot={jobs}
            painsSlot={pn}
            gainsSlot={gn}
            productsSlot={pr}
            painRelieversSlot={prs}
            gainCreatorsSlot={gcs}
          />
        </Scene>
      </div>

      <!-- ═══ LEAN CANVAS — slots mode ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">lean canvas · slots</span>
        <Scene title="Lean Canvas — Custom">
          <LeanCanvas
            problemSlot={lcProblem}
            solutionSlot={lcSolution}
            keyMetricsSlot={lcMetrics}
            uvpSlot={lcUvp}
            unfairAdvantageSlot={lcAdvantage}
            channelsSlot={lcChannels}
            customerSegmentsSlot={lcSegments}
            costStructureSlot={lcCost}
            revenueStreamsSlot={lcRevenue}
          />
        </Scene>
      </div>

      <!-- ═══ FEATURE MODEL — slots mode ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">feature model · slots</span>
        <Scene title="Feature Model — Visual Narrative Library">
          <FeatureModel root="Visual Narrative Library">
            {#snippet children()}
              <FeatureNode label="Core Grammar" kind="mandatory">
                <FeatureNode label="Objects" kind="mandatory" />
                <FeatureNode label="Predicates" kind="mandatory" />
                <FeatureNode label="Scene" kind="mandatory" />
              </FeatureNode>
              <FeatureNode label="Canvases" kind="optional">
                <FeatureNode label="VPC" kind="optional" />
                <FeatureNode label="Lean" kind="optional" />
                <FeatureNode label="Feature Model" kind="optional" />
              </FeatureNode>
              <FeatureNode label="Themes" kind="alternative" hint="1 of N">
                <FeatureNode label="Blueprint" kind="alternative" />
                <FeatureNode label="Brutalist" kind="alternative" />
                <FeatureNode label="Canvas" kind="alternative" />
              </FeatureNode>
              <FeatureNode label="Visual Editor" kind="excluded" />
            {/snippet}
          </FeatureModel>
        </Scene>
      </div>

      <!-- ═══ POSITIONING MAP — slots mode (DSL) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">positioning map · slots</span>
        <Scene title="Positioning Map — Visual Modeling Tools">
          <PositioningMap>
            <Axis id="x" label="Degree of automation" low="Manual" high="Autonomous" />
            <Axis id="y" label="Customer control" low="Service" high="Self-serve" />
            <Territory x={72} y={75} label="Visual modeling platforms" />
            <Player name="Miro" x={38} y={62} state="competitor" />
            <Player name="Zapier" x={62} y={32} state="competitor" />
            <Player name="Linear" x={48} y={72} state="reference" />
            <Player name="AI copilots" x={76} y={26} state="emerging" />
            <Player name="???" x={20} y={25} state="unknown" />
            <Player name="Us" x={82} y={80} state="focus" />
            <Tension between={['Us', 'Miro']} label="Rigor vs playfulness" />
            <Vector from="Us" to={{ x: 92, y: 90 }} label="Autonomous modeling" />
          </PositioningMap>
        </Scene>
      </div>

      <!-- ═══ USER STORY — slots mode (Domain Storytelling) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">user story · slots</span>
        <Scene title="User Story — From Insight to Value">
          <Story>
            <Actor name="Founder" />
            <Action actor="Founder" label="Write the brief" />
            <Artifact name="Brief" />
            <System label="Launch Console">
              <Action actor="AI" label="Implement from the brief" />
              <Artifact name="Brief" />
              <Artifact name="Scene" />
            </System>
            <Decision actor="Founder" label="Ship?" />
            <Outcome label="Value realized" />
          </Story>
        </Scene>
      </div>

      <!-- ═══ ROADMAP — slots mode (causal path, not a calendar) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">roadmap · slots</span>
        <Scene title="Roadmap — From Grammar to Ecosystem">
          <Roadmap>
            <Horizon label="Now">
              <Phase label="Grammar" />
              <Milestone name="Taxonomy" />
              <Phase label="Canvases" />
              <Milestone name="Canon" />
            </Horizon>
            <Horizon label="Next">
              <Phase label="Editor" />
              <Milestone name="Render" />
            </Horizon>
            <Horizon label="Later">
              <Phase label="Scale" />
              <Milestone name="Ecosystem" />
            </Horizon>
            <Dependency from="Canon" to="Render" />
            <Dependency from="Taxonomy" to="Ecosystem" />
          </Roadmap>
        </Scene>
      </div>

      <!-- ═══ COMPOSITION — Stage · Rail · Stack (16:9, YouTube classic) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">composition · stage · rail · stack</span>
        <Stage aspect="16:9" density="editorial">
          <Rail side="right" width="260px" gap="lg">
            <PositioningMap showLegend={false} />
            {#snippet rail()}
              <Stack gap="md">
                <Stack gap="sm">
                  <span class="cdemo__eyebrow">POSITIONING</span>
                  <h2 class="cdemo__headline">The market isn't where you think it is</h2>
                </Stack>
                <Divider />
                <Stack gap="sm">
                  <span class="cdemo__evidence cdemo__evidence--rose">● Miro owns playfulness — and the noise</span>
                  <span class="cdemo__evidence cdemo__evidence--amber">● Us owns rigor — and the meaning</span>
                  <span class="cdemo__evidence">● The opening is the tension between them</span>
                </Stack>
                <Divider />
                <div class="cdemo__insight">The opening is here.</div>
              </Stack>
            {/snippet}
          </Rail>
        </Stage>
      </div>

      <!-- ═══ COMPOSITION — Shorts safe areas (9:16) ═══ -->
      <div class="cdemo__item cdemo__item--short">
        <span class="cdemo__badge">composition · shorts · safe areas</span>
        <Stage aspect="9:16" density="editorial" safeArea="shorts">
          <Overlay>
            <PositioningMap showLegend={false} />
            {#snippet overlay()}
              <Zone placement="safe-top">
                <Stack gap="sm">
                  <span class="cdemo__eyebrow">POSITIONING</span>
                  <h2 class="cdemo__headline">The market isn't where you think it is</h2>
                </Stack>
              </Zone>
              <Zone placement="safe-bottom">
                <div class="cdemo__insight">The opening is here.</div>
              </Zone>
            {/snippet}
          </Overlay>
        </Stage>
      </div>

      <!-- ═══ TRADE-OFF MATRIX — slots mode ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">trade-off matrix · slots</span>
        <Scene title="Trade-off Matrix — Product Decisions">
          <TradeOffMatrix>
            {#snippet children()}
              <TradeOffRow decision="Format">
                <StickyNote color="pink" label="9:16 Shorts" mark="cross" />
                <StickyNote color="green" label="16:9 Classic" mark="check" />
              </TradeOffRow>
              <TradeOffRow decision="Aesthetic" note="canon dictates the form">
                <StickyNote color="pink" label="Blueprint" mark="cross" />
                <StickyNote color="pink" label="Brutalist" mark="cross" />
                <StickyNote color="green" label="Miro sticky" mark="check" />
              </TradeOffRow>
              <TradeOffRow decision="Architecture">
                <StickyNote color="pink" label="organisms/" mark="cross" />
                <StickyNote color="green" label="canvases/" mark="check" />
              </TradeOffRow>
              <TradeOffRow decision="Scope" note="one organism at a time">
                <StickyNote color="pink" label="All 7 at once" mark="cross" />
                <StickyNote color="green" label="One at a time" mark="check" />
              </TradeOffRow>
            {/snippet}
          </TradeOffMatrix>
        </Scene>
      </div>

      <!-- ═══ SYSTEM DIAGRAM — data mode (T1 F7) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">system diagram · data — T1 F7 Identity Loop</span>
        <Scene title="System Diagram — Capability → Buyer → Product">
          <SystemDiagram
            nodes={[
              { id: 'cap', label: 'Runway API', role: 'capability' },
              { id: 'buy', label: 'Developer', role: 'buyer' },
              { id: 'prd', label: 'ACF $149/mo', role: 'product' },
            ]}
            edges={[
              { from: 'cap', to: 'buy', label: 'enables' },
              { from: 'buy', to: 'prd', label: 'builds' },
            ]}
            focusNode="buy"
          />
        </Scene>
      </div>

      <!-- ═══ CUSTOMER PROFILE — data mode (T1 F1) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">customer profile · data — T1 F1 Buyer Portrait</span>
        <Scene title="Customer Profile — Performance Marketer">
          <CustomerProfile
            role="Performance Marketer"
            metrics={[
              { label: 'Budget', value: '$15k / month' },
              { label: 'Goal', value: 'acquire customers' },
              { label: 'Bottleneck', value: 'creative throughput' },
            ]}
            jobs={['run campaigns', 'scale creative output', 'optimise spend']}
            pains={['designer bottleneck', '5 creatives / week']}
            productPrice="$149 / month"
          />
        </Scene>
      </div>

      <!-- ═══ PROCESS MAP — data mode (T1 F2) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">process map · data — T1 F2 Service Blueprint</span>
        <Scene title="Process Map — Creative Production Flow">
          <ProcessMap
            stages={[
              { name: 'Traffic', actor: 'Ads', state: 'normal', metric: { label: 'volume', value: '$15k/month' } },
              { name: 'Campaign', state: 'normal', metric: { label: 'count', value: 'dozens' } },
              { name: 'Brief', state: 'normal' },
              { name: 'Designer', actor: 'Human', state: 'bottleneck', metric: { label: 'throughput', value: '5/week' }, branches: [{ name: 'creative 1' }, { name: 'creative 2' }, { name: 'creative 3' }, { name: 'creative 4' }, { name: 'creative 5' }] },
              { name: 'Launch', state: 'normal' },
            ]}
          />
        </Scene>
      </div>

      <!-- ═══ CAPABILITY MAP — data mode (T1 F3) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">capability map · data — T1 F3 Gap Analysis</span>
        <Scene title="Capability Map — AI vs Campaign Need">
          <CapabilityMap
            capability={{
              name: 'AI Capability',
              description: 'Text → Video',
              metrics: [
                { label: 'Cost', value: '$0.75' },
                { label: 'Speed', value: 'seconds' },
              ],
            }}
            need={{
              name: 'Campaign Need',
              description: 'Many launch-ready creatives',
              metrics: [
                { label: 'Volume', value: 'dozens/week' },
                { label: 'Quality', value: 'campaign-ready' },
              ],
            }}
            gap={{ label: 'GAP' }}
          />
        </Scene>
      </div>
    </div>
  </div>
</div>

<!-- ═══ Snippets for slots demo ═══ -->
{#snippet jobs()}
  <StickyNote color="yellow" label="Build features" />
  <StickyNote color="yellow" label="Ship fast" />
  <StickyNote color="yellow">
    <strong>🧠 Think</strong>
  </StickyNote>
{/snippet}

{#snippet pn()}
  <StickyNote color="pink" label="Merge conflicts" />
  <StickyNote color="pink" label="Flaky tests" />
  <StickyNote color="pink" label="Slow CI" />
{/snippet}

{#snippet gn()}
  <StickyNote color="green" label="Zero downtime" />
  <StickyNote color="green" label="Happy users" />
  <StickyNote color="green">
    <em>✨ Flow state</em>
  </StickyNote>
{/snippet}

{#snippet pr()}
  <StickyNote color="blue" label="VS Code Extension" />
  <StickyNote color="blue" label="GitHub Integration" />
{/snippet}

{#snippet prs()}
  <StickyNote color="pink" label="Auto-resolve conflicts" />
  <StickyNote color="pink" label="Self-healing CI" />
{/snippet}

{#snippet gcs()}
  <StickyNote color="green" label="Canary deploys" />
  <StickyNote color="green" label="Instant rollback" />
{/snippet}

{#snippet lcProblem()}
  <StickyNote color="pink" label="Manual diagrams" />
  <StickyNote color="pink" label="One-off canvases" />
  <StickyNote color="pink">
    <strong>🔥 Lost time</strong>
  </StickyNote>
{/snippet}

{#snippet lcSolution()}
  <StickyNote color="green" label="Semantic grammar" />
  <StickyNote color="green" label="Canonical organisms" />
{/snippet}

{#snippet lcMetrics()}
  <StickyNote color="blue" label="Scenes / project" />
  <StickyNote color="blue" label="Time to first idea" />
{/snippet}

{#snippet lcUvp()}
  <StickyNote color="orange" label="Grammar, not templates" />
  <StickyNote color="orange">
    <em>Meaning over geometry</em>
  </StickyNote>
{/snippet}

{#snippet lcAdvantage()}
  <StickyNote color="purple" label="Canonical systems" />
  <StickyNote color="purple" label="Dual API: data + slots" />
{/snippet}

{#snippet lcChannels()}
  <StickyNote color="blue" label="GitHub" />
  <StickyNote color="blue" label="X / LinkedIn" />
{/snippet}

{#snippet lcSegments()}
  <StickyNote color="yellow" label="Explainer authors" />
  <StickyNote color="yellow" label="Tech leads" />
{/snippet}

{#snippet lcCost()}
  <StickyNote color="pink" label="Dev time" />
  <StickyNote color="pink" label="Theme upkeep" />
{/snippet}

{#snippet lcRevenue()}
  <StickyNote color="green" label="OSS + sponsorship" />
  <StickyNote color="green" label="Consulting" />
{/snippet}

<style>
  .cdemo {
    min-height: 100vh;
    padding: 24px;
    background: var(--vnp-paper);
  }
  .cdemo__header {
    margin-bottom: 32px;
    text-align: center;
  }
  .cdemo__title {
    font-family: var(--vnp-font);
    font-size: 22px;
    font-weight: 700;
    color: var(--vnp-ink);
    margin-bottom: 4px;
  }
  .cdemo__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    color: var(--vnp-ink-soft);
  }
  .cdemo__grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: center;
  }
  .cdemo__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 960px;
    aspect-ratio: 16 / 9;
  }
  .cdemo__item--short {
    max-width: 360px;
    aspect-ratio: 9 / 16;
  }
  .cdemo__item :global(.scene),
  .cdemo__item :global(.stage) {
    width: 100%;
    height: 100%;
  }

  /* ── composition demo content ── */
  .cdemo__eyebrow {
    font-family: var(--vnp-font-mono);
    font-size: var(--stage-type-xs);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--canvas-highlight-ink);
  }
  .cdemo__headline {
    margin: 0;
    font-family: var(--vnp-font);
    font-size: var(--stage-type-lg);
    font-weight: 700;
    line-height: 1.25;
    color: var(--vnp-ink);
  }
  .cdemo__evidence {
    font-family: var(--vnp-font-mono);
    font-size: var(--stage-type-xs);
    letter-spacing: 0.02em;
    color: var(--canvas-ink-soft);
  }
  .cdemo__evidence--rose {
    color: var(--canvas-mark-cross);
  }
  .cdemo__evidence--amber {
    color: var(--canvas-highlight-ink);
  }
  .cdemo__insight {
    border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 45%, transparent);
    border-radius: 6px;
    padding: 8px 12px;
    font-family: var(--vnp-font);
    font-size: var(--stage-type-md);
    font-weight: 600;
    color: var(--canvas-highlight-ink);
    background: color-mix(in srgb, var(--canvas-highlight-ink) 7%, transparent);
  }
  .cdemo__badge {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--vnp-ink-soft);
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: var(--vnp-radius-chip);
    padding: 2px 10px;
  }
</style>
