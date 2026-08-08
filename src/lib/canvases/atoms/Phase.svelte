<script lang="ts">
  /** Сегмент пути — этап работы. Чип в регистре канвас-кита:
   *  нейтральное стекло (без семантического цвета — акцент только
   *  на вехах), подпись в голосе стикеров (sans semibold). */
  let {
    label,
  }: {
    label: string;
  } = $props();
</script>

<div class="rm-phase">
  <span class="rm-phase__label">{label}</span>
</div>

<style>
  .rm-phase {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px 16px;
    min-width: 84px;
    min-height: 36px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .rm-phase__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
