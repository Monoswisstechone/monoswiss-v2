/**
 * HTML email template for contact form submissions.
 *
 * Generates a branded notification email for the Monoswiss team.
 */

export function generateContactEmailHtml(data) {
  const phoneHtml = data.phone
    ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>`
    : '';

  const budgetHtml = data.budgetRange
    ? `<p><strong>Budget Range:</strong> ${data.budgetRange}</p>`
    : '';

  const timestamp = new Date().toISOString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Inquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f9f9f9;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #fff; border-radius: 8px; overflow: hidden;">
    <tr>
      <td style="padding: 30px;">
        <h1 style="margin: 0 0 20px; font-size: 24px; color: #1a1a1a;">New Contact Form Inquiry</h1>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        ${phoneHtml}
        <p><strong>Project Type:</strong> ${data.projectType}</p>
        ${budgetHtml}
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h2 style="font-size: 18px; color: #1a1a1a;">Message</h2>
        <p style="white-space: pre-wrap; color: #333;">${data.message}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 12px; color: #999;">
          Received: ${timestamp}<br>
          IP: ${data.clientIp || 'Not available'}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}
