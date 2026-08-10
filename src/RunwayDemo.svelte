<script lang="ts">
  import {
    Scene,
    CapabilityMap,
    ProcessMap,
    BuyerJobMap,
    DecisionMatrix,
    BeforeAfterEconomics,
    ThesisCard,
  } from './lib/index.ts';
  import './lib/canvases/canvas-theme.css';
</script>

<div class="theme-canvas">
  <div class="rdemo">
    <header class="rdemo__header">
      <h1 class="rdemo__title">Не «генератор видео». Фабрика.</h1>
      <p class="rdemo__sub">Runway API → Product Thesis · 6 reasoning operations</p>
    </header>

    <div class="rdemo__frames">

      <!-- ═══ 1. Feature Label → Capability (grouping) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">1 · Feature Label → Capability · grouping</span>
        <Scene title="Feature Label → Capability">
          <CapabilityMap
            mode="group"
            methods={[
              { name: 'text-to-video' },
              { name: 'image-to-video' },
              { name: 'image generation' },
              { name: 'video editing' },
              { name: 'lipsync' },
              { name: 'upscale' },
            ]}
            capabilities={[
              { name: 'MEDIA GENERATION', description: 'одна производственная возможность' },
            ]}
            provocation="API для генерации видео"
          />
        </Scene>
      </div>

      <!-- ═══ 2. Capability → Workflow (contrast) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">2 · Capability → Workflow · contrast</span>
        <Scene title="Capability → Workflow">
          <ProcessMap
            mode="contrast"
            left={{ kind: 'single', label: 'Как ты думаешь', singleCall: 'text → video', note: 'нажал кнопку — получил результат' }}
            right={{ kind: 'pipeline', label: 'Что это на самом деле', stages: ['бриф', 'генерация', 'правка', 'вариации', 'публикация'], note: 'API вызывается на каждом шаге' }}
          />
        </Scene>
      </div>

      <!-- ═══ 3. Workflow → Buyer (connecting) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">3 · Workflow → Buyer · connecting</span>
        <Scene title="Workflow → Buyer">
          <BuyerJobMap
            memoryLabel="Ты собрал workflow"
            memoryItems={['бриф', 'генерация', 'правка', 'вариации', 'публикация']}
            provocation="Сделаю пет-проект"
            buyers={[
              { role: 'Performance Marketer', job: '100 вариаций креатива — быстро и дёшево', shape: 'фабрика креативов', winner: true },
              { role: 'E-commerce Team', job: 'видео для каждой карточки товара', shape: 'видео-конвейер каталога' },
              { role: 'Content Studio', job: 'серия роликов из скрипта', shape: 'генератор соцклипов' },
            ]}
          />
        </Scene>
      </div>

      <!-- ═══ 4. Product Shape → Constraints (filtering) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">4 · Product Shape → Constraints · filtering</span>
        <Scene title="Product Shape → Constraints">
          <DecisionMatrix
            criteria={[
              'Gen-4: 5–10 сек видео',
              'стабильность персонажа не гарантирована',
              'контролируемость кадра средняя',
              'латентность не real-time',
              'стоимость per-generation',
            ]}
            candidates={[
              { name: 'фабрика креативов', verdict: 'pass', why: '5–10 сек достаточно' },
              { name: 'видео-конвейер', verdict: 'partial', why: 'для соцсетей ок, премиум-каталог — нет' },
              { name: 'генератор соцклипов', verdict: 'fail', why: 'нужна стабильность персонажа' },
            ]}
          />
        </Scene>
      </div>

      <!-- ═══ 5. Constraints → Economics (comparing) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">5 · Constraints → Economics · comparing</span>
        <Scene title="Constraints → Economics">
          <BeforeAfterEconomics
            before={{ label: 'СТУДИЙНОЕ PRODUCTION', price: '$300–500', unit: 'один креатив', throughput: '1–2 в неделю', time: 'дни' }}
            after={{ label: 'API-ФАБРИКА', price: '≈ $0', unit: 'сотни вариаций', throughput: '100 за 5 мин', time: 'секунды' }}
            unitShift={{ from: 'production студии', to: 'marginal cost → 0' }}
          />
        </Scene>
      </div>

      <!-- ═══ 6. Economics → Thesis (synthesizing) ═══ -->
      <div class="rdemo__frame">
        <span class="rdemo__badge">6 · Economics → Thesis · synthesizing</span>
        <Scene title="Economics → Thesis">
          <ThesisCard
            thesis={{
              claim: 'Я верю, что performance marketer-ы готовы платить за сокращение цикла производства креативов в 10 раз',
              buyer: 'performance marketer-ы',
              job: 'сокращение цикла производства креативов',
              stake: 'в 10 раз',
            }}
          />
        </Scene>
      </div>

    </div>
  </div>
</div>

<style>
  .rdemo {
    min-height: 100vh;
    padding: 40px 28px 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }
  .rdemo__header {
    text-align: center;
    max-width: 640px;
  }
  .rdemo__title {
    font-family: var(--vnp-font);
    font-size: 28px;
    font-weight: 700;
    color: var(--canvas-ink);
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }
  .rdemo__sub {
    font-family: var(--vnp-font-mono);
    font-size: 12px;
    font-weight: 500;
    color: var(--canvas-ink-soft);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    margin: 0;
  }

  .rdemo__frames {
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 100%;
    max-width: 1080px;
    align-items: center;
  }
  .rdemo__frame {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .rdemo__badge {
    font-family: var(--vnp-font-mono);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--canvas-ink-soft);
    padding-left: 4px;
  }
  .rdemo__frame :global(.scene) {
    aspect-ratio: 16 / 9;
    height: auto;
  }
</style>
