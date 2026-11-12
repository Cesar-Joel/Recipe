# Question sessions: Walking Skeleton Shell

## Human decisions (2026-11-12)

- **#2 (not-found header):** hide the header (`headerShown: false`).
- **#3 (clipped tab labels):** fold into US3 (tasks T025, T029, T030); do not fix before US2.
- **#1:** documentation only; recorded in research R5.

US3 checkpoint (2026-11-12):

- **T029, T030:** confirmed passing by the author.
- **#4 (icon slot / label centering):** remove the icon slot and the label margins.
- **#5 (sidebar width):** a resizable sidebar is not built in and would need custom drag code (against Principle IV), so start with a fixed 200 px.

## Session 2026-11-12

### 1. Why `generateMetadata` does not apply to the not-found page (priority low)

Question: why `generateMetadata` does not apply to `+not-found`, and what "not applied in static
export" means. Answer: the code is correct. In SDK 58, Expo builds the not-found HTML without
running that page's `generateMetadata`, so the `<Head>` fallback is the right approach. The Expo
docs do not say this; it was verified by experiment, and `research.md` R5 states it without the
evidence.

- **Source:** research R5, FR-010.
- **Gap:** partial (the decision in R5 does not record its evidence).
- **specs/001-walking-skeleton-shell/research.md:31**: extend the "Resolved" note:
  - the Expo docs (static rendering, SDK 57→58 migration) only say metadata comes "from the
    matched route, not its layouts" and do not mention `+not-found`;
  - verified on SDK 58: `+not-found.html` has no `<title>` even with `generateMetadata`
    exported from `src/app/+not-found.tsx`, and the dev server answers `/nope` with HTTP 404 and
    no `<title>`;
  - on unknown addresses the tab shows the URL until JavaScript loads, then `<Head>` sets
    "Recipe";
  - re-check this on the next SDK upgrade.
- **Artifacts to update:** research.md.
- **Tests:** none new. T019 already checks `/nope` in the browser; confirm there that the tab
  title becomes "Recipe" once the page has loaded.

### 2. Not-found screen shows the raw header title "+not-found" (priority medium)

Question: should the "+not-found" title shown in the header be displayed? Answer: no. The root
`Stack` only configures `(tabs)`, so `+not-found` gets the default header titled with its
internal route name. That leaks an internal name and adds a bar the contract does not describe.

- **Source:** FR-011, `contracts/routes.md` (Screen content: message + link to `/`).
- **Gap:** contradicts.
- **src/app/_layout.tsx:7**: add `<Stack.Screen name="+not-found" options={{ headerShown: false }} />`
  inside the root `Stack`. The screen already has its own message, so a "Page not found" header
  would only repeat it.
- **Artifacts to update:** none (the contract already describes the intended screen).
- **Tests:** none (UI only). Add to quickstart Story 1 step 5: no header bar on the not-found
  screen, on the phone and in the browser; re-run T019 after the fix.
- **Human decision:** hide the header (decided 2026-11-12).

### 3. Bottom tab labels shrink and are clipped on narrow windows and mobile browsers (priority high)

Question: below ~680 px wide (and in a mobile browser) the tab names get small and are cut off at
the bottom. Answer: confirmed in the code, not yet reproduced visually. On windows narrower than
768 px held in portrait, the tab bar puts each label *below* its icon at font size 10
(`expo-router/build/react-navigation/bottom-tabs/views/BottomTabItem.js`, `labelBeneath`) inside a
bar of fixed height (49). `tabBarIcon: () => null` in `src/app/(tabs)/_layout.tsx` still reserves
the icon's slot, so the label is pushed down and clipped. At 768 px or more the labels sit *beside*
the icon, which is why wide windows look fine.

- **Source:** FR-008, SC-004 (all text and navigation visible at every width from 320 px).
- **Gap:** contradicts.
- **src/app/(tabs)/_layout.tsx:10**: add `tabBarLabelPosition: "beside-icon"` to `screenOptions`
  so the label is always beside the (empty) icon at a readable size; keep `tabBarIcon: () => null`.
  If the label is still clipped, hide the icon slot with `tabBarIconStyle: { display: "none" }`.
  Check the exact option names in the SDK 58 docs first.
- **Artifacts to update:** research.md (R2/R3: record this limit of the default tab bar and the
  chosen option); plan.md New Concepts (`tabBarLabelPosition`).
- **Tests:** none (UI only). Add to quickstart Story 3: at about 320, 600 and 700 px wide and in
  a mobile browser, every tab label is fully visible at a readable size.
- **Notes:** this overlaps tasks T025/T029/T030 (US3, not started). Fold the fix into US3, or
  into a follow-up phase if the human wants it before US2.
- **Human decision:** fold into US3 (decided 2026-11-12); fix as above.

### 4. Tab labels are off-center because of the empty icon slot (priority low)

Question: with `tabBarLabelPosition: "beside-icon"` the labels are not fully centered because of the
icon's space; remove it. Answer: confirmed in `expo-router/build/react-navigation/bottom-tabs/views`.
`tabBarIcon: () => null` is a function, so the tab bar still renders the icon wrapper (a fixed
box) and `BottomTabItem` does not treat it as "no icon". In the beside-icon layout the label also
keeps `marginEnd: 12` (`labelBeside`), so it sits off-center even without the icon.

- **Source:** FR-008 (layout looks right at every width), research R3 (text-only tabs).
- **Gap:** partial.
- **src/app/(tabs)/_layout.tsx:38**: in `screenOptions` add `tabBarIconStyle: { display: "none" }`
  (the planned fallback from item #3; the style is applied to the icon wrapper, so its box
  disappears) and `tabBarLabelStyle: { marginStart: 0, marginEnd: 0 }` (the label style is applied
  last, so it overrides the default margins). Keep `tabBarIcon: () => null` on each screen so no
  placeholder icon appears. Confirm the option names in the SDK 58 docs.
- **Artifacts to update:** research.md R3 (record that hiding the icon needs both a null icon and
  a hidden wrapper); plan.md New Concepts (`tabBarIconStyle`, `tabBarLabelStyle`).
- **Tests:** none (UI only). Add to quickstart Story 3 step 1: labels are centered in the bottom
  bar (and left-aligned with even padding in the sidebar), with no gap where an icon would be.
- **Human decision:** none; fix as above.

### 5. Sidebar is too wide on wide browser windows (priority low)

Question: at 768 px or wider the left sidebar is too wide; make it shorter. Answer: the library
sets the sidebar's minimum width to 360 px, the Material drawer default
(`getDefaultSidebarWidth` in `expo-router/build/react-navigation/elements`, applied as `minWidth`
in `BottomTabBar.js`). `tabBarStyle` is the last entry of the bar's style list, so it can override
it.

- **Source:** FR-008, `contracts/routes.md` (wide window: bar on the left, content centered).
- **Gap:** partial.
- **src/app/(tabs)/_layout.tsx:34**: add a named constant `SIDEBAR_WIDTH = 200` and, on wide
  windows only, `tabBarStyle: { width: SIDEBAR_WIDTH, minWidth: 0 }`. 200 px fits "Shopping List"
  with the Material padding; adjust if it looks tight or loose.
- **Artifacts to update:** research.md R2 (record the 360 px library default and the override);
  plan.md New Concepts (`tabBarStyle`).
- **Tests:** none (UI only). Add to quickstart Story 3 step 3: the sidebar is narrow (about 200 px)
  and the content takes the rest.
- **Human decision:** fixed 200 px (decided 2026-11-12). A resizable sidebar was asked about and rejected: no built-in support, custom drag code, web-only. The author tuned it to 225 px after testing.
