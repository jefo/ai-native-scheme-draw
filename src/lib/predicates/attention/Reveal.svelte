<script lang="ts">
  import type { Snippet } from 'svelte';

  /** Reveal — было скрыто → стало видно (Hidden Dependency).
   *  Attention predicate (механики внимания): прогрессивное раскрытие содержимого. */
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
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .reveal__stage {
    display: inline-flex;
    align-items: center;
    padding: 12px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
    transition: all 0.35s ease;
    filter: blur(4px);
    opacity: 0.45;
  }
  .reveal--shown .reveal__stage {
    filter: blur(0);
    opacity: 1;
    border-color: var(--vnp-ink);
  }
</style>
