<script lang="ts">
  import type { Snippet } from 'svelte';

  /** State — состояние сущности.
   *  Канал кодирования: МОДУЛЯЦИЯ (цвет, контур, заливка, размер, свечение).
   *  Унарен (арность 1) — модулирует 1 Entity. Оборачивает содержимое. */
  let {
    state = 'ok',
    children,
  }: {
    state?: 'waiting' | 'broken' | 'growing' | 'completed' | 'wrong' | 'correct';
    children?: Snippet;
  } = $props();

  const stateMeta: Record<string, { cls: string; note: string }> = {
    waiting: { cls: 's-waiting', note: 'waiting…' },
    broken: { cls: 's-broken', note: 'broken' },
    growing: { cls: 's-growing', note: 'growing ↑' },
    completed: { cls: 's-completed', note: 'done ✓' },
    wrong: { cls: 's-wrong', note: 'wrong ✗' },
    correct: { cls: 's-correct', note: 'correct ✓' },
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
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: 999px;
    border: 2px solid currentColor;
  }
  .state__target {
    display: inline-flex;
  }

  .s-waiting {
    color: var(--vnp-ink-soft);
  }
  .s-waiting :global(.entity) {
    border-color: var(--vnp-ink-faint);
    filter: grayscale(0.6);
  }

  .s-broken {
    color: var(--vnp-bad);
  }
  .s-broken :global(.entity) {
    border-color: var(--vnp-bad);
    box-shadow: 0 0 12px rgba(214, 69, 69, 0.35);
  }

  .s-growing {
    color: var(--vnp-info);
  }
  .s-growing :global(.entity) {
    border-color: var(--vnp-info);
  }

  .s-completed {
    color: var(--vnp-good);
  }
  .s-completed :global(.entity) {
    border-color: var(--vnp-good);
  }

  .s-wrong {
    color: var(--vnp-bad);
  }
  .s-wrong :global(.entity) {
    border-color: var(--vnp-bad);
    border-style: dashed;
  }

  .s-correct {
    color: var(--vnp-good);
  }
  .s-correct :global(.entity) {
    border-color: var(--vnp-good);
  }
</style>
