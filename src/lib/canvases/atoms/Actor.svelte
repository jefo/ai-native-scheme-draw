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
    gap: 7px;
    border: 1px solid color-mix(in srgb, var(--canvas-ink-soft) 34%, transparent);
    border-radius: 8px;
    background: var(--canvas-panel-bg);
    padding: 4px 11px;
  }
  .uf-actor__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--vnp-info);
    flex: none;
  }
  .uf-actor__label {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    white-space: nowrap;
  }
</style>
