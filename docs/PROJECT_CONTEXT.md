# Monoswiss V2 — Master Project Context

**Last Updated:** 2026-07-24

---

## 1. Project Overview

- **Project objective:** Create a modern, professional, high-performance marketing website that showcases Monoswiss Technology Ltd.'s expertise and drives business growth.
- **Current project phase:** Phase 3 — Content Migration & Asset Integration (Documentation complete; website implementation pending).
- **Long-term vision:** To be the most trusted and innovative software development partner for businesses across Africa and beyond.

---

## 2. Development Environment

- **Device:** Redmi Pad 2
- **Android 16**
- **HyperDroid PC Launcher**
- **Termux**
- **Ubuntu (proot)**
- **Git**
- **GitHub**
- **Node.js**
- **npm**

**Working project directory:** `/root/monoswiss-v2`

---

## 3. Repository Information

- **GitHub username:** *[Not yet configured]*
- **Repository name:** *[Not yet configured]*
- **Branch:** main
- **GitHub Pages URL:** *[Not yet configured]*
- **Current folder structure:**

```
/root/monoswiss-v2/
├── css/
│   └── style.css
├── docs/
│   ├── ASSET_LIBRARY.md
│   ├── CHANGELOG.md
│   ├── CONTENT_LIBRARY.md
│   ├── CONTENT_MIGRATION_TRACKER.md
│   ├── DESIGN_AUDIT.md
│   ├── DOCUMENT_INDEX.md
│   ├── HOMEPAGE_PRESERVATION_REPORT.md
│   ├── PROJECT_MASTER_PLAN.md
│   └── PROJECT_CONTEXT.md
├── js/
│   └── main.js
├── index.html
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

---

## 4. Deployment Status

- **GitHub Pages:** Not yet deployed.
- **Cloudflare:** Not yet configured.
- **Current production deployment:** None.
- **Deployment decisions:** Awaiting approval to deploy to GitHub Pages for testing.

---

## 5. AI Development Environment

- **Claude:** Primary AI assistant used for all documentation, code, refactoring, and project management.
- **ChatGPT:** *[Not currently used in this project]*
- **Omniroute / 9Router:** *[Not currently used in this project]*
- **Purpose of each tool:** Claude is used for all phases of this project, including content extraction, documentation, code implementation, and auditing.

---

## 6. Documentation Architecture

| File | Purpose |
| :--- | :--- |
| `PROJECT_MASTER_PLAN.md` | Strategic vision, phases, milestones, and Documentation ID Standard. |
| `PROJECT_CONTEXT.md` | Single source of truth for the entire project (this file). |
| `CONTENT_LIBRARY.md` | Central repository for all content and V1 homepage documentation (HOME-001 through HOME-010). |
| `CONTENT_MIGRATION_TRACKER.md` | Tracks placeholder migration status across all sections. |
| `DESIGN_AUDIT.md` | UX, accessibility (a11y), and visual design audit (DESIGN-001 through DESIGN-003). |
| `ASSET_LIBRARY.md` | Catalogue of every visual asset (ASSET-001 through ASSET-005). |
| `CHANGELOG.md` | Chronological record of all project changes. |
| `HOMEPAGE_PRESERVATION_REPORT.md` | Official blueprint for rebuilding the V2 homepage from V1 and V2. |
| `DOCUMENT_INDEX.md` | Master table of contents for all documentation. |

---

## 7. Homepage Documentation Status

The V1 homepage has been fully documented in `CONTENT_LIBRARY.md`. All 10 sections are complete:

| ID | Section | V1 Extracted? | V2 Documented? |
| :--- | :--- | :--- | :--- |
| HOME-001 | Header & Navigation | ✅ Yes | ✅ Yes |
| HOME-002 | Hero | ✅ Yes | ✅ Yes |
| HOME-003 | Trust Indicators | ✅ Yes | ✅ Yes |
| HOME-004 | Statistics | ✅ Yes (No V1 equivalent) | ✅ Yes |
| HOME-005 | Services | ✅ Yes | ✅ Yes |
| HOME-006 | Featured Projects | ✅ Yes (No V1 equivalent) | ✅ Yes |
| HOME-007 | Why Monoswiss / Process | ✅ Yes | ✅ Yes |
| HOME-008 | Testimonials | ✅ Yes (No V1 equivalent) | ✅ Yes |
| HOME-009 | Contact | ✅ Yes | ✅ Yes |
| HOME-010 | Footer | ⚠️ Partial | ✅ Yes |

Reference: `HOMEPAGE_PRESERVATION_REPORT.md` (full analysis and rebuild roadmap).

---

## 8. Website Current Status

### Completed Work
- Phase 1: Full single-page website built (HTML, CSS, JavaScript).
- Phase 2: SEO metadata, Open Graph tags, Twitter Cards, favicon, robots.txt, sitemap.xml added.
- Phase 3 (Documentation): Full V1 homepage preservation, Documentation ID Standard, all documentation files created.

### Known Issues
- Contact form has no backend (submissions go nowhere).
- Multiple placeholder links (`href="#"`).
- All images are external placeholders (placehold.co).
- `images/logo.png` referenced but does not exist.
- `favicon.png` fallback referenced but does not exist.
- `.cta-button` in the navbar is unstyled on desktop.

### Pending Improvements
- Replace all placeholder images with real assets.
- Remove fictional testimonials and replace with real client quotes.
- Restore V1 geographic SEO content into V2 design.
- Add WhatsApp CTA alongside contact form.
- Optimize font loading and minify CSS/JS.
- Add `aria-label` attributes to star ratings.
- Add `prefers-reduced-motion` CSS media query.

---

## 9. Project Rules

- **Preserve before enhancing:** V1 content must be documented before any V2 changes are made.
- **Documentation before implementation:** All changes must be documented before code is written.
- **Small implementation phases:** Work is broken into small, verifiable sprints.
- **Documentation ID Standard:** Every documented section has a unique ID (HOME-001, DESIGN-001, etc.).
- **Never overwrite verified V1 content:** All original V1 content must remain accessible in the documentation.

---

## 10. Current Milestones

| Milestone | Date | Status |
| :--- | :--- | :--- |
| Phase 1 Complete | 2026-07-22 | ✅ Achieved |
| Phase 2 Complete (Baseline) | 2026-07-23 | ✅ Achieved |
| Phase 3 Documentation Complete | 2026-07-24 | ✅ Achieved |

---

## 11. Next Milestones

| Milestone | Target Date | Status |
| :--- | :--- | :--- |
| Content Lock (replace all placeholders) | *[TBD]* | ⏸️ Pending |
| Feature Complete (contact form, internal pages) | *[TBD]* | ⏸️ Pending |
| Final QA Sign-off | *[TBD]* | ⏸️ Pending |
| Production Launch | *[TBD]* | ⏸️ Pending |

---

## 12. Important Links

- **GitHub repository:** *[Not yet configured]*
- **GitHub Pages website:** *[Not yet configured]*
- **Original Monoswiss website:** https://monoswiss.com

---

## 13. Session Recovery Instructions

To continue this project in any future AI session:

1. Read `PROJECT_CONTEXT.md` first — this file provides the full current state.
2. Read `HOMEPAGE_PRESERVATION_REPORT.md` — this is the official blueprint for the homepage rebuild.
3. Read `PROJECT_MASTER_PLAN.md` — this contains the Documentation ID Standard and phase status.
4. Read `CHANGELOG.md` — start from the latest entry to understand what was last completed.
5. Check `CONTENT_MIGRATION_TRACKER.md` for pending tasks.
6. Check `IMPLEMENTATION_TRACKER.md` for development tasks (if created).
7. Continue from the latest `CHANGELOG.md` entry.
