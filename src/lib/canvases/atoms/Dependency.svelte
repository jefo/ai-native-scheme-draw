<script lang="ts">
  import { getRoadmapCtx } from '../roadmap-context';

  /** Причинная связь между вехами: пунктирная дуга с наконечником
   *  у целевой вехи. Точки связываются по имени, геометрию считает
   *  канвас по реестру (как Tension на карте): концы дуг ложатся
   *  у кромок чипов (половина ширины + зазор). */
  let {
    from,
    to,
  }: {
    from: string;
    to: string;
  } = $props();

  const ctx = getRoadmapCtx();

  /** Подъём дуги над прямой, px. */
  const BOW = 14;
  /** Зазор между кромкой чипа и концом дуги, px. */
  const MARGIN = 8;

  const arc = $derived.by(() => {
    const a = ctx.milestones[from];
    const b = ctx.milestones[to];
    if (!a || !b || !ctx.w || !ctx.h) return null;

    // Всё в px: viewBox = размер трека, единицы совпадают с экраном.
    const ax = (a.x / 100) * ctx.w + a.hw + MARGIN;
    const ay = (a.y / 100) * ctx.h;
    const bx = (b.x / 100) * ctx.w - b.hw - MARGIN;
    const by = (b.y / 100) * ctx.h;
    if (bx - ax < 4) return null;

    // Квадратичная кривая Q(начало, контрольная, конец); контрольная
    // точка поднята над прямой — касательная в конце = направление стрелки.
    const mx = (ax + bx) / 2;
    const my = Math.min(ay, by) - BOW;
    const angle = (Math.atan2(by - my, bx - mx) * 180) / Math.PI;

    return { ax, ay, bx, by, mx, my, angle };
  });
</script>

{#if arc}
  <svg class="rm-dependency" viewBox="0 0 {ctx.w} {ctx.h}">
    <path
      d="M {arc.ax} {arc.ay} Q {arc.mx} {arc.my} {arc.bx} {arc.by}"
      fill="none"
      class="rm-dependency__line"
    />
    <!-- наконечник: остриё в конце дуги, хвост назад от неё -->
    <polygon
      points="0,0 -11,4.5 0,9"
      transform="translate({arc.bx} {arc.by}) rotate({arc.angle})"
      class="rm-dependency__head"
    />
  </svg>
{/if}

<style>
  .rm-dependency {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    overflow: visible;
  }
  .rm-dependency__line {
    stroke: var(--vnp-info);
    stroke-width: 1.5;
    stroke-dasharray: 5 4;
  }
  .rm-dependency__head {
    fill: var(--vnp-info);
  }
</style>
