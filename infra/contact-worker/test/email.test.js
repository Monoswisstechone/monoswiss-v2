import { describe, it, expect, vi } from 'vitest';
import { buildContactEmailPayload, sendEmail } from '../src/email';

const validData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+2349077895271',
  projectType: 'POS & Agent Banking',
  budgetRange: '₦1,000,000 – ₦3,000,000',
  message: 'Hello<br>World',
  clientIp: '192.168.1.1'
};

const validConfig = {
  resendApiKey: 're_test_key',
  fromEmail: 'contact@monoswiss.com',
  toEmail: 'hello@monoswiss.com'
};

describe('buildContactEmailPayload', () => {
  it('should build a valid email payload', () => {
    const payload = buildContactEmailPayload(validData, validConfig);

    expect(payload.from).toBe('contact@monoswiss.com');
    expect(payload.to).toEqual(['hello@monoswiss.com']);
    expect(payload.replyTo).toBe('john@example.com');
    expect(payload.subject).toContain('POS & Agent Banking');
    expect(payload.html).toBeDefined();
    expect(payload.html).toContain('John Doe');
    expect(payload.html).toContain('Hello<br>World');
  });

  it('should include phone in HTML when provided', () => {
    const payload = buildContactEmailPayload(validData, validConfig);
    expect(payload.html).toContain('+2349077895271');
  });

  it('should not include phone section when not provided', () => {
    const { phone, ...noPhone } = validData;
    const payload = buildContactEmailPayload(noPhone, validConfig);
    expect(payload.html).not.toContain('Phone:');
  });

  it('should not include budget section when not provided', () => {
    const { budgetRange, ...noBudget } = validData;
    const payload = buildContactEmailPayload(noBudget, validConfig);
    expect(payload.html).not.toContain('Budget');
  });

  it('should create generic subject when projectType is missing', () => {
    const { projectType, ...noType } = validData;
    const payload = buildContactEmailPayload(noType, validConfig);
    expect(payload.subject).toContain('New Contact Form Inquiry');
  });
});

describe('sendEmail', () => {
  it('should return error when API key is missing', async () => {
    const result = await sendEmail({}, {});
    expect(result.success).toBe(false);
    expect(result.message).toContain('API key');
  });

  it('should return error when payload is invalid', async () => {
    const result = await sendEmail(null, validConfig);
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid');
  });

  it('should return success on successful API call', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 'email_123' })
    });

    const payload = buildContactEmailPayload(validData, validConfig);
    const result = await sendEmail(payload, validConfig);
    expect(result.success).toBe(true);
    expect(result.id).toBe('email_123');
    vi.restoreAllMocks();
  });

  it('should return error on API failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 422,
      json: async () => ({})
    });

    const payload = buildContactEmailPayload(validData, validConfig);
    const result = await sendEmail(payload, validConfig);
    expect(result.success).toBe(false);
    expect(result.message).toContain('422');
    vi.restoreAllMocks();
  });

  it('should return error on network failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));

    const payload = buildContactEmailPayload(validData, validConfig);
    const result = await sendEmail(payload, validConfig);
    expect(result.success).toBe(false);
    expect(result.message).toContain('Network');
    vi.restoreAllMocks();
  });
});
