# Research: Walking Skeleton Shell

Docs consulted for Expo SDK 58: tabs, static rendering/metadata, unit testing (docs.expo.dev).

## R1. Navigation component
- **Decision**: Expo Router JavaScript tabs (`Tabs` from `expo-router`) inside a `(tabs)` route group.
- **Rationale**: Built in (no new dependency); renders as links on web (mouse, keyboard, reload/deep-link) and as touch tabs on phone; marks the active tab; supports `tabBarPosition`.
- **Alternatives**: `NativeTabs` (native look, but less certain web/keyboard behavior and harder for a first project); custom `Pressable` bar (reinvents focus/active handling); drawer (hidden navigation is slower than one tap, SC-002).

## R2. Narrow vs. wide layout
- **Decision**: Read window width with `useWindowDimensions`; at width >= 768 px put the tab bar on the left (`tabBarPosition: 'left'`, `tabBarVariant: 'material'`), otherwise at the bottom. Section content is centered with a max width of 640 px.
- **Rationale**: Docs note the position is chosen in our own code. 768 px is a common tablet/desktop breakpoint; the hook also updates on live resize (FR-008). Max width prevents text spanning a wide window.
- **Alternatives**: Always bottom bar (looks stretched on wide windows); always sidebar (wastes phone width); separate `.web.tsx` files (platform code not justified, Principle III).
- **Open to verify in implementation**: sidebar rendering on web at >= 768 px; adjust breakpoint if it looks off.
- **Follow-up (questions #5)**: the library gives the sidebar a minimum width of 360 px (Material drawer default), too wide here. Override with `tabBarStyle: { width: SIDEBAR_WIDTH, minWidth: 0 }` (225 px) on wide windows. Alternative rejected: a user-resizable sidebar (no built-in support; needs hand-written drag code, mouse-only, against Principle IV).

## R3. Text-only tabs
- **Decision**: No icons; tab labels only.
- **Rationale**: Docs' examples use `@expo/vector-icons`, which is not installed; icons are not required by the spec. Avoids a dependency (Principle IV).
- **Alternatives**: `expo-symbols` (iOS-only, no web); adding an icon font (new dependency).
- **Known limit (questions #3)**: `tabBarIcon: () => null` hides the icon but still reserves its slot. Below 768 px in portrait the default bar puts labels *below* the icon at font size 10 in a fixed 49 px bar, so labels render small and clipped (FR-008, SC-004). Fix, applied in US3 (T025): `tabBarLabelPosition: "beside-icon"` in `screenOptions`; if still clipped, `tabBarIconStyle: { display: "none" }`. Confirm option names in the SDK 58 docs.
- **Follow-up (questions #4)**: `tabBarIcon: () => null` still renders the icon's box, and the beside-icon label keeps a 12 px end margin, so labels were off-center. Fix: keep the null icon, add `tabBarIconStyle: { display: "none" }` and `tabBarLabelStyle: { marginStart: 0, marginEnd: 0 }`.

## R4. Orientation lock
- **Decision**: Keep `"orientation": "portrait"` in `app.json` (already set).
- **Rationale**: Satisfies FR-013 on phones with config only. Does not affect the browser window.
- **Alternatives**: Runtime lock via `expo-screen-orientation` (extra dependency for the same result).
- **Note**: Expo Go honors this config on a physical device; verify in the quickstart.

## R5. App name and browser title
- **Decision**: Set `expo.name` to "Recipe" in `app.json` (phone label, web manifest). Set the browser tab title with `generateMetadata` (SDK 58) returning "Recipe" in the root layout; show "Recipe" as an on-screen heading line above each section title.
- **Rationale**: `generateMetadata` writes the title into the page HTML before JavaScript runs. `slug` and `scheme` can stay `recetario` (internal identifiers, not shown to the user).
- **Alternatives**: `<Head>` from `expo-router/head` (post-hydration only); editing `+html.tsx` (manual HTML).
- **Resolved**: `generateMetadata` is NOT applied from the root layout; it is exported from each of the three tab screens instead (verified: built HTML has `<title>Recipe</title>`). The not-found page is not covered by `generateMetadata` in static export, so it uses `<Head>` from `expo-router/head` (title set after load).
- **Evidence (questions #1)**: the Expo docs only say metadata comes "from the matched route, not its layouts" and do not mention `+not-found`. Verified on SDK 58: `+not-found.html` has no `<title>` even when `generateMetadata` is exported from `src/app/+not-found.tsx`, and the dev server answers `/nope` with HTTP 404 and no `<title>`. On unknown addresses the tab shows the URL until JavaScript loads, then `<Head>` sets "Recipe". Re-check on the next SDK upgrade.

## R6. Web output mode
- **Decision**: Change `web.output` from `"server"` to `"static"`.
- **Rationale**: Each fixed route gets its own HTML file, so reload and direct links work without a server; simpler to host later. No dynamic routes exist.
- **Alternatives**: Keep `"server"` (needs a running server for the same result; unneeded complexity).
- **Open to verify**: `npx expo start --web` behaves normally in either mode; confirm `+not-found` shows for unknown paths in dev.

## R7. Light appearance only
- **Decision**: Set `userInterfaceStyle` to `"light"`.
- **Rationale**: Spec assumption says dark mode is out of scope; fixed colors keep the shell simple and predictable.
- **Alternatives**: Keep `"automatic"` (would require designing both themes).

## R8. Removing starter content
- **Decision**: Delete the starter screen (`src/app/index.tsx`, replaced). Keep `ios.icon` and `assets/expo.icon`; they are app-icon assets (see flag below). Remove starter-only packages not imported anywhere in `src/` and not required by Expo Router (candidates: `@expo/ui`, `expo-glass-effect`, `expo-symbols`, `expo-image`, `expo-web-browser`, `expo-device`), verifying with `npx expo-doctor`, lint, typecheck, and a run on both platforms. Leave `example/` (gitignored) alone.
- **Rationale**: Satisfies FR-009 and Principle IV; each unused package is one more thing to break.
- **Alternatives**: Keep all packages "just in case" (violates YAGNI).
- **Flag for the author**: the default app icon, splash image, and favicon in `assets/images/` are Expo's generic art. They are app-icon assets, not screen content, so this plan keeps them until a branding feature supplies replacements. Say so if you want them replaced in this feature.

## R9. Testing approach
- **Decision**: Install `jest-expo`, `jest`, `@types/jest` as dev dependencies (`npx expo install ... --dev`); add `"jest": {"preset": "jest-expo"}` and a `test` script. One test file covers `src/lib/sections.ts`: exactly three sections in order, unique routes and names, non-empty descriptions that are a single sentence. Add `"jest"` to `tsconfig` types. Add `prettier` as a dev dependency per the constitution.
- **Rationale**: The only non-UI logic is the section definitions, which tabs and screens both read, so a mistake there would break every screen. SDK 58 requires Jest 30 (`jest-expo` docs).
- **Alternatives**: Component tests with React Native Testing Library (optional per constitution; not called out by this spec); end-to-end tools (heavy for a skeleton).
- **Open to verify**: test file naming under the preset (docs mention `-test.ts`, default Jest also matches `.test.ts`); use whichever runs.

## R10. Single source of truth for section copy
- **Decision**: `src/lib/sections.ts` exports an ordered list `{ key, name, route, description }`. Tab labels and screen text both read from it.
- **Rationale**: Keeps names and sentences consistent (SC-006) and gives later features one place to extend.
- **Alternatives**: Literals in each screen and in the tab layout (duplication, easy to drift).

## R11. Not-found screen
- **Decision**: `src/app/+not-found.tsx` with a short message and a `Link` to `/`.
- **Rationale**: FR-011; link keeps a way back.
- **Alternatives**: Redirect to Weekly Menu (hides mistakes; less clear).
- **Header (questions #2)**: the root `Stack` shows a default header titled with the internal route name `+not-found`. Hide it with `<Stack.Screen name="+not-found" options={{ headerShown: false }} />`; the screen already carries its own message (a "Page not found" header would duplicate it).
