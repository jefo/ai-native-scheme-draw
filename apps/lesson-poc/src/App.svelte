<script lang="ts">
  import Lesson from './lib/Lesson.svelte';
  import { lesson } from './lessons/dependency-graph/index';
</script>

<main class="app">
  <Lesson title={lesson.title} scenes={lesson.scenes} />
</main>

<style>
  .app {
    min-height: 100vh;
    background: var(--bbg-bg);
    padding: 0;
  }
</style>
