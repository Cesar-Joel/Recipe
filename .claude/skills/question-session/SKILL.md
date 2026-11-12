---
name: question-session
description: Human question session about a Spec Kit feature's code (usually after reviewing it). Answer without implementing anything and log the resulting changes in the feature's questions.md. Only when the human says they are done, collect their decisions, carry them into spec.md/plan.md/tasks.md, and apply them through /speckit-analyze and /speckit-implement. Use when the human says they will ask questions or raise doubts about the code, or that they are going to review a feature. Also run it automatically every time /speckit-implement stops at a 🛑 STOP checkpoint for manual testing, so the human can ask questions while testing.
argument-hint: "[feature directory, e.g. specs/001-walking-skeleton-shell]"
compatibility: "Requires spec-kit project structure with .specify/ directory"
---

# Human question session

This skill adds one rule to the Spec Kit workflow: **while the human is asking questions,
nothing gets implemented.**

- Reply in the language the human uses. **Everything written to files is in English**
  (constitution, Development Workflow).
- The project constitution (`.specify/memory/constitution.md`) governs every answer and every
  change. A proposal that breaks a MUST principle is never logged as a plain change (see Phase 2,
  step 2).

## When this skill runs

- **On request:** the human says they will ask questions or review a feature.
- **Automatically at every manual-testing stop:** each time `/speckit-implement` stops at a
  `🛑 STOP` checkpoint (end of a user story, or of a follow-up phase), open a session for that
  feature **without waiting to be asked**, then do this once:
  1. Say in a few lines what was just built and which manual-check tasks are waiting (task IDs
     and the matching quickstart steps).
  2. Tell the human to test it and to bring any question or doubt, and that nothing else is
     implemented until they say they are done. If they have nothing to ask, they report the
     manual-test results.
  3. Do not start the next phase or story on your own. The checkpoint ends only when the human
     says they are done.
- If a session is already open (for example `/speckit-implement` stopped at a checkpoint during
  Phase 2 of this same session), do not open a second one. Continue the current session with
  step 1 above.

## Setup — resolve the feature

1. If the human gave a feature directory (argument or message), use it. Otherwise run
   `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from the repo root and
   take `FEATURE_DIR`, `FEATURE_SPEC`, `IMPL_PLAN` and `TASKS` from it. `--paths-only` is
   read-only, so it never rewrites `.specify/feature.json`.
2. If the script fails (no feature context) or the human is asking about a different feature
   than the one it returns, ask which `specs/NNN-name/` directory to use.
3. The session log is `FEATURE_DIR/questions.md`. If it already exists from an earlier session,
   add a new dated session to it and keep numbering items from where it stopped.

## Phase 1 — While the human asks

### What you do

- **Answer directly** by reading the code. Do not spawn subagents: these are reading questions.
- **Verify before asserting.** When the answer depends on behavior, check it: `npx jest`,
  `npx tsc --noEmit`, `npx expo lint`, running the app (`npx expo start --web`), or a throwaway
  script in the scratchpad. An "input → result" table convinces more than an explanation.
- **Trace the answer to the artifacts.** Compare the code with the feature's `spec.md`,
  `plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `tasks.md` and the
  constitution. Cite the source the same way Spec Kit does: `FR-006`, `SC-002`, `US2/AC1`,
  `plan: Structure Decision`, `research R2`, `Constitution III`.
- **Look beyond the question.** If you find a real defect while answering (an uncaught error, a
  spec or constitution violation, a bug on only the phone (Expo Go) or only the browser), say so
  and log it as **high** priority. If they ask about one case, check whether the same flaw
  repeats elsewhere.
- **Correct a false premise** with evidence (`file:line`), plainly.
- **Give a recommendation**, not a catalog of options. If there are real alternatives, show a
  short table with the recommended one first.
- **Check Expo/React Native APIs against the docs** for the `expo` major version in
  `package.json` (see `AGENTS.md`) before claiming how an API behaves. Do not answer from memory.

### Where you log changes

In `FEATURE_DIR/questions.md`. Create it with the first question that produces a change:

```markdown
# Question sessions: <feature name>

## Session <YYYY-MM-DD>
```

One numbered item per question that produces a change:

```markdown
### <n>. <short title> (priority high | medium | low)

Question: <summary>. Answer: <one or two lines>.

- **Source:** <FR-### / SC-### / US#/AC# / plan or research ref / Constitution <n>>, or
  `new intent` if the change alters what the spec or plan says.
- **Gap:** missing | partial | contradicts | unrequested | new intent.
- **<file>:<lines>**: <concrete change>.
- **Artifacts to update:** <spec.md, plan.md, research.md, quickstart.md, contracts/,
  data-model.md, or "none" when the code is simply being fixed to match them>.
- **Tests:** <Jest unit tests for logic in `src/lib/` (constitution V); component tests only if
  the spec calls for them; the manual phone + browser steps to add to quickstart.md>.
- **Human decision:** <only if there is one: options and which you recommend>.
```

The gap types are the ones `/speckit-converge` uses. `new intent` marks changes that must be
written into the spec or plan before they are built (Phase 2, step 4).

- A follow-up question **extends its item** instead of creating a new one.
- If a question implies no changes, say so in the answer and log nothing.
- If a change is really a new capability, log it under "Notes for future features" instead (see
  Phase 2, step 10).
- End every answer with what you logged (or that there are no changes) and "Next question
  whenever you're ready."

### What you do NOT do

- ❌ Write anything except `FEATURE_DIR/questions.md`. That means no edits to `src/`, tests,
  `spec.md`, `plan.md`, `research.md`, `tasks.md`, `quickstart.md`, checklists,
  `feature-roadmap.md` or configuration (`app.json`, `package.json`, …).
- ❌ Run Spec Kit commands that write (`/speckit-specify`, `/speckit-clarify`, `/speckit-plan`,
  `/speckit-tasks`, `/speckit-checklist`, `/speckit-implement`, `/speckit-converge`,
  `/speckit-constitution`), or install packages.
- ❌ Ask for decisions with `AskUserQuestion` mid-session. Log them in their item and ask them all
  together at the end, unless the human asks to decide on the spot.
- ❌ Change any checkbox in `checklists/`, or in `tasks.md`, with one exception: when the human
  confirms that a manual-check task passed (phone or browser), mark that task `[X]`. Nothing
  else is ticked in Phase 1, and a task the human reports as failing stays open (log the failure
  as an item).

## Phase 2 — When the human says they are done

Phase 2 starts only when the human says so explicitly ("done", "that's all", "go implement").
At a manual-testing stop, "done" after a clean test means: close the confirmed manual tasks, then
carry on with the next phase or story only if the human asks for it. If nothing was logged,
skip steps 1–7 and go straight to the next `/speckit-implement` run.

1. **Decisions.** Collect every open decision in `questions.md`, plus any item still marked
   "Open to verify" in `research.md` that the session touched. Ask them in as few
   `AskUserQuestion` calls as possible (max 4 questions each, recommended option first). Record
   the answers in a `## Human decisions (<YYYY-MM-DD>)` section at the top of `questions.md`.
   If the human wants to think it over and stop here, stop: `questions.md` is the hand-off.
2. **Constitution gate.** If an accepted change breaks a MUST principle, do not apply it as-is.
   Either justify it in the plan's "Complexity Tracking" table (Principle IV exceptions) or
   propose a constitution amendment with `/speckit-constitution`. The human chooses.
3. **Feature state.**
   - Check that the current branch is the feature's branch (`git branch --show-current` matches
     the `FEATURE_DIR` name). If not, ask before switching.
   - If the feature branch is already merged into `main`, ask the human whether to reopen it
     (follow-up work on this feature) or turn the changes into a new spec with
     `/speckit-specify`. Without an answer, change nothing.
   - **Scope check (Principle II):** a change that adds a new user story, or pushes the feature
     past about 3 stories, belongs in a new spec. Move it to "Notes for future features".
4. **Carry decisions into the artifacts.** `/speckit-analyze` and `/speckit-converge` treat
   `spec.md`, `plan.md` and `tasks.md` as the only source of intent. A decision that lives only
   in `questions.md` is invisible to them, and converge will later flag the new code as
   `unrequested` or `contradicts`. For every `new intent` item:
   - **`spec.md`**: add the Q&A under `## Clarifications` → `### Session <YYYY-MM-DD>` as
     `- Q: <question> → A: <answer>` (the `/speckit-clarify` format), then update the affected
     FR, acceptance scenario, edge case or success criterion. No technology in the spec.
   - **`research.md`**: each new technical decision gets Decision, Rationale and Alternatives
     (Principle I). Close any "Open to verify" item the session settled.
   - **`plan.md`**: update the parts the change touches: Technical Context, Constitution Check,
     a **New Concepts** row for any concept used for the first time (Principle I), Complexity
     Tracking for any new dependency or exception (Principle IV), and the source structure.
   - **`quickstart.md`**: update the story's manual checklist so it still covers the new behavior
     on the phone and in the browser (Principle V). Update `contracts/` and `data-model.md` if
     routes or entities change.
   - If the spec changed, re-check that `checklists/requirements.md` still holds. Tell the human
     about any item that no longer passes; do not tick or untick it yourself.
5. **Grouping.** Decide how to group the work and explain it in one line:
   - **Everything in one round** when changes touch the same files or overlap (the usual case).
   - **In batches** when there are independent groups and one is risky or awaits a decision.
   - **One by one** only if each change conditions the next.
6. **Tasks.** Update `tasks.md` without breaking its history:
   - Never rewrite, renumber, reorder or delete a completed (`[X]`) task. Corrections to finished
     work become new tasks.
   - An unchecked task whose instructions a decision changed may be reworded in place. Keep its
     ID and add `(updated per questions #<n>)`.
   - Append new work at the **end** of `tasks.md` as `## Phase N: Review Follow-up` (N = highest
     phase + 1; a later session adds another phase). Use the same contract as
     `/speckit-converge`, so the two can follow each other.
   - Number IDs from the highest existing ID plus one (`T035`, `T036`, …) and order
     high-priority items first. Use the strict checklist format from `/speckit-tasks`:
     `- [ ] T035 [P?] <imperative description with exact file path> per <source-ref> (questions #<n>)`.
   - Add a `**Purpose**` line linking to `questions.md`, then a `### Verification (REQUIRED)`
     block. It includes `npx expo lint`, `npx tsc --noEmit` and `npx jest` with no errors, plus
     a manual check on the phone (Expo Go) and one in the browser using the quickstart steps.
     End with a `**Checkpoint**` line and a `**🛑 STOP**` line so the author tests before moving
     on.
7. **Analyze.** Run `/speckit-analyze` (read-only), following the constitution's order: tasks →
   analyze → implement. Fix any inconsistency it reports in the artifacts before implementing.
8. **Implement.** Run `/speckit-implement` with a task filter for this round (for example
   `Only Phase N: Review Follow-up, T035–T042`, plus any reworded unchecked tasks the human wants
   now). Without a filter it would also run every other unchecked task in the feature.
   - It marks completed tasks `[X]` and stops at the 🛑 checkpoint. Mark the manual phone and
     browser tasks `[X]` only after the human confirms them.
   - Project rules from `AGENTS.md` apply: routes in `src/app/`, components in
     `src/components/`, logic in `src/lib/`, `npx expo install` for packages, never hand-edit
     `ios/` or `android/`.
9. **Review.** Check the most important item by hand (the high-priority defect, the case that
   motivated the question). Then review the diff with `/code-review`, a skill built into Claude
   Code (it is not in `.claude/skills/`). In any other harness, review `git diff` by hand against
   `spec.md`, `plan.md` and the constitution instead. Either way, look systematically for the
   whole class of defect found, not only the specific case. Fix blocking findings. For any gap
   the decisions did not cover, or a minor non-blocking observation, ask the human before
   acting. When every task in `tasks.md` is `[X]`, run `/speckit-converge` to confirm the feature
   satisfies its spec. Converge must run only after implement, and on an unfinished feature it
   would append the pending tasks again.
10. **Notes for future features.** Anything that belongs to another feature goes in a
    `## Notes for future features` section of `questions.md`, with its origin (`questions #<n>`)
    and the matching row of `feature-roadmap.md` (#2, #3, …). Offer to add it to that roadmap
    prompt, but only edit `feature-roadmap.md` with the human's approval: those are their
    `/speckit-specify` prompts.
11. **Close.** The round is done when the constitution's Definition of Done holds for each
    affected user story:
    - lint and type check pass;
    - unit tests pass;
    - manual checks pass on the phone and in the browser;
    - the author has reviewed the plan's New Concepts.

    Commit only with the human's approval, either through the optional `/speckit-git-commit`
    hooks that `/speckit-implement` offers or as one descriptive commit per task or small group
    (constitution). Open a PR only if the human asks.
