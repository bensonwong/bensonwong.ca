# Portfolio 001: Show the work

Status: complete

## Objective

Present Benson's engineering work and founder experience through large product
demonstrations, clear project descriptions, and a concise career history.

## Scope

- A light, spacious portfolio with existing clamp, DeepCitation, and PHI Mask media.
- Clear links to working products and public engineering evidence.
- Responsive layout, keyboard navigation, and an explicit motion control.
- Static fallbacks for reduced motion, disabled JavaScript, and media failures.
- Local preview and validation. Publishing is a separate action.

The owner requested a more visual portfolio and delegated the visual direction.
The large project demonstrations are the new visual elements in this work.

## Source and content rules

Use the reference site's presentation patterns. Do not copy its text or assets.
Keep the products' names and claims accurate. Do not infer personal achievements,
deployment scale, or employment dates from repository code. Private resume work
and source documents stay outside the published files and Git history.

## Decisions

Adapted the spacious introduction, large project films, and quiet captions from
[Rachel Chen's portfolio](https://www.rachelchen.tech/). Kept the page static and
preserved direct links, skip navigation, and visible keyboard focus. The owner
delegated the visual direction and requested the three product animations.

The films use the requested clamp and DeepCitation hero exports and a shipped
PHI Mask capture. The three products retain separate descriptions and identity.
Only media derivatives are included; no private product runtime source was copied.
The clamp contact link reflects its repository's current private visibility.
The animation's count is labeled as an example, not a production measurement.

Career details use the owner's account and existing profile. Project descriptions
now state engineering ownership. New copy does not imply inference-fleet or GPU
experience, and database performance claims do not invent improvement percentages.

## Validation

Completed 2026-09-11.

- `bun run validate` passes.
- 38 browser and local-serving checks passed across the completed passes.
- Layout checked at 1440, 1280, 768, 760, 390, and 320 pixels, including first-demo
  visibility on laptop and phone. Screenshots were inspected.
- Keyboard skip navigation and focus styling, explicit pause/play, offscreen
  playback, initial and live reduced motion, disabled JavaScript, failed-video
  posters, and full-size playback links were checked.
- Private document paths, Git metadata, and internal tracking files return 404
  from the local preview. Private working directories are ignored by Git.
- All three MP4s fully decode. They contain no audio, use H.264/yuv420p and
  faststart, and total about 2.5 MB. Posters were inspected, including the settled
  PHI Mask result. Attribution and license notices accompany the assets.
- The hidden-tab event handler is implemented; this browser environment did not
  consistently expose hidden-tab transitions, so that transition is not claimed
  as tested.

Changes are prepared locally. Publishing was not part of this pass.
