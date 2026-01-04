#!/bin/bash

# Configuration des variables d'environnement Azure

echo "🔧 Configuration des variables d'environnement Azure..."

# Ajout des variables
az staticwebapp appsettings set \
  --name digita-energy-site \
  --resource-group digita-energy-rg \
  --setting-names \
    GMAIL_USER=adioyerm@gmail.com \
    GMAIL_APP_PASSWORD=auiuxdsbluezdiin

echo "✅ Variables d'environnement configurées !"
echo ""
echo "🌐 URL du site : https://calm-sand-0e2838f03.1.azurestaticapps.net"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Vérifiez le déploiement sur GitHub Actions"
echo "2. Testez l'envoi d'emails"
echo "3. (Optionnel) Configurez un domaine personnalisé"
