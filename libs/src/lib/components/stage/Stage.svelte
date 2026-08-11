<script lang="ts">
  // Stage — frame of a storyboard scene: one complete macro-
  // composition on screen. Header carries the scene number,
  // title and timecode; a caption line holds the scene's goal;
  // the screen area is the composition canvas (children).
  import type { Snippet } from 'svelte';

  interface Props {
    /** scene number, shown as an amber chip (e.g. 0) */
    index?: number;
    title: string;
    /** mono chip on the right, e.g. "00:00 – 00:15" */
    timecode?: string;
    /** one-line scene goal caption under the header */
    goal?: string;
    class?: string;
    children?: Snippet;
  }

  let { index, title, timecode, goal, class: className, children }: Props = $props();
</script>

<figure class="bbg-stage {className ?? ''}">
  <header class="bbg-stage__bar">
    {#if index !== undefined}
      <span class="bbg-stage__index">{index}</span>
    {/if}
    <h3 class="bbg-stage__title">{title}</h3>
    {#if timecode}
      <span class="bbg-stage__time">{timecode}</span>
    {/if}
  </header>
  {#if goal}
    <p class="bbg-stage__goal">
      <span class="bbg-stage__goal-label">цель</span>
      {goal}
    </p>
  {/if}
  <div class="bbg-stage__screen">
    {@render children?.()}
  </div>
</figure>

<style>
  .bbg-stage {
    margin: 0;
    display: flex;
    flex-direction: column;
    background: var(--bbg-surface);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    overflow: hidden;
  }

  .bbg-stage__bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--bbg-border);
  }

  .bbg-stage__index {
    font-family: var(--bbg-font-mono);
    font-size: 10px;
    font-weight: 700;
    color: var(--bbg-amber);
    background: var(--bbg-amber-dim);
    border: 1px solid var(--bbg-amber-border);
    border-radius: 999px;
    padding: 2px 9px;
    line-height: 1.4;
  }

  .bbg-stage__title {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--bbg-ink);
    letter-spacing: 0.01em;
    margin: 0;
  }

  .bbg-stage__time {
    margin-left: auto;
    font-family: var(--bbg-font-mono);
    font-size: 10.5px;
    letter-spacing: 0.06em;
    color: var(--bbg-ink-faint);
    white-space: nowrap;
  }

  .bbg-stage__goal {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin: 0;
    padding: 7px 14px;
    border-bottom: 1px solid var(--bbg-border);
    background: var(--bbg-panel-inset);
    font-family: var(--bbg-font-mono);
    font-size: 10.5px;
    line-height: 1.6;
    color: var(--bbg-ink-faint);
  }

  .bbg-stage__goal-label {
    flex: none;
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--bbg-ink-faint);
    border: 1px solid var(--bbg-border);
    border-radius: 4px;
    padding: 1px 6px;
  }

  .bbg-stage__screen {
    padding: 18px 20px;
    background: var(--bbg-bg);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
</style>
