<script lang="ts">
  /** Event — что произошло.
   *  Канал кодирования: ВРЕМЕННОЙ ЭФФЕКТ (вспышка, появление, волна, анимация).
   *  Переход (арность Δ) — отмечает смену состояния Entity между T0 и T1. */
  let {
    label = '',
    variant = 'flash',
  }: {
    label?: string;
    variant?: 'flash' | 'appear' | 'wave';
  } = $props();
</script>

<div class="event event--{variant}" title="Event: {label || 'событие'}">
  {#if variant === 'flash'}
    <svg viewBox="0 0 20 24" width="16" height="20" aria-hidden="true">
      <polygon points="12,0 2,14 9,14 7,24 18,9 11,9" fill="var(--vnp-warn)" stroke="var(--vnp-ink)" stroke-width="1.5" />
    </svg>
  {:else if variant === 'appear'}
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="var(--vnp-info)" stroke-width="2.5" stroke-dasharray="4 4" />
      <circle cx="12" cy="12" r="3" fill="var(--vnp-info)" />
    </svg>
  {:else if variant === 'wave'}
    <svg viewBox="0 0 24 12" width="24" height="12" aria-hidden="true">
      <path d="M0 6 Q6 0 12 6 T24 6" fill="none" stroke="var(--vnp-info)" stroke-width="2.5" />
    </svg>
  {/if}
  {#if label}
    <span class="event__label">{label}</span>
  {/if}
</div>

<style>
  .event {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 13px;
  }
  .event--flash .event__label {
    color: var(--vnp-warn);
  }
</style>
