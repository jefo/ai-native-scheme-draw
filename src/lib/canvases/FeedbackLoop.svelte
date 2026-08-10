<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { FeedbackLoopDef } from './types';

  /** FeedbackLoop — control loop: как система корректирует отклонение.
   *
   *  Вопрос: «Как система исправляет отклонение?»
   *
   *  Узлы выстраиваются в цикл: первый — в начале, остальные по порядку.
   *  Последнее ребро замыкает цикл обратно к первому узлу — FEEDBACK ARC:
   *  amber-акцент (--canvas-highlight-ink, opacity 0.7), на нём аннотация
   *  «что стабилизирует петля».
   *
   *  Layout: flex-wrap-строка (U-форма или горизонтальная линия) —
   *  читается на любой ширине, без геометрии круга.
   *
   *  Dual API: data props (loop) или children slot. */

  let {
    loop = { nodes: [], edges: [], annotation: '' } as FeedbackLoopDef,
    children,
  }: {
    loop?: FeedbackLoopDef;
    children?: Snippet;
  } = $props();

  const edgeByPair = $derived(
    new Map(loop.edges.map(e => [`${e.from}→${e.to}`, e]))
  );

  function edgeLabel(from: string, to: string): string {
    return edgeByPair.get(`${from}→${to}`)?.label ?? '';
  }

  /** Подпись замыкающей дуги: label ребра last→first, иначе «feedback». */
  const feedbackLabel = $derived(
    loop.nodes.length > 0
      ? edgeLabel(loop.nodes[loop.nodes.length - 1].id, loop.nodes[0].id) || 'feedback'
      : ''
  );
</script>

<div class="fl">
  {#if children}
    {@render children()}
  {:else}
    {#if loop.nodes.length > 0}
      <div class="fl__loop">
        {#each loop.nodes as node, i (node.id)}
          <span class="fl__node">{node.label}</span>
          {#if i < loop.nodes.length - 1}
            {@const next = loop.nodes[i + 1]}
            {@const label = edgeLabel(node.id, next.id)}
            <span class="fl__edge">
              <span class="fl__arrow" aria-hidden="true">→</span>
              {#if label}
                <span class="fl__edge-label">{label}</span>
              {/if}
            </span>
          {/if}
        {/each}
      </div>
      <div class="fl__return">
        <span class="fl__return-arrow" aria-hidden="true">↑</span>
        <span class="fl__return-label">{feedbackLabel}</span>
      </div>
    {/if}
    {#if loop.annotation}
      <div class="fl__annotation">{loop.annotation}</div>
    {/if}
  {/if}
</div>

<style>
  .fl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── loop: flex-wrap-строка (U-форма / горизонтальная линия) ── */
  .fl__loop {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    min-width: 0;
  }

  /* ── node: нейтральный стеклянный чип ── */
  .fl__node {
    background: var(--canvas-panel-bg);
    border: 1px solid rgba(154, 160, 171, 0.34);
    border-radius: 8px;
    padding: 9px 16px;
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    color: var(--canvas-ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    flex: none;
  }

  /* ── edge: стрелка + подпись перехода ── */
  .fl__edge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    flex: none;
  }

  .fl__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 18px;
    line-height: 1;
    color: var(--canvas-ink-soft);
    opacity: 0.45;
  }

  .fl__edge-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* ── feedback arc: замыкание цикла — amber ── */
  .fl__return {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--canvas-highlight-ink);
    opacity: 0.7;
  }

  .fl__return-arrow {
    font-family: var(--vnp-font-mono);
    font-size: 18px;
    line-height: 1;
  }

  .fl__return-label {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
  }

  /* ── annotation: что стабилизирует петля ── */
  .fl__annotation {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: var(--canvas-ink-soft);
    text-align: center;
    max-width: 100%;
  }
</style>
