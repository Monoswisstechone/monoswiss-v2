/**
 * Plain-text email template for contact form submissions.
 *
 * Generates an accessible text alternative for the Monoswiss team notification.
 */

export function generateContactEmailText(data) {
  const phonePart = data.phone ? `Phone: ${data.phone}\n` : '';
  const budgetPart = data.budgetRange ? `Budget Range: ${data.budgetRange}\n` : '';
  const timestamp = new Date().toISOString();

  const plainMessage = data.message.replace(/<br\s*\/?>/gi, '\n');

  return [
    'New Contact Form Inquiry',
    '========================',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    phonePart,
    `Project Type: ${data.projectType}`,
    budgetPart,
    '',
    'Message',
    '-------',
    plainMessage,
    '',
    '------------------------',
    `Received: ${timestamp}`,
    `IP: ${data.clientIp || 'Not available'}`
  ]
    .filter(Boolean)
    .join('\n');
}
