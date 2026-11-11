# UI Contract: Routes and Navigation

## Addresses

| Address | Screen | Notes |
|---------|--------|-------|
| `/` | Weekly Menu | Landing section (FR-004) |
| `/recipes` | Recipes | |
| `/shopping-list` | Shopping List | |
| any other | Not found | Message + link to `/` (FR-011) |

Reloading or opening any of the first three addresses directly shows that section.

## Navigation bar

- Entries, in order: Weekly Menu, Recipes, Shopping List. Text labels only.
- Present on all three sections; absent on the not-found screen.
- Narrow window (< 768 px): bar at the bottom. Wide window (>= 768 px): bar on the left. Changes live on resize.
- One tap/click moves to any other section (FR-005). Entries are reachable and activatable by keyboard with a visible focus indicator (FR-006). The current entry is visually distinct (FR-007).

## Screen content

Each section screen shows, centered with a maximum width: the app name "Recipe" (small), the section name (heading), and its one-sentence description. Nothing else (FR-003).

## App identity

Name "Recipe" in browser tab title, phone app label, and on-screen (FR-010). Phone orientation: portrait only (FR-013).
