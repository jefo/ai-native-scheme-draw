<script lang="ts">
  import { getRoadmapCtx } from '../roadmap-context';

  /** Веха — чекпоинт пути: mint-чип с ромбом (достижение).
   *  Регистрирует себя в реестре по name: Dependency ссылается на вехи
   *  по имени, а не по координатам («meaning before geometry»).
   *  Регистрируется центр чипа и его половина ширины — концы дуг
   *  ложатся у кромки чипа независимо от длины подписи. */
  let {
    name,
  }: {
    name: string;
  } = $props();

  const ctx = getRoadmapCtx();

  let node = $state<HTMLDivElement | null>(null);

  $effect(() => {
    const el = node;
    const track = ctx.trackEl;
    if (!el || !track) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const s = track.getBoundingClientRect();
      ctx.milestones[name] = {
        x: ((r.left + r.width / 2 - s.left) / Math.max(1, s.width)) * 100,
        y: ((r.top + r.height / 2 - s.top) / Math.max(1, s.height)) * 100,
        hw: r.width / 2,
      };
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      delete ctx.milestones[name];
    };
  });
</script>

<div class="rm-milestone" bind:this={node}>
  <span class="rm-milestone__diamond"></span>
  <span class="rm-milestone__label">{name}</span>
</div>

<style>
  .rm-milestone {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    min-width: 84px;
    min-height: 36px;
    border: 1px solid var(--canvas-sticky-green-border);
    border-radius: 8px;
    background: var(--canvas-sticky-green);
    box-shadow: var(--canvas-note-shadow),
      0 0 14px color-mix(in srgb, var(--canvas-sticky-green-border) 28%, transparent);
  }
  .rm-milestone__diamond {
    flex: 0 0 auto;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    border-radius: 2px;
    background: var(--vnp-good);
  }
  .rm-milestone__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
