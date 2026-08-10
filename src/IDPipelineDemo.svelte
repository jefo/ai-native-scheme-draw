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
  import { runwayKnowledge } from './lib/canvases/knowledge-model.ts';
  import './lib/canvases/canvas-theme.css';

  // ── Derive projections from the knowledge model ──

  // Capability projection: what learner must be able to do
  const capabilities = $derived(
    runwayKnowledge.entities
      .filter(e => e.type === 'capability')
      .map(c => ({ name: c.name, description: c.description }))
  );

  // Dependency projection: prerequisite order — what must be learned before what
  const deps = $derived(
    runwayKnowledge.relationships
      .filter(r => r.type === 'requires' || r.type === 'depends-on')
  );

  // Causal projection: causal chain from feature-label to model
  const causal = $derived(
    runwayKnowledge.relationships
      .filter(r => r.type === 'causes')
      .map(r => ({ from: runwayKnowledge.entities.find(e => e.id === r.from)?.name ?? r.from, to: runwayKnowledge.entities.find(e => e.id === r.to)?.name ?? r.to, mechanism: r.label ?? '' }))
  );

  // Journey projection: cognitive states
  const journeyStages = $derived(
    runwayKnowledge.entities
      .filter(e => e.type === 'state')
      .map(s => ({ state: (s.id === 'cognitive-conflict' ? 'observation' : s.id === 'confusion' ? 'confusion' : 'model') as 'confusion' | 'observation' | 'model', description: s.name, content: s.description }))
  );

  // Evidence projection: claims from the relationships
  const evidenceClaims = $derived([
    {
      statement: 'Runway — не генератор видео, а production-scale generative media API',
      evidence: [
        { type: 'example' as const, description: 'Runway декларирует use cases: ad creative, product visualization' },
        { type: 'source' as const, description: 'Продуктовая страница Runway — не список методов, а jobs-to-be-done' },
      ],
    },
    {
      statement: 'Одиночный вызов API — не продукт',
      evidence: [
        { type: 'analogy' as const, description: 'Сгенерировать одно видео ≠ решить работу performance marketer' },
        { type: 'example' as const, description: 'Runway даёт workflows и recipes — готовые цепочки, не одиночные вызовы' },
      ],
    },
    {
      statement: 'Продукт продаёт изменение cost structure, а не технология',
      evidence: [
        { type: 'benchmark' as const, description: 'Студийное production: $300–500, дни. API-фабрика: ≈$0, 5 минут' },
        { type: 'analogy' as const, description: '10% дешевле — никто не переключится. В 10 раз — переключатся' },
      ],
    },
  ]);

  // Context projection: bounded contexts in the API-as-product domain
  const ctxBoxes = [
    { name: 'API Surface', entities: ['methods', 'endpoints', 'models', 'docs'] },
    { name: 'Capability Layer', entities: ['media generation', 'video editing', 'enhancement'] },
    { name: 'Workflow Layer', entities: ['pipeline', 'recipes', 'automation'] },
    { name: 'Buyer Context', entities: ['performance marketer', 'e-commerce team', 'content studio'] },
    { name: 'Product Layer', entities: ['product shape', 'cost structure', 'thesis'] },
  ];
  const ctxConns = [
    { from: 'API Surface', to: 'Capability Layer', label: 'groups into' },
    { from: 'Capability Layer', to: 'Workflow Layer', label: 'composed as' },
    { from: 'Workflow Layer', to: 'Buyer Context', label: 'hired by' },
    { from: 'Buyer Context', to: 'Product Layer', label: 'shapes' },
  ];
</script>

<div class="theme-canvas">
  <div class="iddemo">
    <header class="iddemo__header">
      <h1 class="iddemo__title">Instructional Design Pipeline</h1>
      <p class="iddemo__sub">Knowledge Model → Cognitive Projection → Framework</p>
    </header>

    <!-- ═══ KNOWLEDGE MODEL — source of truth ═══ -->
    <section class="iddemo__section">
      <h2 class="iddemo__section-title">Knowledge Model</h2>
      <p class="iddemo__section-desc">
        Единая семантическая модель. Не визуальный артефакт — источник, из которого
        извлекаются проекции. {runwayKnowledge.domain}: {runwayKnowledge.description}
      </p>
      <div class="iddemo__frame">
        <span class="iddemo__badge">source · {runwayKnowledge.entities.length} entities · {runwayKnowledge.relationships.length} relationships</span>
        <Scene title="Knowledge Model — {runwayKnowledge.domain}">
          <ContextMap contexts={ctxBoxes} connections={ctxConns} />
        </Scene>
      </div>
    </section>

    <!-- ═══ PROJECTIONS ═══ -->
    <section class="iddemo__section">
      <h2 class="iddemo__section-title">Projections</h2>
      <p class="iddemo__section-desc">
        Одна knowledge model — разные когнитивные виды. Каждая проекция отвечает
        на один вопрос learner'а. Framework selection = semantic projection selection.
      </p>

      <div class="iddemo__grid">
        <!-- 1. Capability Projection -->
        <div class="iddemo__frame">
          <span class="iddemo__badge">capability projection · что должен уметь learner?</span>
          <Scene title="Capability Projection">
            <CapabilityMap mode="group" {capabilities} />
          </Scene>
        </div>

        <!-- 2. Dependency Projection -->
        <div class="iddemo__frame">
          <span class="iddemo__badge">dependency projection · что идёт до чего?</span>
          <Scene title="Dependency Projection">
            <DependencyGraph
              nodes={[
                { id: 'api', label: 'API Methods', requires: [] },
                { id: 'cap', label: 'Capability', requires: ['api'] },
                { id: 'wf', label: 'Workflow', requires: ['cap'] },
                { id: 'buyer', label: 'Buyer Job', requires: ['wf'] },
                { id: 'shape', label: 'Product Shape', requires: ['buyer'] },
                { id: 'econ', label: 'Cost Structure', requires: ['shape'] },
                { id: 'thesis', label: 'Product Thesis', requires: ['econ'] },
              ]}
            />
          </Scene>
        </div>

        <!-- 3. Causal Projection -->
        <div class="iddemo__frame">
          <span class="iddemo__badge">causal projection · почему это работает?</span>
          <Scene title="Causal Projection">
            <CausalChain steps={causal} />
          </Scene>
        </div>

        <!-- 4. Learner Journey Projection -->
        <div class="iddemo__frame">
          <span class="iddemo__badge">journey projection · как learner открывает?</span>
          <Scene title="Learner Journey">
            <LearnerJourney
              stages={[
                { state: 'confusion', description: 'Видит список методов', content: 'text-to-video, image-to-video… 6 штук' },
                { state: 'prediction', description: 'Думает: «Это генератор видео»', content: 'Feature Label = понимание' },
                { state: 'observation', description: 'СТОП. Ярлык разрушен.', content: '«В этом знаю — вся проблема»' },
                { state: 'explanation', description: 'Методы группируются в capability', content: 'MEDIA GENERATION — одна возможность' },
                { state: 'model', description: 'Строит causal model', content: 'Capability → Workflow → Buyer → Thesis' },
                { state: 'application', description: 'Применяет к другому API', content: 'OpenAI API: та же оптика работает' },
              ]}
            />
          </Scene>
        </div>

        <!-- 5. Evidence Projection -->
        <div class="iddemo__frame">
          <span class="iddemo__badge">evidence projection · почему learner должен верить?</span>
          <Scene title="Evidence Projection">
            <EvidenceMap claims={evidenceClaims} />
          </Scene>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .iddemo {
    min-height: 100vh;
    padding: 40px 28px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 48px;
  }
  .iddemo__header {
    text-align: center;
    max-width: 720px;
  }
  .iddemo__title {
    font-family: var(--vnp-font);
    font-size: 28px;
    font-weight: 700;
    color: var(--canvas-ink);
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }
  .iddemo__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 500;
    color: var(--canvas-ink-soft);
    margin: 0;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .iddemo__section {
    width: 100%;
    max-width: 1080px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .iddemo__section-title {
    font-family: var(--vnp-font);
    font-size: 18px;
    font-weight: 700;
    color: var(--canvas-ink);
    margin: 0;
    letter-spacing: -0.01em;
  }
  .iddemo__section-desc {
    font-family: var(--vnp-font);
    font-size: 13px;
    line-height: 1.5;
    color: var(--canvas-ink-soft);
    margin: 0;
    max-width: 700px;
  }

  .iddemo__grid {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }

  .iddemo__frame {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .iddemo__badge {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
    padding-left: 4px;
  }
  .iddemo__frame :global(.scene) {
    aspect-ratio: 16 / 9;
    height: auto;
  }
</style>
