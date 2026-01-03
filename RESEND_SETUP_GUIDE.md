# GUIDE D'INSTALLATION RESEND - DIGITA ENERGY

## 🚀 AVANTAGES DE RESEND

✅ **100 emails/jour GRATUITS** (3000/mois)
✅ **Meilleure délivrabilité** que EmailJS
✅ **Emails professionnels** (votre domaine)
✅ **API simple et moderne**
✅ **Analytics intégrés**
✅ **Pas de templates à créer** (HTML directement)

---

## 📋 SETUP RAPIDE (10 minutes)

### Étape 1: Créer compte Resend (2 min)

1. Aller sur https://resend.com/signup
2. S'inscrire avec email
3. Vérifier l'email

### Étape 2: Obtenir la clé API (1 min)

1. Dashboard → API Keys
2. Cliquer "Create API Key"
3. Nom: "Digita Energy Production"
4. Permission: "Sending access"
5. Copier la clé (commence par `re_...`)

### Étape 3: Configuration locale (2 min)

Créer `.env` à la racine du projet:

```bash
# Backend (Netlify Functions)
RESEND_API_KEY=re_votre_cle_ici

# Frontend (optionnel pour dev)
VITE_RESEND_API_KEY=re_votre_cle_ici
```

**⚠️ IMPORTANT**: Ajouter `.env` au `.gitignore` !

### Étape 4: Configuration Netlify (5 min)

#### Option A: Deploy sur Netlify (Recommandé)

1. Push le code sur GitHub
2. Connecter à Netlify (https://app.netlify.com)
3. Créer nouveau site depuis GitHub
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Environment Variables:
   - Ajouter `RESEND_API_KEY` = votre clé

#### Option B: Test local avec Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Lancer en local (simule Netlify)
netlify dev
```

La fonction sera disponible sur:
`http://localhost:8888/api/send-email`

---

## 🧪 TESTER

### Test 1: Vérifier la fonction

```bash
# Avec Netlify CLI local
netlify dev

# Tester avec curl
curl -X POST http://localhost:8888/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "adioyerm@gmail.com",
    "from": "Digita Energy <onboarding@resend.dev>",
    "subject": "Test Resend",
    "html": "<h1>Test email</h1><p>Ça marche!</p>"
  }'
```

### Test 2: Depuis le site

```bash
# Lancer le site
npm run dev

# Aller sur http://localhost:5173/modern-website/products/transformers
# Remplir et envoyer le formulaire
```

---

## 📧 CONFIGURATION EMAIL (Optionnel mais recommandé)

### Pour utiliser votre propre domaine (contact@digitaenergy.com):

1. **Acheter le domaine** digitaenergy.com (si pas déjà fait)

2. **Ajouter le domaine sur Resend**:
   - Dashboard → Domains
   - Add Domain
   - Entrer: digitaenergy.com

3. **Configurer DNS** (chez votre registrar):
   
   Resend vous donnera des records DNS à ajouter:
   ```
   Type: TXT
   Name: @
   Value: resend-verification-xxx
   
   Type: MX
   Priority: 10
   Value: mx.resend.com
   
   Type: TXT (SPF)
   Name: @
   Value: v=spf1 include:_spf.resend.com ~all
   
   Type: TXT (DKIM)
   Name: resend._domainkey
   Value: (fourni par Resend)
   ```

4. **Vérifier** (peut prendre 24-48h)

5. **Mettre à jour** `src/config/email.ts`:
   ```typescript
   fromEmail: 'contact@digitaenergy.com',
   ```

### En attendant la vérification du domaine:

Utiliser l'email Resend par défaut:
```typescript
fromEmail: 'onboarding@resend.dev'
```

**Note**: Les emails depuis `onboarding@resend.dev` fonctionnent immédiatement mais :
- Peuvent aller en spam
- Affichent "via resend.dev"

Avec votre domaine:
- ✅ Meilleure délivrabilité
- ✅ Aspect professionnel
- ✅ Pas de "via resend.dev"

---

## 🔧 ALTERNATIVES SI PAS DE NETLIFY

### Option 1: Vercel

Créer `api/send-email.ts`:

```typescript
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { to, from, subject, html, replyTo } = req.body;
    
    const { data, error } = await resend.emails.send({
      from: from || 'onboarding@resend.dev',
      to,
      subject,
      html,
      replyTo
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
```

### Option 2: Backend Node.js séparé

Si vous avez un serveur backend existant, installer Resend côté serveur et créer une route POST `/api/send-email`.

---

## 📊 MONITORING

### Dashboard Resend

Voir tous les emails envoyés:
- Dashboard → Emails
- Statut: Delivered, Bounced, Complained
- Logs détaillés
- Analytics

### Webhooks (optionnel)

Configurer des webhooks pour être notifié:
- Email delivered
- Email bounced
- Email opened (si tracking activé)

---

## ✅ CHECKLIST AVANT PRODUCTION

- [ ] Compte Resend créé
- [ ] Clé API obtenue
- [ ] `.env` configuré (et dans `.gitignore`)
- [ ] Fonction Netlify déployée
- [ ] Test d'envoi réussi
- [ ] Email reçu sur adioyerm@gmail.com
- [ ] (Optionnel) Domaine vérifié
- [ ] (Optionnel) SPF/DKIM configurés

---

## 🚀 DÉPLOIEMENT

```bash
# Commit les changements
git add .
git commit -m "feat: add Resend email integration"

# Push sur GitHub
git push origin main

# Netlify déploiera automatiquement!
```

---

## 💰 PRIX RESEND

- **Gratuit**: 100 emails/jour (3000/mois)
- **Pro**: $20/mois (50,000 emails)
- **Business**: Sur demande

Pour Digita Energy:
- Début: Plan gratuit largement suffisant
- Production: Probablement rester sur gratuit
- Si > 100 emails/jour: Passer au Pro

---

## 🆘 TROUBLESHOOTING

### "RESEND_API_KEY not found"
- Vérifier `.env` à la racine
- Redémarrer `netlify dev`
- Sur Netlify: vérifier Environment Variables

### "Email not sent"
- Vérifier les logs Netlify Functions
- Vérifier Dashboard Resend → Logs
- Tester avec curl d'abord

### "Domain not verified"
- Utiliser `onboarding@resend.dev` temporairement
- Vérifier DNS records (dig, nslookup)
- Attendre 24-48h pour propagation DNS

---

## 📞 SUPPORT

- Doc Resend: https://resend.com/docs
- Doc Netlify Functions: https://docs.netlify.com/functions
- Status Resend: https://status.resend.com

---

**PRÊT À TESTER !** 🎉

Suivez les étapes 1-4 et vous pourrez envoyer des emails en 10 minutes.
