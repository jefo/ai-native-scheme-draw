<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { StateNodeDef, StateTransitionDef } from './types';

  /** StateMachine — операция мышления: увидеть изменение состояния.
   *
   *  Вопрос: «В каких состояниях может быть эта сущность? Что может произойти дальше?»
   *
   *  Состояния = нейтральные стеклянные чипы, переходы = стрелки с guard-подписями.
   *  Initial — зелёная кромка (вход), terminal — розовая кромка + приглушение (выход).
   *
   *  Порядок — топологический: от initial по переходам (DFS), недостижимые
   *  состояния рендерятся последними.
   *
   *  Dual API: data props (states + transitions) или children slot. */

  let {
    states = [] as StateNodeDef[],
    transitions = [] as StateTransitionDef[],
    children,
  }: {
    states?: StateNodeDef[];
    transitions?: StateTransitionDef[];
    children?: Snippet;
  } = $props();

  const stateById = $derived(
    new Map(states.map(s => [s.id, s]))
  );

  const transitionByPair = $derived(
    new Map(transitions.map(t => [`${t.from}→${t.to}`, t]))
  );

  /** Топологический порядок: initial → по переходам; недостижимые — в конце. */
  const order = $derived.by(() => {
    const ids = new Set(states.map(s => s.id));

    // рёбра только между существующими состояниями
    const outgoing = new Map<string, StateTransitionDef[]>();
    for (const t of transitions) {
      if (!ids.has(t.from) || !ids.has(t.to)) continue;
      const list = outgoing.get(t.from) ?? [];
      list.push(t);
      outgoing.set(t.from, list);
    }

    const visited = new Set<string>();
    const result: string[] = [];

    function visit(id: string): void {
      if (visited.has(id)) return;
      visited.add(id);
      result.push(id);
      for (const t of outgoing.get(id) ?? []) visit(t.to);
    }

    const initial = states.find(s => s.initial) ?? states[0];
    if (initial) visit(initial.id);

    // недостижимые из initial — последними, в порядке объявления
    for (const s of states) {
      if (!visited.has(s.id)) visit(s.id);
    }

    return result;
  });

  function transitionLabel(from: string, to: string): string | undefined {
    return transitionByPair.get(`${from}→${to}`)?.label;
  }
</script>

<div class="sm">
  {#if children}
    {@render children()}
  {:else if order.length > 0}
    {#each order as id, i (id)}
      {@const state = stateById.get(id)!}
      <span
        class="sm__state"
        class:sm__state--initial={state.initial}
        class:sm__state--terminal={state.terminal}
      >{state.label}</span>
      {#if i < order.length - 1}
        {@const label = transitionLabel(id, order[i + 1])}
        <span class="sm__transition">
          {#if label}
            <span class="sm__transition-label">{label}</span>
          {/if}
          <span class="sm__arrow" aria-hidden="true">→</span>
        </span>
      {/if}
    {/each}
  {/if}
</div>

<style>
  .sm {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── state chip: нейтральное стекло ── */
  .sm__state {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    padding: 9px 16px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    background: var(--canvas-panel-bg);
    white-space: nowrap;
    flex-shrink: 0;
  }

  /* terminal: розовая кромка выхода + приглушение */
  .sm__state--terminal {
    border: 2px solid var(--canvas-sticky-pink-border);
    opacity: 0.7;
  }

  /* initial: зелёная кромка входа (перекрывает terminal, если оба) */
  .sm__state--initial {
    border: 2px solid var(--canvas-sticky-green-border);
    opacity: 1;
  }

  /* ── transition: label над стрелкой ── */
  .sm__transition {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    flex-shrink: 0;
  }

  .sm__arrow {
    font-family: var(--vnp-font-mono);
    font-size: 16px;
    line-height: 1;
    color: var(--canvas-ink-soft);
    opacity: 0.5;
  }

  .sm__transition-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
  }
</style>
