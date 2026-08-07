<script lang="ts">
  /**
   * Icon — domain-specific outline icons for the Visual Narrative Library.
   * Phosphor/Lucide style: 16×16 viewBox, 1.5px stroke, currentColor, fill="none".
   *
   * Categories: compute · storage · network · messaging · ai-ml · identity ·
   *             cicd · observability · generic
   */
  let { name = 'server', size = 16 }: { name: string; size?: number } = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  stroke="currentColor"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <!-- ═══════════ COMPUTE ═══════════ -->
  {#if name === 'server'}
    <rect x="1.5" y="2" width="13" height="12" rx="2" />
    <line x1="5" y1="5.5" x2="11" y2="5.5" />
    <line x1="5" y1="8" x2="11" y2="8" />
    <line x1="5" y1="10.5" x2="8" y2="10.5" />
    <circle cx="2" cy="2.5" r="0.8" fill="currentColor" stroke="none" />
  {:else if name === 'container'}
    <rect x="1" y="4" width="14" height="10" rx="2" />
    <line x1="4" y1="4" x2="4" y2="14" />
    <line x1="12" y1="4" x2="12" y2="14" />
    <rect x="3" y="1.5" width="10" height="3" rx="1" />
  {:else if name === 'function'}
    <path d="M3 13L6 8L3 3" />
    <path d="M6 3h3l1.5 5l2 4l1.5-5H16" />

  <!-- ═══════════ STORAGE ═══════════ -->
  {:else if name === 'database'}
    <ellipse cx="8" cy="2.5" rx="5.5" ry="2" />
    <path d="M2.5 2.5v5c0 1.1 2.5 2 5.5 2s5.5-0.9 5.5-2V2.5" />
    <path d="M2.5 7.5v5c0 1.1 2.5 2 5.5 2s5.5-0.9 5.5-2V7.5" opacity="0.4" />
  {:else if name === 'cache'}
    <polygon points="8,1.5 14,5 14,11 8,14.5 2,11 2,5" />
    <polyline points="8,8 12.5,5.5" />

  <!-- ═══════════ NETWORK ═══════════ -->
  {:else if name === 'load-balancer'}
    <circle cx="3" cy="4.5" r="2" />
    <circle cx="13" cy="4.5" r="2" />
    <circle cx="8" cy="13.5" r="2" />
    <line x1="4.5" y1="6" x2="7" y2="12" />
    <line x1="11.5" y1="6" x2="9" y2="12" />
  {:else if name === 'gateway'}
    <path d="M1.5 8 L5.5 2.5 L5.5 5.5 L10.5 5.5 L10.5 2.5 L14.5 8 L10.5 13.5 L10.5 10.5 L5.5 10.5 L5.5 13.5 Z" />
  {:else if name === 'cdn'}
    <circle cx="8" cy="8" r="6" />
    <ellipse cx="8" cy="8" rx="3" ry="6" opacity="0.4" />
    <line x1="2" y1="8" x2="14" y2="8" opacity="0.4" />
    <circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
  {:else if name === 'proxy'}
    <rect x="1" y="3" width="5" height="10" rx="1.5" />
    <rect x="10" y="3" width="5" height="10" rx="1.5" />
    <line x1="6" y1="6" x2="10" y2="6" />
    <line x1="6" y1="10" x2="10" y2="10" />
    <polygon points="9,4 10,6 9,8" />

  <!-- ═══════════ MESSAGING ═══════════ -->
  {:else if name === 'queue'}
    <rect x="2" y="2.5" width="12" height="3" rx="1" />
    <rect x="2" y="6.5" width="12" height="3" rx="1" />
    <rect x="2" y="10.5" width="12" height="3" rx="1" />
    <circle cx="3.5" cy="8" r="1" fill="currentColor" stroke="none" />
  {:else if name === 'topic'}
    <circle cx="4" cy="11" r="2" />
    <circle cx="12" cy="11" r="2" />
    <circle cx="8" cy="4" r="2" />
    <line x1="5.5" y1="10" x2="7" y2="5.5" />
    <line x1="10.5" y1="10" x2="9" y2="5.5" />

  <!-- ═══════════ AI / ML ═══════════ -->
  {:else if name === 'model'}
    <circle cx="3.5" cy="5" r="1.5" />
    <circle cx="8" cy="2" r="1.5" />
    <circle cx="12.5" cy="5" r="1.5" />
    <circle cx="5.5" cy="10" r="1.5" />
    <circle cx="10.5" cy="10" r="1.5" />
    <circle cx="8" cy="14" r="1.5" />
    <line x1="4.5" y1="6" x2="7" y2="3" opacity="0.5" />
    <line x1="11.5" y1="6" x2="9" y2="3" opacity="0.5" />
    <line x1="3.5" y1="6.8" x2="5" y2="9" opacity="0.5" />
    <line x1="12.5" y1="6.8" x2="11" y2="9" opacity="0.5" />
  {:else if name === 'gpu'}
    <rect x="1" y="3" width="14" height="10" rx="2" />
    <line x1="4" y1="3" x2="4" y2="13" />
    <line x1="7" y1="3" x2="7" y2="13" />
    <line x1="10" y1="3" x2="10" y2="13" />
    <line x1="13" y1="3" x2="13" y2="13" />
  {:else if name === 'dataset'}
    <rect x="1" y="2" width="14" height="12" rx="2" />
    <line x1="1" y1="6" x2="15" y2="6" />
    <line x1="5.5" y1="2" x2="5.5" y2="14" />
    <line x1="10.5" y1="2" x2="10.5" y2="14" />

  <!-- ═══════════ IDENTITY ═══════════ -->
  {:else if name === 'user'}
    <circle cx="8" cy="4.5" r="2.5" />
    <path d="M2.5 14c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
  {:else if name === 'team'}
    <circle cx="5.5" cy="4.5" r="2" />
    <circle cx="10.5" cy="4.5" r="2" />
    <path d="M3 14c0-2 1.2-3.5 2.5-3.5h5c1.3 0 2.5 1.5 2.5 3.5" />

  <!-- ═══════════ CI / CD ═══════════ -->
  {:else if name === 'pipeline'}
    <circle cx="3" cy="8" r="2.5" />
    <circle cx="8" cy="8" r="2.5" />
    <circle cx="13" cy="8" r="2.5" />
    <line x1="5.5" y1="8" x2="5.5" y2="8" stroke-width="0" />
    <polyline points="5.5,6.5 6,8 5.5,9.5" />
    <polyline points="10.5,6.5 11,8 10.5,9.5" />
  {:else if name === 'git-branch'}
    <circle cx="4" cy="4" r="2" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="12" cy="7" r="2" />
    <line x1="4" y1="6" x2="4" y2="10" />
    <path d="M4 6Q4 4 8 4.5Q10.5 5 10.5 6.5" />
  {:else if name === 'deploy'}
    <path d="M8 1.5L8 10" />
    <polyline points="4.5,6.5 8,10 11.5,6.5" />
    <rect x="2" y="11" width="12" height="3.5" rx="1.5" />

  <!-- ═══════════ OBSERVABILITY ═══════════ -->
  {:else if name === 'metrics'}
    <rect x="1.5" y="9" width="2.5" height="5.5" rx="0.5" />
    <rect x="6.8" y="4.5" width="2.5" height="10" rx="0.5" />
    <rect x="12" y="7" width="2.5" height="7.5" rx="0.5" />
  {:else if name === 'alert'}
    <path d="M8 2L1.5 13h13Z" />
    <line x1="8" y1="6" x2="8" y2="9" />
    <circle cx="8" cy="11.2" r="0.8" fill="currentColor" stroke="none" />
  {:else if name === 'logs'}
    <rect x="3" y="1.5" width="10" height="13" rx="1.5" />
    <line x1="6" y1="5" x2="11" y2="5" />
    <line x1="6" y1="8" x2="11" y2="8" />
    <line x1="6" y1="11" x2="9" y2="11" />

  <!-- ═══════════ GENERIC ═══════════ -->
  {:else if name === 'gear'}
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1.5v1.5M8 13v1.5M3.5 3.5l1 1M11.5 11.5l1 1M1.5 8h1.5M13 8h1.5M3.5 12.5l1-1M11.5 4.5l1-1" />
  {:else if name === 'lock'}
    <rect x="3.5" y="7" width="9" height="7.5" rx="1.5" />
    <path d="M5.5 7V4.5a2.5 2.5 0 0 1 5 0V7" />
    <circle cx="8" cy="10.5" r="1" fill="currentColor" stroke="none" />
  {:else if name === 'clock'}
    <circle cx="8" cy="8" r="6.5" />
    <polyline points="8,5 8,8 11,10" />
  {:else if name === 'link'}
    <path d="M6 10a3 3 0 0 1 0-4.2L8.5 3.3" />
    <path d="M10 6a3 3 0 0 1 0 4.2L7.5 12.7" />
    <line x1="5" y1="11" x2="11" y2="5" />
  {:else}
    <!-- fallback: dot -->
    <circle cx="8" cy="8" r="3" />
  {/if}
</svg>
