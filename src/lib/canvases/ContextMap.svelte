<script lang="ts">
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';
  import type { ContextBoxDef, ContextConnectionDef } from './types';

  /** ContextMap — bounded contexts: «какие границы у системы?»
   *
   *  DDD Context Map: контексты-панели (panel-bg секции) с сущностями-чипами
   *  внутри, связи между контекстами — подписи в промежутке между боксами.
   *  Геометрию решает канвас: координата чипа = середина между центрами
   *  двух боксов (по имени, как Player/Artifact — реестр имён).
   *
   *  Dual API: data props (contexts + connections) или children slot. */

  let {
    contexts = [] as ContextBoxDef[],
    connections = [] as ContextConnectionDef[],
    children,
  }: {
    contexts?: ContextBoxDef[];
    connections?: ContextConnectionDef[];
    children?: Snippet;
  } = $props();

  interface ChipPlacement {
    from: string;
    to: string;
    label: string;
    x: number; // % от wrappера
    y: number; // %
  }

  let mapEl = $state<HTMLDivElement>();
  const boxEls = new Map<string, HTMLDivElement>();
  let placements = $state<ChipPlacement[]>([]);

  function measure() {
    if (!mapEl) return;
    const rect = mapEl.getBoundingClientRect();
    const placed: ChipPlacement[] = [];
    for (const c of connections) {
      const a = boxEls.get(c.from);
      const b = boxEls.get(c.to);
      if (!a || !b) continue;
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const cx = (ra.left + ra.width / 2 + rb.left + rb.width / 2) / 2;
      const cy = (ra.top + ra.height / 2 + rb.top + rb.height / 2) / 2;
      placed.push({
        from: c.from,
        to: c.to,
        label: c.label,
        x: Math.min(96, Math.max(4, ((cx - rect.left) / rect.width) * 100)),
        y: Math.min(96, Math.max(4, ((cy - rect.top) / rect.height) * 100)),
      });
    }
    placements = placed;
  }

  function registerBox(el: Element, name: string) {
    boxEls.set(name, el as HTMLDivElement);
    return {
      destroy() {
        boxEls.delete(name);
      },
    };
  }

  onMount(() => {
    if (!mapEl || connections.length === 0) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(mapEl);
    return () => ro.disconnect();
  });

  $effect(() => {
    // Пересчитать позиции чипов, если состав данных изменился после монтирования.
    const n = contexts.length + connections.length;
    if (n > 0 && mapEl) measure();
  });
</script>

<div class="ctm">
  {#if children}
    {@render children()}
  {:else}
    <div class="ctm__map" bind:this={mapEl}>
      <div class="ctm__grid">
        {#each contexts as ctx (ctx.name)}
          <section class="ctm__box" use:registerBox={ctx.name}>
            <h3 class="ctm__box-name">{ctx.name}</h3>
            <div class="ctm__entities">
              {#each ctx.entities as entity (entity)}
                <span class="ctm__entity">{entity}</span>
              {/each}
            </div>
          </section>
        {/each}
      </div>

      {#if placements.length > 0}
        <div class="ctm__overlay" aria-hidden="true">
          {#each placements as p, i (i)}
            <span
              class="ctm__chip"
              style="left: {p.x}%; top: {p.y}%;"
              title={p.label}
            >{p.label}</span>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .ctm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 20px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* ── map: relative wrapper (чипы позиционируются поверх сетки) ── */
  .ctm__map {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-width: 0;
  }

  .ctm__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 14px;
    width: 100%;
    min-width: 0;
  }

  /* ── context box: panel-секция ── */
  .ctm__box {
    border: var(--canvas-stroke);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 12px 14px;
    min-width: 140px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ctm__box-name {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    text-align: center;
    padding-bottom: 6px;
    margin: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .ctm__entities {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
  }

  .ctm__entity {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--canvas-ink-soft);
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 24%, transparent);
    white-space: nowrap;
  }

  /* ── connection chip: подпись между боксами ── */
  .ctm__overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .ctm__chip {
    position: absolute;
    transform: translate(-50%, -50%);
    font-family: var(--vnp-font-mono);
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--canvas-ink-soft);
    padding: 2px 8px;
    border-radius: 3px;
    border: 1px solid color-mix(in srgb, var(--canvas-sticky-blue-border) 35%, transparent);
    background: var(--canvas-sticky-blue);
    white-space: nowrap;
    z-index: 2;
  }
</style>
