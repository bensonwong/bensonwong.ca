# Portfolio 003: Naming and outgoing links

Status: complete

## Request

Use DeepClamp in public copy and the offline resume. Update the RTK description
to 80,000 stars. Add nofollow to Alex's and Kristin's profile links, and suppress
the referring page when visitors click them.

## Implementation

Rename the displayed project, social preview, metadata, and private resume copy.
Preserve archived media and internal asset names. Both profile links use
`rel="nofollow noreferrer"`. This suppresses the HTTP referrer and marks the
links nofollow; it does not conceal the association stated in the public page.

## Validation

- GitHub's API reported 79,960 stars on 2026-09-11, supporting the rounded 80k.
- `bun run validate` passed. The social preview regenerated; the offline resume
  regenerated as two pages with DeepClamp's corrected name.
- Browser checks confirmed the displayed name, 80,000-star wording, both
  nofollow attributes, and absence of the Referer header on both clicks.
  Destination requests were intercepted locally; no external visit was made.
- Public association remains visible in the page. No claim of anonymity.
- Local changes only; nothing pushed or published.
