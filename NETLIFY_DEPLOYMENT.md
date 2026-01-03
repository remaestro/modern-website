# 🚀 Guide de Déploiement Netlify avec GitHub Actions

## 📋 Vue d'ensemble

Ce projet est configuré pour se déployer **automatiquement sur Netlify** via **GitHub Actions** à chaque push sur la branche principale.

## ✅ Étapes de Configuration

### 1. **Créer un compte Netlify**
- Allez sur https://netlify.com
- Connectez-vous avec votre compte GitHub

### 2. **Créer un nouveau site Netlify**

#### Option A : Via l'interface web (RECOMMANDÉ)
1. Cliquez sur **"Add new site" → "Import an existing project"**
2. Choisissez **GitHub**
3. Sélectionnez le repo `modern-website`
4. Configuration du build :
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Branch to deploy:** `main`
5. Cliquez sur **"Deploy site"**

#### Option B : Via CLI
```bash
netlify login
netlify init
```

### 3. **Récupérer les tokens Netlify**

#### A. NETLIFY_AUTH_TOKEN
1. Allez sur https://app.netlify.com/user/applications
2. Cliquez sur **"New access token"**
3. Nommez-le : `GitHub Actions Deploy`
4. Copiez le token généré

#### B. NETLIFY_SITE_ID
1. Allez sur votre site Netlify
2. **Site settings → General → Site details**
3. Copiez le **"Site ID"** (format : `abc12345-6789-0def-ghij-klmnopqrstuv`)

### 4. **Ajouter les secrets GitHub**

1. Allez sur votre repo GitHub : `https://github.com/VOTRE_USERNAME/modern-website`
2. **Settings → Secrets and variables → Actions**
3. Cliquez sur **"New repository secret"**
4. Ajoutez ces 2 secrets :

   **Secret 1:**
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: `[Le token de l'étape 3A]`

   **Secret 2:**
   - Name: `NETLIFY_SITE_ID`
   - Value: `[Le Site ID de l'étape 3B]`

### 5. **Configurer les variables d'environnement sur Netlify**

Pour que les emails fonctionnent en production :

1. Sur Netlify : **Site settings → Environment variables**
2. Ajoutez ces variables :

```bash
GMAIL_USER=adioyerm@gmail.com
GMAIL_APP_PASSWORD=auiuxdsbluezdiin
```

⚠️ **IMPORTANT** : Ne JAMAIS commiter ces credentials dans Git !

### 6. **Tester le déploiement**

```bash
git add .
git commit -m "feat: Configure Netlify deployment"
git push origin main
```

Vérifiez :
- ✅ GitHub Actions : `https://github.com/VOTRE_USERNAME/modern-website/actions`
- ✅ Netlify : `https://app.netlify.com/sites/VOTRE_SITE/deploys`

## 🔄 Workflow automatique

Une fois configuré, **chaque push sur `main`** déclenche :

1. ✅ Build du projet
2. ✅ Tests (si configurés)
3. ✅ Déploiement sur Netlify
4. ✅ Preview deployments pour les Pull Requests

## 🌐 Accéder au site

Après le premier déploiement :
- URL temporaire : `https://RANDOM-NAME.netlify.app`
- Vous pouvez configurer un domaine custom dans Netlify

## 📧 Vérifier les emails

1. Testez un formulaire sur le site déployé
2. Vérifiez les logs Netlify : **Site → Functions → send-email**
3. Consultez votre boîte email `infos@digita-energy.com`

## 🆘 Dépannage

### ❌ Erreur : "NETLIFY_AUTH_TOKEN not found"
→ Vérifiez que le secret est bien ajouté dans GitHub Settings

### ❌ Erreur : "Build failed"
→ Vérifiez les logs GitHub Actions pour voir l'erreur exacte

### ❌ Emails non reçus
→ Vérifiez les variables d'environnement sur Netlify
→ Consultez les logs de la fonction : Netlify → Functions → send-email

## 📚 Ressources

- [Netlify Docs](https://docs.netlify.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

## 🎯 Prochaines étapes

Une fois déployé avec succès :
- [ ] Configurer un nom de domaine custom
- [ ] Activer HTTPS (automatique sur Netlify)
- [ ] Configurer les notifications de déploiement
- [ ] Ajouter un badge de statut au README
