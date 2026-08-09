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

// Canvases — semantic DSL kits (16:9, Launch Console projection)
export { default as StickyNote } from './canvases/atoms/StickyNote.svelte';
export { default as CanvasSection } from './canvases/molecules/CanvasSection.svelte';
export { default as FeatureNode } from './canvases/atoms/FeatureNode.svelte';
export { default as ValuePropositionCanvas } from './canvases/ValuePropositionCanvas.svelte';
export { default as LeanCanvas } from './canvases/LeanCanvas.svelte';
export { default as FeatureModel } from './canvases/FeatureModel.svelte';
export { default as TradeOffMatrix } from './canvases/TradeOffMatrix.svelte';
export { default as TradeOffRow } from './canvases/molecules/TradeOffRow.svelte';

// Positioning Map grammar — «сравнить / противопоставить»
export { default as PositioningMap } from './canvases/PositioningMap.svelte';
export { default as Axis } from './canvases/atoms/Axis.svelte';
export { default as Territory } from './canvases/atoms/Territory.svelte';
export { default as Player } from './canvases/atoms/Player.svelte';
export { default as Tension } from './canvases/atoms/Tension.svelte';
export { default as Vector } from './canvases/atoms/Vector.svelte';

// Story grammar — «проследить трансформацию» (лёгкий след; полная
// дисциплина Domain Storytelling — вне скоупа: свои примитивы и нотация)
export { default as Story } from './canvases/Story.svelte';
export { default as Actor } from './canvases/atoms/Actor.svelte';
export { default as Action } from './canvases/atoms/Action.svelte';
export { default as Artifact } from './canvases/atoms/Artifact.svelte';
export { default as System } from './canvases/atoms/System.svelte';
export { default as Handoff } from './canvases/atoms/Handoff.svelte';
export { default as Decision } from './canvases/atoms/Decision.svelte';
export { default as Outcome } from './canvases/atoms/Outcome.svelte';

// Roadmap grammar — «показать причинную прогрессию» (каузальный путь, не календарь)
export { default as Roadmap } from './canvases/Roadmap.svelte';
export { default as Horizon } from './canvases/atoms/Horizon.svelte';
export { default as Phase } from './canvases/atoms/Phase.svelte';
export { default as Milestone } from './canvases/atoms/Milestone.svelte';
export { default as Dependency } from './canvases/atoms/Dependency.svelte';

// System Diagram grammar — «показать identity loop» (Capability → Buyer → Product)
export { default as SystemDiagram } from './canvases/SystemDiagram.svelte';

// Customer Profile grammar — «портрет buyer'а» (Role → Metrics → Jobs → Pains → Price)
export { default as CustomerProfile } from './canvases/CustomerProfile.svelte';

// Composition system — Stage → Composition → Organism → Primitive
export { default as Stage } from './canvases/stage/Stage.svelte';
export { default as Stack } from './canvases/layout/Stack.svelte';
export { default as Cluster } from './canvases/layout/Cluster.svelte';
export { default as Split } from './canvases/layout/Split.svelte';
export { default as Grid } from './canvases/layout/Grid.svelte';
export { default as Zone } from './canvases/layout/Zone.svelte';
export { default as Rail } from './canvases/layout/Rail.svelte';
export { default as Frame } from './canvases/layout/Frame.svelte';
export { default as Overlay } from './canvases/layout/Overlay.svelte';
export { default as Divider } from './canvases/atoms/Divider.svelte';

export type {
  FeatureKind,
  FeatureTree,
  TradeOffOption,
  TradeOffRow,
  MapValue,
  PlayerState,
  MapAxisDef,
  MapTerritoryDef,
  MapPlayerDef,
  MapTensionDef,
  MapVectorDef,
  StoryActorDef,
  StoryActionDef,
  StoryArtifactDef,
  StorySystemDef,
  StoryHandoffDef,
  StoryDecisionDef,
  StoryOutcomeDef,
  StoryStepDef,
  RoadmapPhaseDef,
  RoadmapMilestoneDef,
  RoadmapStepDef,
  RoadmapHorizonDef,
  RoadmapDependencyDef,
  SystemDiagramRole,
  SystemDiagramNodeDef,
  SystemDiagramEdgeDef,
  CustomerProfileMetricDef,
  Gap,
} from './canvases/types';
export type { StageAspect, StageComposition, StageDensity, StageSafeArea } from './canvases/stage-context';
