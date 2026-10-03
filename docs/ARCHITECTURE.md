# Architecture and integration proposal

## Product model

The Field Guide is a decision layer in front of MediCat's tool collection. It does not execute recovery utilities or silently change a device. It establishes the requested outcome and consequential constraints, recommends the next step, and teaches only the concepts needed to make that step intelligible.

The initial implementation is a dependency-free static application. Content is stored in classic JavaScript data files so it can operate without module loading or `fetch()` when opened from a local file. Direct-file behavior still has to be verified in the browser actually included with Mini Windows.

The Lockpick module now maps the 14 entries visible in a user-supplied MInstAll photo and introduces the photographed live desktop. Launcher labels are evidence of presence on that photographed build; individual program behavior, full executable versions, and the scrollable Start menu still need direct inspection.

The reader-facing Lockpick route leads with the task, recommends a starting program for the common confirmed local-account case, and keeps the complete launcher list compact. Version and reference information is available on demand. A program without verified instructions receives a plain explanation and a link to a documented route instead of guessed controls.

## Proposed MediCat layers

1. **Ventoy menu tips:** one-line purpose, dominant risk, and route into the guide.
2. **F6 Start Here menu:** a small pre-boot problem router, not a full tutorial.
3. **Offline Guide Center:** the searchable instructional application, preferably launched through a supported external Mini Windows startup mechanism.

Keeping the Guide Center outside the WIM would make content updates and rollback independent of rebuilding Mini Windows. That remains a proposal until the MediCat maintainers confirm the supported startup and release mechanism.

## Data and privacy

The intake stores categorical selections in `sessionStorage`. It does not ask for or store identifying device/customer information or authentication secrets. A reset control removes the current session answers.

No analytics, telemetry, accounts, external fonts, CDNs, or runtime network requests are present.

## Readiness states

- `Route ready`: the provided conditions support the recommended route.
- `Proceed with checks`: the route is plausible, but a consequential fact still needs inspection.
- `Hold before writing`: the current answers conflict with a write/destructive action.

A hold does not prevent the user from reading the workflow. It prevents the interface from presenting destructive work as ready.

## Maintainer decisions required

- Whether the primary product is bundled offline help, website documentation, or both.
- Which repository owns the application and structured content.
- Which Mini Windows browser engine and direct-file constraints must be supported.
- Which external startup mechanism is stable and supported.
- Whether the official Ventoy layout should include the menu-tip and F6 layers.
- How guide content is versioned against MediCat releases and bundled-tool inventories.

## Integration gates

Before an official deployment claim:

1. Inventory the exact runtime, startup hook, MediCat paths, Ventoy keys, and bundled Lockpick components.
2. Test direct-file launch and session behavior in the installed Mini Windows environment.
3. Resolve all draft paths against the release tree.
4. Match every version-dependent procedure to the bundled component and current primary source.
5. Build in a trusted environment and retain an independent rollback copy.
6. Exercise applicable UEFI and Legacy boot paths on the release candidate.
7. Verify that failures are visible and route to an actionable recovery step.
