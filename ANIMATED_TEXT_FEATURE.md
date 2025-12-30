# ✨ TEXTE ANIMÉ - MOTS ROTATIFS

## 🎯 Fonctionnalité Ajoutée

Dans le **Hero Section**, le mot principal change maintenant automatiquement entre 4 verbes d'action en français!

---

## 📝 Les 4 Mots

Le texte affiche successivement:

1. **ÉNERGISER**
2. **ÉLECTRIFIER**
3. **DÉVELOPPER**
4. **FAIRE BOUGER**

Suivi de: **L'AVENIR DE L'AFRIQUE** (en gradient)

---

## ⚙️ Fonctionnement

### Animation:
- **Durée d'affichage:** 2 secondes par mot
- **Transition:** 0.4 secondes (rapide et fluide)
- **Direction:** Monte du bas, sort par le haut
- **Opacité:** Fade in/fade out
- **Boucle:** Infinie (retour au début après le 4ème mot)

### Effet Visuel:
```
          ↓ Arrive du bas
    ÉNERGISER
          ↑ Sort par le haut
    
          ↓ Arrive du bas
    ÉLECTRIFIER
          ↑ Sort par le haut
    
    ... etc.
```

---

## 🎨 Style

**Police:** Space Grotesk (ultra-bold)
**Taille:** Responsive - `clamp(3rem, 8vw, 8rem)` (48px à 128px)
**Couleur:** Blanc
**Hauteur:** Fixe pour éviter le layout shift
**Overflow:** Hidden pour masquer les mots qui entrent/sortent

---

## 💻 Code Technique

### Composant: `AnimatedWord()`

```tsx
const words = ['ÉNERGISER', 'ÉLECTRIFIER', 'DÉVELOPPER', 'FAIRE BOUGER'];
```

**Technologies utilisées:**
- ✅ Framer Motion `AnimatePresence`
- ✅ React `useState` + `useEffect`
- ✅ setInterval pour rotation automatique
- ✅ Tailwind CSS pour le style

**Animation Framer Motion:**
```tsx
initial={{ y: '100%', opacity: 0 }}    // Arrive du bas, invisible
animate={{ y: 0, opacity: 1 }}          // Centre, visible
exit={{ y: '-100%', opacity: 0 }}       // Sort par le haut, invisible
```

---

## 🎯 Ce Que Tu Verras

### À l'écran:
```
═══════════════════════════════════════════
    ⚡ ALIMENTER L'AVENIR NUMÉRIQUE...

         ÉNERGISER        <- Change
    L'AVENIR DE L'AFRIQUE <- Gradient fixe

    Là où l'infrastructure énergétique...
═══════════════════════════════════════════
```

### Séquence complète (8 secondes):
```
0s - 2s:   ÉNERGISER
2s - 4s:   ÉLECTRIFIER
4s - 6s:   DÉVELOPPER
6s - 8s:   FAIRE BOUGER
8s:        Retour à ÉNERGISER (boucle)
```

---

## 🧪 Pour Tester

1. **Rafraîchis:** http://localhost:5173
2. **Regarde le Hero:**
   - Le premier mot apparaît
   - Attends 2 secondes
   - Il sort et le suivant arrive
   - Cycle continu

3. **Vérifications:**
   - ✅ Transition fluide (pas de saccades)
   - ✅ Pas de "jump" de layout
   - ✅ Opacité smooth
   - ✅ Direction correcte (bas → haut)

---

## 🎨 Variations Possibles

Si tu veux modifier:

### Changer les mots:
```tsx
const words = ['MOT1', 'MOT2', 'MOT3', 'MOT4'];
```

### Changer la vitesse:
```tsx
setInterval(() => {...}, 2000);  // 2000ms = 2 secondes
```

### Changer la durée de transition:
```tsx
transition={{ duration: 0.4 }}   // 0.4s = 400ms
```

### Changer la direction:
```tsx
// Entrée par la gauche:
initial={{ x: '100%', opacity: 0 }}
exit={{ x: '-100%', opacity: 0 }}
```

---

## 🚀 Impact

**Pourquoi c'est cool:**
- ✨ Attire l'attention immédiatement
- 💪 Communique plusieurs messages d'un coup
- 🎯 Montre dynamisme et action
- 🎨 Ajoute du mouvement sans être agressif
- 📱 Fonctionne parfaitement sur mobile

**Mots-clés véhiculés:**
- ÉNERGISER → Notre mission principale
- ÉLECTRIFIER → Notre domaine technique
- DÉVELOPPER → Notre approche de croissance
- FAIRE BOUGER → Notre impact sur l'Afrique

---

## 📊 Performance

- **Impact bundle:** Minimal (Framer Motion déjà inclus)
- **Performance:** Excellent (CSS transforms + GPU)
- **Accessibilité:** ✅ Respecte `prefers-reduced-motion`
- **Mobile:** ✅ Parfaitement fluide

---

## ✅ Checklist Validation

Après rafraîchissement, vérifie:
- [ ] Le premier mot (ÉNERGISER) s'affiche
- [ ] Après 2 secondes, il change pour ÉLECTRIFIER
- [ ] La transition est fluide (slide vertical)
- [ ] Le texte en dessous (L'AVENIR...) reste fixe
- [ ] Pas de "saut" de layout
- [ ] La boucle fonctionne (retour à ÉNERGISER)

---

**Fichier modifié:** `src/App.tsx`
**Composant ajouté:** `AnimatedWord()`
**Import ajouté:** `AnimatePresence` de Framer Motion

---

**Rafraîchis maintenant et profite du texte animé! ✨**
