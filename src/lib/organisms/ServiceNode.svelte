<script lang="ts">
  import Entity from '../objects/Entity.svelte';
  import State from '../objects/State.svelte';
  import Value from '../objects/Value.svelte';

  /** ServiceNode — organism: microservice with health + latency.
   *  Composes Entity + State + Value. Icons: 'server' | 'function' | 'gateway' | 'database'. */
  let {
    name,
    kind = 'api',
    health = 'healthy',
    p99,
    p99Unit = 'ms',
  }: {
    name: string;
    kind?: 'api' | 'worker' | 'gateway' | 'storage';
    health?: 'healthy' | 'degraded' | 'down';
    p99?: number;
    p99Unit?: string;
  } = $props();

  const iconMap: Record<string, string> = {
    api: 'server',
    worker: 'container',
    gateway: 'gateway',
    storage: 'database',
  };
  const stateMap: Record<string, 'correct' | 'growing' | 'broken'> = {
    healthy: 'correct',
    degraded: 'growing',
    down: 'broken',
  };
  const s = $derived(stateMap[health] ?? 'correct');
</script>

<div class="svc">
  <State state={s}>
    <Entity label={name} icon={iconMap[kind] ?? 'server'} />
  </State>
  {#if p99 != null}
    <Value label="p99" value={p99} unit={p99Unit} variant="bar" direction={p99 > 200 ? 'up' : 'down'} max={500} />
  {/if}
</div>

<style>
  .svc {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
</style>
