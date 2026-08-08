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
    border-radius: 6px;
    background: var(--canvas-sticky-green);
    padding: 8px 12px;
    min-width: 100px;
  }
  .uf-outcome__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-good);
    white-space: nowrap;
  }
  .uf-outcome__label::before {
    content: '✓';
    margin-right: 6px;
  }
</style>
