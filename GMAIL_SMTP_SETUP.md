# 🔧 Configuration Gmail SMTP - Guide Complet

## ✅ Ce qu'on a fait

1. ✅ Installé `nodemailer`
2. ✅ Modifié la fonction Netlify pour utiliser Gmail SMTP
3. ✅ Configuré le destinataire : `infos@digita-energy.com`

---

## 📝 Configuration Gmail (À FAIRE)

### **Étape 1 : Créer un App Password Gmail**

⚠️ **Important** : Vous **NE DEVEZ PAS** utiliser votre mot de passe Gmail normal !

#### **Prérequis**
- Compte Gmail avec **2FA activé** (obligatoire pour les App Passwords)

#### **Procédure**

1. **Allez sur** : https://myaccount.google.com/security

2. **Activez 2FA** si ce n'est pas fait :
   - Cliquez sur "2-Step Verification"
   - Suivez les instructions

3. **Créez un App Password** :
   - Dans la section "2-Step Verification"
   - Scrollez jusqu'à "App passwords"
   - Cliquez sur "App passwords"
   - Sélectionnez "Mail" et "Other (Custom name)"
   - Entrez : `Digita Energy Website`
   - Cliquez "Generate"
   
4. **Copiez le password** (16 caractères sans espaces)
   - Format : `abcd efgh ijkl mnop`
   - Gardez-le précieusement !

---

### **Étape 2 : Configurer les Variables d'Environnement**

#### **En local (.env)**

Modifiez le fichier `.env` :

```bash
RESEND_API_KEY=re_R6P4vt3o_AcSdAq8msmX5FtrNXdTiwo5J
GMAIL_USER=votre-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

⚠️ **Remplacez** :
- `votre-email@gmail.com` → l'email Gmail que vous utilisez
- `abcdefghijklmnop` → le App Password généré (sans espaces)

#### **Sur Netlify (Production)**

1. **Allez sur** : https://app.netlify.com
2. **Sélectionnez votre site** → `Settings` → `Environment variables`
3. **Ajoutez** :
   ```
   Key: GMAIL_USER
   Value: votre-email@gmail.com
   
   Key: GMAIL_APP_PASSWORD
   Value: abcdefghijklmnop
   ```

---

### **Étape 3 : Redémarrer Netlify Dev**

```bash
# Arrêtez netlify dev (Ctrl+C)
# Puis relancez
netlify dev
```

---

## 🧪 Test

1. **Allez sur** : http://localhost:8888/modern-website/products/transformers
2. **Remplissez le formulaire**
3. **Soumettez**
4. **Vérifiez** : `infos@digita-energy.com` devrait recevoir l'email

---

## 🔍 Dépannage

### Erreur : "Invalid login"
→ Vérifiez que le App Password est correct (sans espaces)
→ Assurez-vous que 2FA est activé sur Gmail

### Erreur : "Username and Password not accepted"
→ Vous utilisez peut-être le mot de passe normal au lieu du App Password
→ Régénérez un nouveau App Password

### Email non reçu
→ Vérifiez les spams de `infos@digita-energy.com`
→ Vérifiez les logs de netlify dev dans le terminal

### CORS Error
→ Normal en local, ça fonctionnera en production

---

## 📊 Limite Gmail

- **500 emails/jour** en gratuit
- **2000 emails/jour** avec Google Workspace
- Largement suffisant pour votre usage !

---

## ✅ Checklist

- [ ] 2FA activé sur Gmail
- [ ] App Password généré
- [ ] `.env` mis à jour avec `GMAIL_USER` et `GMAIL_APP_PASSWORD`
- [ ] Netlify Dev redémarré
- [ ] Test formulaire effectué
- [ ] Email reçu sur `infos@digita-energy.com`

---

## 🚀 Prochaines Étapes

Une fois les tests validés en local :

1. **Déployer sur Netlify** avec les variables d'environnement
2. **Tester en production**
3. **Documenter le processus**

Besoin d'aide ? Faites-moi signe ! 🙋‍♂️
