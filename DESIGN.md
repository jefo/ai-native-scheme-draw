---
name: Visual Narrative Library
description: Premium Dark Mode DevTools — semantic visual grammar in a precision-engineered dark interface
colors:
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
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, SF Pro, system-ui, -apple-system, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.05em"
  mono:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "normal"
  caption:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.08em"
  overline:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.06em"
  metric:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "18px"
    fontWeight: 400
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
---

# Design System: Visual Narrative Library

<!-- DIRECTIONAL: established with the user as a replacement world. The current codebase implements a paper/sketch theme that must be updated to match this document. -->

## Overview

**Creative North Star: "The Blueprint Engine"**

A precision instrument for composing visual thought. The interface is a dark, silent engineering workspace — deep-space slate backgrounds, hairline borders, and a single mint-teal accent that marks structure and state. Nothing screams. Nothing persuades. The system earns its authority through restraint: every pixel is load-bearing, every glow has a function.

The aesthetic draws from premium developer tools (Linear, Vercel, Supabase) where the interface recedes and the work stands forward. It is a tool for serious people reasoning about complex systems — the visual equivalent of a blueprint table in a darkened workshop. The only "decoration" is a faint orthogonal grid that covers every surface, whispering: *this is where things get built*.

**Key Characteristics:**
- 95% monochrome deep-slate palette; color is exclusively functional (mint = activity, structure, connection)
- Hairline borders (1px, 7–11% white opacity) replace shadows for layer separation
- Swiss grotesk typography (Inter) with strict binary contrast — bright headings, muted body
- Global blueprint grid at ~4% white opacity on every surface
- Orthogonal (90°) line routing; dotted connections that visualise structure without weight
- Mint glow is the sole "magic" effect — soft neon at connection nodes and active states

## Colors

The palette is an exercise in near-monochrome depth. The deep-slate family creates a multi-layered dark surface that feels infinite rather than flat. Color enters only through the mint accent — and even then, sparingly.

### Primary
- **Mint** (#2dd4bf): The system's sole accent. Serves two distinct roles:
  - **Spatial** (high opacity, ~1.0): Connection nodes, line junctions, blueprint markers. Mint marks structure — where lines meet, where things connect.
  - **Functional** (medium opacity, ~0.7): Active/running state, selected items, progress indicators. The Linear pattern: color means *activity*, not *success* or *failure*.

### Neutral
- **Deep Space** (#080b0f): Page-level background. The darkest surface — the void behind everything. Carries the blueprint grid.
- **Abyss** (#0f131a): Card and container background. One step above deep-space, creating the first layer of depth through contrast alone.
- **Void** (#161b24): Raised surfaces — hover states, active cards, overlay panels. The third elevation tier.
- **White Smoke** (#e6edf3): Primary text. Bright but slightly blue-shifted — never pure white, which would read as harsh against the dark slate.
- **Ghost** (#6b7482): Secondary text, descriptions, metadata. Muted but legible at body sizes.
- **Faint** (rgba(255,255,255,0.18)): Tertiary text, disabled labels, placeholder copy. At the edge of visibility.
- **Stealth** (rgba(255,255,255,0.07)): Default border. Barely there — a hairline that separates layers without calling attention to itself.
- **Stealth Active** (rgba(255,255,255,0.11)): Active/focus border. Slightly brighter, still understated.

### Named Rules
**The One Color Rule.** Mint (#2dd4bf) occupies ≤5% of any given screen. Its rarity is its power. If mint appears on more than two non-background elements, the design has lost restraint.

**The Binary Contrast Rule.** Text exists in exactly two brightnesses: White Smoke (primary) and Ghost (secondary). No intermediate grey. Hierarchy is communicated through size and weight, not through a graduated grey scale.

**The Glow Is Functional Rule.** Every mint glow serves a specific state or structural purpose. No decorative ambient glow. No bloom for bloom's sake.

## Typography

**Display/UI Font:** Inter (with SF Pro and system-ui fallback)
**Mono Font:** JetBrains Mono (with SF Mono and Cascadia Code fallback)

**Character:** Swiss functionalism meets modern screen typography. Inter's tall x-height and clean geometry read as precise and engineered — the typographic equivalent of a machined part. No serifs, no flourishes, no hand-drawn warmth. The contrast between bright headings and muted body creates a strict visual hierarchy that guides attention without colour.

### Hierarchy
- **Display** (700, 28px, 1.1): Scene titles, hero headlines. Used ≤3 times per viewport.
- **Headline** (600, 20px, 1.2): Section headers, card titles, primary labels.
- **Title** (600, 16px, 1.3): Component titles, group labels, navigation items.
- **Body** (400, 14px, 1.5): Descriptions, explanations, running text. Max line length 65ch.
- **Label** (500, 11px, 1.2, 0.05em tracking, uppercase): Metadata, badges, timestamps, predicate type labels (the "flow →" / "compare" annotations).
- **Mono** (400, 13px, 1.45): Values, units, code snippets, numerical data, technical identifiers. Tabular numbers (`font-variant-numeric: tabular-nums`).

### Named Rules
**The Two-Brightness Rule.** Text colour is binary: White Smoke or Ghost. Never use Faint for any text that must be read. If a label needs to recede, use size and letter-spacing, not reduced opacity.

**The Metric Weight Rule.** All numerical values (digits, units, counters) use Mono + tabular-nums. A Value component's digit must never appear in Inter. The shift in typeface is the signal: *this is data, not prose*.

## Layout

**Grid:** 4px base unit. Every spacing value is a multiple of 4. The system is built on an 8px soft grid (component padding: 8px, 16px, 24px, 32px).

**Container model:** Components are inline-flex by default — they take the space their content needs. Layout predicates (Flow, Compare, Containment) are the sole source of structural arrangement. No global page grid; the Scene (9:16 vertical card) is the primary spatial unit.

**Blueprint pattern:** A faint orthogonal grid at 32px spacing, rendered as 1px dots or 1px lines at ~4% white opacity. Applied globally to the page background and inherited by all transparent surfaces. Cards and containers sit on top with solid fills (Abyss), creating a *figure-on-blueprint* relationship. The grid is purely atmospheric — it does not snap, align, or constrain layout.

**Spacing rhythm:** Generous internal padding (16px default), wide gaps between composed elements (16–24px), and airy section separation (32–48px). The premium feel comes from *what isn't there* — empty space is the most expensive material in the system.

**Responsive:** Scenes are locked to 9:16 aspect ratio. At viewport widths below 360px, internal padding compresses to 8px. Above 768px, scenes may render at up to 400×711px but never exceed that height. The blueprint grid scales with the viewport but maintains 32px spacing.

## Elevation & Depth

This is a flat system that creates depth through layered darkness, not shadow. Surfaces are separated exclusively by hairline borders (Stealth, 1px) and increasingly light background tones (Deep Space → Abyss → Void). No drop shadows, no box-shadows for elevation, no blur-based depth.

The result is a "drafting table" model: layers of translucent sheets stacked on a dark surface, each separated by a barely-visible edge. Depth is *perceived* rather than measured — the eye understands the layering without the system announcing it.

### Elevation Tiers
- **L0 — Page** (Deep Space #080b0f + grid): The blueprint table. Everything sits on this.
- **L1 — Surface** (Abyss #0f131a): Cards, containers, scene backgrounds. Separated from L0 by a 1px Stealth border.
- **L2 — Raised** (Void #161b24): Hover states, active elements, tooltips, overlay panels. Separated from L1 by a 1px Stealth-Active border.

### Named Rules
**The No-Shadow Rule.** Elevation is communicated through background lightening and border brightness, never through box-shadow. A lifted element is a lighter slate with a slightly brighter border. This is the single most important rule for the DevTools aesthetic.

**The Hairline Separation Rule.** Every border in the system is exactly 1px. No 2px, no 3px, no "strong" vs "weak" border weights. Variation comes from opacity (Stealth 7% vs Stealth-Active 11%), not line weight.

## Shapes

**Corner strategy:** Minimal radius. Cards and containers use 6px–8px rounding — enough to remove the sharp pixel corner but not enough to feel "rounded." Buttons and chips use 4px. No pill shapes, no circles, no fully rounded elements. The blueprint aesthetic favours the orthogonal; curves are a concession, not a feature.

**Border language:** Every container, card, scene, and input is enclosed by a 1px Stealth border. The border is the primary visual separator. Dashed borders are reserved for predicate annotation labels (the "flow →" subtle markers) — 1px dashed at Ghost opacity, never heavier.

**Icon vocabulary:** Outline-style, mono-weight, 1.5px–2px stroke. Phosphor Icons or Lucide. Never filled, never dual-tone, never brand-coloured. Icons inherit text colour. Icon size is standardised: 16px for inline, 20px for standalone.

**Blueprint grid pattern:** Implemented as a CSS `background-image` using `radial-gradient` (dots) or a subtle `linear-gradient` crosshatch at 32px intervals. Dot variant preferred for the global background — dots read as a reference grid without the visual noise of continuous lines. Line variant available for container-level use (architecture diagrams, schema views).

## Components

Every component inherits the hairline-border, no-shadow, mint-only-when-functional philosophy. States are communicated through background shifts and border brightness changes — never through shadow, scale transforms, or colour shifts outside mint.

### Entity
The fundamental object. A label inside a bordered container.
- **Shape:** 6px radius, 1px Stealth border, Abyss background
- **Default:** Abyss fill, White Smoke text
- **Hover / Active:** Void fill, Stealth-Active border
- **Variants:** Circle (rare — use only for avatar-style identity markers), Plate (transparent background, border-only — for secondary or de-emphasised entities), Cube (rotated -2deg — for work-in-progress or unstable entities)
- **Typography:** Title weight (600), 14px

### Relation
Inline connector between entities. SVG-drawn, mono-weight.
- **Shape:** 2px stroke for lines, solid arrowhead (orthogonal fill, not curved)
- **Variants:** Arrow (directed), Line (undirected), Dashed (tentative/inferred connection), Chain (bidirectional, two arrowheads)
- **Colour:** Ghost by default, Mint when the relation is active/selected
- **Connection routing:** Orthogonal — lines route at 90° angles, never diagonal. Dotted variant for lightweight connections.
- **Typography:** Label in Mono at 11px, italic

### State
Modulation wrapper — applies status semantics to an Entity.
- **Mechanism:** A small chip above the entity + border colour override on the wrapped entity
- **Chip shape:** 4px radius, 1px Stealth border, Mono 10px uppercase label
- **Active states:** Mint chip + Mint entity border (functional role — something is running/active)
- **Error state:** Red chip (#ef4444 at 70% opacity) + red entity border — used only for system errors, never for "wrong answer"
- **Completed state:** Ghost chip — muted, no colour. Completion is the absence of state.

### Value
Quantitative measurement. Numerical display with optional visual encoding.
- **Bar:** Thin horizontal bar (80px × 8px), 4px radius, Abyss background, Mint fill proportional to value
- **Digit:** Mono typeface, tabular-nums, White Smoke, 20px
- **Thermo:** Vertical bar (12px × 40px), 4px radius, Mint fill from bottom
- **Chart:** Inline SVG sparkline, 1.5px Mint stroke, no fill, no axes
- **Unit:** Mono, 11px, Ghost, attached to digit with no space
- **Direction indicator:** Mint ↑ or Ghost ↓, 12px Mono

### Event
Temporal marker. Icon + label.
- **Shape:** Inline SVG icon (16px) + Mono label
- **Variants:** Flash (bolt icon, Mint), Appear (concentric rings, Ghost → Mint transition), Wave (sine wave, Mint)
- **Typography:** Label in Mono 12px, weight 500

### Layout Predicates (Flow, Compare, Containment, Hierarchy, Timeline, Cycle, TradeOff)
Structural containers that arrange child objects.
- **Default state:** 1px Stealth border, transparent background (shows blueprint grid through), 8px–16px internal padding
- **Active/hover:** Abyss background (grid obscured), Stealth-Active border
- **Predicate label:** Small Mono label (9px, uppercase, Ghost) positioned absolutely at the top-right corner of the container. The label names the predicate type ("flow →", "compare", "⊂").
- **Connection lines:** 1.5px dotted or solid, Ghost. Orthogonal routing (90° turns only). Mint at connection nodes and junctions.
- **TradeOff axes:** Two orthogonal dashed lines (Ghost, 1px), crossing at centre. Labels at endpoints in Mono 10px.

### Attention Predicates (Focus, Reveal, Highlight, Dim)
Transforms over content — modulate visual emphasis.
- **Focus:** Container border transitions from Stealth to Mint. Content scales 1.08×. Outer mint glow (mint-glow, 8px blur, no spread).
- **Reveal:** Content animates from Ghost opacity (0.25) to White Smoke (1.0). Border appears from Stealth to Stealth-Active.
- **Highlight:** Amber/Mint glow ring (2px spread, mint-glow) around container. Background lifts to Abyss.
- **Dim:** Content drops to 0.35 opacity + grayscale(0.8). Container border fades to Faint.

### Scene
The Visual Thought Unit — a 9:16 vertical card. The primary composition surface.
- **Shape:** 8px radius, 1px Stealth border, Abyss background
- **Aspect ratio:** 9:16, locked. Width determined by container, height derived.
- **Header:** Deep Space background, Mint label (Mono, 10px, uppercase, tracking 0.08em), 1px Stealth border-bottom. Contains the scene's title/ID.
- **Stage:** Flex-1 centre-aligned area. Abyss background with subtle blueprint grid visible at 2% opacity. Where the composed thought lives.
- **Footer:** 40px tall, Stealth border-top. Reaction/hint area — Mono 12px, Ghost.
- **Blueprint context:** The scene's own grid (2% opacity, 32px) sits above the global page grid, creating a subtle *grid-on-grid* layering — the scene is a focused area on the drafting table.

## Do's and Don'ts

### Do:
- **Do** use the Two-Brightness Rule: White Smoke for primary text, Ghost for secondary. Never invent an intermediate grey.
- **Do** use exactly 1px borders for all layer separation. Variation comes from opacity (Stealth 7% → Stealth-Active 11%), never line weight.
- **Do** use Mint exclusively for functional signals (activity, connection nodes, structural markers). If mint appears on a decorative element, remove it.
- **Do** route all connection lines orthogonally (90° turns). Diagonal or curved connections belong in the paper/sketch world — not here.
- **Do** apply the blueprint grid globally. Every surface without a solid fill shows the grid. Solid-filled cards (Abyss) sit *on top* of it.
- **Do** use Mono for all numerical values, units, and technical identifiers. The typeface shift signals data vs. language.
- **Do** keep spacing generous — 16px minimum internal padding, 24px between composed elements, 48px between sections. The premium feel is air.
- **Do** use outline-style, mono-weight icons (Phosphor or Lucide). 16px inline, 20px standalone. Never filled, never coloured outside Mint for active states.

### Don't:
- **Don't** use drop shadows or box-shadow for elevation. Depth comes from background lightening (Deep Space → Abyss → Void) and border brightness. The No-Shadow Rule is the system's defining constraint.
- **Don't** use pure black (#000000) as a background. The darkest surface is Deep Space (#080b0f) — a near-black with blue undertone.
- **Don't** use pure white (#ffffff) for text. The brightest text is White Smoke (#e6edf3) — slightly blue-shifted to feel natural against dark slate.
- **Don't** add more than one accent colour. Mint is the system's only chromatic voice. Red (for errors) and amber (for warnings) exist as functional states only, never as palette entries.
- **Don't** use border-radius above 8px. No pills, no circles, no fully rounded elements. The blueprint is orthogonal.
- **Don't** use more than 2 type sizes on any surface. Hierarchy comes from weight and brightness, not a graduated size scale.
- **Don't** animate for delight. Motion is functional: state transitions (0.2s ease), reveal sequences (0.3s ease). No bounce, no spring, no bounce-in on entrance.
- **Don't** mix the paper/sketch theme tokens with this system. This world replaces, not extends, the old one.
