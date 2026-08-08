<script lang="ts">
  import type { Snippet } from 'svelte';

  /** CanvasSection — молекула канвасов: ячейка грида с заголовком.
   *  Используется Lean Canvas и другими грид-канвасами.
   *  - `tone="highlight"` — для центральных/ключевых ячеек (UVP)
   *  - `area` — имя grid-area для размещения в сетке родителя
   *  - `hint` — нижняя подпись-подсказка (напр. "Existing Alternatives") */
  let {
    label,
    children,
    tone = 'default',
    area,
    hint,
  }: {
    label: string;
    children?: Snippet;
    tone?: 'default' | 'highlight';
    area?: string;
    hint?: string;
  } = $props();
</script>

<section
  class="csection csection--{tone}"
  style={area ? `grid-area: ${area}` : undefined}
  title={hint ? `${label} — ${hint}` : label}
>
  <h4 class="csection__label">{label}</h4>
  <div class="csection__body">
    {@render children?.()}
  </div>
  {#if hint}
    <span class="csection__hint">{hint}</span>
  {/if}
</section>

<style>
  .csection {
    display: flex;
    flex-direction: column;
    border: var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 10px 12px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .csection__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
    text-align: center;
    margin: 0 0 8px;
  }

  .csection__body {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    justify-content: center;
    flex: 1 1 auto;
  }

  .csection__hint {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--canvas-ink-soft);
    text-align: center;
    margin-top: 8px;
    opacity: 0.7;
  }

  /* ── highlight: ключевая ячейка (UVP) — неоновая кромка ── */
  .csection--highlight {
    border: 1px solid transparent;
    background:
      linear-gradient(var(--canvas-highlight-bg), var(--canvas-highlight-bg)) padding-box,
      var(--canvas-panel-gradient) border-box;
  }
  .csection--highlight .csection__label {
    color: var(--canvas-highlight-ink);
    font-size: 11px;
    letter-spacing: 0.08em;
  }
</style>
