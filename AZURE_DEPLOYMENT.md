# Migration vers Azure Static Web Apps

## ✅ Fichiers créés

1. **`api/send-email/`** - Azure Function pour l'envoi d'emails
2. **`staticwebapp.config.json`** - Configuration Azure
3. **`.github/workflows/azure-static-web-apps.yml`** - CI/CD

## 🚀 Étapes de déploiement

### 1. Créer une ressource Azure Static Web App

```bash
# Connectez-vous à Azure
az login

# Créez le groupe de ressources
az group create --name digita-energy-rg --location westeurope

# Créez la Static Web App
az staticwebapp create \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --location westeurope \
  --source https://github.com/remaestro/modern-website \
  --branch main \
  --app-location "/" \
  --api-location "api" \
  --output-location "dist" \
  --login-with-github
```

### 2. Récupérer le deployment token

```bash
az staticwebapp secrets list \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --query properties.apiKey \
  --output tsv
```

### 3. Ajouter les secrets GitHub

Allez sur : https://github.com/remaestro/modern-website/settings/secrets/actions

Ajoutez :
- `AZURE_STATIC_WEB_APPS_API_TOKEN` = token obtenu ci-dessus
- `GMAIL_USER` = adioyerm@gmail.com
- `GMAIL_APP_PASSWORD` = auiuxdsbluezdiin

### 4. Push et déploiement automatique

```bash
git add .
git commit -m "feat: migrate to Azure Static Web Apps"
git push origin main
```

## 🔧 Configuration des variables d'environnement Azure

```bash
az staticwebapp appsettings set \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --setting-names GMAIL_USER="adioyerm@gmail.com" \
                  GMAIL_APP_PASSWORD="auiuxdsbluezdiin"
```

## 📝 Différences avec Netlify

| Aspect | Netlify | Azure SWA |
|--------|---------|-----------|
| Fonctions | `netlify/functions/` | `api/` |
| Config | `netlify.toml` | `staticwebapp.config.json` |
| CLI | `netlify dev` | `swa start` |
| Endpoint | `/.netlify/functions/` | `/api/` |

## ✅ Avantages Azure

- Intégration Microsoft
- Azure Functions gratuites (1M exécutions/mois)
- CI/CD natif avec GitHub
- Support TypeScript/JavaScript moderne
- Pas de cold start pour les petites apps

## 🌐 URL après déploiement

Votre site sera accessible sur :
`https://digita-energy-site.azurestaticapps.net`

Vous pourrez ensuite ajouter un domaine personnalisé.
