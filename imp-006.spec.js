const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

test.describe('IMP-006 Featured Projects Verification', () => {

  test('Desktop - Projects section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check section title
    const sectionTitle = page.locator('#projects .section-title');
    await expect(sectionTitle).toHaveText('Featured Projects');

    // Check 3 project cards present
    const projectCards = page.locator('#projects .project-card');
    await expect(projectCards).toHaveCount(3);

    // Verify documented project names are present
    const cardTitles = page.locator('#projects .project-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('FinTech Banking Platform');
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Gift Card & Crypto Platforms');

    // Verify project descriptions are present (not just empty cards)
    const descriptions = page.locator('#projects .project-details p');
    const descCount = await descriptions.count();
    expect(descCount).toBe(3);

    // Verify tech badges present
    const techBadges = page.locator('#projects .tech-badges');
    await expect(techBadges).toHaveCount(3);

    // Verify case study links exist
    const caseStudyLinks = page.locator('#projects .case-study-link');
    await expect(caseStudyLinks).toHaveCount(3);

    // Verify no placeholder # links on fintech-specific cards
    const posLink = page.locator('#projects a[href="pos-software-development-port-harcourt.html"]');
    await expect(posLink).toBeVisible();

    const cryptoLink = page.locator('#projects a[href="fintech-app-developers-port-harcourt.html"]');
    await expect(cryptoLink).toBeVisible();

    await page.screenshot({ path: 'imp-006-desktop.png' });
  });

  test('Tablet - Projects section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const projectCards = page.locator('#projects .project-card');
    await expect(projectCards).toHaveCount(3);

    const cardTitles = page.locator('#projects .project-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('FinTech Banking Platform');
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Gift Card & Crypto Platforms');

    await page.screenshot({ path: 'imp-006-tablet.png' });
  });

  test('Mobile - Projects section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const projectCards = page.locator('#projects .project-card');
    await expect(projectCards).toHaveCount(3);

    const cardTitles = page.locator('#projects .project-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('FinTech Banking Platform');
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Gift Card & Crypto Platforms');

    await page.screenshot({ path: 'imp-006-mobile.png' });
  });
});