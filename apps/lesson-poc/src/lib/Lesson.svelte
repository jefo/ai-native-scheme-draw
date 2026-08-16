<script lang="ts">
  // Оболочка урока: Lesson → Scene → Frame.
  // Сцены = горизонтальный таймлайн, фреймы внутри сцены = вертикальный.
  // Оба таймлайна пока рисуем точками (пагинация). Никакого IR —
  // просто два счётчика и условный рендер по frame внутри сцены.
  import type { Component } from 'svelte';

  export interface FrameDef {
    /** что происходит в этом фрейме (подсказка в тултипе точки) */
    label?: string;
    /** prediction pause — temporal cue, НЕ меняет визуальное состояние */
    pause?: boolean;
  }

  export interface SceneDef {
    id: string;
    title: string;
    /** компонент сцены получает текущий frame и рендерит условно */
    component: Component<{ frame: number }>;
    frames: FrameDef[];
  }

  interface Props {
    title: string;
    scenes: SceneDef[];
  }

  let { title, scenes }: Props = $props();

  let sceneIndex = $state(0);
  let frameIndex = $state(0);

  let scene = $derived(scenes[sceneIndex]);
  let frameCount = $derived(scene.frames.length);

  function goTo(s: number, f = 0) {
    sceneIndex = Math.max(0, Math.min(scenes.length - 1, s));
    frameIndex = Math.max(0, Math.min(scenes[sceneIndex].frames.length - 1, f));
  }

  function next() {
    if (frameIndex < frameCount - 1) frameIndex++;
    else if (sceneIndex < scenes.length - 1) goTo(sceneIndex + 1, 0);
  }

  function prev() {
    if (frameIndex > 0) frameIndex--;
    else if (sceneIndex > 0) goTo(sceneIndex - 1, scenes[sceneIndex - 1].frames.length - 1);
  }

  function nextScene() {
    goTo(sceneIndex + 1, 0);
  }

  function prevScene() {
    goTo(sceneIndex - 1, 0);
  }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextScene();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      prevScene();
    }
  }
</script>

<svelte:window onkeydown={onKey} />

<div class="stage">
  <div class="stage__board">
    <scene.component frame={frameIndex} />
  </div>

  <!-- горизонтальный таймлайн сцен -->
  <nav class="stage__scenes" aria-label="сцены">
    {#each scenes as s, i (s.id)}
      <button
        class="scene-dot"
        class:scene-dot--on={i === sceneIndex}
        onclick={() => goTo(i, 0)}
        title={s.title}
        aria-label={`Сцена ${i + 1}: ${s.title}`}
      >
        <span class="scene-dot__title">{s.title}</span>
      </button>
    {/each}
  </nav>

  <!-- вертикальный таймлайн фреймов -->
  <nav class="stage__frames" aria-label="фреймы">
    <div class="stage__frames-title">{scene.title}</div>
    <div class="frame-dots">
      {#each scene.frames as f, i (i)}
        <button
          class="frame-dot"
          class:frame-dot--on={i === frameIndex}
          class:frame-dot--pause={f.pause}
          onclick={() => goTo(sceneIndex, i)}
          title={f.pause ? '⏸ ' + (f.label ?? 'пауза') : f.label ?? `фрейм ${i + 1}`}
          aria-label={`фрейм ${i + 1}`}
        ></button>
      {/each}
    </div>
    <div class="stage__frame-label">
      {scene.frames[frameIndex].pause ? '⏸ ' : ''}{scene.frames[frameIndex].label ?? ''}
    </div>
  </nav>
</div>

<style>
  .stage {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 24px;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr auto;
    gap: 16px;
    align-items: start;
  }

  .stage__board {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
  }

  .stage__scenes {
    grid-column: 1;
    grid-row: 2;
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .stage__frames {
    grid-column: 2;
    grid-row: 1 / span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 8px;
  }

  .stage__frames-title {
    font-family: var(--bbg-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink-faint);
    writing-mode: vertical-rl;
    max-height: 140px;
  }

  .frame-dots {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .stage__frame-label {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink-soft);
    writing-mode: vertical-rl;
    max-height: 200px;
    text-align: center;
  }

  /* ── точки сцен (горизонталь) ── */
  .scene-dot {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--bbg-surface);
    border: 1px solid var(--bbg-border);
    border-radius: 999px;
    cursor: pointer;
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .scene-dot__title {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
  }

  .scene-dot--on {
    background: var(--bbg-amber-dim);
    border-color: var(--bbg-amber-border);
  }

  .scene-dot--on .scene-dot__title {
    color: var(--bbg-amber);
  }

  /* ── точки фреймов (вертикаль) ── */
  .frame-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    padding: 0;
    background: var(--bbg-border-strong);
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease;
  }

  .frame-dot:hover {
    background: var(--bbg-ink-soft);
  }

  .frame-dot--on {
    background: var(--bbg-amber);
    transform: scale(1.3);
  }

  /* pause — не точка, а тире: temporal, не визуальный state */
  .frame-dot--pause {
    width: 16px;
    height: 4px;
    border-radius: 2px;
  }

  .frame-dot--pause.frame-dot--on {
    background: var(--bbg-amber);
    transform: scaleX(1.2);
  }
</style>
