<script lang="ts">
  import Compare from '../predicates/layout/Compare.svelte';
  import ServiceNode from './ServiceNode.svelte';

  /** DeployDiff — organism: before/after deployment comparison.
   *  Composes Compare + two ServiceNodes. Shows canary vs stable or v1 vs v2. */
  let {
    beforeName,
    beforeHealth = 'healthy',
    beforeP99,
    afterName,
    afterHealth = 'healthy',
    afterP99,
    p99Unit = 'ms',
  }: {
    beforeName: string;
    beforeHealth?: 'healthy' | 'degraded' | 'down';
    beforeP99?: number;
    afterName: string;
    afterHealth?: 'healthy' | 'degraded' | 'down';
    afterP99?: number;
    p99Unit?: string;
  } = $props();
</script>

<div class="diff">
  <Compare>
    <ServiceNode name={beforeName} health={beforeHealth} p99={beforeP99} p99Unit={p99Unit} />
    <ServiceNode name={afterName} health={afterHealth} p99={afterP99} p99Unit={p99Unit} />
  </Compare>
</div>

<style>
  .diff {
    display: inline-flex;
  }
</style>
