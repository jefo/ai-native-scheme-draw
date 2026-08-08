import { getContext, setContext } from 'svelte';

/** Позиция вхождения артефакта в % сцены (центр чипа). */
export interface ArtifactPos {
  name: string;
  index: number;
  x: number;
  y: number;
}

/** Контекст Story: реестр артефактов + метрики сцены.
 *
 *  Артефакты регистрируют свои вхождения по имени (порядок = порядок
 *  в стори); Story читает реестр и соединяет повторные вхождения нитью —
 *  «meaning before geometry»: автор пишет имя, канвас решает геометрию. */
export interface StoryCtx {
  /** Элемент-сцена — для измерения позиций в %. */
  stageEl: HTMLDivElement | null;
  /** Аспект сцены (ширина/высота) — для углов нитей. */
  ratio: number;
  /** Реактивный реестр: имя → позиции вхождений (в порядке появления).
   *  Слот может стать undefined при размонтировании вхождения. */
  artifactPositions: Record<string, (ArtifactPos | undefined)[]>;
}

const KEY = Symbol('vnp-story');

export function setStoryCtx(ctx: StoryCtx): void {
  setContext(KEY, ctx);
}

export function getStoryCtx(): StoryCtx {
  return getContext<StoryCtx>(KEY);
}
