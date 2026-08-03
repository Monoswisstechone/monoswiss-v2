import { describe, it, expect, vi } from 'vitest';
import worker from '../src/index';

// Helper to create mock Request objects
function createMockRequest(method, body = null, headers = {}) {
  return new Request('https://example.com/api/contact', {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://monoswisstechone.github.io',
      'CF-Connecting-IP': '127.0.0.1',
      ...headers
    },
    body: body ? JSON.stringify(body) : null
  });
}

const validFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+2349077895271',
  projectType: 'POS & Agent Banking',
  budgetRange: '₦1,000,000 – ₦3,000,000',
  message: 'I would like to discuss a new project for my business in Port Harcourt.'
};

function createMockEnv() {
  return {
    RATE_LIMIT_KV: {
      get: vi.fn().mockResolvedValue('0'),
      put: vi.fn()
    },
    TURNSTILE_SECRET_KEY: 'test-secret',
    RESEND_API_KEY: 'test-resend-key',
    CONTACT_EMAIL_FROM: 'contact@monoswiss.com',
    CONTACT_EMAIL_TO: 'hello@monoswiss.com',
    ALLOWED_ORIGINS: 'https://monoswisstechone.github.io'
  };
}

describe('Worker router', () => {
  describe('CORS', () => {
    it('should handle preflight OPTIONS request', async () => {
      const request = createMockRequest('OPTIONS', null, {
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'content-type'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://monoswisstechone.github.io');
    });

    it('should include CORS headers on POST response', async () => {
      // Mock Turnstile and email to succeed
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, id: 'email_123' })
      });

      const request = createMockRequest('POST', {
        ...validFormData,
        'cf-turnstile-response': 'valid-turnstile-token'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('https://monoswisstechone.github.io');
      vi.restoreAllMocks();
    });
  });

  describe('HTTP method handling', () => {
    it('should return 405 for unsupported methods', async () => {
      const request = new Request('https://example.com/api/contact', { method: 'DELETE' });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(405);
    });

    it('should return 200 for valid POST', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, id: 'email_123' })
      });

      const request = createMockRequest('POST', {
        ...validFormData,
        'cf-turnstile-response': 'valid-turnstile-token'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      vi.restoreAllMocks();
    });
  });

  describe('error handling', () => {
    it('should return 400 for malformed JSON', async () => {
      const request = new Request('https://example.com/api/contact', {
        method: 'POST',
        body: 'not-json',
        headers: {
          'Content-Type': 'application/json',
          'CF-Connecting-IP': '127.0.0.1'
        }
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
    });

    it('should return 400 for validation errors', async () => {
      vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ success: true })
      });

      const request = createMockRequest('POST', {
        name: 'J',
        email: 'invalid',
        projectType: 'Invalid',
        message: 'short',
        'cf-turnstile-response': 'valid-token'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.error).toBe('VALIDATION_ERROR');
      expect(body.errors).toBeDefined();
      vi.restoreAllMocks();
    });

    it('should return 500 when email sending fails', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) }) // Turnstile OK
        .mockResolvedValueOnce({ ok: false, json: async () => ({}) }); // Resend fails

      const request = createMockRequest('POST', {
        ...validFormData,
        'cf-turnstile-response': 'valid-token'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.error).toBe('EMAIL_FAILED');
      vi.restoreAllMocks();
    });
  });

  describe('success responses', () => {
    it('should return success message on valid submission', async () => {
      vi.spyOn(globalThis, 'fetch')
        .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) }) // Turnstile
        .mockResolvedValueOnce({ ok: true, json: async () => ({ id: 'email_123' }) }); // Resend

      const request = createMockRequest('POST', {
        ...validFormData,
        'cf-turnstile-response': 'valid-token'
      });
      const env = createMockEnv();
      const response = await worker.fetch(request, env);
      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.message).toContain('Thank you');
      vi.restoreAllMocks();
    });
  });
});
