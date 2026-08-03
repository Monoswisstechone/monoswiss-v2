/**
 * Cloudflare Turnstile verification module for the Monoswiss contact form.
 *
 * Verifies the Turnstile token submitted with each form POST.
 * Reference: https://developers.cloudflare.com/turnstile/old/workers/sessions/
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify a Turnstile token against Cloudflare's verification endpoint.
 * @param {string} token - The cf-turnstile-response value from the form.
 * @param {string} ip - The client IP address (used as remoteip).
 * @param {string} secretKey - The Turnstile secret key from environment.
 * @returns {Promise<{success: boolean, message?: string, errorCodes?: string[]}>}
 */
export async function verifyTurnstile(token, ip, secretKey) {
  // Validate inputs before calling Cloudflare
  if (!token || typeof token !== 'string') {
    return {
      success: false,
      message: 'Turnstile token is missing.',
      errorCodes: ['missing-input-response']
    };
  }

  if (!secretKey || typeof secretKey !== 'string') {
    return {
      success: false,
      message: 'Server configuration error: Turnstile secret key not set.',
      errorCodes: ['server-configuration-error']
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (ip) {
      formData.append('remoteip', ip);
    }

    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    });

    if (!response.ok) {
      return {
        success: false,
        message: 'Turnstile verification service returned an error.',
        errorCodes: [`http-${response.status}`]
      };
    }

    const result = await response.json();

    return {
      success: result.success === true,
      message: result.success
        ? 'Turnstile verification passed.'
        : 'Turnstile verification failed.',
      errorCodes: result['error-codes'] || []
    };
  } catch (error) {
    return {
      success: false,
      message: 'Turnstile verification request failed.',
      errorCodes: ['network-error']
    };
  }
}
