const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('IMP-001 Quality Gate', () => {

  test('Desktop Header', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(500); // Wait for animations
    const ctaButton = page.locator('.navbar .cta-button');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)'); // Gradient
    await expect(ctaButton).toHaveCSS('color', 'rgb(255, 255, 255)');
    await page.screenshot({ path: 'quality-gate-desktop.png' });
  });

  test('Tablet Layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(500);
    const mobileNavToggle = page.locator('.mobile-nav-toggle');
    await expect(mobileNavToggle).toBeVisible();
    await page.screenshot({ path: 'quality-gate-tablet.png' });
  });

  test('Mobile Layout & Menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForTimeout(500);

    // Open menu
    const mobileNavToggle = page.locator('.mobile-nav-toggle');
    await mobileNavToggle.click();
    await page.waitForSelector('.mobile-nav-open');
    await page.waitForTimeout(300); // For transition

    const ctaButton = page.locator('.mobile-nav-open .cta-button');
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(ctaButton).toHaveCSS('color', 'rgb(255, 255, 255)');
    await page.screenshot({ path: 'quality-gate-mobile-open.png' });

    // Close menu
    await mobileNavToggle.click();
    await page.waitForSelector('.mobile-nav-open', { state: 'hidden' });
    await page.screenshot({ path: 'quality-gate-mobile-closed.png' });
  });
});
