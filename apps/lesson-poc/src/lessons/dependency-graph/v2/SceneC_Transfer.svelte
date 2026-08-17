<script lang="ts">
  // Вторая редакция, сцена C — «Проверка на новом графе» (transfer problem).
  // Новая схема (не копия): OrderService с веткой Logger вверх и PricingService вниз.
  // Ученик сам предсказывает, кто станет request-scoped.
  //   f0: новый граф + вопрос «кто теперь request-scoped?»
  //   f1: reveal — Controller* и OrderService*
  import Board from '../../../lib/Board.svelte';
  import GraphNode from '../../../lib/GraphNode.svelte';
  import { Arrow } from 'sysdiag-ui-kit';

  let { frame }: { frame: number } = $props();
</script>

<Board
  title="Проверка: новый граф"
  rule={frame === 0 ? 'OrderService → REQUEST. Кто ещё?' : 'Controller — да · PricingService — нет'}
>
  <div class="scene">
    <div class="graph">
      <!-- ветка вверх: Logger -->
      <div class="branch">
        <GraphNode name="Logger" dim={frame === 1} />
      </div>

      <div class="edge"><Arrow direction="up" tone="blue" /></div>

      <GraphNode
        name="OrdersController"
        scope={frame === 1 ? 'REQUEST' : '?'}
        highlight={frame === 0}
      />

      <div class="edge"><Arrow direction="down" tone="blue" /></div>

      <GraphNode
        name="OrderService"
        scope="REQUEST"
        highlight={frame === 0}
      />

      <div class="edge"><Arrow direction="down" tone="blue" /></div>

      <GraphNode name="PricingService" scope={frame === 1 ? 'DEFAULT' : '?'} />

      <div class="edge"><Arrow direction="down" tone="blue" /></div>

      <GraphNode name="TaxRepository" scope={frame === 1 ? 'DEFAULT' : '?'} />
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

  .branch {
    display: flex;
    justify-content: center;
  }

  .edge {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
  }
</style>
