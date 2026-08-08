<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Зона-колонна (Now/Next/Later) — панель в регистре канвас-кита:
   *  фон `--canvas-panel-bg`, mono-заголовок сверху, тело — чипы
   *  фаз и вех с переносом строк. Канвас раскладывает панели в ряд. */
  let {
    label,
    children,
  }: {
    label: string;
    children?: Snippet;
  } = $props();
</script>

<section class="rm-horizon">
  <h4 class="rm-horizon__label">{label}</h4>
  <div class="rm-horizon__body">
    {#if children}{@render children()}{/if}
  </div>
</section>

<style>
  .rm-horizon {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    border: var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 12px 14px;
  }
  .rm-horizon__label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--canvas-ink-soft);
    text-align: center;
    margin: 0 0 10px;
  }
  .rm-horizon__body {
    flex: 1 1 auto;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 0;
  }
</style>
