<script lang="ts">
  // Доска = свободное полотно (как canvas). Никаких полос title/workspace/rule.
  // Сцена сама верстает элементы в свободных позициях — узел, выноска рядом,
  // вопрос рядом с объектом, к которому он относится.
  // Мы не рисуем — мы верстаем то, что нарисовано.
  import type { Snippet } from 'svelte';

  interface Props {
    children: Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="board">
  {@render children()}
</div>

<style>
  .board {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--bbg-bg);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    overflow: hidden;
  }
</style>
