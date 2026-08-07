<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Reveal — было скрыто → стало видно (Hidden Dependency).
   *  Attention predicate (механики внимания): прогрессивное раскрытие содержимого.
   *  Blur + opacity transition — content emerges from the void. */
  let { children, revealed = true }: { children?: Snippet; revealed?: boolean } = $props();
</script>

<div class="reveal" class:reveal--shown={revealed}>
  <span class="reveal__label">{revealed ? 'revealed' : 'hidden'}</span>
  <div class="reveal__stage">
    {@render children?.()}
  </div>
</div>

<style>
  .reveal {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .reveal__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    transition: color 0.3s ease;
  }
  .reveal__stage {
    display: inline-flex;
    align-items: center;
    padding: 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    transition: all 0.35s ease;
    filter: blur(6px);
    opacity: 0.3;
  }
  .reveal--shown .reveal__stage {
    filter: blur(0);
    opacity: 1;
    border-color: var(--vnp-border-color-active);
    background:
      linear-gradient(var(--vnp-zone-attention), var(--vnp-zone-attention)),
      var(--vnp-card);
  }
  .reveal--shown .reveal__label {
    color: var(--vnp-good);
  }
</style>
