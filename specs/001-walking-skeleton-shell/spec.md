# Feature Specification: Walking Skeleton Shell

**Feature Branch**: `001-walking-skeleton-shell`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "Create the basic shell of a personal meal-planning app that I will use on my phone and in my computer's browser. The app has three sections: Weekly Menu, Recipes, and Shopping List. For now each section only shows its name and one sentence describing what it will be for; there is no data and no functionality yet. I must be able to move between the three sections easily on both the phone (touch) and the computer (mouse and keyboard), and the layout must look right on both a narrow phone screen and a wide computer window. Any example or starter content that is not part of this app must be removed. This is the walking skeleton: its only purpose is to prove the app runs on both platforms and to give later features a place to live."

## Clarifications

### Session 2026-11-10

- Q: What name should the app show (browser tab, phone app label, on-screen title)? → A: "Recipe"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See and open the three sections (Priority: P1)

As the app's owner, I open the app on my phone or in my computer's browser and see the app's own screen (not any starter or example content). I can see the three sections — Weekly Menu, Recipes, and Shopping List — and open each one to read its name and a one-sentence description of what it will be for.

**Why this priority**: This is the whole point of the skeleton: proving the app runs on both platforms and showing the three places where future features will live.

**Independent Test**: Launch the app on the phone and in the browser; confirm the three sections are visible, each opens, and each shows its name and one descriptive sentence.

**Acceptance Scenarios**:

1. **Given** the app is launched on the phone, **When** it finishes loading, **Then** the owner sees a Weekly Menu section as the starting screen and the means to reach Recipes and Shopping List.
2. **Given** the app is launched in a computer browser, **When** it finishes loading, **Then** the owner sees the same three sections available.
3. **Given** any section is open, **When** the owner reads the screen, **Then** it shows only the app name, that section's name, and one sentence describing its future purpose.
4. **Given** the app is launched on either platform, **When** the owner looks through the app, **Then** no example or starter content unrelated to this app appears anywhere.

---

### User Story 2 - Move between sections on phone and computer (Priority: P2)

As the app's owner, I can switch between Weekly Menu, Recipes, and Shopping List easily: by tapping on the phone, and by clicking or using the keyboard on the computer.

**Why this priority**: Navigation is the only interaction the skeleton has; it must work with both input styles for the shell to be useful to later features.

**Independent Test**: On the phone, tap through all three sections; in the browser, click through all three and then do the same using only the keyboard.

**Acceptance Scenarios**:

1. **Given** any section is open on the phone, **When** the owner taps another section's entry, **Then** that section opens.
2. **Given** any section is open in the browser, **When** the owner clicks another section's entry, **Then** that section opens.
3. **Given** the app is open in the browser, **When** the owner uses only the keyboard to reach and activate a section entry, **Then** that section opens and the focused entry is visibly indicated.
4. **Given** a section is open, **When** the owner looks at the navigation, **Then** the current section is clearly distinguishable from the others.

---

### User Story 3 - Layout fits narrow and wide screens (Priority: P3)

As the app's owner, the layout looks right both on a narrow phone screen and in a wide computer window, and stays correct when I resize the browser window.

**Why this priority**: Adaptive layout is a core promise for all later features, but the shell is already useful before it is polished.

**Independent Test**: Open the app on the phone, then in the browser at full width, and resize the browser window from wide to phone-narrow; confirm nothing is cut off, overlapping, or awkwardly stretched.

**Acceptance Scenarios**:

1. **Given** a narrow phone screen, **When** any section is shown, **Then** all text and navigation are fully visible without horizontal scrolling and touch targets are comfortably tappable.
2. **Given** a wide computer window, **When** any section is shown, **Then** content is laid out sensibly for the width (not a tiny block lost in empty space nor text stretched across the full width).
3. **Given** the browser window is resized between narrow and wide, **When** the size changes, **Then** the layout adapts without breaking or losing the ability to navigate.

---

### Edge Cases

- Browser window narrower than a typical phone: content stays readable and navigation stays usable.
- Phone rotated: the app stays in portrait orientation on the phone and does not rotate to landscape.
- Owner opens a web address for a section directly or reloads the page: the matching section is shown, not an error.
- Owner opens an address that matches no section: a clear, friendly "not found" screen with a way back to the app is shown.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The app MUST run on a phone and in a computer web browser from the same project.
- **FR-002**: The app MUST provide exactly three sections: Weekly Menu, Recipes, and Shopping List.
- **FR-003**: Each section MUST display the app name "Recipe" as a small title line, the section's name, and a single sentence describing its future purpose, and nothing else (no data, no actions).
- **FR-004**: Weekly Menu MUST be the section shown when the app first opens.
- **FR-005**: The owner MUST be able to move between any two sections in a single action from any section.
- **FR-006**: Navigation MUST work by touch on the phone and by mouse and keyboard on the computer, with a visible focus indicator for keyboard use. Navigation entries MUST have a touch target of at least 44 × 44 points.
- **FR-007**: The current section MUST be visibly distinguished in the navigation.
- **FR-008**: The layout MUST adapt to narrow and wide screens, including live resizing of the browser window, with no clipped content or horizontal scrolling.
- **FR-009**: All example or starter content not belonging to this app (placeholder screens, demo text, sample images shown in the app, unused sample components) MUST be removed. The default app icon, splash image, favicon, and iOS icon files are exempt until a later branding feature replaces them.
- **FR-010**: The app MUST be named "Recipe" wherever its name is shown (browser tab title, phone app label, and on-screen title; the phone label is verified via the project name during development); no template default name may remain.
- **FR-011**: Opening or reloading a section's web address MUST show that section; an unknown address MUST show a friendly not-found screen with a way back.
- **FR-012**: The app MUST NOT store, request, or display any user data in this feature.
- **FR-013**: On the phone, the app MUST stay in portrait orientation and MUST NOT rotate to landscape. (The browser window on a computer is unaffected and remains freely resizable.)

### Key Entities

None. This feature involves no data.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The owner can open the app on the phone and in the browser with no errors on both within one session.
- **SC-002**: From any section, the owner reaches either other section in a single tap or click, and the new section appears without a perceptible delay.
- **SC-003**: All three sections can be reached and left using only the keyboard on the computer.
- **SC-004**: At every window width from 320 px wide to a wide desktop window, 100% of text and navigation is visible without horizontal scrolling.
- **SC-005**: A review of every screen finds zero pieces of example or starter content unrelated to the meal-planning app.
- **SC-006**: Each of the three sections shows the app name, its name, and exactly one descriptive sentence, verified on both platforms.

## Assumptions

- The only user is the app's owner; no accounts, sharing, or multi-user needs.
- The phone is used through a development preview, and the computer through a web browser; store publishing and native desktop apps are out of scope.
- Section names and descriptions are in English; localization is out of scope.
- Weekly Menu is the landing section since it is listed first.
- Landscape use on the phone is out of scope; the app is portrait-only on phones.
- Visual design is simple and clean; no custom branding, icons, or theming beyond readable light styling (dark mode is out of scope).
- The default app icon, splash image, favicon, and platform icon files are kept in this feature; replacing them is a future branding feature.
- The phone label can only be fully verified in an installed build, which is out of scope; during development it is verified by the project name shown in the preview app.
- No data storage, search, forms, or any functionality beyond navigation is included; later features will fill each section.
