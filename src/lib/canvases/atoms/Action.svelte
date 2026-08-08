<script lang="ts">
  /** Действие: глагол + объект. Кто выполняет — tag actor над меткой. */
  let {
    label,
    actor,
  }: {
    label: string;
    actor?: string;
  } = $props();
</script>

<div class="uf-step uf-action">
  {#if actor}
    <span class="uf-action__actor">
      <span class="uf-action__dot"></span>{actor}
    </span>
  {/if}
  <span class="uf-action__label">{label}</span>
</div>

<style>
  .uf-action {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: var(--canvas-stroke);
    border-radius: 6px;
    background: var(--canvas-panel-bg);
    padding: 8px 12px;
    min-width: 88px;
    max-width: 150px;
    text-align: left;
  }
  .uf-action__actor {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
  }
  .uf-action__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--vnp-info);
  }
  .uf-action__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    line-height: 1.45;
    color: var(--canvas-ink);
  }
</style>
