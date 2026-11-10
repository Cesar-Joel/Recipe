# Recetario Constitution

> Personal learning project: a cross-platform app (phone and computer) built with React Native and Expo, developed as an incremental MVP with Spec-Kit.

**Convention:** MUST / MUST NOT = mandatory. SHOULD = recommended; may be skipped if the plan explains why.

## Context

- The author is learning React Native and has never used it before. The project has two equally weighted goals: (1) build an app that is useful for personal use, and (2) learn how to build apps of this kind.
- Target platforms: phone (iOS or Android, via Expo Go during development) and computer (web version in the browser).
- User: a single person (the author). At this stage there are no requirements for scale, multiple users, or app store publishing.

## Core Principles

### I. Learning Is Part of the Deliverable

- Code MUST favor clarity over cleverness: descriptive names, short functions, and no "just in case" abstractions.
- Every `plan.md` MUST include a **"New Concepts"** section that explains, in plain English, each React Native, Expo, or TypeScript concept the feature uses for the first time: what it is, why it is used here, and which alternative was rejected.
- Every technical decision in `research.md` MUST record the decision, the rationale, and the alternatives considered.
- Code SHOULD include a brief comment the first time a React Native pattern appears (the first `useEffect`, the first `FlatList`, etc.). Do not comment the obvious.
- **Rationale:** if the agent writes code the author does not understand, the project meets one goal and fails the other.

### II. Small, Always-Runnable Increments

- The first feature MUST be a "walking skeleton": the app starts, shows a custom screen, and runs on the phone and in the browser. Nothing more.
- Every feature MUST be split into independent, prioritized user stories (P1, P2, P3…), and each one MUST be testable on its own inside the app.
- The main branch MUST always be runnable: `npx expo start` launches the app without errors.
- A small finished feature is worth more than a large half-done one. If a spec needs more than about 3 user stories, it SHOULD be split into several specs.
- **Rationale:** an MVP exists to put real versions in use as early as possible. Every working increment is a checkpoint where the author can test, understand, and change course.

### III. One Codebase for Phone and Computer

- The UI MUST be built with React Native components (`View`, `Text`, `Pressable`, …), which Expo renders as native components on the phone and as HTML on the web. HTML elements (`div`, `span`) MUST NOT be used directly.
- Platform-specific code MUST NOT be used unless there is a demonstrated need. When needed, it MUST be isolated (`Platform.select` or `.web.tsx` / `.native.tsx` files) and justified in the plan.
- Before adding a library, its support for Android, iOS, and web MUST be verified (in the Expo documentation or on reactnative.directory).
- The UI MUST be usable by touch on the phone and with mouse and keyboard on the computer, and MUST adapt to screen width (no fixed pixel sizes for full-screen layouts).
- A user story is done only when it works on the phone (Expo Go) **and** in the browser.
- **Rationale:** a single codebase is the reason to use React Native. Every platform exception doubles what has to be understood and tested.

### IV. Simplicity First (YAGNI)

- Use what React Native and Expo already provide first. Every new dependency MUST be justified in the plan: what problem it solves and why existing tools are not enough.
- State: `useState`, `useReducer`, and props. Context only when data is shared between distant screens. Global state libraries (Redux, Zustand, etc.) MUST NOT be used unless a spec justifies them.
- Data: stored locally on the device (local-first). No backend, user accounts, or sync until a spec explicitly requires them.
- Styling: React Native `StyleSheet`. No component or styling libraries in the MVP.
- Any exception to this principle MUST be recorded in the plan's "Complexity Tracking" table with its justification.
- **Rationale:** every extra piece is one more thing to learn, configure, and potentially break on some platform. Complexity is added when a real problem calls for it, not before.

### V. Verifiable Quality, Proportional to the Project

- TypeScript in `strict` mode. `any` MUST NOT be used without a comment explaining why.
- The linter (`npx expo lint`) and type check (`npx tsc --noEmit`) MUST pass with no errors before a task is closed.
- Non-UI logic (calculations, validation, data transformation, storage access) MUST live in TypeScript modules separate from screens and MUST have unit tests with Jest (`jest-expo` preset).
- Component tests (React Native Testing Library) are optional; they are added only for critical flows that a spec calls out.
- Every user story MUST have a manual verification checklist with concrete steps to test it on the phone and in the browser.
- **Rationale:** logic tests are a cheap safety net for both the author and the agent. Requiring strict TDD everywhere would double the learning curve without a personal project justifying it.

## Technical Constraints

| Area | Decision |
|---|---|
| Framework | Expo (latest stable SDK) on top of React Native |
| Language | TypeScript in `strict` mode |
| Navigation | Expo Router (file-based routing) |
| Computer | Web version via react-native-web, in the browser |
| Phone during development | Expo Go app, scanning the QR code from `npx expo start` |
| Local storage | `@react-native-async-storage/async-storage` for simple data; `expo-sqlite` only if a spec needs queries or many records (after verifying its web support) |
| Testing | Jest with `jest-expo`; React Native Testing Library when applicable |
| Code quality | ESLint via `npx expo lint`; Prettier for formatting |
| Packages | npm; dependencies are installed with `npx expo install` to get SDK-compatible versions |

- The Expo managed workflow is used: native folders (`android/`, `ios/`) MUST NOT be edited by hand in the MVP.
- Out of scope until a spec justifies it: native desktop app (Electron, Tauri, React Native Windows/macOS), app store publishing, EAS builds, backend, authentication, and push notifications.
- Code organization: screens in the Expo Router routes folder; reusable components in `components/`; logic and data access in `lib/`. If the first plan sets a different structure, it is kept consistently afterwards.

## Development Workflow

- Spec-Kit cycle per feature: `/speckit-specify` → `/speckit-clarify` → `/speckit-plan` → `/speckit-tasks` → `/speckit-analyze` → `/speckit-implement`.
- Specs describe what and why, without mentioning technology; technology belongs in the plan.
- One git branch per feature. One commit per task, or per small group of related tasks, with a descriptive message.
- Language: everything in English — specs, plans, tasks, code comments, commit messages, and code identifiers (variables, functions, files).
- During `/speckit-implement`, the agent MUST stop after finishing each user story so the author can test it before moving on to the next one.
- **Definition of done** for a user story:
  1. Lint and type check pass with no errors.
  2. Unit tests for its logic pass.
  3. Manually verified on phone and browser using its checklist.
  4. The plan's "New Concepts" section reviewed by the author.

## Governance

- This constitution supersedes any other practice or agent preference. Every plan's "Constitution Check" MUST review all five principles.
- Amendments are made with `/speckit-constitution`, stating the reason, and follow semantic versioning:
  - MAJOR: a principle is removed or redefined.
  - MINOR: a principle or section is added, or a rule is expanded.
  - PATCH: clarifications or wording changes.
- Amending the constitution as the project grows is expected (for example, when adding sync between devices). The MVP's simplicity is a starting point, not a dogma.

**Version**: 1.0.1 | **Ratified**: 2026-11-06 | **Last Amended**: 2026-11-09
