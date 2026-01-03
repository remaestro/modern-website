# 🎯 COMMENCEZ ICI - Guide Pas à Pas

Bienvenue ! Ce fichier vous guide étape par étape pour déployer le site sur Netlify.

## 📚 Documentation Disponible

Avant de commencer, voici tous les guides disponibles :

| Fichier | Description |
|---------|-------------|
| **[NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)** | 📘 Guide complet de déploiement Netlify |
| **[QUICK_START.md](./QUICK_START.md)** | ⚡ Guide de démarrage rapide local |
| **[DEPLOYMENT_CHANGES.md](./DEPLOYMENT_CHANGES.md)** | 🔄 Résumé des changements effectués |
| **[NETLIFY_SETUP_SUMMARY.md](./NETLIFY_SETUP_SUMMARY.md)** | ✅ Checklist de configuration |
| **[FILES_CHANGED.md](./FILES_CHANGED.md)** | 📝 Liste des fichiers modifiés |
| **[EMAIL_INTEGRATION_SPECS.md](./EMAIL_INTEGRATION_SPECS.md)** | 📧 Spécifications du système d'email |
| **[GMAIL_SMTP_SETUP.md](./GMAIL_SMTP_SETUP.md)** | 🔧 Configuration Gmail SMTP |

## 🚀 Démarrage en 5 Étapes

### Étape 1️⃣ : Tester Localement (5 min)

```bash
# 1. Installer les dépendances
npm install

# 2. Créer votre fichier .env
cp .env.example .env
# Puis éditer .env avec vos credentials Gmail

# 3. Lancer le serveur de développement
netlify dev

# 4. Ouvrir http://localhost:8888/modern-website/

# 5. Tester un formulaire pour vérifier les emails
```

✅ **Test réussi ?** Passez à l'étape 2  
❌ **Problème ?** Consultez [QUICK_START.md](./QUICK_START.md)

---

### Étape 2️⃣ : Créer le Site Netlify (5 min)

1. **Allez sur** https://netlify.com
2. **Connectez-vous** avec votre compte GitHub
3. **Cliquez** sur "Add new site" → "Import an existing project"
4. **Sélectionnez** GitHub → `modern-website`
5. **Configuration :**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Branch: `main`
6. **Cliquez** "Deploy site"

📝 **Notez :**
- ✅ L'URL de votre site : `https://XXXX.netlify.app`
- ✅ Le Site ID (dans Site settings)

---

### Étape 3️⃣ : Récupérer les Tokens Netlify (3 min)

#### A. NETLIFY_AUTH_TOKEN
1. https://app.netlify.com/user/applications
2. "New access token"
3. Nom : `GitHub Actions Deploy`
4. **Copiez le token** 📋

#### B. NETLIFY_SITE_ID
1. Votre site → Site settings → General
2. **Copiez le Site ID** 📋

---

### Étape 4️⃣ : Configurer GitHub (5 min)

#### A. Ajouter les Secrets GitHub
1. **Allez sur** votre repo GitHub
2. **Settings → Secrets and variables → Actions**
3. **"New repository secret"**

Ajoutez ces 2 secrets :

```
Nom: NETLIFY_AUTH_TOKEN
Value: [Le token de l'étape 3A]
```

```
Nom: NETLIFY_SITE_ID
Value: [Le Site ID de l'étape 3B]
```

#### B. Vérifier que le workflow existe
Le fichier `.github/workflows/netlify-deploy.yml` doit être présent ✅

---

### Étape 5️⃣ : Configurer Netlify Production (3 min)

1. **Sur Netlify :** Site settings → Environment variables
2. **Ajoutez ces 2 variables :**

```bash
GMAIL_USER = adioyerm@gmail.com
GMAIL_APP_PASSWORD = auiuxdsbluezdiin
```

⚠️ **IMPORTANT :** Ces credentials permettent d'envoyer les emails !

---

## 🎉 Déployer !

Tout est configuré ? Déployez maintenant :

```bash
git add .
git commit -m "feat: Configure Netlify deployment with email functionality"
git push origin main
```

## 🔍 Vérifications

### 1. GitHub Actions
- https://github.com/VOTRE_USERNAME/modern-website/actions
- ✅ Le workflow doit être "🟢 Success"

### 2. Netlify
- https://app.netlify.com/sites/VOTRE_SITE/deploys
- ✅ Le déploiement doit être "Published"

### 3. Site Live
- Ouvrez votre URL Netlify
- ✅ Le site doit charger correctement

### 4. Test Email
- Remplissez un formulaire sur le site live
- ✅ Email reçu sur `infos@digita-energy.com` et `ra@digita-energy.com`

## ❓ Besoin d'Aide ?

### Problèmes Courants

| Problème | Solution |
|----------|----------|
| Build failed sur GitHub Actions | Vérifiez les logs GitHub Actions |
| Fonction email error 500 | Vérifiez les variables env sur Netlify |
| Email non reçu | Vérifiez les logs : Netlify → Functions → send-email |
| 404 sur /api/send-email | Les variables env ne sont pas configurées |

### Documentation Détaillée

Pour plus de détails, consultez :
- 📘 [Guide Complet Netlify](./NETLIFY_DEPLOYMENT.md)
- ⚡ [Guide Démarrage Rapide](./QUICK_START.md)
- ❓ Section "Dépannage" dans chaque guide

## ✅ Checklist Complète

Cochez au fur et à mesure :

- [ ] Test local réussi avec `netlify dev`
- [ ] Compte Netlify créé
- [ ] Site Netlify créé
- [ ] `NETLIFY_AUTH_TOKEN` récupéré
- [ ] `NETLIFY_SITE_ID` récupéré
- [ ] Secrets GitHub ajoutés (2)
- [ ] Variables Netlify configurées (2)
- [ ] Code poussé sur GitHub
- [ ] GitHub Actions réussi (🟢)
- [ ] Site déployé sur Netlify
- [ ] Email de test reçu

## 🎯 Prochaines Étapes (Optionnel)

Une fois déployé avec succès :
- [ ] Configurer un domaine custom (digita-energy.com)
- [ ] Activer les notifications de déploiement
- [ ] Configurer les analytics Netlify
- [ ] Ajouter un badge de statut au README

---

**Temps total estimé :** 20-30 minutes  
**Difficulté :** ⭐⭐☆☆☆ Facile

**Prêt ?** Commencez par l'Étape 1 ! 🚀
