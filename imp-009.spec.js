const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

test.describe('IMP-009 Footer Verification', () => {

  test('Desktop - Footer renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Footer logo branding
    const footerLogo = page.locator('.footer-logo');
    await expect(footerLogo).toContainText('Monoswiss');

    // Verify V1 email and WhatsApp links
    const emailLink = page.locator('footer a[href="mailto:hello@monoswiss.com"]');
    await expect(emailLink).toBeVisible();

    const whatsappLink = page.locator('footer a[href^="https://wa.me"]');
    await expect(whatsappLink).toBeVisible();

    // Verify address/location
    const footerBottom = page.locator('.footer-bottom');
    await expect(footerBottom).toContainText('Port Harcourt · Rivers State · Serving Bayelsa & the South-South');

    await page.screenshot({ path: 'imp-009-desktop.png' });
  });

  test('Tablet - Footer renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const footerBottom = page.locator('.footer-bottom');
    await expect(footerBottom).toBeVisible();

    await page.screenshot({ path: 'imp-009-tablet.png' });
  });

  test('Mobile - Footer renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const footerBottom = page.locator('.footer-bottom');
    await expect(footerBottom).toBeVisible();

    await page.screenshot({ path: 'imp-009-mobile.png' });
  });
});
