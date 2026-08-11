// ────────────────────────────────────────────────────────────
// SysDiag UI Kit — barrel export
// ByteByteGo-style dark UI kit for system design diagrams.
// Import the tokens once in your app root:
//   `import 'sysdiag-ui-kit/styles/tokens.css';`
// ────────────────────────────────────────────────────────────

import type { ComponentProps } from 'svelte';

// containers
import Panel from './components/containers/Panel.svelte';
import Comparison from './components/containers/Comparison.svelte';
import Divider from './components/containers/Divider.svelte';

// icons
import Icon from './components/icons/Icon.svelte';
import { ICON_NAMES } from './components/icons/icons';

// indicators
import StatusBadge from './components/indicators/StatusBadge.svelte';
import Spinner from './components/indicators/Spinner.svelte';

// connectors
import Arrow from './components/connectors/Arrow.svelte';

// storyboard frames
import Stage from './components/stage/Stage.svelte';

// actors
import Actor from './components/actors/Actor.svelte';

export {
  Panel,
  Comparison,
  Divider,
  Icon,
  ICON_NAMES,
  StatusBadge,
  Spinner,
  Arrow,
  Stage,
  Actor,
};

export type { PanelTone } from './components/containers/Panel.svelte';
export type { IconName } from './components/icons/icons';
export type { BadgeTone } from './components/indicators/StatusBadge.svelte';
export type { ArrowTone } from './components/connectors/Arrow.svelte';
export type { ActorRole, ActorMood } from './components/actors/Actor.svelte';

// component prop types
export type PanelProps = ComponentProps<typeof Panel>;
export type ComparisonProps = ComponentProps<typeof Comparison>;
export type DividerProps = ComponentProps<typeof Divider>;
export type IconProps = ComponentProps<typeof Icon>;
export type StatusBadgeProps = ComponentProps<typeof StatusBadge>;
export type SpinnerProps = ComponentProps<typeof Spinner>;
export type ArrowProps = ComponentProps<typeof Arrow>;
export type ActorProps = ComponentProps<typeof Actor>;
export type StageProps = ComponentProps<typeof Stage>;
