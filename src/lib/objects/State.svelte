<script lang="ts">
  import type { Snippet } from 'svelte';

  /** State — состояние сущности.
   *  Канал кодирования: МОДУЛЯЦИЯ (цвет, контур, заливка, размер, свечение).
   *  Унарен (арность 1) — модулирует 1 Entity. Оборачивает содержимое.
   *  Mint = activity/running (not "good"), Red = system error (not "wrong answer").
   *  Completed = absence of state (ghost). */
  let {
    state = 'ok',
    children,
  }: {
    state?: 'waiting' | 'broken' | 'growing' | 'completed' | 'wrong' | 'correct';
    children?: Snippet;
  } = $props();

  const stateMeta: Record<string, { cls: string; note: string }> = {
    waiting:  { cls: 's-waiting',   note: 'waiting' },
    broken:   { cls: 's-broken',    note: 'broken' },
    growing:  { cls: 's-growing',   note: 'active' },
    completed:{ cls: 's-completed', note: 'done' },
    wrong:    { cls: 's-wrong',     note: 'error' },
    correct:  { cls: 's-correct',   note: 'ok' },
  };
  const meta = $derived(stateMeta[state] ?? stateMeta.waiting);
</script>

<div class="state {meta.cls}" title="State: {meta.note}">
  <span class="state__chip">{meta.note}</span>
  <span class="state__target">
    {@render children?.()}
  </span>
</div>

<style>
  .state {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .state__chip {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: var(--vnp-radius-chip);
    border: 1px solid var(--vnp-border-color);
    color: var(--vnp-ink-soft);
    background: transparent;
    transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
  }
  .state__target {
    display: inline-flex;
  }

  /* waiting — muted, no colour */
  .s-waiting {
    color: var(--vnp-ink-soft);
  }
  .s-waiting :global(.entity) {
    border-color: var(--vnp-border-color);
    filter: grayscale(0.5);
  }

  /* broken — red, system error */
  .s-broken {
    color: var(--vnp-bad);
  }
  .s-broken :global(.entity) {
    border-color: var(--vnp-bad);
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
  }
  .s-broken .state__chip {
    border-color: rgba(239, 68, 68, 0.3);
    color: var(--vnp-bad);
    background: rgba(239, 68, 68, 0.08);
  }

  /* growing / active — mint */
  .s-growing {
    color: var(--vnp-good);
  }
  .s-growing :global(.entity) {
    border-color: var(--vnp-good);
  }
  .s-growing .state__chip {
    border-color: rgba(45, 212, 191, 0.25);
    color: var(--vnp-good);
    background: var(--vnp-glow-soft);
  }

  /* completed — ghost (absence of state) */
  .s-completed {
    color: var(--vnp-ink-soft);
  }
  .s-completed .state__chip {
    color: var(--vnp-ink-faint);
  }

  /* wrong — red, error */
  .s-wrong {
    color: var(--vnp-bad);
  }
  .s-wrong :global(.entity) {
    border-color: var(--vnp-bad);
    border-style: solid;
  }
  .s-wrong .state__chip {
    border-color: rgba(239, 68, 68, 0.3);
    color: var(--vnp-bad);
    background: rgba(239, 68, 68, 0.08);
  }

  /* correct — mint activity signal */
  .s-correct {
    color: var(--vnp-good);
  }
  .s-correct :global(.entity) {
    border-color: var(--vnp-good);
  }
  .s-correct .state__chip {
    border-color: rgba(45, 212, 191, 0.25);
    color: var(--vnp-good);
    background: var(--vnp-glow-soft);
  }
</style>
