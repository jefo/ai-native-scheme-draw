<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';
  import CompositeNode from './CompositeNode.svelte';

  /** FlowDiagram — организм: один непрерывный направленный путь.
   *  История читается по стрелкам: что передаётся, куда, что происходит на развилке.
   *  Молекулы: Edge (server+cache), Origin (server+database) — композиты с границей.
   *  Атомы: глифы Icon (user, gateway, server, cache, database). */
</script>

<div class="fd">
  <header class="fd__header">
    <h1 class="fd__title">Что происходит, когда ты открываешь сайт</h1>
    <p class="fd__sub">запрос → развилка кэша → ответ возвращается</p>
  </header>

  <svg class="fd__svg" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arr-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="arr-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-warn)" />
      </marker>
      <marker id="arr-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
    </defs>

    <!-- ═══ Шаг 1–2: запрос ищет путь ═══ -->
    <text x="60" y="30" class="fd__act">Запрос ищет путь</text>

    <!-- 1 · resolve: Browser → DNS -->
    <line x1="180" y1="150" x2="310" y2="150" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#arr-copper)" />
    <text x="245" y="140" class="fd__edge">1 · имя сайта</text>

    <!-- 2 · IP edge: DNS → Edge -->
    <line x1="400" y1="150" x2="540" y2="150" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#arr-copper)" />
    <text x="470" y="140" class="fd__edge">2 · IP ближайшего edge</text>

    <!-- ═══ Шаг 3: edge решает ═══ -->
    <text x="60" y="300" class="fd__act">Edge решает: кэш или origin</text>

    <!-- 3a · HIT: Edge → Browser (пунктир, mint — ответ не выходит из системы) -->
    <path d="M680 270 C 680 420, 400 420, 210 300" fill="none" stroke="var(--vnp-good)" stroke-width="1.5" stroke-dasharray="6 5" marker-end="url(#arr-mint)" />
    <text x="420" y="420" class="fd__edge fd__edge--hit">3a · HIT — кэш ответил сам</text>

    <!-- 3b · MISS: Edge → Origin -->
    <line x1="820" y1="150" x2="880" y2="150" stroke="var(--vnp-warn)" stroke-width="1.5" marker-end="url(#arr-amber)" />
    <text x="852" y="140" class="fd__edge fd__edge--miss">3b · MISS</text>

    <!-- ═══ Шаг 4: ответ возвращается ═══ -->
    <text x="60" y="560" class="fd__act">Ответ возвращается</text>

    <!-- 4 · response: Origin → Browser (вниз и влево) -->
    <path d="M1020 270 C 1020 480, 260 480, 200 310" fill="none" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#arr-copper)" />
    <text x="560" y="490" class="fd__edge">4 · контент + копия в кэш edge</text>

    <!-- ═══ Ноды ═══ -->
    <SemanticNode x={130} y={150} icon="user" label="Browser" color="var(--vnp-good)" />
    <SemanticNode x={350} y={150} icon="gateway" label="DNS" color="var(--vnp-color-relation)" />

    <!-- молекула: Edge = server + cache -->
    <CompositeNode x={560} y={90} w={240} h={120} title="Edge" tone="var(--vnp-good)">
      <g transform="translate(80 40)" style="color: var(--vnp-good)">
        <Icon name="server" size={32} />
      </g>
      <g transform="translate(140 46)" style="color: var(--vnp-color-value)">
        <Icon name="cache" size={22} />
      </g>
      <text x="80" y="100" class="fd__glyph-note">server · cache</text>
    </CompositeNode>

    <!-- молекула: Origin = server + database -->
    <CompositeNode x={900} y={90} w={240} h={120} title="Origin" tone="var(--vnp-color-value)">
      <g transform="translate(90 40)" style="color: var(--vnp-color-value)">
        <Icon name="server" size={30} />
      </g>
      <g transform="translate(130 42)" style="color: var(--vnp-color-value)">
        <Icon name="database" size={24} />
      </g>
      <text x="90" y="100" class="fd__glyph-note">server · database</text>
    </CompositeNode>
  </svg>
</div>

<style>
  .fd {
    max-width: 1240px;
    margin: 0 auto;
    padding: 32px 24px;
  }

  .fd__header {
    margin-bottom: 16px;
  }

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

  /* заголовки-глаголы: операция над потоком, не ярлык */
  .fd__act {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    fill: var(--vnp-ink);
  }

  /* метки рёбер: что передаётся */
  .fd__edge {
    font-family: var(--vnp-font-mono);
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    fill: var(--vnp-ink-soft);
  }

  .fd__edge--hit {
    fill: var(--vnp-good);
  }

  .fd__edge--miss {
    fill: var(--vnp-warn);
  }

  .fd__glyph-note {
    font-family: var(--vnp-font-mono);
    font-size: 9.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    fill: var(--vnp-ink-faint);
  }
</style>
