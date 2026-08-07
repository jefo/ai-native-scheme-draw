<script lang="ts">
  import type { Snippet } from 'svelte';
  import Relation from '../../objects/Relation.svelte';

  /** Flow — последовательность A → B → C.
   *  Layout predicate (information design): задаёт линейный порядок содержимого.
   *  Применяется к содержимому (объектам или сценам) — семантику не меняет. */
  let { children, direction = 'row' }: { children?: Snippet; direction?: 'row' | 'col' } = $props();
</script>

<div class="flow flow--{direction}">
  {@render children?.()}
  <span class="flow__note">flow</span>
</div>

<style>
  .flow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    position: relative;
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .flow:hover {
    background:
      linear-gradient(var(--vnp-zone-layout), var(--vnp-zone-layout)),
      var(--vnp-card);
    border-color: var(--vnp-zone-layout-border);
  }
  .flow--col {
    flex-direction: column;
  }
  .flow :global(.relation) {
    margin: 0 -4px;
  }
  .flow__note {
    position: absolute;
    top: -7px;
    right: 8px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: var(--vnp-paper);
    padding: 0 4px;
  }
</style>
