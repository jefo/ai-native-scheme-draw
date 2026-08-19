<script lang="ts">
  // Строка-след экземпляра: «X → Y». Показывает, на какой экземпляр указывает источник.
  // Используется, чтобы показать «один на всех» (все → #1) или «каждому своё» (→ #1, → #2).
  import { Arrow } from 'sysdiag-ui-kit';

  interface Props {
    from: string;
    to: string;
    /** цель под вопросом — «?» (незаполненное состояние) */
    unknown?: boolean;
  }

  let { from, to, unknown = false }: Props = $props();
</script>

<div class="trace">
  <span class="trace__from">{from}</span>
  <div class="trace__arrow">
    <Arrow direction="right" tone="blue" />
  </div>
  <span class="trace__to" class:trace__to--unknown={unknown}>{to}</span>
</div>

<style>
  .trace {
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .trace__from {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    color: var(--bbg-ink-soft);
  }

  .trace__arrow {
    display: flex;
    align-items: center;
    width: 64px;
  }

  .trace__to {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 600;
    color: var(--bbg-ink);
  }

  .trace__to--unknown {
    color: var(--bbg-amber);
  }
</style>
