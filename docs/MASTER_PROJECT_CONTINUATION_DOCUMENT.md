
# MASTER PROJECT CONTINUATION DOCUMENT

## 1. Project Mission and Objective
The project's mission is to modernize the Monoswiss V2 website's UI by implementing a new design system inspired by modern fintech companies like Monzo and Wise. The objective is to enhance the visual appeal, usability, and accessibility of the site while preserving all existing content and core HTML structure.

## 2. Project Design Endpoint
The primary design reference and target is a Figma project that contains the full component library, brand guidelines, and page mockups for the new design. All UI enhancements should be based on this endpoint.

## 3. Reference Priority
1.  **Live Monoswiss Website:** The canonical source for content and functionality.
2.  **Current Monoswiss V2 Deployment:** The baseline for the current UI enhancement work.
3.  **Monzo:** Inspiration for modern, clean, and user-friendly design patterns.
4.  **Wise:** Inspiration for clear, trustworthy financial interface design.

## 4. Project Constitution and Workflow
The project follows a strict checkpoint-based workflow to ensure bounded, reviewable increments.
-   Work is approved checkpoint-by-checkpoint.
-   Each checkpoint begins with a plan and ends with a verification report and a stop for approval.
-   No work should be committed or pushed until the user explicitly asks.

## 5. Repository Rules
-   Preserve existing content.
-   Do not redesign entire sections.
-   Do not create new content.
-   Do not modify HTML unless explicitly approved.
-   Do not modify JavaScript, images, documentation, or infrastructure (`infra/contact-worker/`).
-   Keep changes limited to the current checkpoint's approved scope.

## 6. Git Rules
-   All work should be done on a feature branch, not `main`.
-   Commit messages must be clear and descriptive.
-   Do not push changes to the remote repository without explicit approval.

## 7. Testing Rules
-   All changes must be validated against the Playwright test suite.
-   Any new test failures must be treated as regressions and fixed.
-   Pre-existing baseline failures are known and should be reported as such, not as regressions from new work.

## 8. Current Repository State
The repository is on the `main` branch. The `css/style.css` file intentionally contains the approved, completed work from Checkpoints 1–4. It remains modified in the working directory; nothing has been staged, committed, or pushed. This modified state is expected and ready for Checkpoint 5.

## 9. Completed Checkpoints (1–4)
-   **Checkpoint 1: Foundation (CSS Custom Properties):** Established core design tokens (colors, fonts, spacing) as CSS custom properties in the `:root` selector of `css/style.css`.
-   **Checkpoint 2: Header & Navigation:** Updated styling for the `.sticky-nav`, `.navbar`, `.logo`, and `.nav-links` components.
-   **Checkpoint 3: Hero Section:** Styled the homepage hero with `.hero`, `.hero-title`, `.hero-badge`, and `.hero-dashboard` container/floating elements.
-   **Checkpoint 4: Services Section:** Applied new styling to the "Why Monoswiss" section using the `.services-grid` and `.service-card` components.

## 10. Current Checkpoint Status (Checkpoint 5)
Checkpoint 5 is planned but **not yet started**. The plan is to perform "Contact Section Refinement," which focuses on styling the `#contact` section and its associated `.contact-form-wrapper`, `.contact-grid`, and `.info-card` components. Implementation is currently paused pending approval of this document.

## 11. Known Baseline Playwright Failures
Four Playwright tests are known to fail on the `main` branch due to a mismatch between the test suite and the current HTML. These are **not regressions** and are out of scope. These issues are documented in `known-baseline-playwright-issues.md`.
1.  `imp-003.spec.js`: Expects `.hero-dashboard`, which does not exist.
2.  `imp-005.spec.js`: Expects 6 `.service-card` elements, but there are 10.
3.  `imp-006.spec.js`: Expects a `#projects` section, which does not exist.
4.  `imp-007.spec.js` & `imp-008.spec.js`: Expect 3 `.testimonial-card` elements, but there are zero.

## 12. Files That May Be Modified
-   `css/style.css`: The primary file for all UI styling changes.

## 13. Files That Must Never Be Modified Without Approval
-   Any HTML files (e.g., `index.html`, `services.html`).
-   Any JavaScript files.
-   Any image assets.
-   Any files in `docs/`.
-   Any files in `infra/contact-worker/`.
-   The Playwright test suite files.

## 14. Remaining Roadmap (Checkpoint 5 onward)
-   **Checkpoint 5:** Contact Section Refinement.
-   **Checkpoint 6:** Homepage Featured Projects Refinement (HOME-006)
-   **Checkpoint 7:** Style the homepage Testimonials section.
-   **Checkpoint 8:** Style the homepage Blog section.
-   **Checkpoint 9:** Style the global footer.
-   **Checkpoint 10:** Style the secondary service pages.
-   **Final Review:** Full site visual review and consistency check.

## 15. Success Criteria for the Finished Website
-   The website's UI fully matches the Figma design across all pages and components.
-   All existing content and functionality are preserved.
-   The site is fully responsive and accessible.
-   All Playwright tests pass (excluding the known baseline failures).
-   The final code is clean, well-documented, and uses the established CSS custom properties.

## 16. What has already been completed
-   **Checkpoints 1-4:**
    -   **Foundation:** Defined `:root` CSS variables for colors, fonts, spacing.
    -   **Header/Navigation:** Styled `.sticky-nav`, `.navbar`, `.logo`, `.nav-links`.
    -   **Hero Section:** Styled `.hero`, `.hero-title`, `.hero-dashboard`.
    -   **Services Section:** Styled `#why-monoswiss` using `.services-grid` and `.service-card`.
-   Establishment of the project constitution, workflow, and rules.
-   Identification of baseline Playwright test failures (see `known-baseline-playwright-issues.md`).
-   Planning for Checkpoint 5.

## 17. Next Immediate Action
Upon approval of this document, the next action is to **begin implementation of Checkpoint 5:** "Contact Section Refinement" as per the approved plan.
