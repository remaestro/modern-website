# Plan du Site - Digita Energy

## 🏠 Structure Générale

### Navigation (Fixe en haut)
- **Logo**: DIGITA ENERGY
- **Menu Principal**:
  - À propos
  - Services
  - Vision
  - Contact

---

## 📍 Sections du Site

### 1. Hero Section (Section d'Accueil)
**Contenu**:
- Titre animé avec rotation de mots : "ÉNERGISER / DÉVELOPPER / CHANGER L'AFRIQUE"
- Vidéo en arrière-plan (hero-video.mp4)
- Effets visuels: bulles de couleur animées (vert, bleu, violet)
- Boutons CTA:
  - "Découvrir nos solutions"
  - "Démarrer votre projet →"

**Statistiques clés** (avec animation de comptage):
- 1.2GW+ - Énergie Gérée
- 450+ - Projets Livrés
- 12 - Pays
- 99.8% - Disponibilité SLA

**Indicateur de défilement** (Scroll indicator)

---

### 2. About Section (À Propos)
**ID**: `#about`

**Contenu**:
- **Arrière-plan**: Images défilantes (panneaux solaires + paiement mobile)
- **Structure en 2 colonnes**:
  - Gauche: Visuel avec icône réseau
  - Droite: Texte de présentation de l'entreprise

**Éléments visuels**:
- Bulles de lumière (vert, bleu)
- Effets de verre (Glass morphism)

---

### 3. Services Section (Nos Services)
**ID**: `#services`

**Badge**: "Ce Que Nous Faisons"

**3 Services principaux**:

#### A. Solutions Réseau Intelligent
- Distribution Électrique Intelligente
- Features:
  - Systèmes SCADA & Téléconduite
  - Intégration Réseau HT/MT/BT
  - Analytique Réseau en Temps Réel
  - Infrastructure de Cybersécurité
- **Icône**: Éclair ⚡
- **Couleur**: Vert énergétique

#### B. Infrastructure Numérique
- Technologie Qui Alimente le Progrès
- Features:
  - Développement Plateforme IoT
  - Systèmes de Gestion Énergétique
  - Analytique de Données & BI
  - Cloud & Edge Computing
- **Icône**: Réseau 🌐
- **Couleur**: Bleu cyber

#### C. Intégration Durable
- Énergie Propre, Mise en Œuvre Intelligente
- Features:
  - Intégration des Énergies Renouvelables
  - Systèmes de Stockage d'Énergie
  - Solutions de Micro-réseaux
  - Suivi Carbone
- **Icône**: Panneau Solaire ☀️
- **Couleur**: Orange solaire

---

### 4. Vision Section (Notre Vision)
**ID**: `#vision`

**Contenu**:
- **Titre**: "Notre Vision pour 2030"
- **Citation**:
  > "Un réseau énergétique durable et entièrement connecté à travers l'Afrique — où l'énergie est propre, fiable et intelligemment distribuée."

**Style**: Grande citation centrée avec gradient

---

### 5. Values Section (Nos Valeurs)
**Badge**: "Ce Qui Nous Anime"

**4 Valeurs clés** (grille 2x2 sur mobile, 4 colonnes sur desktop):

1. **Innovation** ⚡
   - "Nous ne suivons pas les tendances — nous les créons."

2. **Fiabilité** 🛡️
   - "99,8% de disponibilité n'est pas un objectif. C'est notre standard."

3. **Durabilité** 🌿
   - "L'énergie propre n'est pas optionnelle. Elle est essentielle."

4. **Partenariat** 🌐
   - "Votre succès est notre mission."

**Style**: Cards avec effet verre et hover

---

### 6. CTA Section (Appel à l'Action)
**Contenu**:
- **Titre**: "Prêt à Transformer Votre Infrastructure Énergétique ?"
- **Description**: Invitation au contact
- **Bouton**: "Discutons de Votre Projet →"

**Effets visuels**: 
- Arrière-plan animé
- Particules en mouvement

---

### 7. Footer (Pied de page)
**3 Colonnes**:

#### Colonne 1: Solutions
- Réseau Intelligent
- Infrastructure Numérique
- Énergie Durable

#### Colonne 2: Entreprise
- À Propos
- Vision
- Carrières

#### Colonne 3: Suivez-nous
- Icônes réseaux sociaux

**Copyright**: 
- "© 2024 DIGITA ENERGY. Propulser l'Avenir de l'Afrique."

---

## 🎨 Palette de Couleurs

- **Vert Énergétique** (`energy-green`): #00FF87
- **Bleu Cyber** (`cyber-blue`): #00D4FF
- **Orange Solaire** (`solar-orange`): #FF6B35
- **Violet Plasma** (`plasma-purple`): #B026FF
- **Noir Profond** (`deep-black`): #0A0A0A
- **Graphite** (`graphite`): #1A1A1A

---

## ⚡ Animations & Effets

1. **Hero**:
   - Rotation de mots (1.5s interval)
   - Compteur animé pour les stats
   - Bulles flottantes animées
   - Vidéo en arrière-plan

2. **Scroll Animations**:
   - Fade-in au scroll (opacity + translateY)
   - Déclenchement à 20% de visibilité

3. **Hover Effects**:
   - Scale sur les boutons
   - Glow sur les cards
   - Transitions douces (300ms)

4. **Background**:
   - Images défilantes (60s loop)
   - Gradient overlays
   - Noise texture globale

---

## 📱 Responsive

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

**Adaptations**:
- Navigation collapse sur mobile
- Grilles qui s'empilent (1 col → 2 col → 4 col)
- Tailles de texte réduites
- Stats: 2x2 grid sur mobile, 4 colonnes sur desktop

---

## 🔧 Technologies Utilisées

- **Framework**: React + TypeScript
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Font Awesome)
- **Build**: Vite
- **Deployment**: GitHub Pages

---

## 📄 Pages & Routes

**Actuellement**: Single Page Application (SPA)

**Ancres de navigation**:
- `#about` - Section À Propos
- `#services` - Section Services
- `#vision` - Section Vision

**Base URL**: `/modern-website/`
