<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Trade-off — противопоставление по осям: Noise ↑ / FPS ↑.
   *  Layout predicate (information design): два содержимых, растущих в разные стороны. */
  let { left = 'A ↑', right = 'B ↑', children }: { left?: string; right?: string; children?: Snippet } = $props();
</script>

<div class="tradeoff">
  <div class="tradeoff__axis">
    <span class="tradeoff__left">{left}</span>
    <svg class="tradeoff__cross" viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
      <line x1="0" y1="55" x2="55" y2="55" stroke="var(--vnp-ink)" stroke-width="2" />
      <line x1="5" y1="60" x2="5" y2="5" stroke="var(--vnp-ink)" stroke-width="2" />
      <line x1="12" y1="48" x2="30" y2="30" stroke="var(--vnp-bad)" stroke-width="2.5" />
      <line x1="18" y1="42" x2="44" y2="16" stroke="var(--vnp-good)" stroke-width="2.5" />
    </svg>
    <span class="tradeoff__right">{right}</span>
  </div>
  <div class="tradeoff__content">
    {@render children?.()}
  </div>
</div>

<style>
  .tradeoff {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
  }
  .tradeoff__axis {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tradeoff__left {
    color: var(--vnp-bad);
    font-weight: 700;
    font-size: 13px;
  }
  .tradeoff__right {
    color: var(--vnp-good);
    font-weight: 700;
    font-size: 13px;
  }
  .tradeoff__content {
    display: inline-flex;
    gap: 10px;
    align-items: center;
  }
</style>
