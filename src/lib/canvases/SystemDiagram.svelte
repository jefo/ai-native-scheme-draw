<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';
  import type { SystemDiagramNodeDef, SystemDiagramEdgeDef, SystemDiagramRole } from './types';

  /** SystemDiagram — identity loop: Capability → Buyer → Product.
   *
   *  Три семантические роли, каждая → цвет чипа:
   *    capability = cyan (blue), buyer = amber (yellow), product = mint (green).
   *
   *  Focus — amber glow ring вокруг узла (обычно buyer — акцент на зрителе).
   *
   *  Dual API: data props (nodes + edges) или children slot. */

  let {
    nodes = [] as SystemDiagramNodeDef[],
    edges = [] as SystemDiagramEdgeDef[],
    focusNode = '' as string,
    showLegend = true,
    children,
  }: {
    nodes?: SystemDiagramNodeDef[];
    edges?: SystemDiagramEdgeDef[];
    focusNode?: string;
    showLegend?: boolean;
    children?: Snippet;
  } = $props();

  const edgeByPair = $derived(
    new Map(edges.map(e => [`${e.from}→${e.to}`, e]))
  );

  function edgeLabel(from: string, to: string): string {
    return edgeByPair.get(`${from}→${to}`)?.label ?? '';
  }

  function roleColor(role: SystemDiagramRole): 'blue' | 'yellow' | 'green' {
    return (
      { capability: 'blue', buyer: 'yellow', product: 'green' } as const
    )[role];
  }
</script>

<div class="sysd">
  {#if children}
    {@render children()}
  {:else}
    <div class="sysd__chain">
      {#each nodes as node, i (node.id)}
        <div
          class="sysd__node"
          class:sysd__node--focus={node.id === focusNode}
        >
          <StickyNote color={roleColor(node.role)} label={node.label} />
          <span class="sysd__node-role">{node.role}</span>
        </div>
        {#if i < nodes.length - 1}
          {@const next = nodes[i + 1]}
          {@const label = edgeLabel(node.id, next.id)}
          <div class="sysd__edge">
            <div class="sysd__edge-line" aria-hidden="true"></div>
            {#if label}
              <span class="sysd__edge-label">{label}</span>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
  {/if}

  {#if showLegend}
    <div class="sysd__legend">
      <span class="sysd__legend-item">
        <span class="sysd__legend-chip sysd__legend-chip--blue"></span>capability
      </span>
      <span class="sysd__legend-item">
        <span class="sysd__legend-chip sysd__legend-chip--yellow"></span>buyer
      </span>
      <span class="sysd__legend-item">
        <span class="sysd__legend-chip sysd__legend-chip--green"></span>product
      </span>
      <span class="sysd__legend-item">
        <span class="sysd__legend-chip sysd__legend-chip--focus"></span>focus
      </span>
    </div>
  {/if}
</div>

<style>
  .sysd {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--stage-gap-md);
    padding: 10px 12px;
    width: 100%;
    height: 100%;
    min-width: 0;
    box-sizing: border-box;
  }

  /* ── chain: horizon flex + centred ── */
  .sysd__chain {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  /* ── node wrapper ── */
  .sysd__node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    position: relative;
    flex-shrink: 0;
  }

  /* focus ring — amber glow outside the chip */
  .sysd__node--focus::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 13px;
    border: 2px solid rgba(251, 191, 36, 0.50);
    box-shadow: 0 0 14px rgba(251, 191, 36, 0.35);
    pointer-events: none;
  }
  .sysd__node--focus {
    z-index: 1;
  }

  .sysd__node-role {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
  }

  /* ── edge: line + label between chips ── */
  .sysd__edge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 64px;
    padding: 0 8px;
    flex-shrink: 0;
  }

  .sysd__edge-line {
    width: 100%;
    height: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
    position: relative;
  }
  /* arrowhead (→) at right end */
  .sysd__edge-line::after {
    content: '';
    position: absolute;
    right: -2px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid rgba(255, 255, 255, 0.22);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }

  .sysd__edge-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    text-align: center;
  }

  /* ── legend ── */
  .sysd__legend {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    padding-top: var(--stage-gap-sm);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
  }
  .sysd__legend-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }
  .sysd__legend-chip {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    flex: none;
  }
  .sysd__legend-chip--blue  { background: var(--canvas-sticky-blue-border);  }
  .sysd__legend-chip--yellow{ background: var(--canvas-sticky-yellow-border); }
  .sysd__legend-chip--green { background: var(--canvas-sticky-green-border);  }
  .sysd__legend-chip--focus {
    border: 2px solid rgba(251, 191, 36, 0.55);
    box-shadow: 0 0 4px rgba(251, 191, 36, 0.30);
    background: transparent;
  }
</style>
