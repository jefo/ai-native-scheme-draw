<script lang="ts">
  // Demo gallery: shows the full inventory and assembles a
  // ByteByteGo-style "Data Lakehouse" diagram from the kit.
  import {
    Panel,
    Comparison,
    Divider,
    Icon,
    ICON_NAMES,
    StatusBadge,
    Spinner,
    Arrow,
    Actor,
    Stage,
  } from './lib/index';
</script>

<main class="page">
  <!-- ══════════ header ══════════ -->
  <header class="page-head">
    <h1>SysDiag UI Kit</h1>
    <p>
      Тёмный набор элементов для схем системного дизайна в стиле ByteByteGo:
      контейнеры, контурные иконки, статус-бейджи, коннекторы и акторы.
      ~20 базовых элементов — любая архитектурная схема за 15 минут.
    </p>
    <span class="page-meta">svelte 5 · 9 компонентов · {ICON_NAMES.length} иконок · 4 акцента</span>
  </header>

  <!-- ══════════ hero: Data Lakehouse story ══════════ -->
  <section>
    <h2 class="sec-title">
      Assembly — Data Lakehouse <span>сцена из видео про lakehouse, собранная из кита</span>
    </h2>

    <div class="hero-diagram">
      <Panel label="E-commerce Platform" icon="ecommerce" tone="blue">
        <div class="mini-row">
          <Panel label="Web App" icon="bolt" variant="inset">
            <Icon name="api" size={16} />
          </Panel>
          <Panel label="Orders DB" icon="database" variant="inset">
            <StatusBadge tone="success" label="Writes ok" />
          </Panel>
        </div>
        <StatusBadge tone="info" label="Receiving writes" pulse />
      </Panel>

      <div class="flow-col">
        <Arrow animated tone="blue" label="streaming logs" />
      </div>

      <Panel label="ETL · Compaction" icon="etl" tone="amber" badge="cron">
        <div class="mini-row">
          <Spinner tone="amber" size={14} />
          <span class="run-note">compaction running</span>
        </div>
        <StatusBadge tone="running" label="Scheduled 02:00" />
      </Panel>

      <div class="flow-col">
        <Arrow animated tone="blue" label="batch writes" />
      </div>

      <Panel label="Lakehouse Storage" icon="data-lakehouse" tone="blue" badge="S3">
        <Panel label="Shared Catalog" icon="catalog" variant="inset" tone="blue">
          <StatusBadge tone="warning" label="Schema drift detected" />
          <StatusBadge tone="info" label="Governed" icon="governance" />
        </Panel>
        <Panel label="Open Table Format" icon="parquet" variant="inset" tone="blue">
          <StatusBadge tone="success" label="Commit ok" />
        </Panel>
        <Panel label="Object Storage" icon="object-storage" variant="inset" tone="blue">
          <div class="icon-row">
            <Icon name="parquet" size={16} />
            <Icon name="json" size={16} />
            <Icon name="log" size={16} />
            <Icon name="image" size={16} />
          </div>
          <StatusBadge tone="error" label="Write failed — OOM" />
        </Panel>
      </Panel>

      <div class="flow-col">
        <Arrow dashed tone="red" blocked label="direct read" />
      </div>

      <Panel label="Analytics" icon="bolt">
        <StatusBadge tone="error" label="Access denied" icon="lock" />
        <StatusBadge tone="neutral" label="Trino" icon="spark" />
      </Panel>
    </div>

    <!-- actors: who suffers, who wins -->
    <div class="hero-actors">
      <Actor label="Data Engineer" role="engineer" mood="sad" dim />
      <div class="flow-col">
        <Arrow tone="amber" label="sync pain" />
      </div>
      <Actor label="Analyst" role="analyst" mood="happy" />
    </div>

    <!-- comparison: the final summary -->
    <div class="hero-compare">
      <h3 class="sec-sub">Summary — три архитектуры</h3>
      <Comparison columns={3}>
        <Panel label="Data Warehouse" icon="data-warehouse">
          <StatusBadge tone="success" label="SQL analytics" />
          <StatusBadge tone="error" label="No raw data" />
          <StatusBadge tone="warning" label="Expensive storage" />
        </Panel>
        <Panel label="Data Lake" icon="data-lake" tone="blue">
          <StatusBadge tone="error" label="No transactions" />
          <StatusBadge tone="success" label="Raw data" />
          <StatusBadge tone="warning" label="Governance gap" />
        </Panel>
        <Panel label="Lakehouse" icon="data-lakehouse" tone="green">
          <StatusBadge tone="success" label="Transactions" />
          <StatusBadge tone="success" label="Raw + SQL" />
          <StatusBadge tone="success" label="Open formats" />
        </Panel>
      </Comparison>
    </div>
  </section>

  <!-- ══════════ 1. containers ══════════ -->
  <section>
    <h2 class="sec-title">Containers <span>плашки, слои, разделители, сравнение</span></h2>

    <div class="gallery gallery--cards">
      <Panel label="Default" icon="server">нейтральная плашка — граница системы</Panel>
      <Panel label="Blue" icon="data-lake" tone="blue">хранилища, озёра, холодные данные</Panel>
      <Panel label="Green" icon="data-warehouse" tone="green">успешные пути</Panel>
      <Panel label="Amber" icon="etl" tone="amber" badge="cron">внимание, текущий шаг</Panel>
      <Panel label="Red" icon="shield" tone="red">ошибки, запрещённые связи</Panel>
      <Panel label="Layer stack" icon="object-storage" tone="blue">
        <Panel label="Top layer" variant="inset" icon="catalog">
          <Panel label="Mid layer" variant="inset" icon="parquet">
            <Panel label="Bottom layer" variant="inset" icon="database">
              вложенность = уровень абстракции
            </Panel>
          </Panel>
        </Panel>
      </Panel>
    </div>

    <div class="stage">
      <Panel label="Warehouse" icon="data-warehouse">
        <StatusBadge tone="success" label="SQL" />
      </Panel>
      <Divider orientation="vertical" label="vs" tone="amber" />
      <Panel label="Lake" icon="data-lake" tone="blue">
        <StatusBadge tone="success" label="Raw" />
      </Panel>
    </div>

    <div class="gallery gallery--row">
      <Divider label="horizontal divider" />
      <Divider label="blue divider" tone="blue" />
      <Divider label="with icon">
        <Icon name="lock" size={11} />
      </Divider>
    </div>
  </section>

  <!-- ══════════ 2. stage frame ══════════ -->
  <section>
    <h2 class="sec-title">Stage <span>рамка сцены раскадровки: номер · таймкод · цель · композиция</span></h2>
    <Stage
      index={0}
      title="Постановка вопроса"
      timecode="00:00 – 00:15"
      goal="Зафиксировать путаницу в терминах и показать точку старта."
    >
      <div class="stage-demo">
        <Panel label="Browser" icon="browser" tone="blue">
          <div class="sb-req">GET /</div>
        </Panel>
        <div class="flow-col">
          <Arrow tone="default" label="HTTP" />
        </div>
        <Panel label="Server" icon="server" badge="black box">
          <div class="sb-blackbox">
            <Icon name="question" size={22} />
          </div>
        </Panel>
      </div>
    </Stage>
  </section>

  <!-- ══════════ 3. icons ══════════ -->
  <section>
    <h2 class="sec-title">Icons <span>line-art, одна толщина штриха</span></h2>
    <div class="gallery gallery--icons">
      {#each ICON_NAMES as name}
        <div class="icon-tile">
          <Icon name={name} size={20} />
          <code>{name}</code>
        </div>
      {/each}
    </div>
  </section>

  <!-- ══════════ 4. status badges ══════════ -->
  <section>
    <h2 class="sec-title">Status badges <span>этот слой показывает боль и успех</span></h2>

    <div class="gallery gallery--row">
      <StatusBadge tone="success" label="Committed" />
      <StatusBadge tone="error" label="Write failed" />
      <StatusBadge tone="warning" label="Schema change" />
      <StatusBadge tone="info" label="Access granted" />
      <StatusBadge tone="neutral" label="Governed" icon="lock" />
      <StatusBadge tone="running" label="Compacting" />
      <StatusBadge tone="success" label="Live" pulse />
      <StatusBadge tone="error" label="Down" pulse />
    </div>

    <div class="gallery gallery--row">
      <Spinner tone="blue" size={18} />
      <Spinner tone="green" size={18} />
      <Spinner tone="amber" size={18} />
      <Spinner tone="red" size={18} />
      <Spinner tone="neutral" size={18} />
    </div>
  </section>

  <!-- ══════════ 5. connectors ══════════ -->
  <section>
    <h2 class="sec-title">Connectors <span>связи и потоки данных</span></h2>

    <div class="gallery gallery--row">
      <div class="arrow-cell">
        <code>solid — static call</code>
        <Arrow tone="blue" />
      </div>
      <div class="arrow-cell">
        <code>dashed — metadata</code>
        <Arrow dashed tone="blue" />
      </div>
      <div class="arrow-cell">
        <code>animated — live stream</code>
        <Arrow animated tone="blue" label="logs" />
      </div>
      <div class="arrow-cell">
        <code>blocked — forbidden</code>
        <Arrow dashed tone="red" blocked />
      </div>
      <div class="arrow-cell">
        <code>amber tone</code>
        <Arrow tone="amber" />
      </div>
      <div class="arrow-cell">
        <code>green · left</code>
        <Arrow tone="green" direction="left" />
      </div>
    </div>

    <div class="gallery gallery--row">
      <div class="arrow-cell arrow-cell--vertical">
        <code>up</code>
        <Arrow tone="blue" direction="up" />
      </div>
      <div class="arrow-cell arrow-cell--vertical">
        <code>down · animated</code>
        <Arrow tone="green" direction="down" animated />
      </div>
    </div>
  </section>

  <!-- ══════════ 6. actors ══════════ -->
  <section>
    <h2 class="sec-title">Actors <span>кто страдает, кто пользуется</span></h2>

    <div class="gallery gallery--row">
      <Actor label="Data Engineer" role="engineer" mood="neutral" />
      <Actor label="Analyst" role="analyst" mood="neutral" />
      <Actor label="Ops" role="user" mood="neutral" />
      <Actor label="Engineer, sad" role="engineer" mood="sad" dim />
      <Actor label="Analyst, happy" role="analyst" mood="happy" />
      <Actor label="Small" role="user" size="sm" />
      <Actor label="Large" role="engineer" size="lg" />
    </div>
  </section>
</main>

<style>
  .stage {
    display: flex;
    align-items: stretch;
    gap: 14px;
  }

  .stage > :global(.bbg-panel) {
    flex: 1;
  }

  .stage-demo {
    display: grid;
    grid-template-columns: minmax(140px, 1fr) 100px minmax(160px, 1fr);
    align-items: center;
    gap: 0 8px;
  }
</style>
