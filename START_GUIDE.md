# Guide de Démarrage - Digita Energy Website

## 🚀 Comment démarrer le site

### **Méthode 1: Via Terminal**
```bash
# 1. Ouvrir le Terminal
# 2. Naviguer vers le projet
cd /Users/adioyeremi/modern-website

# 3. Démarrer le serveur de développement
npm run dev

# 4. Le site sera accessible à:
# http://localhost:5173/
```

### **Méthode 2: Via le script que j'ai créé**
```bash
# Depuis n'importe où, exécuter:
cd /Users/adioyeremi/modern-website && npm run dev
```

---

## 🌐 Accéder au site

Une fois le serveur démarré, vous verrez:
```
  VITE v7.3.0  ready in 179 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Cliquez sur** `http://localhost:5173/` **OU** ouvrez votre navigateur et tapez:
```
localhost:5173
```

---

## 🛑 Arrêter le serveur

Dans le Terminal où le serveur tourne:
```
Appuyez sur: Ctrl + C
```

---

## ⚠️ Si vous avez l'erreur "ERR_CONNECTION_REFUSED"

Cela signifie que le serveur n'est PAS en cours d'exécution.

**Solution:**
1. Ouvrez un nouveau Terminal
2. Lancez: `cd /Users/adioyeremi/modern-website && npm run dev`
3. Attendez le message "ready in XXX ms"
4. Puis ouvrez `http://localhost:5173/`

---

## 📁 Structure du Projet

```
modern-website/
├── public/
│   └── assets/          ← Vos images et vidéos ici
│       ├── hero-video-2.mp4
│       ├── infrastructure-video.mp4
│       ├── hero-energy-infrastructure.jpg
│       ├── team-collaboration.jpg
│       ├── data-center-servers.jpg
│       └── control-room-monitoring.jpg
├── src/
│   ├── App.tsx          ← Code principal du site
│   ├── main.tsx
│   └── index.css
└── package.json
```

---

## 🔧 Commandes Utiles

```bash
# Démarrer le développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version production
npm run preview

# Installer les dépendances (si besoin)
npm install
```

---

## 💡 Conseils

1. **Gardez le Terminal ouvert** pendant que vous travaillez
2. Le site se **recharge automatiquement** quand vous modifiez le code
3. Si quelque chose ne marche pas, **redémarrez le serveur** (Ctrl+C puis `npm run dev`)
4. Pour ouvrir le site depuis le Terminal: `open http://localhost:5173/`

---

## 🎯 Prochaines Étapes

1. ✅ Le site tourne maintenant avec vos images/vidéos
2. Modifier le contenu dans `src/App.tsx`
3. Ajouter plus de sections
4. Personnaliser les textes
5. Tester sur mobile/tablette
6. Préparer pour production

---

**Le serveur est actuellement EN COURS D'EXÉCUTION** ✅  
**URL:** http://localhost:5173/

Pour garder le serveur actif, **ne fermez pas le Terminal** où vous avez lancé `npm run dev`.
