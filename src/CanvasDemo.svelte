<script lang="ts">
  import { ValuePropositionCanvas, Scene, StickyNote } from './lib/index.ts';
  import './lib/canvases/canvas-theme.css';
</script>

<div class="theme-canvas">
  <div class="cdemo">
    <header class="cdemo__header">
      <h1 class="cdemo__title">Canvas Demo — Value Proposition Canvas</h1>
      <p class="cdemo__sub">16:9 horizontal · Miro-style sticky notes</p>
    </header>

    <div class="cdemo__grid">
      <!-- ═══ DATA MODE ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">data mode</span>
        <Scene title="Value Proposition Canvas">
          <ValuePropositionCanvas
            customerJobs={[
              'Write code',
              'Debug errors',
              'Review PRs',
              'Deploy services',
            ]}
            pains={[
              'Slow IDE startup',
              'Complex cloud config',
              'Context switching',
              'Fragile toolchain',
            ]}
            gains={[
              'Fast feedback loop',
              'One-click deploy',
              'Real-time collaboration',
              'Built-in best practices',
            ]}
            products={[
              'Cloud IDE',
              'AI Copilot',
              'Pre-built dev environments',
            ]}
            painRelievers={[
              'Instant env spin-up',
              'Zero-config cloud',
              'Unified workflow',
            ]}
            gainCreators={[
              'Hot-reload in 50ms',
              'Deploy to prod in 1 click',
              'Multiplayer editing',
              'Lint/test built-in',
            ]}
          />
        </Scene>
      </div>

      <!-- ═══ SLOTS MODE (custom atoms) ═══ -->
      <div class="cdemo__item">
        <span class="cdemo__badge">slots mode</span>
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
  .cdemo__item :global(.scene) {
    width: 100%;
    height: 100%;
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
