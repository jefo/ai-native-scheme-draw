<script lang="ts">
  // Единый сценарий: одна доска, накопление.
  // Moves (границы мысли) → beats (шаги подачи, контроль cognitive load).
  // Move 1 разбит на beats по узлам; Move 3 — механика отдельно от вывода,
  // чтобы большой output state не вываливался одним скачком.
  import GraphNode from '../../lib/GraphNode.svelte';
  import { Arrow } from 'sysdiag-ui-kit';
  import { F } from './frames';

  let { frame }: { frame: number } = $props();

  let repoScopes: ('DEFAULT' | 'REQUEST')[] = $derived(
    frame >= F.REPO_REQUEST ? ['DEFAULT', 'REQUEST'] : ['DEFAULT'],
  );
  let serviceScopes: ('DEFAULT' | 'REQUEST')[] = $derived(
    frame >= F.SERVICE_REQUEST ? ['DEFAULT', 'REQUEST'] : ['DEFAULT'],
  );
  let controllerScopes: ('DEFAULT' | 'REQUEST')[] = $derived(
    frame >= F.CONTROLLER_REQUEST ? ['DEFAULT', 'REQUEST'] : ['DEFAULT'],
  );
</script>

<!-- ОРИЕНТАЦИЯ -->
<div class="topic">почему scope одного provider меняет scope других</div>

<!-- ===== MOVE 1 · ЦЕПОЧКА (beats по узлам) ===== -->
{#if frame >= F.CHAIN_CONTROLLER}
  <div class="node" style="left: 30%; top: 20%; transform: translate(-50%, -50%);">
    <GraphNode name="UsersController" scopes={controllerScopes} />
  </div>
{/if}

{#if frame >= F.CHAIN_SERVICE}
  <div class="node" style="left: 30%; top: 44%; transform: translate(-50%, -50%);">
    <GraphNode name="UsersService" scopes={serviceScopes} />
  </div>
{/if}

{#if frame >= F.CHAIN_REPO}
  <div class="node" style="left: 30%; top: 68%; transform: translate(-50%, -50%);">
    <GraphNode name="UsersRepository" scopes={repoScopes} highlight={frame >= F.REPO_REQUEST && frame < F.SERVICE_REQUEST} />
  </div>
{/if}

<!-- ===== ПЕТЛЯ Service ↔ Repository ===== -->
{#if frame >= F.CHAIN_REPO}
  <div class="edge" style="left: 26%; top: 55%; height: 9%;">
    <Arrow direction="down" tone="blue" />
  </div>
  <div class="lbl lbl--dep" style="left: 17%; top: 59%; transform: translateY(-50%);">
    depends on
  </div>
{/if}

{#if frame >= F.SERVICE_REQUEST}
  <div class="edge" style="left: 34%; top: 55%; height: 9%;">
    <Arrow direction="up" tone="amber" />
  </div>
  <div class="lbl lbl--con" style="left: 40%; top: 59%; transform: translateY(-50%);">
    lifetime<br />constraint
  </div>
{/if}

<!-- ===== ПЕТЛЯ Controller ↔ Service ===== -->
{#if frame >= F.CHAIN_SERVICE}
  <div class="edge" style="left: 26%; top: 31%; height: 9%;">
    <Arrow direction="down" tone="blue" />
  </div>
{/if}

{#if frame >= F.CONTROLLER_REQUEST}
  <div class="edge" style="left: 34%; top: 31%; height: 9%;">
    <Arrow direction="up" tone="amber" />
  </div>
{/if}

<!-- ===== MOVE 3 · МЕХАНИКА (beat 1: два запроса + R₁≠R₂) ===== -->
{#if frame >= F.MECH_DIFFER}
  <div class="mech-title">забудь scope — смотрим lifetime</div>

  <div class="abs mech-row" style="left: 56%; top: 28%;">
    <span class="m">Request #1</span><span class="marr">→</span>
    <span class="mi">C₁</span><span class="marr">→</span>
    <span class="mi">S₁</span><span class="marr">→</span>
    <span class="mi mi--r">R₁</span>
  </div>
  <div class="abs mech-row" style="left: 56%; top: 46%;">
    <span class="m">Request #2</span><span class="marr">→</span>
    <span class="mi">C₂</span><span class="marr">→</span>
    <span class="mi">S₂</span><span class="marr">→</span>
    <span class="mi mi--r">R₂</span>
  </div>
  <div class="abs" style="left: 56%; top: 62%;">
    <span class="conflict">R₁ ≠ R₂ — на каждый запрос свой Repository</span>
  </div>
{/if}

<!-- ===== MOVE 3 · МЕХАНИКА (beat 2: конфликт S₁) ===== -->
{#if frame >= F.MECH_CONFLICT}
  <div class="abs" style="left: 56%; top: 76%;">
    <span class="conflict">один Service (S₁) не может держать R₁ и R₂</span>
  </div>
{/if}

<!-- ===== MOVE 5 · ИМЯ ===== -->
{#if frame >= F.DISCOVERY}
  <div class="abs" style="left: 56%; top: 12%;">
    <span class="name">это Nest называет scope bubbling</span>
  </div>
{/if}

<style>
  .topic {
    position: absolute;
    left: 4%;
    top: 8%;
    font-family: var(--bbg-font);
    font-size: 16px;
    font-weight: 600;
    color: var(--bbg-ink-soft);
    letter-spacing: 0.01em;
  }
  .node {
    position: absolute;
    display: flex;
    align-items: center;
  }
  .edge {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 8px;
  }
  .lbl {
    position: absolute;
    font-family: var(--bbg-font-mono);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
    line-height: 1.2;
  }
  .lbl--dep {
    color: var(--bbg-ink-faint);
    text-align: right;
  }
  .lbl--con {
    color: var(--bbg-amber);
  }
  .abs {
    position: absolute;
    display: flex;
    align-items: center;
  }
  .mech-title {
    position: absolute;
    left: 56%;
    top: 14%;
    font-family: var(--bbg-font);
    font-size: 16px;
    font-weight: 600;
    color: var(--bbg-ink-soft);
  }
  .mech-row {
    gap: 6px;
  }
  .m {
    font-family: var(--bbg-font);
    font-size: 14px;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
  }
  .marr {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    color: var(--bbg-ink-faint);
  }
  .mi {
    font-family: var(--bbg-font-mono);
    font-size: 15px;
    font-weight: 700;
    color: var(--bbg-ink);
    white-space: nowrap;
  }
  .mi--r {
    color: var(--bbg-amber);
  }
  .conflict {
    font-family: var(--bbg-font);
    font-size: 15px;
    font-weight: 600;
    color: var(--bbg-amber);
    white-space: nowrap;
  }
  .name {
    font-family: var(--bbg-font);
    font-size: 16px;
    font-weight: 600;
    color: var(--bbg-ink-soft);
    white-space: nowrap;
  }
</style>
