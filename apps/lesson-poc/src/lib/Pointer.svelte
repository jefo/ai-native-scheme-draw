<script lang="ts">
  // Указка — подпись у объекта: точка на краю объекта → линия → подпись.
  // Показывает, что подпись относится именно к этому объекту.
  interface Props {
    text: string;
    /** куда вести линию от объекта */
    side?: 'right' | 'left' | 'up' | 'down';
    /** акцент — ключевой вопрос/вывод (янтарный), не рядовая подпись */
    accent?: boolean;
  }

  let { text, side = 'right', accent = false }: Props = $props();
</script>

<div class="pointer pointer--{side}" class:pointer--accent={accent}>
  <span class="pointer__dot" aria-hidden="true"></span>
  <span class="pointer__line" aria-hidden="true"></span>
  <span class="pointer__text">{text}</span>
</div>

<style>
  .pointer {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  /* right: точка слева (у объекта) → линия → текст вправо */
  .pointer--right {
    flex-direction: row;
  }
  /* left: текст → линия → точка справа (у объекта) */
  .pointer--left {
    flex-direction: row-reverse;
  }
  /* down: точка сверху (у объекта) → линия → текст вниз */
  .pointer--down {
    flex-direction: column;
  }
  /* up: текст → линия → точка снизу (у объекта) */
  .pointer--up {
    flex-direction: column-reverse;
  }

  .pointer__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--bbg-ink);
    flex-shrink: 0;
  }

  /* горизонтальная линия для right/left */
  .pointer--right .pointer__line,
  .pointer--left .pointer__line {
    width: 26px;
    height: 1.5px;
    background: var(--bbg-ink-soft);
  }

  /* вертикальная линия для up/down */
  .pointer--up .pointer__line,
  .pointer--down .pointer__line {
    width: 1.5px;
    height: 20px;
    background: var(--bbg-ink-soft);
  }

  .pointer__text {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 600;
    color: var(--bbg-ink);
  }

  .pointer--accent .pointer__dot {
    background: var(--bbg-amber);
  }
  .pointer--accent .pointer__line {
    background: var(--bbg-amber);
  }
  .pointer--accent .pointer__text {
    color: var(--bbg-amber);
    font-family: var(--bbg-font);
    font-size: 17px;
    font-weight: 600;
  }
</style>
