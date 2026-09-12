> **FICTIONAL CONTENT DISCLAIMER**
> Everything in this document is entirely fictional and used solely as a case study / template example. This includes, but is not limited to: the brand name ("Maison Valencourt Atelier"), the location/address ("14 Rue de l'Aube, Grand District, Aurelia City"), all names of people (patrons, tailors, stylists, personas), and the currency ("Aurum" / AUR). None of these refer to any real business, real place, real person, or real currency. Any resemblance to actual entities is purely coincidental.

---

### Category: Custom Fashion Catalog

# Product Requirements Document (PRD)
## Artisan Fashion and Tailor Designer Showcase Catalog: Maison Valencourt

**Category:** Custom Fashion Catalog
**Document Version:** 1.4
**Status:** Draft
**Date:** September 12, 2026
**Product Type:** Dedicated digital showcase catalog for atelier-designed custom garments, authenticated patron wishlist vault, secure testimonial engine with administrative approval, and salon viewing inquiry portal for a single luxury tailoring house (not a SaaS/multi-tenant product)

---

## 1. Overview

### 1.1 Atelier Identity (Fictional Case Study)
This document is authored specifically for the operational, styling, and curation requirements of **Maison Valencourt Atelier**, a fictional luxury fashion house and artisan tailoring studio used as a case study:

| Attribute | Detail |
|---|---|
| Atelier Name | Maison Valencourt Atelier |
| Location | 14 Rue de l'Aube, Grand District, Aurelia City (fictional) |
| Atelier Facilities | 1 Main Display Salon, 2 Private Fitting Suites, 1 On-Site Artisan Workshop (4 cutting benches, 6 master sewing stations) |
| Garment Demographics | Universal: signature artisan creations for gentlemen, ladies, young adults, and mature patrons |
| Operating Hours | Tuesday - Saturday, 10:00 - 19:00 (closed Sunday and Monday for atelier drafting and cutting) |
| Active Atelier Staff | 3 Master Tailors / Resident Designers, 1 Salon Curator / Stylist, 1 Atelier Director / Admin |
| Currency | Aurum (AUR), fictional currency used for all valuation tiers, fabric provenance references, and acquisition balances |

### 1.2 Product Name
Maison Valencourt Artisan Fashion Catalog and Salon Showcase: a specialized digital catalog presenting original custom garments conceived, styled, and handcrafted directly by the atelier's master tailors and resident designers, complete with an authenticated patron wishlist vault, a hardened testimonial submission engine with administrative approval (ACC), and a salon viewing appointment inquiry portal.

### 1.3 Scope, Tenancy Nature, and Curated Artisan Concept
This application is **not a generic multi-tenant e-commerce platform or multi-tailor marketplace SaaS** (such as Shopify, WooCommerce, or Customely). It is engineered **specifically and exclusively for Maison Valencourt**:
- Dedicated single-tenant architecture governing only Maison Valencourt's physical atelier at 14 Rue de l'Aube.
- **Curated Atelier Designer Model (Not Made-to-Measure On-Demand):** The garments exhibited in this catalog are NOT client-commissioned custom orders made to customer-supplied specifications. Instead, each piece is an original custom creation independently conceptualized, designed, and handcrafted by Maison Valencourt's resident designers and master tailors. The catalog serves as an exhibition and acquisition portal for these artisan concept pieces.
- **Detailed Artisan Storytelling:** Every catalog piece details the creator's artistic inspiration, silhouette anatomy, hand-canvasing construction, textile provenance, and unique stylistic nuances (such as hand-rolled lapels, roped shoulders, or vintage deadstock linings).
- **Universal Demographic Range:** Collections encompass menswear, womenswear, unisex/fluid silhouettes, youth sartorial debuts, and mature classical tailoring.
- **Strict Prohibition of Third-Party Cloud Captchas:** External security vendors (Cloudflare Turnstile, Google reCAPTCHA) are strictly banned. Sovereign control and data privacy are preserved through native authentication and self-hosted controls.
- **Self-Hosted Dedicated Patron Role:** Security and genuine engagement are achieved via a dedicated **Patron** user role. Patrons register and log in strictly for two focused functions:
  1. Curating and persisting a personal **Wishlist** of favored artisan creations across devices.
  2. Submitting verified **Testimonials** regarding their experience with Maison Valencourt's craftsmanship and salon service.
- **Mandatory Admin Approval Gate (ACC):** Testimonials submitted by patrons default to `PENDING_REVIEW` and must be reviewed and approved (`ACC`) by the Admin before appearing on the public website.
- **Testimonial Immutability Rule:** Once approved by the Admin, a testimonial becomes permanently immutable and cannot be directly modified or retracted by the patron. Removal requires a formal authenticated Deletion Request reviewed and executed by the Admin.
- **Salon Viewing & Acquisition Inquiries:** Because garments are singular or limited artisan creations, visitors and patrons cannot execute immediate automated checkouts. Instead, they book private Salon Viewing appointments to inspect and try on specific catalog creations in the atelier's private fitting suites.

### 1.4 Background
Maison Valencourt's master tailors and designers regularly craft one-of-a-kind and limited-edition sartorial pieces reflecting their unique aesthetic vision and tailoring heritage. Previously, these creations were displayed solely on physical mannequins in the 14 Rue de l'Aube salon, resulting in operational limitations:
- Prospective patrons could not explore the creative concepts, historical fabric origins, or construction details of these designer garments prior to visiting the salon.
- Patrons had no digital method to wishlist their preferred atelier creations or request private salon viewing appointments for specific garments.
- Client reviews and accolades for past artisan creations were stored in physical guestbooks or informal correspondence, lacking an authoritative digital showcase.
- Unauthenticated feedback systems risk spam or script injections, while external captcha services violate the atelier's sovereign data privacy standards. A self-contained, authenticated patron model resolves both challenges cleanly.

### 1.5 Goals
- Showcase Maison Valencourt's in-house artisan creations with high-resolution imagery, concept narratives, creator attributions, and structural construction specifications.
- Provide a structured textile archive detailing the rare fabrics, mill provenance, and vintage weaves utilized across the atelier collections.
- Provide registered patrons with a persistent, database-backed Wishlist to curate favorite designer creations across devices.
- Deliver a native, self-hosted Testimonial Engine allowing authenticated patrons to submit sartorial reviews with zero third-party cloud dependencies.
- Provide the Atelier Director / Admin with a moderation dashboard to review, approve (ACC), or reject submitted testimonials prior to public rendering.
- Enforce strict testimonial immutability once approved, requiring a formal authenticated deletion request workflow for any removal.
- Enable patrons and guests to book private Salon Viewing appointments linked directly to specific catalog creations.

### 1.6 Non-Goals
- This application does NOT operate as an on-demand custom tailoring order system where clients submit custom body measurements to order fresh garments cut from scratch.
- This application does NOT use external third-party security services, captcha providers, or cloud CDNs (e.g., Cloudflare, Google reCAPTCHA). All security primitives are self-contained.
- This application does NOT operate as an automated ready-to-wear shopping cart with instant checkout; atelier creations require salon consultation and fitting.
- This application does NOT permit unauthenticated guest submissions of testimonials; all reviews must be anchored to a verified Patron account.
- This application does NOT publish any patron testimonial automatically; direct unmoderated publishing is strictly banned.

---

## 2. Problem Statement

### 2.1 Problems to Solve
- **Invisible Artisan Narrative:** The rich design philosophy, hand-canvasing technique, and fabric rarity behind each tailor-created garment are invisible when garments merely sit on salon hangers, resulting in missed patron appreciation.
- **Fragmented Patron Wishlists:** Patrons currently screenshot social media or carry paper notes, lacking a centralized personal vault to curate favorite designer creations across sessions and devices.
- **Third-Party Dependency and Data Sovereignty Risks:** Relying on external cloud captchas introduces tracking scripts, third-party availability risks, and potential branding degradation in a high-end luxury atelier context.
- **Spam and Fake Review Exposure:** Public unauthenticated review forms invite spam bots and malicious script injection. Conversely, an authenticated patron model completely eliminates anonymous abuse while ensuring all testimonials represent real patrons.
- **Testimonial Retraction and Tampering:** Without a strict immutability rule, reviews could be arbitrarily altered or deleted post-publication, undermining the historical credibility of client endorsements.

### 2.2 Supporting Insights
- By exhibiting tailor-designed concept pieces online with full structural breakdowns, patrons arrive at the salon with pre-established emotional connection to specific garments.
- Restricting testimonial creation and wishlist curation to authenticated Patron accounts eliminates 100 percent of anonymous bot injection vectors at the network edge without external scripts.
- A controlled administrative approval queue (ACC) protects the atelier's prestigious reputation by filtering out irrelevant comments, test submissions, or accidental duplicates before public exposure.

---

## 3. Target Users & Personas

### 3.1 User Roles

| Role | Description |
|---|---|
| Guest (Public Visitor) | Unauthenticated visitor exploring the catalog of artisan creations, designer concept stories, textile archive, and approved client testimonials. Cannot create wishlists or submit testimonials without registering as a Patron. |
| Patron (Registered Client) | Authenticated patron registered specifically for wishlist curation and testimonial submission. Can save designer creations to a persistent database wishlist, submit sartorial testimonials, view submission review status, and request removal of approved reviews. |
| Admin (Atelier Director / Curator) | Authenticated internal administrator with complete authority. Manages catalog items, designer concept notes, fabric swatch inventories, salon viewing appointments, and the Testimonial Moderation Queue (Approve / ACC, Reject, Delete). |

### 3.2 Personas

#### Persona A: Julian Sterling (Young Adult Creative Guest & Patron)
- **Profile:** 27-year-old architectural designer in Aurelia City drawn to avant-garde yet classic tailoring.
- **Demographic Context:** Explores the catalog as a Guest, discovers a designer double-breasted jacket crafted with unpadded shoulders by Master Tailor Mateo Rossi, registers a Patron account to save it to his Wishlist, and books a salon viewing appointment.
- **Core Needs:** Immersive garment detail imagery, designer concept notes, responsive wishlist interface, and straightforward appointment booking.
- **Device:** Safari on iPhone 15 Pro and MacBook Air.

#### Persona B: Helena Vance (Executive Patron)
- **Profile:** 48-year-old corporate director who acquired an atelier-designed cashmere blazer and an evening coat from Maison Valencourt.
- **Demographic Context:** Repeat patron with an established Patron account who wishes to write a thoughtful review celebrating the designers' creative cuts and fabric selection.
- **Core Needs:** Secure login without third-party popups, straightforward review submission form, and real-time visibility into her testimonial's approval status.
- **Device:** iPad Pro with Magic Keyboard and mobile browser.

#### Persona C: Arthur Pendelton (Mature Patron)
- **Profile:** 72-year-old retired university dean appreciating traditional sartorial elegance.
- **Demographic Context:** Traditionalist who regularly views new seasonal tweed and wool creations designed by the atelier's tailors.
- **Core Needs:** High-contrast legibility, comprehensive structural descriptions of canvasing and lapel roll, and effortless reading of published client testimonials.
- **Device:** Desktop PC (Chrome on 27-inch monitor) with default high font scaling.

#### Persona D: Marcus Valencourt (Atelier Director & Admin)
- **Profile:** 46-year-old managing director and salon curator overseeing atelier collections, creator attributions, and brand integrity.
- **Demographic Context:** Publishes new tailor-created garments to the catalog, details the designer's creative concept, manages salon viewing requests, and moderates client testimonials.
- **Core Needs:** High-density administrative dashboard to curate catalog pieces, monitor garment availability status, and approve (ACC) or reject pending testimonials.
- **Device:** Desktop workstation in the atelier office and iPad Mini during salon walkthroughs.

### 3.3 Key Use Cases

| Role | Key Use Cases |
|---|---|
| Guest | - Browse curated artisan collections categorized by demographic (Men, Women, Universal), garment type, and collection theme.<br>- Read designer concept notes, lead tailor attribution, and construction specifications for each garment.<br>- Filter textile archive by material (Super 150s Wool, Cashmere, Irish Linen, Silk Velvet), weight, and mill origin.<br>- View published, approved client testimonials.<br>- Submit a Salon Viewing inquiry to try on a specific catalog garment.<br>- Register for a Patron account or log into an existing account. |
| Patron | - Curate and manage personal Wishlist items (designer creations, textiles) stored persistently in the database.<br>- Submit verified sartorial testimonials with star rating, garment reference, and narrative.<br>- Track status of submitted testimonials (`Pending Review`, `Approved`, `Rejected`).<br>- Submit a formal Deletion Request for an approved testimonial.<br>- Book private Salon Viewing appointments with wishlisted garments pre-staged in the fitting suite. |
| Admin | - Secure authentication via credentials and session tokens.<br>- Manage catalog creations: publish new tailor/designer garments, attach concept narratives, set creator credits, and toggle availability (`Available in Salon`, `Reserved for Viewing`, `Archived to Permanent Collection`).<br>- Maintain textile archive (mill provenance, fabric weight, inventory status, valuation tier).<br>- Testimonial Moderation Queue: review pending submissions, approve (ACC) for public publication, reject with internal notes, or execute verified deletion requests.<br>- Review salon viewing inquiries and coordinate fitting suite appointments. |

---

## 4. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Unauthenticated / Bot Testimonial Submissions | 0 submissions | Database constraint and middleware verification confirming all review writes require active `PATRON` session. |
| Zero Stored XSS / Script Injections | 0 successful script injections | Automated OWASP ZAP dynamic security audits and static code analysis. |
| Moderation Turnaround Time | <= 24 hours for Admin to review pending testimonials | Database timestamp delta between `created_at` and `reviewed_at` on testimonial records. |
| Wishlist Engagement Rate | >= 35% of catalog explorers create a Patron account to save favorite creations | Database analytics comparing unique session visits to created Patron records with active wishlist entries. |
| Salon Viewing Inquiries per Garment | >= 3 qualified viewing requests per newly published designer creation within 30 days | Database inquiry records linked to specific catalog garment IDs. |
| Catalog Performance Score | Lighthouse Performance >= 95 on mobile and desktop | Continuous integration Lighthouse synthetic audits on catalog, textile, and testimonial pages. |

---

## 5. Requirements / Specifications

### 5.1 Functional Requirements: Artisan Creation Catalog & Textile Archive

#### FR-101: Artisan Garment Taxonomy & Concept Presentation
- The catalog showcases original tailor/designer-crafted garments organized across taxonomies:
  - Demographic & Fit Category: Gentlemen, Ladies, Universal / Fluid, Youth / Debut, and Mature / Classical.
  - Garment Type: Tailored Jackets (Single and Double-Breasted), Structured Trousers, Waistcoats, Overcoats, Tuxedos / Formalwear, Hand-Finished Shirts, and Sculptural Skirts / Gowns.
  - Collection Theme: Atelier Heritage Series, Midnight Formal, Autumn Tweed Expedition, Architectural Minimalist, and Rare Vintage Cloths.
- Each catalog creation must detail:
  - Creation Title and Piece Reference Code (e.g., `MVC-2026-J04`).
  - Lead Artisan / Designer Attribution (e.g., "Designed and Cut by Master Tailor Mateo Rossi").
  - Creative Concept Narrative: Paragraph detailing the tailor's inspiration, aesthetic intent, and structural design choices.
  - Structural Anatomy: Construction Type (Full Floating Horsehair Canvas, Unstructured Neapolitan, Soft Shoulder, Roped Sleevehead), Lapel Width and Style, Vent Architecture, and Hand-Stitching Highlights (Milanese buttonholes, pick-stitching).
  - Primary Textile and Lining Specifications (linked directly to the Textile Archive).
  - Sizing and Fit Dimensions: Measured pit-to-pit, waist, shoulder width, sleeve length, and jacket back length (with adjustment allowance note).
  - Valuation Tier: Displayed in Aurum (AUR) (e.g., "Atelier Valuation: 1,850 AUR").
  - Availability Status: `Available in Salon`, `Reserved for Private Viewing`, `Archived to Permanent Collection`.
- Multi-angle high-resolution gallery showcasing macro seamwork, interior canvasing, and silhouette drape.

#### FR-102: Textile and Fabric Archive Explorer
- A dedicated textile archive cataloging the cloths utilized in the atelier's creations:
  - Fabric Metadata: Code, Mill Name (fictionalized, e.g., Mill of Valois, Aurelian Mills), Material Composition, Weight (gsm), Season, and Weave Pattern.
  - Swatch Preview: High-magnification weave texture, drape rating, and associated catalog creations crafted from this cloth bolt.
  - Sourcing Rationale: Designer notes explaining why the atelier selected this specific mill and weave.

### 5.2 Functional Requirements: Authenticated Patron Wishlist Vault

#### FR-201: Patron Authentication & Session Management
- Dedicated registration and login flows strictly for Patrons (`/patron/register`, `/patron/login`).
- Requires Patron Full Name, Email Address, and secure Password (minimum 8 characters with alphanumeric requirements).
- Passwords hashed using bcrypt (work factor 12).
- Native session tokens managed via NextAuth.js stored in HTTP-only, SameSite=Lax, Secure cookies.
- Self-hosted login brute-force prevention: maximum 5 failed attempts per 15 minutes per IP before triggering a 15-minute temporary lockout.

#### FR-202: Persistent Database Wishlist
- Authenticated Patrons can pin catalog creations and fabric swatches to their personal wishlist.
- Wishlist data is persisted directly in PostgreSQL (`WishlistItem` relational table tied to `patron_id`), ensuring real-time synchronization across desktop and mobile devices.
- Unauthenticated guests attempting to click "Save to Wishlist" receive a refined modal prompt to sign in or register as a Patron.

#### FR-203: Salon Viewing Appointment Booking from Wishlist
- Patrons can select one or more wishlisted garments and click "Request Salon Viewing".
- System generates a Salon Viewing Inquiry referencing the exact garment codes, prefilling the patron's contact details.
- System allows selecting preferred date and time slot (Tuesday - Saturday, 10:00 - 19:00).
- Staff stage the requested garments in a designated private fitting suite prior to the patron's arrival.

### 5.3 Functional Requirements: Authenticated Testimonials & Admin Approval (ACC)

#### FR-301: Self-Contained Authenticated Submission Engine (No Third Parties)
- Only authenticated Patrons can submit a testimonial via `/patron/testimonials/new`.
- Unauthenticated requests to this endpoint are immediately redirected to `/patron/login`.
- **Zero Third-Party Vendor Rule:** No Cloudflare Turnstile, no Google reCAPTCHA, no external tracking scripts. Authentication state and native rate-limiting serve as the definitive anti-bot barrier.
- **Native Rate Limiting:** Patrons are constrained to submitting a maximum of 1 testimonial per 30 days per active account.
- **Strict Zod Whitelist Schema Validation:**
  - `authorName`: 2 to 50 characters; strictly whitelisted regex `^[a-zA-Z\s\-']+$`. Prefilled from verified Patron profile.
  - `cityOrRegion`: 2 to 50 characters; letters, spaces, and hyphens only.
  - `creationReferenced`: Optional selection from catalog creations (e.g., "Midnight Peak Tuxedo") or General Atelier Experience.
  - `rating`: Integer strictly between 1 and 5.
  - `content`: 30 to 600 characters; strictly plain text. Prohibits HTML tags, markdown syntax, URLs, or script constructs (`<script>`, `javascript:`, `onerror=`).
- **Stored XSS Neutralization:** All content is stripped of HTML via `sanitize-html` before storage and rendered exclusively via standard React JSX escaping (strictly banning `dangerouslySetInnerHTML`).

#### FR-302: Double-Blind Moderation State Machine (Admin ACC Workflow)
- Testimonial status lifecycle:
  - `PENDING_REVIEW`: Default status upon submission by Patron. Completely hidden from public catalog views.
  - `APPROVED`: Marked by Admin (ACC). Rendered on the public Testimonials page and homepage showcase.
  - `REJECTED`: Marked by Admin. Archived internally with an administrative reason; never shown publicly.
  - `DELETION_PENDING`: Patron requested deletion; queued for Admin action.
  - `DELETED`: Soft-deleted; content purged from public views.
- Public database queries strictly enforce: `SELECT * FROM testimonials WHERE status = 'APPROVED' ORDER BY reviewed_at DESC`.

#### FR-303: Testimonial Immutability & Patron Deletion Request Protocol
- **Absolute Immutability Rule:** Once a testimonial transitions to `APPROVED`, the patron CANNOT edit, modify, or unilaterally retract the testimonial.
- **Authenticated Deletion Request Workflow:**
  1. A patron wishing to remove an approved testimonial navigates to their dashboard at `/patron/testimonials`.
  2. The patron views their active review with status badge `[Approved / Published]`.
  3. Patron clicks "Request Deletion" and provides a mandatory reason (e.g., "Requesting privacy update").
  4. System updates testimonial status to `DELETION_PENDING` and alerts the Admin in the back-office queue.
  5. The Admin reviews the request in `/admin/testimonials` and executes "Confirm Deletion".
  6. Status changes to `DELETED`, public display is immediately purged, and an audit entry is logged.

### 5.4 Functional Requirements: Admin Portal & Atelier Management

#### FR-401: Secure Administrator Authentication
- Admin access is protected via NextAuth.js credentials provider with bcrypt password hashing and mandatory administrative role enforcement (`role === 'ADMIN'`).
- Session tokens stored in strict HTTP-only, SameSite=Strict, Secure cookies with 12-hour expiration.

#### FR-402: Catalog Creation Management (Artisan CMS)
- Admin can create, edit, and archive tailor-crafted garments:
  - Input creation title, piece code, creator attribution, and design concept story.
  - Specify detailed cut specifications, measurements, fabric linkages, and AUR valuation.
  - Upload high-resolution imagery and arrange detail views.
  - Update garment status (`Available in Salon`, `Reserved for Viewing`, `Archived`).

#### FR-403: Testimonial Moderation Dashboard (ACC Interface)
- High-density table listing all submissions categorized by status (`Pending Review`, `Approved`, `Rejected`, `Deletion Requests`).
- Displays linked Patron profile, referenced garment, star rating, narrative text, and submission timestamp.
- Action controls:
  - `Approve (ACC)`: Sets status to `APPROVED`, records `reviewed_at = NOW()` and `reviewed_by = admin_id`.
  - `Reject`: Sets status to `REJECTED` with required administrative reason.
  - `Confirm Deletion`: Executes deletion for reviews in `DELETION_PENDING`.

#### FR-404: Salon Viewing Inquiries Inbox
- View incoming salon viewing requests submitted by guests or patrons, detailing the specific garments requested for trying on.
- Admin can assign fitting suites, confirm appointment times, and mark inquiry status (`New`, `Staged in Suite`, `Appointment Completed`, `Archived`).

### 5.5 Non-Functional Requirements

| Category | Requirement |
|---|---|
| Security & Hardening | Zero third-party script vulnerabilities. Zero Stored or Reflected XSS. Native bcrypt password hashing (work factor 12). Anti-CSRF protection across all Server Actions. Strict Content Security Policy (`script-src 'self'`). Brute-force rate limiting on login routes. |
| Performance & Speed | TTFB < 200ms on edge. FCP < 1.0s on 4G connections. Testimonial submission processing latency < 250ms with zero external API calls. |
| Availability & Uptime | System uptime SLA >= 99.9% during atelier operating hours (Tue-Sat). Automated database backups executed daily with 7-day retention. |
| Accessibility (WCAG) | WCAG 2.1 Level AA compliance. Minimum 4.5:1 contrast ratio. Full keyboard navigation across catalog filters, wishlist boards, and moderation tables. |
| Privacy & Data Minimization | Patron data is confined to name, email, wishlist items, and approved testimonials. No tracking pixels or external behavioral telemetry are embedded. |

### 5.6 Technology Stack Specification

The application will be constructed using a modern, self-contained fullstack architecture packaged as containerized services for zero-friction local development and deployment:

| Layer / Component | Technology Choice | Version / Tooling | Architectural Rationale |
|---|---|---|---|
| Fullstack Framework | Next.js | 15+ (App Router) | Single unified codebase for React Server Components (RSC), client interactions, and backend Route Handlers / Server Actions. Eliminates boilerplate API synchronization. |
| Language & Runtime | TypeScript / Node.js | TypeScript 5+ / Node.js 22 LTS | Full static type safety from database query results to UI component props. |
| UI & Styling Engine | Tailwind CSS | 4.x (or 3.4+) | Utility-first styling enabling responsive, high-density layouts with neutral luxury aesthetics (`#fbfbfa` warm bone, `#252724` obsidian buttons, 1px hairline borders) and zero CSS runtime overhead. |
| Relational Database | PostgreSQL | 16+ Alpine | Industry-standard ACID-compliant database. Containerized in Docker, natively handles transactional concurrency, supports row-level locking, and handles relational foreign keys across Patrons, Wishlists, and Testimonials. |
| ORM & Data Layer | Prisma ORM | Latest Stable | Type-safe schema definition, declarative migrations, automated database client generation, and automated table seed execution for catalog creations, fabrics, and default admin accounts. |
| Containerization | Docker & Docker Compose | Docker Compose v2 | Multi-container setup pairing the Next.js web application container with a healthchecked PostgreSQL container and persistent storage volumes. |
| Validation & Security | Zod + DOMPurify | Zod 3.x / DOMPurify | Strict runtime whitelist schema validation and text sanitization eliminating script execution risks natively without third-party services. |
| Authentication | NextAuth.js / Auth.js | 5.x | Secure session management with cookie-based JWTs, supporting strictly separated credentials and session lifecycles for Patron and Admin roles. |

#### Architectural Decisions
- **Curated Artisan Concept Over Generic E-Commerce:** Next.js Server Components excel at rendering content-rich editorial narratives, artisan creator profiles, and structural garment specs with near-zero client bundle weight.
- **Complete Elimination of Third-Party Security Vendors:** By relying on native NextAuth.js session credentials for Patron-authenticated submissions, external captcha services (Cloudflare, Google) are entirely avoided, guaranteeing data privacy and operational independence.
- **Relational Wishlist Architecture:** Persisting wishlist items in PostgreSQL guarantees cross-device consistency for registered patrons while enabling seamless pre-staging of requested garments for salon appointments.

---

## 6. Access Control & Permission Matrix

This section explicitly defines access boundaries between the three roles (Guest, Patron, Admin) across navigation and backend endpoints.

### 6.1 Page and Endpoint Access Matrix

| Page / Feature / Route | Guest (Public Visitor) | Patron (Registered Client) | Admin (Atelier Director / Curator) |
|---|---|---|---|
| Home & Atelier Heritage (`/`) | [Allowed] Full access | [Allowed] Full access | [Allowed] Full access |
| Artisan Catalog (`/catalog`) | [Allowed] Full access | [Allowed] Full access | [Allowed] Full access |
| Garment Detail & Concept Story (`/catalog/[id]`) | [Allowed] Full access | [Allowed] Full access | [Allowed] Full access with admin quick-edit |
| Textile & Fabric Archive (`/textiles`) | [Allowed] Full access | [Allowed] Full access | [Allowed] Full access |
| Testimonials Showcase (`/testimonials`) | [Allowed] View approved reviews | [Allowed] View approved reviews | [Allowed] View approved reviews with moderation shortcuts |
| Patron Login & Register (`/patron/login`, `/patron/register`) | [Allowed] Full access | [Redirect] Redirected to `/patron/wishlist` | [Redirect] Redirected to `/admin` |
| Patron Wishlist Vault (`/patron/wishlist`) | [Denied] Redirect to `/patron/login` | [Allowed] Full personal CRUD access | [Allowed] View-only simulation mode |
| Submit Testimonial Form (`/patron/testimonials/new`) | [Denied] Redirect to `/patron/login` | [Allowed] Permitted (max 1 per 30 days) | [Denied] Not in admin navigation |
| Patron Testimonial Status (`/patron/testimonials`) | [Denied] Redirect to `/patron/login` | [Allowed] View own submissions & status | [Denied] Redirect to `/admin/testimonials` |
| Request Testimonial Deletion Action | [Denied] Not available | [Allowed] Own approved reviews only | [Allowed] Full deletion execution |
| Salon Viewing Appointment Inquiry (`/viewing-inquiry`) | [Allowed] Full submission flow | [Allowed] Full submission (prefilled) | [Allowed] Visible |
| Admin Login (`/admin/login`) | [Allowed] Login form (lockout enabled) | [Denied] Redirect to `/admin/login` | [Redirect] Redirected to `/admin` |
| Admin Dashboard Overview (`/admin`) | [Denied] **DOM Excluded**; 401/404 | [Denied] **DOM Excluded**; 401/404 | [Allowed] Full access |
| Catalog Creation Editor (`/admin/catalog`) | [Denied] **DOM Excluded**; 401/404 | [Denied] **DOM Excluded**; 401/404 | [Allowed] Full CRUD access |
| Testimonial Moderation Queue (`/admin/testimonials`) | [Denied] **DOM Excluded**; 401/404 | [Denied] **DOM Excluded**; 401/404 | [Allowed] Full ACC / Reject / Delete controls |
| Salon Viewing Inquiries Inbox (`/admin/inquiries`) | [Denied] **DOM Excluded**; 401/404 | [Denied] **DOM Excluded**; 401/404 | [Allowed] Full view & scheduling |
| Atelier System Settings (`/admin/settings`) | [Denied] **DOM Excluded**; 401/404 | [Denied] **DOM Excluded**; 401/404 | [Allowed] Admin only |

### 6.2 Mandatory Principles

- **Principle 1: Strict DOM Exclusion of Disallowed Controls.** UI elements leading to administrative pages or actions MUST NOT be rendered anywhere in responses served to Guests or Patrons. CSS hiding (`display: none`) is strictly prohibited; elements must genuinely be absent from the server-rendered DOM and client JavaScript bundles.
- **Principle 2: Zero Normal Access-Denied Loops.** An "Access Denied" page must never be reached through regular navigation. Administrative routes simply do not exist in guest or patron navigation menus. Direct URL tampering by a non-admin triggers a silent redirect to `/admin/login` or an uninformative 404 Not Found response.
- **Principle 3: Two-Layer Validation Enforcement.** UI navigation masking is always backed by server-side session checks. Server Actions for moderation (`approveTestimonial`, `rejectTestimonial`, `deleteTestimonial`) must verify `session.user.role === 'ADMIN'` before executing any SQL mutation.
- **Principle 4: Strict Anti-IDOR Protection for Patrons.** Patron A must not be able to view, modify, or delete Patron B's wishlist items or submitted testimonials by altering IDs in URLs or form payloads. All queries must enforce server-side ownership (`WHERE patron_id = session.user.id`).

### 6.3 Acceptance Criteria Related to Access
- Unauthenticated requests to `/patron/*` must redirect to `/patron/login` with a sanitized `callbackUrl`.
- Non-admin sessions attempting to invoke `/admin/*` routes or admin Server Actions must return an HTTP 401 Unauthorized or redirect to `/admin/login`.
- The public testimonials query strictly filters `WHERE status = 'APPROVED'`; pending, rejected, or deleted reviews must never be exposed via public API responses or component props.
- Patrons cannot alter their own review status; the `status` field is immutable from client payloads and controlled strictly by backend Server Actions.

---

## 7. User Flow (Text Description)

### 7.1 Artisan Catalog Browsing and Concept Exploration Flow
1. Guest or Patron visits the web application and lands on the Artisan Creations Catalog.
2. User filters garments by collection theme (e.g., "Atelier Heritage Series") or demographic category (e.g., "Gentlemen", "Universal").
3. User selects a garment card (e.g., "MVC-2026-J04: Double-Breasted Silk-Wool Peaked Coat").
4. System displays the detailed garment page featuring:
   - High-resolution multi-angle photography of the completed garment.
   - Lead creator attribution ("Designed and Cut by Master Tailor Mateo Rossi").
   - Concept narrative describing the designer's vision and seasonal inspiration.
   - Structural specifications (Full floating canvas, soft shoulder, 11cm peak lapel, horn buttons).
   - Fabric origin details linking to the Textile Archive.
   - Current status (`Available in Salon`).
5. User can click "Save to Wishlist" or "Request Salon Viewing".

### 7.2 Patron Registration and Wishlist Curation Flow
1. Guest viewing an artisan creation clicks "Save to Wishlist".
2. System detects no active session and presents an elegant modal prompting registration to save favorites.
3. Guest navigates to `/patron/register`, inputs Full Name, Email, and Password, and submits.
4. Server validates inputs with Zod, hashes password with bcrypt, creates Patron record, and initializes NextAuth session cookie.
5. System returns Patron to the garment page and immediately confirms: "Added to your Patron Wishlist".
6. Patron navigates to `/patron/wishlist` to view all saved designer creations, complete with status tags and valuation estimates in Aurum (AUR).

### 7.3 Salon Viewing Appointment Request Flow
1. Patron on their Wishlist page (or Guest on a specific garment page) clicks "Request Salon Viewing".
2. Form pre-populates with the selected garment code and title.
3. User selects preferred appointment date and time slot (Tuesday - Saturday, 10:00 - 19:00).
4. User inputs preferred contact method and optional sizing notes.
5. User submits viewing inquiry.
6. Server records inquiry with status `NEW` and links it to the requested garment record.
7. System displays confirmation message informing the patron that the salon curator will stage the piece in a private fitting suite.

### 7.4 Authenticated Testimonial Submission Flow
1. Authenticated Patron navigates to `/patron/testimonials/new`.
2. System verifies that the Patron has not submitted another review within the last 30 days.
3. Patron completes the review form: Author Name (prefilled), City/Region, Optional Garment Selection (e.g., "MVC-2026-J04 Peaked Coat"), Star Rating (1 to 5), and Narrative Text.
4. Patron inputs narrative text (30 to 600 characters) celebrating the atelier's design vision and finishing precision.
5. Patron clicks "Submit Testimonial for Review".
6. Server Action verifies active Patron session, validates input types via Zod whitelist regex, strips any HTML tags via `sanitize-html`, and commits the record with `status = 'PENDING_REVIEW'`.
7. Confirmation screen informs the patron that the review has been submitted for atelier approval.
8. Patron can view their submission in their dashboard marked with status badge `[Pending Review]`.

### 7.5 Admin Testimonial Moderation & Approval (ACC) Flow
1. Admin logs into `/admin` via credentials and opens the Testimonial Moderation Queue (`/admin/testimonials`).
2. Queue displays all submissions in `PENDING_REVIEW` sorted chronologically.
3. Admin reviews submission details: Author Name, verified Patron Email, referenced creation, Rating, and Narrative.
4. Admin clicks "Approve (ACC)":
   - Server updates record to `status = 'APPROVED'`, stamps `reviewed_at = NOW()`, and records `reviewed_by = admin_id`.
   - Testimonial immediately appears on the public `/testimonials` page and homepage showcase.
   - Patron dashboard updates status badge to `[Approved / Published]`.
5. Alternatively, if the submission contains irrelevant text or duplicate remarks, Admin clicks "Reject":
   - Server updates record to `status = 'REJECTED'` with an internal note; review is archived and never shown publicly.

### 7.6 Authenticated Testimonial Deletion Request Flow
1. Patron logs into `/patron/testimonials` and views their approved review.
2. Patron clicks "Request Deletion".
3. System presents confirmation dialog explaining that the request will be submitted to the atelier director for removal.
4. Patron provides a brief reason and confirms request.
5. Server Action validates patron session ownership (`patron_id === session.user.id`), transitions status to `DELETION_PENDING`, and queues the item in the Admin dashboard.
6. Admin opens the Deletion Requests tab in `/admin/testimonials`.
7. Admin verifies the request and clicks "Confirm Deletion".
8. Server updates status to `DELETED`, wipes public review text, purges public cache, and logs the deletion audit record.

---

## 8. Prohibited Flows / Anti-Patterns (Explicitly Out of Bounds)

- **Anti-Pattern 1: On-Demand Custom Tailoring Order Pipeline:** The application must NEVER feature an on-demand made-to-measure order builder where clients submit custom body measurements to request brand new garments cut to order. The catalog exclusively presents original designer creations crafted by the atelier.
- **Anti-Pattern 2: Third-Party Security Dependencies:** The application must NEVER embed external third-party captcha scripts (Cloudflare Turnstile, Google reCAPTCHA, etc.). Security is enforced purely through native, self-hosted authentication and rate-limiting primitives.
- **Anti-Pattern 3: Direct Unmoderated Testimonial Publishing:** A submitted testimonial must NEVER appear on the public website immediately upon submission. Bypassing the `PENDING_REVIEW` state or auto-publishing without explicit Admin ACC approval is strictly prohibited.
- **Anti-Pattern 4: Unilateral Patron Retraction of Approved Testimonials:** Patrons must not have a direct "Delete" button that immediately purges an approved review. Once approved (ACC), reviews are immutable and require the formal authenticated deletion request workflow.
- **Anti-Pattern 5: Rendering Raw HTML or Markdown in Testimonials:** The application must never render raw HTML or use `dangerouslySetInnerHTML` for testimonial narratives. All content is strictly rendered as escaped plain text strings.
- **Anti-Pattern 6: Direct Checkout or Ready-to-Wear Shopping Cart:** No automated payment gateway, credit card checkout, or off-the-rack cart may exist in version 1. Atelier creations require salon consultation and fitting.

---

## 9. Scope

### 9.1 In-Scope (Version 1 / MVP)
- High-end digital catalog of original tailor/designer-crafted custom garments across Gentlemen, Ladies, Universal, Youth, and Mature collections.
- Concept storytelling architecture detailing lead creator attributions, structural anatomy, and fabric pairings.
- Textile & Fabric Archive detailing mill provenance, composition, weight (gsm), and luxury tier in Aurum.
- Dedicated Patron Authentication (registration, login, bcrypt password hashing, NextAuth.js session cookies).
- Persistent Database Wishlist for saving and comparing favorite designer creations.
- Salon Viewing Appointment Booking workflow linking requested garments to private fitting suite sessions.
- Authenticated Patron Testimonial Engine with Zod whitelist sanitization, stored XSS protection, and native 30-day rate-limiting.
- Admin Testimonial Moderation Queue with Approve (ACC), Reject, and Deletion Request execution.
- Testimonial Immutability Protocol with authenticated patron deletion request workflow.
- Public Testimonials Showcase displaying exclusively approved reviews.
- Production-grade containerized deployment with PostgreSQL and Docker Compose.

### 9.2 Out-of-Scope (Future Versions)
- On-demand custom measurement ordering / remote pattern drafting forms (permanently excluded from this catalog product).
- Third-party captcha services (permanently excluded to preserve data sovereignty and privacy).
- Online payment gateway processing credit cards or cryptocurrency for garment acquisitions in AUR.
- 3D interactive WebGL cloth simulation and avatar draping.
- Multi-location / branch synchronization for future ateliers outside Aurelia City.
- Native mobile applications (iOS / Android); responsive web application fulfills all mobile requirements for V1.

---

## 10. Dependencies & Constraints

### 10.1 Dependencies
- **Initial Catalog & Textile Seed Data:** Comprehensive database seed scripts containing Maison Valencourt's initial artisan garment creations, creator attributions, and fabric swatch records.
- **Node.js LTS & Docker Runtime:** Production hosting environment supporting Docker Compose and persistent PostgreSQL volume mounts.
- **Transactional Email Dispatch:** Reliable SMTP / transactional email transport for delivering patron account verification and salon viewing alerts.

### 10.2 Constraints
- **Single-Atelier Tenancy:** All data models and operating hours assume exactly one physical location (14 Rue de l'Aube, Aurelia City).
- **Three-Role Authorization Model:** Access is strictly partitioned across Guest, Patron, and Admin roles.
- **Zero Third-Party Cloud Captchas:** All security and anti-abuse mechanisms must be self-contained within the Next.js and PostgreSQL stack.
- **Currency Isolation:** All financial and pricing references must strictly use Aurum (AUR) in compliance with the fictional case study policy.
- **Pure Text Medium:** No diagrams, Mermaid charts, images, or ASCII art permitted within this specification.

---

## 11. Development Phases (Sequential, Not Time-Boxed)

| Order | Phase | Description | Completion Criteria |
|---|---|---|---|
| Phase 1 | Database & Authentication Foundation | Define Prisma schema (CatalogCreations, Fabrics, Patrons, Wishlists, Testimonials, ViewingInquiries, Admin credentials), configure PostgreSQL container, and initialize Next.js 15 App Router skeleton. | Docker Compose launches database; migrations execute cleanly; baseline seeds populate catalog and admin user. |
| Phase 2 | Artisan Catalog & Textile Archive | Implement public catalog views, demographic filters, concept narrative displays, creator credits, and high-resolution garment detail view. | Guests can navigate creations and filter fabric swatches without authentication or errors. |
| Phase 3 | Patron Authentication & Wishlist Vault | Build Patron registration and login routes, database-persisted Wishlist, and salon viewing inquiry prefill engine. | Authenticated Patrons can register, pin creations, and submit viewing requests synced to PostgreSQL. |
| Phase 4 | Authenticated Testimonials Submission Engine | Implement authenticated review submission form (`/patron/testimonials/new`), Zod whitelist sanitization, 30-day submission rate limiter, and `PENDING_REVIEW` state assignment. | Only authenticated Patrons can submit reviews; all input is sanitized; records commit with `PENDING_REVIEW` status. |
| Phase 5 | Admin Authentication & Moderation Portal | Implement NextAuth.js admin credentials provider, moderation queue dashboard with Approve (ACC) and Reject actions, and public testimonial showcase reel. | Admin can review and approve pending reviews; approved reviews render publicly; rejected reviews remain silent. |
| Phase 6 | Deletion Request & Salon Viewing Inquiries | Build patron authenticated deletion request workflow, salon viewing inquiry inbox for admin, and suite staging scheduler. | Patrons can request deletion from their dashboard; admin confirms removal; viewing inquiries register with linked garment codes. |
| Phase 7 | Hardening, Accessibility & E2E Verification | Conduct OWASP ZAP security audits, verify complete absence of third-party scripts, test Lighthouse performance, and execute end-to-end user flow tests. | Lighthouse Performance >= 95; zero third-party dependencies; all automated E2E tests pass cleanly. |

---

## 12. Risks & Open Questions

### 12.1 Risks
- **Patron Misunderstanding of Catalog Intent:** Patrons may mistake the catalog for an on-demand custom tailoring order shop.
  - *Mitigation:* Prominent editorial header and garment badges clarifying: "Original Atelier Creation - Designed and Handcrafted by Maison Valencourt Master Tailors. Available for Private Salon Viewing."
- **Inauthentic Patron Account Creation:** Bad actors registering patron accounts solely to submit defamatory reviews.
  - *Mitigation:* The mandatory Admin Approval (ACC) gate ensures that no review is published without administrative verification. Admins cross-reference the reviewer's name with atelier appointment or salon guest records.
- **Patron Frustration with Immutability:** Patrons wishing to correct a minor typographical error in an approved review.
  - *Mitigation:* Patrons can submit a deletion request or contact the atelier director, who can archive the review and permit a fresh submission.

### 12.2 Open Questions
- **Garment Status Indicator for Reserved Pieces:** When a piece is marked `Reserved for Private Viewing`, should it remain visible in the catalog with a "Viewing Pending" badge, or temporarily hidden from guest search?
- **Public Testimonial Filter by Garment:** Should the public testimonial page allow guests to filter reviews specifically by referenced garment type (e.g., view only Tuxedo reviews)?

---

## 13. Stakeholders

| Role | Responsibility |
|---|---|
| Atelier Director | Approves catalog taxonomy, collection themes, testimonial moderation standards, and overall system release criteria. |
| Lead Master Tailor / Resident Designer | Authors concept narratives, validates structural specifications, and verifies garment detail photography. |
| Fullstack Software Engineer | Implements Next.js fullstack monolith, Patron authentication, database wishlist models, and Docker containerization. |
| Application Security Engineer | Audits self-hosted authentication primitives, verifies Stored XSS immunity, tests rate limiting resilience, and validates CSP headers. |
| Quality Assurance Specialist | Tests testimonial moderation workflows, verifies DOM exclusion of admin elements, and validates database wishlist synchronization. |
| Salon Curator | Evaluates catalog visual hierarchy, salon viewing booking flows, and garment presentation standards. |
