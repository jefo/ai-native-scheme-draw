<script lang="ts">
  interface Props {
    size?: number;
    tone?: 'blue' | 'green' | 'amber' | 'red' | 'neutral';
    strokeWidth?: number;
    class?: string;
  }

  let { size = 16, tone = 'blue', strokeWidth = 2, class: className }: Props = $props();
</script>

<svg
  class="bbg-spinner bbg-spinner--{tone} {className ?? ''}"
  viewBox="0 0 24 24"
  width={size}
  height={size}
  aria-label="loading"
  role="status"
>
  <circle
    cx="12"
    cy="12"
    r="9"
    fill="none"
    stroke="currentColor"
    stroke-opacity="0.18"
    stroke-width={strokeWidth}
  />
  <path
    d="M21 12a9 9 0 0 0-9-9"
    fill="none"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
  />
</svg>

<style>
  .bbg-spinner {
    animation: bbg-spinner-rotate 0.9s linear infinite;
    flex: none;
  }

  .bbg-spinner--blue {
    color: var(--bbg-blue);
  }
  .bbg-spinner--green {
    color: var(--bbg-green);
  }
  .bbg-spinner--amber {
    color: var(--bbg-amber);
  }
  .bbg-spinner--red {
    color: var(--bbg-red);
  }
  .bbg-spinner--neutral {
    color: var(--bbg-ink-soft);
  }

  @keyframes bbg-spinner-rotate {
    to {
      transform: rotate(360deg);
    }
  }
</style>
