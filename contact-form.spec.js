const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8083';

const TURNSTILE_INIT_SCRIPT = `
  window.turnstile = {
    render: function(container, options) {
      if (container) {
        container.innerHTML = '<input type="hidden" name="cf-turnstile-response" value="test-token-123">';
      }
      return 'mock-widget-id-1';
    },
    getResponse: function(widgetId) {
      return 'test-token-123';
    },
    reset: function(widgetId) {}
  };
`;

async function setupMocks(page) {
  // Pre-initialize turnstile via addInitScript so it exists before app scripts run
  await page.addInitScript(TURNSTILE_INIT_SCRIPT);

  // Default: mock successful POST to worker
  await page.route('**/*', async (route) => {
    const request = route.request();
    if (request.method() === 'POST') {
      const data = request.postDataJSON();
      if (data && data['cf-turnstile-response']) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            message: "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
          }),
        });
        return;
      }
    }
    await route.continue();
  });
}

test.describe('Checkpoint 11 — Contact Form Frontend', () => {

  test('Contact form is visible and has all required fields', async ({ page }) => {
    await setupMocks(page);
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#projectType')).toBeVisible();
    await expect(page.locator('#submit-button')).toBeVisible();
  });

  test('Submits valid form and shows success message', async ({ page }) => {
    await setupMocks(page);
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.selectOption('#projectType', 'Website & E-Commerce');
    await page.fill('#message', 'This is a test message that is long enough to pass the minimum length validation.');

    await page.click('#submit-button');

    await expect(page.locator('#form-response')).toHaveClass(/success/, { timeout: 10000 });
    await expect(page.locator('#form-response')).toContainText('Thank you');
  });

  test('Client-side validation prevents submission with invalid email', async ({ page }) => {
    await setupMocks(page);
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#name', 'Jane Smith');
    await page.fill('#email', 'not-an-email');
    await page.selectOption('#projectType', 'Mobile App (Flutter / React Native)');
    await page.fill('#message', 'Another valid test message that meets the minimum length requirement.');

    await page.click('#submit-button');

    await expect(page.locator('#email-error')).toContainText('valid email');
  });

  test('Client-side validation prevents empty required fields', async ({ page }) => {
    await setupMocks(page);
    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await page.click('#submit-button');

    await expect(page.locator('#name-error')).toContainText('required');
    await expect(page.locator('#email-error')).toContainText('required');
    await expect(page.locator('#message-error')).toContainText('required');
    await expect(page.locator('#projectType-error')).toContainText('required');
  });

  test('Fetch payload structure matches backend contract', async ({ page }) => {
    let capturedPayload = null;

    await setupMocks(page);

    await page.route('**/*', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        capturedPayload = request.postDataJSON();
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, message: 'OK' }),
        });
        return;
      }
      await route.continue();
    });

    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#name', 'Payload Test');
    await page.fill('#email', 'payload@test.com');
    await page.selectOption('#projectType', 'POS & Agent Banking');
    await page.selectOption('#budgetRange', '₦1,000,000 – ₦3,000,000');
    await page.fill('#message', 'This message tests the exact JSON payload sent to the worker.');

    await page.click('#submit-button');
    await expect(page.locator('#form-response')).toHaveClass(/success/, { timeout: 10000 });

    expect(capturedPayload).toBeTruthy();
    expect(capturedPayload.name).toBe('Payload Test');
    expect(capturedPayload.email).toBe('payload@test.com');
    expect(capturedPayload.projectType).toBe('POS & Agent Banking');
    expect(capturedPayload.budgetRange).toBe('₦1,000,000 – ₦3,000,000');
    expect(capturedPayload.message).toContain('tests the exact JSON payload');
    expect(capturedPayload['cf-turnstile-response']).toBeDefined();
  });

  test('Shows error message on mocked server error', async ({ page }) => {
    await setupMocks(page);

    await page.route('**/*', async (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'EMAIL_FAILED',
            message: 'Failed to send message. Please try again or contact us directly.',
          }),
        });
        return;
      }
      await route.continue();
    });

    await page.goto(`${BASE_URL}/contact.html`);
    await page.waitForLoadState('domcontentloaded');

    await page.fill('#name', 'Error Test');
    await page.fill('#email', 'error@test.com');
    await page.selectOption('#projectType', 'Other (please specify)');
    await page.fill('#message', 'This test triggers a server error response.');

    await page.click('#submit-button');

    await expect(page.locator('#form-response')).toHaveClass(/error/, { timeout: 10000 });
    await expect(page.locator('#form-response')).toContainText('Failed to send');
  });
});
