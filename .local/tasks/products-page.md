# Page Produits avec Catégories Cliquables

## What & Why
Créer une page `/products` dédiée avec un catalogue étendu de vêtements. Chaque carte de catégorie sur la page d'accueil (Healthcare, Corporate, etc.) devient cliquable et ouvre la page produits directement filtrée sur cette catégorie.

## Done looks like
- Cliquer sur une carte de catégorie (ex: "Healthcare & Medical") sur la page d'accueil navigue vers `/products?category=healthcare` et affiche uniquement les articles healthcare
- Cliquer sur "Products" dans la navbar navigue vers `/products` (toutes catégories)
- La page produits affiche des boutons filtres en haut : "All" + les 6 catégories
- Le filtre actif est pré-sélectionné selon le paramètre URL
- Chaque catégorie contient 4-6 articles individuels (ex. Healthcare : scrubs, lab coat, surgical cap, nurse uniform, patient gown, protective apron)
- Chaque article affiche une image (réutilisée depuis la catégorie), un nom et une courte description
- Sélectionner un autre filtre met à jour l'affichage instantanément sans rechargement
- Tout est bilingue EN/AR avec le même système existant
- La navbar et le footer sont présents sur la page produits
- Les cartes de catégorie sur la page d'accueil ont un style "cliquable" (curseur pointer, hover visible) et un lien vers la page filtrée

## Out of scope
- Panier d'achat ou checkout
- Pages de détail par article individuel
- Nouvelles images réelles (réutiliser l'image de la catégorie parente pour chaque sous-article)

## Steps
1. **Enrichir les données** — Dans `src/lib/data.ts`, ajouter sous chaque catégorie une liste `subItems` avec 4-6 articles individuels (nom EN+AR, description courte EN+AR, et un `id` de catégorie comme `"healthcare"`). Couvrir les 6 catégories.

2. **Créer la page produits** — Créer `src/pages/products.tsx` : page avec Navbar + Footer, header titre, boutons filtres (All + 6 catégories), et grille d'articles. Lire le paramètre `?category=` de l'URL (via `useSearch` de wouter) pour pré-sélectionner le filtre au chargement. Animations framer-motion cohérentes avec le reste du site.

3. **Ajouter la route** — Dans `src/App.tsx`, importer et enregistrer `ProductsPage` sur la route `/products`.

4. **Mettre à jour la navigation** — Dans `src/components/layout/Navbar.tsx`, changer le lien "Products" en `<Link href="/products">` (wouter). Idem dans le Footer si applicable.

5. **Rendre les cartes cliquables** — Dans `src/components/sections/Products.tsx`, envelopper chaque carte de catégorie dans un `<Link href="/products?category=<id>">`. Ajouter `cursor-pointer` et améliorer le hover pour indiquer la cliquabilité. Ajouter un bouton "View All" sous la grille.

## Relevant files
- `artifacts/uniforms-vitrine/src/lib/data.ts`
- `artifacts/uniforms-vitrine/src/pages/not-found.tsx`
- `artifacts/uniforms-vitrine/src/App.tsx`
- `artifacts/uniforms-vitrine/src/components/layout/Navbar.tsx`
- `artifacts/uniforms-vitrine/src/components/layout/Footer.tsx`
- `artifacts/uniforms-vitrine/src/components/sections/Products.tsx`
- `artifacts/uniforms-vitrine/src/context/LanguageContext.tsx`
