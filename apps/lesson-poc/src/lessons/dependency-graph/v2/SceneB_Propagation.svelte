<script lang="ts">
  // Вторая редакция, сцена B — «Propagation: вверх — да, вниз — нет».
  // Продолжение той же тройки (persistent). Ловушка Repository.
  //   f0: reveal вверх — Controller тоже REQUEST + стрелка против зависимости
  //   f1: вопрос — Repository [?] (ловушка)
  //   f2: reveal вниз — Repository DEFAULT (вниз ничего)
  //   f3: асимметрия — стрелки ↑ consumer / ↓ dependency + мнемоника
  import Board from '../../../lib/Board.svelte';
  import GraphNode from '../../../lib/GraphNode.svelte';
  import { Arrow } from 'sysdiag-ui-kit';

  let { frame }: { frame: number } = $props();
</script>

<Board
  title="Propagation"
  rule={frame === 3 ? 'вверх — жизнь · вниз — ничего' : ''}
>
  <div class="scene">
    <div class="graph">
      <GraphNode
        name="OrdersController"
        scope={frame >= 0 ? 'REQUEST' : undefined}
        highlight={frame === 0}
      />

      <!-- стрелка scope вверх (против направления dependency) — только после reveal -->
      <div class="edge">
        <Arrow direction="down" tone="blue" />
        {#if frame >= 1}
          <div class="edge__scope-row">
            <span class="edge__scope-arrow">↑ consumer</span>
          </div>
        {/if}
      </div>

      <GraphNode name="OrdersService" scope="REQUEST" />

      <div class="edge">
        <Arrow direction="down" tone="blue" />
        {#if frame === 2 || frame === 3}
          <span class="edge__scope-arrow edge__scope-arrow--down">↓ dependency</span>
        {/if}
      </div>

      <GraphNode
        name="OrdersRepository"
        scope={frame >= 1 ? (frame >= 2 ? 'DEFAULT' : '?') : undefined}
        highlight={frame === 1}
        dim={frame === 3 ? false : undefined}
      />
    </div>
  </div>
</Board>

<style>
  .scene {
    display: flex;
    justify-content: center;
  }

  .graph {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .edge {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    gap: 2px;
  }

  .edge__scope-row {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .edge__scope-arrow {
    font-family: var(--bbg-font-mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--bbg-amber);
    letter-spacing: 0.04em;
  }

  .edge__scope-arrow--down {
    color: var(--bbg-ink-soft);
  }
</style>
