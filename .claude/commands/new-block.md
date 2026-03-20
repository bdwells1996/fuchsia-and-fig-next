# Scaffold a new page block

Create a new Sanity block type and its corresponding React component for use in the page builder.

## Instructions

Ask the user for the following if not already provided:
- **Block name** — e.g. "Testimonial Grid", "Image Banner"
- **Content fields** — what editorial content does it hold?
- **Appearance options** — theme, layout, alignment choices?
- **Animation support** — does it have a heading, repeating items, or is it a single whole-block element?

Then generate both files following the rules below.

---

## Schema file (`src/sanity/schemaTypes/<name>Type.ts`)

Follow the field ordering from `docs/schema-guidelines.md`:

1. Content fields first
2. Appearance fields second (theme, layout, alignment)
3. Animation fields last — use `animationConfig` type, never inline animation fields

Naming conventions:
- `titleAnimation` for a heading
- `itemAnimation` for repeating children (enable stagger hint in description)
- `animation` for a single whole-block animation

Every non-obvious field must have a `description`. Animation fields must say "Leave unset for no animation." Numeric/enum fields with defaults must say "Fine to leave as default if unsure."

Export the type and add it to `src/sanity/schemaTypes/index.ts`.

---

## React component (`src/components/<section>/<Name>.tsx`)

- Accept a typed props interface derived from the schema shape
- Use CSS custom properties and component layer classes from `globals.css` — no hardcoded colour or spacing values
- If the block has animation fields, wire them up using the existing animation infrastructure
- Keep the component focused — no data fetching, no business logic

---

## Checklist before finishing

- [ ] Schema field order: content → appearance → animation
- [ ] All animation fields use `animationConfig` type
- [ ] All non-obvious fields have descriptions
- [ ] Animation field descriptions include "Leave unset for no animation"
- [ ] Stagger-relevant fields mention `Enable "Stagger Children"`
- [ ] Schema type exported and registered in `index.ts`
- [ ] React component uses design system tokens only
