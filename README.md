# Cece Law Website

Production-ready Next.js (App Router) marketing site for Cece Law, using Dark Authority styling tokens, Tailwind CSS, and JSON-driven content.

## Getting started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the development server
   ```bash
   npm run dev
   ```
3. Lint and build
   ```bash
   npm run lint
   npm run build
   ```

## Content editing
All copy and key facts live in JSON under `src/content/`:
- `site.json`: firm-wide details (phones, offices, disclaimers, theme tokens).
- `attorney.frank-cece-jr.json`: attorney bio, education, admissions, memberships, recognition.
- `practice-areas.json`: criminal defense and personal injury subpages, including FAQs.
- `testimonials.json`: testimonials plus required disclaimer.
- `resources.json`: resource guides and checklists with FAQ entries.

Update these files to change text; page components read directly from them so no code edits are needed for routine content updates.

## Styling
Global variables and behaviors are defined in `src/styles/globals.css` (CECE LAW | DARK AUTHORITY REFACTOR). Tailwind uses these tokens for consistent theming.

## SEO and Schema
Utilities in `src/lib/seo.ts` and `src/lib/schema.ts` generate metadata and JSON-LD for LegalService, Attorney, LocalBusiness, and FAQPage schemas. Pages render schema snippets based on available FAQs and context.

## CI
GitHub Actions workflow `.github/workflows/ci.yml` runs lint and build on pushes and pull requests to `main`.

## Compliance reminders
- No guarantees or promises of outcomes.
- Disclaimers appear in the footer site-wide, on the Disclaimer page, and on Results/Testimonials pages as required.
