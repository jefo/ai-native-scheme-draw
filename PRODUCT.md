# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary:** Thinkers who explain ideas — researchers, educators, product thinkers, and technical communicators who need to make complex concepts visually understandable. They are not designers or video editors; they are domain experts who currently reach for whiteboards, slideware, or diagram tools to externalize their thinking.

**Audience:** People consuming those explanations — in a feed, in a talk, in documentation. They are there to understand, not to be sold to.

## Product Purpose

A semantic grammar for composing visual explanations. Instead of drawing rectangles and arrows, the author declares what things *are* (entities, relations, states, values, events) and how they relate (predicates), and the library composes them into a single coherent visual thought. The output format is a 9:16 vertical "Visual Thought Unit" — one idea per scene, optimized for short-form feed consumption and mobile-first viewing.

## Positioning

Three things a neighboring tool cannot truthfully claim:

1. **Semantic composition, not drawing.** Chart libraries and diagram tools operate on geometry — you place and connect shapes. This library operates on meaning — you declare semantic objects and predicates, and the visual form follows. The author thinks in concepts, not coordinates.

2. **Grammar, not templates.** A small, stable taxonomy of primitives (objects + predicates) composes into an unbounded space of visual thoughts. Like language, not like a template gallery. Every scene is a sentence built from the same parts of speech.

3. **Thought leadership format.** Inspired by IBM Technology's YouTube Think series — where engineers draw concepts on whiteboards for their audience. IBM doesn't sell; they educate. This library is the toolchain for that mode of communication: authoritative, generous, visual thinking that builds personal brand through explanation rather than persuasion.

The 9:16 format is not a gimmick — it is the native shape of where this kind of explanation is consumed today (phone feeds, vertical video platforms, talk slides on mobile).

## Operating Context

- Authors compose scenes programmatically (Svelte components) or via a future visual editor
- Scenes are consumed in vertical-scroll feeds, embedded in articles, or sequenced in talks/presentations
- The workflow mirrors the IBM Technology YouTube pattern: a domain expert thinks through a concept, composes it into visual thoughts, and publishes the explanation
- Each scene is self-contained — one thought, one viewport — and scenes can be sequenced into threads/decks

## Capabilities and Constraints

**Capabilities (current, Milestone 1):**
- 5 Semantic Objects: Entity, Relation, State, Value, Event
- 7 Layout Predicates: Flow, Compare, Containment, Hierarchy, Timeline, Cycle, TradeOff
- 4 Attention Predicates: Focus, Reveal, Highlight, Dim
- Scene compositor (9:16 Visual Thought Unit)
- Two visual themes: paper/sketch (default) and brutalist

**Durable constraints:**
- Svelte 5 component library (runes mode) — no backend, no database, no auth
- 9:16 vertical format is mandatory for all Scene compositions
- The 5+7+4 taxonomy is the stable core — new work extends it, does not replace it
- Frontend-only: Vite + TypeScript build pipeline

**Undecided:**
- Whether the library eventually ships with a visual (no-code) editor or remains code-only
- Publication/distribution mechanism for composed scenes
- Sequencing/threading model for multi-scene narratives

## Brand Commitments

**Undecided.** The project currently uses the working name "Visual Narrative Library" (npm package `visual-narrative-lib`). The user intends this as a personal brand vehicle for thought leadership, but the brand name, voice, and identity are not yet set. The Russian copy in the current codebase is incidental, not a brand commitment.

## Evidence on Hand

- Working Svelte 5 component library (`src/lib/`) with all 16 primitives and Scene compositor
- Demo preview screen (`src/App.svelte`) showcasing every primitive with variants
- Brutalist theme demo (`src/BrutalistDemo.svelte`, `src/lib/themes/brutalist.css`)
- Design tokens in `src/app.css` (paper/sketch theme)
- Git history: Milestone 1 (grammar on one screen), Brutalist theme addition

**Absences that future work must not fabricate:** user testimonials, real-world usage data, performance benchmarks, audience metrics.

## Product Principles

1. **Meaning before geometry.** The author declares semantics; the library resolves visuals. Never make the author think about coordinates, pixels, or layout math.

2. **One scene, one thought.** A Visual Thought Unit expresses a single idea that was not present in its objects individually. If a scene needs two ideas, it needs two scenes.

3. **Grammar scales, templates don't.** Invest in the generative power of a small, stable taxonomy rather than a growing gallery of one-off layouts. Every new predicate must compose with every existing object.

4. **Educate, don't sell.** The output earns attention through explanatory clarity, not persuasion tactics. The IBM Technology pattern — an engineer at a whiteboard, thinking with you — is the north star for tone and authority.

5. **Mobile-native, not mobile-adapted.** 9:16 is a first-class design constraint, not a responsive fallback. Scenes are born vertical.

## Accessibility & Inclusion

Not yet established. The web platform and semantic (rather than purely visual) primitives provide a foundation for screen-reader descriptions and keyboard navigation, but no specific accessibility requirements have been set.
