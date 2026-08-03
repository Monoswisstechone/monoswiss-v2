import { describe, it, expect } from 'vitest';
import { generateContactEmailHtml } from '../src/templates/contact-email';

describe('generateContactEmailHtml', () => {
  const validData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+2349077895271',
    projectType: 'POS & Agent Banking',
    budgetRange: '₦1,000,000 – ₦3,000,000',
    message: 'Hello<br>World',
    clientIp: '192.168.1.1'
  };

  it('should generate HTML containing the name', () => {
    const html = generateContactEmailHtml(validData);
    expect(html).toContain('John Doe');
  });

  it('should generate HTML containing the email as a mailto link', () => {
    const html = generateContactEmailHtml(validData);
    expect(html).toContain('mailto:john@example.com');
  });

  it('should include phone when provided', () => {
    const html = generateContactEmailHtml(validData);
    expect(html).toContain('tel:+2349077895271');
  });

  it('should include IP address', () => {
    const html = generateContactEmailHtml(validData);
    expect(html).toContain('192.168.1.1');
  });

  it('should include sanitised message with line breaks', () => {
    const html = generateContactEmailHtml(validData);
    expect(html).toContain('Hello<br>World');
  });

  it('should not include phone section when not provided', () => {
    const { phone, ...noPhone } = validData;
    const html = generateContactEmailHtml(noPhone);
    expect(html).not.toContain('Phone:');
  });
});
