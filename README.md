# Rayes Watch — Boutique en ligne

Site e-commerce complet (Next.js + Prisma) : catalogue, panier, commande (paiement à la livraison), gestion de stock et des commandes via un espace admin.

## 1. Installation locale (pour tester sur ton PC)

```bash
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Ouvre http://localhost:3000 — le site tourne en local avec une base SQLite (fichier `dev.db`).

Espace admin : http://localhost:3000/admin — mot de passe dans `.env` (`ADMIN_PASSWORD`, à changer !).

## 2. Mise en ligne réelle (production)

Étapes, dans l'ordre :

### A. Créer une base de données en ligne (gratuite)
1. Va sur https://neon.tech (ou https://supabase.com) et crée un compte gratuit
2. Crée un nouveau projet → copie l'URL de connexion PostgreSQL (`postgresql://...`)

### B. Adapter Prisma au PostgreSQL
Dans `prisma/schema.prisma`, remplace :
```
provider = "sqlite"
```
par :
```
provider = "postgresql"
```

### C. Mettre le code sur GitHub
1. Crée un compte sur https://github.com si tu n'en as pas
2. Crée un nouveau repository (ex: `rayes-watch`)
3. Depuis ton PC :
```bash
git init
git add .
git commit -m "Premier version du site"
git remote add origin https://github.com/TON-USERNAME/rayes-watch.git
git push -u origin main
```

### D. Déployer sur Vercel (gratuit)
1. Va sur https://vercel.com, crée un compte, connecte-le à GitHub
2. "New Project" → choisis le repository `rayes-watch`
3. Dans "Environment Variables", ajoute :
   - `DATABASE_URL` = l'URL PostgreSQL copiée à l'étape A
   - `ADMIN_PASSWORD` = un mot de passe fort à toi
4. Clique "Deploy"

### E. Initialiser la base en production
Une fois déployé, depuis ton PC (avec le `.env` pointant vers la même `DATABASE_URL` de Neon) :
```bash
npx prisma migrate deploy
npm run seed
```

### F. Domaine personnalisé (optionnel)
Dans Vercel → Project → Settings → Domains, ajoute ton nom de domaine (ex: rayeswatch.dz) et suis les instructions pour changer les DNS chez ton fournisseur de domaine.

## Structure du projet
- `app/` — pages (accueil, produit, panier, commande, admin) + API routes
- `prisma/schema.prisma` — modèles de données (Product, Order, OrderItem)
- `prisma/seed.js` — 4 produits de départ (à modifier avec tes vrais produits/prix/photos)
- `lib/cart-context.js` — logique du panier (stockée dans le navigateur)

## À personnaliser avant le lancement
- Remplacer les 4 produits de `prisma/seed.js` par ton vrai catalogue
- Ajouter de vraies photos produits (actuellement ce sont des icônes de cadran générées en CSS)
- Changer `ADMIN_PASSWORD` dans les variables d'environnement Vercel
