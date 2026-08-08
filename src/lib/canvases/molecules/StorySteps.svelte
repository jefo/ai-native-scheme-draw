<script lang="ts">
  // Внутренняя молекула: data-режим Story — рендерит union шагов,
  // рекурсивно спускаясь в system (System → StorySteps).
  import Actor from '../atoms/Actor.svelte';
  import Action from '../atoms/Action.svelte';
  import Artifact from '../atoms/Artifact.svelte';
  import System from '../atoms/System.svelte';
  import Handoff from '../atoms/Handoff.svelte';
  import Decision from '../atoms/Decision.svelte';
  import Outcome from '../atoms/Outcome.svelte';
  import StorySteps from './StorySteps.svelte';
  import type { StoryStepDef } from '../types';

  let {
    steps,
  }: {
    steps: StoryStepDef[];
  } = $props();
</script>

{#each steps as s}
  {#if s.kind === 'actor'}
    <Actor name={s.name} />
  {:else if s.kind === 'action'}
    <Action label={s.label} actor={s.actor} />
  {:else if s.kind === 'artifact'}
    <Artifact name={s.name} />
  {:else if s.kind === 'system'}
    <System label={s.label}>
      <StorySteps steps={s.steps} />
    </System>
  {:else if s.kind === 'handoff'}
    <Handoff from={s.from} to={s.to} artifact={s.artifact} />
  {:else if s.kind === 'decision'}
    <Decision label={s.label} actor={s.actor} />
  {:else}
    <Outcome label={s.label} />
  {/if}
{/each}
