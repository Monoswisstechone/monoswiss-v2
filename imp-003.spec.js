const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('IMP-003 Hero Animation Verification', () => {

  test('Desktop - Hero loads instantly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const heroContent = page.locator('.hero-content');
    const heroDashboard = page.locator('.hero-dashboard');
    const heroTitle = page.locator('.hero-title');
    const heroSubtitle = page.locator('.hero-subtitle');

    await expect(heroContent).toBeVisible();
    await expect(heroDashboard).toBeVisible();
    await expect(heroTitle).toBeVisible();
    await expect(heroSubtitle).toBeVisible();

    // Verify no opacity animation delay hiding content
    const contentOpacity = await heroContent.evaluate(el => getComputedStyle(el).opacity);
    const dashboardOpacity = await heroDashboard.evaluate(el => getComputedStyle(el).opacity);

    expect(contentOpacity).toBe('1');
    expect(dashboardOpacity).toBe('1');

    await page.screenshot({ path: 'imp-003-desktop.png' });
  });

  test('Tablet - Hero loads instantly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const heroContent = page.locator('.hero-content');
    const heroDashboard = page.locator('.hero-dashboard');

    await expect(heroContent).toBeVisible();
    await expect(heroDashboard).toBeVisible();

    const contentOpacity = await heroContent.evaluate(el => getComputedStyle(el).opacity);
    const dashboardOpacity = await heroDashboard.evaluate(el => getComputedStyle(el).opacity);

    expect(contentOpacity).toBe('1');
    expect(dashboardOpacity).toBe('1');

    await page.screenshot({ path: 'imp-003-tablet.png' });
  });

  test('Mobile - Hero loads instantly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const heroContent = page.locator('.hero-content');
    const heroDashboard = page.locator('.hero-dashboard');

    await expect(heroContent).toBeVisible();
    await expect(heroDashboard).toBeVisible();

    const contentOpacity = await heroContent.evaluate(el => getComputedStyle(el).opacity);
    const dashboardOpacity = await heroDashboard.evaluate(el => getComputedStyle(el).opacity);

    expect(contentOpacity).toBe('1');
    expect(dashboardOpacity).toBe('1');

    await page.screenshot({ path: 'imp-003-mobile.png' });
  });
});
