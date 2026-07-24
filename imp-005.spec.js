const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('IMP-005 Services Section Verification', () => {

  test('Desktop - Services section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check section title updated
    const sectionTitle = page.locator('#why-monoswiss .section-title');
    await expect(sectionTitle).toHaveText('What We Build');

    // Check subtitle updated
    const sectionSubtitle = page.locator('#why-monoswiss .section-subtitle');
    await expect(sectionSubtitle).toContainText('Port Harcourt');

    // Check all 6 service cards present
    const serviceCards = page.locator('#why-monoswiss .service-card');
    await expect(serviceCards).toHaveCount(6);

    // Verify V1 service names are present
    const cardTitles = page.locator('#why-monoswiss .service-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Gift Card & Crypto Platforms');
    expect(titles).toContain('VTU & Bill Payment Platforms');
    expect(titles).toContain('Mobile Apps');
    expect(titles).toContain('Websites & E-Commerce');
    expect(titles).toContain('Loan Apps & Lending Software');

    // Verify links updated (not placeholder #)
    const links = page.locator('#why-monoswiss .learn-more');
    const hrefs = await links.evaluateAll(els => els.map(el => el.getAttribute('href')));
    expect(hrefs).not.toContain('#');

    await page.screenshot({ path: 'imp-005-desktop.png' });
  });

  test('Tablet - Services section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const serviceCards = page.locator('#why-monoswiss .service-card');
    await expect(serviceCards).toHaveCount(6);

    const cardTitles = page.locator('#why-monoswiss .service-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Loan Apps & Lending Software');

    await page.screenshot({ path: 'imp-005-tablet.png' });
  });

  test('Mobile - Services section renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    const serviceCards = page.locator('#why-monoswiss .service-card');
    await expect(serviceCards).toHaveCount(6);

    const cardTitles = page.locator('#why-monoswiss .service-card h3');
    const titles = await cardTitles.allTextContents();
    expect(titles).toContain('POS & Agent Banking Apps');
    expect(titles).toContain('Loan Apps & Lending Software');

    await page.screenshot({ path: 'imp-005-mobile.png' });
  });
});