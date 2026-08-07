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
    <svg viewBox="0 0 16 20" width="14" height="18" aria-hidden="true">
      <polygon points="10,0 1,12 7,12 5,20 15,8 9,8"
        fill="var(--vnp-good)" stroke="none" />
    </svg>
  {:else if variant === 'appear'}
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <circle cx="10" cy="10" r="7" fill="none" stroke="var(--vnp-good)" stroke-width="1.5" stroke-dasharray="3 3" />
      <circle cx="10" cy="10" r="2.5" fill="var(--vnp-good)" />
    </svg>
  {:else if variant === 'wave'}
    <svg viewBox="0 0 24 12" width="22" height="10" aria-hidden="true">
      <path d="M1 6 Q6 0 12 6 T23 6"
        fill="none" stroke="var(--vnp-good)" stroke-width="1.5" />
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
    font-size: 12px;
    font-family: var(--vnp-font-mono);
    color: var(--vnp-ink-soft);
  }
  .event--flash .event__label {
    color: var(--vnp-good);
  }
</style>
