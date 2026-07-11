
# Muscat Meditex — Professional Showcase Website

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.x-F69220?style=for-the-badge&logo=pnpm)](https://pnpm.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)]()

---

**Live Demo**  
👉 [**meditex-app-frontend.vercel.app**](https://meditex-app-frontend.vercel.app)  
*Click the link above to explore the bilingual showcase site.*

---

## Overview

**Muscat Meditex** is a bilingual (Arabic/English) showcase website with an admin panel for a professional uniform supplier based in Muscat, Oman.  
It features a modern, responsive design, RTL/LTR support, and a full‑fledged content management system.

---

## Project Structure
muscat-meditex/
├── artifacts/
│ ├── frontend/ ← React application (public showcase site)
│ └── backend/ ← Express API (server + admin panel)
├── lib/
│ ├── db/ ← PostgreSQL schema (Drizzle ORM)
│ ├── api-spec/ ← OpenAPI specification
│ ├── api-zod/ ← Generated Zod schemas
│ └── api-client-react/ ← Generated React Query hooks
├── scripts/ ← Utility scripts
└── README.md

text

---

## Prerequisites

- **Node.js** `v24+`
- **pnpm** `v10+` (`npm install -g pnpm`)
- **PostgreSQL** database (local or cloud)

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd muscat-meditex

# Install all dependencies (workspaces)
pnpm install
Environment Variables
Create a .env file at the root or set these variables in your environment:

Variable	Description	Example
DATABASE_URL	PostgreSQL connection URL	postgresql://user:pass@host/db
SESSION_SECRET	Secret key for admin sessions	a-long-random-string
ADMIN_PASSWORD	Admin panel password	myPassword
Running the Project
Frontend (showcase site)
bash
cd artifacts/frontend
pnpm dev
Backend (API + admin)
bash
cd artifacts/backend
pnpm dev
Database Migration
bash
cd lib/db
pnpm run push
Deployment / Replit
The project is configured for Replit using the .replit file.

Required secrets in the Replit environment: DATABASE_URL, SESSION_SECRET, ADMIN_PASSWORD.

The .replitignore excludes the .local folder to reduce build size.

Features
Public Site
Bilingual Arabic/English with RTL/LTR toggle

6 uniform collections: Corporate, Healthcare, Hospitality, Industrial, Security, School

Collection detail pages with product galleries

"Find Us" section with an SVG map of Muscat, address, and opening hours

Contact form via WhatsApp / Email / Instagram

Admin Panel (/admin)
Password‑protected login

Text editor – Modify all site texts in both languages

Collection manager – Titles, subtitles, cover images

Product manager – Name, description (EN+AR), images

Image upload – Replace images in real time

Tech Stack
Layer	Technology
Frontend	React 19, Vite, TypeScript, Tailwind CSS v4
UI	shadcn/ui, Radix UI, Framer Motion
Routing	Wouter
Backend	Express 5, Node.js 24, TypeScript
Auth	express-session
Upload	Multer
Database	PostgreSQL, Drizzle ORM
Monorepo	pnpm workspaces
Delivered by
Developed for Muscat Meditex — The standard for professional uniforms in Oman.



