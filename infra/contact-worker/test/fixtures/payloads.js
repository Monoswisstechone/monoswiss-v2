export const validFormData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+2349077895271',
  projectType: 'POS & Agent Banking',
  budgetRange: '₦1,000,000 – ₦3,000,000',
  message: 'I would like to discuss a new POS platform for my business in Port Harcourt.'
};

export const invalidFormData = {
  name: 'J',
  email: 'invalid',
  projectType: 'Invalid Service',
  message: 'short'
};

export const validContactFormPayload = {
  ...validFormData,
  'cf-turnstile-response': 'valid-turnstile-token'
};

export const expectedErrors = {
  name: expect.stringContaining('between 2 and 100'),
  email: expect.stringContaining('valid email'),
  message: expect.stringContaining('20 characters')
};
