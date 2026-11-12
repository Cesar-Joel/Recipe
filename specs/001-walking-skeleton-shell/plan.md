# Implementation Plan: Walking Skeleton Shell

**Branch**: `001-walking-skeleton-shell` | **Date**: 2026-11-10 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-walking-skeleton-shell/spec.md`

## Summary

Replace the Expo starter screen with the app's own shell: three sections (Weekly Menu, Recipes, Shopping List), with Weekly Menu as the landing screen reachable through Expo Router tabs. Each section shows only the app name, its own name, and one sentence. The tab bar sits at the bottom on narrow screens and moves to the left side on wide windows. Content is centered with a maximum width. The phone is locked to portrait. The app is named "Recipe" everywhere (tab title, phone label, on-screen). Starter content is removed. No data, storage, or new runtime dependencies. Technical choices follow the constitution (Expo Router, React Native components only, `StyleSheet`, TypeScript strict, Jest for logic).

## Technical Context

**Language/Version**: TypeScript 6 (`strict`), React 19.3, React Native 0.88 (Expo SDK 58, `expo ~58.0.23`)

**Primary Dependencies**: `expo-router` (tabs, already installed), `react-native-web` (already installed). No new runtime dependencies. Dev only: `jest-expo`, `jest`, `@types/jest`, `prettier`

**Storage**: N/A (no data in this feature)

**Testing**: Jest with the `jest-expo` preset for the section-definitions module; manual checklist on phone (Expo Go) and browser ([quickstart.md](./quickstart.md))

**Target Platform**: Phone via Expo Go (iOS/Android, portrait only) and desktop browser via react-native-web

**Project Type**: mobile-app + web (single Expo codebase)

**Performance Goals**: Section switch takes a single tap or click with no perceptible delay (spec SC-002); no loading states because nothing is fetched

**Constraints**: One codebase; React Native components only (no `div`/`span`); no platform-specific files; works from ~320 px to wide desktop widths; no horizontal scrolling

**Scale/Scope**: 3 screens + 1 not-found screen; one user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Learning Is Part of the Deliverable**: "New Concepts" below is complete; every decision in [research.md](./research.md) records decision, rationale, and alternatives.
- [x] **II. Small, Always-Runnable Increments**: 3 prioritized, independently testable stories (P1/P2/P3); `npx expo start` keeps working after each story (see task ordering in `/speckit-tasks`).
- [x] **III. One Codebase for Phone and Computer**: only `View`/`Text`/`Pressable`-family components; zero platform-specific code; all libraries already support Android, iOS, and web; layout driven by window width.
- [x] **IV. Simplicity First (YAGNI)**: no new runtime dependencies; no state beyond reading window width; no data; styling via `StyleSheet`; no icon library (text-only tabs).
- [x] **V. Verifiable Quality**: strict TypeScript, no `any`; section definitions live in `src/lib/` with Jest tests; each story has a phone + browser manual checklist in the quickstart.

**Post-design re-check (after Phase 1)**: all five gates still pass. Dev-only additions (Jest, Prettier) are required by the constitution's constraints table, not exceptions. Complexity Tracking stays empty.

## New Concepts

| Concept | What it is | Why it is used here | Alternative rejected (and why) |
|---------|------------|---------------------|--------------------------------|
| File-based routing | Every file in `src/app/` becomes a screen/URL (`recipes.tsx` → `/recipes`) | Gives each section its own address, so reload and direct links work (FR-011) | Hand-written navigator config: more code and no free URLs on web |
| Route group `(tabs)` | A folder in parentheses groups screens under one layout without adding to the URL | Lets Weekly Menu live at `/` while sharing the tab bar | Putting tab layout at the root: leaves no place for the not-found screen outside the tabs |
| `_layout.tsx` | A file that wraps all screens in its folder with a navigator | Root layout holds the stack; `(tabs)/_layout.tsx` holds the tab bar | Repeating the nav bar inside every screen: duplication |
| `Tabs` (JavaScript tabs) | Expo Router's tab navigator; renders links on web, touch targets on phone | One component gives touch, mouse, and keyboard navigation, and marks the current tab (FR-005–007) | `NativeTabs`: platform-native look, but its web/keyboard support and sidebar behavior are less certain, and it is harder to learn first |
| `tabBarPosition` | Option placing the tab bar at bottom/top/left/right | Bottom on phones, left sidebar on wide windows (FR-008) | Building a custom sidebar with `Pressable`: reinvents focus and active-state handling |
| `tabBarLabelPosition` | Option choosing whether a tab label sits beside or below its icon | Below 768 px the default puts labels under the (empty) icon at size 10, where they get clipped; `beside-icon` keeps them readable at every width (FR-008, SC-004) | Hiding the icon slot with `tabBarIconStyle`: kept as a fallback if `beside-icon` still clips |
| `useWindowDimensions` | Hook returning the current window width/height, updating on resize | Chooses bottom vs. left bar and limits content width | CSS media queries: not available in React Native `StyleSheet` |
| `StyleSheet.create` | React Native's way to define styles as objects | Styles every screen (constitution requires it) | Styling libraries: banned by Principle IV for the MVP |
| `+not-found.tsx` | Special route Expo Router shows for unknown addresses | Friendly not-found screen with a link back (FR-011) | Default 404 page: has no way back into the app |
| `generateMetadata` | SDK 58 function exported from a route to set the page title/description at build time | Sets browser tab title "Recipe" in the HTML before JavaScript runs (FR-010) | `<Head>` from `expo-router/head`: updates only after load |
| `app.json` config | Single file for app name, orientation, web output, plugins | Sets name "Recipe", portrait lock (FR-013), light-only look | Editing native folders: forbidden by the constitution |
| Path alias `@/` | `@/lib/...` points at `src/lib/...` (already in `tsconfig.json`) | Short, stable imports | Long `../../` paths: brittle |
| Jest + `jest-expo` | Test runner configured for Expo projects | Unit-tests the section definitions | Testing UI only by hand: slower feedback for logic |
| React Compiler | Already enabled in `app.json`; auto-optimizes re-renders | Nothing to do: do not hand-write `useMemo`/`useCallback` | Manual memoization: unnecessary noise |

## Project Structure

### Documentation (this feature)

```text
specs/001-walking-skeleton-shell/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output (no entities)
├── quickstart.md        # Phase 1 output (run + manual checklists)
├── contracts/
│   └── routes.md        # Phase 1 output (UI/route contract)
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output (/speckit-tasks - NOT created here)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── _layout.tsx              # Root stack; hides stack header, mounts (tabs)
│   ├── +not-found.tsx           # Friendly unknown-address screen
│   └── (tabs)/
│       ├── _layout.tsx          # Tabs: bottom bar on narrow, left bar on wide
│       ├── index.tsx            # Weekly Menu (route "/")
│       ├── recipes.tsx          # Recipes (route "/recipes")
│       └── shopping-list.tsx    # Shopping List (route "/shopping-list")
├── components/
│   └── SectionScreen.tsx        # Shared layout: centered, max-width, title + sentence
└── lib/
    ├── sections.ts              # Names, routes, one-sentence descriptions (single source of truth)
    └── __tests__/
        └── sections.test.ts     # Jest tests for section definitions

app.json                         # name "Recipe", portrait, light, web output, cleaned of starter bits
package.json                     # test script + jest preset; prune unused starter packages
```

**Structure Decision**: Single Expo project. Routes in `src/app/`; reusable UI in `src/components/`; logic in `src/lib/`, matching the constitution. The gitignored `example/` folder (starter reference) is left untouched. `src/app/index.tsx` (starter screen) is deleted and replaced by `src/app/(tabs)/index.tsx`.

## Complexity Tracking

No constitution violations. Nothing to justify.
