<script lang="ts">
  import FrameCard from './FrameCard.svelte';
  import type { Scene } from '../stores/project.svelte.ts';
  import { projectStore } from '../stores/project.svelte.ts';

  /** SceneRow — horizontal row of frames. No wrapping, horizontal scroll.
   *  A scene is a group of frames that tell one visual thought. */
  let {
    scene,
    projectId,
    onAddFrame,
    onDeleteScene,
  }: {
    scene: Scene;
    projectId: string;
    onAddFrame?: (sceneId: string) => void;
    onDeleteScene?: (sceneId: string) => void;
  } = $props();

  let newFrameName = $state('');
  let adding = $state(false);

  function addFrame() {
    const name = newFrameName.trim() || `Frame ${scene.frames.length + 1}`;
    if (onAddFrame) onAddFrame(scene.id);
    // Direct store mutation for quick feedback
    projectStore.addFrame(projectId, scene.id, name);
    newFrameName = '';
    adding = false;
  }
</script>

<div class="sr">
  <header class="sr__header">
    <div class="sr__info">
      <span class="sr__dot"></span>
      <h3 class="sr__name">{scene.name}</h3>
      <span class="sr__count">{scene.frames.length} frames</span>
    </div>
    <div class="sr__actions">
      <button class="sr__btn" onclick={() => (adding = !adding)} title="Add frame">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
        Frame
      </button>
      {#if onDeleteScene}
        <button class="sr__btn sr__btn--del" onclick={() => onDeleteScene(scene.id)} title="Delete scene">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
        </button>
      {/if}
    </div>
  </header>

  {#if adding}
    <div class="sr__addrow">
      <input
        class="sr__input"
        type="text"
        placeholder="Frame name…"
        bind:value={newFrameName}
        onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && addFrame()}
      />
      <button class="sr__btn sr__btn--go" onclick={addFrame}>Add</button>
      <button class="sr__btn" onclick={() => (adding = false)}>Cancel</button>
    </div>
  {/if}

  <div class="sr__track">
    {#if scene.frames.length === 0}
      <div class="sr__empty">
        <p>No frames yet. Add the first frame to start composing this scene.</p>
      </div>
    {:else}
      {#each scene.frames as frame, i}
        <FrameCard {frame} index={i} />
      {/each}
    {/if}
  </div>
</div>

<style>
  .sr {
    margin-bottom: 0;
    border-bottom: 1px solid var(--vnp-border-color);
    padding: 16px 0;
  }
  .sr__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 32px 8px;
    gap: 12px;
  }
  .sr__info {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sr__dot {
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: var(--vnp-good);
    box-shadow: 0 0 5px var(--vnp-glow);
    flex-shrink: 0;
  }
  .sr__name {
    font-size: 14px;
    font-weight: 600;
    color: var(--vnp-ink);
  }
  .sr__count {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
  }
  .sr__actions {
    display: flex;
    gap: 6px;
  }
  .sr__btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-soft);
    background: none;
    border: 1px solid var(--vnp-border-color);
    border-radius: var(--vnp-radius-chip);
    padding: 3px 10px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .sr__btn:hover {
    border-color: var(--vnp-border-color-active);
    color: var(--vnp-ink);
  }
  .sr__btn--go {
    border-color: rgba(45, 212, 191, 0.2);
    color: var(--vnp-good);
  }
  .sr__btn--del:hover {
    border-color: rgba(239, 68, 68, 0.3);
    color: var(--vnp-bad);
  }

  .sr__addrow {
    display: flex;
    gap: 8px;
    padding: 4px 32px 10px;
    align-items: center;
  }
  .sr__input {
    width: 200px;
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: var(--vnp-radius-sm);
    padding: 5px 10px;
    color: var(--vnp-ink);
    font-family: var(--vnp-font);
    font-size: 12px;
    outline: none;
  }
  .sr__input:focus {
    border-color: var(--vnp-good);
  }
  .sr__input::placeholder {
    color: var(--vnp-ink-faint);
  }

  .sr__track {
    display: flex;
    gap: 16px;
    padding: 8px 32px 8px;
    overflow-x: auto;
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: var(--vnp-border-color) transparent;
  }
  .sr__track::-webkit-scrollbar {
    height: 4px;
  }
  .sr__track::-webkit-scrollbar-track {
    background: transparent;
  }
  .sr__track::-webkit-scrollbar-thumb {
    background: var(--vnp-border-color);
    border-radius: 2px;
  }
  .sr__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 300px;
    height: 200px;
    border: 1px dashed var(--vnp-border-color);
    border-radius: var(--vnp-radius);
    color: var(--vnp-ink-faint);
    font-family: var(--vnp-font-mono);
    font-size: 10px;
  }
</style>
