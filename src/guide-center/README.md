# Guide Center prototype

This is a dependency-free, offline-first source prototype. It is not a trusted deployment package.

## Preview

From the repository root:

~~~bash
python3 -m http.server 4173 --directory src/guide-center
~~~

Open:

~~~text
http://127.0.0.1:4173/
~~~

The prototype is also designed to open directly from `index.html` without a web server. The actual Mini Windows browser/runtime remains uninventoried, so production compatibility is not yet established.

## Data files

- `data/guides.js` — problem-led workflows
- `data/tools.js` — 607 named programs and boot tools at 630 observed locations, with 12 short lessons
- `data/glossary.js` — plain-English terms
- `data/intake.js` — problem-first job routing, relevant follow-up questions, readiness findings, and brief content
- `data/password.js` — password and access paths, photographed Lockpick launcher inventory, live-environment orientation, and evidence-labeled program lessons

The files use classic scripts and assign data to `window` so the prototype does not rely on module loading or `fetch()` from a `file://` URL.

The guided intake stores only categorical choices in `sessionStorage`. Answers survive navigation and reloads in the same browser tab, disappear when that browser session ends, and can be removed with **Clear session answers**. It does not ask for customer names, device serial numbers, credentials, passkeys, recovery keys, or recovery codes.

## Constraints

- No network assets, CDNs, analytics, or external fonts.
- No write to the bootable MediCat partition.
- No exact destructive tool procedure without installed-version evidence.
- No Microsoft Defender dependency or recommendation.
- No automatic scanner deletion, quarantine, movement, or repair.
- No phone-tool inventory or packaging in this phase.
