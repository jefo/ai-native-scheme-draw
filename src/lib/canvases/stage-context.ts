import { getContext, setContext } from 'svelte';

/** Типы media-композиции Stage. */
export type StageAspect = '16:9' | '9:16' | 'auto';
export type StageDensity = 'compact' | 'editorial' | 'cinematic';
export type StageSafeArea = 'none' | 'shorts';
export type StageComposition = 'landscape' | 'portrait' | 'auto';

export interface StageCtx {
  aspect: StageAspect;
  density: StageDensity;
  /** composition-вариант: задаётся явно или выводится из aspect. */
  composition: StageComposition;
}

const KEY = Symbol('vnp-stage');

export function setStageCtx(ctx: StageCtx): void {
  setContext(KEY, ctx);
}

/** Контекст Stage для организмов: читается при выборе composition-варианта. */
export function getStageCtx(): StageCtx | undefined {
  return getContext<StageCtx>(KEY);
}
