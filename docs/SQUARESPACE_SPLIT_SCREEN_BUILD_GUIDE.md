# CECE LAW Squarespace 7.1 (Fluid Engine) Split-Screen Build Guide

## Purpose
Use this guide to build pages in Squarespace while preserving the master copy file as source of truth.

## Build Order (Recommended)
1. Tier 1: Home, Contact, About
2. Tier 2: High-intent practice pages
3. Tier 3: Local SEO pages
4. Tier 4: Support pages (FAQ, Payment)

## Split-Screen Workflow
- **Left screen:** `master/CECE_LAW_WEBSITE_COPY_v1.0.md`
- **Right screen:** Squarespace editor for the target page
- Filter to one page by `COPY_REF`.
- Copy only the relevant section text blocks for that page.
- Paste section-by-section in Fluid Engine blocks (text, accordion, CTA, form blocks).
- Save and publish draft only after section review.

## Paste Discipline Checklist
- Confirm the target page `COPY_REF` before pasting.
- Do not rewrite text directly in Squarespace unless urgently required.
- If an emergency edit is made in Squarespace, patch master file immediately after.
- Preserve disclaimer language exactly.
- Confirm no prohibited language (legal advice, guarantees).
- Re-check SEO title/meta before publish.

## Squarespace SEO Placement (All Pages)
- In Squarespace page settings: open **SEO** tab.
- Paste `SEO Title` into SEO Title field.
- Paste `Meta Description` into SEO Description field.
- Keep URL slug aligned with page intent and naming.

---

## Tier 1 Page Build Map

### Home
- Squarespace Page Name: Home
- URL Slug: `/` (homepage)
- COPY_REF: `T1.HOME.CORE`
- Paste plan:
  - Hero section → `[SECTION: HERO]`
  - Proof strip or text section → `[SECTION: PROOF]`
  - Process/timeline section → `[SECTION: PROCESS]`
  - FAQ accordion → `[SECTION: FAQ]`
  - Closing CTA → `[SECTION: CTA_CLOSE]`
  - Form/Button labels → `Microcopy`

### Contact
- Squarespace Page Name: Contact
- URL Slug: `/contact`
- COPY_REF: `T1.CONTACT.CORE`
- Paste plan:
  - Hero intro → `[SECTION: HERO]`
  - Intake details → `[SECTION: PROCESS]`
  - Close CTA + phone block → `[SECTION: CTA_CLOSE]`
  - Form labels/buttons → `Microcopy`

### About
- Squarespace Page Name: About
- URL Slug: `/about`
- COPY_REF: `T1.ABOUT.CORE`
- Paste plan:
  - Profile hero → `[SECTION: HERO]`
  - Credentials/proof → `[SECTION: PROOF]`
  - CTA close → `[SECTION: CTA_CLOSE]`

## Tier 2 Page Build Map

### DUI Defense
- Squarespace Page Name: DUI Defense
- URL Slug: `/dui-defense-[fill-in-city]`
- COPY_REF: `T2.DUI_DEFENSE.CORE`
- Paste plan: HERO → PROCESS → FAQ → CTA_CLOSE → Microcopy

### Domestic Violence Defense
- Squarespace Page Name: Domestic Violence Defense
- URL Slug: `/domestic-violence-defense`
- COPY_REF: `T2.DOMESTIC_VIOLENCE_DEFENSE.CORE`
- Paste plan: HERO → CTA_CLOSE → Microcopy

## Tier 3 Page Build Map

### Local Intent Template
- Squarespace Page Name: `[Suburb/Courthouse] Criminal Defense`
- URL Slug: `/criminal-defense-[suburb-or-courthouse]`
- COPY_REF: `T3.LOCAL.[SUBURB_OR_COURTHOUSE].CORE`
- Paste plan: HERO → PROOF (ethics-safe location block) → CTA_CLOSE → Microcopy

## Tier 4 Page Build Map

### FAQ Hub
- Squarespace Page Name: FAQ
- URL Slug: `/faq`
- COPY_REF: `T4.FAQ_HUB.CORE`
- Paste plan: FAQ accordion → CTA_CLOSE → Microcopy

### Payment
- Squarespace Page Name: Payment
- URL Slug: `/payment`
- COPY_REF: `T4.PAYMENT.CORE`
- Paste plan: HERO → PROCESS → CTA_CLOSE → Microcopy

## Change Governance
- Every content change must be applied in master file and logged in changelog first (or immediately after urgent patch).
- Use AI operator workflow for insert blocks and changelog line generation.
