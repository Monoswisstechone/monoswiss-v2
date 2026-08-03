/**
 * Server-side validation logic for the Monoswiss contact form.
 */

const PROJECT_TYPES = [
  'POS & Agent Banking',
  'Gift Card & Crypto Platform',
  'VTU & Bill Payment',
  'Mobile App (Flutter / React Native)',
  'Website & E-Commerce',
  'Loan App & Lending Software',
  'Other (please specify)'
];

const BUDGET_RANGES = [
  '₦500,000 – ₦1,000,000',
  '₦1,000,000 – ₦3,000,000',
  '₦3,000,000 – ₦5,000,000',
  '₦5,000,000+',
  'Not sure yet'
];

/**
 * Validates the contact form data.
 * @param {Object} data - The form data to validate.
 * @returns {Object} { isValid: boolean, errors: Object }
 */
export function validateContactForm(data) {
  const errors = {};
  const { name, email, phone, projectType, budgetRange, message } = data;

  // Name Validation
  if (!name || typeof name !== 'string') {
    errors.name = 'Full name is required.';
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 100) {
      errors.name = 'Full name must be between 2 and 100 characters.';
    } else if (!/^[a-zA-ZÀ-ÿ\s'.-]+$/.test(trimmedName)) {
      errors.name = 'Full name contains invalid characters.';
    }
  }

  // Email Validation
  if (!email || typeof email !== 'string') {
    errors.email = 'Email address is required.';
  } else {
    const trimmedEmail = email.trim();
    // RFC 5322 compliant regex (approximate for standard use)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (trimmedEmail.length > 254) {
      errors.email = 'Email address is too long.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  // Phone Validation (Optional)
  if (phone && typeof phone === 'string') {
    const trimmedPhone = phone.trim();
    if (trimmedPhone !== '') {
      const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
      if (!phoneRegex.test(trimmedPhone)) {
        errors.phone = 'Please enter a valid phone number.';
      }
    }
  }

  // Project Type Validation
  if (!projectType || !PROJECT_TYPES.includes(projectType)) {
    errors.projectType = 'Please select a valid project type.';
  }

  // Budget Range Validation (Optional)
  if (budgetRange && typeof budgetRange === 'string') {
    const trimmedBudget = budgetRange.trim();
    if (trimmedBudget !== '' && !BUDGET_RANGES.includes(trimmedBudget)) {
      errors.budgetRange = 'Please select a valid budget range.';
    }
  }

  // Message Validation
  if (!message || typeof message !== 'string') {
    errors.message = 'Message is required.';
  } else {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 20) {
      errors.message = 'Message must be at least 20 characters.';
    } else if (trimmedMessage.length > 2000) {
      errors.message = 'Message must be under 2,000 characters.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
