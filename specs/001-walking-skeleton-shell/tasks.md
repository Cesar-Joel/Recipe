---

description: "Task list for the Walking Skeleton Shell feature"
---

# Tasks: Walking Skeleton Shell

**Input**: Design documents from `/specs/001-walking-skeleton-shell/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/routes.md, quickstart.md

**Tests**: Jest unit tests are REQUIRED for the only non-UI logic (`src/lib/sections.ts`). No component tests (spec does not call for them). Every user story has manual phone (Expo Go) and browser verification tasks; the steps are the checklists in [quickstart.md](./quickstart.md).

**Organization**: Tasks are grouped by user story. Paths are relative to the repository root (`/home/maverick/ProyectoRecetario/recetario`).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on unfinished tasks)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)

## Conventions for every task

- Before touching any Expo or React Native API, check the SDK 58 docs (`https://docs.expo.dev/versions/v58.0.0/`), as required by `AGENTS.md`.
- Use `npx expo install <package>` to add packages, never `npm install`.
- UI uses only React Native components (`View`, `Text`, `Pressable`, ...) and `StyleSheet.create`; no `div`/`span`, no styling libraries, no platform-specific files, no `any`.
- Add a brief comment the first time each new pattern appears (route group, `Tabs`, `useWindowDimensions`, `generateMetadata`, `+not-found`). Do not comment the obvious.
- Do not hand-write `useMemo`/`useCallback` (React Compiler is on).
- Do not edit or create `ios/` or `android/`. Do not touch `example/` (gitignored).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Test and format tooling required by the constitution

- [X] T001 Install dev tooling: run `npx expo install jest-expo jest @types/jest --dev` then `npx expo install prettier --dev` (SDK 58 needs Jest 30; the Expo command picks compatible versions) in `package.json`. Acceptance: `npx jest --version` prints a 30.x version
- [X] T002 In `package.json` add the script `"test": "jest"` (not `--watchAll`), the script `"format": "prettier --write src"`, and the top-level key `"jest": { "preset": "jest-expo" }`
- [X] T003 In `tsconfig.json` add `"types": ["jest"]` inside `compilerOptions` (keep existing `strict`, `paths`, `include`, `exclude`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: App identity, shared section copy, and the shared screen layout that every story uses

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 In `app.json` set `expo.name` to `"Recipe"`, `expo.userInterfaceStyle` to `"light"`, and `expo.web.output` to `"static"`. Keep `orientation: "portrait"`, `slug`, `scheme`, icons, plugins, and `experiments` as they are (research R4, R5, R6, R7). Keep `ios.icon` (`./assets/expo.icon`) and all other icon/splash paths unchanged (research R8: app-icon assets are exempt from FR-009)
- [X] T005 [P] Create `src/lib/sections.ts` exporting a typed, ordered, read-only list `sections` of `{ key, name, route, description }` with exactly these entries in this order: (1) key `weekly-menu`, name `Weekly Menu`, route `/`, description `Plan which meals you will eat on each day of the week.`; (2) key `recipes`, name `Recipes`, route `/recipes`, description `Keep the recipes you know how to cook, with their ingredients and instructions.`; (3) key `shopping-list`, name `Shopping List`, route `/shopping-list`, description `See everything you need to buy for the week's meals and check items off.` Also export the app name constant `APP_NAME = "Recipe"`. TypeScript strict, no `any` (data-model.md)
- [X] T006 [P] Create `src/lib/__tests__/sections.test.ts` with Jest tests for `sections`: exactly 3 entries; names in order `Weekly Menu`, `Recipes`, `Shopping List`; `key`, `name`, and `route` are each unique; the first route is `/`; every `description` is non-empty and is a single sentence (ends with one `.` and has no other sentence-ending `.`, `!`, or `?` followed by a space)
- [X] T007 [P] Create `src/components/SectionScreen.tsx`: a component taking `name` and `description` props that renders, inside a full-height `View` centered both ways, a small `Text` with `APP_NAME`, a heading `Text` with the section name, and a `Text` with the description. Nothing else (FR-003). Use `StyleSheet.create`, a plain light background and readable dark text, and a first-use comment about `StyleSheet`
- [X] T008 Run `npx jest` and confirm the `sections` tests pass (depends on T001–T003, T005, T006)

**Checkpoint**: Foundation ready — user stories can begin

---

## Phase 3: User Story 1 - See and open the three sections (Priority: P1) 🎯 MVP

**Goal**: The app opens on its own Weekly Menu screen, shows no starter content, and the three sections can be opened and show their name and one sentence.

**Independent Test**: Launch on phone and in the browser; Weekly Menu appears first, the other two open, each shows only "Recipe", its name, and one sentence; no starter content anywhere.

### Implementation for User Story 1

- [X] T009 [P] [US1] Create `src/app/(tabs)/index.tsx` (Weekly Menu, route `/`): default-export a screen that renders `SectionScreen` from `@/components/SectionScreen` with the name and description of `sections[0]` from `@/lib/sections`. Add a short comment explaining that the `(tabs)` folder is a route group that does not appear in the URL
- [X] T010 [P] [US1] Create `src/app/(tabs)/recipes.tsx` (route `/recipes`) the same way using `sections[1]`
- [X] T011 [P] [US1] Create `src/app/(tabs)/shopping-list.tsx` (route `/shopping-list`) the same way using `sections[2]`
- [X] T012 [US1] Create `src/app/(tabs)/_layout.tsx` using `Tabs` from `expo-router` with three `Tabs.Screen` entries named `index`, `recipes`, `shopping-list`, whose `title` comes from the matching entry of `sections`. `headerShown: false`. Text-only tabs: if default placeholder icons appear, hide them with `tabBarIcon: () => null` (research R3). Add a first-use comment explaining `Tabs`
- [X] T013 [US1] Replace the contents of `src/app/_layout.tsx` with a root `Stack` (from `expo-router`) containing `<Stack.Screen name="(tabs)" options={{ headerShown: false }} />`, and export `generateMetadata` returning the title `APP_NAME` ("Recipe") per SDK 58 (research R5). If `generateMetadata` is not honored in the root layout, export it from each of the three tab screens instead. Add a first-use comment explaining `generateMetadata`. Confirm the exact option name in the SDK 58 docs before coding; if it differs, use the documented one and update research R5
- [X] T014 [US1] Delete the starter screen `src/app/index.tsx` (it conflicts with `src/app/(tabs)/index.tsx`)
- [X] T015 [P] [US1] Create `src/app/+not-found.tsx`: a screen with a short message such as "This page doesn't exist." and a `Link` from `expo-router` to `/` labelled "Go to Weekly Menu" (FR-011). Add a first-use comment explaining `+not-found`
- [X] T016 [US1] Remove leftover starter content (FR-009): search `src/`, `README.md`, and `app.json` for template text or demo references (for example "Edit src/app/index.tsx", "app-example", "reset-project"); then, for each of `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-image`, `expo-web-browser`, `expo-device`, one at a time: (1) `grep -rn "<package>" src app.json` must be empty; (2) `npm ls <package>` must show no other package depending on it; (3) `npm uninstall <package>`; (4) run `npx expo start --web` and confirm it launches. If any step fails, restore it with `npx expo install <package>` and keep it. Finish with `npx expo-doctor` showing no new errors

### Verification for User Story 1 (REQUIRED)

- [X] T017 [US1] Run `npx expo lint` and `npx tsc --noEmit` with no errors, and `npx jest` with all tests passing
- [X] T018 [US1] Manual check on phone (Expo Go) — quickstart "Story 1" steps 1–5 → the app opens on Weekly Menu, the three sections open, each shows only "Recipe", its name, one sentence; the project appears as "Recipe" in Expo Go's project list (Expo Go has no per-app home-screen label; the real label is set by `expo.name` for future builds); no starter content
- [X] T019 [US1] Manual check in browser (`npx expo start --web`) — quickstart "Story 1" steps 1–5 → same result; tab title is "Recipe"; after T035, open `/nope` → friendly not-found screen with a working link back

**Checkpoint**: User Story 1 is fully functional and testable on its own (this is the MVP)

**🛑 STOP**: `/speckit-implement` MUST stop here so the author can test User Story 1 and review the plan's "New Concepts" before continuing

---

## Phase 4: User Story 2 - Move between sections on phone and computer (Priority: P2)

**Goal**: Switching sections takes one tap or click from anywhere, works with the keyboard alone, and the current section is clearly marked.

**Independent Test**: On the phone tap through all three sections; in the browser click through them, then repeat using only the keyboard.

### Implementation for User Story 2

- [X] T020 [US2] In `src/app/(tabs)/_layout.tsx` add `screenOptions` to `Tabs` so the active tab is clearly distinct from inactive ones: a strong `tabBarActiveTintColor` versus a muted `tabBarInactiveTintColor` (both sufficiently contrasted on the light background), and a bold active label via `tabBarLabelStyle`/equivalent. Give each `Tabs.Screen` a `tabBarAccessibilityLabel` equal to the section name (FR-007). (Implemented as active color + light background tint, because `tabBarLabelStyle` cannot style only the active label)
- [X] T021 [US2] In the browser, press Tab to focus each navigation entry. If no clear focus outline is visible, add one using documented React Navigation/React Native Web options in `src/app/(tabs)/_layout.tsx`, without adding a dependency or platform-specific files (FR-006). If the default outline is already clear, make no change and note it in the commit message. (Default browser focus outline checked by the author: clear, no change made)

### Verification for User Story 2 (REQUIRED)

- [X] T022 [US2] Run `npx expo lint`, `npx tsc --noEmit`, and `npx jest` with no errors
- [X] T023 [US2] Manual check on phone (Expo Go) — quickstart "Story 2": tap every section from every other → each opens in one tap and the current tab is highlighted
- [X] T024 [US2] Manual check in browser — quickstart "Story 2": click every section from every other; then using only Tab, Enter/Space reach and activate all three with a visible focus outline → each opens

**Checkpoint**: User Stories 1 AND 2 work independently

**🛑 STOP**: `/speckit-implement` MUST stop here so the author can test User Story 2 before continuing

---

## Phase 5: User Story 3 - Layout fits narrow and wide screens (Priority: P3)

**Goal**: Looks right on a narrow phone and in a wide computer window, including live browser resizing; phone stays portrait.

**Independent Test**: Open on phone, then browser at full width, then resize the browser from wide to ~320 px and back.

### Implementation for User Story 3

- [X] T025 [US3] In `src/app/(tabs)/_layout.tsx` read the window width with `useWindowDimensions` (from `react-native`) and set `tabBarPosition: "left"` with `tabBarVariant: "material"` when width >= 768, otherwise `"bottom"` (research R2). Keep the 768 value as a named constant. If the sidebar looks wrong on web, adjust the breakpoint or variant and note why in a code comment. Add a first-use comment explaining `useWindowDimensions`. Confirm the exact option names (`tabBarPosition`, `tabBarVariant`) in the SDK 58 docs before coding; if a name differs, use the documented one and update research R2. (updated per questions #3) Also add `tabBarLabelPosition: "beside-icon"` to `screenOptions` so bottom-bar labels are not small and clipped below 768 px (FR-008, SC-004; research R3); if still clipped, add `tabBarIconStyle: { display: "none" }`; confirm option names in the SDK 58 docs and add a first-use comment
- [X] T026 [P] [US3] In `src/components/SectionScreen.tsx` constrain the content to a maximum width of 640 with `width: "100%"`, centered, with horizontal padding of at least 16, so text wraps at ~320 px, never causes horizontal scrolling, and is not stretched on wide windows (FR-008). (Already satisfied by the US1 implementation of `SectionScreen.tsx`: no change needed)
- [X] T027 [US3] Confirm `app.json` still has `"orientation": "portrait"` (FR-013); no code change is expected

### Verification for User Story 3 (REQUIRED)

- [X] T028 [US3] Run `npx expo lint`, `npx tsc --noEmit`, and `npx jest` with no errors
- [X] T029 [US3] Manual check on phone (Expo Go) — quickstart "Story 3" steps 1–2: nothing clipped, no horizontal scroll, bar at the bottom, every tab label fully visible at a font size of 12 or larger (updated per questions #3), device rotation keeps the app in portrait; each tab is easy to tap with one thumb and is about 44 pt or larger (the default bottom bar normally satisfies this)
- [X] T030 [US3] Manual check in browser — quickstart "Story 3" steps 3–5: wide window shows left bar and centered content of limited width; resizing to ~320 px moves the bar to the bottom with nothing clipped and every tab label fully visible at ~320, 600 and 700 px, also in a mobile browser (updated per questions #3); reloading `/recipes` and `/shopping-list` shows the same section; `/nope` shows the not-found screen

**Checkpoint**: All user stories independently functional

**🛑 STOP**: `/speckit-implement` MUST stop here so the author can test User Story 3 before continuing

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup across all stories

- [X] T031 Run `npm run format` and re-run `npx expo lint`, `npx tsc --noEmit`, `npx jest`, and `npx expo-doctor` — all clean
- [X] T032 Walk through the whole [quickstart.md](./quickstart.md) once on phone and browser; confirm SC-001 to SC-006 from `spec.md`
- [X] T033 Confirm `npx expo start` launches without errors from a clean state (`npx expo start --clear`) so `main` stays runnable after merge (Principle II)
- [X] T034 Author reviews the plan's "New Concepts" table against the code; mark open items from `research.md` (breakpoint, `generateMetadata`, test file naming, app-icon assets) as resolved or tracked

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies
- **Foundational (Phase 2)**: depends on Setup (T008 needs T001–T003); blocks all stories
- **US1 (Phase 3)**: depends on Foundational
- **US2 (Phase 4)**: depends on US1 (it refines `src/app/(tabs)/_layout.tsx`, which US1 creates)
- **US3 (Phase 5)**: depends on US1; edits the same layout file as US2, so run after US2 to avoid conflicts (`SectionScreen.tsx` edit T026 is independent)
- **Polish (Phase 6)**: depends on all stories

### Within Each Story

- Section copy (T005) before any screen; `SectionScreen` (T007) before screens
- Screens (T009–T011) before the tab layout (T012); delete the starter screen (T014) before first run
- Verification tasks last; stop at each checkpoint

### Parallel Opportunities

- Phase 2: T005, T006, T007 (different files)
- US1: T009, T010, T011, T015 (different files)
- US3: T026 can run alongside T025
- Layout-file tasks (T012, T020, T021, T025) are sequential — same file
- Phase 7 (Review Follow-up) depends only on US1 and edits `src/app/_layout.tsx`, which no other open task touches
- Phase 8 (Review Follow-up) follows US3 and edits `src/app/(tabs)/_layout.tsx`; T038 runs before T039 (same file)

---

## Parallel Example: User Story 1

```bash
Task: "Create src/app/(tabs)/index.tsx (Weekly Menu)"
Task: "Create src/app/(tabs)/recipes.tsx"
Task: "Create src/app/(tabs)/shopping-list.tsx"
Task: "Create src/app/+not-found.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 Setup → Phase 2 Foundational
2. Phase 3 (US1) → **stop and validate** on phone and browser
3. Review "New Concepts" with the author, then continue

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. US1 → test → (MVP)
3. US2 → test
4. US3 → test
5. Polish; each story keeps `npx expo start` working

---

## Notes

- Commit after each task or small group of related tasks (one commit per task is fine)
- A story is done only when lint + type check pass, unit tests pass, the manual phone + browser checklist passes, and the author has reviewed the plan's "New Concepts"
- Avoid: editing the layout file from two tasks at once, adding icon libraries, platform-specific files

---

## Phase 7: Review Follow-up

**Purpose**: Changes decided in the question session of 2026-11-12 ([questions.md](./questions.md)).

- [X] T035 In `src/app/_layout.tsx` add `<Stack.Screen name="+not-found" options={{ headerShown: false }} />` inside the root `Stack`, so the not-found screen shows no header titled "+not-found" per FR-011 and `contracts/routes.md` (contradicts; questions #2). Add a short comment saying the screen already carries its own message

### Verification (REQUIRED)

- [X] T036 Run `npx expo lint`, `npx tsc --noEmit`, and `npx jest` with no errors
- [X] T037 Manual check on phone (Expo Go) and in browser (`/nope`) — quickstart "Story 1" step 5: the not-found screen shows only its message and the link back to Weekly Menu, with no header bar; the link works

**Checkpoint**: The not-found screen matches the route contract.

**🛑 STOP**: `/speckit-implement` MUST stop here so the author can test the not-found screen before continuing

---

## Phase 8: Review Follow-up

**Purpose**: Layout details found while testing User Story 3, decided on 2026-11-12 ([questions.md](./questions.md) #4 and #5). Both tasks edit the same file, so they run in order.

- [X] T038 In `src/app/(tabs)/_layout.tsx` add `tabBarIconStyle: { display: "none" }` and `tabBarLabelStyle: { marginStart: 0, marginEnd: 0 }` to `screenOptions`, keeping `tabBarIcon: () => null` on each screen, so tab labels are centered with no empty icon space per FR-008 and research R3 (partial; questions #4). Confirm the option names in the SDK 58 docs and add a first-use comment
- [X] T039 In `src/app/(tabs)/_layout.tsx` add the constant `SIDEBAR_WIDTH = 225` and, on wide windows only, `tabBarStyle: { width: SIDEBAR_WIDTH, minWidth: 0 }` so the sidebar is narrower than the library's 360 px default per FR-008 and `contracts/routes.md` (partial; questions #5). Add a first-use comment

### Verification (REQUIRED)

- [X] T040 Run `npx expo lint`, `npx tsc --noEmit`, and `npx jest` with no errors
- [X] T041 Manual check on phone (Expo Go) and in browser — quickstart "Story 3" steps 1 and 3: labels are centered in the bottom bar with no gap, the bottom bar still shows every label fully, and the wide-window sidebar is about 225 px with the content taking the rest

**Checkpoint**: The tab bar is centered at narrow widths and the sidebar is narrow at wide widths.

**🛑 STOP**: `/speckit-implement` MUST stop here so the author can test the tab bar before continuing
