<script lang="ts">
  import Lesson from './lib/Lesson.svelte';
  import { lesson, lessonV2 } from './lessons/dependency-graph/index';

  // По умолчанию — вторая редакция (кандидат). Переключить в консоли не нужно —
  // обе экспортированы, Lesson рендерит lessonV2.
  const active = lessonV2;
</script>

<main class="app">
  <Lesson title={active.title} scenes={active.scenes} />
</main>

<style>
  .app {
    min-height: 100vh;
    background: var(--bbg-bg);
    padding: 0;
  }
</style>
