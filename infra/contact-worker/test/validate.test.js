import { describe, it, expect } from 'vitest';
import { validateContactForm } from '../src/validate';

describe('validateContactForm', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+2349077895271',
    projectType: 'POS & Agent Banking',
    budgetRange: '₦1,000,000 – ₦3,000,000',
    message: 'I would like to discuss a new POS platform for my business in Port Harcourt.'
  };

  describe('valid submissions', () => {
    it('should return isValid true for a complete valid submission', () => {
      const result = validateContactForm(validData);
      expect(result.isValid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should accept submission without optional phone', () => {
      const { phone, ...noPhone } = validData;
      const result = validateContactForm(noPhone);
      expect(result.isValid).toBe(true);
    });

    it('should accept submission without optional budgetRange', () => {
      const { budgetRange, ...noBudget } = validData;
      const result = validateContactForm(noBudget);
      expect(result.isValid).toBe(true);
    });

    it('should accept submission with empty phone string', () => {
      const result = validateContactForm({ ...validData, phone: '' });
      expect(result.isValid).toBe(true);
    });

    it('should accept submission with empty budgetRange string', () => {
      const result = validateContactForm({ ...validData, budgetRange: '' });
      expect(result.isValid).toBe(true);
    });
  });

  describe('name validation', () => {
    it('should reject missing name', () => {
      const { name, ...noName } = validData;
      const result = validateContactForm(noName);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });

    it('should reject name shorter than 2 characters', () => {
      const result = validateContactForm({ ...validData, name: 'A' });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toContain('between 2 and 100');
    });

    it('should reject name longer than 100 characters', () => {
      const result = validateContactForm({ ...validData, name: 'A'.repeat(101) });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toContain('between 2 and 100');
    });

    it('should reject name with special characters', () => {
      const result = validateContactForm({ ...validData, name: 'John <script>' });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toContain('invalid characters');
    });

    it('should trim whitespace before validation', () => {
      const result = validateContactForm({ ...validData, name: '  John Doe  ' });
      expect(result.isValid).toBe(true);
    });

    it('should reject non-string name', () => {
      const result = validateContactForm({ ...validData, name: 123 });
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
    });
  });

  describe('email validation', () => {
    it('should reject missing email', () => {
      const { email, ...noEmail } = validData;
      const result = validateContactForm(noEmail);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toBeDefined();
    });

    it('should reject invalid email format', () => {
      const result = validateContactForm({ ...validData, email: 'not-an-email' });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toContain('valid email');
    });

    it('should reject email longer than 254 characters', () => {
      const local = 'a'.repeat(248);
      const domain = 'b.com';
      const longEmail = `${local}@${domain}`; // 248 + 1 + 5 = 254. ok
      const tooLongEmail = `${local}x@${domain}`; // 249 + 1 + 5 = 255. too long.

      const okResult = validateContactForm({ ...validData, email: longEmail });
      expect(okResult.isValid).toBe(true);

      const result = validateContactForm({ ...validData, email: tooLongEmail });
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toContain('too long');
    });

    it('should accept valid email with subdomain', () => {
      const result = validateContactForm({ ...validData, email: 'user@sub.example.com' });
      expect(result.isValid).toBe(true);
    });

    it('should accept valid email with plus addressing', () => {
      const result = validateContactForm({ ...validData, email: 'user+tag@example.com' });
      expect(result.isValid).toBe(true);
    });
  });

  describe('phone validation', () => {
    it('should reject phone with letters', () => {
      const result = validateContactForm({ ...validData, phone: '123-ABC-4567' });
      expect(result.isValid).toBe(false);
      expect(result.errors.phone).toBeDefined();
    });

    it('should accept phone with country code', () => {
      const result = validateContactForm({ ...validData, phone: '+2349077895271' });
      expect(result.isValid).toBe(true);
    });

    it('should accept phone with spaces and dashes', () => {
      const result = validateContactForm({ ...validData, phone: '+234 907 789 5271' });
      expect(result.isValid).toBe(true);
    });

    it('should reject phone shorter than 7 characters', () => {
      const result = validateContactForm({ ...validData, phone: '12345' });
      expect(result.isValid).toBe(false);
    });
  });

  describe('projectType validation', () => {
    it('should reject missing projectType', () => {
      const { projectType, ...noType } = validData;
      const result = validateContactForm(noType);
      expect(result.isValid).toBe(false);
      expect(result.errors.projectType).toBeDefined();
    });

    it('should reject invalid projectType value', () => {
      const result = validateContactForm({ ...validData, projectType: 'Invalid Service' });
      expect(result.isValid).toBe(false);
      expect(result.errors.projectType).toBeDefined();
    });

    it('should accept all valid projectType values', () => {
      const validTypes = [
        'POS & Agent Banking',
        'Gift Card & Crypto Platform',
        'VTU & Bill Payment',
        'Mobile App (Flutter / React Native)',
        'Website & E-Commerce',
        'Loan App & Lending Software',
        'Other (please specify)'
      ];
      for (const type of validTypes) {
        const result = validateContactForm({ ...validData, projectType: type });
        expect(result.isValid).toBe(true);
      }
    });
  });

  describe('budgetRange validation', () => {
    it('should accept all valid budgetRange values', () => {
      const validRanges = [
        '₦500,000 – ₦1,000,000',
        '₦1,000,000 – ₦3,000,000',
        '₦3,000,000 – ₦5,000,000',
        '₦5,000,000+',
        'Not sure yet'
      ];
      for (const range of validRanges) {
        const result = validateContactForm({ ...validData, budgetRange: range });
        expect(result.isValid).toBe(true);
      }
    });

    it('should reject invalid budgetRange value', () => {
      const result = validateContactForm({ ...validData, budgetRange: '₦10,000' });
      expect(result.isValid).toBe(false);
      expect(result.errors.budgetRange).toBeDefined();
    });
  });

  describe('message validation', () => {
    it('should reject missing message', () => {
      const { message, ...noMessage } = validData;
      const result = validateContactForm(noMessage);
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toBeDefined();
    });

    it('should reject message shorter than 20 characters', () => {
      const result = validateContactForm({ ...validData, message: 'Short msg' });
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toContain('20 characters');
    });

    it('should reject message longer than 2000 characters', () => {
      const result = validateContactForm({ ...validData, message: 'A'.repeat(2001) });
      expect(result.isValid).toBe(false);
      expect(result.errors.message).toContain('2,000');
    });

    it('should accept message at exactly 20 characters', () => {
      const result = validateContactForm({ ...validData, message: 'A'.repeat(20) });
      expect(result.isValid).toBe(true);
    });

    it('should accept message at exactly 2000 characters', () => {
      const result = validateContactForm({ ...validData, message: 'A'.repeat(2000) });
      expect(result.isValid).toBe(true);
    });
  });

  describe('multiple validation errors', () => {
    it('should return all errors simultaneously', () => {
      const result = validateContactForm({
        name: 'A',
        email: 'invalid',
        projectType: '',
        message: 'short'
      });
      expect(result.isValid).toBe(false);
      expect(Object.keys(result.errors).length).toBeGreaterThanOrEqual(3);
    });
  });
});
