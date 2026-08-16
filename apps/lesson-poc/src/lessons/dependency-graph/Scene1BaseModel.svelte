<script lang="ts">
  // Сцена 1 — «Базовая модель» (секции 1–3 сценария).
  // Hook: аномалия → чистый граф слева-направо → direction of resolution.
  // Frame map (совпадает с labels в index.ts):
  //   0 пусто · 1 OrdersService · 2 +Controller → · 3 +сосед · 4 PAUSE
  //   5 цепочка · 6 injects · 7 injects вторичен · 8 ①②③ · 9 маркеры убраны
  import Board from '../../lib/Board.svelte';
  import GraphNode from '../../lib/GraphNode.svelte';
  import { Arrow } from 'sysdiag-ui-kit';

  let { frame }: { frame: number } = $props();
</script>

<Board
  title="Dependency Graph"
  rule={frame === 8 ? 'resolution direction = направление dependency edge' : ''}
>
  <div class="chain">
    <!-- frame 1: только OrdersService -->
    {#if frame >= 1}
      <GraphNode name="OrdersService" highlight={frame === 1 || frame === 5} />
    {/if}

    <!-- frame 2+: Controller слева -->
    {#if frame >= 2}
      <div class="edge">
        <Arrow direction="right" tone="blue" label={frame === 6 ? 'injects' : undefined} />
        {#if frame === 8}<span class="marker">①</span>{/if}
      </div>
      <GraphNode name="Controller" />
    {/if}

    <!-- frame 3+: сосед справа (аномалия — остался обычным) -->
    {#if frame >= 3}
      <div class="edge">
        <Arrow direction="right" tone="blue" label={frame === 6 ? 'injects' : undefined} />
        {#if frame === 8}<span class="marker">②</span>{/if}
      </div>
      <GraphNode name="OrdersRepository" dim={frame === 3 || frame === 4} />
    {/if}

    {#if frame === 8}<span class="marker marker--end">③</span>{/if}
  </div>
</Board>

<style>
  .chain {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .edge {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 110px;
  }

  .marker {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 700;
    color: var(--bbg-amber);
    margin-top: 4px;
  }

  .marker--end {
    margin-top: 0;
  }
</style>
