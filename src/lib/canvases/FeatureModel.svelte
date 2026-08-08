<script lang="ts">
  import type { Snippet } from 'svelte';
  import FeatureNode from './atoms/FeatureNode.svelte';
  import type { FeatureTree } from './types';

  /**
   * Feature Model — организм: дерево фич продукта (FODA-нотация).
   *
   * Структура: компоненты (фичи), границы (группы), исключённое (✕).
   * Каноническая нотация: ● mandatory, ○ optional, ○ alternative (1 of N), ✕ excluded.
   *
   * Dual API:
   *   Data mode:  tree={[{ label: 'Core Grammar', kind: 'mandatory', children: [...] }]}
   *   Slots mode: children Snippet — композиция из атомов FeatureNode.
   *
   * В data mode для группы, где ВСЕ дети alternative, автоматически
   * ставится hint «1 of N» (XOR-группа).
   */
  let {
    root,
    tree = [],
    children,
  }: {
    root: string;
    tree?: FeatureTree[];
    children?: Snippet;
  } = $props();

  /** XOR-группа: все дети alternative → пометка «1 of N». */
  function groupHint(n: FeatureTree): string | undefined {
    if (n.children?.length && n.children.every(c => c.kind === 'alternative')) {
      return '1 of N';
    }
    return undefined;
  }
</script>

{#snippet branch(nodes: FeatureTree[])}
  {#each nodes as n}
    <FeatureNode label={n.label} kind={n.kind ?? 'mandatory'} hint={groupHint(n)}>
      {#if n.children?.length}
        {@render branch(n.children)}
      {/if}
    </FeatureNode>
  {/each}
{/snippet}

<div class="fm">
  <div class="fm__tree">
    <FeatureNode label={root} kind="mandatory" variant="root">
      {#if children}
        {@render children()}
      {:else}
        {@render branch(tree)}
      {/if}
    </FeatureNode>
  </div>

  <!-- ═══ Легенда (канон FODA) ═══ -->
  <div class="fm__legend">
    <span class="fm__legend-item">
      <span class="fm__dot fm__dot--mandatory"></span>mandatory
    </span>
    <span class="fm__legend-item">
      <span class="fm__dot fm__dot--optional"></span>optional
    </span>
    <span class="fm__legend-item">
      <span class="fm__dot fm__dot--alternative"></span>alternative
    </span>
    <span class="fm__legend-item">
      <span class="fm__dot fm__dot--excluded"></span>excluded
    </span>
  </div>
</div>

<style>
  .fm {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .fm__tree {
    flex: 1 1 auto;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 0;
    overflow: hidden;
  }

  .fm__legend {
    flex: 0 0 auto;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    border-top: var(--canvas-stroke);
    margin-top: 10px;
    padding-top: 10px;
  }
  .fm__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--canvas-ink-soft);
  }
  .fm__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .fm__dot--mandatory {
    background: var(--canvas-ink);
  }
  .fm__dot--optional {
    border: 1.5px solid var(--canvas-ink);
  }
  .fm__dot--alternative {
    border: 1.5px solid var(--vnp-warn);
  }
  .fm__dot--excluded {
    background: var(--vnp-bad);
  }
</style>
