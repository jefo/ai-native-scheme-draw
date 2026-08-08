<script lang="ts">
  /** Субъект стори — человек, роль или система. Открывает цепочку. */
  let {
    name,
  }: {
    name: string;
  } = $props();
</script>

<div class="uf-step uf-actor">
  <span class="uf-actor__dot"></span>
  <span class="uf-actor__label">{name}</span>
</div>

<style>
  .uf-actor {
    display: flex;
    align-items: center;
    gap: 8px;
    border: var(--canvas-stroke);
    border-radius: 6px;
    background: var(--canvas-panel-bg);
    padding: 8px 14px;
  }
  .uf-actor__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--vnp-info);
  }
  .uf-actor__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
