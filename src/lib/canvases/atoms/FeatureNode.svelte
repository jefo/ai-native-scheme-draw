<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { FeatureKind } from '../types';

  /** FeatureNode — атом фич-диаграммы (FODA-нотация).
   *  Прямоугольник фичи с маркером kind:
   *  mandatory ● / optional ○ / alternative ○ («1 of N») / excluded ✕.
   *  children — вложенные FeatureNode; рендерятся ветвью с CSS-коннекторами
   *  (drop-линия от родителя, рейка, riser к каждому ребёнку).
   *  hint — подпись группы над ветвью (напр. «1 of N» для XOR-групп). */
  let {
    label,
    kind = 'mandatory',
    variant = 'node',
    hint,
    children,
  }: {
    label: string;
    kind?: FeatureKind;
    variant?: 'node' | 'root';
    hint?: string;
    children?: Snippet;
  } = $props();
</script>

<div class="fn fn--{kind}" class:fn--root={variant === 'root'}>
  <span class="fn__box">
    <span class="fn__marker" title={kind}></span>
    <span class="fn__label">{label}</span>
  </span>

  {#if hint}
    <span class="fn__hint">{hint}</span>
  {/if}

  {#if children}
    <span class="fn__branch">
      <span class="fn__rail">
        {@render children()}
      </span>
    </span>
  {/if}
</div>

<style>
  .fn {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
    max-width: 100%;
    position: relative;
  }

  .fn__box {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: var(--canvas-stroke);
    background: var(--canvas-panel-bg);
    border-radius: 6px;
    padding: 3px 8px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: var(--canvas-ink);
    white-space: nowrap;
    position: relative;
    z-index: 1;
  }

  .fn__marker {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ── маркеры kind (FODA-нотация) ── */
  .fn--mandatory .fn__marker {
    background: var(--canvas-ink);
  }
  .fn--optional .fn__marker {
    background: transparent;
    border: 1.5px solid var(--canvas-ink);
  }
  .fn--alternative .fn__marker {
    background: transparent;
    border: 1.5px solid var(--vnp-warn);
  }
  .fn--excluded {
    opacity: 0.45;
  }
  .fn--excluded .fn__marker {
    background: var(--vnp-bad);
    border: none;
  }
  .fn--excluded .fn__label {
    text-decoration: line-through;
  }

  /* ── root variant: ключевая фича — неоновая кромка ── */
  .fn--root .fn__box {
    border: 1px solid transparent;
    background:
      linear-gradient(var(--canvas-highlight-bg), var(--canvas-highlight-bg)) padding-box,
      var(--canvas-panel-gradient) border-box;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 6px 16px;
  }
  .fn--root .fn__marker {
    background: var(--canvas-highlight-ink);
  }

  /* ── hint группы ── */
  .fn__hint {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.1em;
    color: var(--vnp-warn);
    margin-top: 4px;
  }

  /* ── ветвь: drop-линия от родителя к рейке ── */
  .fn__branch {
    position: relative;
    margin-top: 12px;
  }
  .fn__branch::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 12px;
    border-left: var(--canvas-stroke);
  }

  /* ── рейка: горизонтальная линия + riser к каждому ребёнку ── */
  .fn__rail {
    position: relative;
    display: flex;
    gap: 12px;
    justify-content: center;
    align-items: flex-start;
    padding-top: 12px;
  }
  .fn__rail::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-top: var(--canvas-stroke);
  }
  .fn__rail > :global(.fn)::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    height: 12px;
    border-left: var(--canvas-stroke);
  }
</style>
