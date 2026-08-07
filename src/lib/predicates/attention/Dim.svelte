<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Dim — деэмфаза остального: содержимое приглушается.
   *  Attention predicate (механики внимания): всё, кроме фокуса, уходит в тень. */
  let { children, dimmed = true }: { children?: Snippet; dimmed?: boolean } = $props();
</script>

<div class="dim" class:dim--on={dimmed}>
  <span class="dim__label">dim</span>
  <div class="dim__stage">
    {@render children?.()}
  </div>
</div>

<style>
  .dim {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .dim__label {
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .dim__stage {
    display: inline-flex;
    align-items: center;
    padding: 10px;
    border-radius: var(--vnp-radius);
    transition: all 0.3s ease;
  }
  .dim--on .dim__stage {
    opacity: 0.35;
    filter: grayscale(0.8);
  }
</style>
