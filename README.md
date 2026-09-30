# MediCat Field Guide

An independent, working prototype of an offline, problem-led help system for [MediCat USB](https://medicatusb.com/).

**Live demo:** https://sudotsu.github.io/medicat-field-guide/

**Upstream feedback:** https://github.com/mon5termatt/medicat_installer/discussions/176

This project is not currently an official MediCat component. It is being offered to the MediCat maintainers for evaluation and integration guidance.

## What it solves

A large recovery toolkit is only useful when the operator can identify the actual problem before choosing a program. The Field Guide starts with the requested outcome, establishes the conditions that determine whether work is ready, and then routes the operator to one recommended next action.

It is designed to prevent common wrong-path decisions such as treating a Windows Hello PIN as a local-account password problem, treating BitLocker as an ordinary sign-in prompt, converting a disk merely because an installer mentions MBR/GPT, or wiping a device before replacing its passkeys and two-factor recovery methods.

## Current prototype

- Six-question guided intake covering outcome, target, authorization, preservation, identity recovery, and one problem-specific fact.
- Generated job brief with `Route ready`, `Proceed with checks`, or `Hold before writing`.
- One recommended next action, unresolved conditions, actions to avoid, and details safe to ignore.
- Six starting workflows:
  - Windows sign-in and password-problem classification;
  - Windows boot diagnosis;
  - live-environment selection;
  - backup decision-making;
  - preparation before wiping, flashing, or resetting;
  - clean Windows installation, including UEFI/Legacy and GPT/MBR routing.
- Search, related workflows, evidence-aware tool cards, and a plain-English glossary.
- Responsive, keyboard-usable, printable interface with reduced-motion support.
- Static HTML, CSS, and classic JavaScript with no package manager, CDN, external font, analytics, account, or runtime network request.
- Session-only categorical intake state. The guide does not request names, serial numbers, passwords, recovery keys, passkeys, or recovery codes.

## Review it locally

Open `src/guide-center/index.html` directly, or from the repository root run:

```bash
python3 -m http.server 4173 --directory src/guide-center
```

Then visit `http://127.0.0.1:4173/`.

Try two routes:

1. Windows sign-in → confirmed target → confirmed authorization → accepted loss → identity checked → Windows Hello PIN.
2. Clean installation → confirmed target → confirmed authorization → preserve existing data → authentication still depends on the device → MBR/GPT mismatch.

The first should route official PIN recovery before Lockpick. The second should hold disk writes and identify the preservation and identity conflicts separately.

## Run the focused checks

```bash
bash tests/run_mvp_checks.sh
```

The checks validate the local asset boundary, workflow structure, intake coverage, session-only state, related routes, destructive-work language, and the deliberately inert Ventoy drafts. Node syntax checks run when Node is available.

## Evidence boundary

The current prototype has been exercised in a normal Chrome environment and its focused checks pass. That does **not** establish compatibility with the browser or startup environment bundled in MediCat's Mini Windows build.

The following remain intentionally unresolved until the maintainers identify the intended release and integration path:

- installed Mini Windows browser/runtime and direct-file behavior;
- supported external startup hook;
- exact MediCat and Ventoy paths;
- exact Jayro's Lockpick components, versions, and procedures;
- production packaging, boot testing, update ownership, and rollback.

Version-dependent procedures must be supported by installed-build evidence and current primary sources. See [`docs/SOURCES.md`](docs/SOURCES.md).

## Repository map

- `src/guide-center/` — offline Guide Center application and structured content
- `src/ventoy/` — non-deployable menu-tip and F6 routing drafts
- `tests/` — focused content, integrity, and JavaScript parsing checks
- `docs/ARCHITECTURE.md` — integration model and maintainer decisions still required
- `docs/SOURCES.md` — primary-source registry and verification dates
- `CONTRIBUTING.md` — evidence and change requirements

## License

Released under the [MIT License](LICENSE) to permit evaluation, reuse, modification, and integration. MediCat and the names of third-party tools remain the property of their respective owners. No third-party binaries, boot images, customer data, credentials, or recovery material are included.
