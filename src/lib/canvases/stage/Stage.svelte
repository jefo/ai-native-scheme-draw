<script lang="ts">
  import type { Snippet } from 'svelte';
  import { setStageCtx } from '../stage-context';
  import type { StageAspect, StageComposition, StageDensity, StageSafeArea } from '../stage-context';

  /** Stage — медиа-контейнер композиции. Задаёт aspect, density, safe area
   *  и выводит composition-вариант (явный или из aspect).
   *
   *  Шкалы (--stage-gap-*, --stage-type-*) и safe zones (--stage-safe-*) —
   *  CSS custom properties: density-варианты масштабируют их, потомки
   *  наследуют. Организмы читают контекст для composition-вариантов. */
  let {
    aspect = '16:9',
    density = 'editorial',
    safeArea = 'none',
    composition,
    children,
  }: {
    aspect?: StageAspect;
    density?: StageDensity;
    safeArea?: StageSafeArea;
    composition?: StageComposition;
    children?: Snippet;
  } = $props();

  const resolved = $derived(composition ?? (aspect === '9:16' ? 'portrait' : 'landscape'));
  setStageCtx({ aspect, density, composition: resolved });

  const RATIO: Record<Exclude<StageAspect, 'auto'>, string> = {
    '16:9': '16 / 9',
    '9:16': '9 / 16',
  };
</script>

<div
  class="stage"
  data-density={density}
  data-safe={safeArea}
  data-composition={resolved}
  style={aspect === 'auto' ? undefined : `--stage-aspect: ${RATIO[aspect]};`}
>
  <div class="stage__content">
    {#if children}{@render children()}{/if}
  </div>
</div>

<style>
  .stage {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* срабатывает, когда родитель не задаёт высоту */
    aspect-ratio: var(--stage-aspect);
  }
  .stage__content {
    position: absolute;
    inset: 0;
  }
</style>
