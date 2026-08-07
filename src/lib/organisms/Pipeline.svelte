<script lang="ts">
  import Entity from '../objects/Entity.svelte';
  import Relation from '../objects/Relation.svelte';
  import State from '../objects/State.svelte';
  import Flow from '../predicates/layout/Flow.svelte';

  /** Pipeline — organism: CI/CD pipeline stages.
   *  Composes Flow + Entity + Relation + State. Status icons: pipeline | git-branch | deploy. */
  let {
    stages = [],
  }: {
    stages?: Array<{ name: string; status?: 'passing' | 'running' | 'failing' | 'waiting'; icon?: string }>;
  } = $props();

  const stateMap: Record<string, 'correct' | 'growing' | 'broken' | 'waiting'> = {
    passing: 'correct',
    running: 'growing',
    failing: 'broken',
    waiting: 'waiting',
  };
  const iconMap: Record<string, string> = {
    lint: 'logs',
    test: 'metrics',
    build: 'container',
    deploy: 'deploy',
    scan: 'lock',
  };
</script>

<div class="pipeline">
  <Flow>
    {#each stages as stage, i}
      <State state={stateMap[stage.status ?? 'waiting']}>
        <Entity label={stage.name} icon={stage.icon ?? iconMap[stage.name] ?? 'pipeline'} />
      </State>
      {#if i < stages.length - 1}
        <Relation variant="arrow" />
      {/if}
    {/each}
  </Flow>
</div>

<style>
  .pipeline {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
</style>
