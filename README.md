# Digita Energy - Modern Website

Site web moderne pour Digita Energy avec système de formulaires et envoi d'emails automatique.

## 🚀 Démarrage Rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# 3. Lancer le serveur de développement
netlify dev
```

📖 **[→ COMMENCEZ ICI - Guide Pas à Pas](./START_HERE.md)**

## 🚀 Déploiement

Ce projet est déployé automatiquement sur **Netlify** via **GitHub Actions**.

- 📘 [Guide Complet Netlify](./NETLIFY_DEPLOYMENT.md)
- ⚡ [Guide Démarrage Rapide](./QUICK_START.md)
- ✅ [Checklist de Configuration](./NETLIFY_SETUP_SUMMARY.md)
- 📝 [Fichiers Modifiés](./FILES_CHANGED.md)

## 🛠️ Stack Technique

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Forms:** React Hook Form
- **Email:** Gmail SMTP via Netlify Functions
- **Deployment:** GitHub Actions → Netlify
- **Tests:** Playwright

## 📧 Fonctionnalités

- ✅ 8 formulaires de contact avec envoi d'email automatique
- ✅ Templates HTML professionnels
- ✅ Retry automatique (3 tentatives)
- ✅ Envoi à 2 destinataires : `infos@digita-energy.com` + `ra@digita-energy.com`
- ✅ Déploiement automatique sur Netlify
- ✅ Tests Playwright

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| **[START_HERE.md](./START_HERE.md)** | 🎯 Commencez ici - Guide pas à pas |
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Démarrage rapide |
| **[NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)** | 📘 Déploiement Netlify |
| **[EMAIL_INTEGRATION_SPECS.md](./EMAIL_INTEGRATION_SPECS.md)** | 📧 Spécifications email |
| **[DEPLOYMENT_CHANGES.md](./DEPLOYMENT_CHANGES.md)** | 🔄 Changements effectués |

## 🧪 Tests

```bash
# Tests Playwright
npm run test

# Tests avec UI
npm run test:ui
```

## 📄 Licence

MIT
