# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run

```bash
npm run dev        # Vite dev server on :5173 (strict port)
npm run build      # Production build to dist/
npm run preview    # Preview production build
```

There is no test suite yet. The `dev` server is the primary feedback loop — open `http://localhost:5173` to see the demo gallery.

## Architecture: Two Layers

This repo is a **Svelte 5 component library** (runes mode, `$props()`, `$state()`, `$derived()`) with a demo app shell wrapped around it.

### Layer 1: The Library (`src/lib/`)

The library implements a **semantic grammar for visual explanations**. Instead of drawing rectangles and arrows, authors declare what things *are* and how they relate — the library resolves the visual form.

**Barrel export**: `src/lib/index.ts` — everything the library exposes is re-exported from here.

**Taxonomy (16 primitives):**

| Category | Primitives | Arity | Role |
|---|---|---|---|
| **Semantic Objects** | Entity, Relation, State, Value, Event | varies | What exists — the nouns and verbs of a visual thought |
| **Layout Predicates** | Flow, Compare, Containment, Hierarchy, Timeline, Cycle, TradeOff | N-ary | Information design — structural layout of content |
| **Attention Predicates** | Focus, Reveal, Highlight, Dim | Unary | Attention mechanics — transforms over content |

Layers above the taxonomy:
- **`Scene`** (`src/lib/scene/Scene.svelte`) — the **Visual Thought Unit**: a 9:16 vertical card that composes objects + predicates into one coherent idea. The ONLY place semantic composition happens. Dark header with mint title, blueprint grid background, footer with reaction slot.
- **Organisms** (`src/lib/organisms/`) — domain-specific HoC compositions built from the primitives: `ServiceNode`, `InfraNode`, `Pipeline`, `DeployDiff`, `ModelCard`. These are opinionated compositions for devops/infra/AI use cases.
- **Icons** (`src/lib/icons/Icon.svelte`) — 25 domain-specific outline SVG icons (Phosphor/Lucide style). One component with a `name` prop.
- **Themes** (`src/lib/themes/brutalist.css`) — alternate visual theme. The default theme lives in `src/app.css`.
- **Canvases — semantic DSL kits** (`src/lib/canvases/`) — NOT a UI kit of Card/Box/Row wrappers. Each canvas is a *grammar of thought* with its own primitives (Positioning Map: Axis/Player/Territory/Vector/Tension; User Flow: Actor/Action/Artifact/Decision/Outcome; Roadmap: Phase/Milestone/Dependency/Horizon — the latter two pending). Target layer beneath: a shared **Visual Semantics** vocabulary (Actor, Entity, Action, Artifact, Constraint, Decision, Outcome, Relationship, Tension, Boundary, Direction). Components carry meaning: `<Player name="Us" x={82} y={80} state="focus" />` — and the canvas resolves geometry: players register by name via Svelte context (`positioning-context.ts`), so `<Tension between={["Us","Miro"]} />` works with zero coordinates. Dual API: data props OR slots (children = the DSL). Visual register: **technical editorial** — thin geometry, typographic hierarchy, accents only on semantic state. Formula: *HTML describes documents. React describes interfaces. This DSL describes reasoning.*

**Component pattern**: Every primitive uses Svelte 5 `$props()` with typed props and a `Snippet`-typed `children` for composition. Primitives accept content via children, not via config. Example:

```svelte
<Containment label="System">
  <State state="broken"><Entity label="GPU" /></State>
</Containment>
```

**Visual encoding channels** (semantic color tokens):
- Entity → mint (`--vnp-color-entity`)
- Relation → copper (`--vnp-color-relation`)
- Value → steel blue (`--vnp-color-value`)
- Event → amber (`--vnp-color-event`)
- Layout predicates → warm-slate zone
- Attention predicates → cool-slate zone

### Layer 2: The Demo App (`src/app/`)

A simple SPA that showcases the library. Not part of the library export — this is the dev/authoring environment.

- **Router** (`src/app/stores/router.svelte.ts`) — hash-based SPA with `$state()`: dashboard, library, project pages
- **Project store** (`src/app/stores/project.svelte.ts`) — in-memory CRUD for Projects → Scenes → Frames hierarchy. Seeded with demo data. Frames store a `content` string (wireframe placeholder for now).
- **Pages**: `Dashboard` (project list + create), `Library` (component gallery), `Project` (scene/frame editor)

### Entry Point

`src/main.ts` → mounts `App.svelte` → routes to Dashboard/Library/Project based on `router.page`. `App.svelte` itself imports the demo pages; `BrutalistDemo.svelte` imports from `src/lib/index.ts`.

## Design Tokens

All tokens live in `src/app.css` as CSS custom properties (`:root`). Naming convention: `--vnp-{category}` (vnp = Visual Narrative Primitives).

Key token groups:
- **Surface**: `--vnp-paper` (L0), `--vnp-card` (L1), `--vnp-card-raised` (L2), `--vnp-paper-deep`
- **Ink** (text): `--vnp-ink` (primary), `--vnp-ink-soft` (secondary), `--vnp-ink-faint` (tertiary)
- **Accent**: `--vnp-good` (mint — activity, not "success"), `--vnp-bad` (red — system errors only), `--vnp-warn` (amber)
- **Semantic identity**: `--vnp-color-entity`, `--vnp-color-relation`, `--vnp-color-value`, `--vnp-color-event` (each with `-dim` and `-border` variants)
- **Zonal undertones**: `--vnp-zone-layout` (warm), `--vnp-zone-attention` (cool)
- **Typography**: `--vnp-font` (Inter/system-ui), `--vnp-font-mono` (JetBrains Mono)
- **Borders**: hairline 1px only, varied by opacity. No shadows (`--vnp-shadow: none`).

The DESIGN.md file is an auto-generated visual design spec (Google Stitch format) extracted from this codebase — update it with the `document` skill after visual changes.

## Design Detector Hook

`.claude/settings.local.json` configures an Impeccable design-detector hook that runs after every `Edit`/`Write` on UI files. It checks for design antipatterns inline (5s timeout) and does a deeper pass on `Stop`. This is the only active hook. Do not remove it without asking.

## Foreign Agent Configs Present

This repo has config directories for other coding agents that are NOT Claude Code config:
- `.cursor/` — Cursor IDE agents and skills
- `.codex/` — OpenAI Codex hooks
- `.gemini/` — Gemini CLI skills
- `.agents/` — agent definitions

These are not used by Claude Code and should not be modified unless the user asks.

## Key Constraints (from PRODUCT.md)

- **Frontend-only**: no backend, no database, no auth
- **9:16 vertical format** is mandatory for all Scene compositions
- **The 5+7+4 taxonomy is the stable core** — new work extends it, never replaces it
- **Meaning before geometry**: authors declare semantics, the library resolves visuals. Never make authors think about coordinates or layout math.
- **Grammar scales, templates don't**: invest in the generative power of a small, stable taxonomy rather than a growing gallery of one-off layouts.
- **One scene, one thought**: a Visual Thought Unit expresses a single idea. If it needs two ideas, it needs two scenes.
