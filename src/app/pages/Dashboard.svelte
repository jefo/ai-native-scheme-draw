<script lang="ts">
  import { router } from '../stores/router.svelte.ts';
  import { projectStore } from '../stores/project.svelte.ts';

  let newName = $state('');

  function create() {
    const name = newName.trim() || 'Untitled Project';
    const p = projectStore.createProject(name);
    newName = '';
    router.go('project', { id: p.id });
  }

  function openProject(id: string) {
    projectStore.selectProject(id);
    router.go('project', { id });
  }

  function deleteProject(id: string, e: Event) {
    e.stopPropagation();
    projectStore.deleteProject(id);
  }

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Blueprint Engine — Projects</title>
</svelte:head>

<div class="dash">
  <header class="dash__header">
    <div>
      <h1 class="dash__title">Blueprint Engine</h1>
      <p class="dash__sub">Craft visual explanations · TikTok / Shorts format (9:16)</p>
    </div>
    <nav class="dash__nav">
      <button class="nav-link" onclick={() => router.go('library')}>Library</button>
    </nav>
  </header>

  <main class="dash__body">
    <div class="dash__create">
      <input
        class="dash__input"
        type="text"
        placeholder="New project name…"
        bind:value={newName}
        onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && create()}
      />
      <button class="dash__btn dash__btn--primary" onclick={create}>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
        New Project
      </button>
    </div>

    {#if projectStore.projects.length === 0}
      <div class="dash__empty">
        <p>No projects yet. Create one to start crafting visual explanations.</p>
        <p class="dash__hint">Each project is a TikTok/Shorts video — a sequence of scenes, each scene a row of frames.</p>
      </div>
    {:else}
      <div class="dash__grid">
        {#each projectStore.projects as p}
          <article class="proj" onclick={() => openProject(p.id)} onkeydown={(e: KeyboardEvent) => e.key === 'Enter' && openProject(p.id)} tabindex="0">
            <div class="proj__preview">
              <span class="proj__scenes">{p.scenes.length} scenes</span>
              <span class="proj__frames">
                {p.scenes.reduce((sum, s) => sum + s.frames.length, 0)} frames
              </span>
            </div>
            <div class="proj__info">
              <strong class="proj__name">{p.name}</strong>
              <span class="proj__date">{formatDate(p.createdAt)}</span>
            </div>
            <button class="proj__del" onclick={(e: Event) => deleteProject(p.id, e)} title="Delete project">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
            </button>
          </article>
        {/each}
      </div>
    {/if}
  </main>
</div>

<style>
  .dash {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .dash__header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 24px 32px 16px;
    border-bottom: 1px solid var(--vnp-border-color);
    background: var(--vnp-paper-deep);
  }
  .dash__title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--vnp-ink);
  }
  .dash__sub {
    color: var(--vnp-ink-soft);
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    margin-top: 4px;
  }
  .dash__nav {
    display: flex;
    gap: 8px;
  }
  .nav-link {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-soft);
    background: none;
    border: 1px solid var(--vnp-border-color);
    border-radius: var(--vnp-radius-chip);
    padding: 4px 12px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transition: border-color 0.2s ease, color 0.2s ease;
  }
  .nav-link:hover {
    border-color: var(--vnp-good);
    color: var(--vnp-good);
  }

  .dash__body {
    flex: 1;
    padding: 32px;
  }
  .dash__create {
    display: flex;
    gap: 10px;
    margin-bottom: 32px;
  }
  .dash__input {
    flex: 1;
    max-width: 400px;
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    padding: 10px 14px;
    color: var(--vnp-ink);
    font-family: var(--vnp-font);
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s ease;
  }
  .dash__input:focus {
    border-color: var(--vnp-good);
  }
  .dash__input::placeholder {
    color: var(--vnp-ink-faint);
  }
  .dash__btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 18px;
    border-radius: var(--vnp-radius);
    font-family: var(--vnp-font);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
    border: var(--vnp-border);
    background: var(--vnp-card);
    color: var(--vnp-ink-soft);
  }
  .dash__btn--primary {
    background: rgba(45, 212, 191, 0.12);
    border-color: rgba(45, 212, 191, 0.2);
    color: var(--vnp-good);
  }
  .dash__btn--primary:hover {
    background: rgba(45, 212, 191, 0.18);
  }
  .dash__btn:hover {
    border-color: var(--vnp-border-color-active);
  }

  .dash__empty {
    padding: 48px 0;
    text-align: center;
    color: var(--vnp-ink-soft);
  }
  .dash__hint {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-ink-faint);
    margin-top: 8px;
  }

  .dash__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
  }
  .proj {
    position: relative;
    border: var(--vnp-border);
    border-radius: var(--vnp-radius);
    background: var(--vnp-card);
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease;
    overflow: hidden;
  }
  .proj:hover {
    border-color: var(--vnp-border-color-active);
    background: var(--vnp-card-raised);
  }
  .proj__preview {
    aspect-ratio: 9 / 16;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background:
      radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px),
      var(--vnp-paper);
    background-size: 24px 24px;
    padding: 24px;
  }
  .proj__scenes {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    color: var(--vnp-good);
  }
  .proj__frames {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
  }
  .proj__info {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-top: 1px solid var(--vnp-border-color);
  }
  .proj__name {
    font-size: 14px;
    font-weight: 600;
  }
  .proj__date {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-soft);
  }
  .proj__del {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--vnp-card);
    border: var(--vnp-border);
    border-radius: var(--vnp-radius-sm);
    color: var(--vnp-ink-soft);
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease, color 0.2s ease;
  }
  .proj:hover .proj__del {
    opacity: 1;
  }
  .proj__del:hover {
    color: var(--vnp-bad);
    border-color: rgba(239, 68, 68, 0.3);
  }
</style>
