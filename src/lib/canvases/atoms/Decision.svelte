<script lang="ts">
  /** Развилка: ромб-маркер + подпись решения. Кто решает — tag actor. */
  let {
    label,
    actor,
  }: {
    label: string;
    actor?: string;
  } = $props();
</script>

<div class="uf-step uf-decision">
  {#if actor}
    <span class="uf-decision__actor">{actor}</span>
  {/if}
  <span class="uf-decision__diamond"></span>
  <span class="uf-decision__label">{label}</span>
</div>

<style>
  .uf-decision {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
  }
  .uf-decision__actor {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    white-space: nowrap;
  }
  .uf-decision__diamond {
    width: 34px;
    height: 34px;
    transform: rotate(45deg);
    border: 1px solid var(--canvas-sticky-yellow-border);
    background: var(--canvas-sticky-yellow);
    border-radius: 3px;
  }
  .uf-decision__label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--canvas-highlight-ink);
    white-space: nowrap;
  }
</style>
