<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Cycle — замкнутая последовательность (петля).
   *  Layout predicate (information design): Research → Article → Feedback → Research. */
  let { children }: { children?: Snippet } = $props();
</script>

<div class="cycle">
  <span class="cycle__label">cycle ↻</span>
  <div class="cycle__ring">
    {@render children?.()}
  </div>
</div>

<style>
  .cycle {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.5);
    position: relative;
  }
  .cycle__label {
    position: absolute;
    top: 4px;
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .cycle__ring {
    display: inline-flex;
    gap: 18px;
    align-items: center;
    padding: 18px 10px 8px;
  }
</style>
