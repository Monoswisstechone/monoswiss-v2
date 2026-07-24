# Monoswiss V2 — Changelog

This document tracks all notable changes made to the project during development, organized by date and phase.

**Last Updated:** 2026-07-24

---

## 2026-07-24

### Sprint 1 — IMP-004: Review and Improve Trust Indicators
#### Added
- Merged V1 qualitative trust indicators (`PH-Based`, `Fintech Verticals`, `Transparent Naira Pricing`, `Compliance-ready`) into the homepage statistics section.
- Updated `js/main.js` to only animate numeric statistics, preserving static text badges.

#### Root Cause
The V2 statistics section used placeholder generic metrics. Documentation (HOME-003) directed to merge V1's factual, locally-relevant trust signals instead of using generic animated counters.

#### Files Modified
- `index.html` — Replaced placeholder statistics with documented trust indicators.
- `js/main.js` — Updated `animateCounter` to filter by `data-target` attribute to prevent non-numeric badges from animating.

#### Verification Result
- **Desktop (1280×800):** PASS
- **Tablet (768×1024):** PASS
- **Mobile (375×667):** PASS

---
### Sprint 1 — IMP-003: Fix Hero Animation Timing

#### Removed
- **`.hero-content` animation:** Removed the now-redundant `fade-in-up` animation. The content now renders immediately with no translate shift.
- **`.hero-dashboard` animation:** Removed the `fade-in-up` animation and its `0.4s` delay. The dashboard element now appears instantly alongside the text content.

#### Root Cause
The hero section had two sets of entry animations that created unnecessary rendering delays. After IMP-002 removed the `opacity: 0` start state, the `.hero-content` animation (`translateY(20px) → translateY(0)`) was still being processed by the browser. The `.hero-dashboard` had a `0.4s` animation delay that caused the visual element to pop in after the text, creating a disjointed load.

#### Files Modified
- `css/style.css` — Removed animation properties from `.hero-content` and `.hero-dashboard`.

#### Verification Result
- **Desktop (1280×800):** PASS
- **Tablet (768×1024):** PASS
- **Mobile (375×667):** PASS

---

### Sprint 1 — IMP-001: Fix Mobile Header Visibility

#### Added
- **Base `.cta-button` styles:** Added default button styling (padding, border-radius, font-weight, transition, display) to ensure the CTA button renders correctly across all viewports.
- **Desktop `.navbar .cta-button` styles:** Added gradient background, white text, padding, and hover effect for desktop navigation CTA.
- **Mobile menu `.cta-button` styles:** Added full-width gradient CTA button with proper padding and margins for mobile navigation dropdown.

#### Root Cause
The `.cta-button` class used in the navbar had no base styles defined. On desktop, it appeared as an unstyled plain text link. On mobile, the hamburger menu's CTA button was hidden (`display: none`) and only received `display: block; margin-top: 1rem;` when the menu opened — with no visual styling (background, padding, color, border-radius).

#### Files Modified
- `css/style.css` — Added `.cta-button` base styles, `.navbar .cta-button` desktop styles, and updated `.mobile-nav-open .cta-button` mobile styles.

#### Quality Gate Status
- **Implementation:** COMPLETE
- **CSS Duplication Check:** PASS — No conflicting `.cta-button` definitions found.
- **Automated Testing:** PENDING — Playwright QA gate deferred due to external Anthropic API interruption. To be rerun before Sprint 1 closes.

---

### Phase RC-09 — DOCUMENT_INDEX.md Update
- **Updated `DOCUMENT_INDEX.md`:** Synchronized with all 10 documentation files. Updated progress statistics (10 files, all 10 HOME sections complete).

### Phase RC-08 — IMPLEMENTATION_TRACKER.md Creation

#### Added
- **Created `IMPLEMENTATION_TRACKER.md`:** Development task tracker with 6 Sprints. Tasks are cross-referenced with Documentation IDs.

---

## 2026-07-24

### Documentation Recovery
- **Restored `CONTENT_LIBRARY.md`:** Recovered all HOME-001 through HOME-009 sections from verified documentation in `HOMEPAGE_PRESERVATION_REPORT.md`.

### Phase RC-07 — Documentation Recovery
#### Added
- **Created `PROJECT_CONTEXT.md`:** Single source of truth for the entire Monoswiss V2 project. Contains project overview, development environment, repository info, deployment status, AI workflow, documentation architecture, homepage status, project rules, milestones, links, and session recovery instructions.

### Phase 3 — Homepage Preservation Report

#### Added
- **Updated `HOMEPAGE_PRESERVATION_REPORT.md`:** Completed Section-by-Section Analysis for HOME-006 through HOME-010.

### Phase 4 — Executive Report Completion

#### Added
- **Completed `HOMEPAGE_PRESERVATION_REPORT.md`:** All 8 major sections written (Business Strategy, SEO Analysis, UX Analysis, Content Migration, Asset Summary, Comparison Summary, Rebuild Recommendations, Implementation Roadmap).

### Phase 2 — Production Readiness (Baseline)

#### Added
- **Favicon:** Created `favicon.svg` (branded "M" logo).
- **SEO Metadata:** Added `description` and `keywords` meta tags to `index.html`.
- **Open Graph Tags:** Added `og:title`, `og:description`, `og:type`, `og:url`, `og:locale`, and `og:site_name` to `index.html`.
- **Twitter Card Tags:** Added `twitter:card`, `twitter:title`, and `twitter:description` to `index.html`.
- **robots.txt:** Created to guide search engine crawlers.
- **sitemap.xml:** Created with the production URL.
- **Documented HOME-006:** Featured Projects (not present on V1, service-led approach documented).
- **Documented HOME-007:** Process / How We Work (V1 uses "Why Monoswiss" value proposition, V2 uses a 6-step timeline).
- **Documented HOME-008:** Testimonials / Social Proof (not present on V1; trust signals documented).
- **Documented HOME-010:** Footer (partial extraction; email/WhatsApp confirmed, full footer text pending).
    - `PROJECT_MASTER_PLAN.md`
    - `CONTENT_LIBRARY.md`
    - `CONTENT_MIGRATION_TRACKER.md`
    - `DESIGN_AUDIT.md`
    - `CHANGELOG.md`

#### Fixed
- **Duplicate ID:** Removed the duplicate `id="contact"` from the `<div class="footer-social">` in `index.html`. The `id="contact"` now exists only on the primary contact section.

---

## 2026-07-22

### Phase 1 — Initial Development & Refactoring

#### Added
- Completed the initial HTML structure for all sections (Hero, Services, Projects, Process, Tech Stack, About, Testimonials, Blog, Contact, Footer).
- Implemented full responsive CSS with a custom dark theme.
- Implemented JavaScript for sticky navigation, scroll-triggered animations, number counters, and a mobile navigation toggle.
- Added `back-to-top` button functionality.

#### Refactored
- **Code Cleanup:** Removed duplicate `new-stats-section` HTML block from `index.html`.
- **JavaScript Consolidation:** Merged `animateHeroNumbers` and `animateNewNumbers` into a single reusable `animateCounter(selector)` function in `main.js`.
- **CSS Cleanup:** Removed all dead CSS selectors (`.new-stats-section`, `.new-stats-section .stat-item`, `.stat-number-new`) from `style.css`.

---

## 2026-07-21

### Project Initialization
- Project repository created.
- Initial website files (`index.html`, `css/style.css`, `js/main.js`) scaffolded.
