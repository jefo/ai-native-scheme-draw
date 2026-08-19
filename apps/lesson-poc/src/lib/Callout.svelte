<script lang="ts">
  // Выноска-подпись «анатомия»: точка на краю объекта → угловатая линия → надпись.
  // Как в hardware-инфографике. Верстается рядом с объектом, который поясняет.
  interface Props {
    text: string;
    /** куда вести линию: вправо (выноска справа от объекта) или влево */
    side?: 'right' | 'left';
    /** приглушить — не в фокусе сейчас */
    dim?: boolean;
  }

  let { text, side = 'right', dim = false }: Props = $props();
</script>

<div class="callout callout--{side}" class:callout--dim={dim}>
  <span class="callout__line" aria-hidden="true"></span>
  <span class="callout__dot" aria-hidden="true"></span>
  <span class="callout__text">{text}</span>
</div>

<style>
  .callout {
    display: flex;
    align-items: center;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  .callout--right {
    flex-direction: row;
  }
  .callout--left {
    flex-direction: row-reverse;
  }

  .callout--dim {
    opacity: var(--bbg-dim-opacity);
  }

  .callout__line {
    width: 22px;
    height: 1.5px;
    background: var(--bbg-ink-soft);
  }

  /* точка-утолщение на краю объекта */
  .callout__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--bbg-ink);
    flex-shrink: 0;
    margin-right: 6px;
  }

  .callout--left .callout__dot {
    margin-right: 0;
    margin-left: 6px;
  }

  .callout__text {
    font-family: var(--bbg-font);
    font-size: 15px;
    color: var(--bbg-ink-soft);
  }
</style>
