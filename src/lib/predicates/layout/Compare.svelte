<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Compare — сопоставление A vs B.
   *  Layout predicate (information design): противопоставление двух содержимых. */
  let { children }: { children?: Snippet } = $props();
</script>

<div class="compare">
  <span class="compare__label">compare</span>
  <div class="compare__body">
    {@render children?.()}
  </div>
</div>

<style>
  .compare {
    display: inline-flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
  }
  .compare__label {
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    align-self: center;
  }
  .compare__body {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    padding: 10px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
  }
</style>
