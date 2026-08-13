<script lang="ts">
  import Icon from '../icons/Icon.svelte';
  import SemanticNode from './SemanticNode.svelte';
  import CompositeNode from './CompositeNode.svelte';

  /** Message Queue — «как гарантировать, что сообщение не потеряется».
   *  Организм: publish → broker → deliver → ack | fail → retry → DLQ.
   *  Молекула: broker = queue + durable storage. */
</script>

<div class="fd">
  <header class="fd__header">
    <h1 class="fd__title">Как гарантировать, что сообщение не потеряется?</h1>
    <p class="fd__sub">message queue · ack · retry · dead letter</p>
  </header>

  <svg class="fd__svg" viewBox="0 0 1200 620" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="mq-mint" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-good)" />
      </marker>
      <marker id="mq-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-warn)" />
      </marker>
      <marker id="mq-rose" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-bad)" />
      </marker>
      <marker id="mq-copper" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--vnp-color-relation)" />
      </marker>
    </defs>

    <text x="60" y="30" class="fd__act">Сообщение опубликовано и сохранено</text>

    <!-- 1 · publish: Producer → Broker -->
    <line x1="196" y1="150" x2="520" y2="155" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#mq-copper)" />
    <text x="360" y="140" class="fd__edge">1 · publish</text>

    <!-- 2 · deliver: Broker → Consumer -->
    <line x1="800" y1="155" x2="950" y2="150" stroke="var(--vnp-color-relation)" stroke-width="1.5" marker-end="url(#mq-copper)" />
    <text x="880" y="140" class="fd__edge">2 · deliver</text>

    <!-- 3 · ack: Consumer → Broker (mint, dashed — подтверждение) -->
    <path d="M1000 196 C 1000 250, 900 250, 820 230" fill="none" stroke="var(--vnp-good)" stroke-width="1.5" stroke-dasharray="6 5" marker-end="url(#mq-mint)" />
    <text x="900" y="262" class="fd__edge fd__edge--hit">3 · ack — удалить</text>

    <!-- fail → retry: Consumer → обратно к deliver (amber) -->
    <path d="M1000 104 C 1000 60, 860 60, 820 90" fill="none" stroke="var(--vnp-warn)" stroke-width="1.5" marker-end="url(#mq-amber)" />
    <text x="890" y="52" class="fd__edge fd__edge--miss">fail → redeliver</text>

    <!-- 4 · retries exhausted → DLQ (rose) -->
    <path d="M1046 150 L1046 434 L746 434" fill="none" stroke="var(--vnp-bad)" stroke-width="1.5" marker-end="url(#mq-rose)" />
    <text x="890" y="424" class="fd__edge fd__edge--miss">4 · лимит попыток → DLQ</text>

    <text x="60" y="560" class="fd__act">Отказ — повторная доставка, потом dead letter</text>

    <SemanticNode x={150} y={150} icon="function" label="Producer" color="var(--vnp-color-relation)" />

    <!-- молекула: broker = queue + storage -->
    <CompositeNode x={520} y={90} w={280} h={140} title="Broker" tone="var(--vnp-color-relation)">
      <g transform="translate(60 42)" style="color: var(--vnp-color-relation)">
        <Icon name="queue" size={30} />
      </g>
      <g transform="translate(120 50)" style="color: var(--vnp-color-value)">
        <Icon name="database" size={22} />
      </g>
      <text x="60" y="104" class="fd__glyph-note">queue · durable storage</text>
    </CompositeNode>

    <SemanticNode x={1000} y={150} icon="server" label="Consumer" color="var(--vnp-good)" />

    <SemanticNode x={700} y={480} icon="alert" label="DLQ" color="var(--vnp-bad)" />
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
