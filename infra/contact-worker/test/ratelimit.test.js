import { describe, it, expect, vi } from 'vitest';
import { checkRateLimit } from '../src/ratelimit';

function createMockKV(initialData = {}) {
  const store = { ...initialData };

  return {
    get: vi.fn(async (key) => store[key] || null),
    put: vi.fn(async (key, value, options) => {
      store[key] = value;
    })
  };
}

describe('checkRateLimit', () => {
  it('should allow request when under all limits', async () => {
    const mockKV = createMockKV();
    const env = { RATE_LIMIT_KV: mockKV };

    const result = await checkRateLimit(env, '192.168.1.1');
    expect(result.allowed).toBe(true);
    expect(result.message).toContain('allowed');

    // Should have incremented counters for all windows
    expect(mockKV.put).toHaveBeenCalledTimes(3);
  });

  it('should block request when short window limit exceeded', async () => {
    // Pre-populate KV with a key that makes the 60s window at max
    // The bucket key depends on current time; set up the mock so that
    // the first call (short window) returns a high count that won't trigger,
    // but the second call (60s window) will exceed the limit.

    // We'll mock the KV get to return increasing counts
    const mockKV = {
      get: vi.fn()
        .mockResolvedValueOnce('0')   // 5s window: 0 (under limit of 1)
        .mockResolvedValueOnce('3')   // 60s window: 3 (at limit)
        .mockResolvedValueOnce('5'),  // 1h window: 5 (under limit of 10)
      put: vi.fn()
    };
    const env = { RATE_LIMIT_KV: mockKV };

    const result = await checkRateLimit(env, '192.168.1.1');
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBe(60);
    expect(result.message).toContain('Too many');
  });

  it('should block request when long window limit exceeded', async () => {
    const mockKV = {
      get: vi.fn()
        .mockResolvedValueOnce('0')    // 5s window: 0
        .mockResolvedValueOnce('2')    // 60s window: 2 (under limit of 3)
        .mockResolvedValueOnce('10'),  // 1h window: 10 (at limit)
      put: vi.fn()
    };
    const env = { RATE_LIMIT_KV: mockKV };

    const result = await checkRateLimit(env, '192.168.1.1');
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBe(3600);
  });

  it('should block request when minimum interval exceeded', async () => {
    const mockKV = {
      get: vi.fn()
        .mockResolvedValue('1'),  // All windows at max
      put: vi.fn()
    };
    const env = { RATE_LIMIT_KV: mockKV };

    const result = await checkRateLimit(env, '192.168.1.1');
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBe(5);
  });

  it('should return error when IP is missing', async () => {
    const mockKV = createMockKV();
    const env = { RATE_LIMIT_KV: mockKV };

    const result = await checkRateLimit(env, null);
    expect(result.allowed).toBe(false);
    expect(result.message).toContain('IP');
  });

  it('should allow when KV is not configured', async () => {
    const env = {};
    const result = await checkRateLimit(env, '192.168.1.1');
    expect(result.allowed).toBe(true);
    expect(result.message).toContain('unavailable');
  });
});
