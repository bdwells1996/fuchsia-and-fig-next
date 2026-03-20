# Schema authoring guidelines

Follow these rules whenever adding or updating a Sanity schema type (`src/sanity/schemaTypes/`).

## Field ordering

Arrange fields in this order within every block/object type:

1. **Content fields** — the primary editorial content (title, body, images, items array, etc.)
2. **Appearance fields** — visual options that don't require animation knowledge (theme, layout, alignment)
3. **Animation fields** — always last; editors who don't need them can ignore them without scrolling past them

Never interleave animation fields with content or appearance fields.

## Animation fields

- Every block that supports animation uses the shared `animationConfig` object type — do not inline bespoke animation fields.
- Name animation fields consistently:
  - `titleAnimation` — for the section/block heading
  - `itemAnimation` — for repeating child elements (cards, grid items, list rows)
  - `animation` — for a single, whole-block animation (e.g. a CTA banner)
- Place animation fields at the bottom of the field list, after all content and appearance fields.
- Always set a `description` on the animation field itself that:
  - States it is optional and what element it animates (e.g. `'Optional entrance animation for the section heading.'`)
  - Says `'Leave unset for no animation.'`
  - Mentions `'Enable "Stagger Children" to cascade items in one after another.'` where stagger is relevant (repeating children)

## Field descriptions

Every field should have a `description` unless its purpose is completely self-evident (e.g. a `title` string on a simple object). Good descriptions:

- Explain **what the field does** in plain language, not just restate the field name
- State the **default or recommended value** where one exists (e.g. `'400ms is a good default'`)
- Include `'Fine to leave as default if unsure.'` on any non-obvious numeric or enum field that has a sensible initial value
- For fields with constrained options, describe what each option visually produces where that isn't obvious from the label alone

## `animationConfig` field descriptions (reference)

When writing descriptions for fields inside `animationConfigType`, follow the patterns already established there — plain-language effect descriptions on the preset options, "fine to leave as default" on duration/delay/easing/threshold, and explicit stagger guidance. Do not change these without updating this section too.
