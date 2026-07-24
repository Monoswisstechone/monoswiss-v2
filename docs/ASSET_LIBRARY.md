# Monoswiss V2 — Asset Library

This document catalogues every visual asset used in the project. It serves as the central inventory for tracking assets across V1 and V2, ensuring nothing is lost or duplicated during the migration process.

**Last Updated:** 2026-07-23

---

## Status Key
-   `KEEP` - Asset is current and will be used as-is in the final site.
-   `REPLACE` - Asset needs to be swapped for a new version or final file.
-   `ENHANCE` - Asset exists but needs improvement (e.g., resolution, format, compression).
-   `REMOVE` - Asset is no longer needed and should be deleted from the project.

---

## 1. Logos

**ID:** ASSET-001

| Asset Name | Current Location | Source | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Main Logo** | `images/logo.png` | V2 | ⏸️ **REPLACE** | File does not exist in repo. Placeholder reference in `index.html:23`. Final asset needed in SVG or high-res PNG. |
| **Footer Logo** | *(Text only)* | V2 | ⏸️ **KEEP** | The footer uses a text-based `<div class="footer-logo">Monoswiss</div>` instead of an image. No image asset required. |

---

## 2. Favicons

**ID:** ASSET-002

| Asset Name | Current Location | Source | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **SVG Favicon** | `favicon.svg` | V2 | ⏸️ **KEEP** | Blue circle with white "M" letter. Linked in `index.html:26`. |
| **PNG Favicon** | `favicon.png` | V2 | ⏸️ **REPLACE** | Referenced in `index.html:27` as fallback (`rel="alternate icon"`). File does not exist yet. |

---

## 3. Icons (SVG)

**ID:** ASSET-003

All icons are inline SVGs embedded directly in `index.html`. No separate icon files exist.

| Asset Name | Location in HTML | Source | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **AI Solutions** | `index.html:94` | V2 | ⏸️ **KEEP** | Server rack icon (Feather/Lucide style). |
| **Fintech Platforms** | `index.html:105` | V2 | ⏸️ **KEEP** | Laptop/desktop icon. |
| **Mobile Applications** | `index.html:116` | V2 | ⏸️ **KEEP** | Smartphone icon. |
| **Web Development** | `index.html:127` | V2 | ⏸️ **KEEP** | Code brackets icon. |
| **Cloud Infrastructure** | `index.html:138` | V2 | ⏸️ **KEEP** | Cloud icon. |
| **Enterprise Software** | `index.html:149` | V2 | ⏸️ **KEEP** | Dashboard/grid icon. |
| **Process: Discovery** | `index.html:242` | V2 | ⏸️ **KEEP** | Info circle icon. |
| **Process: UI/UX Design** | `index.html:253` | V2 | ⏸️ **KEEP** | Pen tool icon. |
| **Process: Architecture** | `index.html:264` | V2 | ⏸️ **KEEP** | 3D box icon. |
| **Process: Development** | `index.html:275` | V2 | ⏸️ **KEEP** | Monitor/desktop icon. |
| **Process: Testing** | `index.html:286` | V2 | ⏸️ **KEEP** | Shield icon. |
| **Process: Deployment** | `index.html:297` | V2 | ⏸️ **KEEP** | Refresh/arrow icon. |
| **Testimonial Quote** | `index.html:402,417,432` | V2 | ⏸️ **KEEP** | Quote marks icon (used 3x). |
| **Social: LinkedIn** | `index.html:597` | V2 | ⏸️ **KEEP** | LinkedIn icon. |
| **Social: GitHub** | `index.html:598` | V2 | ⏸️ **KEEP** | GitHub icon. |
| **Social: Twitter/X** | `index.html:599` | V2 | ⏸️ **KEEP** | X/Twitter icon. |
| **Social: Facebook** | `index.html:600` | V2 | ⏸️ **KEEP** | Facebook icon. |
| **Back to Top** | `index.html:632` | V2 | ⏸️ **KEEP** | Arrow-up icon. |
| **Tech Badge Icons** | `index.html:317-374` | V2 | ⏸️ **KEEP** | 20 inline SVGs for each tech badge (React, Vue, etc.). |

---

## 4. Images

**ID:** ASSET-004

*(Covers Project, Blog, Team Images, Hero Images, Service Images)*

| Asset Name | Current Location | Source | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **FinTech Platform Mockup** | `index.html:188` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=FinTech+Platform`. External placeholder. Needs real project screenshot. |
| **HMS Dashboard Mockup** | `index.html:203` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=HMS+Dashboard`. External placeholder. Needs real project screenshot. |
| **AI Chatbot Mockup** | `index.html:218` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=AI+Chatbot`. External placeholder. Needs real project screenshot. |
| **AI Integration** | `index.html:463` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=AI+Integration`. External placeholder. |
| **Secure FinTech** | `index.html:479` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=Secure+Fintech`. External placeholder. |
| **UI vs UX** | `index.html:494` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x400/1a1a1a/f0f0f0?text=UI+vs+UX`. External placeholder. |
| **Team Photo** | `index.html:386` | V2 | ⏸️ **REPLACE** | `https://placehold.co/600x600/1a1a1a/f0f0f0?text=Our+Team`. External placeholder. Needs real team photo. |
| **Animated Background** | `css/style.css:38-72` | V2 | ⏸️ **KEEP** | CSS-only composition (gradients, grid, blobs). No image asset. |

---

## 5. Documents / Downloads

**ID:** ASSET-005

| Asset Name | Current Location | Source | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| *(None)* | — | — | — | No downloadable files exist in the current project. |
