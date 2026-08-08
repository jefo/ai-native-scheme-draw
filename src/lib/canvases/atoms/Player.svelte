<script lang="ts">
  import { getPositioningCtx } from '../positioning-context';
  import type { MapValue, PlayerState } from '../types';

  /** Игрок на Positioning Map. Регистрирует себя в реестре канваса по name —
   *  Tension и Vector ссылаются на игроков по имени, а не по координатам.
   *  Регистр кита: стеклянный чип, состояние — кромка и маркер
   *  (акцент только на semantic state). */
  let {
    name,
    x,
    y,
    state = 'default',
  }: {
    name: string;
    x: MapValue;
    y: MapValue;
    state?: PlayerState;
  } = $props();

  const ctx = getPositioningCtx();

  const px = $derived(ctx.resolve(x));
  const py = $derived(ctx.resolve(y));

  $effect(() => {
    const point = { x: px, y: py };
    ctx.points[name] = point;
    return () => {
      if (ctx.points[name] === point) delete ctx.points[name];
    };
  });
</script>

<div
  class="player player--{state}"
  class:player--left={px > 80}
  style="left: {px}%; top: {py}%;"
>
  <span class="player__mark"></span>
  <span class="player__label">{name}{state === 'emerging' ? ' ↑' : ''}{state === 'unknown' ? ' ?' : ''}</span>
</div>

<style>
  .player {
    position: absolute;
    transform: translate(-50%, -50%);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    z-index: 2;
    cursor: default;
    padding: 4px 11px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
  }
  .player__mark {
    flex: 0 0 auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--canvas-ink);
  }
  .player__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
  .player--left .player__label {
    order: -1;
  }

  /* фокус — ключевой игрок («мы»): янтарная кромка, акцент на состояние */
  .player--focus {
    border-color: color-mix(in srgb, var(--canvas-highlight-ink) 70%, transparent);
  }
  .player--focus .player__mark {
    width: 10px;
    height: 10px;
    background: var(--canvas-highlight-ink);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--canvas-highlight-ink) 22%, transparent);
  }

  /* конкурент — розовая кромка, контурная точка */
  .player--competitor {
    border-color: color-mix(in srgb, var(--canvas-mark-cross) 55%, transparent);
  }
  .player--competitor .player__mark {
    background: transparent;
    border: 1.5px solid var(--canvas-mark-cross);
  }

  /* референс — квадратная точка отсчёта, нейтральная кромка */
  .player--reference .player__mark {
    background: transparent;
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
    width: 7px;
    height: 7px;
  }

  /* неизвестный — пунктирная кромка, ? */
  .player--unknown {
    border-style: dashed;
  }
  .player--unknown .player__mark {
    background: transparent;
    border: 1.5px dashed var(--canvas-ink-soft);
  }

  /* emerging — cyan-кромка, контур, стрелка входа ↑ */
  .player--emerging {
    border-color: color-mix(in srgb, var(--canvas-sticky-blue-border) 75%, transparent);
  }
  .player--emerging .player__mark {
    background: transparent;
    border: 1.5px solid var(--canvas-sticky-blue-border);
  }
</style>
