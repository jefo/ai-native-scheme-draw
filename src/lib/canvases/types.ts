/** Общие типы канвасов — формализованных систем мышления. */

/** Тип ребра в фич-диаграмме (FODA-нотация):
 *  mandatory ● / optional ○ / alternative ○ (1 of N) / excluded ✕ */
export type FeatureKind = 'mandatory' | 'optional' | 'alternative' | 'excluded';

/** Узел дерева фич. Рекурсивный: children — подфичи. */
export interface FeatureTree {
  label: string;
  kind?: FeatureKind;
  children?: FeatureTree[];
}

/** Вариант в строке trade-off матрицы: выбранный (chosen) или пожертвованный. */
export interface TradeOffOption {
  label: string;
  chosen?: boolean;
}

/** Строка trade-off матрицы: одно решение и его варианты. */
export interface TradeOffRow {
  /** Вопрос/решение. */
  decision: string;
  /** Варианты — ровно один помечен chosen. */
  options: TradeOffOption[];
  /** Почему выбрали именно так (необязательно). */
  note?: string;
}

/* ═══ Positioning Map grammar — операция мышления: сравнить / противопоставить ═══ */

/** Координата на карте: число 0–100 (%) или семантическая ступень. */
export type MapValue = number | 'low' | 'medium' | 'high';

/** Состояние игрока на карте позиционирования. */
export type PlayerState =
  | 'default'    // нейтральная точка
  | 'focus'      // ключевой игрок («мы»)
  | 'competitor' // конкурент
  | 'reference'  // референс для сравнения
  | 'unknown'    // неопределившийся
  | 'emerging';  // входит на рынок

/** Ось карты: имя + подписи концов. Геометрию (линию, сетку) рисует канвас. */
export interface MapAxisDef {
  id: 'x' | 'y';
  label: string;
  low: string;
  high: string;
}

/** Территория — зона рынка на карте (тонированная область). */
export interface MapTerritoryDef {
  x: number;
  y: number;
  label: string;
  width?: number;
  height?: number;
  tone?: 'cyan' | 'violet' | 'amber' | 'mint' | 'rose' | 'orange';
}

/** Игрок — участник рынка. Регистрируется на канвасе по name. */
export interface MapPlayerDef {
  name: string;
  x: MapValue;
  y: MapValue;
  state?: PlayerState;
}

/** Натяжение — конфликт между двумя игроками. Точки связываются по имени,
 *  геометрию (линию, подпись) решает канвас. */
export interface MapTensionDef {
  between: [string, string];
  label?: string;
}

/** Вектор — направление движения игрока (к точке или к другому игроку). */
export interface MapVectorDef {
  from: string;
  to: string | { x: MapValue; y: MapValue };
  label?: string;
}
