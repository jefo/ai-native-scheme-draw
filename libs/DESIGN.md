---
name: SysDiag UI Kit
description: ByteByteGo-style dark diagram kit — full-viewport data-storytelling at arm's length
colors:
  attention-marker: "#f5b93d"
  storage-marker: "#4fa8e0"
  success-marker: "#3dd68c"
  error-marker: "#e5534b"
  deep-board: "#121212"
  raised-sheet: "#1a1a1a"
  card-surface: "#1f1f1f"
  inset-surface: "#171717"
  chalk: "#ececec"
  chalk-soft: "#9a9a9a"
  chalk-faint: "#8c8c8c"
  hairline: "rgba(255, 255, 255, 0.09)"
  hairline-strong: "rgba(255, 255, 255, 0.17)"
typography:
  display:
    fontFamily: "'Inter Variable', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(48px, 7vw, 72px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Inter Variable', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 32px)"
    fontWeight: 600
    letterSpacing: "0.01em"
  body:
    fontFamily: "'Inter Variable', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "'JetBrains Mono Variable', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.08em"
    fontFeature: "uppercase"
rounded:
  card: "10px"
  sm: "6px"
spacing:
  sm: "10px"
  md: "20px"
  lg: "32px"
components:
  panel-card:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.card}"
    padding: "12px 14px"
  panel-inset:
    backgroundColor: "{colors.inset-surface}"
    rounded: "{rounded.sm}"
    padding: "10px"
  panel-blue:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.storage-marker}"
    rounded: "{rounded.card}"
  badge-success:
    backgroundColor: "rgba(61, 214, 140, 0.12)"
    textColor: "{colors.success-marker}"
    rounded: "999px"
    padding: "0 14px"
    height: "30px"
  badge-error:
    backgroundColor: "rgba(229, 83, 75, 0.12)"
    textColor: "{colors.error-marker}"
    rounded: "999px"
    padding: "0 14px"
    height: "30px"
  arrow-blue:
    textColor: "{colors.storage-marker}"
    size: "2px"
  actor-glyph:
    backgroundColor: "{colors.card-surface}"
    rounded: "50%"
    size: "60px"
  stage-index:
    backgroundColor: "rgba(245, 185, 61, 0.12)"
    textColor: "{colors.attention-marker}"
    rounded: "999px"
    padding: "3px 12px"
---

# Design System: SysDiag UI Kit

## Overview

**Creative North Star: "The Whiteboard at Night" («Ночная белая доска»)**

A dark whiteboard after the deadline: deep-gray surfaces stand in for the
board, and the four marker colors — amber, blue, green, red — are the
highlighters a lead engineer reaches for while explaining an architecture.
Everything written on the board is technical-editorial: thin geometry,
hairline separators, mono annotations. The board is calm so that a single
amber underline can say "look here".

The kit is a *data-storytelling instrument* in the canonical ByteByteGo
explainer register at full craft. Scenes fill the viewport, information is
dense, and type is sized for arm's-length reading — the small-scale demo
look is refused outright. The deck world (the Lakehouse storyboard) commits
this explicitly: scenes are 100% of the viewport with scroll-snap, and the
HUD (dot nav, count, timecode, goal line) is part of the deck grammar, not
an afterthought. The quality bar is ByteByteGo × Fireship × 3Blue1Brown ×
Stripe/Linear, and the category standard is played straight.

The voice is *lively editorial*, not sterile: diagrams are mounted like
scenes in a well-cut explainer video. There is drama — pain then solution,
sad actors then happy ones, an error arrow then a green commit. Movement is
sparse but alive: flowing dashes for live data, a spinning loader, a softly
pulsing badge. Every animated element signals *activity*, never decoration.

The confirmed anti-reference is the office-supply metaphor: no sticky-note
wobble, no marker-streak unevenness, no "brainstorm board" energy. Lines are
geometrically exact, and meaning never depends on hand-drawn charm.

**Key Characteristics:**
- Deep-gray board (#121212 floor), never pure black; elevation by brightness, never by shadow
- Four co-equal marker accents, each with exactly one semantic role
- Arm's-length type mandate: display 48–72px, reading ≥16px, mono labels ≥12px; gray ink only for dimmed/disabled/neutral
- Hairline 1px borders; radius 10px cards / 8px in-scene tiles / 6px insets / 4px chips / 999px pills
- Mono uppercase labels everywhere; sans for body; accents only on semantic state
- Scene-first storytelling: one complete macro-composition per viewport, HUD count/timecode/goal as first-class chrome
- Inactive elements recede to 35% opacity — attention is a dimming mechanic

## Colors

Four signal markers over a dark neutral board: the marker palette is
co-equal — no accent is "the brand color", each is a role. Gray is the
surface language; bright chalk is the reading ink.

### Primary
- **«Маркер Внимания» (Attention Amber)** (#f5b93d): the focus highlighter. Current step, the scene index chip, the nav "you are here" state, the active dot, the HUD count, the hero's accent word, the focus card's ring. In the storyboards amber is also the *pain* color — the Data Engineer torn between systems wears amber.

### Secondary
- **«Маркер Хранилища» (Storage Blue)** (#4fa8e0): cold storage, lakes, object stores, catalogs, metadata. The color of "where data rests" — the most frequent accent in architecture schemes.

### Tertiary
- **«Маркер Успеха» (Success Green)** (#3dd68c): commits, correct paths, happy moods, ✓ statuses. Activity, not "success" in a business sense.
- **«Маркер Ошибки» (Error Red)** (#e5534b): failures, blocked links, ✗ and ⚠ statuses. System errors only — never decoration.

### Neutral
- **«Глубокая Доска» (Deep Board)** (#121212): page background and scene canvas — the board itself.
- **«Поднятая Плёнка» (Raised Sheet)** (#1a1a1a): one step up — page cards, Stage frame, the shell nav.
- **«Карточка» (Card Surface)** (#1f1f1f): component panels, actor glyphs, deck nav buttons.
- **«Вложенная Карточка» (Inset Surface)** (#171717): nested cards in layer stacks, the Stage goal strip, chips.
- **«Мел» (Chalk)** (#ececec): primary text — *the* reading ink, used even for labels and timecodes. **«Мягкий Мел» (Soft Chalk)** (#9a9a9a): dimmed and neutral chrome only (neutral badge icons, spinner neutral, dimmed card icons). **«Бледный Мел» (Faint Chalk)** (#8c8c8c): the dimmest state — disabled elements, tiny file grids (≥4.5:1 on the board and on card surfaces).
- **Hairlines** (rgba(255,255,255,0.09) / strong 0.17): every border, in every role.

Tint pairs accompany each marker (`-dim` at 12% alpha, `-border` at 38%) —
the only places a marker's color can appear as a fill.

### Named Rules

**The Tint Rule.** A tone at rest is a hairline border plus a colored glyph
(icon, arrow line, badge icon) — never a colored card. Full-saturation
marker ink as a fill appears only on tiny elements: the blocked ✗ dot,
Spinner arcs, the diamond knob mark. The color you remember is the marker;
the card you see stays gray.

**The One-Meaning Rule.** Each marker has exactly one role — attention /
storage / success / error. Amber never signals errors, green never decorates
a hero panel, red never means "hot". If a hue's role is wrong, no code is
wrong: the color choice *is* the claim.

**The Chalk-Only Rule.** Reading copy is bright chalk (#ececec) everywhere
— body, labels, captions, timecodes. The two grays (#9a9a9a, #8c8c8c) are
reserved for elements that are dimmed, disabled, or explicitly neutral;
a sentence a viewer must read is never set in gray.

## Typography

**Display Font:** Inter Variable (with Inter / system-ui / -apple-system fallback)
**Body Font:** Inter Variable
**Label/Mono Font:** JetBrains Mono Variable (with SF Mono / Cascadia Code fallback)

**Character:** a technical-editorial pairing — the sans carries the reading
(calm, neutral, slightly tight), the mono carries the annotation layer
(cold, precise, uppercase). Titles and body are sans; everything that *names*
something — labels, tags, timecodes, goals, legends — is mono.

### Hierarchy
- **Display** (700, clamp(48px, 7vw, 72px), -0.02em, line-height 1.05): the scene headline — once per scene, centered on the briefing screen, with the key phrase in amber.
- **Headline** (600, clamp(22px, 2.6vw, 32px), 0.01em): card titles in the first viewport (architecture cards), page h1s.
- **Title** (600, 18px): Stage scene titles, the HUD goal line (18px, line-height 1.45).
- **Body** (400, 16px, line-height 1.55): reading copy, max ~560px width in the demo shell.
- **Label** (600–700, 12–13px mono, letter-spacing 0.06–0.12em, uppercase): the dominant mode — panel headers (13px/0.09em), badge labels (13px/0.06em), arrow labels, role tags, timecodes (13px), HUD count (15px/700, amber).

### Named Rules

**The Arm's-Length Rule.** Type is sized for reading from arm's length on a
fullscreen scene: display 48–72px, reading never below 16px, mono labels
never below 12px. The small-scale demo look — sub-16px body, sub-12px mono,
28px display — is the confirmed rejection; there is no mode where type
shrinks below these floors.

**The Mono Labels Rule.** Every name, tag, timecode, and caption is mono
uppercase; the sans never goes uppercase, the mono never goes sentence case.
Mono sits in the 12–13px band at 600–700 weight with 0.06–0.12em tracking —
the annotation layer reads as a single cold, precise voice.

**The Rare Confidence Rule.** Display type appears once per scene — the
hero headline on the briefing screen. The system's default volume is quiet
16px reading; when a title gets to 48–72px, it's the event of the scene.

## Layout

The kit's rhythm comes from the `--bbg-gap-*` tokens: 10 / 20 / 32px under
every composition; in-scene micro-gaps run 8–18px between chips, tiles, and
arrows.

- **The full-viewport deck** (the flagship form): each scene is 100% of the
  viewport, the deck scrolls horizontally with scroll-snap (`x mandatory`,
  `scroll-snap-align: start`), and the wheel translates vertical deltas into
  horizontal scrubbing when the scene fits the viewport. Scene frames pad
  78px top / 96px sides / 66px bottom so content clears the HUD bars.
- **The HUD** is the deck's grammar, not chrome: a top bar (72px: exit link,
  deck title, dot nav, amber count "01 / 12", timecode) and a bottom bar
  (78px: scene number + goal line on the left, prev/next chevron buttons on
  the right). Keyboard ← → and the buttons drive the deck.
- **Scenes are centered compositions**: each scene is a width-constrained
  column (`min(880–1400px, 100%)`) built from equal-column grids
  (`repeat(n, minmax(0,1fr))` — Comparison's shape), `1fr auto 1fr` splits
  with a vertical Divider, and stacked panel rows. Composition is the job of
  the author's grid, never coordinates.
- **The first viewport is a briefing**: display headline 48–72px, three
  architecture cards as large instruments (padding 40/48px, min-width
  300px) — the center card in focus with an amber ring and a question chip,
  the flanking cards dimmed to 35%.
- At ≤900px the deck's grids collapse to single-column stacks and the hero
  drops to 40px; the shell collapses at 860px. These are the only
  breakpoints — the kit composes, it does not reflow.

### Named Rules

**The One-Scene-One-Viewport Rule.** A scene is a finished macro-composition
that fills the screen; the next thought is the next screen. No scene content
bleeds into the next scene's frame, and a scene that needs two viewports
needs two scenes.

**The HUD Grammar Rule.** Every deck carries count, timecode, and goal as
first-class chrome: an amber scene counter, the current scene's timecode,
and a one-line goal on the bottom strip. A storyboard without its
count/timecode/goal is unfinished.

## Elevation & Depth

This system has **no drop shadows**. Depth is conveyed exclusively by
surface brightness and hairline separation: #121212 (board) → #1a1a1a
(sheet) → #1f1f1f (card) → #171717 (inset) — each step up brightens the
surface and, usually, thins the border. The only translucency in the world
is the HUD bars themselves: rgba(18,18,18,0.85) with an 8px backdrop blur so
content scrolls under the chrome.

The only box-shadows in the codebase are **halos** — rings painted behind
an element, never an offset shadow. Three sanctioned halo uses:

- **Focus ring** (`0 0 0 1px` marker-border): the "you are here" state —
  the focus architecture card, the merge hub, the recommended pick.
- **Separation halo** (`0 0 0 3px` --bbg-bg): the blocked ✗ dot keeps the
  red circle from kissing the line beneath it.
- **Pulse** (`0 0 0 5px` at 18% marker alpha, 2s loop): the live state —
  pulsing badges and the floating warning dot.

### Named Rules

**The Brightness Stack Rule.** Elevation is a lightening ladder, never a
shadow. If a surface needs to read higher, lighten it; a drop shadow is
always a design error in this system.

**The Halo Rule.** When an element must separate from what's behind it, use
a ring of background color or marker tint (`0 0 0` with a tight spread), not
an offset shadow. A halo reads as "this element is here"; a drop shadow
reads as "this element is floating", which this world never says.

## Shapes

Gently curved cards, chip tiles, fully pill badges — the radius scale is
tiny on purpose so geometry stays technical:

- **Cards** (10px): panels, Stage frames, deck nav buttons, engine chips.
- **In-scene tiles** (8px): step rows, data chips, logo chips, question chips, file boxes, version cards, workload chips.
- **Insets** (6px): nested panels, small containers.
- **Chips** (4px): the tiny square tags — arrow labels, the goal strip's "цель" chip, column chips in version tables.
- **Pills** (999px): badges, the stage index chip, question chips, the active dot, the spectrum track. Actor glyphs are circles (50%).
- **Lines**: hairline 1px borders only, opacity 0.09/0.17 — never thicker, never colored (colored lines are *arrows*, which are data, not borders). A **dashed** hairline border marks a provisional zone — file boxes, question chips, write targets.
- **Icons**: drawn-SVG line art from the kit registry (50 names) — 24px grid, 1.5px stroke (2.5px in the blocked ✗), round caps and joins, small filled dots for status LEDs. Icons render by name from `Icon.svelte`; there is no other icon mechanism in the system.
- **Arrows**: 2px lines with triangle heads cut from the line color; dashed 10/16 at 75% opacity for metadata/occasional, animated 8/16 with a 0.7s flow for live movement, blocked as a red ✗ dot with a halo.
- **The diamond**: a square rotated 45° (12px, 2–3px bg border) marks a position on a spectrum track — the trade-off knob.

## Components

### Panels
- **Shape:** cards (10px), hairline border (rgba white 0.09), padding 12/14px; `inset` variant drops to #171717 with 6px radius and 10px padding.
- **Character:** quiet containers with a mono header — the header is the panel's voice, the body is whatever composition the author needs.
- **Header:** optional mono uppercase label (13px, 600, 0.09em), 14px icon, and a pill badge (`999px`, mono 12px/600, uppercase, 0.06em, hairline border) on the right — the badge carries version/format tags like "S3" or "v2".
- **Tones:** default / blue / green / amber / red. A tone tints only the border (38% alpha) and the header icon (full marker color); the panel surface stays #1f1f1f. `bare` mode (no header) tightens padding to 10px.

### Badges (StatusBadge)
- **Style:** pill (999px, 30px tall, padding 0 14px), tinted fill (marker at 12% alpha) + hairline border (38% alpha), mono 13px/600 label (0.06em tracking), 15px icon in full marker color.
- **Tones:** success (✓ green), error (✗ red), warning (⚠ amber), info (ⓘ blue), running (⟳ blue, spinning icon), neutral (gray, shield icon).
- **Live state:** `pulse` adds a soft expanding halo (`0 0 0 5px` at 18% marker alpha, 2s loop) — reserved for things that are happening now. The halo color is tunable via `--bbg-pulse-glow`.

### Arrows
- **Character:** the data-plane of the diagram — 2px lines in four directions with geometric triangle heads; default ink-faint color, tone recolors line and head.
- **Line languages:** solid (static relation), dashed 10/16 at 75% opacity (metadata / occasional queries), animated 8/16 flow (live data movement — the one arrow that moves), blocked (red ✗ chip on the line with a bg halo — a prohibition, not a state).
- **Label:** centered mono chip (13px, 600, 0.06em, hairline border, 4px radius) floating on the line, cut out of the board color.

### Actors
- **Character:** small people who carry the emotional payload — the "who suffers, who benefits".
- **Glyph:** circle (50%, 60px md / 48 sm / 78 lg) on card surface with hairline border; 26px user icon; the engineer role adds two dots as "glasses".
- **Moods:** neutral (chalk), happy (green border + tinted fill + green person), sad (amber border + tinted fill + amber person). Caption: name 16px/600 sans + role 12px mono uppercase.
- **Dim:** `dim` recedes to 35% — "not the focus right now".

### Stage (scene frame)
- **Character:** the storyboard's unit of storytelling — a header bar, a goal line, and a screen canvas.
- **Bar:** amber index chip (pill, tinted fill, mono 12px/700), title (18px/600 sans), timecode (mono 12px) pushed right.
- **Goal:** a full-width caption strip on the inset surface, mono 14px, with a tiny "цель" label chip (12px/700, 4px radius) — one line, one intent.
- **Screen:** the canvas — deep-board background, 24/28px padding, 18px vertical gap. Children compose freely.

### Divider
- Hairline (rgba white 0.17) with an optional centered mono uppercase label (12px, 600, 0.08em); tone recolors the line to the marker's border alpha and the label to the marker. Horizontal is a full-width rule; vertical is a 1px column splitter (the canonical "vs" of a Comparison).

### Spinner
- Ring loader: 18%-opacity track circle + full-marker arc, 0.9s rotation; tone picks the marker. The kit's one admitted loop, for "this is running".

### The HUD (deck chrome)
- **Bars:** top 72px / bottom 78px, rgba(18,18,18,0.85) with 8px blur, hairline border on the inner edge.
- **Dot nav:** 11px circles in hairline-strong; the active dot becomes an amber pill (`scaleX(3.1)`), hover lifts dots to soft chalk.
- **Count:** mono 15px/700, amber, zero-padded "01 / 12". **Timecode:** mono 13px, chalk.
- **Goal strip:** scene number mono 13px/700 uppercase amber + goal text 18px sans chalk.
- **Nav buttons:** 48px squares (10px radius, panel fill, hairline border) with drawn-SVG chevron-left/right icons from the registry (22px); hover turns the chevron amber, disabled fades to 30% opacity.

## Do's and Don'ts

### Do:
- **Do** set all reading type at ≥16px and all mono labels at 12–13px uppercase — the Arm's-Length Rule is the kit's signature scale.
- **Do** set every name, tag, and timecode in mono uppercase with 0.06–0.12em tracking — it's the kit's signature voice.
- **Do** show a tone as border + colored glyph at rest; let the full marker color out on small elements (icons, lines, dots) only.
- **Do** dim inactive elements to 35% opacity (`bbg-dim`) — attention is a dimming mechanic, and it recovers on hover/focus-within.
- **Do** build one scene per viewport in storyboards, with count, timecode, and goal in the HUD.
- **Do** encode "live" as motion: flowing dashes, a spinning loader, a pulsing badge — and let static diagrams stay static.
- **Do** reach for #1a1a1a → #1f1f1f → #171717 when a surface must nest deeper. Brightness is the only elevation.
- **Do** use drawn-SVG icons from the kit registry, including `chevron-left` / `chevron-right` for deck navigation.

### Don't:
- **Don't** use drop shadows — a halo (bg ring, focus ring, pulse) is the only separation device in the system.
- **Don't** set type below the arm's-length floors — no 14px reading, no 10px labels; the small-scale demo look is the confirmed rejection.
- **Don't** set readable copy in gray — chalk is the reading ink; gray belongs to dimmed, disabled, and explicitly neutral elements.
- **Don't** use glyph characters (◀ ▶ ← etc.) as icons — icons come from the drawn-SVG registry; a single text arrow in a label or hint is acceptable, an icon is not.
- **Don't** borrow the office-supply metaphor: no sticky notes, no hand-drawn wobble, no marker-streak textures. Geometry is exact or it's wrong.
- **Don't** invent accents beyond the four markers, and never reuse one marker for a second meaning (amber = attention, always).
- **Don't** use pure black (#000), or surface fills in full marker colors — the board is deep gray and stays quiet.
- **Don't** paint decorative gradients on panels or type. The three sanctioned gradient devices: arrow dash patterns, the spectrum track (hairline→amber), and the scene backdrop's ambient blue wash.
- **Don't** set sans type in uppercase or mono type in sentence case — the Mono Labels Rule holds everywhere.
- **Don't** animate for decoration: no hover bounces, no entrance choreography on containers. Motion means activity, nothing else.
