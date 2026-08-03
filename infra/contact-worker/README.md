# Monoswiss Contact Worker

## Monoswiss Contact Form — Cloudflare Worker

Handles contact form submissions from the monoswiss-v2 website.

- Validates input
- Verifies Cloudflare Turnstile
- Sends email via Resend
- Rate-limits per IP via Workers KV

## Directories

```
src/             — Worker source code
src/templates/   — Email templates
test/            — Unit and integration tests
test/fixtures/   — Test payloads and mock data
```