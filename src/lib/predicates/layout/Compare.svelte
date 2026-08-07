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
    font-family: var(--vnp-font-mono);
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
    padding: 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .compare__body:hover {
    background:
      linear-gradient(var(--vnp-zone-layout), var(--vnp-zone-layout)),
      var(--vnp-card);
    border-color: var(--vnp-zone-layout-border);
  }
</style>
