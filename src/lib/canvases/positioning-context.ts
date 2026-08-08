import { getContext, setContext } from 'svelte';

/** Контекст Positioning Map: реестр имён + метрики плота.
 *
 *  Атомы Player регистрируют свои координаты по имени; Tension и Vector
 *  читают реестр. Автор связывает точки по имени (`between={["Us","Miro"]}`),
 *  геометрию решает канвас — «meaning before geometry» на уровне DSL. */
export interface MapPoint {
  x: number;
  y: number;
}

export interface PositioningCtx {
  /** Реактивный реестр: имя → координаты в % плота. */
  points: Record<string, MapPoint>;
  /** Аспект плота (ширина/высота) — для углов линий. */
  ratio: number;
  /** MapValue → % (low=12, medium=50, high=88; число — как есть). */
  resolve: (v: number | string) => number;
}

const KEY = Symbol('vnp-positioning-map');

export function setPositioningCtx(ctx: PositioningCtx): void {
  setContext(KEY, ctx);
}

export function getPositioningCtx(): PositioningCtx {
  return getContext<PositioningCtx>(KEY);
}
