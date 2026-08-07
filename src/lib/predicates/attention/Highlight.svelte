<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Highlight — акцент на объекте (свечение, обводка).
   *  Attention predicate (механики внимания): выделение содержимого на фоне остальных.
   *  Mint glow ring + raised background. */
  let { children, active = true }: { children?: Snippet; active?: boolean } = $props();
</script>

<div class="highlight" class:highlight--on={active}>
  <span class="highlight__label">highlight</span>
  <div class="highlight__stage">
    {@render children?.()}
  </div>
</div>

<style>
  .highlight {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .highlight__label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color 0.3s ease;
  }
  .highlight__stage {
    display: inline-flex;
    align-items: center;
    padding: 10px;
    border-radius: var(--vnp-radius);
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }
  .highlight--on .highlight__stage {
    border-color: var(--vnp-good);
    box-shadow: 0 0 0 2px var(--vnp-glow);
    background:
      linear-gradient(var(--vnp-zone-attention), var(--vnp-zone-attention)),
      var(--vnp-card);
  }
  .highlight--on .highlight__label {
    color: var(--vnp-good);
  }
</style>
