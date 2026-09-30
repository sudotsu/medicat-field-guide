# Contributing

Contributions are welcome, especially corrections backed by primary sources, clearer failure routing, accessibility improvements, and evidence from the actual MediCat environment.

## Before changing guidance

1. Establish the MediCat, operating-system, browser, and bundled-tool version involved.
2. Verify technical and safety claims against current first-party documentation or project source matched as closely as possible to that version.
3. Add or update the source in `docs/SOURCES.md`.
4. Distinguish verified behavior from recommendation, inference, and unresolved uncertainty.
5. Do not add exact credential, partition, boot-record, firmware, or destructive procedures without installed-version evidence and an observable success/failure path.

## Content pattern

Each workflow should provide:

1. the requested outcome;
2. one recommended next action;
3. the minimum explanation needed to make the decision intelligible;
4. what can safely be ignored;
5. what cannot be ignored;
6. an observable success condition;
7. failure-specific routing;
8. optional deeper understanding.

Do not turn the guide into an undirected catalog of utilities. Recommend a default for the observed problem and introduce an alternative only for a defined reason.

## Privacy and scope

- Do not commit customer data, credentials, recovery codes, encryption keys, diagnostic logs containing personal information, third-party binaries, boot images, commercial utilities, or firmware.
- Do not add forms or fields for names, device serial numbers, passwords, passkeys, recovery keys, or recovery codes.
- Do not add telemetry, analytics, accounts, external runtime assets, or required network access.
- Keep Ventoy integration inert until paths and behavior are verified against the target release.

## Checks

Run:

```bash
bash tests/run_mvp_checks.sh
```

For a user-facing change, exercise the affected route in a browser at both desktop and narrow viewport sizes. Record anything the current environment cannot verify rather than converting an assumption into a claim.
