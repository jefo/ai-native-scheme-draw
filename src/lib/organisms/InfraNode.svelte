<script lang="ts">
  import Entity from '../objects/Entity.svelte';
  import Value from '../objects/Value.svelte';

  /** InfraNode — organism: infra component with typed icon + metric.
   *  Composes Entity + Value. Icons from the library, mapped by kind. */
  let {
    name,
    kind = 'db',
    metric,
    metricValue,
    metricUnit = '',
    metricMax = 100,
  }: {
    name: string;
    kind?: 'db' | 'cache' | 'queue' | 'lb' | 'cdn';
    metric?: string;
    metricValue?: number;
    metricUnit?: string;
    metricMax?: number;
  } = $props();

  const iconMap: Record<string, string> = {
    db: 'database',
    cache: 'cache',
    queue: 'queue',
    lb: 'load-balancer',
    cdn: 'cdn',
  };
</script>

<div class="infra">
  <Entity label={name} icon={iconMap[kind] ?? 'database'} />
  {#if metric && metricValue != null}
    <Value label={metric} value={metricValue} unit={metricUnit} variant="bar" max={metricMax} />
  {/if}
</div>

<style>
  .infra {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
</style>
