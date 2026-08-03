import { describe, it, expect } from 'vitest';
import {
  htmlEncode,
  sanitiseText,
  sanitiseMultiline,
  sanitiseForHtmlEmail,
  sanitiseMultilineForHtmlEmail,
} from '../src/sanitize';

describe('htmlEncode', () => {
  it('should encode & to &amp;', () => {
    expect(htmlEncode('AT&T')).toBe('AT&amp;T');
  });

  it('should encode < to &lt;', () => {
    expect(htmlEncode('<script>')).toBe('&lt;script&gt;');
  });

  it('should encode > to &gt;', () => {
    expect(htmlEncode('10 > 5')).toBe('10 &gt; 5');
  });

  it('should encode double quotes', () => {
    expect(htmlEncode('She said "hello"')).toBe('She said &quot;hello&quot;');
  });

  it('should encode single quotes', () => {
    expect(htmlEncode("It's fine")).toBe('It&#x27;s fine');
  });

  it('should return empty string for non-string input', () => {
    expect(htmlEncode(null)).toBe('');
    expect(htmlEncode(undefined)).toBe('');
    expect(htmlEncode(123)).toBe('');
  });

  it('should leave normal text unchanged', () => {
    expect(htmlEncode('John Doe')).toBe('John Doe');
  });
});

describe('sanitiseText', () => {
  it('should trim whitespace', () => {
    expect(sanitiseText('  John  ')).toBe('John');
  });

  it('should remove null bytes', () => {
    expect(sanitiseText('John\0Doe')).toBe('JohnDoe');
  });

  it('should return empty string for non-string input', () => {
    expect(sanitiseText(null)).toBe('');
    expect(sanitiseText(undefined)).toBe('');
  });
});

describe('sanitiseMultiline', () => {
  it('should trim whitespace', () => {
    expect(sanitiseMultiline('  Hello\nWorld  ')).toBe('Hello\nWorld');
  });

  it('should remove null bytes', () => {
    expect(sanitiseMultiline('Hello\0World')).toBe('HelloWorld');
  });

  it('should normalise CRLF to LF', () => {
    expect(sanitiseMultiline('Line1\r\nLine2')).toBe('Line1\nLine2');
  });

  it('should normalise CR to LF', () => {
    expect(sanitiseMultiline('Line1\rLine2')).toBe('Line1\nLine2');
  });
});

describe('sanitiseForHtmlEmail', () => {
  it('should trim and encode for HTML email', () => {
    expect(sanitiseForHtmlEmail('  AT&T  ')).toBe('AT&amp;T');
  });
});

describe('sanitiseMultilineForHtmlEmail', () => {
  it('should encode and convert newlines to br tags', () => {
    const result = sanitiseMultilineForHtmlEmail('Hello\nWorld');
    expect(result).toBe('Hello<br>World');
  });

  it('should encode HTML characters and convert newlines', () => {
    const result = sanitiseMultilineForHtmlEmail('<test>\n&');
    expect(result).toBe('&lt;test&gt;<br>&amp;');
  });
});
