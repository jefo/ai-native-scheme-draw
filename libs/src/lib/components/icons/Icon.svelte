<script lang="ts">
  // SysDiag Icon — renders a line icon by name.
  // Registry lives in ./icons.ts (data module, not a component).
  import { ICONS, type IconName } from './icons';

  interface Props {
    name: IconName;
    size?: number;
    strokeWidth?: number;
    class?: string;
  }

  let { name, size = 24, strokeWidth = 1.5, class: className }: Props = $props();
</script>

<svg
  viewBox="0 0 24 24"
  width={size}
  height={size}
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  {@html ICONS[name]}
</svg>
