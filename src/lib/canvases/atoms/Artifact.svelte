<script lang="ts">
  import { getStoryCtx } from '../story-context';

  /** Связующая entity: что производится и трансформируется в стори.
   *  Повтор имени = тот же артефакт: канвас соединяет вхождения нитью
   *  (реестр имён в контексте — «Brief это entity в модели, не кусок UI»). */
  let {
    name,
  }: {
    name: string;
  } = $props();

  const ctx = getStoryCtx();

  let node = $state<HTMLDivElement | null>(null);
  /** Порядковый номер вхождения (−1 = ещё не зарегистрировано). */
  let index = $state(-1);

  $effect(() => {
    const el = node;
    const stage = ctx.stageEl;
    if (!el || !stage) return;

    const measure = () => {
      // Слот вхождения закрепляется при первом замере: сцена уже есть,
      // значит список вхождений настоящий (порядок = порядок в стори).
      if (index === -1) {
        index = (ctx.artifactPositions[name] ?? []).length;
      }
      const r = el.getBoundingClientRect();
      const s = stage.getBoundingClientRect();
      const list = ctx.artifactPositions[name] ?? [];
      list[index] = {
        name,
        index,
        x: ((r.left + r.width / 2 - s.left) / Math.max(1, s.width)) * 100,
        y: ((r.top + r.height / 2 - s.top) / Math.max(1, s.height)) * 100,
      };
      ctx.artifactPositions[name] = list;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      const list = ctx.artifactPositions[name];
      if (list) list[index] = undefined;
    };
  });
</script>

<div
  class="uf-step uf-artifact"
  class:uf-artifact--ref={index > 0}
  bind:this={node}
>
  <span class="uf-artifact__label">{index > 0 ? '↩ ' : ''}{name}</span>
</div>

<style>
  .uf-artifact {
    border: 1px solid var(--canvas-sticky-blue-border);
    border-radius: 8px;
    background: var(--canvas-sticky-blue);
    padding: 8px 14px;
    min-width: 64px;
    min-height: 34px;
    box-shadow:
      var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-blue-border) 28%, transparent);
  }
  .uf-artifact--ref {
    border-style: dashed;
    background: color-mix(in srgb, var(--canvas-sticky-blue-border) 9%, transparent);
    box-shadow: none;
  }
  .uf-artifact__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
