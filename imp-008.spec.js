const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

test.describe('IMP-008 Testimonials Section Verification (Post-IMP-007)', () => {

  test('Desktop - V2 fictional testimonials are gone', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Section title should be "Why Monoswiss" now, not "Trusted by Businesses"
    const sectionTitle = page.locator('#testimonials .section-title');
    await expect(sectionTitle).toHaveText('Why Monoswiss');

    // Verify V1 trust signals are present (confirming testimonials are gone)
    const cardTitles = page.locator('#testimonials .testimonial-card h3');
    await expect(cardTitles).toHaveCount(3);
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain("We're local");

    // Explicitly verify no fictional content remains
    const pageContent = await page.textContent('#testimonials');
    expect(pageContent).not.toContain('Michael A');
    expect(pageContent).not.toContain('Sarah O');
    expect(pageContent).not.toContain('David K');
    expect(pageContent).not.toContain('★★★★★');

    await page.screenshot({ path: 'imp-008-desktop-final.png' });
  });

  test('Tablet - V2 fictional testimonials are gone', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const pageContent = await page.textContent('#testimonials');
    expect(pageContent).not.toContain('Michael A');
    expect(pageContent).not.toContain('★★★★★');

    await page.screenshot({ path: 'imp-008-tablet-final.png' });
  });

  test('Mobile - V2 fictional testimonials are gone', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const pageContent = await page.textContent('#testimonials');
    expect(pageContent).not.toContain('Michael A');
    expect(pageContent).not.toContain('★★★★★');

    await page.screenshot({ path: 'imp-008-mobile-final.png' });
  });
});
