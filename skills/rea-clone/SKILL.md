---
name: rea-clone
description: Rebuild one screen or feature of a compiled app with REA (Reverse Engineer Anything) in Claude Code, features first and then the look. Use when the user asks to reverse engineer, clone or rebuild an app screen or feature without its source code, for an app they are allowed to analyze (their own, open source, or an authorized target).
---

# REA clone: features first, then the look

Lessons from MG's test (video: https://youtu.be/nL9MmtrdcC8, notes:
https://mg-cafe.github.io/blog/reverse-engineer-anything-claude-code/). On a compiled iPhone app, Claude Code alone
copied the surface but got the order of the cards wrong, repeated a card and missed features ($11.76, about 40
minutes). With REA it found the features and the right order ($40.60, about 1 hour 12 minutes), but the look was less
polished, and both runs missed an animated 3D element. Best result: REA for the features, then Claude Code's own eyes
for the look. Follow these steps in order.

## 1. Check before you start

- **Permission.** Continue only if the target is the user's own app, open source, or something they are authorized
  to test. If that is not clear, ask once and wait for the answer.
- **REA is installed.** Look for REA's MCP tools. If they are missing, tell the user how to install REA and stop:
  Node.js 22.19+, 24.11+ or 26+ (`node -v`), then `npx rea-agents setup` (pick Claude Code, review, approve) and a
  restart of Claude Code. Native binaries also need Hopper, Ghidra or IDA. Updates: `npx rea-agents@latest setup`.
- **Scope.** One screen or one feature. Write down what is out of scope (for example login, onboarding, settings and
  the other tabs). Never open anything outside the folder the user gave you.
- **Cost.** REA runs take longer and cost more than a plain run (about 3.5 times in MG's test). Say so before you
  start, and keep the scope small.

## 2. Features (use REA)

Use REA to work out, in order from top to bottom:

- every section or card, its labels, its colors and the data it shows
- what each button, tab or tap does
- anything animated, 3D or custom drawn

For each part, record where in the binary you found it (string, symbol, address, resource or file). Keep a list of
what is still unknown. Never fill a gap with a guess: say what you could not find.

Write the findings to `rea-findings.md` as a table: part | what it shows | evidence | confidence.

## 3. Build

Rebuild only that screen as one HTML file at the device size (393×852 for an iPhone, unless the user says otherwise)
with realistic simulated data, labeled as sample data.

- Keep the exact order of the sections. Never repeat a section.
- Make every button and tab respond, even if it only opens a sample detail.
- Rebuild animated or 3D parts (CSS, canvas or WebGL), or list each one as missing with the reason.

## 4. Look (Claude Code's own eyes)

REA is strong on features and weaker on looks, so check the look yourself:

1. Get the real screen: screenshots from the user, the user's screen, or the browser for a web app.
2. Screenshot your build at the same size (for example headless Chrome with `--window-size=393,852
   --force-device-scale-factor=3 --screenshot=build.png`).
3. Compare them side by side, section by section: layout, spacing, fonts, sizes, colors, icons, background and motion.
4. Fix the differences and compare again. Repeat until only small differences are left.

## 5. Report

- The real screen and your build side by side
- What matches, what is missing and what is still unknown, with the evidence for each part
- The time and cost of the run (`/cost`)
