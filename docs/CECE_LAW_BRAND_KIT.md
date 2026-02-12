# CECE LAW Brand Kit — Wild Orchid Rebrand (v1)

## Brand Positioning
- Archetype: **Trusted Authority**
- Voice: commanding, direct, reassuring
- Perspective: former prosecutor discipline + protector narrative
- Marketing stack alignment: Google + Squarespace

## Color Token Standard
Use these tokens everywhere in UI guidance, copy docs, and style references.

- `CL_BLACK`: `#000000` (Primary text, primary anchors)
- `CL_GRAPHITE`: `#161616` (Body text, nav, deep UI)
- `CL_PLUM_BLACK`: `#181315` (Deep accent, overlays, subtle separators)
- `CL_ORCHID_A`: `#8a7cb7` (Primary accent / primary CTA)
- `CL_ORCHID_B`: `#897cb6` (Secondary accent / hover shift)
- `CL_FOG`: `#e7e7e7` (Light background surfaces)
- `CL_SILVER`: `#a4a4a4` (Borders, muted text, dividers)

## Usage Guidance
- Primary CTA button: `CL_ORCHID_A` background with `CL_BLACK` or `CL_FOG` label (choose by contrast test).
- Secondary button: transparent background + `CL_ORCHID_A` border + `CL_ORCHID_A` text.
- Headlines: `CL_BLACK`.
- Body text: `CL_GRAPHITE`.
- Section backgrounds: white or `CL_FOG`.
- Dividers and borders: `CL_SILVER` on light surfaces or `CL_PLUM_BLACK` on dark surfaces.
- Avoid purple body text on light backgrounds unless contrast is verified.
- Hover state standard: shift `CL_ORCHID_A` to `CL_ORCHID_B` (or darken by one accessible step) consistently across components.

## Accessibility Note
Validate contrast for CTA text and nav text; prefer `CL_FOG` or `CL_BLACK` for legibility.

## Component Tokens (Squarespace-oriented)
- Nav background: `CL_GRAPHITE`
- Nav links: `CL_FOG`
- Hero overlay: `CL_PLUM_BLACK` at accessible opacity
- Primary button: `CL_ORCHID_A`
- Primary button hover: `CL_ORCHID_B`
- Secondary button border/text: `CL_ORCHID_A`
- Card background: `CL_FOG`
- Default border: `CL_SILVER`

## CSS Variable Reference
```css
:root {
  --cl-black: #000000;
  --cl-graphite: #161616;
  --cl-plum-black: #181315;
  --cl-orchid-a: #8a7cb7;
  --cl-orchid-b: #897cb6;
  --cl-fog: #e7e7e7;
  --cl-silver: #a4a4a4;
}
```
