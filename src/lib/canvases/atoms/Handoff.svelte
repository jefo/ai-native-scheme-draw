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
    border: var(--canvas-stroke);
    border-radius: 6px;
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
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .uf-handoff__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--canvas-ink-soft);
  }
  .uf-handoff__chip {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-info);
    border: 1px solid var(--canvas-sticky-blue-border);
    background: var(--canvas-sticky-blue);
    border-radius: 3px;
    padding: 1px 6px;
    white-space: nowrap;
  }
</style>
