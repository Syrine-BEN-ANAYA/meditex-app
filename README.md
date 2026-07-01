
# Muscat Meditex — Professional Showcase Website

Bilingual (Arabic / English) showcase website with an admin panel for Muscat Meditex, a supplier of professional uniforms based in Muscat, Oman.

---

## Project Structure

```
muscat-meditex/
├── artifacts/
│   ├── frontend/          ← React application (public showcase site)
│   └── backend/           ← Express API (server + admin panel)
├── lib/
│   ├── db/                ← PostgreSQL schema (Drizzle ORM)
│   ├── api-spec/          ← OpenAPI specification
│   ├── api-zod/           ← Generated Zod schemas
│   └── api-client-react/  ← Generated React Query hooks
├── scripts/               ← Utility scripts
└── README.md
```

---

## Prerequisites

- **Node.js** v24+
- **pnpm** v10+ (`npm install -g pnpm`)
- **PostgreSQL** (database)

---

## Installation

```bash
# Clone the project
git clone <repo-url>
cd muscat-meditex

# Install dependencies
pnpm install
```

---

## Environment Variables

Create a `.env` file at the root or configure these variables:

| Variable          | Description                              | Example                              |
|-------------------|------------------------------------------|--------------------------------------|
| `DATABASE_URL`    | PostgreSQL connection URL                | `postgresql://user:pass@host/db`     |
| `SESSION_SECRET`  | Secret key for admin sessions            | `a-long-random-string`               |
| `ADMIN_PASSWORD`  | Admin panel password                     | `myPassword`                         |

---

## Running the Project

### Frontend (showcase site)
```bash
cd artifacts/frontend
pnpm dev
# Available at http://localhost:5173
```

### Backend (API + admin)
```bash
cd artifacts/backend
pnpm dev
# Available at http://localhost:3000
```

### Database Migration
```bash
cd lib/db
pnpm run push
```

### Deployment / Replit
- The project is designed to work with Replit using the configuration in [.replit](.replit).
- The required secrets to set in the Replit environment are: `DATABASE_URL`, `SESSION_SECRET`, and `ADMIN_PASSWORD`.
- The [.replitignore](.replitignore) file excludes the `.local` folder from the build/deployment to reduce image size.

---

## Features

### Public Site
- **Bilingual showcase** Arabic / English with RTL/LTR toggle
- **6 uniform collections**: Corporate, Healthcare, Hospitality, Industrial, Security, School
- **Collection detail pages** with product galleries
- **"Find Us"** section with an SVG map of Muscat, address, and opening hours
- **Contact form** via WhatsApp / Email / Instagram

### Admin Panel (`/admin`)
- Password-protected login
- **Text editor**: Modify all site texts in both English and Arabic
- **Collection manager**: Titles, subtitles, cover images
- **Product manager**: Name, description (EN+AR), images
- **Image upload**: Replace images in real time

---

## Tech Stack

| Layer     | Technology                                 |
|-----------|--------------------------------------------|
| Frontend  | React 19, Vite, TypeScript, Tailwind CSS v4 |
| UI        | shadcn/ui, Radix UI, Framer Motion         |
| Routing   | Wouter                                     |
| Backend   | Express 5, Node.js 24, TypeScript          |
| Auth      | express-session                            |
| Upload    | Multer                                     |
| Database  | PostgreSQL, Drizzle ORM                    |
| Monorepo  | pnpm workspaces                            |

---
-

## Delivered by

Developed for **Muscat Meditex** — The standard for professional uniforms in Oman.
```

