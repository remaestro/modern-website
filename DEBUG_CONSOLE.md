# 🐛 DEBUG COUNT-UP - GUIDE CONSOLE

## 📝 CE QUE TU DOIS FAIRE

### Étape 1: Rafraîchir
1. Ouvre http://localhost:5173
2. Vide le cache: **Cmd+Shift+R** (Mac) ou **Ctrl+Shift+R** (Windows)
3. **Ouvre la console** immédiatement: **F12** ou **Cmd+Option+I**

---

## 👀 CE QUE TU DOIS VOIR DANS LA CONSOLE

### Au chargement de la page:

```
👀 Observer attached to: relative py-20 border-y border-white/10
```
✅ Cela signifie que l'IntersectionObserver est bien attaché à la section stats

---

### Quand tu scrolles vers les statistiques:

**1. Détection de visibilité:**
```
✅ Element became visible: relative py-20 border-y border-white/10
```

**2. Début de l'animation:**
```
🎯 Starting count-up animation!
```

**3. Progression (60 messages comme ça):**
```
📊 Step 1/60 {progress: "2%"}
📊 Step 2/60 {progress: "3%"}
📊 Step 3/60 {progress: "5%"}
...
📊 Step 58/60 {progress: "97%"}
📊 Step 59/60 {progress: "98%"}
📊 Step 60/60 {progress: "100%"}
```

**4. Fin de l'animation:**
```
✅ Count-up complete! {power: 1.2, projects: 450, countries: 12, uptime: 99.8}
```

---

## 🎯 RÉSULTAT VISUEL ATTENDU

Pendant que tu vois ces logs, les chiffres à l'écran doivent:

```
0.0GW+  →  0.6GW+  →  1.2GW+
0+      →  225+    →  450+
0       →  6       →  12
0.0%    →  49.9%   →  99.8%
```

⏱️ **Durée totale:** 2 secondes (60 steps × 33ms)

---

## ❌ DIAGNOSTICS DES PROBLÈMES

### Cas 1: Tu ne vois RIEN dans la console
**Problème:** Le JavaScript ne charge pas du tout

**Solutions:**
1. Check erreurs rouges dans la console
2. Vérifie que http://localhost:5173 charge bien
3. Essaie: Fermer le navigateur et rouvrir

---

### Cas 2: Tu vois "Observer attached" mais PAS "Element became visible"
**Problème:** IntersectionObserver ne détecte pas le scroll

**Debug:**
```javascript
// Colle ça dans la console:
document.querySelector('section.relative.py-20')
```

**Résultat attendu:** Doit retourner un élément `<section>`

**Si null:** L'élément n'existe pas → problème de rendu React

**Solutions:**
1. Scrolle TRÈS lentement vers le bas
2. Le threshold est 0.1 (10% de l'élément doit être visible)
3. Essaie de scroller jusqu'à voir complètement la section

---

### Cas 3: Tu vois "Element became visible" mais PAS "Starting count-up"
**Problème:** Le useEffect ne se déclenche pas

**Debug dans console:**
```javascript
// Vérifie que React fonctionne
typeof React
```

**Résultat attendu:** `"object"`

**Solutions:**
1. Check erreurs React dans la console
2. Rafraîchis la page
3. Vérifie que useRef est bien importé

---

### Cas 4: Tu vois "Starting count-up" mais PAS les steps
**Problème:** setInterval ne fonctionne pas

**Debug:**
```javascript
// Test manuel dans console:
let i = 0;
setInterval(() => console.log('Test', i++), 100);
```

**Résultat attendu:** Voir "Test 0", "Test 1", etc.

**Si ça ne marche pas:** Problème navigateur (très rare)

---

### Cas 5: Tu vois tous les logs mais les chiffres ne bougent pas
**Problème:** setCounts fonctionne mais le rendu non

**Debug dans console:**
```javascript
// Trouve les éléments des chiffres
document.querySelectorAll('.text-4xl.lg\\:text-5xl')
```

**Résultat attendu:** 4 éléments (les 4 stats)

**Vérifie le contenu:**
```javascript
document.querySelectorAll('.text-4xl.lg\\:text-5xl').forEach(el => console.log(el.textContent))
```

**Si les valeurs sont fixes:** Problème de state React

---

## 🔍 TEST MANUEL COMPLET

**Ouvre la console et colle ceci ligne par ligne:**

```javascript
// 1. Vérifie que la section existe
const statsSection = document.querySelector('section.relative.py-20');
console.log('Section:', statsSection);

// 2. Vérifie les éléments de stats
const statValues = document.querySelectorAll('.text-4xl.lg\\:text-5xl');
console.log('Stat elements:', statValues.length);

// 3. Affiche les valeurs actuelles
statValues.forEach((el, i) => console.log(`Stat ${i}:`, el.textContent));

// 4. Vérifie IntersectionObserver
console.log('IntersectionObserver supported:', typeof IntersectionObserver);

// 5. Vérifie React
console.log('React loaded:', typeof React);
```

**Envoie-moi les résultats de ces tests!**

---

## 📸 SCREENSHOT DEMANDÉ

Si ça ne marche toujours pas, fais un screenshot de:

1. **La page complète** montrant la section stats
2. **La console** avec tous les logs
3. **L'onglet Network** (F12 → Network) montrant les fichiers chargés

---

## ✅ SI TOUT FONCTIONNE

Tu devrais voir:
- ✅ Gradient vert-blanc-bleu
- ✅ Tous les logs dans la console dans l'ordre
- ✅ Les chiffres qui comptent visuellement
- ✅ Animation fluide de 2 secondes
- ✅ Pas d'erreurs rouges

---

**MAINTENANT: Rafraîchis, ouvre la console, scrolle et dis-moi ce que tu vois!** 🔍
