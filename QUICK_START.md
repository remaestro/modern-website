# 🚀 Guide de Démarrage Rapide

## 📦 Installation

```bash
# 1. Cloner le projet
git clone https://github.com/VOTRE_USERNAME/modern-website.git
cd modern-website

# 2. Installer les dépendances
npm install

# 3. Créer le fichier .env
cp .env.example .env
# Puis éditer .env avec vos credentials Gmail
```

## ⚙️ Configuration Locale

### Fichier `.env`
```bash
GMAIL_USER=adioyerm@gmail.com
GMAIL_APP_PASSWORD=auiuxdsbluezdiin
```

## 🧪 Développement Local

### Option 1 : Sans emails (Frontend seulement)
```bash
npm run dev
# Ouvre http://localhost:5173
# ⚠️ Les formulaires échoueront (pas d'API backend)
```

### Option 2 : Avec emails (Netlify Dev - RECOMMANDÉ)
```bash
netlify dev
# Ouvre http://localhost:8888
# ✅ Fonctions serverless + Emails fonctionnent !
```

## 🏗️ Build

```bash
npm run build
# Génère le dossier /dist
```

## 🧪 Tests

```bash
# Tests Playwright
npm run test

# Tests avec UI
npm run test:ui

# Tests headless
npm run test:headless
```

## 📧 Tester l'envoi d'emails localement

1. Lancez `netlify dev`
2. Allez sur http://localhost:8888/modern-website/
3. Remplissez un formulaire (ex: Transformateurs)
4. Soumettez le formulaire
5. Vérifiez votre email `infos@digita-energy.com`

## 🚀 Déployer en Production

### Première fois
Suivre le guide complet : **[NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)**

### Déploiements suivants
```bash
git add .
git commit -m "feat: Votre message"
git push origin main
# → Déploiement automatique sur Netlify !
```

## 📁 Structure du Projet

```
modern-website/
├── src/
│   ├── components/        # Composants React
│   ├── services/          # Services (email, etc.)
│   ├── digital/           # Pages services digitaux
│   └── main.tsx          # Point d'entrée
├── netlify/
│   └── functions/        # Fonctions serverless
│       └── send-email.mjs # API envoi email
├── public/               # Assets statiques
├── tests/                # Tests Playwright
├── .env                  # Variables locales (PAS dans Git)
├── netlify.toml         # Config Netlify
└── vite.config.ts       # Config Vite

```

## 🆘 Problèmes Courants

### ❌ "Cannot find module 'nodemailer'"
```bash
npm install
```

### ❌ "Missing credentials for PLAIN"
→ Vérifiez que `.env` existe et contient les bonnes variables
→ Relancez `netlify dev` après modification du `.env`

### ❌ "POST http://localhost:5173/api/send-email 404"
→ Utilisez `netlify dev` au lieu de `npm run dev`

### ❌ "The server responded with 404 (Not Found)"
→ Vous êtes sur Vite seul. Utilisez `netlify dev` !

## 📚 Documentation Complète

- 📖 [Guide Déploiement Netlify](./NETLIFY_DEPLOYMENT.md)
- 🔄 [Changements de Déploiement](./DEPLOYMENT_CHANGES.md)
- 📧 [Configuration Gmail SMTP](./GMAIL_SMTP_SETUP.md)
- 📝 [Spécifications Email](./EMAIL_INTEGRATION_SPECS.md)

## 🎯 Commandes Utiles

```bash
# Dev avec backend
netlify dev

# Dev frontend seulement
npm run dev

# Build
npm run build

# Preview du build
npm run preview

# Tests
npm run test

# Linter
npm run lint

# Login Netlify
netlify login

# Status Netlify
netlify status
```

## 🔑 Variables d'Environnement

### Local (`.env`)
```bash
GMAIL_USER=adioyerm@gmail.com
GMAIL_APP_PASSWORD=auiuxdsbluezdiin
```

### GitHub Secrets
```bash
NETLIFY_AUTH_TOKEN=[Token Netlify]
NETLIFY_SITE_ID=[ID du site]
```

### Netlify (Production)
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

---

**Besoin d'aide ?** Consultez [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
