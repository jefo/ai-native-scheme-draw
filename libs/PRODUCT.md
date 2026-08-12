# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Developers who assemble system-design diagrams in their own
projects. They import the kit as an npm package and compose ByteByteGo-style
dark architecture schemes from ready-made elements — containers, connectors,
badges, actors — without writing diagram geometry or layout math.

**Author (confirmed):** The product owner builds full-screen storyboards
("Router vs Controller", "What is a Data Lakehouse?") as video-script
storyboards in the ByteByteGo style. The storyboards are demo material today
and, per owner decision, a candidate for a fixed kit format in the future.

## Product Purpose

A dark UI kit of ready visual elements for system-design diagrams. Where the
sibling product in this repo (ai-native-scheme-draw) is a *semantic grammar*
(meaning before geometry), this kit is a *set of ready elements*: from ~20
base pieces any architecture scheme is assembled in 15 minutes. The demo
also exercises a full-screen, horizontal storyboarding format — one complete
macro-composition per viewport, timecodes and goals in a HUD — that is
intended to become part of the kit.

## Positioning

1. **Ready elements, not a grammar.** No abstract taxonomy to learn: Panel,
   Arrow, Badge, Actor compose into diagrams the way a video script or a
   slide deck does. The sibling semantic library lives in the same repo but
   serves a different authoring mode.
2. **ByteByteGo register.** The look is the message: deep-gray surfaces,
   hairline borders, four semantic accents (amber attention, blue storage,
   green success, red errors), inactive elements recede to 35% opacity.
3. **Scene-first storyboarding.** A scene is a finished macro-composition on
   the screen — 9:16 Stage cards or 100%-viewport horizontal decks with
   scroll-snap, timecodes and goals. Storyboards are built at scene level;
   fine frames (in-scene appear/disappear) are a later step, not part of the
   current format.

## Operating Context

- The kit is consumed via npm (`sysdiag-ui-kit`): tokens imported once
  (`sysdiag-ui-kit/styles/tokens.css`), components imported from the barrel
  (`src/lib/index.ts`).
- Development loop: Vite dev server on :5174 with a hash-routed demo shell —
  `#gallery` (inventory + "Data Lakehouse" hero assembly), `#storyboard`
  (6 Stage scenes), `#lakehouse` (12 full-screen scenes, horizontal
  scroll-snap deck).
- The author's workflow: write the scene-by-scene spec first (timecode,
  goal, composition), then compose each scene from kit elements; the deck
  layer (HUD, dots, prev/next, keyboard, wheel-to-horizontal) is demo code.
- Verification is manual: `svelte-check`, `svelte-package` build, demo
  build, SSR smoke tests. No test suite yet.

## Capabilities and Constraints

**Capabilities:**
- 10 components: `Panel` (tones/variants/badge), `Comparison`, `Divider`,
  `Icon` (47 line-art icons via the `IconName` registry), `StatusBadge`
  (6 tones, pulse, style override), `Spinner`, `Arrow` (4 directions,
  dashed/animated/blocked/label), `Stage` (index/title/timecode/goal),
  `Actor` (3 roles, moods, dim).
- Tokens (`tokens.css`): surfaces #121212/#1a1a1a/#1f1f1f, four accents with
  dim/border companions, hairline borders only, no shadows, radius 10/6.
- Attention mechanics: `.bbg-dim` (35% opacity) for inactive elements.

**Constraints:**
- Frontend-only; no backend, no auth, no data persistence.
- Svelte 5 runes mode is the component contract; consumers must run Svelte 5.
- Demo pages (`src/App.svelte`, Gallery, Storyboard, Lakehouse) are not part
  of the published package — only `src/lib` is.
- The storyboard deck (full-screen horizontal viewer) is demo-level code;
  whether it becomes a kit component is an open decision. Fine-frame
  breakdown (in-scene appear/disappear) is explicitly deferred.

## Brand Commitments

- Name: **SysDiag UI Kit** (npm `sysdiag-ui-kit`).
- Visual register pinned by the owner: ByteByteGo-style dark UI — bg
  #1A1A1A/#121212, accents yellow/blue/green/red, non-active elements
  dimmed to 30–40%.
- **Canon action (2026-08-11):** the category standard is a committed
  choice, not a default — the ByteByteGo-style explainer register played
  straight, at full craft, at the quality bar of ByteByteGo × Fireship ×
  3Blue1Brown × Stripe/Linear. Scale mandate: scenes fill the viewport,
  information dense; reading ≥16px, mono labels ≥12px, display 48–72px,
  elements 1.5–2× current; gray ink is for disabled/dimmed states only,
  never for readable text.
- Voice: technical-editorial. Mono type for labels/tags/timecodes, sans for
  body; accents only on semantic state; Russian demo copy, English API.

## Evidence on Hand

- `README.md` — inventory, install, build commands.
- Demo pages: `#gallery` (full inventory + "Data Lakehouse" hero assembly),
  `#storyboard` (6 scenes, 3:30), `#lakehouse` (12 scenes, 6:58).
- Full scene-by-scene storyboard specs with timecodes and goals (Router vs
  Controller; What is a Data Lakehouse?) recorded in the conversation.
- No tests, no customer testimonials, no external deployments — do not
  fabricate these.

## Product Principles

1. **Ready elements over grammar.** The kit sells assembly speed: ~20 base
   pieces cover any architecture diagram; extend the element set, not the
   layout gallery.
2. **Color is meaning.** Four accents each carry a semantic role; everything
   else is hairline + dim. A diagram should survive grayscale except where
   meaning is encoded.
3. **Scene-first storytelling.** One scene is one complete macro-composition
   on screen; timecodes and goals are first-class. Frames and transitions
   come after scenes exist.
4. **Consumers never do geometry.** Components take meaning (tone, state,
   label), never coordinates; layout is the kit's job.
5. **The demo is the contract.** The demo shell and storyboards are the
   primary feedback loop and the de facto spec of the visual register until
   a DESIGN.md exists for the kit.
