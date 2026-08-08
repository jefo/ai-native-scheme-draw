import { getContext, setContext } from 'svelte';

/** Контекст Roadmap: реестр вех + метрики трека.
 *
 *  Атом Milestone регистрирует свою позицию по name; Dependency читает
 *  реестр и рисует дугу между вехами. Автор связывает вехи по имени
 *  (`from="Canon" to="Render"`), геометрию решает канвас — «meaning
 *  before geometry» на уровне DSL. */
export interface RoadmapPoint {
  x: number;
  y: number;
  /** Половина ширины чипа вехи, px — концы дуг ложатся у его кромки. */
  hw: number;
}

export interface RoadmapCtx {
  /** Реактивный реестр: имя вехи → позиция чипа в % трека. */
  milestones: Record<string, RoadmapPoint>;
  /** Элемент трека — база для замера (как stageEl в Story). */
  trackEl: HTMLDivElement | null;
  /** Размер трека в px — для геометрии дуг (углы, стрелки). */
  w: number;
  h: number;
}

const KEY = Symbol('vnp-roadmap');

export function setRoadmapCtx(ctx: RoadmapCtx): void {
  setContext(KEY, ctx);
}

export function getRoadmapCtx(): RoadmapCtx {
  return getContext<RoadmapCtx>(KEY);
}
