<script lang="ts">
  import type { Snippet } from 'svelte';
  import StickyNote from './atoms/StickyNote.svelte';

  /**
   * Value Proposition Canvas — канонический организм Strategyzer.
   *
   * Два режима на каждую секцию:
   *   Data mode:  customerJobs={["job1", "job2"]}  → дефолтные стикеры
   *   Slots mode: customerJobsSlot={mySnippet}      → полный контроль (свои атомы/молекулы)
   *
   * Формат: 16:9 горизонтальный (YouTube classic, не Shorts).
   */
  let {
    customerJobs = [],
    pains = [],
    gains = [],
    products = [],
    painRelievers = [],
    gainCreators = [],
    customerJobsSlot,
    painsSlot,
    gainsSlot,
    productsSlot,
    painRelieversSlot,
    gainCreatorsSlot,
  }: {
    customerJobs?: string[];
    pains?: string[];
    gains?: string[];
    products?: string[];
    painRelievers?: string[];
    gainCreators?: string[];
    customerJobsSlot?: Snippet;
    painsSlot?: Snippet;
    gainsSlot?: Snippet;
    productsSlot?: Snippet;
    painRelieversSlot?: Snippet;
    gainCreatorsSlot?: Snippet;
  } = $props();
</script>

<div class="vpc">
  <!-- ═══ LEFT: Value Map ═══ -->
  <div class="vpc__side vpc__map">
    <h3 class="vpc__section-title vpc__section-title--map">Value Map</h3>

    <!-- Gain Creators (green, top) -->
    <div class="vpc__band vpc__band--gains">
      <h4 class="vpc__band-label">Gain Creators</h4>
      <div class="vpc__stickies">
        {#if gainCreatorsSlot}
          {@render gainCreatorsSlot()}
        {:else}
          {#each gainCreators as item}
            <StickyNote color="green" label={item} />
          {/each}
        {/if}
      </div>
    </div>

    <!-- Pain Relievers (pink, middle) -->
    <div class="vpc__band vpc__band--pains">
      <h4 class="vpc__band-label">Pain Relievers</h4>
      <div class="vpc__stickies">
        {#if painRelieversSlot}
          {@render painRelieversSlot()}
        {:else}
          {#each painRelievers as item}
            <StickyNote color="pink" label={item} />
          {/each}
        {/if}
      </div>
    </div>

    <!-- Products & Services (blue, bottom) -->
    <div class="vpc__band vpc__band--products">
      <h4 class="vpc__band-label">Products &amp; Services</h4>
      <div class="vpc__stickies">
        {#if productsSlot}
          {@render productsSlot()}
        {:else}
          {#each products as item}
            <StickyNote color="blue" label={item} />
          {/each}
        {/if}
      </div>
    </div>
  </div>

  <!-- ═══ CENTER: Fit ═══ -->
  <div class="vpc__fit">
    <div class="vpc__fit-line vpc__fit-line--top"></div>
    <span class="vpc__fit-label">Fit<br/>↔</span>
    <div class="vpc__fit-line vpc__fit-line--bot"></div>
  </div>

  <!-- ═══ RIGHT: Customer Profile ═══ -->
  <div class="vpc__side vpc__profile">
    <h3 class="vpc__section-title vpc__section-title--profile">Customer Profile</h3>

    <div class="vpc__circle">
      <!-- Gains (green, right zone of circle) -->
      <div class="vpc__circle-zone vpc__circle-zone--gains">
        <h4 class="vpc__band-label">Gains</h4>
        <div class="vpc__stickies">
          {#if gainsSlot}
            {@render gainsSlot()}
          {:else}
            {#each gains as item}
              <StickyNote color="green" label={item} />
            {/each}
          {/if}
        </div>
      </div>

      <!-- Jobs (yellow, center) -->
      <div class="vpc__circle-zone vpc__circle-zone--jobs">
        <h4 class="vpc__band-label">Customer Jobs</h4>
        <div class="vpc__stickies">
          {#if customerJobsSlot}
            {@render customerJobsSlot()}
          {:else}
            {#each customerJobs as item}
              <StickyNote color="yellow" label={item} />
            {/each}
          {/if}
        </div>
      </div>

      <!-- Pains (pink, left zone of circle) -->
      <div class="vpc__circle-zone vpc__circle-zone--pains">
        <h4 class="vpc__band-label">Pains</h4>
        <div class="vpc__stickies">
          {#if painsSlot}
            {@render painsSlot()}
          {:else}
            {#each pains as item}
              <StickyNote color="pink" label={item} />
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  /* ── root grid: Map | Fit | Profile ── */
  .vpc {
    display: flex;
    align-items: stretch;
    gap: 0;
    width: 100%;
    height: 100%;
    padding: 8px;
  }

  /* ── sides ── */
  .vpc__side {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .vpc__map {
    padding-right: 4px;
  }
  .vpc__profile {
    padding-left: 4px;
  }

  /* ── section titles (display style) ── */
  .vpc__section-title {
    font-family: var(--vnp-font);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--canvas-ink);
    text-align: center;
    margin: 0 0 4px;
  }
  .vpc__section-title--map {
    border-bottom: var(--canvas-stroke);
    padding-bottom: 6px;
  }
  .vpc__section-title--profile {
    border-bottom: var(--canvas-stroke);
    padding-bottom: 6px;
  }

  /* ── bands (horizontal sections in Value Map) ── */
  .vpc__band {
    border: var(--canvas-stroke);
    border-radius: 8px;
    padding: 8px 10px 10px;
    background: var(--canvas-panel-bg);
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .vpc__band-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--canvas-ink-soft);
    margin-bottom: 6px;
    text-align: center;
  }

  .vpc__stickies {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: flex-start;
    justify-content: center;
    flex: 1 1 auto;
  }

  /* ── Fit column ── */
  .vpc__fit {
    flex: 0 0 44px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }
  .vpc__fit-line {
    flex: 1 1 auto;
    width: 0;
    border-left: var(--canvas-stroke);
    min-height: 12px;
  }
  .vpc__fit-label {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    color: var(--canvas-ink-soft);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    text-align: center;
    line-height: 1.3;
  }

  /* ── Customer Profile circle ── */
  .vpc__circle {
    flex: 1 1 auto;
    display: flex;
    align-items: stretch;
    gap: 6px;
    border: var(--canvas-stroke);
    border-radius: 50%;
    padding: 14px;
    background: var(--canvas-panel-bg);
    min-height: 0;
    aspect-ratio: 1 / 1;
    max-width: 100%;
    /* centre everything inside the circle */
    justify-content: center;
  }

  .vpc__circle-zone {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 0;
  }

  .vpc__circle-zone--jobs {
    flex: 1.2 1.2 0;
  }

  .vpc__circle-zone .vpc__stickies {
    flex: 1 1 auto;
    align-content: flex-start;
  }

  /* ── responsive: на узких экранах стек вертикально ── */
  @media (max-width: 520px) {
    .vpc {
      flex-direction: column;
      gap: 12px;
    }
    .vpc__fit {
      flex: 0 0 auto;
      flex-direction: row;
      height: 28px;
      width: 100%;
    }
    .vpc__fit-line {
      flex: 1 1 auto;
      width: auto;
      height: 0;
      border-left: none;
      border-top: var(--canvas-stroke);
      min-height: 0;
      min-width: 12px;
    }
    .vpc__side {
      padding-left: 0;
      padding-right: 0;
    }
    .vpc__circle {
      aspect-ratio: auto;
      min-height: 180px;
    }
  }
</style>
