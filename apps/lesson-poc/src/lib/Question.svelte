<script lang="ts">
  // Ключевой вопрос, написанный на доске рядом с объектом, к которому относится.
  // Это не полоса внизу — это «мел на доске»: пишется там, где нужен.
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<div class="question">
  <span class="question__mark" aria-hidden="true">?</span>
  <span class="question__text">{text}</span>
</div>

<style>
  .question {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    white-space: nowrap;
  }

  .question__mark {
    font-family: var(--bbg-font-mono);
    font-size: 22px;
    font-weight: 700;
    color: var(--bbg-amber);
  }

  .question__text {
    font-family: var(--bbg-font);
    font-size: 20px;
    font-weight: 600;
    color: var(--bbg-ink);
  }
</style>
