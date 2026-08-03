/**
 * KV-based rate limiting for the Monoswiss contact form.
 *
 * Tracks submission frequency per IP address using Workers KV.
 * Returns whether the request is allowed or should be rejected.
 *
 * Limits:
 *   - 3 submissions per 60 seconds
 *   - 10 submissions per 1 hour
 *   - 1 submission per 5 seconds (minimum interval)
 *
 * KV Key design: ratelimit:{ip}:{window_timestamp_bucket}
 * KV TTL: auto-expire after window + 60s
 */

const WINDOWS = [
  { duration: 5,   maxRequests: 1,  label: '5s'   },  // Minimum interval
  { duration: 60,  maxRequests: 3,  label: '60s'  },  // Short window
  { duration: 3600, maxRequests: 10, label: '1h'   }   // Long window
];

/**
 * Generate a bucket key for a given window duration.
 * @param {string} ip - The client IP address.
 * @param {number} durationSeconds - Window duration in seconds.
 * @returns {string} KV key string.
 */
function bucketKey(ip, durationSeconds) {
  const bucket = Math.floor(Date.now() / 1000 / durationSeconds);
  return `ratelimit:${ip}:${durationSeconds}:${bucket}`;
}

/**
 * Check whether a request is allowed under the rate limits.
 * Increments counters atomically if allowed.
 *
 * @param {Object} env - The Worker environment object with KV namespace binding.
 * @param {string} ip - The client IP address.
 * @returns {Promise<{allowed: boolean, retryAfter?: number, message?: string}>}
 */
export async function checkRateLimit(env, ip) {
  if (!env || !env.RATE_LIMIT_KV) {
    // If KV is not configured, allow the request but flag it.
    return { allowed: true, message: 'Rate limiting unavailable.' };
  }

  if (!ip) {
    return { allowed: false, message: 'Client IP is required for rate limiting.' };
  }

  for (const window of WINDOWS) {
    const key = bucketKey(ip, window.duration);
    const current = Number(await env.RATE_LIMIT_KV.get(key)) || 0;

    if (current >= window.maxRequests) {
      const retryAfter = window.duration;
      return {
        allowed: false,
        retryAfter,
        message: `Too many requests. Please try again in ${retryAfter} seconds.`
      };
    }
  }

  // Increment all window counters
  for (const window of WINDOWS) {
    const key = bucketKey(ip, window.duration);
    const current = Number(await env.RATE_LIMIT_KV.get(key)) || 0;
    await env.RATE_LIMIT_KV.put(key, String(current + 1), {
      expirationTtl: window.duration + 60
    });
  }

  return { allowed: true, message: 'Request allowed.' };
}
