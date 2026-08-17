<script lang="ts">
  // Вторая редакция, сцена A — «The Order».
  // Приём 2 «предыстория как данность»: знакомый граф уже собран (split screen),
  // дальше — одно изменение (Service → REQUEST) и вопрос (Controller [?]).
  // Transition: каждый фрейм = одна delta на существующих узлах, граф не перерисовывается.
  //   f0: split screen — юзер [Оформить] → знакомый граф (всё DEFAULT)
  //   f1: событие — Service [REQUEST]
  //   f2: mystery — Controller [?]
  //   f3: PAUSE (prediction)
  import Board from '../../../lib/Board.svelte';
  import GraphNode from '../../../lib/GraphNode.svelte';
  import { Arrow, Actor } from 'sysdiag-ui-kit';

  let { frame }: { frame: number } = $props();
</script>

<Board
  title="The Order"
  rule={frame === 2 ? 'контроллер держит сервис — но сервис теперь каждый раз новый' : ''}
>
  <div class="scene">
    <!-- поверхность (split screen) — замирает после клика -->
    <div class="surface" class:surface--dim={frame >= 1}>
      <Actor role="user" label="юзер" mood="neutral" size="md" />
      <span class="surface__btn">[ Оформить ]</span>
    </div>

    <div class="bridge">
      <Arrow direction="right" tone="blue" label={frame === 0 ? 'request' : undefined} />
    </div>

    <!-- бекенд: вертикальный граф (persistent) -->
    <div class="graph">
      <GraphNode
        name="OrdersController"
        scope={frame >= 2 ? '?' : (frame === 0 ? 'DEFAULT' : undefined)}
        highlight={frame === 2}
      />

      <div class="edge">
        <Arrow direction="down" tone="blue" />
        {#if frame === 2}<span class="edge__hint">смотрит сюда</span>{/if}
      </div>

      <GraphNode
        name="OrdersService"
        scope={frame >= 1 ? 'REQUEST' : (frame === 0 ? 'DEFAULT' : undefined)}
        highlight={frame === 1}
      />

      <div class="edge">
        <Arrow direction="down" tone="blue" />
      </div>

      <GraphNode name="OrdersRepository" scope={frame === 0 ? 'DEFAULT' : undefined} />
    </div>
  </div>
</Board>

<style>
  .scene {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .surface {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: opacity 0.2s ease;
  }

  .surface--dim {
    opacity: 0.35;
  }

  .surface__btn {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-amber);
    border: 1px solid var(--bbg-amber-border);
    border-radius: 6px;
    padding: 4px 10px;
    white-space: nowrap;
  }

  .bridge {
    display: flex;
    align-items: center;
    width: 90px;
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
    min-height: 40px;
    justify-content: center;
  }

  .edge__hint {
    font-family: var(--bbg-font-mono);
    font-size: 11px;
    color: var(--bbg-amber);
    margin-top: 2px;
  }
</style>
