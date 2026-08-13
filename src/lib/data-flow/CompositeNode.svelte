<script lang="ts">
  import type { Snippet } from 'svelte';

  /** CompositeNode — сложная молекула: узел-композит с границей.
   *  Внутри границы — атомы (глифы) и/или их связки. Граница = «орган»:
   *  видно, что это одно целое, а не набор случайных значков.
   *  Молекула переиспользуема в разных диаграммах. */
  let {
    x = 0,
    y = 0,
    w = 240,
    h = 200,
    title = '',
    tone = 'var(--vnp-color-relation)',
    children,
  }: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    title?: string;
    tone?: string;
    children?: Snippet;
  } = $props();
</script>

<g transform="translate({x} {y})">
  <rect width={w} height={h} rx="10" fill="var(--vnp-card)" stroke="var(--vnp-border-color-active)" stroke-width="1" />
  <text x="14" y="24" class="cnode__title" style="fill: {tone}">{title}</text>
  {@render children?.()}
</g>

<style>
  .cnode__title {
    font-family: var(--vnp-font-mono);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
</style>
