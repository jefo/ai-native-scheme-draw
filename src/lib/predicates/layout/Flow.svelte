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
  <span class="flow__note">flow →</span>
</div>

<style>
  .flow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1.5px dashed var(--vnp-ink-soft);
    border-radius: var(--vnp-radius);
    background: rgba(255, 255, 255, 0.5);
    position: relative;
  }
  .flow--col {
    flex-direction: column;
  }
  .flow :global(.relation) {
    margin: 0 -4px;
  }
  .flow__note {
    position: absolute;
    top: -9px;
    right: 8px;
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    background: var(--vnp-paper);
    padding: 0 4px;
  }
</style>
