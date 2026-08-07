<script lang="ts">
  import Entity from '../objects/Entity.svelte';
  import State from '../objects/State.svelte';
  import Value from '../objects/Value.svelte';

  /** ModelCard — organism: ML model with version, accuracy, training status.
   *  Composes Entity + State + Value. Icon: 'model' (neural net). */
  let {
    name,
    version,
    accuracy,
    status = 'ready',
  }: {
    name: string;
    version?: string;
    accuracy?: number;
    status?: 'training' | 'ready' | 'deprecated';
  } = $props();

  const stateMap: Record<string, 'growing' | 'correct' | 'waiting'> = {
    training: 'growing',
    ready: 'correct',
    deprecated: 'waiting',
  };
  const s = $derived(stateMap[status] ?? 'waiting');
</script>

<div class="mc">
  <State state={s}>
    <Entity label={name} icon="model" />
  </State>
  <div class="mc__metrics">
    {#if version}
      <span class="mc__ver">v{version}</span>
    {/if}
    {#if accuracy != null}
      <Value label="acc" value={accuracy} unit="%" variant="bar" max={100} direction={accuracy > 90 ? 'up' : 'down'} />
    {/if}
  </div>
</div>

<style>
  .mc {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .mc__metrics {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .mc__ver {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-soft);
    letter-spacing: 0.04em;
    border: 1px solid var(--vnp-border-color);
    border-radius: var(--vnp-radius-chip);
    padding: 1px 8px;
  }
</style>
