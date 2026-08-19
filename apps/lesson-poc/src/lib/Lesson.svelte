<script lang="ts">
  // Оболочка урока: одна доска, линейный поток beats, сгруппированных по moves.
  // Move = граница мысли, beat = шаг подачи (контроль cognitive load).
  // Навигация двухуровневая: move-заголовки + beat-точки внутри.
  import type { Component } from 'svelte';
  import Board from './Board.svelte';

  export interface MoveDef {
    label: string;
    beats: { label: string; pause?: boolean }[];
  }

  interface Props {
    title: string;
    moves: MoveDef[];
    Scenario: Component<{ frame: number }>;
  }

  let { title, moves, Scenario }: Props = $props();

  let frame = $state(0);
  let totalBeats = $derived(moves.reduce((n, m) => n + m.beats.length, 0));

  function beatGlobal(mi: number, bi: number): number {
    let acc = 0;
    for (let k = 0; k < mi; k++) acc += moves[k].beats.length;
    return acc + bi;
  }
  function moveStart(mi: number): number {
    return beatGlobal(mi, 0);
  }

  function goTo(f: number) {
    frame = Math.max(0, Math.min(totalBeats - 1, f));
  }
  function next() {
    goTo(frame + 1);
  }
  function prev() {
    goTo(frame - 1);
  }
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  }
</script>

<svelte:window onkeydown={onKey} />

<div class="stage">
  <div class="stage__board">
    <Board>
      <Scenario {frame} />
    </Board>
  </div>

  <nav class="stage__nav" aria-label="moves и beats">
    <div class="nav">
      {#each moves as m, mi (mi)}
        <div class="move">
          <div
            class="move__label"
            class:move__label--active={frame >= moveStart(mi) && frame < moveStart(mi) + m.beats.length}
          >
            {mi + 1}. {m.label}
          </div>
          <div class="move__beats">
            {#each m.beats as b, bi (bi)}
              <button
                class="beat"
                class:beat--on={frame === beatGlobal(mi, bi)}
                class:beat--pause={b.pause}
                onclick={() => goTo(beatGlobal(mi, bi))}
                title={b.pause ? '⏸ ' + b.label : b.label}
                aria-label={b.label}
              ></button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </nav>
</div>

<style>
  .stage {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 12px;
    align-items: center;
  }

  .stage__board {
    grid-column: 1;
  }

  .stage__nav {
    grid-column: 2;
    display: flex;
    align-items: center;
  }

  .nav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 74vh;
    overflow-y: auto;
    padding-right: 4px;
  }

  .move__label {
    font-family: var(--bbg-font);
    font-size: 12px;
    font-weight: 600;
    color: var(--bbg-ink-soft);
    margin-bottom: 4px;
    transition: color 0.15s ease;
  }

  .move__label--active {
    color: var(--bbg-ink);
  }

  .move__beats {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .beat {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: var(--bbg-border-strong);
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .beat:hover {
    background: var(--bbg-ink-soft);
  }

  .beat--on {
    background: var(--bbg-amber);
    transform: scale(1.35);
  }

  .beat--pause {
    width: 14px;
    height: 4px;
    border-radius: 2px;
  }

  .beat--pause.beat--on {
    background: var(--bbg-amber);
    transform: scaleX(1.2);
  }
</style>
