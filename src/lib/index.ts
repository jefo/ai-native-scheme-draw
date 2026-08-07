// Visual Narrative Library — barrel export
// Таксономия v2: Semantic Objects + Predicates (HoC) + Scene

// Semantic Objects — что существует
export { default as Entity } from './objects/Entity.svelte';
export { default as Relation } from './objects/Relation.svelte';
export { default as State } from './objects/State.svelte';
export { default as Value } from './objects/Value.svelte';
export { default as Event } from './objects/Event.svelte';

// Layout Predicates — information design (структурный layout содержимого)
export { default as Flow } from './predicates/layout/Flow.svelte';
export { default as Compare } from './predicates/layout/Compare.svelte';
export { default as Containment } from './predicates/layout/Containment.svelte';
export { default as Hierarchy } from './predicates/layout/Hierarchy.svelte';
export { default as Timeline } from './predicates/layout/Timeline.svelte';
export { default as Cycle } from './predicates/layout/Cycle.svelte';
export { default as TradeOff } from './predicates/layout/TradeOff.svelte';

// Attention Predicates — механики внимания (преобразования над содержимым)
export { default as Focus } from './predicates/attention/Focus.svelte';
export { default as Reveal } from './predicates/attention/Reveal.svelte';
export { default as Highlight } from './predicates/attention/Highlight.svelte';
export { default as Dim } from './predicates/attention/Dim.svelte';

// Icons — domain-specific outline icons (25 icons, Phosphor/Lucide style)
export { default as Icon } from './icons/Icon.svelte';

// Scene — Visual Thought Unit (семантическая композиция)
export { default as Scene } from './scene/Scene.svelte';

// Organisms — domain-specific HoC compositions (service, infra, devops, AI)
export { default as ServiceNode } from './organisms/ServiceNode.svelte';
export { default as InfraNode } from './organisms/InfraNode.svelte';
export { default as Pipeline } from './organisms/Pipeline.svelte';
export { default as DeployDiff } from './organisms/DeployDiff.svelte';
export { default as ModelCard } from './organisms/ModelCard.svelte';

// Canvases — стратегические организмы (Miro-style, 16:9)
export { default as StickyNote } from './canvases/atoms/StickyNote.svelte';
export { default as ValuePropositionCanvas } from './canvases/ValuePropositionCanvas.svelte';
