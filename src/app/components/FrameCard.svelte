<script lang="ts">
  import Scene from '../../lib/scene/Scene.svelte';
  import type { Frame } from '../stores/project.svelte.ts';

  /** FrameCard — a single 9:16 frame rendered as a Scene card.
   *  Displays frame name + wireframe content inside the 9:16 viewport. */
  let {
    frame,
    index,
    compact = false,
  }: {
    frame: Frame;
    index: number;
    compact?: boolean;
  } = $props();
</script>

<div class="fc" class:fc--compact={compact}>
  <Scene title={frame.name || `Frame ${index + 1}`}>
    <div class="fc__wireframe">
      {#if frame.content}
        <p class="fc__text">{frame.content}</p>
      {:else}
        <p class="fc__empty">empty frame</p>
      {/if}
    </div>
  </Scene>
  <span class="fc__idx">{index + 1}</span>
</div>

<style>
  .fc {
    position: relative;
    width: 240px;
    height: 427px; /* 9:16 */
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  .fc:hover {
    transform: translateY(-2px);
  }
  .fc--compact {
    width: 200px;
    height: 356px;
  }
  .fc :global(.scene) {
    width: 100%;
    height: 100%;
  }
  .fc__wireframe {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
    width: 100%;
    height: 100%;
  }
  .fc__text {
    font-family: var(--vnp-font);
    font-size: 13px;
    color: var(--vnp-ink-soft);
    line-height: 1.4;
    max-width: 28ch;
  }
  .fc__empty {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .fc__idx {
    position: absolute;
    bottom: 8px;
    right: 10px;
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    color: var(--vnp-ink-faint);
    background: var(--vnp-paper-deep);
    padding: 1px 6px;
    border-radius: 3px;
    z-index: 2;
  }
</style>
