# Portfolio 004: Full PHI Mask carousel

Status: complete

## Owner request

Replace the repeating PHI Mask film with the full carousel. Clicking the
current example opens its matching /mask-data demo. Remove PHI Mask's
Watch full-size demo link.

## Implementation

Reuse all eight shipped examples, order, labels, exact public media, and
example query mappings from PhimaskCaptureHero.tsx and captureHeroAssets.ts
in the owner's deepclamp-web package. Source filenames retain historical names
that differ from current demo labels; the query mapping is authoritative.
No product runtime or private document data is copied.

The owner requested the carousel controls. Keep the existing global motion
button, lazy playback, offscreen pause, and reduced-motion stills. Only the
selected video's viewport variant loads. Ended advances to the next example.
Keyboard focus stops rotation. A dot selects and plays its animation except
under reduced motion or Save-Data. Hovering the demo pauses temporarily so
the clickable Try this example overlay keeps its destination. Static picker
links work without JavaScript.
Static images are source previews, not claims of completed masking.

## Validation

- `bun run validate` passed, including the eight-example and 32-asset checks.
- 63 browser checks passed: all eight dot selections start their matching
  animation, automatic advance changes the destination, pause/play, hover,
  keyboard selection, keyboard-focus pause, and reduced motion work.
- Layout and static selection checked at 1440, 768, 640, 390, and 320 pixels.
  Only the selected viewport's video loads. Source previews and all eight
  direct demo links work without JavaScript; failed video leaves a preview
  and does not prevent selecting another demo.
- All eight overlay clicks were intercepted locally and verified to navigate
  to their matching `/mask-data?example=...&format=image` destination.
- Desktop example captures and the phone layout were visually inspected.
- An initial playback failure was traced to loading the video with no source
  during selection. Loading now belongs to the playback controller and occurs
  only after assigning the selected source. The final browser pass is green.
- Media files are unchanged copies of the shipped assets, approximately 23 MB
  across both viewport variants. They are not eagerly fetched as a set.
- Local changes only. No deployment, push, or external write.

## Publication and timeline correction

The owner approved publishing after review. Pushed the approved work to main
on 2026-09-11; GitHub Pages reported commit 58af88e built successfully.
The owner then corrected the old resume's Adaptive Pulse start year: the role
followed Portia rather than overlapping it. The public timeline now says 2022.
