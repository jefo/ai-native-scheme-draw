<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Trade-off — противопоставление по осям: Noise ↑ / FPS ↑.
   *  Layout predicate (information design): два содержимых, растущих в разные стороны.
   *  Orthogonal axis cross — the blueprint aesthetic demands 90° junctions. */
  let { left = 'A ↑', right = 'B ↑', children }: { left?: string; right?: string; children?: Snippet } = $props();
</script>

<div class="tradeoff">
  <div class="tradeoff__axis">
    <span class="tradeoff__left">{left}</span>
    <svg class="tradeoff__cross" viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">
      <!-- horizontal axis -->
      <line x1="0" y1="55" x2="55" y2="55" stroke="var(--vnp-ink-soft)" stroke-width="1" stroke-dasharray="3 2" />
      <!-- vertical axis -->
      <line x1="5" y1="60" x2="5" y2="5" stroke="var(--vnp-ink-soft)" stroke-width="1" stroke-dasharray="3 2" />
      <!-- orthogonal routing: corner junction -->
      <polyline points="12,48 12,30 30,30"
        fill="none" stroke="var(--vnp-bad)" stroke-width="1.5" />
      <polyline points="18,42 18,16 44,16"
        fill="none" stroke="var(--vnp-good)" stroke-width="1.5" />
      <!-- junction dots -->
      <circle cx="30" cy="30" r="2" fill="var(--vnp-good)" />
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
    padding: 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .tradeoff:hover {
    background:
      linear-gradient(var(--vnp-zone-layout), var(--vnp-zone-layout)),
      var(--vnp-card);
    border-color: var(--vnp-zone-layout-border);
  }
  .tradeoff__axis {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .tradeoff__left {
    color: var(--vnp-bad);
    font-family: var(--vnp-font-mono);
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.02em;
  }
  .tradeoff__right {
    color: var(--vnp-good);
    font-family: var(--vnp-font-mono);
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.02em;
  }
  .tradeoff__content {
    display: inline-flex;
    gap: 10px;
    align-items: center;
  }
</style>
