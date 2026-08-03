/**
 * Input sanitisation utilities for the Monoswiss contact form.
 *
 * All text fields are trimmed, stripped of null bytes, and HTML-entity-encoded
 * before being passed to the email template to prevent injection.
 */

/**
 * HTML entity encode a string to prevent XSS in HTML contexts.
 * @param {string} str - The string to encode.
 * @returns {string} HTML-entity-encoded string.
 */
export function htmlEncode(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitise a single-line text field:
 * - Trim whitespace
 * - Remove null bytes
 * - No HTML encoding here; the caller decides if encoding is needed.
 * @param {string} str
 * @returns {string}
 */
export function sanitiseText(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\0/g, '').trim();
}

/**
 * Sanitise a multi-line text field (e.g., message):
 * - Trim whitespace
 * - Remove null bytes
 * - Normalise line endings to \n
 * - No HTML encoding here; the caller decides.
 * @param {string} str
 * @returns {string}
 */
export function sanitiseMultiline(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/\0/g, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

/**
 * Sanitise and encode a field for safe inclusion in an HTML email template.
 * @param {string} str
 * @returns {string}
 */
export function sanitiseForHtmlEmail(str) {
  return htmlEncode(sanitiseText(str));
}

/**
 * Sanitise and encode a multi-line field for safe inclusion in an HTML email template.
 * Preserves line breaks as <br> tags after encoding.
 * @param {string} str
 * @returns {string}
 */
export function sanitiseMultilineForHtmlEmail(str) {
  const sanitised = sanitiseMultiline(str);
  const encoded = htmlEncode(sanitised);
  return encoded.replace(/\n/g, '<br>');
}