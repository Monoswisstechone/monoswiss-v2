/**
 * Monoswiss Contact Form Worker
 *
 * Entry point for the Cloudflare Worker that handles contact form submissions.
 * Orchestrates validation, sanitisation, spam protection, rate limiting, and email sending.
 */

import { validateContactForm } from './validate';
import {
  sanitiseText,
  sanitiseForHtmlEmail,
  sanitiseMultilineForHtmlEmail,
} from './sanitize';
import { verifyTurnstile } from './turnstile';
import { checkRateLimit } from './ratelimit';
import { buildContactEmailPayload, sendEmail } from './email';

// Pre-flight OPTIONS request handler
async function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    const corsHeaders = {
      'Access-Control-Allow-Origin': headers.get('Origin'),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': headers.get('Access-Control-Request-Headers'),
      'Access-Control-Max-Age': '86400',
    };
    return new Response(null, { headers: corsHeaders });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        'Allow': 'POST, OPTIONS',
      },
    });
  }
}

// POST request handler for form submissions
async function handlePost(request, env) {
  const corsHeaders = { 'Access-Control-Allow-Origin': env.ALLOWED_ORIGINS || '*' };
  const clientIp = request.headers.get('CF-Connecting-IP');

  // Rate Limiting
  const { allowed, retryAfter } = await checkRateLimit(env, clientIp);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: 'RATE_LIMITED', message: `Too many requests. Please try again in ${retryAfter} seconds.` }),
      { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Parse and validate incoming data
  let formData;
  try {
    formData = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'BAD_REQUEST', message: 'Invalid JSON payload.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Turnstile Verification
  const turnstileToken = formData['cf-turnstile-response'];
  const turnstileResult = await verifyTurnstile(turnstileToken, clientIp, env.TURNSTILE_SECRET_KEY);
  if (!turnstileResult.success) {
    return new Response(
      JSON.stringify({ error: 'TURNSTILE_FAILED', message: 'Security check failed. Please try again.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Server-Side Validation
  const { isValid, errors } = validateContactForm(formData);
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'VALIDATION_ERROR', errors }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Sanitisation
  const sanitisedData = {
    name: sanitiseForHtmlEmail(formData.name),
    email: sanitiseText(formData.email), // Email doesn't need HTML encoding for reply-to
    phone: sanitiseForHtmlEmail(formData.phone),
    projectType: sanitiseForHtmlEmail(formData.projectType),
    budgetRange: sanitiseForHtmlEmail(formData.budgetRange),
    message: sanitiseMultilineForHtmlEmail(formData.message),
    clientIp: clientIp
  };

  // Email Sending
  const emailConfig = {
    resendApiKey: env.RESEND_API_KEY,
    fromEmail: env.CONTACT_EMAIL_FROM,
    toEmail: env.CONTACT_EMAIL_TO,
  };

  const emailPayload = buildContactEmailPayload(sanitisedData, emailConfig);
  const emailResult = await sendEmail(emailPayload, emailConfig);

  if (!emailResult.success) {
    // In a real app, you would log the emailResult.message here for debugging.
    return new Response(
      JSON.stringify({ error: 'EMAIL_FAILED', message: 'Failed to send message. Please try again or contact us directly.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Success
  return new Response(
    JSON.stringify({ success: true, message: "Thank you! Your message has been sent. We'll get back to you within 24 hours." }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Worker entry point
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      return handlePost(request, env);
    }
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }
    return new Response('Method Not Allowed', { status: 405 });
  },
};
