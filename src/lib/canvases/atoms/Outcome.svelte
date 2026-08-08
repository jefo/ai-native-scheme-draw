<script lang="ts">
  /** Конечное состояние стори — реализованная ценность. */
  let {
    label,
  }: {
    label: string;
  } = $props();
</script>

<div class="uf-step uf-outcome">
  <span class="uf-outcome__label">{label}</span>
</div>

<style>
  .uf-outcome {
    border: 1px solid var(--canvas-sticky-green-border);
    border-radius: 8px;
    background: var(--canvas-sticky-green);
    padding: 8px 14px;
    min-width: 100px;
    min-height: 34px;
    box-shadow:
      var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-green-border) 28%, transparent);
  }
  .uf-outcome__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
  .uf-outcome__label::before {
    content: '✓';
    margin-right: 6px;
    color: var(--vnp-good);
  }
</style>
