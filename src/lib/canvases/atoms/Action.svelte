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
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
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
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
  }
  .uf-action__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vnp-info);
  }
  .uf-action__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.35;
    color: var(--canvas-ink);
  }
</style>
