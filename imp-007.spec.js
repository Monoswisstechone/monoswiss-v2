const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

test.describe('IMP-007 Testimonials Section Verification', () => {

  test('Desktop - Testimonials section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Section title changed to "Why Monoswiss"
    const sectionTitle = page.locator('#testimonials .section-title');
    await expect(sectionTitle).toHaveText('Why Monoswiss');

    // Subtitle updated
    const subtitle = page.locator('#testimonials .section-subtitle');
    await expect(subtitle).toContainText('Port Harcourt');

    // 3 trust cards present (replacing 3 fictional testimonials)
    const trustCards = page.locator('#testimonials .testimonial-card');
    await expect(trustCards).toHaveCount(3);

    // Verify V1 trust signal titles
    const cardTitles = page.locator('#testimonials .testimonial-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain("We're local");
    expect(titles).toContain('Compliance designed in');
    expect(titles).toContain('Transparent naira pricing');

    // Trust metrics section below
    const trustMetrics = page.locator('#testimonials .trust-metrics');
    await expect(trustMetrics).toBeVisible();

    // Verify no fictional testimonials remain
    const pageContent = await page.textContent('#testimonials');
    expect(pageContent).not.toContain('Michael A');
    expect(pageContent).not.toContain('Sarah O');
    expect(pageContent).not.toContain('David K');

    await page.screenshot({ path: 'imp-007-desktop.png' });
  });

  test('Tablet - Testimonials section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const sectionTitle = page.locator('#testimonials .section-title');
    await expect(sectionTitle).toHaveText('Why Monoswiss');

    const trustCards = page.locator('#testimonials .testimonial-card');
    await expect(trustCards).toHaveCount(3);

    const cardTitles = page.locator('#testimonials .testimonial-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain("We're local");

    await page.screenshot({ path: 'imp-007-tablet.png' });
  });

  test('Mobile - Testimonials section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const sectionTitle = page.locator('#testimonials .section-title');
    await expect(sectionTitle).toHaveText('Why Monoswiss');

    const trustCards = page.locator('#testimonials .testimonial-card');
    await expect(trustCards).toHaveCount(3);

    const cardTitles = page.locator('#testimonials .testimonial-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain("We're local");

    await page.screenshot({ path: 'imp-007-mobile.png' });
  });
});