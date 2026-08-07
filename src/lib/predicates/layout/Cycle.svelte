<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Cycle — замкнутая последовательность (петля).
   *  Layout predicate (information design): Research → Article → Feedback → Research.
   *  Orthogonal polygon ring, not an ellipse. */
  let { children }: { children?: Snippet } = $props();
</script>

<div class="cycle">
  <span class="cycle__label">cycle</span>
  <div class="cycle__ring">
    {@render children?.()}
  </div>
  <svg class="cycle__loop" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
    <rect x="4" y="4" width="32" height="32" rx="4"
      fill="none" stroke="var(--vnp-ink-soft)" stroke-width="1.5"
      stroke-dasharray="3 3" />
    <polygon points="20,4 16,8 24,8" fill="var(--vnp-ink-soft)" />
  </svg>
</div>

<style>
  .cycle {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px 12px 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    position: relative;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .cycle:hover {
    background:
      linear-gradient(var(--vnp-zone-layout), var(--vnp-zone-layout)),
      var(--vnp-card);
    border-color: var(--vnp-zone-layout-border);
  }
  .cycle__label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .cycle__ring {
    display: inline-flex;
    gap: 14px;
    align-items: center;
    padding: 6px 8px;
  }
  .cycle__loop {
    position: absolute;
    bottom: -20px;
  }
</style>
