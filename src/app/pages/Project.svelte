<script lang="ts">
  import { router } from '../stores/router.svelte.ts';
  import { projectStore, type Project } from '../stores/project.svelte.ts';
  import SceneRow from '../components/SceneRow.svelte';

  let project = $derived(projectStore.activeProject);

  // If navigated directly with an id param, select the project
  let id = $derived(router.params.id);
  $effect(() => {
    if (id && projectStore.activeProject?.id !== id) {
      projectStore.selectProject(id);
    }
  });

  let newSceneName = $state('');
  let adding = $state(false);

  function addScene() {
    const name = newSceneName.trim() || `Scene ${(project?.scenes.length ?? 0) + 1}`;
    if (project) {
      projectStore.addScene(project.id, name);
    }
    newSceneName = '';
    adding = false;
  }

  function deleteScene(sceneId: string) {
    if (project) projectStore.deleteScene(project.id, sceneId);
  }

  function totalFrames(): number {
    return project?.scenes.reduce((sum, s) => sum + s.frames.length, 0) ?? 0;
  }
</script>

<svelte:head>
  <title>{project?.name ?? 'Project'} — Blueprint Engine</title>
</svelte:head>

<div class="proj">
  {#if !project}
    <div class="proj__missing">
      <p>Project not found.</p>
      <button class="proj__back" onclick={() => router.go('dashboard')}>Back to Dashboard</button>
    </div>
  {:else}
    <header class="proj__header">
      <div class="proj__top">
        <button class="proj__back" onclick={() => router.go('dashboard')}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="10,2 4,8 10,14"/></svg>
          Projects
        </button>
        <div class="proj__meta">
          <span class="proj__stat">{project.scenes.length} scenes</span>
          <span class="proj__stat">{totalFrames()} frames</span>
          <span class="proj__stat">9:16</span>
        </div>
      </div>
      <h1 class="proj__title">{project.name}</h1>
      <div class="proj__actions">
        <button class="proj__btn proj__btn--add" onclick={() => (adding = !adding)}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          New Scene
        </button>
      </div>
      {#if adding}
        <div class="proj__addrow">
          <input
            class="proj__input"
            type="text"
            placeholder="Scene name…"
            bind:value={newSceneName}
            onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && addScene()}
          />
          <button class="proj__btn proj__btn--go" onclick={addScene}>Create</button>
          <button class="proj__btn" onclick={() => (adding = false)}>Cancel</button>
        </div>
      {/if}
    </header>

    <main class="proj__canvas">
      {#if project.scenes.length === 0}
        <div class="proj__empty">
          <div class="proj__empty-inner">
            <p>No scenes yet.</p>
            <p class="proj__hint">
              A project is a TikTok/Shorts video —<br />
              scenes are groups of frames. Each scene is a row.<br />
              Frames are 9:16 visual thought units.
            </p>
            <button class="proj__btn proj__btn--add" onclick={() => (adding = true)}>
              Create First Scene
            </button>
          </div>
        </div>
      {:else}
        {#each project.scenes as scene}
          <SceneRow
            {scene}
            projectId={project.id}
            onDeleteScene={(sid: string) => deleteScene(sid)}
          />
        {/each}
      {/if}
    </main>
  {/if}
</div>

<style>
  .proj {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .proj__missing {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: var(--vnp-ink-soft);
  }
  .proj__header {
    padding: 20px 32px 0;
    border-bottom: 1px solid var(--vnp-border-color);
    background: var(--vnp-paper-deep);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .proj__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .proj__back {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-soft);
    background: none;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 0;
    transition: color 0.2s ease;
  }
  .proj__back:hover {
    color: var(--vnp-good);
  }
  .proj__meta {
    display: flex;
    gap: 12px;
  }
  .proj__stat {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .proj__title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 10px;
  }
  .proj__actions {
    display: flex;
    gap: 8px;
    padding-bottom: 14px;
  }
  .proj__addrow {
    display: flex;
    gap: 8px;
    padding-bottom: 14px;
    align-items: center;
  }
  .proj__input {
    width: 240px;
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: var(--vnp-radius-sm);
    padding: 6px 12px;
    color: var(--vnp-ink);
    font-family: var(--vnp-font);
    font-size: 13px;
    outline: none;
  }
  .proj__input:focus {
    border-color: var(--vnp-good);
  }
  .proj__input::placeholder {
    color: var(--vnp-ink-faint);
  }
  .proj__btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-soft);
    background: none;
    border: 1px solid var(--vnp-border-color);
    border-radius: var(--vnp-radius-chip);
    padding: 5px 12px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .proj__btn:hover {
    border-color: var(--vnp-border-color-active);
    color: var(--vnp-ink);
  }
  .proj__btn--add {
    border-color: rgba(45, 212, 191, 0.2);
    color: var(--vnp-good);
  }
  .proj__btn--add:hover {
    border-color: rgba(45, 212, 191, 0.35);
  }
  .proj__btn--go {
    border-color: rgba(45, 212, 191, 0.3);
    color: var(--vnp-good);
    background: rgba(45, 212, 191, 0.08);
  }

  .proj__canvas {
    flex: 1;
    padding-bottom: 48px;
  }
  .proj__empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
  .proj__empty-inner {
    text-align: center;
    color: var(--vnp-ink-soft);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .proj__hint {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-faint);
    line-height: 1.6;
  }
</style>
