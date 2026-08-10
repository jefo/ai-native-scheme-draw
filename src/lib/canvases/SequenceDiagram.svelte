<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { SequenceParticipantDef, SequenceMessageDef } from './types';

  /** SequenceDiagram — «who does what, and when?»
   *
   *  Когнитивная операция: Sequence + Interact — увидеть временной порядок
   *  и участников. UML sequence diagram на регистре канвасов: участники —
   *  mono-чипы сверху, линии жизни — пунктирные вертикали, сообщения —
   *  горизонтальные стрелки между линиями жизни, время течёт сверху вниз.
   *
   *  Геометрию решает канвас: сообщение указывает участников по id,
   *  канвас вычисляет grid-column между их колонками и подрезает стрелку
   *  ровно до линий жизни (margin = 50% / span, точный инсет в 1fr-сетке).
   *  Return-сообщения (isReturn) — пунктир со стрелкой-шевроном.
   *
   *  Dual API: data props (participants + messages) или children slot. */

  let {
    participants = [] as SequenceParticipantDef[],
    messages = [] as SequenceMessageDef[],
    children,
  }: {
    participants?: SequenceParticipantDef[];
    messages?: SequenceMessageDef[];
    children?: Snippet;
  } = $props();

  const N = $derived(participants.length);
  const cols = $derived(`repeat(${N}, 1fr)`);

  /** Индекс колонки участника по id (-1, если не найден). */
  function colOf(id: string): number {
    return participants.findIndex((p) => p.id === id);
  }

  /** Геометрия сообщения: span колонок между участниками + инсет стрелки.
   *  Возвращает null, если участник не найден — канвас отрисует
   *  читаемый текстовый фолбэк вместо сломанной геометрии. */
  function spanFor(m: SequenceMessageDef) {
    const f = colOf(m.from);
    const t = colOf(m.to);
    if (f === -1 || t === -1) return null;
    const lo = Math.min(f, t);
    const hi = Math.max(f, t);
    const count = hi - lo + 1;
    return {
      // Линии 1..N+1: колонки lo..hi включительно.
      col: `${lo + 1} / ${hi + 2}`,
      // Инсет на полколонки с каждой стороны: стрелка начинается/кончается
      // ровно на линиях жизни (точная арифметика 1fr без gap).
      margin: f === t ? '0 0 0 50%' : `0 calc(50% / ${count})`,
      rev: t < f,
      self: f === t,
    };
  }
</script>

<div class="sq">
  {#if children}
    {@render children()}
  {:else}
    <div class="sq__headers" style="grid-template-columns: {cols}">
      {#each participants as p, i (p.id)}
        <div class="sq__header" style="grid-column: {i + 1}">
          <span class="sq__chip" title={p.label}>{p.label}</span>
        </div>
      {/each}
    </div>

    <div class="sq__area">
      <!-- линии жизни: абсолютный слой под сообщениями, та же сетка колонок -->
      <div class="sq__lifelines" style="grid-template-columns: {cols}" aria-hidden="true">
        {#each participants as p, i (p.id)}
          <div class="sq__lifeline" style="grid-column: {i + 1}">
            <span class="sq__lifeline-bar"></span>
          </div>
        {/each}
      </div>

      <div class="sq__messages" style="grid-template-columns: {cols}">
        {#each messages as m, i (i)}
          {@const s = spanFor(m)}
          {#if s}
            <div class="sq__message" style="grid-column: {s.col}">
              <span class="sq__msg-label" title={m.label}>{m.label}</span>
              <div
                class="sq__msg-line{s.rev ? ' sq__msg-line--rev' : ''}{s.self
                  ? ' sq__msg-line--self'
                  : ''}{m.isReturn ? ' sq__msg-line--return' : ''}"
                style="margin: {s.margin}"
              >
                <span class="sq__msg-bar"></span>
                <span class="sq__msg-arrow"></span>
              </div>
            </div>
          {:else}
            <div class="sq__msg-fallback">
              <span class="sq__msg-fallback-from">{m.from}</span>
              <span class="sq__msg-fallback-arrow">→</span>
              <span class="sq__msg-fallback-to">{m.to}</span>
              <span class="sq__msg-fallback-label">{m.label}</span>
            </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .sq {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 14px 18px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  /* ── header: чипы участников, по одному на колонку ── */
  .sq__headers {
    display: grid;
    flex: none;
  }

  .sq__header {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .sq__chip {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    padding: 6px 12px;
    border-radius: 6px;
    background: var(--canvas-panel-bg);
    border: var(--canvas-stroke);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ── area: линии жизни под сеткой сообщений ── */
  .sq__area {
    position: relative;
    flex: 1 0 auto;
    min-height: 0;
  }

  .sq__lifelines {
    position: absolute;
    inset: 0;
    display: grid;
    z-index: 0;
  }

  .sq__lifeline {
    display: flex;
    justify-content: center;
    min-width: 0;
  }

  .sq__lifeline-bar {
    width: 1px;
    height: 100%;
    border-left: 1px dashed color-mix(in srgb, var(--canvas-ink-soft) 20%, transparent);
  }

  /* ── messages: ряд на сообщение, стрелка между линиями жизни ── */
  .sq__messages {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 14px 0;
    padding-top: 6px;
  }

  .sq__message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 0;
  }

  .sq__msg-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    line-height: 1;
  }

  /* стрелка: bar (линия) + arrowhead; align-self: stretch + inline margin
     = инсет ровно до линий жизни (stretch вычитает margin из ширины) */
  .sq__msg-line {
    display: flex;
    align-items: center;
    align-self: stretch;
    min-width: 0;
  }

  .sq__msg-line--rev {
    flex-direction: row-reverse;
  }

  .sq__msg-bar {
    flex: 1;
    min-width: 0;
    height: 0;
    border-top: 1.5px solid var(--vnp-info);
  }

  .sq__msg-arrow {
    flex: none;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 6px solid var(--vnp-info);
  }

  /* сообщение в обратную сторону: стрелка смотрит влево */
  .sq__msg-line--rev .sq__msg-arrow {
    border-left: none;
    border-right: 6px solid var(--vnp-info);
  }

  /* return: пунктир 1px ink-soft + открытая стрелка-шеврон */
  .sq__msg-line--return .sq__msg-bar {
    border-top: 1px dashed color-mix(in srgb, var(--canvas-ink-soft) 50%, transparent);
  }

  .sq__msg-line--return .sq__msg-arrow {
    width: 6px;
    height: 6px;
    border: none;
    border-top: 1.5px solid color-mix(in srgb, var(--canvas-ink-soft) 50%, transparent);
    border-right: 1.5px solid color-mix(in srgb, var(--canvas-ink-soft) 50%, transparent);
    transform: rotate(45deg);
    margin-right: -1px;
  }

  .sq__msg-line--return.sq__msg-line--rev .sq__msg-arrow {
    border-top: 1.5px solid color-mix(in srgb, var(--canvas-ink-soft) 50%, transparent);
    border-left: 1.5px solid color-mix(in srgb, var(--canvas-ink-soft) 50%, transparent);
    border-right: none;
    transform: rotate(-45deg);
    margin-right: 0;
    margin-left: -1px;
  }

  /* self-сообщение: короткий выступ в правой половине колонки */
  .sq__msg-line--self {
    min-width: 0;
  }

  /* ── fallback: участник не найден — читаемая текстовая строка ── */
  .sq__msg-fallback {
    display: flex;
    align-items: center;
    gap: 6px;
    width: fit-content;
    padding: 3px 8px;
    border-radius: 4px;
    border: 1px dashed color-mix(in srgb, var(--canvas-ink-soft) 35%, transparent);
    background: var(--canvas-panel-bg);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
    min-width: 0;
  }

  .sq__msg-fallback-arrow {
    color: var(--vnp-info);
  }

  .sq__msg-fallback-label {
    opacity: 0.75;
  }
</style>
