<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';
  import CompositeNode from './CompositeNode.svelte';

  /** RateLimiter (token bucket) — «как пропустить N запросов в секунду».
   *  Организм: запрос тратит токен → bucket решает → pass | 429.
   *  Цикл: токены восполняются фоном (R/s). */
</script>

<div class="fd">
  <header class="fd__header">
    <h1 class="fd__title">Как пропустить N запросов в секунду?</h1>
    <p class="fd__sub">rate limiter · token bucket · pass / 429</p>
  </header>

  <svg class="fd__svg" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="rl-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="rl-rose" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-bad)" />
      </marker>
      <marker id="rl-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
    </defs>

    <text x="60" y="30" class="fd__act">Каждый запрос тратит токен</text>

    <!-- 1 · запрос: Client → Bucket -->
    <line x1="196" y1="160" x2="540" y2="165" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#rl-copper)" />
    <text x="370" y="150" class="fd__edge">1 · запрос</text>

    <!-- 2a · pass: Bucket → Backend -->
    <line x1="820" y1="165" x2="950" y2="160" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#rl-mint)" />
    <text x="885" y="150" class="fd__edge fd__edge--hit">2a · токен есть</text>

    <!-- 2b · reject: Bucket → 429 -->
    <path d="M740 230 C 740 330, 900 330, 1000 390" fill="none" stroke="var(--vnp-bad)" stroke-width="1.5" marker-end="url(#rl-rose)" />
    <text x="800" y="320" class="fd__edge fd__edge--miss">2b · ведро пусто → 429</text>

    <!-- цикл: refill → Bucket -->
    <line x1="540" y1="374" x2="620" y2="240" stroke="var(--vnp-good)" stroke-width="1.5" marker-end="url(#rl-mint)" />
    <text x="470" y="330" class="fd__edge fd__edge--hit">токены +R/s</text>

    <text x="60" y="330" class="fd__act">Bucket решает: пропустить или 429</text>

    <SemanticNode x={150} y={160} icon="user" label="Client" color="var(--vnp-good)" />

    <!-- молекула: bucket = контейнер токенов -->
    <CompositeNode x={540} y={90} w={280} h={140} title="Bucket" tone="var(--vnp-good)">
      <g transform="translate(70 42)" style="color: var(--vnp-good)">
        <Icon name="container" size={30} />
      </g>
      <text x="120" y="68" class="fd__glyph-note">tokens: N</text>
      <text x="120" y="86" class="fd__glyph-note">refill: R/s</text>
    </CompositeNode>

    <SemanticNode x={1000} y={160} icon="server" label="Backend" color="var(--vnp-color-value)" />

    <SemanticNode x={1000} y={440} icon="alert" label="429" color="var(--vnp-bad)" />

    <SemanticNode x={540} y={420} icon="clock" label="refill" color="var(--vnp-good)" />
  </svg>
</div>

<style>
  .fd {
    max-width: 1240px;
    margin: 0 auto;
    padding: 32px 24px;
  }
  .fd__header { margin-bottom: 16px; }
  .fd__title {
    font-family: var(--vnp-font-display);
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--vnp-ink);
    margin: 0 0 6px;
  }
  .fd__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--vnp-ink-soft);
    margin: 0;
  }
  .fd__svg {
    width: 100%;
    height: auto;
    border: var(--vnp-border);
    border-radius: 8px;
    background: var(--vnp-card);
  }
  .fd__act {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    fill: var(--vnp-ink);
  }
  .fd__edge {
    font-family: var(--vnp-font-mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    fill: var(--vnp-ink-soft);
  }
  .fd__edge--hit { fill: var(--vnp-good); }
  .fd__edge--miss { fill: var(--vnp-warn); }
  .fd__glyph-note {
    font-family: var(--vnp-font-mono);
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    fill: var(--vnp-ink-faint);
  }
</style>
