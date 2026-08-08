---
name: Visual Narrative Library
description: DX-native visual modeling kit — declarative visual grammar, UI is its projection
colors:
  # ── Blueprint Engine (library default projection) ──
  deep-space: "#080b0f"
  abyss: "#0f131a"
  void: "#161b24"
  stealth: "rgba(255,255,255,0.07)"
  stealth-active: "rgba(255,255,255,0.11)"
  white-smoke: "#e6edf3"
  ghost: "#6b7482"
  faint: "rgba(255,255,255,0.18)"
  mint: "#2dd4bf"
  mint-glow: "rgba(45,212,191,0.28)"
  mint-soft: "rgba(45,212,191,0.10)"
  copper: "#c9984a"
  copper-dim: "rgba(201,152,74,0.05)"
  copper-border: "rgba(201,152,74,0.10)"
  steel-blue: "#5b9bd5"
  steel-blue-dim: "rgba(91,155,213,0.05)"
  steel-blue-border: "rgba(91,155,213,0.10)"
  amber: "#d4a040"
  amber-dim: "rgba(212,160,64,0.05)"
  amber-border: "rgba(212,160,64,0.10)"
  # ── Launch Console (canvas kit projection) ──
  carbon: "#0b0c0f"
  glass: "#14161b"
  glass-raised: "#1a1d24"
  glass-panel: "rgba(255,255,255,0.035)"
  smoke: "#f2f3f6"
  signal-border: "rgba(255,255,255,0.12)"
  signal-cyan: "#22d3ee"
  signal-violet: "#a78bfa"
  signal-amber: "#fbbf24"
  signal-mint: "#34d399"
  signal-rose: "#fb7185"
  signal-orange: "#fb923c"
typography:
  display:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.005em"
  label:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.05em"
  chip:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  caption:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
  metric:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "normal"
rounded:
  xs: "2px"
  none: "0"
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
components:
  entity-card:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.white-smoke}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  entity-card-active:
    backgroundColor: "{colors.void}"
    textColor: "{colors.white-smoke}"
  scene-card:
    backgroundColor: "{colors.abyss}"
    textColor: "{colors.white-smoke}"
    rounded: "{rounded.lg}"
    padding: "0"
  scene-header:
    backgroundColor: "{colors.deep-space}"
    textColor: "{colors.mint}"
    typography: "{typography.label}"
  chip-mint:
    backgroundColor: "{colors.mint-soft}"
    textColor: "{colors.mint}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  # ── Launch Console components ──
  sticky-note:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.smoke}"
    rounded: "{rounded.lg}"
    padding: "8px 14px"
  canvas-section:
    backgroundColor: "{colors.glass-panel}"
    textColor: "{colors.smoke}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
---

# Design System: Visual Narrative Library

<!-- TWO PROJECTIONS, ONE MODEL: The declarative model (taxonomy + canonical kits) is projection-independent. The Blueprint Engine is the library default projection; The Launch Console is the canvas kit projection. Rules are projection-scoped — a Blueprint rule does not govern the Launch Console world. -->

## Overview

**Creative North Star: "The Blueprint Engine"** — and its sibling projection, **"The Launch Console"**.

This is a DX-native visual modeling kit: developers declaratively describe a model of thinking with components, and the UI is its projection. The declarative model — the 16-primitive taxonomy (semantic objects, layout predicates, attention predicates), the canonical kits (Value Proposition Canvas, Lean Canvas, Feature Model, Trade-off Matrix), and the Scene as the Visual Thought Unit — is projection-independent. Projections are the voices: they may change geometry (9:16 vs 16:9), material, typography, and depth language, but never semantics. The Entity is always a noun; amber always means jobs.

**The Blueprint Engine** is the library's default projection: a precision instrument for composing visual thought — dark, silent engineering workspace, deep-space slate, hairline borders, a single mint accent. Draws from premium developer tools (Linear, Vercel, Supabase). The visual equivalent of a blueprint table in a darkened workshop; a faint orthogonal grid whispers: *this is where things get built*.

**The Launch Console** is the canvas kit's projection: carbon-dark mission control with glass panels, neon-signal edges, and glow — IBM Think cinema × a young AI startup. Built for thought leadership on YouTube (16:9 horizontal): every canvas reads as a startup about to launch something. The dot-grid stage, the mono uppercase header with a cyan→violet neon thread beneath it, and the glass chips with colored borders are its signatures. It speaks two registers: **the chip grammar** (glass, colored borders, glow — board-type canvases: VPC, Lean, Feature Model, Trade-off Matrix) and **the diagram grammar** (thin 1px geometry, typographic hierarchy, accents only on semantic state — plot-type canvases: Positioning Map, later User Flow and Roadmap). The diagram grammar is the *technical editorial* register: hairline gridlines on a faint panel, mono captions, and color that exists only where the model changes meaning (focus=amber, tension=rose, vector=amber, territory=tonal zone). No glow, no gradient rings on diagram surfaces.

**Key Characteristics:**
- One declarative model, multiple projections; the model never changes when the voice does
- Blueprint Engine: 95% monochrome deep-slate, hairline borders, mint-only-when-functional
- Launch Console: carbon glass, colored signal borders carry semantics, cyan→violet gradient ring reserved for key cells
- Launch Console diagram register (technical editorial): plot geometry, 1px lines, mono labels; color accents only on semantic state
- Semantic color mapping is stable across projections (jobs=amber, pains=rose, gains=mint, products=cyan)
- Scenes: 9:16 vertical in the library, 16:9 horizontal in the canvas kit (YouTube classic)

## Colors

### The Blueprint Engine palette

The palette is an exercise in near-monochrome depth. The deep-slate family creates a multi-layered dark surface that feels infinite rather than flat. Color enters only through the mint accent — and even then, sparingly.

**Primary**
- **Mint** (#2dd4bf): The system's sole accent. Two roles — *spatial* (high opacity: connection nodes, line junctions, blueprint markers) and *functional* (medium opacity: active/running state, selected items). Color means *activity*, not success.

**Neutral**
- **Deep Space** (#080b0f): Page background. The void behind everything; carries the blueprint grid.
- **Abyss** (#0f131a): Card and container background. One step above deep-space.
- **Void** (#161b24): Raised surfaces — hover states, active cards, overlays.
- **White Smoke** (#e6edf3): Primary text. Never pure white — white would read harsh against slate.
- **Ghost** (#6b7482): Secondary text, metadata. Legible at body sizes.
- **Faint** (rgba(255,255,255,0.18)): Tertiary text, disabled labels. At the edge of visibility.
- **Stealth** (rgba(255,255,255,0.07)) / **Stealth Active** (rgba(255,255,255,0.11)): Default and active borders.

**Named Rules (Blueprint Engine)**
**The One Color Rule.** Mint (#2dd4bf) occupies ≤5% of any given screen. If mint appears on more than two non-background elements, the design has lost restraint.

**The Binary Contrast Rule.** Text exists in exactly two brightnesses: White Smoke and Ghost. No intermediate grey.

**The Glow Is Functional Rule.** Every mint glow serves a state or structural purpose. No decorative bloom.

### The Launch Console palette (canvas kit)

Carbon, glass, and six signal colors. Each signal color carries a semantic role that is stable across projections — the same meaning, a different material. Chip backgrounds are the signal color at ~13% opacity over glass; borders are the signal at ~55%.

**Neutral**
- **Carbon** (#0b0c0f): Page background — the console chassis.
- **Glass** (#14161b): Scene card and chip base. **Glass Raised** (#1a1d24) for hover.
- **Glass Panel** (rgba(255,255,255,0.035)): Section fills — CanvasSection cells, VPC bands, FODA boxes.
- **Smoke** (#f2f3f6): Primary text. **Signal Border** (rgba(255,255,255,0.12)): default hairline.

**Signal colors (semantics stable across projections)**
- **Signal Amber** (#fbbf24): Jobs, decisions, highlight labels (UVP cell text, FODA "1 of N" hints).
- **Signal Rose** (#fb7185): Pains, sacrificed options, the ✗ cross badge.
- **Signal Mint** (#34d399): Gains, chosen options, the ✓ check badge.
- **Signal Cyan** (#22d3ee): Products, data, channels, metrics.
- **Signal Violet** (#a78bfa): Unfair advantage; gradient partner of cyan.
- **Signal Orange** (#fb923c): UVP value chips.

**Named Rules (Launch Console)**
**The Neon Edge Rule.** The colored border of a glass chip *is* the semantics — never decorative. A chip's border color must match its semantic role (amber=jobs, rose=pains, mint=gains, cyan=products).

**The Gradient Ring Rule.** The cyan→violet gradient border is reserved for exactly one element per canvas: the key cell (UVP in Lean Canvas, root in Feature Model, highlight in VPC). One signal per screen; the gradient is the loudest voice.

**The Editorial Diagram Rule.** Diagram surfaces (plot-type canvases: Positioning Map, and later User Flow, Roadmap) live in the technical-editorial register: hairline 1px lines and gridlines on a faint panel, JetBrains Mono captions at 10px, uppercase where the element is chrome (axes, territories) and sentence-cased where it is data (labels). Color exists only as semantic state — focus=amber, tension=rose, vector=amber, territory=tonal zone — never as decoration. No glow, no gradient rings, no glass chips inside a plot; the chip grammar belongs to board-type canvases.

## Typography

**Display/UI Font:** Inter (with SF Pro and system-ui fallback)
**Mono Font:** JetBrains Mono (with SF Mono and Cascadia Code fallback)

**Character (Blueprint Engine):** Swiss functionalism meets modern screen typography. Inter's tall x-height and clean geometry read as precise and engineered — a machined part. No serifs, no flourishes. Strict binary contrast: bright headings, muted body.

**Character (Launch Console):** The same Inter, re-voiced. Chips use Inter 600 at 13px with tight tracking (-0.01em) — data-bearing labels, not handwriting. Headers and captions are JetBrains Mono, uppercase, wide-tracked (0.16em), like telemetry readouts on a console.

### Hierarchy
- **Display** (700, 28px, 1.1): Scene titles, hero headlines. ≤3 times per viewport.
- **Headline** (600, 20px, 1.2): Section headers, card titles.
- **Title** (600, 16px, 1.3): Component titles, group labels.
- **Body** (400, 14px, 1.5): Descriptions, running text. Max 65ch.
- **Chip** (600, 13px, 1.35, -0.01em): Glass chip labels (Launch Console). The chip is data-bearing, never decorative.
- **Label** (500, 11px, 1.2, 0.05em, uppercase): Metadata, badges, timestamps, predicate annotations.
- **Mono** (400, 13px, 1.45): Values, code, technical identifiers. Tabular numbers.
- **Caption** (400, 10px, 1.2, 0.06em): Section labels, hints, FODA markers, legend items.

### Named Rules
**The Two-Brightness Rule.** (Blueprint Engine) Text colour is binary: White Smoke or Ghost. Recede with size, not opacity.

**The Metric Weight Rule.** All numerical values use Mono + tabular-nums. A digit must never appear in Inter — the typeface shift signals *this is data, not prose*.

**The Console Voice Rule.** (Launch Console) In the canvas kit, uppercase mono with wide tracking is reserved for chrome (headers, section labels, hints). Chips and decisions speak Inter 600. The shift between the two is the console's rhythm.

## Layout

**Grid:** 4px base unit; every spacing value is a multiple of 4. 8px soft grid for components.

**Container model (Blueprint Engine):** Components are inline-flex by default; layout predicates (Flow, Compare, Containment) are the sole source of structural arrangement. The Scene (9:16 vertical card) is the primary spatial unit.

**Blueprint pattern:** A faint orthogonal grid at 32px spacing — 1px dots or lines at ~4% white opacity, applied globally, inherited by transparent surfaces. Purely atmospheric; never snaps or constrains.

**Canvas kit (Launch Console):** 16:9 horizontal aspect ratio, locked (YouTube classic, not Shorts). Canvases render inside Scene cards on a dot-grid stage (28px, ~3.5% white). Canonical kits own their internal layout — the Strategyzer two-panel VPC, the 9-block Lean grid — the developer declares content, never coordinates. Responsive: VPC stacks vertically below 520px; the circle collapses to a band.

**Spacing rhythm:** Generous internal padding (16px default), wide gaps (16–24px), airy section separation (32–48px). The premium feel is empty space.

## Elevation & Depth

### Blueprint Engine — flat by doctrine
Depth through layered darkness, never shadow. Surfaces separate exclusively by hairline borders (Stealth, 1px) and background lightening (Deep Space → Abyss → Void). The "drafting table" model: translucent sheets on a dark surface.

**The No-Shadow Rule.** Elevation is communicated through background lightening and border brightness, never box-shadow. The single most important rule of the Blueprint aesthetic.

**The Hairline Separation Rule.** Every border is exactly 1px. Variation comes from opacity (7% vs 11%), not line weight.

### Launch Console — glass over glow
The console has depth: a scene card floats on a deep drop shadow (0 24px 60px rgba(0,0,0,0.55)), and each chip carries a compact ambient shadow (0 6px 14px rgba(0,0,0,0.45)) plus a colored glow of its border color at ~28% (0 0 14px). Hover lifts the chip 2px with a brightness bump (1.12) — the chip leans into its light.

**The Console Glow Rule.** Glow is always the chip's own signal color — never white, never a neutral bloom. A mint chip glows mint; a rose chip glows rose. The glow extends the semantics instead of decorating the surface.

## Shapes

**Corner strategy (Blueprint Engine):** Minimal radius. Cards 6–8px, buttons and chips 4px. No pills, no circles, no fully rounded elements. The blueprint aesthetic favours the orthogonal; curves are a concession.

**Border language (Blueprint Engine):** Every container enclosed by 1px Stealth border. Dashed borders reserved for predicate annotation labels. Icons: outline-style, mono-weight, 1.5–2px stroke, 16px inline / 20px standalone, never filled.

**Corner strategy (Launch Console):** Glass chips at 8px radius, sections at 8px, scene cards at 12px. The console allows the circle where canon demands it — the VPC Customer Profile is a true circle (border-radius: 50%), because Strategyzer's form is the canon.

**The Gradient Ring technique:** key cells draw a 1px gradient border (cyan→violet) via a layered background — `linear-gradient(highlight-bg) padding-box, linear-gradient(135deg, cyan, violet) border-box`. The ring is a material, not a line; it can wrap any shape.

**Dot-grid stage:** 28px radial dots at ~3.5% white opacity inside the scene card — the Launch Console's answer to the blueprint grid.

## Components

### Blueprint Engine components

Every component inherits the hairline-border, no-shadow, mint-only-when-functional philosophy. States are communicated through background shifts and border brightness — never shadow, never scale, never colour outside mint.

**Entity:** 6px radius, 1px Stealth border, Abyss fill, White Smoke text; hover = Void fill + Stealth-Active border. Title weight (600), 14px.

**Relation:** Inline SVG connector, 2px stroke, solid orthogonal arrowhead; Ghost by default, Mint when active. Orthogonal routing (90°), dashed for tentative links. Label Mono 11px italic.

**State:** Chip above entity + border override. Active = mint chip/mint border; error = red chip (#ef4444 at 70%) for system errors only; completed = Ghost chip (completion is the absence of state).

**Value:** 80×8px bar with Mint proportional fill; digit in Mono 20px tabular-nums; unit Mono 11px Ghost.

**Event:** Icon (16px SVG) + Mono 12px label. Variants: Flash (bolt, Mint), Appear (rings), Wave (sine).

**Layout Predicates:** 1px Stealth border, transparent background (grid shows through), predicate label Mono 9px uppercase top-right ("flow →"). Connections 1.5px Ghost, orthogonal, Mint at junctions. TradeOff: two dashed Ghost axes crossing at centre.

**Attention Predicates:** Focus = Mint border + 1.08× scale + mint glow ring. Reveal = opacity 0.25→1.0. Highlight = amber/mint glow ring + Abyss lift. Dim = 0.35 opacity + grayscale(0.8).

**Scene (9:16):** 8px radius, Abyss background, Deep Space header with Mint Mono label, stage with 2% grid, 40px footer with Stealth border-top. Grid-on-grid layering: the scene is a focused area on the drafting table.

### Launch Console components (canvas kit)

The same model, projected as mission control. Chips replace sticky notes; glass panels replace paper cells; the glow carries what the hairline used to.

**StickyNote (glass chip):** The kit's atom. 8px radius, 1px border in the signal color, background = signal at 13% over glass, text Inter 600 13px (chip role), ambient shadow + signal glow. Mark badges: a solid 18px circle at the corner — ✓ mint, ✗ rose — with a 2px ring of the page color, glyph in carbon. Chips sit straight — the Miro rotation is retired. Hover: -2px lift + brightness 1.12.

**CanvasSection (glass cell):** 8px radius, 1px Signal Border, Glass Panel fill, mono uppercase label (caption role), optional bottom hint in mono. `tone="highlight"` applies the Gradient Ring + amber label — used for the UVP cell, exactly once per canvas.

**FeatureNode (FODA):** 6px radius box on Glass Panel, mono 10px label. Markers: mandatory = filled Smoke dot, optional = hollow Smoke, alternative = hollow amber, excluded = 45% opacity + line-through + rose dot. Root variant wears the Gradient Ring. Branch connectors are 1px Signal Border lines (drop, rail, risers).

**TradeOffRow / TradeOffMatrix:** A row is a decision (amber chip) + option chips with mark badges. Chosen = mint chip + ✓ badge; sacrificed = rose chip + ✗ badge. The legend beneath repeats the badges as mono captions. This is the kit's explicit "what we chose, what we sacrificed" grammar.

## Do's and Don'ts

### Do:
- **Do** keep the declarative model identical across projections. A VPC declared once must project into the Blueprint Engine, the Launch Console, or any future voice without a single model change.
- **Do** preserve the semantic color mapping in every projection (jobs=amber, pains=rose, gains=mint, products=cyan). The meaning is the contract; the material is the voice.
- **Do** (Blueprint Engine) use the Two-Brightness Rule, exactly 1px borders, Mint only for functional signals, orthogonal routing, blueprint grid on every surface, Mono for all numerals.
- **Do** (Launch Console) let a chip's colored border and glow carry its semantics; reserve the Gradient Ring for the one key cell per canvas; keep headers and captions in uppercase wide-tracked mono.
- **Do** use canonical kit forms — Strategyzer VPC, 9-block Lean Canvas, FODA feature trees. The kit's recognizability is its value; inventing a new form for a known framework is waste.
- **Do** keep spacing generous — 16px minimum internal padding, 24px between elements, 48px between sections.

### Don't:
- **Don't** mix two projections inside one Scene. One scene, one voice.
- **Don't** add new layouts to kits to express a new idea. New expression belongs to the projection layer; the kit layer stays canonical and finite.
- **Don't** use drop shadows in the Blueprint Engine (No-Shadow Rule) — and **don't** expect the Launch Console to obey it: the console's glow is its own doctrine.
- **Don't** revive the paper sticky aesthetic (Miro). It was a tested hypothesis and is retired; the canvas kit projects as the Launch Console.
- **Don't** use pure black (#000000) or pure white (#ffffff). The darkest surface is Carbon (#0b0c0f) or Deep Space (#080b0f); the brightest text is Smoke (#f2f3f6) or White Smoke (#e6edf3).
- **Don't** animate for delight in either projection. Motion is functional: chip lift (150ms ease), state transitions (200ms), reveals (300ms). No bounce, no spring.
