<script lang="ts">
  import {
    Entity,
    Relation,
    Value,
    Compare,
    Containment,
    Scene,
    State,
  } from './lib/index.ts';
  import './lib/themes/brutalist.css';
</script>

<section class="bdemo">
  <header class="bdemo__poster">
    <span class="bdemo__mono">VISUAL NARRATIVE LIBRARY // THEME 02</span>
    <h2 class="bdemo__title">BRUTAL<br />GRAMMAR</h2>
    <p class="bdemo__sub">
      explicitness over subtlety · personality over invisibility ·<br />
      memorable structure over perfect polish
    </p>
  </header>

  <div class="theme-brutalist">
    <!-- ═══ СХЕМА ГРАММАТИКИ: Scene = Objects + Predicates ═══ -->
    <div class="bdemo__schema">
      <Scene title="Paradox · AI → DDD">
        <Compare>
          <div class="bdemo__col">
            <Entity label="Code" />
            <Value label="Cost" value={25} direction="down" variant="bar" />
          </div>
          <div class="bdemo__col">
            <Entity label="Model" />
            <Value label="Cost" value={90} direction="up" variant="bar" />
          </div>
        </Compare>
      </Scene>

      <Scene title="State · Broken">
        <Containment label="System">
          <State state="broken"><Entity label="GPU" /></State>
        </Containment>
        <div class="bdemo__reaction">broken ✗</div>
      </Scene>
    </div>

    <!-- ═══ ПРИМИТИВЫ В БРУТАЛИЗМЕ ═══ -->
    <div class="bdemo__primitives">
      <div class="bdemo__row">
        <Entity label="Customer" />
        <Relation label="owns" />
        <Entity label="Order" variant="cube" />
      </div>
      <div class="bdemo__row">
        <Value label="Latency" value={60} unit="ms" direction="down" variant="chart" />
        <Value label="Heat" value={75} variant="thermo" />
      </div>
    </div>
  </div>
</section>

<style>
  .bdemo {
    border-top: 4px solid #000;
    background: #fffdf5;
    padding: 0 0 40px;
  }
  .bdemo__poster {
    background: #000;
    color: #fff;
    padding: 28px 32px;
    margin-bottom: 32px;
  }
  .bdemo__mono {
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #ffd23f;
    letter-spacing: 0.12em;
  }
  .bdemo__title {
    font-family: 'Arial Black', Impact, sans-serif;
    font-size: 52px;
    line-height: 0.9;
    letter-spacing: -0.02em;
    margin: 10px 0 12px;
    color: #fff;
  }
  .bdemo__sub {
    font-family: 'Courier New', monospace;
    font-size: 13px;
    color: #aaa;
  }
  .bdemo__schema {
    display: flex;
    gap: 28px;
    flex-wrap: wrap;
    padding: 0 32px;
    margin-bottom: 36px;
  }
  .bdemo__schema :global(.scene) {
    width: 300px;
    height: 533px;
  }
  .bdemo__col {
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }
  .bdemo__reaction {
    font-family: 'Arial Black', Impact, sans-serif;
    font-size: 15px;
    margin-top: 10px;
    text-align: center;
  }
  .bdemo__primitives {
    padding: 0 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .bdemo__row {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
    border: 3px solid #000;
    padding: 16px;
    box-shadow: 5px 5px 0 0 #000;
    background: #fff;
  }
</style>
