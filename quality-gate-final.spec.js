const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

test.describe('Sprint 1 Final Quality Gate', () => {

  const viewports = [
    { name: 'Desktop', width: 1280, height: 800 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
  ];

  for (const vp of viewports) {
    test(`${vp.name} - Complete Homepage Verification`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL);
      await page.waitForLoadState('networkidle');

      // Check for console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // --- 1. Header ---
      const header = page.locator('header.sticky-nav');
      await expect(header).toBeVisible();

      // Logo
      const logo = page.locator('.logo');
      await expect(logo).toBeVisible();

      // Nav links (desktop) or hamburger (mobile)
      if (vp.width >= 769) {
        const navLinks = page.locator('.nav-links');
        await expect(navLinks).toBeVisible();
        const links = page.locator('.nav-links a');
        await expect(links).toHaveCount(6);
      } else {
        const hamburger = page.locator('.mobile-nav-toggle');
        await expect(hamburger).toBeVisible();
      }

      // Header CTA button
      const headerCta = page.locator('.navbar .cta-button');
      await expect(headerCta).toBeVisible();
      const bgColor = await headerCta.evaluate(el => getComputedStyle(el).backgroundImage);
      expect(bgColor).toContain('gradient');
      await expect(headerCta).toHaveCSS('color', 'rgb(255, 255, 255)');

      // --- 2. Hero Section ---
      const hero = page.locator('#home.hero');
      await expect(hero).toBeVisible();

      // Hero content visible immediately (no opacity: 0 delay)
      const heroContent = page.locator('.hero-content');
      await expect(heroContent).toBeVisible();
      const contentOpacity = await heroContent.evaluate(el => getComputedStyle(el).opacity);
      expect(contentOpacity).toBe('1');

      // Hero title
      const heroTitle = page.locator('.hero-title');
      await expect(heroTitle).toBeVisible();
      await expect(heroTitle).toContainText('software that grows businesses');
      await expect(heroTitle).toContainText('fintech in the South-South');

      // Hero subtitle
      const heroSubtitle = page.locator('.hero-subtitle');
      await expect(heroSubtitle).toBeVisible();
      await expect(heroSubtitle).toContainText('Port Harcourt');

      // Hero CTA buttons
      const heroCtaPrimary = page.locator('.cta-button-primary');
      await expect(heroCtaPrimary).toBeVisible();

      // --- 3. Statistics / Trust Section ---
      const heroStats = page.locator('.hero-stats');
      await expect(heroStats).toBeVisible();
      const statItems = page.locator('.hero-stats .stat-item');
      await expect(statItems).toHaveCount(4);

      // Verify V1 trust indicators
      const statLabels = page.locator('.hero-stats .stat-label');
      const labels = await statLabels.allTextContents();
      expect(labels).toContain('Based & on-ground');
      expect(labels).toContain('Fintech verticals');
      expect(labels).toContain('Transparent naira pricing');
      expect(labels).toContain('Compliance-ready builds');

      // --- 4. Services Section ---
      const servicesSection = page.locator('#why-monoswiss');
      await expect(servicesSection).toBeVisible();

      const servicesTitle = page.locator('#why-monoswiss .section-title');
      await expect(servicesTitle).toHaveText('What We Build');

      const serviceCards = page.locator('#why-monoswiss .service-card');
      await expect(serviceCards).toHaveCount(6);

      const serviceTitles = page.locator('#why-monoswiss .service-card h3');
      const titles = await serviceTitles.allTextContents();
      expect(titles).toContain('POS & Agent Banking Apps');
      expect(titles).toContain('Gift Card & Crypto Platforms');
      expect(titles).toContain('VTU & Bill Payment Platforms');
      expect(titles).toContain('Mobile Apps');
      expect(titles).toContain('Websites & E-Commerce');
      expect(titles).toContain('Loan Apps & Lending Software');

      // Links should not be #
      const serviceLinks = page.locator('#why-monoswiss .learn-more');
      const hrefs = await serviceLinks.evaluateAll(els => els.map(el => el.getAttribute('href')));
      for (const href of hrefs) {
        expect(href).not.toBe('#');
      }

      // --- 5. Featured Projects Section ---
      const projectsSection = page.locator('#projects');
      await expect(projectsSection).toBeVisible();

      const projectCards = page.locator('#projects .project-card');
      await expect(projectCards).toHaveCount(3);

      const projectTitles = page.locator('#projects .project-card h3');
      const pTitles = await projectTitles.allTextContents();
      expect(pTitles).toContain('FinTech Banking Platform');
      expect(pTitles).toContain('POS & Agent Banking Apps');
      expect(pTitles).toContain('Gift Card & Crypto Platforms');

      // --- 6. Testimonials / Why Monoswiss Section ---
      const testimonialsSection = page.locator('#testimonials');
      await expect(testimonialsSection).toBeVisible();

      const testimonialsTitle = page.locator('#testimonials .section-title');
      await expect(testimonialsTitle).toHaveText('Why Monoswiss');

      const trustCards = page.locator('#testimonials .testimonial-card');
      await expect(trustCards).toHaveCount(3);

      // Verify no fictional content
      const testimonialsContent = await page.textContent('#testimonials');
      expect(testimonialsContent).not.toContain('Michael A');
      expect(testimonialsContent).not.toContain('Sarah O');
      expect(testimonialsContent).not.toContain('David K');
      expect(testimonialsContent).not.toContain('★★★★★');

      // --- 7. Contact Section ---
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeVisible();

      const contactTitle = page.locator('#contact .section-title');
      await expect(contactTitle).toHaveText("Have a platform idea? Let's price it today.");

      // WhatsApp and email links
      const whatsappLink = page.locator('#contact a[href^="https://wa.me"]');
      await expect(whatsappLink).toBeVisible();

      const emailLink = page.locator('#contact a[href^="mailto:"]');
      await expect(emailLink).toBeVisible();

      // Contact info
      const contactInfo = page.locator('#contact .company-details-card');
      await expect(contactInfo).toContainText('hello@monoswiss.com');
      await expect(contactInfo).toContainText('+234 907 789 5271');
      await expect(contactInfo).toContainText('Port Harcourt, Rivers State');

      // --- 8. Footer Section ---
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Footer logo with bold "swiss"
      const footerLogo = page.locator('.footer-logo');
      await expect(footerLogo).toContainText('Monoswiss');

      // Footer links
      const footerLinks = page.locator('.footer-links a');
      await expect(footerLinks).toHaveCount(4);

      // Social/contact links
      const socialLinks = page.locator('.footer-social a');
      await expect(socialLinks).toHaveCount(4);

      // Copyright with location
      const footerBottom = page.locator('.footer-bottom');
      await expect(footerBottom).toContainText('Port Harcourt · Rivers State · Serving Bayelsa & the South-South');

      // --- 9. Responsive layout ---
      // Check no horizontal overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      expect(bodyWidth).toBeLessThanOrEqual(vp.width + 20); // small tolerance

      // --- 10. No console errors from Sprint 1 changes ---
      // (console errors from external resources like placehold.co are expected)
      // We only flag JavaScript runtime errors
      const jsErrors = consoleErrors.filter(e => !e.includes('placehold.co') && !e.includes('favicon') && !e.includes('fonts.googleapis.com'));
      expect(jsErrors).toHaveLength(0);

      await page.screenshot({ path: `quality-gate-${vp.name.toLowerCase()}.png` });
    });
  }
});