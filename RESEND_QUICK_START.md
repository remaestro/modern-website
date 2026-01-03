# 🚀 QUICK START - RESEND EMAIL

## ✅ CE QUI EST FAIT

1. ✅ Package Resend installé
2. ✅ Service email mis à jour (src/services/emailService.ts)
3. ✅ Config mise à jour (src/config/email.ts)
4. ✅ Netlify Function créée (netlify/functions/send-email.js)
5. ✅ TransformersPage prêt à tester

## 🎯 POUR TESTER MAINTENANT (5 min)

### Option 1: Test local simple (SANS Netlify - voir les données)

```bash
npm run dev
```

1. Aller sur http://localhost:5173/modern-website/products/transformers
2. Remplir le formulaire
3. Soumettre
4. **Résultat**: Erreur (fetch vers /api/send-email échoue) mais données loggées dans console ✓

### Option 2: Test avec Netlify CLI (VRAI envoi d'email)

```bash
# 1. Installer Netlify CLI
npm install -g netlify-cli

# 2. Créer .env à la racine
cat > .env << 'ENVFILE'
RESEND_API_KEY=re_votre_cle_resend_ici
ENVFILE

# 3. Lancer avec Netlify
netlify dev
```

Aller sur http://localhost:8888 (pas 5173!)
Le formulaire enverra un VRAI email !

---

## 🔑 OBTENIR CLÉ RESEND (2 min)

1. https://resend.com/signup
2. Vérifier email
3. Dashboard → API Keys
4. Create API Key
5. Copier la clé (re_...)
6. Mettre dans .env

---

## 📧 CE QUI SE PASSE

```
Utilisateur remplit formulaire
         ↓
handleSubmit() appelé
         ↓
emailService.send()
         ↓
fetch('/api/send-email')  ← appel API
         ↓
netlify/functions/send-email.js  ← fonction serverless
         ↓
Resend API  ← envoi réel
         ↓
Email reçu sur adioyerm@gmail.com ✉️
```

---

## ⚡ TEST ULTRA-RAPIDE

Sans config, juste pour voir l'UI:

```bash
npm run dev
# Aller sur /products/transformers
# Remplir formulaire
# Soumettre
# Console.log montrera toutes les données
```

Avec Resend (envoi réel):

1. Créer compte Resend (1 min)
2. Copier clé API
3. Mettre dans .env
4. `netlify dev`
5. Tester !

---

## 📁 FICHIERS MODIFIÉS

- src/config/email.ts ← Config Resend
- src/services/emailService.ts ← Appel API
- netlify/functions/send-email.js ← Serverless function
- netlify.toml ← Config Netlify

TransformersPage utilise déjà le système!

---

**Quelle option voulez-vous tester?**
A) Juste voir l'UI (npm run dev)
B) Vrai envoi email (netlify dev + clé Resend)
