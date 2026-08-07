<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Highlight — акцент на объекте (свечение, обводка).
   *  Attention predicate (механики внимания): выделение содержимого на фоне остальных. */
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
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .highlight__stage {
    display: inline-flex;
    align-items: center;
    padding: 10px;
    border-radius: var(--vnp-radius);
    transition: all 0.3s ease;
  }
  .highlight--on .highlight__stage {
    box-shadow: 0 0 0 3px var(--vnp-warn), 0 0 18px var(--vnp-glow);
    background: rgba(255, 255, 255, 0.9);
  }
</style>
