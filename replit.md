# Muscat Meditex — Vitrine Pro

Site vitrine bilingue (AR/EN) + panel admin pour la société de tenues professionnelles Muscat Meditex (Oman).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — API backend (port 8080)
- `pnpm --filter @workspace/uniforms-vitrine run dev` — Frontend vitrine (port 25595)
- `pnpm run typecheck` — typecheck complet
- `pnpm --filter @workspace/db run push` — pousser le schéma DB (dev uniquement)
- Env requis : `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD`

## Structure du projet

```
artifacts/
  uniforms-vitrine/   ← Frontend React+Vite (site public)
  api-server/         ← Backend Express (API + admin)
lib/
  db/                 ← Schéma PostgreSQL + Drizzle ORM
  api-spec/           ← Spécification OpenAPI
  api-zod/            ← Schémas Zod générés
  api-client-react/   ← Hooks React Query générés
```

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend : React 19, Vite, Tailwind CSS v4, shadcn/ui, framer-motion, wouter
- Backend : Express 5, express-session, multer
- DB : PostgreSQL + Drizzle ORM
- Auth admin : session cookie + `ADMIN_PASSWORD` env var

## Fonctionnalités

- Site public bilingue AR/EN avec toggle RTL/LTR
- 6 collections de tenues avec pages détail et images produits
- Section "Nous trouver" avec carte SVG stylisée de Muscat
- **Panel admin** accessible sur `/admin` :
  - Connexion protégée (mot de passe via env `ADMIN_PASSWORD`, défaut : `admin1234`)
  - Éditeur de textes bilingues (hero, about, contact, footer…)
  - Gestionnaire de collections (titre, sous-titre, images de couverture)
  - Gestionnaire de produits par collection (nom, description, image)
  - Upload d'images (sauvegardées dans `artifacts/api-server/public/uploads/`)

## Schéma DB

- `site_content` — textes clé/valeur bilingues (EN + AR)
- `collections_content` — métadonnées des 6 collections
- `products_content` — produits par collection

## User preferences

- Interface admin en français
- Branding : vert royal (#1B4332) + or/sable (#B8960C)
- Bilinguisme AR/EN partout, RTL pour l'arabe

## Gotchas

- Après modification du schéma DB, relancer `pnpm --filter @workspace/db run push`
- Le frontend charge le contenu depuis l'API ; en cas d'échec, il utilise les données statiques de `data.ts`
- Les images uploadées sont servies par l'API à `/api/uploads/<filename>`
- Changer `ADMIN_PASSWORD` via les secrets Replit (onglet "Secrets")
