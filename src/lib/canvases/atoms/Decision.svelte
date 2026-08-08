<script lang="ts">
  /** Развилка: янтарный чип с ромбом + подпись решения. Кто решает — tag actor. */
  let {
    label,
    actor,
  }: {
    label: string;
    actor?: string;
  } = $props();
</script>

<div class="uf-step uf-decision">
  {#if actor}
    <span class="uf-decision__actor">
      <span class="uf-decision__actor-dot"></span>{actor}
    </span>
  {/if}
  <div class="uf-decision__row">
    <span class="uf-decision__diamond"></span>
    <span class="uf-decision__label">{label}</span>
  </div>
</div>

<style>
  .uf-decision {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    border: 1px solid color-mix(in srgb, var(--canvas-highlight-ink) 70%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 8px 14px;
    min-height: 34px;
  }
  .uf-decision__actor {
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
  .uf-decision__actor-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vnp-info);
  }
  .uf-decision__row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .uf-decision__diamond {
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border: 1px solid var(--canvas-sticky-yellow-border);
    background: var(--canvas-sticky-yellow);
    border-radius: 2px;
    flex: none;
  }
  .uf-decision__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-highlight-ink);
    white-space: nowrap;
  }
</style>
