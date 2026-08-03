/**
 * Resend email wrapper for the Monoswiss contact form.
 *
 * Sends contact form submissions to the Monoswiss team using the Resend API.
 * Reference: https://resend.com/docs/api-reference/emails/send-email
 */

import { generateContactEmailHtml } from './templates/contact-email';

const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Build the email payload for a contact form submission.
 * @param {Object} data - Validated and sanitised form data.
 * @param {Object} config - Configuration with resendApiKey, fromEmail, toEmail.
 * @returns {Object} The email payload object.
 */
export function buildContactEmailPayload(data, config) {
  const { name, email, phone, projectType, budgetRange, message } = data;

  const subjectParts = ['New Contact Form Inquiry'];
  if (projectType) {
    subjectParts.push(`- ${projectType}`);
  }
  const subject = subjectParts.join(' ');

  const phoneHtml = phone
    ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>`
    : '';

  const budgetHtml = budgetRange
    ? `<p><strong>Budget Range:</strong> ${budgetRange}</p>`
    : '';

  const html = generateContactEmailHtml(data);

  return {
    from: config.fromEmail,
    to: [config.toEmail],
    replyTo: email,
    subject,
    html
  };
}

/**
 * Send an email via the Resend API.
 * @param {Object} payload - The email payload from buildContactEmailPayload.
 * @param {Object} config - Configuration with resendApiKey.
 * @returns {Promise<{success: boolean, message: string, id?: string}>}
 */
export async function sendEmail(payload, config) {
  if (!config || !config.resendApiKey) {
    return {
      success: false,
      message: 'Server configuration error: Resend API key not set.'
    };
  }

  if (!payload || !payload.to || !payload.html) {
    return {
      success: false,
      message: 'Invalid email payload.'
    };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: `Failed to send email. Resend returned status ${response.status}.`,
        id: result.id || null
      };
    }

    return {
      success: true,
      message: 'Email sent successfully.',
      id: result.id || null
    };
  } catch (error) {
    return {
      success: false,
      message: 'Network error sending email.',
      id: null
    };
  }
}
