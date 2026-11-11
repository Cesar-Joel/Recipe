# Data Model: Walking Skeleton Shell

This feature stores and displays no user data (FR-012). There are no entities, relationships, or state transitions.

The only structured information is fixed, build-time text in `src/lib/sections.ts`:

| Field | Meaning |
|-------|---------|
| `key` | Stable identifier (`weekly-menu`, `recipes`, `shopping-list`) |
| `name` | Label shown in navigation and as the screen title |
| `route` | Address of the section (`/`, `/recipes`, `/shopping-list`) |
| `description` | One sentence on the section's future purpose |

Rules (checked by Jest): exactly three entries in the order Weekly Menu, Recipes, Shopping List; unique `key`, `name`, and `route`; `description` non-empty and a single sentence.
