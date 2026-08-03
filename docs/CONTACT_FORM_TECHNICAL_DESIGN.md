# Monoswiss V2 — Contact Form Technical Design

This document records the approved technical design and validation rules for the Monoswiss contact form, implemented in the backend Cloudflare Worker.

## Purpose
To define a secure, standardized validation schema for contact form submissions, ensuring data integrity and preventing injection or invalid payloads from reaching the backend.

## Form Fields & Validation Rules

| Field | Required | Max Length | Validation Rule / Constraint |
|-------|----------|------------|-----------------------------|
| **Name** | Yes | 100 | Trimmed length 2–100; Alpha + spaces/hyphens/apostrophes |
| **Email** | Yes | 254 | RFC 5322 compliant regex |
| **Phone** | No | 20 | Optional; Regex validation `^\+?[\d\s\-()]{7,20}$` |
| **Project Type**| Yes | — | Must be one of the approved `projectType` enum values |
| **Budget Range**| No | — | Must be one of the approved `budgetRange` enum values |
| **Message** | Yes | 2,000 | Trimmed length 20–2,000 |

### Regex Rules
- **Name:** `/^[a-zA-ZÀ-ÿ\s'.-]+$/`
- **Email:** `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/`
- **Phone:** `/^\+?[\d\s\-()]{7,20}$/`

### Enums

#### projectType
- `POS & Agent Banking`
- `Gift Card & Crypto Platform`
- `VTU & Bill Payment`
- `Mobile App (Flutter / React Native)`
- `Website & E-Commerce`
- `Loan App & Lending Software`
- `Other (please specify)`

#### budgetRange
- `₦500,000 – ₦1,000,000`
- `₦1,000,000 – ₦3,000,000`
- `₦3,000,000 – ₦5,000,000`
- `₦5,000,000+`
- `Not sure yet`

## Validation Flow
1. **Client-side:** Perform validation on `blur` and `submit` using native JS, displaying inline error messages.
2. **Server-side:** Worker performs independent validation of all fields upon POST request.
3. **Turnstile:** Server-side verification of Turnstile token is mandatory before processing email.

## Error Response Format
The backend returns `400 Bad Request` for validation failures with the following JSON structure:

```json
{
  "error": "VALIDATION_ERROR",
  "field": "fieldName",
  "message": "Human-readable error message"
}
```
