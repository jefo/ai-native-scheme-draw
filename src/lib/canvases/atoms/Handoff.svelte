<script lang="ts">
  /** Передача артефакта от одного актора другому. */
  let {
    from,
    to,
    artifact,
  }: {
    from: string;
    to: string;
    artifact?: string;
  } = $props();
</script>

<div class="uf-step uf-handoff">
  <div class="uf-handoff__row">
    <span class="uf-handoff__actor">{from}</span>
    <span class="uf-handoff__arrow">→</span>
    <span class="uf-handoff__actor">{to}</span>
  </div>
  {#if artifact}
    <span class="uf-handoff__chip">{artifact}</span>
  {/if}
</div>

<style>
  .uf-handoff {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 8px 12px;
  }
  .uf-handoff__row {
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .uf-handoff__actor {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .uf-handoff__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    color: var(--canvas-ink-soft);
  }
  .uf-handoff__chip {
    font-family: var(--vnp-font);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    border: 1px solid var(--canvas-sticky-blue-border);
    background: var(--canvas-sticky-blue);
    border-radius: 3px;
    padding: 1px 7px;
    white-space: nowrap;
  }
</style>
