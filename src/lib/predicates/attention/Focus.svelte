<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Focus — приближение/фокус на объекте (System → GPU).
   *  Attention predicate (механики внимания): содержимое в центре, остальное уходит.
   *  Mint glow ring + subtle scale — the only "magic" effect in the system. */
  let { children, zoomed = true }: { children?: Snippet; zoomed?: boolean } = $props();
</script>

<div class="focus" class:focus--zoomed={zoomed}>
  <span class="focus__label">focus</span>
  <div class="focus__stage">
    <div class="focus__scale">
      {@render children?.()}
    </div>
  </div>
</div>

<style>
  .focus {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    position: relative;
  }
  .focus__label {
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .focus__stage {
    padding: 14px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    transition: all 0.3s ease;
  }
  .focus__scale {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.3s ease;
  }
  .focus--zoomed .focus__scale {
    transform: scale(1.08);
  }
  .focus--zoomed .focus__stage {
    border-color: var(--vnp-good);
    box-shadow: 0 0 0 3px var(--vnp-glow);
    background: var(--vnp-card);
  }
</style>
