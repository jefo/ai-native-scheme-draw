<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { DependencyNodeDef } from './types';

  /** DependencyGraph — грамматика «упорядочить prerequisites».
   *
   *  Вертикальная цепочка концептов сверху вниз: «что нужно понять
   *  до чего». Каждый узел — нейтральный стеклянный чип (как Phase);
   *  между узлами — стрелка вниз. Узел с requires получает янтарный
   *  левый бордер-акцент (зависимость) и лёгкий отступ.
   *
   *  Dual API: data (nodes) или слоты (дети = произвольная грамматика). */

  let {
    nodes = [] as DependencyNodeDef[],
    children,
  }: {
    nodes?: DependencyNodeDef[];
    children?: Snippet;
  } = $props();

  function hasRequires(node: DependencyNodeDef): boolean {
    return !!node.requires && node.requires.length > 0;
  }
</script>

<div class="dg">
  {#if children}
    {@render children()}
  {:else}
    {#each nodes as node, i (node.id)}
      <div
        class="dg__node"
        class:dg__node--dependency={hasRequires(node)}
        title={hasRequires(node) ? node.requires.join(', ') : undefined}
      >
        <span class="dg__node-label">{node.label}</span>
      </div>
      {#if i < nodes.length - 1}
        <span class="dg__arrow" aria-hidden="true">↓</span>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .dg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── node: neutral glass chip (Phase register) ── */
  .dg__node {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 9px 16px;
    min-width: 84px;
    min-height: 36px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .dg__node-label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }

  /* ── dependency accent: amber left border + slight indent ── */
  .dg__node--dependency {
    border-left: 3px solid var(--canvas-sticky-yellow-border);
    margin-left: 14px;
  }

  /* ── arrow down ── */
  .dg__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    line-height: 1;
    color: var(--canvas-ink-soft);
    padding: 7px 0;
    flex-shrink: 0;
  }
</style>
