<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    /** number of equal columns (each child fills one column) */
    columns?: number;
    gap?: 'sm' | 'md' | 'lg';
    class?: string;
    children?: Snippet;
  }

  let { columns = 3, gap = 'md', class: className, children }: Props = $props();

  const GAP: Record<NonNullable<Props['gap']>, string> = {
    sm: 'var(--bbg-gap-sm)',
    md: 'var(--bbg-gap-md)',
    lg: 'var(--bbg-gap-lg)',
  };
</script>

<section
  class="bbg-comparison {className ?? ''}"
  style="grid-template-columns:repeat({columns},minmax(0,1fr));gap:{GAP[gap]};"
>
  {@render children?.()}
</section>

<style>
  .bbg-comparison {
    display: grid;
    align-items: stretch;
  }

  .bbg-comparison > :global(*) {
    min-width: 0;
  }
</style>
