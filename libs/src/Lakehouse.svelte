<script lang="ts">
  // Lakehouse storyboard: 12 fullscreen scenes on "What is a Data
  // Lakehouse?". Video-like deck: every scene is 100% of the viewport,
  // the deck pans HORIZONTALLY (scroll-snap), never vertically.
  // Navigation: ← → keys, side arrows, dots, trackpad swipe, wheel
  // (translated to horizontal when the scene fits the screen).
  import {
    Panel,
    Comparison,
    Divider,
    Icon,
    StatusBadge,
    Arrow,
    Actor,
    Spinner,
  } from './lib/index';

  const SCENES = [
    {
      title: 'Постановка вопроса',
      timecode: '00:00 – 00:06',
      goal: 'Зафиксировать главный вопрос урока и затизерить три архитектуры.',
    },
    {
      title: 'Базовые системы — Warehouse vs Lake',
      timecode: '00:06 – 00:42',
      goal: 'Как устроены традиционные системы по отдельности — и для кого они созданы.',
    },
    {
      title: 'Реальный кейс — две системы = боль',
      timecode: '00:42 – 01:19',
      goal: 'Параллельные пайплайны создают инженерный ад при масштабировании.',
    },
    {
      title: 'Парадигма Lakehouse',
      timecode: '01:19 – 02:10',
      goal: 'Объединение: надёжность Warehouse + масштаб Lake в одном слое.',
    },
    {
      title: 'Слой 1 — Storage & Compute',
      timecode: '02:10 – 02:39',
      goal: 'Фундамент Lakehouse: физическое хранилище и движок обработки.',
    },
    {
      title: 'Проблема Object Storage',
      timecode: '02:39 – 03:01',
      goal: 'Почему нельзя просто использовать Object Storage как базу данных.',
    },
    {
      title: 'Слой 2 — Open Table Formats',
      timecode: '03:01 – 03:36',
      goal: 'Транзакции через слой метаданных: снимки, коммиты, откаты.',
    },
    {
      title: 'Слой 3 — Shared Catalog',
      timecode: '03:36 – 04:11',
      goal: 'Как аналитические движки находят нужную версию таблицы.',
    },
    {
      title: 'Слой 4 — Governance',
      timecode: '04:11 – 04:56',
      goal: 'Права доступа к данным на уровне всей компании.',
    },
    {
      title: 'Итоговая архитектура в работе',
      timecode: '04:56 – 05:20',
      goal: 'Все нагрузки работают с одним слоем данных — без дублирования.',
    },
    {
      title: 'Плата за архитектуру',
      timecode: '05:20 – 06:18',
      goal: 'Честно о сложностях эксплуатации: мелкие файлы и конфликты типов.',
    },
    {
      title: 'Финальный выбор',
      timecode: '06:18 – 06:58',
      goal: 'Ментор выбирает архитектуру под размер команды и типы нагрузок.',
    },
  ];

  // tiny files clutter (scene 10)
  const TINY_FILES = Array.from({ length: 16 }, () => null);

  let scroller = $state<HTMLElement | null>(null);
  let active = $state(0);

  function goTo(i: number) {
    const el = scroller;
    if (!el) return;
    const n = Math.max(0, Math.min(SCENES.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  }

  $effect(() => {
    const el = scroller;
    if (!el) return;

    const onScroll = () => {
      active = Math.round(el.scrollLeft / el.clientWidth);
    };

    // wheel: if the current scene fits the screen (no internal vertical
    // scroll), translate vertical wheel into horizontal deck movement.
    const onWheel = (e: WheelEvent) => {
      const cur = el.querySelector<HTMLElement>(`[data-scene="${active}"]`);
      if (cur && cur.scrollHeight <= cur.clientHeight + 1 && e.deltaY !== 0) {
        el.scrollLeft += e.deltaY;
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goTo(active + 1);
      else if (e.key === 'ArrowLeft') goTo(active - 1);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  });
</script>

<div class="lh-root">
  <!--
    CONTRACT — the deck's visual world (committed 2026-08-11, canon action)

    THESIS: the deck is a data-storytelling instrument in the canonical
    ByteByteGo explainer register at full craft: full-viewport scenes,
    dense information, type sized for arm's-length reading. It refuses
    the small-scale demo look.
    OWN-WORLD: deep-gray composite board, hairline separations,
    brightness-stack elevation, four marker roles (amber attention, blue
    storage, green success, red error) as full-saturation accents on
    gray, mono uppercase labels ≥12px, reading ink bright chalk — gray
    only for disabled/dimmed.
    STORY: the viewer reads one thought per scene from arm's length,
    dense but instantly legible.
    FIRST VIEWPORT: scene 0 as a fullscreen briefing — display headline
    48–72px, three architecture cards as large instruments, HUD count /
    timecode / goal strips.
    FORM: the category standard played straight — the standing exit, not
    the roll (seed 05891b73); quality bar ByteByteGo × Fireship ×
    3Blue1Brown × Stripe/Linear.
    FINISH: unreviewed and undocumented is unfinished; this build ends
    with the finish review, the verdict, and DESIGN.md
  -->
  <!-- ══════════ the deck: horizontal snap scroll ══════════ -->
  <div class="lh-viewport" bind:this={scroller} aria-label="раскадровка: What is a Data Lakehouse?">
    <!-- scene 0: intro -->
    <section class="lh-scene" data-scene={0} aria-label="Сцена 0">
      <div class="lh-center">
        <h1 class="lh-hero">What is a <span class="lh-hero-accent">Data Lakehouse?</span></h1>
        <p class="lh-sub">три архитектуры — один вопрос</p>
        <div class="lh-arch-row">
          <div class="lh-arch bbg-dim">
            <Icon name="data-lake" size={48} />
            <span class="lh-arch-name">Data Lake</span>
            <span class="lh-arch-role">масштаб · сырые данные</span>
          </div>
          <div class="lh-arch lh-arch--focus">
            <span class="lh-q-chip"><Icon name="question" size={18} /> что это?</span>
            <Icon name="data-lakehouse" size={64} />
            <span class="lh-arch-name">Data Lakehouse</span>
            <span class="lh-arch-role">надёжность + масштаб</span>
          </div>
          <div class="lh-arch bbg-dim">
            <Icon name="data-warehouse" size={48} />
            <span class="lh-arch-name">Data Warehouse</span>
            <span class="lh-arch-role">аналитика · SQL</span>
          </div>
        </div>
      </div>
    </section>

    <!-- scene 1: warehouse vs lake -->
    <section class="lh-scene" data-scene={1} aria-label="Сцена 1">
      <div class="lh-scene1">
        <div class="lh-constraint">
          <Icon name="data-warehouse" size={14} />
          Traditional Data Systems <span>— два мира по разные стороны</span>
        </div>

        <div class="lh-split">
          <Panel label="Data Warehouse" icon="data-warehouse" tone="green" class="lh-half">
            <div class="lh-flow lh-flow--green">
              <div class="lh-step">
                <Icon name="data-warehouse" size={15} />
                <span>Warehouse — SQL-данные</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="green" /></div>
              <div class="lh-step">
                <Icon name="log" size={15} />
                <span>Логи — события источников</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="green" /></div>
              <div class="lh-step">
                <Icon name="etl" size={15} />
                <span>ETL — шестерёнка трансформации</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="green" /></div>
              <div class="lh-step">
                <Icon name="database" size={15} />
                <span>База данных</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="green" /></div>
              <div class="lh-step">
                <Icon name="text" size={15} />
                <span>SQL-запросы</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="green" /></div>
              <div class="lh-step lh-step--actor">
                <Actor label="Финансовый аналитик" role="analyst" size="sm" mood="happy" />
                <span class="lh-mono">отчёт</span>
              </div>
            </div>
            <div class="lh-half-caption lh-half-caption--green">
              <Icon name="check" size={11} /> ACID Transactions · SQL Queries
            </div>
          </Panel>

          <Divider orientation="vertical" label="vs" tone="amber" />

          <Panel label="Data Lake" icon="data-lake" tone="blue" class="lh-half">
            <div class="lh-flow lh-flow--blue">
              <div class="lh-step">
                <Icon name="data-lake" size={15} />
                <span>Lake — сырые данные</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="blue" /></div>
              <div class="lh-step">
                <div class="lh-files">
                  <Icon name="log" size={14} />
                  <Icon name="image" size={14} />
                  <Icon name="video" size={14} />
                  <Icon name="audio" size={14} />
                  <Icon name="text" size={14} />
                </div>
                <span>Logs · Image · Video · Audio · Text</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="blue" /></div>
              <div class="lh-step">
                <Icon name="object-storage" size={15} />
                <span>Папка Object Storage</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="blue" /></div>
              <div class="lh-step">
                <Icon name="bolt" size={15} />
                <span>Запрос к кликстриму</span>
              </div>
              <div class="lh-arrow-v"><Arrow direction="down" tone="blue" /></div>
              <div class="lh-step">
                <Icon name="model" size={15} />
                <span>Модель Machine Learning</span>
              </div>
            </div>
            <div class="lh-half-caption lh-half-caption--blue">
              <Icon name="info" size={11} /> Object Storage · Unstructured Data
            </div>
          </Panel>
        </div>
      </div>
    </section>

    <!-- scene 2: the real case — two systems, one engineer -->
    <section class="lh-scene" data-scene={2} aria-label="Сцена 2">
      <div class="lh-scene2">
        <Panel label="Ecommerce Platform" icon="ecommerce" tone="amber" class="lh-src">
          <div class="lh-src-row">
            <div class="lh-datachip"><Icon name="database" size={13} /> Orders</div>
            <div class="lh-datachip"><Icon name="lock" size={13} /> Payments</div>
            <div class="lh-datachip"><Icon name="log" size={13} /> Support Logs</div>
          </div>
        </Panel>

        <div class="lh-split-row">
          <div class="lh-branch">
            <div class="lh-arrow-v"><Arrow direction="down" animated tone="blue" label="raw streams" /></div>
            <div class="lh-sys">
              <span class="lh-warn-float"><Icon name="warn" size={14} /></span>
              <Panel label="Data Lake" icon="data-lake" tone="blue">
                <Panel label="Object Storage" icon="object-storage" variant="inset">
                  <StatusBadge tone="info" label="JSON · logs · images" />
                </Panel>
              </Panel>
            </div>
          </div>

          <div class="lh-sync">
            <StatusBadge
              tone="warning"
              label="Schema Change"
              style="--bbg-pulse-glow: rgba(245, 185, 61, 0.22);"
              pulse
            />
            <div class="lh-sync-loop">
              <div class="lh-arrow-h"><Arrow direction="right" tone="amber" label="sync" /></div>
              <div class="lh-arrow-h"><Arrow direction="left" tone="amber" label="sync" /></div>
            </div>
            <span class="lh-mono">ручная синхронизация</span>
          </div>

          <div class="lh-branch">
            <div class="lh-arrow-v"><Arrow direction="down" tone="amber" label="ETL" /></div>
            <div class="lh-sys">
              <Panel label="ETL · transforms" icon="etl" tone="amber">
                <StatusBadge tone="warning" label="schema join" />
              </Panel>
              <div class="lh-arrow-v"><Arrow direction="down" tone="amber" label="load" /></div>
              <div class="lh-sys">
                <span class="lh-warn-float"><Icon name="warn" size={14} /></span>
                <Panel label="Data Warehouse" icon="data-warehouse">
                  <StatusBadge tone="success" label="star schema" />
                </Panel>
              </div>
            </div>
          </div>
        </div>

        <div class="lh-pain-row">
          <Actor label="Data Engineer" role="engineer" mood="sad" />
          <span class="lh-pain-caption">разрывается между двумя системами</span>
        </div>
      </div>
    </section>

    <!-- scene 3: the lakehouse paradigm -->
    <section class="lh-scene" data-scene={3} aria-label="Сцена 3">
      <div class="lh-scene3">
        <div class="lh-constraint">
          <Icon name="data-lakehouse" size={14} />
          Парадигма Lakehouse <span>— взять лучшее от обоих миров</span>
        </div>

        <div class="lh-merge">
          <Panel label="Data Warehouse" icon="data-warehouse" tone="green" badge="за надёжность" class="lh-merge-side">
            <StatusBadge tone="success" label="ACID · SQL · надёжность" />
          </Panel>
          <div class="lh-arrow-h"><Arrow direction="right" tone="green" label="надёжность" /></div>
          <Panel label="Data Lakehouse" icon="data-lakehouse" badge="единый слой данных" class="lh-merge-hub">
            <div class="lh-hub-row">
              <Icon name="check" size={13} />
              <Icon name="expand" size={13} />
            </div>
            <Icon name="data-lakehouse" size={38} class="lh-hub-icon" />
            <span class="lh-caption">лучшее из обоих миров</span>
          </Panel>
          <div class="lh-arrow-h"><Arrow direction="left" tone="blue" label="масштаб" /></div>
          <Panel label="Data Lake" icon="data-lake" tone="blue" badge="за масштаб" class="lh-merge-side">
            <StatusBadge tone="info" label="Object Storage · масштаб" icon="expand" />
          </Panel>
        </div>
      </div>
    </section>

    <!-- scene 4: layer 1 — storage & compute -->
    <section class="lh-scene" data-scene={4} aria-label="Сцена 4">
      <div class="lh-scene4">
        <div class="lh-constraint">
          <Icon name="data-lakehouse" size={14} />
          Lakehouse Architecture <span>— сборка по слоям, слой 1</span>
        </div>

        <Panel label="Ecommerce Platform" icon="ecommerce" tone="amber" class="lh-src-sm">
          <StatusBadge tone="info" label="orders · events · logs" />
        </Panel>
        <div class="lh-arrow-v"><Arrow direction="down" animated tone="blue" label="write" /></div>

        <Panel label="Lakehouse Storage" icon="object-storage" tone="blue" class="lh-storage">
          <Panel label="Object Storage — S3 / GCS" icon="object-storage" variant="inset" tone="blue">
            <div class="lh-storage-cols">
              <div class="lh-files-box">
                <span class="lh-files-cap">Сырые логи</span>
                <div class="lh-files">
                  <Icon name="log" size={14} />
                  <Icon name="json" size={14} />
                  <Icon name="text" size={14} />
                </div>
                <span class="lh-mono">Order Events</span>
              </div>
              <div class="lh-arrow-h"><Arrow tone="blue" label="ETL / Spark" /></div>
              <div class="lh-files-box">
                <span class="lh-files-cap">Очищенные таблицы</span>
                <div class="lh-files">
                  <Icon name="parquet" size={14} />
                  <Icon name="parquet" size={14} />
                </div>
                <span class="lh-mono">Parquet files</span>
              </div>
            </div>
          </Panel>
        </Panel>

        <div class="lh-arrows-up">
          <div class="lh-arrow-v"><Arrow direction="up" tone="blue" label="read logs" /></div>
          <div class="lh-arrow-v"><Arrow direction="up" tone="green" label="write parquet" /></div>
        </div>

        <Panel label="Apache Spark" icon="spark" tone="amber" badge="compute" class="lh-spark">
          <StatusBadge tone="running" label="ETL · compaction" />
        </Panel>

        <div class="lh-plate">
          <StatusBadge tone="success" label="No Duplication — данные в одном месте, без копий" icon="thumbsup" />
        </div>
      </div>
    </section>

    <!-- scene 5: the object storage problem -->
    <section class="lh-scene" data-scene={5} aria-label="Сцена 5">
      <div class="lh-scene5">
        <Panel label="Object Storage" icon="object-storage" tone="blue">
          <div class="lh-write">
            <div class="lh-file-small"><Icon name="log" size={15} /></div>
            <div class="lh-arrow-h"><Arrow direction="down" tone="blue" label="запись" /></div>
            <div class="lh-file-target">
              <Icon name="parquet" size={17} />
              <span class="lh-mono">orders.parquet</span>
            </div>
          </div>
          <StatusBadge
            tone="error"
            label="Write failed — сбой на середине"
            style="--bbg-pulse-glow: rgba(229, 83, 75, 0.22);"
            pulse
          />
        </Panel>

        <div class="lh-break">
          <Icon name="chart" size={46} />
          <StatusBadge tone="warning" label="Inconsistent View" />
          <span class="lh-caption">чтение недописанных данных</span>
          <div class="lh-arrow-h"><Arrow dashed tone="red" label="read" /></div>
        </div>

        <div class="lh-reader">
          <Actor label="Reader" role="user" mood="sad" />
          <span class="lh-caption">пытается прочитать таблицу</span>
        </div>
      </div>
    </section>

    <!-- scene 6: layer 2 — open table formats -->
    <section class="lh-scene" data-scene={6} aria-label="Сцена 6">
      <div class="lh-scene6">
        <div class="lh-col6-main">
          <Panel label="Transactional Tables — Open Table Format" icon="catalog" tone="green" badge="слой метаданных">
            <div class="lh-logos">
              <div class="lh-logo"><Icon name="iceberg" size={15} /> Iceberg</div>
              <div class="lh-logo"><Icon name="delta" size={15} /> Delta Lake</div>
              <div class="lh-logo"><Icon name="hudi" size={15} /> Apache Hudi</div>
            </div>
          </Panel>

          <div class="lh-hood">
            <div class="lh-hood-card">
              <Icon name="api" size={15} />
              <span>Metadata</span>
              <span class="lh-mono">схема · партиции</span>
            </div>
            <div class="lh-hood-card">
              <Icon name="camera" size={15} />
              <span>Snapshot</span>
              <span class="lh-mono">снимок версии</span>
            </div>
            <div class="lh-hood-card">
              <Icon name="log" size={15} />
              <span>Commit History</span>
              <span class="lh-mono">журнал изменений</span>
            </div>
          </div>

          <div class="lh-tx">
            <div class="lh-tx-chip"><Icon name="bolt" size={13} /> Запись</div>
            <div class="lh-arrow-h"><Arrow tone="amber" label="transaction" /></div>
            <div class="lh-tx-v">
              <StatusBadge tone="success" label="Success — commit" />
              <StatusBadge tone="error" label="Rollback — откат" />
            </div>
            <div class="lh-arrow-h"><Arrow dashed tone="green" label="читать" /></div>
            <div class="lh-tx-chip"><Icon name="check" size={13} /> Consistent View</div>
          </div>
        </div>

        <div class="lh-col6-right">
          <Panel label="Схема эволюции колонок" icon="database" badge="Parquet неизменен">
            <div class="lh-versions">
              <div class="lh-ver bbg-dim">
                <span class="lh-mono">Version 1</span>
                <div class="lh-ver-table">
                  <i>id</i>
                  <i>name</i>
                </div>
              </div>
              <div class="lh-arrow-h"><Arrow direction="right" tone="amber" label="add col" /></div>
              <div class="lh-ver">
                <span class="lh-mono">Version 2</span>
                <div class="lh-ver-table">
                  <i>id</i>
                  <i>name</i>
                  <i class="lh-new">email</i>
                </div>
              </div>
              <div class="lh-arrow-h"><Arrow direction="right" tone="amber" label="add col" /></div>
              <div class="lh-ver">
                <span class="lh-mono">Version 3</span>
                <div class="lh-ver-table">
                  <i>id</i>
                  <i>name</i>
                  <i>email</i>
                  <i class="lh-new">phone</i>
                </div>
              </div>
            </div>
            <span class="lh-mono">файлы на диске не переписываются</span>
          </Panel>
        </div>
      </div>
    </section>

    <!-- scene 7: layer 3 — shared catalog -->
    <section class="lh-scene" data-scene={7} aria-label="Сцена 7">
      <div class="lh-scene7">
        <StatusBadge tone="success" label="Single Source of Truth" icon="thumbsup" class="lh-sot" />

        <div class="lh-engines">
          <div class="lh-engine lh-engine--amber"><Icon name="rabbit" size={20} /> <span>Trino</span></div>
          <div class="lh-engine lh-engine--blue"><Icon name="spark" size={20} /> <span>Apache Spark</span></div>
          <Panel label="BI Dashboard" icon="dashboard" tone="green" class="lh-bi">
            <div class="lh-arrow-v"><Arrow direction="up" tone="green" label="queries" /></div>
          </Panel>
        </div>

        <div class="lh-arrow-h lh-arrow-wide"><Arrow tone="amber" label="SELECT orders" /></div>

        <Panel label="Shared Catalog" icon="catalog" tone="amber" class="lh-catalog">
          <div class="lh-cat-table">
            <div class="lh-cat-row lh-cat-head"><span>Orders</span><span>schema</span><span>current</span></div>
            <div class="lh-cat-row"><span>v1</span><span>legacy</span><span>—</span></div>
            <div class="lh-cat-row lh-cat-row--cur"><span>v2</span><span>+ email</span><span>→</span></div>
            <div class="lh-cat-row"><span>v3</span><span>+ phone</span><span>—</span></div>
          </div>
          <span class="lh-mono lh-mono--cur">Current_Version: v2</span>
        </Panel>

        <div class="lh-arrow-h lh-arrow-wide"><Arrow tone="blue" label="reads v2" /></div>

        <Panel label="Lakehouse Storage" icon="object-storage" tone="blue" class="lh-versions-panel">
          <div class="lh-versions">
            <div class="lh-ver-chip bbg-dim">Order_v1</div>
            <div class="lh-ver-chip lh-ver-chip--cur">Order_v2</div>
            <div class="lh-ver-chip">Order_v3</div>
          </div>
        </Panel>
      </div>
    </section>

    <!-- scene 8: layer 4 — governance -->
    <section class="lh-scene" data-scene={8} aria-label="Сцена 8">
      <div class="lh-scene8">
        <div class="lh-chain">
          <div class="lh-engine lh-engine--amber"><Icon name="rabbit" size={14} /> <span>Trino</span></div>
          <div class="lh-engine lh-engine--blue"><Icon name="spark" size={14} /> <span>Spark</span></div>
          <div class="lh-arrow-h"><Arrow tone="amber" /></div>
          <Panel label="Governance" icon="governance" tone="amber" class="lh-gov">
            <span class="lh-mono">политики · права · lineage</span>
          </Panel>
          <div class="lh-arrow-h"><Arrow tone="amber" /></div>
          <Panel label="Shared Catalog" icon="catalog">
            <span class="lh-mono">Current_Version: v2</span>
          </Panel>
          <div class="lh-arrow-h"><Arrow tone="blue" /></div>
          <Panel label="Lakehouse Storage" icon="object-storage" tone="blue">
            <span class="lh-mono">v1 · v2 · v3</span>
          </Panel>
        </div>

        <div class="lh-blocked">
          <Arrow dashed tone="red" blocked label="прямой доступ к хранилищу — запрещён" />
        </div>

        <div class="lh-gov-questions">
          <div class="lh-q"><Icon name="question" size={12} /> What datasets exist?</div>
          <div class="lh-q"><Icon name="question" size={12} /> Where did they come from?</div>
          <div class="lh-q"><Icon name="question" size={12} /> Who can read sensitive payment fields?</div>
        </div>

        <div class="lh-solutions">
          <div class="lh-logo"><Icon name="lock" size={13} /> AWS Lake Formation</div>
          <div class="lh-logo"><Icon name="catalog" size={13} /> Databricks Unity Catalog</div>
        </div>
      </div>
    </section>

    <!-- scene 9: unified workloads -->
    <section class="lh-scene" data-scene={9} aria-label="Сцена 9">
      <div class="lh-scene9">
        <div class="lh-workloads">
          <div class="lh-wl lh-wl--amber"><Icon name="gear" size={14} /> <span>Batch Processing</span></div>
          <div class="lh-wl lh-wl--blue"><Icon name="refresh" size={14} /> <span>Stream Processing</span></div>
          <div class="lh-wl lh-wl--green"><Icon name="model" size={14} /> <span>Machine Learning</span></div>
        </div>

        <div class="lh-wl-arrows">
          <div class="lh-arrow-h"><Arrow tone="amber" /></div>
          <div class="lh-arrow-h"><Arrow tone="amber" /></div>
          <div class="lh-arrow-h"><Arrow tone="amber" /></div>
        </div>

        <Panel label="Lakehouse — один слой данных" icon="data-lakehouse" tone="blue" class="lh-layer-stack">
          <div class="lh-stack-row">
            <div class="lh-stack-chip lh-stack-chip--blue"><Icon name="object-storage" size={13} /> Storage</div>
            <div class="lh-arrow-h"><Arrow tone="blue" /></div>
            <div class="lh-stack-chip lh-stack-chip--green"><Icon name="iceberg" size={13} /> Table Formats</div>
            <div class="lh-arrow-h"><Arrow tone="blue" /></div>
            <div class="lh-stack-chip"><Icon name="catalog" size={13} /> Shared Catalog</div>
            <div class="lh-arrow-h"><Arrow tone="blue" /></div>
            <div class="lh-stack-chip lh-stack-chip--amber"><Icon name="governance" size={13} /> Governance</div>
          </div>
        </Panel>

        <div class="lh-plate lh-plate--row">
          <StatusBadge tone="success" label="No Duplication — один слой данных для всех нагрузок" icon="thumbsup" />
        </div>
      </div>
    </section>

    <!-- scene 10: the price of the architecture -->
    <section class="lh-scene" data-scene={10} aria-label="Сцена 10">
      <div class="lh-scene10">
        <Panel label="Problem 1 — мелкие файлы" icon="log" tone="amber" class="lh-p10">
          <div class="lh-files-grid">
            {#each TINY_FILES as _}
              <Icon name="log" size={13} />
            {/each}
          </div>
          <div class="lh-compact">
            <Spinner tone="amber" size={16} />
            <div class="lh-arrow-h"><Arrow tone="amber" label="scheduled" /></div>
            <Panel label="Schedule — compaction" icon="clock" variant="inset">
              <StatusBadge tone="running" label="уплотняет в крупные файлы" />
            </Panel>
            <div class="lh-arrow-h"><Arrow direction="down" tone="green" label="merge" /></div>
            <div class="lh-file-big"><Icon name="parquet" size={22} /></div>
          </div>
        </Panel>

        <Panel label="Problem 2 — конфликт типов данных" icon="database" tone="amber" class="lh-p10">
          <div class="lh-orders">
            <div class="lh-cat-row lh-cat-head"><span>Orders Table</span><span>created_at</span></div>
            <div class="lh-cat-row"><span>#1001</span><span>12:00 UTC</span></div>
            <div class="lh-cat-row"><span>#1002</span><span>07:00 EST</span></div>
          </div>
          <StatusBadge tone="warning" label="Data Type Standards Required" pulse />
          <div class="lh-conflict">
            <div class="lh-engine lh-engine--blue"><Icon name="spark" size={13} /> <span>Spark — UTC</span></div>
            <div class="lh-arrow-h"><Arrow direction="left" tone="blue" label="writes" /></div>
            <span class="lh-mono">одна колонка — разные типы</span>
            <div class="lh-arrow-h"><Arrow direction="right" tone="amber" label="reads" /></div>
            <div class="lh-engine lh-engine--amber"><Icon name="rabbit" size={13} /> <span>Trino — EST</span></div>
          </div>
        </Panel>

        <div class="lh-trade">
          <StatusBadge tone="success" label="Flexibility · Scale" icon="thumbsup" />
          <Divider label="trade-off" tone="amber" />
          <StatusBadge tone="error" label="Platform Engineering Time" icon="thumbsdown" />
        </div>
      </div>
    </section>

    <!-- scene 11: decision matrix -->
    <section class="lh-scene" data-scene={11} aria-label="Сцена 11">
      <div class="lh-scene11">
        <div class="lh-constraint">
          <Icon name="compass" size={14} />
          Финальный выбор <span>— какую архитектуру и когда брать</span>
        </div>

        <Comparison columns={3}>
          <Panel label="Data Warehouse" icon="data-warehouse" badge="Redshift / BigQuery">
            <StatusBadge tone="success" label="Fast analytics" />
            <StatusBadge tone="warning" label="Expensive — дорого" />
            <span class="lh-mono">данные уже очищены и смоделированы</span>
          </Panel>
          <Panel label="Data Lake" icon="data-lake" tone="blue" badge="Raw Logs / Images">
            <StatusBadge tone="success" label="Cheap storage" />
            <StatusBadge tone="warning" label="Fewer guarantees" />
            <span class="lh-mono">дёшево хранит всё, но без транзакций</span>
          </Panel>
          <Panel label="Data Lakehouse" icon="data-lakehouse" tone="green" badge="рекомендация" class="lh-pick">
            <StatusBadge tone="success" label="Scale + Reliability" icon="thumbsup" />
            <StatusBadge tone="warning" label="Engineering effort" />
            <span class="lh-mono">масштаб и надёжность — за инженерную работу</span>
          </Panel>
        </Comparison>

        <div class="lh-knobs">
          <div class="lh-knob">
            <span class="lh-knob-label"><Icon name="console" size={13} /> Team Size</span>
            <div class="lh-knob-bar"><span class="lh-knob-mark" style="left: 42%"></span></div>
            <span class="lh-mono">маленькая команда → проще начать с Lake</span>
          </div>
          <div class="lh-knob">
            <span class="lh-knob-label"><Icon name="queue" size={13} /> Workloads</span>
            <div class="lh-knob-bar"><span class="lh-knob-mark" style="left: 58%"></span></div>
            <span class="lh-mono">и SQL, и ML → нужен Lakehouse</span>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ══════════ HUD: top bar ══════════ -->
  <div class="lh-hud lh-hud--top">
    <a class="lh-exit" href="#gallery">← SysDiag UI Kit</a>
    <span class="lh-title">What is a Data Lakehouse?</span>
    <div class="lh-dots" role="tablist" aria-label="сцены">
      {#each SCENES as scene, i (i)}
        <button
          class="lh-dot"
          class:lh-dot--on={i === active}
          aria-label={`Сцена ${i} — ${scene.title}`}
          onclick={() => goTo(i)}
        ></button>
      {/each}
    </div>
    <span class="lh-count">{String(active).padStart(2, '0')} / {SCENES.length}</span>
    <span class="lh-time">{SCENES[active].timecode}</span>
  </div>

  <!-- ══════════ HUD: bottom bar ══════════ -->
  <div class="lh-hud lh-hud--bottom">
    <div class="lh-goal">
      <span class="lh-scene-no">Сцена {active} · {SCENES[active].title}</span>
      <span class="lh-goal-text">{SCENES[active].goal}</span>
    </div>
    <div class="lh-nav">
      <span class="lh-hint">← →</span>
      <button class="lh-btn" onclick={() => goTo(active - 1)} aria-label="предыдущая сцена" disabled={active === 0}>
        <Icon name="chevron-left" size={22} />
      </button>
      <button
        class="lh-btn"
        onclick={() => goTo(active + 1)}
        aria-label="следующая сцена"
        disabled={active === SCENES.length - 1}
      >
        <Icon name="chevron-right" size={22} />
      </button>
    </div>
  </div>
</div>

<style>
  /* ── fullscreen deck ─────────────────────────────────────── */
  .lh-root {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: var(--bbg-bg);
  }

  .lh-viewport {
    display: flex;
    height: 100%;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
  }

  .lh-viewport::-webkit-scrollbar {
    display: none;
  }

  .lh-scene {
    flex: 0 0 100%;
    width: 100%;
    height: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    overflow-y: auto;
    /* seam net: no scene content may bleed into the next scene's frame */
    overflow-x: clip;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 78px 96px 66px;
    background:
      radial-gradient(1100px 700px at 50% 0%, rgba(79, 168, 224, 0.05), transparent 60%),
      var(--bbg-bg);
  }

  /* ── HUD ─────────────────────────────────────────────────── */
  .lh-hud {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 22px;
    background: rgba(18, 18, 18, 0.85);
    backdrop-filter: blur(8px);
  }

  .lh-hud--top {
    top: 0;
    height: 72px;
    border-bottom: 1px solid var(--bbg-border);
  }

  .lh-hud--bottom {
    bottom: 0;
    height: 78px;
    border-top: 1px solid var(--bbg-border);
  }

  .lh-exit {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
    text-decoration: none;
    white-space: nowrap;
  }

  .lh-exit:hover {
    color: var(--bbg-amber);
  }

  .lh-title {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: var(--bbg-ink);
    white-space: nowrap;
  }

  .lh-dots {
    display: flex;
    gap: 10px;
    margin: 0 auto;
    align-items: center;
  }

  .lh-dot {
    width: 11px;
    height: 11px;
    border: none;
    border-radius: 50%;
    padding: 0;
    background: var(--bbg-border-strong);
    cursor: pointer;
    transform: scaleX(1);
    transition: transform 0.2s ease, background 0.2s ease;
  }

  .lh-dot:hover {
    background: var(--bbg-ink-soft);
  }

  .lh-dot--on {
    transform: scaleX(3.1);
    border-radius: 999px;
    background: var(--bbg-amber);
  }

  .lh-count {
    font-family: var(--bbg-font-mono);
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--bbg-amber);
    white-space: nowrap;
  }

  .lh-time {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    letter-spacing: 0.06em;
    color: var(--bbg-ink);
    white-space: nowrap;
  }

  .lh-goal {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .lh-scene-no {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--bbg-amber);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .lh-goal-text {
    font-size: 18px;
    line-height: 1.45;
    color: var(--bbg-ink);
  }

  .lh-nav {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    flex: none;
  }

  .lh-hint {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-ink);
    white-space: nowrap;
  }

  .lh-btn {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    border: 1px solid var(--bbg-border);
    background: var(--bbg-panel);
    color: var(--bbg-ink);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
  }

  .lh-btn:hover:not(:disabled) {
    border-color: var(--bbg-border-strong);
    color: var(--bbg-amber);
  }

  .lh-btn:disabled {
    opacity: 0.3;
    cursor: default;
  }

  /* ── shared bits ─────────────────────────────────────────── */
  .lh-constraint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: var(--bbg-ink);
  }

  .lh-constraint :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-constraint span {
    color: var(--bbg-ink);
    font-weight: 400;
  }

  .lh-mono {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    letter-spacing: 0.05em;
    color: var(--bbg-ink);
  }

  .lh-caption {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-ink);
  }

  .lh-arrow-h {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 48px;
  }

  .lh-arrow-v {
    height: 28px;
    display: flex;
  }

  .lh-arrow-wide {
    min-width: 84px;
  }

  .lh-plate {
    align-self: center;
  }

  .lh-plate--row {
    grid-column: 1 / -1;
    justify-self: center;
  }

  /* ── scene 0: intro ──────────────────────────────────────── */
  .lh-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
  }

  .lh-hero {
    font-size: var(--bbg-type-display);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.05;
    text-align: center;
  }

  .lh-hero-accent {
    color: var(--bbg-amber);
  }

  .lh-sub {
    font-family: var(--bbg-font-mono);
    font-size: 14px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--bbg-ink);
  }

  .lh-arch-row {
    display: flex;
    gap: 40px;
    align-items: stretch;
  }

  .lh-arch {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 40px 48px;
    background: var(--bbg-panel);
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius);
    min-width: 300px;
  }

  .lh-arch :global(svg) {
    color: var(--bbg-ink-soft);
  }

  .lh-arch--focus {
    border-color: var(--bbg-amber-border);
    box-shadow: 0 0 0 1px var(--bbg-amber-border);
  }

  .lh-arch--focus :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-arch-name {
    font-size: 22px;
    font-weight: 600;
    color: var(--bbg-ink);
  }

  .lh-arch-role {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    font-weight: 400;
  }

  .lh-q-chip {
    position: absolute;
    top: -16px;
    right: -8px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bbg-amber-dim);
    border: 1px solid var(--bbg-amber-border);
    border-radius: 999px;
    padding: 6px 14px;
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--bbg-amber);
    white-space: nowrap;
  }

  /* ── scene 1: warehouse vs lake ──────────────────────────── */
  .lh-scene1 {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: min(1020px, 100%);
  }

  .lh-split {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: stretch;
    gap: 14px;
  }

  :global(.lh-half) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lh-flow {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lh-step {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 5px 12px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  .lh-flow--green :global(svg) {
    color: var(--bbg-green);
  }

  .lh-flow--blue :global(svg) {
    color: var(--bbg-blue);
  }

  .lh-step--actor {
    gap: 12px;
    justify-content: center;
  }

  .lh-files {
    display: flex;
    gap: 6px;
  }

  .lh-half-caption {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .lh-half-caption--green {
    color: var(--bbg-green);
  }

  .lh-half-caption--blue {
    color: var(--bbg-blue);
  }

  /* ── scene 2: two systems, one engineer ──────────────────── */
  .lh-scene2 {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: min(1000px, 100%);
  }

  :global(.lh-src) {
    align-self: center;
    width: min(560px, 100%);
  }

  .lh-src-row {
    display: flex;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .lh-datachip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 5px 12px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
  }

  .lh-datachip :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-split-row {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: stretch;
    gap: 14px;
  }

  .lh-branch {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-sys {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-warn-float {
    position: absolute;
    top: -11px;
    right: 14px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--bbg-amber-dim);
    border: 1px solid var(--bbg-amber-border);
    color: var(--bbg-amber);
    animation: lh-warn-pulse 2s ease-in-out infinite;
  }

  @keyframes lh-warn-pulse {
    0%,
    100% {
      box-shadow: 0 0 0 0 rgba(245, 185, 61, 0);
    }
    50% {
      box-shadow: 0 0 0 6px rgba(245, 185, 61, 0.15);
    }
  }

  .lh-sync {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 110px;
  }

  .lh-sync-loop {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
  }

  .lh-sync-loop .lh-arrow-h {
    height: 16px;
  }

  .lh-pain-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }

  .lh-pain-caption {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-amber);
  }

  /* ── scene 3: the paradigm ───────────────────────────────── */
  .lh-scene3 {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: min(1040px, 100%);
  }

  .lh-merge {
    display: grid;
    grid-template-columns: 1fr 88px 1.3fr 88px 1fr;
    align-items: stretch;
    gap: 0 10px;
  }

  :global(.lh-merge-side) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }

  :global(.lh-merge-hub) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-color: var(--bbg-amber-border);
    box-shadow: 0 0 0 1px var(--bbg-amber-border);
  }

  .lh-hub-row {
    display: flex;
    gap: 10px;
  }

  .lh-hub-row :global(svg:first-child) {
    color: var(--bbg-green);
  }

  .lh-hub-row :global(svg:last-child) {
    color: var(--bbg-blue);
  }

  :global(.lh-hub-icon) {
    color: var(--bbg-amber);
  }

  /* ── scene 4: storage & compute ──────────────────────────── */
  .lh-scene4 {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(880px, 100%);
  }

  :global(.lh-src-sm) {
    align-self: center;
    width: min(340px, 100%);
  }

  .lh-storage-cols {
    display: grid;
    grid-template-columns: 1fr 88px 1fr;
    align-items: center;
    gap: 10px;
  }

  .lh-files-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--bbg-bg);
    border: 1px dashed var(--bbg-border-strong);
    border-radius: 8px;
    padding: 10px;
  }

  .lh-files-cap {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
  }

  .lh-files-box :global(svg) {
    color: var(--bbg-blue);
  }

  .lh-arrows-up {
    display: flex;
    gap: 8px;
  }

  .lh-arrows-up .lh-arrow-v {
    height: 26px;
    flex: 1;
  }

  :global(.lh-spark) {
    align-self: center;
    width: min(360px, 100%);
  }

  /* ── scene 5: the object storage problem ─────────────────── */
  .lh-scene5 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: stretch;
    gap: 16px;
    width: min(960px, 100%);
  }

  .lh-write {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 10px;
    background: var(--bbg-bg);
    border: 1px dashed var(--bbg-border-strong);
    border-radius: 8px;
  }

  .lh-write :global(svg) {
    color: var(--bbg-blue);
  }

  .lh-file-small {
    opacity: var(--bbg-dim-opacity);
  }

  .lh-file-target {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lh-break {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .lh-break > :global(svg:first-child) {
    color: var(--bbg-red);
  }

  .lh-break .lh-arrow-h {
    width: 100%;
  }

  .lh-reader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  /* ── scene 6: open table formats ─────────────────────────── */
  .lh-scene6 {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 18px;
    align-items: stretch;
    width: min(1020px, 100%);
  }

  .lh-col6-main {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lh-col6-right {
    display: flex;
  }

  .lh-col6-right > :global(*) {
    flex: 1;
  }

  .lh-logos {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .lh-logo {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 8px 14px;
  }

  .lh-logo :global(svg) {
    color: var(--bbg-green);
  }

  .lh-hood {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .lh-hood-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 12px 8px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    text-align: center;
  }

  .lh-hood-card :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-tx {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lh-tx-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 7px 12px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    white-space: nowrap;
  }

  .lh-tx-chip :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-tx-v {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .lh-versions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-ver {
    display: flex;
    flex-direction: column;
    gap: 6px;
    align-items: center;
    padding: 8px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
  }

  .lh-ver-table {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
  }

  .lh-ver-table i {
    font-style: normal;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    background: var(--bbg-bg);
    border: 1px solid var(--bbg-border);
    border-radius: 4px;
    padding: 3px 8px;
  }

  .lh-ver-table .lh-new {
    border-color: var(--bbg-amber-border);
    color: var(--bbg-amber);
    background: var(--bbg-amber-dim);
  }

  /* ── scene 7: shared catalog ─────────────────────────────── */
  .lh-scene7 {
    display: grid;
    grid-template-columns: 280px minmax(150px, 200px) minmax(320px, 1fr) minmax(150px, 200px) minmax(280px, 1fr);
    align-items: stretch;
    gap: 0 14px;
    width: min(1400px, 100%);
  }

  :global(.lh-sot) {
    grid-column: 1 / -1;
    justify-self: center;
    margin-bottom: 10px;
    height: 44px;
    padding: 0 24px;
  }

  :global(.lh-sot .bbg-badge__label) {
    font-size: 18px;
  }

  :global(.lh-sot .bbg-badge__icon) {
    width: 20px;
    height: 20px;
  }

  .lh-engines {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }

  .lh-engine {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    font-weight: 600;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 10px;
    padding: 11px 18px;
    white-space: nowrap;
  }

  .lh-engine--amber :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-engine--blue :global(svg) {
    color: var(--bbg-blue);
  }

  :global(.lh-bi) .lh-arrow-v {
    height: 28px;
  }

  :global(.lh-catalog) {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-cat-table {
    font-family: var(--bbg-font-mono);
    font-size: 12.5px;
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    overflow: hidden;
  }

  .lh-cat-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 14px;
    border-top: 1px solid var(--bbg-border);
    color: var(--bbg-ink);
  }

  .lh-cat-row:first-child {
    border-top: none;
  }

  .lh-cat-head {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
  }

  .lh-cat-row--cur {
    background: var(--bbg-amber-dim);
    color: var(--bbg-amber);
  }

  .lh-mono--cur {
    color: var(--bbg-amber);
    font-weight: 600;
  }

  :global(.lh-versions-panel) .lh-ver-chip {
    text-align: center;
  }

  .lh-ver-chip {
    font-family: var(--bbg-font-mono);
    font-size: 13px;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 10px;
    padding: 11px 18px;
  }

  .lh-ver-chip--cur {
    border-color: var(--bbg-amber-border);
    background: var(--bbg-amber-dim);
    color: var(--bbg-amber);
    font-weight: 600;
  }

  /* ── scene 8: governance ─────────────────────────────────── */
  .lh-scene8 {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: min(1060px, 100%);
  }

  .lh-chain {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :global(.lh-gov) {
    flex: 1.4;
    text-align: center;
  }

  .lh-chain .lh-arrow-h {
    min-width: 30px;
  }

  .lh-blocked {
    display: flex;
    padding: 0 30px;
  }

  .lh-gov-questions {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .lh-q {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px dashed var(--bbg-border-strong);
    border-radius: 999px;
    padding: 5px 13px;
  }

  .lh-q :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-solutions {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .lh-solutions .lh-logo :global(svg) {
    color: var(--bbg-amber);
  }

  /* ── scene 9: unified workloads ──────────────────────────── */
  .lh-scene9 {
    display: grid;
    grid-template-columns: auto 44px 1fr;
    gap: 10px;
    align-items: center;
    width: min(940px, 100%);
  }

  .lh-workloads {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-wl {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 7px 12px;
    white-space: nowrap;
  }

  .lh-wl--amber :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-wl--blue :global(svg) {
    color: var(--bbg-blue);
  }

  .lh-wl--green :global(svg) {
    color: var(--bbg-green);
  }

  .lh-wl-arrows {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-self: stretch;
    justify-content: center;
  }

  .lh-stack-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lh-stack-chip {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    flex: 0 0 auto;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--bbg-ink);
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
    padding: 7px 10px;
    white-space: nowrap;
  }

  .lh-stack-chip :global(svg) {
    flex: none;
  }

  .lh-stack-chip--blue {
    border-color: var(--bbg-blue-border);
  }
  .lh-stack-chip--blue :global(svg) {
    color: var(--bbg-blue);
  }

  .lh-stack-chip--green {
    border-color: var(--bbg-green-border);
  }
  .lh-stack-chip--green :global(svg) {
    color: var(--bbg-green);
  }

  .lh-stack-chip--amber {
    border-color: var(--bbg-amber-border);
  }
  .lh-stack-chip--amber :global(svg) {
    color: var(--bbg-amber);
  }

  /* ── scene 10: the price ─────────────────────────────────── */
  .lh-scene10 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    align-items: stretch;
    width: min(1060px, 100%);
  }

  :global(.lh-p10) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .lh-files-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 6px;
    padding: 10px;
    background: var(--bbg-panel-inset);
    border: 1px solid var(--bbg-border);
    border-radius: 8px;
  }

  .lh-files-grid :global(svg) {
    color: var(--bbg-ink-faint);
    justify-self: center;
  }

  .lh-compact {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lh-file-big {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    flex: none;
    background: var(--bbg-green-dim);
    border: 1px solid var(--bbg-green-border);
    border-radius: 8px;
    color: var(--bbg-green);
  }

  .lh-orders {
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    border: 1px solid var(--bbg-border);
    border-radius: var(--bbg-radius-sm);
    overflow: hidden;
  }

  .lh-conflict {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .lh-trade {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
  }

  /* ── scene 11: decision matrix ───────────────────────────── */
  .lh-scene11 {
    display: flex;
    flex-direction: column;
    gap: 18px;
    width: min(1020px, 100%);
  }

  :global(.lh-pick) {
    border-color: var(--bbg-amber-border);
    box-shadow: 0 0 0 1px var(--bbg-amber-border);
  }

  .lh-knobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .lh-knob {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lh-knob-label {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--bbg-font-mono);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--bbg-ink);
  }

  .lh-knob-label :global(svg) {
    color: var(--bbg-amber);
  }

  .lh-knob-bar {
    position: relative;
    height: 6px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--bbg-border-strong), var(--bbg-amber));
  }

  .lh-knob-mark {
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background: var(--bbg-amber);
    border: 2px solid var(--bbg-bg);
    border-radius: 2px;
    transform: translate(-50%, -50%) rotate(45deg);
  }

  /* ── small screens: collapse dense grids ─────────────────── */
  @media (max-width: 900px) {
    .lh-scene {
      padding: 70px 26px 64px;
    }

    .lh-center {
      gap: 20px;
    }

    .lh-hero {
      font-size: 40px;
    }

    .lh-arch-row {
      flex-direction: column;
      gap: 12px;
    }

    .lh-arch {
      padding: 24px 28px;
      min-width: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .lh-arch-name {
      font-size: 20px;
    }

    .lh-goal-text {
      font-size: 16px;
    }

    .lh-scene-no {
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
      line-height: 1.3;
    }

    .lh-engine,
    .lh-ver-chip {
      padding: 9px 14px;
    }

    .lh-cat-row {
      padding: 6px 12px;
    }

    .lh-engines {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    /* scene 7 only: storage version chips go horizontal on mobile.
       scene 6's version cards keep their vertical stack — a row of
       three cards + arrows has a min-content wider than the panel. */
    :global(.lh-versions-panel .lh-versions) {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }

    .lh-tx {
      flex-wrap: wrap;
      justify-content: center;
    }

    :global(.lh-sot) {
      height: 38px;
      padding: 0 18px;
      margin-bottom: 6px;
    }

    :global(.lh-sot .bbg-badge__label) {
      font-size: 16px;
    }

    .lh-split,
    .lh-split-row,
    .lh-scene5,
    .lh-scene6,
    .lh-scene10,
    .lh-knobs {
      grid-template-columns: 1fr;
    }

    .lh-merge {
      grid-template-columns: 1fr;
    }

    .lh-scene7 {
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .lh-scene9 {
      grid-template-columns: 1fr;
    }

    /* collapse the auto track minimum so 1fr tracks shrink to the viewport
       and nowrap rows wrap instead of overflowing the scene frame */
    .lh-split > *,
    .lh-split-row > *,
    .lh-scene5 > *,
    .lh-scene6 > *,
    .lh-scene10 > *,
    .lh-knobs > *,
    .lh-merge > *,
    .lh-scene9 > * {
      min-width: 0;
    }

    .lh-hint {
      display: none;
    }

    .lh-title {
      display: none;
    }
  }
</style>
