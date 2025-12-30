# 🚀 DIGITA ENERGY - REDESIGN COMPLET 2025
## Style: Tesla/Apple Futuriste Minimaliste

---

## 🎨 PALETTE DE COULEURS

### Couleurs Principales
```
FOND CLAIR:
- Base: #F5F7FA (gris très clair, presque blanc)
- Surface: #FFFFFF (blanc pur pour cards)
- Surface alt: #E8ECEF (gris clair pour sections alternées)

TEXTE:
- Primary: #1A1F2E (gris très foncé, presque noir)
- Secondary: #6B7280 (gris moyen)
- Tertiary: #9CA3AF (gris clair pour texte moins important)

ACCENT VERT (ÉNERGIE):
- Primary: #00D084 (vert néon futuriste)
- Hover: #00B872 (vert plus foncé)
- Light: #E6FFF7 (vert très clair pour backgrounds)
- Gradient: linear-gradient(135deg, #00D084 0%, #00F5A0 100%)

ACCENTS:
- Gris tech: #3D4451 (pour éléments techniques)
- Bleu subtil: #E0F2FE (pour highlights)
```

---

## 📐 PHILOSOPHIE DESIGN

### Principes Tesla/Apple
1. **ESPACE NÉGATIF** - Beaucoup d'air, pas de surcharge
2. **TYPOGRAPHIE GÉANTE** - Headlines massives, impact immédiat
3. **MICRO-INTERACTIONS** - Animations subtiles au hover
4. **GLASSMORPHISM SUBTIL** - Légères transparences
5. **GRILLES PARFAITES** - Alignement pixel-perfect
6. **PRODUIT AU CENTRE** - Visuels épurés, pas de décoration inutile

### Ce qu'on ÉVITE
❌ Gradients agressifs
❌ Animations flashy
❌ Textures lourdes
❌ Icônes colorées partout
❌ Shadows épaisses

### Ce qu'on GARDE
✅ Espace blanc abondant
✅ Animations fluides (60fps)
✅ Typographie scale claire
✅ Hover states subtils
✅ Smooth scrolling
✅ Clean transitions

---

## 🏗️ STRUCTURE DES SECTIONS

### 1. HERO SECTION
```
Layout:
┌─────────────────────────────────────────┐
│                                         │
│         DIGITA ENERGY (logo)            │
│                                         │
│       [ÉNERGISER L'AFRIQUE]             │
│        (texte rotatif géant)            │
│                                         │
│    Transformant l'énergie de demain     │
│                                         │
│       [Découvrir] [Contact]             │
│                                         │
│   ╭───────────────────────────╮         │
│   │  Ville wireframe subtile  │         │
│   │  (animation douce)        │         │
│   ╰───────────────────────────╯         │
└─────────────────────────────────────────┘

Style:
- Fond: gradient gris très subtil
- Texte: gris foncé #1A1F2E
- Accent: vert #00D084 sur mots clés
- Animation: mots changent avec fade doux
- Wireframe: lignes fines grises avec accents verts
```

### 2. STATS SECTION
```
Layout:
┌──────────────────────────────────────────┐
│                                          │
│  [500+]     [98%]      [24/7]      [50+] │
│  Projets  Satisfaction Support  Experts  │
│                                          │
└──────────────────────────────────────────┘

Style:
- Fond: blanc #FFFFFF
- Nombres: gris foncé, très gros (72px+)
- Labels: gris moyen
- Séparateurs: lignes verticales grises fines
- Animation: count-up au scroll
- Hover: légère scale + glow vert
```

### 3. SERVICES (Cards)
```
Layout:
┌─────────────────────────────────────────┐
│                                         │
│         NOS SOLUTIONS                   │
│                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │ Icône  │  │ Icône  │  │ Icône  │    │
│  │        │  │        │  │        │    │
│  │ Titre  │  │ Titre  │  │ Titre  │    │
│  │ Text   │  │ Text   │  │ Text   │    │
│  └────────┘  └────────┘  └────────┘    │
│                                         │
└─────────────────────────────────────────┘

Style Cards:
- Fond: blanc #FFFFFF
- Border: 1px solid #E8ECEF
- Shadow: très subtile (0 1px 3px rgba(0,0,0,0.05))
- Border-radius: 16px (doux)
- Padding: généreux (48px)
- Hover: 
  * Border devient vert #00D084
  * Shadow s'intensifie légèrement
  * Translate Y -2px
  * Transition: 0.3s cubic-bezier
```

### 4. VISION/IMPACT
```
Layout: 50/50 split
┌─────────────────────────────────────────┐
│                                         │
│  ┌─────────────┐  ┌─────────────┐      │
│  │             │  │             │      │
│  │   Image/    │  │   Texte     │      │
│  │   Visual    │  │   + Stats   │      │
│  │             │  │             │      │
│  └─────────────┘  └─────────────┘      │
│                                         │
└─────────────────────────────────────────┘

Style:
- Fond: #F5F7FA (gris très clair)
- Image: border-radius 24px
- Texte: hiérarchie claire (H2 → body → stats)
- Accent: badge vert avec texte
```

### 5. CTA FINALE
```
Layout:
┌─────────────────────────────────────────┐
│                                         │
│        Prêt à transformer               │
│        votre infrastructure?            │
│                                         │
│         [Démarrer maintenant]           │
│                                         │
└─────────────────────────────────────────┘

Style:
- Fond: blanc avec border verte subtile
- Texte centré: gros, impact
- Button: vert plein, large, hover scale
- Padding: massif (120px vertical)
```

---

## ✨ ANIMATIONS & MICRO-INTERACTIONS

### Navigation
```javascript
State 1 (top): 
- Transparent backdrop
- Border-bottom: none
- Logo: gris foncé

State 2 (scrolled):
- backdrop-blur-md
- bg-white/80
- Border-bottom: 1px gris clair
- Shadow: subtile

Transition: 0.3s ease-out
```

### Hero Text Rotation
```javascript
Mots: ['ÉNERGISER', 'ÉLECTRIFIER', 'DÉVELOPPER', 'TRANSFORMER']

Animation:
- Interval: 2000ms
- Enter: opacity 0→1, translateY(20px)→0
- Exit: opacity 1→0, translateY(0)→(-20px)
- Duration: 400ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
```

### Scroll Animations
```javascript
Trigger: IntersectionObserver
Threshold: 0.1

Effect:
- Initial: opacity: 0, y: 30
- Animate: opacity: 1, y: 0
- Duration: 600ms
- Stagger: 100ms entre éléments

Sections concernées:
- Stats
- Service cards
- Vision section
```

### Button Hovers
```css
Normal:
- bg: #00D084
- scale: 1
- shadow: 0 2px 8px rgba(0,208,132,0.2)

Hover:
- bg: #00B872
- scale: 1.02
- shadow: 0 4px 16px rgba(0,208,132,0.3)
- transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)

Active:
- scale: 0.98
```

### Card Hovers
```css
Normal:
- border: 1px solid #E8ECEF
- shadow: 0 1px 3px rgba(0,0,0,0.05)
- translateY: 0

Hover:
- border: 1px solid #00D084
- shadow: 0 8px 24px rgba(0,0,0,0.08)
- translateY: -4px
- transition: all 0.3s cubic-bezier(0.4, 0, 0.6, 1)
```

---

## 🎭 WIREFRAME CITY (Arrière-plan Hero)

### Style Minimaliste
```
Éléments:
- Lignes: très fines (1-1.5px)
- Couleur base: #D1D5DB (gris clair)
- Accent: #00D084 (vert) à 30% opacité
- Opacité globale: 0.4 (très subtil)

Animation:
- Construction initiale: 3-4 secondes
- Puis: statique (pas de loop)
- Quelques points verts qui pulsent (très lent)
- Effet: présence subtile, pas distraction

Position:
- Absolute, bottom du hero
- z-index: -1 (derrière texte)
- Blur léger possible: 0.5px
```

---

## 📝 TYPOGRAPHIE

### Font Stack
```css
Primary (Headings):
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 700 (Bold)
letter-spacing: -0.02em (tight)

Secondary (Body):
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400 (Regular)
line-height: 1.6
```

### Scale
```
H1 (Hero): 72px (desktop) / 48px (mobile)
H2 (Sections): 48px (desktop) / 36px (mobile)
H3 (Cards): 24px
Body Large: 20px
Body: 16px
Small: 14px
```

### Hiérarchie
```css
.hero-title {
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1A1F2E;
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #1A1F2E;
}

.body-large {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.6;
  color: #6B7280;
}

.body {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #6B7280;
}
```

---

## 🖼️ IMAGES & VISUELS

### Style Photos
```
Traitement:
- Légère désaturation (-10%)
- Contrast: +5%
- Brightness: +2%
- Overlay vert subtil (5% opacity)

Border-radius: 16-24px
Aspect ratio: 16:9 ou 4:3
Shadow: 0 8px 32px rgba(0,0,0,0.08)
```

### Prompts Images (si nécessaire)
```
Style général:
- Photographie professionnelle
- Éclairage naturel, doux
- Palette: gris, blanc, touches de vert
- Minimal, épuré
- Haute résolution
- Pas de texte sur images

Exemples:
1. Infrastructure moderne:
   "Modern electrical substation, minimalist architecture, soft natural lighting, grey and white tones, subtle green accent lights, clean composition, professional photography, 8K resolution"

2. Technologie:
   "Clean tech workspace, modern control panels, minimal design, soft lighting, grey and green color palette, professional environment, ultra high quality"

3. Vision/Impact:
   "African city skyline at dusk, modern infrastructure, subtle green lighting, clean aesthetic, professional photography, cinematic composition"
```

---

## 📱 RESPONSIVE

### Breakpoints
```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Large Desktop: > 1440px
```

### Adaptations
```
Mobile:
- Hero text: 48px → 36px
- Padding: réduit de 50%
- Cards: stack vertical
- Nav: hamburger menu
- Wireframe: simplifié (moins d'éléments)

Tablet:
- Hero text: 60px
- Cards: 2 colonnes
- Padding: -25%

Desktop:
- Full experience
- Animations complètes
```

---

## 🎯 COMPOSANTS CLÉS À CRÉER

### 1. Navigation
```tsx
<Nav 
  transparent={!scrolled}
  blur={scrolled}
  theme="light"
/>
```

### 2. Hero
```tsx
<Hero 
  rotatingWords={['ÉNERGISER', 'ÉLECTRIFIER'...]}
  subtitle="Transformant l'énergie de demain"
  background={<CityWireframe minimal />}
/>
```

### 3. Stats Bar
```tsx
<StatsBar 
  stats={[
    { value: 500, label: 'Projets', suffix: '+' },
    { value: 98, label: 'Satisfaction', suffix: '%' },
    ...
  ]}
  animateOnScroll
/>
```

### 4. Service Card
```tsx
<ServiceCard 
  icon={<Icon />}
  title="Infrastructure Moderne"
  description="..."
  theme="light"
  hoverEffect="lift"
/>
```

### 5. CTA Section
```tsx
<CTA 
  title="Prêt à transformer..."
  buttonText="Démarrer"
  buttonVariant="primary-green"
/>
```

---

## 🚀 PLAN D'IMPLÉMENTATION

### Phase 1: Foundation (Étape 1)
- [ ] Nouvelle palette dans Tailwind config
- [ ] Reset App.tsx (clean slate)
- [ ] Navigation minimaliste
- [ ] Hero avec texte rotatif (sans wireframe)

### Phase 2: Core Sections (Étape 2)
- [ ] Stats bar avec count-up
- [ ] Services cards (3 colonnes)
- [ ] Vision section (50/50 split)
- [ ] CTA finale

### Phase 3: Polish (Étape 3)
- [ ] Wireframe city (version minimaliste)
- [ ] Scroll animations
- [ ] Micro-interactions
- [ ] Responsive tweaks

### Phase 4: Content (Étape 4)
- [ ] Textes français finaux
- [ ] Images/visuels
- [ ] SEO meta
- [ ] Performance optimization

---

## ✅ CHECKLIST QUALITÉ

### Design
- [ ] Palette cohérente (gris clair + vert)
- [ ] Typographie scale respectée
- [ ] Espace négatif suffisant
- [ ] Alignements parfaits
- [ ] Contraste texte/fond OK (WCAG AA)

### Animations
- [ ] Toutes à 60fps
- [ ] Durées cohérentes (200-600ms)
- [ ] Easing naturel (cubic-bezier)
- [ ] Pas de jank/stutter
- [ ] Respect prefers-reduced-motion

### Performance
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] No layout shifts (CLS = 0)
- [ ] Images optimisées (WebP)
- [ ] Lazy loading

### UX
- [ ] Navigation intuitive
- [ ] Buttons cliquables (min 44x44px)
- [ ] Focus states visibles
- [ ] Feedback hover/active
- [ ] Mobile-friendly (touch targets)

---

## 🎨 INSPIRATION RÉFÉRENCES

### Sites Tesla/Apple-like
- tesla.com (hero sections, minimal nav)
- apple.com (product showcases, spacing)
- stripe.com (animations subtiles)
- linear.app (clean UI, microinteractions)
- vercel.com (typography, gradients subtils)

### Éléments à copier
✅ Tesla: Hero fullscreen, texte géant, CTA simple
✅ Apple: Espace blanc, typographie scale, smooth scroll
✅ Stripe: Cards hover effects, grid layouts
✅ Linear: Animations fluides, dark/light contrast
✅ Vercel: Gradients subtils, glassmorphism léger

---

## 📊 RÉSUMÉ VISUEL

```
AVANT (ancien design):
- Fond: sombre
- Couleurs: multiples
- Animations: agressives
- Style: chargé

APRÈS (nouveau design):
- Fond: clair (#F5F7FA)
- Couleurs: gris + vert accent
- Animations: subtiles, fluides
- Style: minimaliste, Tesla/Apple

IMPACT:
→ Plus professionnel
→ Plus moderne
→ Plus accessible
→ Plus performant
→ Plus mémorable
```

---

## 🚀 READY TO BUILD!

**Prochaine étape**: Commencer Phase 1 - Foundation
- Nouvelle config Tailwind
- Reset App.tsx
- Nav + Hero minimaliste

**Commande pour démarrer**: "commence phase 1"
