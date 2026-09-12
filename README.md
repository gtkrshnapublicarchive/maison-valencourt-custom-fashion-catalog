# Maison Valencourt Custom Fashion Catalog

A dedicated digital exhibition catalog and bespoke sartorial appointment platform engineered specifically for **Maison Valencourt Atelier** (14 Rue de l'Aube, Aurelia City). Built to showcase limited-run artisanal haute couture pieces denominated in Aurum (`AUR`), manage textile archives, facilitate private salon viewing appointments, and maintain double-blind client accolades without standard transactional cart checkout.

---

## Architectural Highlights

* **Curated Atelier Operational Model**: Bespoke single-tenant catalog tailored to luxury couture houses, substituting automated transactional checkouts with authenticated salon viewing reservations and bespoke fitting appointments.
* **Warm Editorial Light Design System**: Clean editorial aesthetic built on a `#fbfbfa` warm bone canvas, solid obsidian `#252724` action elements, 1px hairline borders (`border-black/8`), Fraunces serif display typography, and DM Sans interface typography. Strictly zero emojis and zero em dashes across all UI views.
* **100% Self-Hosted Photographic Assets**: Zero external CDN or Unsplash dependencies. All visual assets for the atelier showcase, 6 custom garments (`/images/garments/`), and 4 textile swatches (`/images/textiles/`) are stored and served locally from `public/images/`.
* **Sovereign Patron Authentication Gate**: Private salon appointments require patron authentication. Visitors initiating inquiries are preserved via `callbackUrl` parameters, seamlessly returning to their selected garment upon sign-in.
* **Role-Based Access Control (RBAC)**: Enforces distinct authorization tiers (`PATRON` vs `ADMIN`) via NextAuth sessions and secure server actions. Administrative director routes (`/admin/*`) are isolated with a discrete login portal disconnected from public navigation.
* **Double-Blind Accolade Moderation & Retraction Engine**: Patrons submit sartorial testimonials subject to a 30-day anti-spam cooldown, an executive director review queue, and a sovereign patron retraction protocol.
* **Docker Trifecta & Single-Enter Shell Orchestration**: Fully automated environment bootstrap scripts (`deploy.sh`, `redeploy.sh`, `test.sh`) paired with an isolated PostgreSQL 16 container (`valencourt_postgres`).

---

## Atelier Creation Inventory & Textile Archive

Maison Valencourt maintains 6 signature artisanal garments across 4 curated heritage textile compositions:

### 1. Curated Garments

| Piece Code | Silhouette Category | Collection Season | Valuation | Artisan Effort | Primary Textile | Availability |
|---|---|---|---|---|---|---|
| `MVC-2026-J04` | Tailoring | Autumn/Winter 2026 | 4,800 AUR | 140 Hours | 14oz Worsted Wool | Available |
| `MVC-2026-T02` | Outerwear | Autumn/Winter 2026 | 6,500 AUR | 210 Hours | 18oz Donegal Tweed | Available |
| `MVC-2026-X01` | Tailoring | Spring/Summer 2026 | 3,900 AUR | 115 Hours | 340 GSM Irish Linen | Reserved |
| `MVC-2026-W08` | Eveningwear | Autumn/Winter 2026 | 7,200 AUR | 260 Hours | Lyons Silk Velvet | Available |
| `MVC-2026-Y03` | Ceremonial | Spring/Summer 2026 | 2,800 AUR | 85 Hours | 14oz Worsted Wool | Available |
| `MVC-2026-M05` | Outerwear | Autumn/Winter 2026 | 5,400 AUR | 180 Hours | Loro Piana Cashmere | Available |

### 2. Heritage Textiles & Provenance

| Textile Code | Material Composition | Weave Structure | Weight (GSM) | Origin Mill | Linked Pieces |
|---|---|---|---|---|---|
| `TX-VAL-01` | 100% Merino Wool | 2/2 Twill | 420 GSM | Yorkshire Heritage Mills | `MVC-2026-J04`, `MVC-2026-Y03` |
| `TX-VAL-02` | 95% Cashmere, 5% Silk | Flannel Finish | 380 GSM | Biella Alpine Mills | `MVC-2026-M05` |
| `TX-VAL-03` | 100% Organic Flax | Plain Weave | 340 GSM | Ulster Flax Guild | `MVC-2026-X01` |
| `TX-VAL-04` | 82% Rayon, 18% Silk | Velvet Pile | 460 GSM | Lyons Velvet Works | `MVC-2026-W08` |

---

## Module Breakdown

### 1. Heritage Landing Showcase (`/`)
* **Atelier Hero Banner**: Custom photographic showcase depicting the atelier workroom, active operational hours, and direct call-to-action to browse the catalog.
* **Heritage Narrative**: Overview of 14 Rue de l'Aube, Aurelia City heritage and bespoke garment curation philosophy.
* **Curated Spotlight**: Dynamic high-density display of signature creations with live AUR valuation badges.
* **Public Accolade Reel**: Client accolades that have cleared executive director moderation.

### 2. Exhibition Catalog & Garment Showcase (`/catalog`, `/catalog/[id]`)
* **Multi-Criteria Filter Bar**: Powered by custom Warm Editorial `Select` dropdown components filtering by category, collection season, textile weave, and availability.
* **Real-Time Sorting Engine**: Sorts creations dynamically by Aurum valuation, artisan construction hours, and piece code.
* **Piece Detail Modal & Dedicated View**: High-resolution gallery, comprehensive measurements, fabric composition specs, and one-click salon viewing launch.

### 3. Textile Archive (`/textiles`)
* **Swatch Inspection Grid**: High-resolution fabric swatches detailing mill provenance, yarn specifications, weight metrics, and tactile characteristics.
* **Reciprocal Garment Links**: Direct navigation from textile swatches to all creations cut from that specific fabric.

### 4. Salon Viewing & Private Fitting Engine (`/viewing-inquiry`)
* **Authentication Gate**: Restricts booking submissions to verified patrons. Preserves selected garment piece codes across authentication redirections via `callbackUrl`.
* **Appointment Parameters**: Selects appointment category (`VIEWING`, `FITTING`, `CONSULTATION`), target calendar date, preferred time window, and custom sartorial notes.
* **Archived Status Protection**: Rejects appointment requests for creations flagged as `ARCHIVED`.

```
[Public Visitor] ──> [Browse Catalog] ──> [Select Piece] ──> [Request Viewing]
                                                                     │
                                                             [Check Session]
                                                                     │
                                   ┌─────────────────────────────────┴─────────────────────────────────┐
                                   ▼                                                                   ▼
                         [Active Patron Session]                                             [Unauthenticated]
                                   │                                                                   │
                                   ▼                                                                   ▼
                         [Viewing Form Pre-filled]                                           [Redirect /patron/login]
                                   │                                                                   │
                                   ▼                                                                   ▼
                         [Submit to Director Queue]                                          [Auth Success -> Return]
```

### 5. Patron Wishlist Vault (`/patron/wishlist`)
* **Aggregate Portfolio Valuation**: Calculates real-time cumulative Aurum (`AUR`) valuation across all saved garments.
* **Instant Inquiry Dispatch**: One-click transfer from wishlist items directly into active salon viewing appointment requests.

### 6. Double-Blind Sartorial Accolades (`/testimonials`)
* **30-Day Rate Limit**: Restricts patrons to 1 submission per 30 calendar days to eliminate testimonial spam.
* **Director Moderation Queue**: Incoming submissions are stored in `PENDING` state until approved or rejected by the atelier director.
* **Sovereign Patron Retraction**: Patrons can request the immediate retraction of approved testimonials (`RETRACTED`), removing them from public views.

### 7. Role-Aligned Profile & Security (`/patron/profile`, `/admin/settings`)
* **Patron Identity & Sizing**: Updates patron name, telephone contact, and sartorial sizing notes.
* **Director Particulars & Diagnostics**: Updates director contact details and provides live database connection indicators.
* **Credential Rotation**: Passphrase mutation with mandatory current password verification using `bcryptjs` (12 rounds).
* **Patron Activity Metrics**: Real-time counter of total inquiries submitted, wishlist size, and testimonial status.

### 8. Atelier Director Governance (`/admin/*`)
* **Executive Oversight Dashboard (`/admin`)**: High-density KPI cards tracking total catalog valuation in AUR, active exhibition pieces, pending salon inquiries, and moderation queues.
* **Garment State Control (`/admin/catalog`)**: Inline status toggling between `AVAILABLE`, `RESERVED`, and `ARCHIVED` via custom right-aligned `Select` dropdowns.
* **Salon Inquiry Triage (`/admin/inquiries`)**: Status lifecycle progression (`PENDING` -> `CONFIRMED` -> `COMPLETED` or `CANCELLED`).
* **Accolade Review Queue (`/admin/testimonials`)**: Director actions to approve, reject, or process patron retraction requests.

---

## Role & Permission Matrix

| Feature / Capability | Public Visitor | Authenticated Patron | Atelier Director |
|---|:---:|:---:|:---:|
| Browse Exhibition Catalog | Yes | Yes | Yes |
| Inspect Textile Swatches | Yes | Yes | Yes |
| View Approved Accolades | Yes | Yes | Yes |
| Manage Wishlist Vault | No | Yes | Yes |
| Submit Salon Viewing Inquiry | No | Yes | Yes |
| Submit Sartorial Testimonial | No | Yes (30-day cooldown) | No |
| Request Testimonial Retraction | No | Yes (own submission) | Yes |
| Update Personal Coordinates | No | Yes | Yes |
| Rotate Passphrase Credentials | No | Yes | Yes |
| Access Administrative Portal | No | No | Yes |
| Toggle Garment Availability | No | No | Yes |
| Triage Viewing Inquiries | No | No | Yes |
| Moderate Testimonials Queue | No | No | Yes |
| View System Diagnostics | No | No | Yes |

---

## Tech Stack

* **Fullstack Framework**: [Next.js 16.3.5](https://nextjs.org/) (Turbopack, App Router, React 19)
* **Design & Styling**: [Tailwind CSS 3.4.17](https://tailwindcss.com/) with Warm Editorial Light design tokens
* **Iconography**: [Lucide React](https://lucide.dev/) (Scalable vector icons, strictly zero emojis)
* **Database & ORM**: PostgreSQL 16 containerized with [Prisma ORM 6.19.3](https://www.prisma.io/)
* **Authentication**: [NextAuth 4.24.11](https://next-auth.js.org/) with credentials provider and session callbacks
* **Cryptography**: [bcryptjs 3.0.3](https://github.com/dcodeIO/bcrypt.js) (salted password hashing, 12 rounds)
* **Validation**: [Zod 3.24.2](https://zod.dev/) contract schemas co-located with server actions
* **Containerization**: Docker Compose with health-checked PostgreSQL 16 service

---

## Project Directory Tree

```
src/
├── app/                                    # Next.js App Router root & page endpoints
│   ├── admin/                              # Director administrative portal
│   │   ├── (portal)/                       # Authenticated layout group
│   │   │   ├── catalog/page.tsx            # Garment status management table
│   │   │   ├── inquiries/page.tsx          # Salon appointment triage table
│   │   │   ├── settings/page.tsx           # Director profile & diagnostics
│   │   │   ├── testimonials/page.tsx       # Accolade moderation queue
│   │   │   └── page.tsx                    # Executive KPI dashboard
│   │   └── login/page.tsx                  # Isolated director login
│   ├── api/auth/[...nextauth]/route.ts     # NextAuth route handler
│   ├── catalog/                            # Public catalog & [id] detail views
│   ├── patron/                             # Patron authenticated routes
│   │   ├── login/page.tsx                  # Patron sign-in
│   │   ├── register/page.tsx               # Patron registration
│   │   ├── profile/page.tsx                # Patron profile & credentials
│   │   ├── testimonials/page.tsx           # Patron accolade submissions
│   │   └── wishlist/page.tsx               # Patron Wishlist Vault
│   ├── textiles/page.tsx                   # Textile & provenance archive
│   ├── viewing-inquiry/page.tsx            # Salon viewing inquiry form
│   ├── globals.css                         # Warm Editorial design system tokens
│   ├── layout.tsx                          # Root layout with typography fonts
│   └── page.tsx                            # Atelier heritage landing page
├── core/                                   # Shared kernel & primitives
│   ├── auth/                               # Auth options & session configurations
│   ├── database/                           # Prisma client singleton
│   ├── layout/                             # Atelier navbar, footer, banner
│   ├── security/                           # Password hashing, sanitizer, rate limiter
│   └── ui/                                 # Warm Editorial atomic UI components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx                       # With password visibility toggle
│       ├── modal.tsx
│       └── select.tsx                      # Custom Warm Editorial dropdown
└── features/                               # Domain feature modules
    ├── admin/                              # Actions, contracts, and admin tables
    ├── auth/                               # Registration & login forms
    ├── catalog/                            # Catalog grid, filter bar, cards, specs
    ├── inquiries/                          # Viewing inquiry action and dialog
    ├── profile/                            # Role-aligned schemas and actions
    ├── testimonials/                       # Accolade submission, moderation, retraction
    ├── textiles/                           # Swatch grid, filter bar, cards
    └── wishlist/                           # Wishlist toggle and valuation grid
```

---

## Getting Started

### Prerequisites
* Node.js 20.x or higher
* Docker & Docker Compose
* npm 10.x or higher

### Option A: Single-Enter Automated Deployment (Recommended)
Execute the end-to-end orchestration script to spin up the database, install dependencies, run migrations, seed data, and start the application:
```bash
./deploy.sh
```

### Option B: Manual Step-by-Step Setup

1. **Start PostgreSQL Container**:
```bash
docker compose up -d
```

2. **Configure Environment**:
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://valencourt_user:valencourt_pass_2026@localhost:5432/valencourt_catalog?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="valencourt_super_secret_jwt_key_aurelia_city_2026"
NODE_ENV="development"
```

3. **Install Dependencies**:
```bash
npm install
```

4. **Initialize Database Schema & Seed Data**:
```bash
npx prisma db push
node prisma/seed.mjs
```

5. **Start Development Server**:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## Default Evaluator Credentials

The database seed (`prisma/seed.mjs`) provisions three verified evaluation accounts:

| Persona | Email / Identifier | Passphrase | Assigned Portal |
|---|---|---|---|
| Atelier Director | `director@valencourt.atelier` | `ValencourtAtelier2026!` | `/admin/login` -> `/admin` |
| Patron (Helena Vance) | `helena.vance@valencourt.patron` | `PatronVance2026!` | `/patron/login` -> `/patron/wishlist` |
| Patron (Julian Sterling) | `julian.sterling@valencourt.patron` | `PatronJulian2026!` | `/patron/login` -> `/patron/profile` |

---

## Automated Verification & Testing

Run the automated test suite to verify schema validity, contract validation, and server actions:
```bash
./test.sh
```

Or execute discrete test runners directly:
```bash
node test/validation.test.mjs
node test/profile_schemas.test.mjs
```

### Verified Test Assertions:
1. **Atelier Seed Inventory**: Confirms all 6 garments and 4 textile swatches with correct AUR valuations and mill linkages.
2. **Authentication Gate**: Rejects unauthenticated viewing inquiry submissions.
3. **Double-Blind Accolade Cooldown**: Validates that submissions within 30 days are rejected.
4. **Sovereign Retraction**: Verifies that retraction requests mark approved accolades as `RETRACTED`.
5. **Profile & Security Schemas**: Validates email format, phone format, and 8+ character password rotation boundaries.

---

## Production Build Verification

To compile the application bundle for production:
```bash
npm run build
npm start -- -p 3000
```
All routes compile cleanly with zero TypeScript or build errors under Next.js 16.3.5 Turbopack.