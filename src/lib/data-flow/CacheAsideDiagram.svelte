<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';
  import CompositeNode from './CompositeNode.svelte';

  /** Cache-aside — «почему первый запрос медленный, а следующие быстрые».
   *  Организм: read → cache → hit | miss → db → fill cache → response.
   *  Молекула: cache = store + TTL. */
</script>

<div class="fd">
  <header class="fd__header">
    <h1 class="fd__title">Почему первый запрос медленный, а следующие быстрые?</h1>
    <p class="fd__sub">cache-aside · hit / miss → db → fill</p>
  </header>

  <svg class="fd__svg" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="ca-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="ca-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-warn)" />
      </marker>
      <marker id="ca-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
    </defs>

    <text x="60" y="30" class="fd__act">Запрос сначала идёт в кэш</text>

    <!-- 1 · read: Client → Cache -->
    <line x1="196" y1="150" x2="500" y2="155" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#ca-copper)" />
    <text x="350" y="140" class="fd__edge">1 · read: get(key)</text>

    <!-- 2a · hit: Cache → Client (mint, dashed — ответ из кэша) -->
    <path d="M500 220 C 480 280, 300 280, 196 160" fill="none" stroke="var(--vnp-good)" stroke-width="1.5" stroke-dasharray="6 5" marker-end="url(#ca-mint)" />
    <text x="330" y="272" class="fd__edge fd__edge--hit">2a · hit — из кэша</text>

    <!-- 2b · miss: Cache → DB -->
    <line x1="780" y1="155" x2="950" y2="150" stroke="var(--vnp-warn)" stroke-width="1.5" marker-end="url(#ca-amber)" />
    <text x="880" y="140" class="fd__edge fd__edge--miss">2b · miss</text>

    <!-- 3 · fill: DB → Cache -->
    <path d="M1000 196 C 1000 280, 820 280, 780 230" fill="none" stroke="var(--vnp-color-value)" stroke-width="1.5" marker-end="url(#ca-copper)" />
    <text x="880" y="272" class="fd__edge">3 · результат → кэш (TTL)</text>

    <!-- 4 · response: Cache → Client -->
    <path d="M540 230 C 540 350, 150 350, 150 196" fill="none" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#ca-copper)" />
    <text x="330" y="342" class="fd__edge">4 · response</text>

    <text x="60" y="560" class="fd__act">Промах заполняет кэш — следующий запрос станет hit</text>

    <SemanticNode x={150} y={150} icon="user" label="Client" color="var(--vnp-good)" />

    <!-- молекула: cache = store + TTL -->
    <CompositeNode x={500} y={90} w={280} h={140} title="Cache" tone="var(--vnp-color-value)">
      <g transform="translate(60 42)" style="color: var(--vnp-color-value)">
        <Icon name="cache" size={30} />
      </g>
      <g transform="translate(120 50)" style="color: var(--vnp-color-event)">
        <Icon name="clock" size={22} />
      </g>
      <text x="60" y="104" class="fd__glyph-note">store · TTL</text>
    </CompositeNode>

    <SemanticNode x={1000} y={150} icon="database" label="Database" color="var(--vnp-color-value)" />
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
