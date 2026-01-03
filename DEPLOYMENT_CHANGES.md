# 🔄 Changements de Déploiement

## 📝 Résumé

**Migration de GitHub Pages vers Netlify** pour supporter les fonctions serverless (envoi d'emails).

## ✅ Ce qui a été fait

### 1. **Infrastructure Netlify**
- ✅ `netlify.toml` - Configuration Netlify
- ✅ `netlify/functions/send-email.mjs` - Fonction serverless Gmail SMTP
- ✅ `.github/workflows/netlify-deploy.yml` - CI/CD automatique

### 2. **Système d'emails**
- ✅ Service email unifié (`src/services/emailService.ts`)
- ✅ Support de 2 destinataires : `infos@digita-energy.com` + `ra@digita-energy.com`
- ✅ Templates HTML pour tous les types de formulaires
- ✅ Retry automatique (3 tentatives)

### 3. **Formulaires intégrés**
Tous les formulaires envoient maintenant des emails :
- ✅ Transformateurs
- ✅ Installations électriques
- ✅ Audit énergétique
- ✅ Maintenance
- ✅ Consultation générale
- ✅ Applications mobiles
- ✅ Analyse de données
- ✅ Cloud & infrastructure

### 4. **Configuration requise**

#### Variables d'environnement (`.env`)
```bash
GMAIL_USER=adioyerm@gmail.com
GMAIL_APP_PASSWORD=auiuxdsbluezdiin
```

#### Secrets GitHub
```bash
NETLIFY_AUTH_TOKEN=[À configurer]
NETLIFY_SITE_ID=[À configurer]
```

#### Variables Netlify (Production)
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

## 🚨 Important : Différences GitHub Pages vs Netlify

### ❌ GitHub Pages (Ancien)
- ❌ Pas de backend/fonctions
- ❌ Pas d'envoi d'emails
- ❌ Statique seulement
- ✅ Gratuit et simple

### ✅ Netlify (Nouveau)
- ✅ Fonctions serverless
- ✅ Envoi d'emails fonctionnel
- ✅ Variables d'environnement
- ✅ Preview deployments
- ✅ GRATUIT (100GB/mois)

## 📋 Checklist de Déploiement

Avant de pousser sur GitHub :

- [ ] Les variables d'environnement sont dans `.env` (PAS dans Git)
- [ ] `.env` est dans `.gitignore`
- [ ] Compte Netlify créé
- [ ] Site Netlify créé
- [ ] `NETLIFY_AUTH_TOKEN` ajouté dans GitHub Secrets
- [ ] `NETLIFY_SITE_ID` ajouté dans GitHub Secrets
- [ ] Variables env configurées sur Netlify
- [ ] Tests locaux avec `netlify dev` réussis

## 🎯 Prochaines étapes

1. **Suivre le guide** : [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
2. **Tester localement** : `netlify dev`
3. **Pousser sur GitHub** : Le déploiement sera automatique
4. **Vérifier** : Site live + Emails fonctionnels

## 🔗 Liens utiles

- Guide détaillé : [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)
- Configuration SMTP : [GMAIL_SMTP_SETUP.md](./GMAIL_SMTP_SETUP.md)
- Spécifications emails : [EMAIL_INTEGRATION_SPECS.md](./EMAIL_INTEGRATION_SPECS.md)

## ⚠️ À NE PAS FAIRE

- ❌ Ne jamais commiter `.env`
- ❌ Ne jamais mettre les credentials Gmail dans le code
- ❌ Ne pas déployer sur GitHub Pages (les emails ne fonctionneront pas)
- ❌ Ne pas oublier de configurer les secrets GitHub

---

**Date de migration** : 3 Janvier 2026  
**Raison** : Support des fonctions serverless pour l'envoi d'emails
