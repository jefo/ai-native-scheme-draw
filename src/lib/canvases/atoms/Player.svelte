<script lang="ts">
  import { getPositioningCtx } from '../positioning-context';
  import type { MapValue, PlayerState } from '../types';

  /** Игрок на Positioning Map. Регистрирует себя в реестре канваса по name —
   *  Tension и Vector ссылаются на игроков по имени, а не по координатам. */
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
    gap: 5px;
    z-index: 2;
    cursor: default;
  }
  .player__mark {
    flex: 0 0 auto;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--canvas-ink);
  }
  .player__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    transition: color 0.1s ease;
  }
  .player:hover .player__label {
    color: var(--canvas-ink);
  }
  .player--left .player__label {
    order: -1;
  }

  /* фокус — ключевой игрок («мы»): акцент только на semantic state */
  .player--focus .player__mark {
    width: 10px;
    height: 10px;
    background: var(--canvas-highlight-ink);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--canvas-highlight-ink) 22%, transparent);
  }
  .player--focus .player__label {
    color: var(--canvas-highlight-ink);
    font-weight: 700;
  }

  /* конкурент — контур, приглушённый */
  .player--competitor .player__mark {
    background: transparent;
    border: 1.5px solid var(--canvas-ink-soft);
  }
  .player--competitor .player__label {
    color: var(--vnp-ink-faint);
  }

  /* референс — квадратный маркер-точка отсчёта */
  .player--reference .player__mark {
    background: transparent;
    border: 1px solid var(--canvas-ink-soft);
    border-radius: 2px;
    width: 7px;
    height: 7px;
  }
  .player--reference .player__label {
    color: var(--vnp-ink-faint);
  }

  /* неизвестный — пунктирный контур + ? */
  .player--unknown .player__mark {
    background: transparent;
    border: 1.5px dashed var(--canvas-ink-soft);
  }
  .player--unknown .player__label {
    color: var(--vnp-ink-faint);
  }

  /* emerging — контур, стрелка входа ↑ */
  .player--emerging .player__mark {
    background: transparent;
    border: 1.5px solid var(--canvas-ink-soft);
  }
</style>
