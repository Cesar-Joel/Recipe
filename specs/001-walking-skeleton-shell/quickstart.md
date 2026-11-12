# Quickstart: Walking Skeleton Shell

## Prerequisites

- Node and npm installed; dependencies installed (`npm install`).
- Expo Go on your phone, on the same network as the computer.

## Run

```bash
npx expo start        # then scan the QR code with Expo Go, and press "w" for the browser
npx expo start --web  # browser only
```

## Automated checks (run before closing any task)

```bash
npx expo lint
npx tsc --noEmit
npx jest
npx expo-doctor
```

Expected: no errors; Jest passes the section-definition tests.

## Manual checklist, Story 1: See and open the three sections (P1)

Phone (Expo Go) and browser:
1. App opens on Weekly Menu with no errors and no Expo starter text ("Edit src/app/index.tsx…").
2. Navigation shows Weekly Menu, Recipes, Shopping List.
3. Each section shows "Recipe", its name, and exactly one descriptive sentence, and nothing else.
4. Browser tab title is "Recipe"; the project shows as "Recipe" in Expo Go's project list (a real home-screen label needs a standalone build, out of scope).
5. Browse every screen, including the not-found screen: no unrelated example content. The not-found screen has no header bar (no "+not-found" title), only its message and the link back.

## Manual checklist, Story 2: Move between sections (P2)

Phone: tap each section from every other section; the current one is highlighted.
Browser: click each section from every other; then press Tab until a nav entry is focused (focus outline visible), press Enter/Space to open it; reach and leave all three with the keyboard only.

## Manual checklist, Story 3: Layout on narrow and wide screens (P3)

1. Phone: everything visible, no horizontal scroll, bar at the bottom, tap targets comfortable. Every tab label is fully visible at a font size of 12 or larger (also in a mobile browser, and in a desktop window at about 320, 600 and 700 px wide).
2. Phone: rotate the device; the app stays in portrait (FR-013).
3. Browser full width: bar on the left, content centered with a limited width, not stretched.
4. Resize the browser from wide to about 320 px and back: bar moves between left and bottom, nothing clipped or overlapping.
5. Reload on `/recipes` and `/shopping-list`: the same section shows. Open `/nope`: friendly not-found screen with a link back to `/`.
