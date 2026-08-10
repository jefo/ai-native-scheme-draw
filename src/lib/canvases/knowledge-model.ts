/**
 * Knowledge Model — semantic source of truth for instructional design.
 *
 * NOT a visual component. This is the data layer: a structured representation
 * of domain knowledge, independent of any visual projection.
 *
 * Architecture:
 *   Knowledge Model → Projection → Framework → Visual Rendering
 *
 * Each projection extracts a different cognitive view from the SAME model:
 *   Capability Projection → what learner must be able to do
 *   Dependency Projection → what must be learned before what
 *   Causal Projection    → why does X lead to Y
 *   Journey Projection   → how does learner discover it
 *   Evidence Projection  → why should learner believe this
 */

/** A named entity in the knowledge domain. */
export interface KnowledgeEntity {
  id: string;
  name: string;
  type: 'concept' | 'capability' | 'actor' | 'event' | 'state' | 'decision' | 'artifact';
  description?: string;
}

/** A typed relationship between two entities. */
export interface KnowledgeRelationship {
  from: string;
  to: string;
  type: 'contains' | 'requires' | 'causes' | 'contradicts' | 'produces' | 'depends-on' | 'is-example-of';
  label?: string;
}

/** A complete knowledge model for one domain. */
export interface KnowledgeModel {
  domain: string;
  description: string;
  entities: KnowledgeEntity[];
  relationships: KnowledgeRelationship[];
}

/* ═══════════════════════════════════════════════════════════════
   RUNWAY KNOWLEDGE MODEL
   ───────────────────────────────────────────────────────────────
   Extracted from: «Не генератор видео. Фабрика.»
   Domain: How to think about an API as a product
   ═══════════════════════════════════════════════════════════════ */

export const runwayKnowledge: KnowledgeModel = {
  domain: 'API как продукт',
  description:
    'Как разработчику перестать видеть список endpoints и начать видеть продукт, который закрывает чью-то работу.',

  entities: [
    // Core concepts
    { id: 'api', name: 'API', type: 'concept', description: 'Программный интерфейс — набор методов и моделей' },
    { id: 'method', name: 'API Method', type: 'concept', description: 'Один endpoint: text-to-video, image-to-video, etc.' },
    { id: 'feature-label', name: 'Feature Label', type: 'concept', description: 'Название технологии: «text-to-video» — обозначение, не понимание' },
    { id: 'capability', name: 'Capability', type: 'capability', description: 'Производственная возможность: что можно производить' },
    { id: 'workflow', name: 'Workflow', type: 'concept', description: 'Повторяемый процесс: цепочка операций, а не одиночный вызов' },
    { id: 'buyer', name: 'Buyer', type: 'actor', description: 'Тот, чью работу закрывает продукт' },
    { id: 'buyer-job', name: 'Buyer Job', type: 'concept', description: 'Работа, которую buyer нанимает продукт выполнить' },
    { id: 'product-shape', name: 'Product Shape', type: 'concept', description: 'Форма продукта: что именно продаётся как повторяемый результат' },
    { id: 'constraint', name: 'Constraint', type: 'concept', description: 'Ограничение API: техническое, экономическое, временно́е' },
    { id: 'cost-structure', name: 'Cost Structure', type: 'concept', description: 'Экономика: старая vs новая модель производства' },
    { id: 'thesis', name: 'Product Thesis', type: 'decision', description: 'Ставка: конкретный buyer + конкретное изменение economics' },

    // Runway-specific
    { id: 'runway', name: 'Runway API', type: 'artifact', description: 'Конкретный API: Gen-4, 5-10 сек видео, production-scale generative media' },
    { id: 'media-generation', name: 'Media Generation', type: 'capability', description: 'Создавать визуальный контент без камеры' },
    { id: 'ad-creative', name: 'Ad Creative Factory', type: 'artifact', description: 'Фабрика креативов для performance marketer' },
    { id: 'perf-marketer', name: 'Performance Marketer', type: 'actor', description: 'Покупатель, которому нужно 100 вариаций креатива' },

    // Learner states (for journey)
    { id: 'confusion', name: 'Confusion', type: 'state', description: 'Ученик видит список методов и думает, что понял' },
    { id: 'cognitive-conflict', name: 'Cognitive Conflict', type: 'state', description: 'Момент: ярлык зачёркнут, старое понимание разрушено' },
    { id: 'model', name: 'Mental Model', type: 'state', description: 'Ученик построил новую модель: API → capability → workflow → buyer → thesis' },
  ],

  relationships: [
    // Structural: what contains what
    { from: 'api', to: 'method', type: 'contains', label: 'exposes' },
    { from: 'runway', to: 'media-generation', type: 'contains', label: 'provides' },
    { from: 'media-generation', to: 'method', type: 'contains', label: 'grouped as' },

    // Contradiction: what disproves what
    { from: 'capability', to: 'feature-label', type: 'contradicts', label: 'replaces' },
    { from: 'workflow', to: 'capability', type: 'contradicts', label: 'одиночный вызов ≠ продукт' },
    { from: 'buyer', to: 'workflow', type: 'contradicts', label: 'workflow без buyer = пет-проект' },

    // Dependency: what requires what
    { from: 'capability', to: 'method', type: 'requires', label: 'группирует' },
    { from: 'workflow', to: 'capability', type: 'requires', label: 'собирается из' },
    { from: 'buyer-job', to: 'buyer', type: 'requires', label: 'принадлежит' },
    { from: 'product-shape', to: 'buyer-job', type: 'requires', label: 'форма для' },
    { from: 'thesis', to: 'buyer', type: 'depends-on', label: 'ставка на' },
    { from: 'thesis', to: 'cost-structure', type: 'depends-on', label: 'economics обосновывает' },

    // Causal: what causes what
    { from: 'feature-label', to: 'confusion', type: 'causes', label: 'создаёт иллюзию понимания' },
    { from: 'capability', to: 'cognitive-conflict', type: 'causes', label: 'разрушает ярлык' },
    { from: 'cognitive-conflict', to: 'model', type: 'causes', label: 'открывает путь к' },

    // Evidence
    { from: 'runway', to: 'ad-creative', type: 'is-example-of', label: 'product shape' },
    { from: 'ad-creative', to: 'perf-marketer', type: 'produces', label: 'закрывает job для' },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   EVENT LOOP KNOWLEDGE MODEL
   ───────────────────────────────────────────────────────────────
   Domain: How the JavaScript Event Loop works
   ═══════════════════════════════════════════════════════════════ */

export const eventLoopKnowledge: KnowledgeModel = {
  domain: 'JavaScript Event Loop',
  description:
    'Как однопоточный JS обрабатывает асинхронные операции — почему setTimeout 0 не мгновенный, а Promise.resolve быстрее.',

  entities: [
    // Core mechanisms
    { id: 'call-stack', name: 'Call Stack', type: 'concept', description: 'LIFO-стек: где выполняется синхронный код. Один поток — один стек.' },
    { id: 'task-queue', name: 'Task Queue', type: 'concept', description: 'Очередь макрозадач: setTimeout, setInterval, I/O, UI events' },
    { id: 'microtask-queue', name: 'Microtask Queue', type: 'concept', description: 'Очередь микрозадач: Promise.then, queueMicrotask, MutationObserver' },
    { id: 'event-loop', name: 'Event Loop', type: 'capability', description: 'Цикл: берёт задачу из очереди, выполняет до опустошения call stack, затем рендер' },
    { id: 'web-apis', name: 'Web APIs', type: 'concept', description: 'Браузерные API: setTimeout, fetch, DOM — работают вне JS-потока' },
    { id: 'render-pipeline', name: 'Render Pipeline', type: 'concept', description: 'Браузерный рендер: style → layout → paint → composite. Выполняется между задачами' },

    // Scheduling primitives
    { id: 'settimeout', name: 'setTimeout', type: 'event', description: 'Планирует макрозадачу: callback попадает в Task Queue через N мс' },
    { id: 'promise', name: 'Promise', type: 'event', description: '.then() планирует микрозадачу — выполняется до следующей макрозадачи' },
    { id: 'rAF', name: 'requestAnimationFrame', type: 'event', description: 'Планирует callback перед render — после microtasks, до следующей макрозадачи' },

    // Mental model components
    { id: 'sync-first', name: 'Sync First', type: 'concept', description: 'Синхронный код всегда выполняется до любого асинхронного' },
    { id: 'micro-before-macro', name: 'Micro before Macro', type: 'concept', description: 'Микрозадачи drain-ятся полностью между макрозадачами' },
    { id: 'raf-after-micro', name: 'rAF after microtasks', type: 'concept', description: 'requestAnimationFrame выполняется после микрозадач, перед render' },
    { id: 'render-between-tasks', name: 'Render between tasks', type: 'concept', description: 'Браузер рендерит между макрозадачами, не во время выполнения' },

    // Learner states
    { id: 'confusion-el', name: 'Confusion', type: 'state', description: 'Ученик видит setTimeout(fn, 0) и думает: «выполнится мгновенно»' },
    { id: 'prediction-el', name: 'Wrong Prediction', type: 'state', description: 'Предсказывает: 1, 2, 3, 4. Получает: 1, 4, 3, 2. Когнитивный конфликт.' },
    { id: 'model-el', name: 'Event Loop Model', type: 'state', description: 'Понимает: call stack → microtasks → macrotasks → render. Может предсказать любой порядок.' },
  ],

  relationships: [
    // Structural
    { from: 'event-loop', to: 'call-stack', type: 'contains', label: 'drives' },
    { from: 'event-loop', to: 'task-queue', type: 'contains', label: 'drains' },
    { from: 'event-loop', to: 'microtask-queue', type: 'contains', label: 'drains first' },
    { from: 'event-loop', to: 'render-pipeline', type: 'contains', label: 'triggers' },
    { from: 'web-apis', to: 'task-queue', type: 'produces', label: 'pushes tasks to' },
    { from: 'web-apis', to: 'microtask-queue', type: 'produces', label: 'pushes microtasks to' },

    // Prerequisites
    { from: 'sync-first', to: 'call-stack', type: 'requires', label: 'понимание' },
    { from: 'micro-before-macro', to: 'sync-first', type: 'requires', label: 'после' },
    { from: 'raf-after-micro', to: 'micro-before-macro', type: 'requires', label: 'после' },
    { from: 'render-between-tasks', to: 'raf-after-micro', type: 'requires', label: 'после' },

    // Causal
    { from: 'call-stack', to: 'microtask-queue', type: 'causes', label: 'опустошается → drain microtasks' },
    { from: 'microtask-queue', to: 'task-queue', type: 'causes', label: 'опустошена → берём macrotask' },
    { from: 'task-queue', to: 'render-pipeline', type: 'causes', label: 'macrotask выполнен → render' },
    { from: 'sync-first', to: 'prediction-el', type: 'causes', label: 'игнорирование → неверный prediction' },
    { from: 'prediction-el', to: 'model-el', type: 'causes', label: 'когнитивный конфликт → модель' },

    // Evidence
    { from: 'micro-before-macro', to: 'promise', type: 'is-example-of', label: 'Promise.then = microtask' },
    { from: 'task-queue', to: 'settimeout', type: 'is-example-of', label: 'setTimeout = macrotask' },
  ],
};
