# Configuration du domaine digita-energy.com sur Azure

## 🎯 Étapes de configuration

### 1. Configurer www.digita-energy.com (sous-domaine)

Exécutez d'abord cette commande pour obtenir la valeur CNAME :

```bash
az staticwebapp hostname set \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --hostname www.digita-energy.com
```

**Dans votre DNS (chez votre registrar) :**
```
Type: CNAME
Nom: www
Valeur: calm-sand-0e2838f03.1.azurestaticapps.net
TTL: 3600
```

---

### 2. Configurer digita-energy.com (domaine apex)

Pour le domaine apex, Azure nécessite une validation TXT. Exécutez :

```bash
az staticwebapp hostname set \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --hostname digita-energy.com \
  --validation-method dns-txt-token
```

Cette commande retournera un **token TXT** à ajouter dans votre DNS.

**Exemple de réponse attendue :**
```json
{
  "validationToken": "ABC123XYZ..."
}
```

**Dans votre DNS :**
```
Type: TXT
Nom: @
Valeur: [le token retourné]
TTL: 3600
```

**ET aussi un enregistrement ALIAS ou A :**
```
Type: ALIAS (ou A si ALIAS non supporté)
Nom: @
Valeur: calm-sand-0e2838f03.1.azurestaticapps.net
TTL: 3600
```

---

### 3. Vérifier la configuration DNS

Après avoir ajouté les enregistrements, attendez quelques minutes puis vérifiez :

```bash
# Vérifier www
nslookup www.digita-energy.com

# Vérifier apex
nslookup digita-energy.com

# Vérifier TXT
nslookup -type=TXT digita-energy.com
```

---

### 4. Vérifier le statut sur Azure

```bash
az staticwebapp hostname show \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --hostname www.digita-energy.com

az staticwebapp hostname show \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --hostname digita-energy.com
```

---

## 🔐 SSL/TLS

Azure génère automatiquement un certificat SSL gratuit une fois le domaine vérifié (peut prendre jusqu'à 48h).

---

## 📝 Checklist

- [ ] Ajouter CNAME pour www → calm-sand-0e2838f03.1.azurestaticapps.net
- [ ] Obtenir le token TXT pour domaine apex
- [ ] Ajouter TXT pour validation
- [ ] Ajouter ALIAS/A pour domaine apex
- [ ] Attendre propagation DNS (5-60 min)
- [ ] Vérifier avec nslookup
- [ ] Confirmer validation Azure
- [ ] Attendre certificat SSL (24-48h)

---

## ⚠️ Notes importantes

1. **Chez quel registrar est votre domaine ?** (GoDaddy, Namecheap, OVH, etc.)
2. Certains registrars appellent ALIAS différemment : ANAME, CNAME Flattening
3. Si ALIAS n'est pas supporté, utilisez un A record avec l'IP d'Azure Static Web Apps

