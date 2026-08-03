import { describe, it, expect, vi } from 'vitest';
import { verifyTurnstile } from '../src/turnstile';

describe('verifyTurnstile', () => {
  it('should return failure when token is missing', async () => {
    const result = await verifyTurnstile(null, '127.0.0.1', 'test-secret');
    expect(result.success).toBe(false);
    expect(result.message).toContain('missing');
  });

  it('should return failure when secret key is missing', async () => {
    const result = await verifyTurnstile('valid-token', '127.0.0.1', null);
    expect(result.success).toBe(false);
    expect(result.message).toContain('secret key');
  });

  it('should return failure when token is non-string', async () => {
    const result = await verifyTurnstile(12345, '127.0.0.1', 'test-secret');
    expect(result.success).toBe(false);
    expect(result.message).toContain('missing');
  });

  it('should handle network error gracefully', async () => {
    // Simulate fetch failure
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network error'));
    const result = await verifyTurnstile('some-token', '127.0.0.1', 'test-secret');
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('network-error');
    vi.restoreAllMocks();
  });

  it('should handle non-200 response from Turnstile API', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 503,
    });
    const result = await verifyTurnstile('some-token', '127.0.0.1', 'test-secret');
    expect(result.success).toBe(false);
    expect(result.errorCodes).toContain('http-503');
    vi.restoreAllMocks();
  });

  it('should return success when Turnstile verification passes', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    const result = await verifyTurnstile('valid-token', '127.0.0.1', 'test-secret');
    expect(result.success).toBe(true);
    expect(result.message).toContain('passed');
    vi.restoreAllMocks();
  });

  it('should return failure when Turnstile verification fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: false, 'error-codes': ['invalid-input-response'] }),
    });
    const result = await verifyTurnstile('invalid-token', '127.0.0.1', 'test-secret');
    expect(result.success).toBe(false);
    expect(result.message).toContain('failed');
    vi.restoreAllMocks();
  });
});
