# PLAN D'ACTION - REDESIGN DIGITA ENERGY
## Guide Étape par Étape - À Suivre À La Lettre

**Date de début:** 2025-12-30  
**Durée estimée:** 3-4 jours de développement  
**Approche:** Implémentation progressive et testée

---

## 🎯 OBJECTIF FINAL

Transformer le site Digita Energy actuel en un site web ultra-moderne, visuellement impressionnant, avec des graphismes riches, des animations fluides, et une esthétique digne des meilleurs sites primés.

---

## 📋 PHASE 1: PRÉPARATION (30-45 minutes)

### ÉTAPE 1.1: Installation des Dépendances
```bash
# Dans le terminal, depuis /Users/adioyeremi/modern-website

# Installer Framer Motion pour animations
npm install framer-motion

# Installer React Icons pour les icônes modernes
npm install react-icons

# Installer trois.js pour effets 3D (particules)
npm install three @react-three/fiber @react-three/drei

# Vérifier que tout fonctionne
npm run dev
```

**✅ Validation:** Le serveur démarre sans erreur.

---

### ÉTAPE 1.2: Télécharger les Polices Modernes
```bash
# Les polices seront intégrées via Google Fonts
# Aucune installation nécessaire, juste modification du HTML
```

**Action:** Modifier `/index.html` pour ajouter les polices.

**Fichier:** `index.html`
```html
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- NOUVELLES POLICES -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <title>Digita Energy - Energizing Africa's Future</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**✅ Validation:** Ouvrir le site, inspecter les fonts dans DevTools.

---

### ÉTAPE 1.3: Mise à Jour du Tailwind Config

**Fichier:** `tailwind.config.js`

**Action:** Remplacer ENTIÈREMENT le contenu actuel par:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette moderne
        'energy-green': {
          DEFAULT: '#00FF87',
          50: '#E6FFF5',
          100: '#B3FFE0',
          200: '#80FFCB',
          300: '#4DFFB6',
          400: '#1AFFA1',
          500: '#00FF87',
          600: '#00CC6C',
          700: '#009951',
          800: '#006636',
          900: '#003D20',
        },
        'cyber-blue': {
          DEFAULT: '#00D4FF',
          500: '#00D4FF',
          600: '#00A8CC',
          700: '#007A99',
        },
        'plasma-purple': '#9333EA',
        'solar-orange': '#FF6B00',
        'deep-black': '#0A0A0A',
        'graphite': '#1A1A1A',
        'dark-gray': '#2A2A2A',
      },
      fontFamily: {
        'display': ['"Space Grotesk"', 'sans-serif'],
        'body': ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 8rem)',
        'display': 'clamp(2rem, 5vw, 4rem)',
        'section': 'clamp(1.5rem, 3vw, 2.5rem)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 135, 0.5), 0 0 40px rgba(0, 255, 135, 0.3)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 255, 135, 0.8), 0 0 60px rgba(0, 255, 135, 0.5)' 
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'energy-gradient': 'linear-gradient(135deg, #00FF87 0%, #00D4FF 100%)',
        'power-gradient': 'linear-gradient(180deg, #39FF14 0%, #00FF87 50%, #9333EA 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
```

**✅ Validation:** Redémarrer le serveur dev, vérifier qu'il compile sans erreur.

---

## 📋 PHASE 2: CRÉATION DES COMPOSANTS DE BASE (1-2 heures)

### ÉTAPE 2.1: Créer le Dossier Structure

```bash
# Créer la structure de dossiers
cd /Users/adioyeremi/modern-website/src
mkdir -p components/ui
mkdir -p components/graphics
mkdir -p components/sections
mkdir -p hooks
mkdir -p utils
```

**✅ Validation:** Dossiers créés et visibles.

---

### ÉTAPE 2.2: Créer le Composant GlassCard

**Fichier:** `src/components/ui/GlassCard.tsx`

```tsx
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div 
      className={`
        relative backdrop-blur-xl bg-white/5 
        border border-white/10 rounded-2xl 
        shadow-lg shadow-black/20
        ${hover ? 'transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-energy-green/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

**✅ Validation:** Fichier créé, pas d'erreurs TypeScript.

---

### ÉTAPE 2.3: Créer le Composant GradientText

**Fichier:** `src/components/ui/GradientText.tsx`

```tsx
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export default function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span 
      className={`
        bg-gradient-to-r from-energy-green via-cyber-blue to-plasma-purple 
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}
```

**✅ Validation:** Fichier créé, compilation OK.

---

### ÉTAPE 2.4: Créer le Hook useScrollAnimation

**Fichier:** `src/hooks/useScrollAnimation.ts`

```typescript
import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
}
```

**✅ Validation:** Fichier créé, TypeScript happy.

---

### ÉTAPE 2.5: Créer le Composant NoiseTexture

**Fichier:** `src/components/graphics/NoiseTexture.tsx`

```tsx
export default function NoiseTexture() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}
```

**✅ Validation:** Texture de bruit fonctionnelle.

---

### ÉTAPE 2.6: Créer le Composant CircuitPattern

**Fichier:** `src/components/graphics/CircuitPattern.tsx`

```tsx
export default function CircuitPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg 
        className="absolute top-0 right-0 w-1/2 h-1/2" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        
        {/* Circuit lines */}
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
          <path d="M50,50 L150,50 L150,150" />
          <path d="M200,50 L300,50 L300,150 L200,150" />
          <path d="M50,200 L100,200 L100,300" />
          <path d="M250,200 L350,200 L350,300" />
          <circle cx="150" cy="50" r="3" fill="#00FF87"/>
          <circle cx="150" cy="150" r="3" fill="#00FF87"/>
          <circle cx="300" cy="150" r="3" fill="#00D4FF"/>
          <circle cx="100" cy="200" r="3" fill="#00FF87"/>
          <circle cx="350" cy="300" r="3" fill="#00D4FF"/>
        </g>
      </svg>
      
      <svg 
        className="absolute bottom-0 left-0 w-1/2 h-1/2" 
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="url(#circuitGradient)" strokeWidth="1" fill="none">
          <path d="M100,100 L200,100 L200,200" />
          <path d="M300,100 L350,100 L350,200" />
          <path d="M50,250 L150,250 L150,350" />
          <circle cx="200" cy="100" r="3" fill="#00FF87"/>
          <circle cx="200" cy="200" r="3" fill="#00D4FF"/>
          <circle cx="150" cy="350" r="3" fill="#00FF87"/>
        </g>
      </svg>
    </div>
  );
}
```

**✅ Validation:** Pattern de circuit visible.

---

## 📋 PHASE 3: RECONSTRUCTION DE APP.TSX (2-3 heures)

### ÉTAPE 3.1: Backup de l'Ancien Code

```bash
# Créer une sauvegarde
cp /Users/adioyeremi/modern-website/src/App.tsx /Users/adioyeremi/modern-website/src/App-backup-old.tsx
```

**✅ Validation:** Backup créé.

---

### ÉTAPE 3.2: Créer le Nouveau App.tsx - PARTIE 1 (Imports et Hero)

**Fichier:** `src/App.tsx`

**Action:** REMPLACER TOUT LE CONTENU par le nouveau code ci-dessous.

```tsx
import { motion } from 'framer-motion';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';
import CircuitPattern from './components/graphics/CircuitPattern';
import { 
  FaBolt, 
  FaNetworkWired, 
  FaSolarPanel, 
  FaShieldAlt, 
  FaLeaf, 
  FaUsers 
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <NoiseTexture />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full z-50 transition-all duration-300"
      >
        <div 
          className={`
            backdrop-blur-xl transition-all duration-300
            ${scrollY > 50 ? 'bg-deep-black/80 border-b border-white/10' : 'bg-transparent'}
          `}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
            <motion.div 
              className="text-2xl font-display font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              DIGITA <GradientText>ENERGY</GradientText>
            </motion.div>
            
            <div className="hidden md:flex gap-8 items-center">
              <a 
                href="#about" 
                className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200"
              >
                À propos
              </a>
              <a 
                href="#services" 
                className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200"
              >
                Solutions
              </a>
              <a 
                href="#vision" 
                className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200"
              >
                Vision
              </a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-energy-gradient px-6 py-2.5 rounded-lg text-sm font-bold text-deep-black overflow-hidden group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-energy-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Nouveau Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-deep-black via-graphite to-deep-black" />
          <motion.div 
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-1/4 -left-1/4 w-96 h-96 bg-energy-green/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyber-blue/20 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-plasma-purple/10 rounded-full blur-3xl"
          />
        </div>

        {/* Circuit Pattern */}
        <CircuitPattern />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-block px-4 py-2 mb-8 backdrop-blur-sm bg-white/5 border border-energy-green/30 rounded-full"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(0, 255, 135, 0.3)',
                  '0 0 40px rgba(0, 255, 135, 0.5)',
                  '0 0 20px rgba(0, 255, 135, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-energy-green text-sm font-bold tracking-wider">
                ⚡ POWERING AFRICA'S DIGITAL FUTURE
              </span>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="block text-hero leading-none">
              ENERGIZING
            </span>
            <GradientText>
              <span className="block text-hero leading-none">
                AFRICA'S FUTURE
              </span>
            </GradientText>
          </motion.h1>

          <motion.p 
            className="text-xl lg:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Where cutting-edge energy infrastructure meets digital transformation.
            <span className="block mt-2 text-energy-green/90">
              We're building the power grid of tomorrow, today.
            </span>
          </motion.p>

          <motion.div 
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 135, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="relative px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg overflow-hidden group"
            >
              <span className="relative z-10">Explore Solutions</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 backdrop-blur-sm bg-white/5 border-2 border-white/20 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-energy-green/50 transition-all duration-300"
            >
              Start Your Project →
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs font-medium tracking-wider">SCROLL</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-3 bg-energy-green rounded-full"
                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Bar */}
      <StatsSection />

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Values Section */}
      <ValuesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Statistics Section Component
function StatsSection() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [counts, setCounts] = useState({ power: 0, projects: 0, countries: 0, uptime: 0 });

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      const targets = { power: 1.2, projects: 450, countries: 12, uptime: 99.8 };
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounts({
          power: Number((targets.power * progress).toFixed(1)),
          projects: Math.floor(targets.projects * progress),
          countries: Math.floor(targets.countries * progress),
          uptime: Number((targets.uptime * progress).toFixed(1)),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounts(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section ref={ref} className="relative py-20 border-y border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-energy-green/5 via-transparent to-cyber-blue/5" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            value={`${counts.power}GW+`} 
            label="Power Managed" 
            icon={<FaBolt />}
            isVisible={isVisible}
            delay={0}
          />
          <StatCard 
            value={`${counts.projects}+`} 
            label="Projects Delivered" 
            icon={<FaNetworkWired />}
            isVisible={isVisible}
            delay={0.1}
          />
          <StatCard 
            value={counts.countries} 
            label="Countries" 
            icon={<FaUsers />}
            isVisible={isVisible}
            delay={0.2}
          />
          <StatCard 
            value={`${counts.uptime}%`} 
            label="Uptime SLA" 
            icon={<FaShieldAlt />}
            isVisible={isVisible}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon, isVisible, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-energy-green text-3xl mb-3 flex justify-center">
        {icon}
      </div>
      <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
        <GradientText>{value}</GradientText>
      </div>
      <div className="text-white/60 text-sm font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  );
}

// Placeholder components (to be implemented)
function AboutSection() {
  return <div className="py-32 bg-graphite/30">About Section - À implémenter</div>;
}

function ServicesSection() {
  return <div className="py-32">Services Section - À implémenter</div>;
}

function VisionSection() {
  return <div className="py-32 bg-graphite/30">Vision Section - À implémenter</div>;
}

function ValuesSection() {
  return <div className="py-32">Values Section - À implémenter</div>;
}

function CTASection() {
  return <div className="py-32 bg-graphite/30">CTA Section - À implémenter</div>;
}

function Footer() {
  return <div className="py-16 bg-deep-black border-t border-white/10">Footer - À implémenter</div>;
}

export default App;
```

**✅ Validation:** 
1. Le site compile sans erreur
2. Le Hero s'affiche avec animations
3. Les gradients sont visibles
4. La navigation est fonctionnelle
5. Les statistiques s'animent au scroll

---

### ÉTAPE 3.3: Tester le Hero Section

```bash
# Le serveur dev devrait déjà tourner
# Ouvrir http://localhost:5173 dans le navigateur
```

**Points à vérifier:**
- ✅ Gradients animés en arrière-plan
- ✅ Titre "ENERGIZING AFRICA'S FUTURE" visible
- ✅ Texte en dégradé fonctionne
- ✅ Boutons avec effets hover
- ✅ Scroll indicator anime
- ✅ Navigation glassmorphique
- ✅ Pattern de circuit visible
- ✅ Texture de bruit subtile

**Si OK:** Passer à l'étape suivante  
**Si problème:** Noter l'erreur, on corrige avant de continuer

---

## 📋 PHASE 4: IMPLÉMENTATION DES SECTIONS (3-4 heures)

### ÉTAPE 4.1: Section About - Implémentation Complète

**Action:** Dans `src/App.tsx`, remplacer la fonction `AboutSection()` par:

```tsx
function AboutSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={ref} id="about" className="relative py-24 lg:py-32 bg-graphite/30 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-energy-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-8" hover>
              <div className="aspect-[4/3] bg-gradient-to-br from-energy-green/20 to-cyber-blue/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for image - will be replaced with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl text-energy-green/30">
                    <FaNetworkWired />
                  </div>
                </div>
                
                {/* Animated Grid Overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" 
                    style={{
                      backgroundImage: 'linear-gradient(#00FF87 1px, transparent 1px), linear-gradient(90deg, #00FF87 1px, transparent 1px)',
                      backgroundSize: '50px 50px'
                    }}
                  />
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-energy-green" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-energy-green" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-energy-green" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-energy-green" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-block px-4 py-2 mb-6 backdrop-blur-sm bg-energy-green/10 border border-energy-green/30 rounded-full">
              <span className="text-energy-green text-sm font-bold tracking-wider uppercase">
                Who We Are
              </span>
            </div>

            <h2 className="font-display text-display font-bold mb-6 leading-tight">
              Building Tomorrow's
              <GradientText className="block">
                Infrastructure Today
              </GradientText>
            </h2>

            <p className="text-lg text-white/70 mb-4 leading-relaxed">
              We don't just install power systems. We <span className="text-energy-green font-semibold">architect the intelligent energy ecosystem</span> that will power Africa's digital revolution.
            </p>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              From smart grids to sustainable solutions, from data centers to distribution networks — we're engineering the backbone of progress.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Technology-First Energy Solutions',
                'Sustainable & Scalable Infrastructure',
                'Digital Integration at Every Level',
                'African Innovation for African Challenges'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-6 h-6 rounded-full bg-energy-green/20 flex items-center justify-center group-hover:bg-energy-green/30 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-energy-green" />
                  </div>
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

**✅ Validation:** Section About s'affiche avec animations au scroll.

---

### ÉTAPE 4.2: Section Services - Implémentation Complète

**Action:** Remplacer la fonction `ServicesSection()` par:

```tsx
function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const services = [
    {
      title: 'Smart Grid Solutions',
      subtitle: 'Intelligent Power Distribution',
      description: 'We design, build, and optimize smart electrical grids that combine traditional infrastructure with cutting-edge IoT, AI monitoring, and predictive maintenance.',
      features: [
        'SCADA & Telecontrol Systems',
        'HV/MV/LV Network Integration',
        'Real-time Grid Analytics',
        'Cybersecurity Infrastructure'
      ],
      icon: <FaBolt />,
      gradient: 'from-energy-green to-emerald-400'
    },
    {
      title: 'Digital Infrastructure',
      subtitle: 'Technology That Powers Progress',
      description: 'From cloud architecture to custom software, we build the digital backbone that modern energy systems require.',
      features: [
        'IoT Platform Development',
        'Energy Management Systems',
        'Data Analytics & BI',
        'Cloud & Edge Computing'
      ],
      icon: <FaNetworkWired />,
      gradient: 'from-cyber-blue to-blue-400'
    },
    {
      title: 'Sustainable Integration',
      subtitle: 'Clean Energy, Smart Implementation',
      description: 'Solar, wind, hybrid systems — integrated seamlessly into existing infrastructure with intelligent switching and storage optimization.',
      features: [
        'Renewable Integration',
        'Energy Storage Systems',
        'Microgrid Solutions',
        'Carbon Monitoring'
      ],
      icon: <FaSolarPanel />,
      gradient: 'from-solar-orange to-yellow-400'
    }
  ];

  return (
    <section ref={ref} id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-graphite/50 to-deep-black" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-4 py-2 mb-6 backdrop-blur-sm bg-cyber-blue/10 border border-cyber-blue/30 rounded-full">
            <span className="text-cyber-blue text-sm font-bold tracking-wider uppercase">
              What We Do
            </span>
          </div>
          
          <h2 className="font-display text-display font-bold mb-4">
            End-to-End <GradientText>Energy & Digital</GradientText> Solutions
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Comprehensive solutions that bridge the gap between traditional energy and the digital future
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <GlassCard className="h-full p-8 group cursor-pointer" hover>
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} bg-opacity-20 flex items-center justify-center mb-6 text-3xl text-white group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl font-bold mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-energy-green mb-4 font-semibold">
                  {service.subtitle}
                </p>

                {/* Description */}
                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-energy-green mt-1">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-energy-green font-semibold text-sm flex items-center gap-2"
                >
                  Learn More 
                  <span className="text-lg">→</span>
                </motion.div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**✅ Validation:** 3 cartes de services s'affichent avec animations.

---

### ÉTAPE 4.3: Sections Restantes - Implémentation Rapide

**Action:** Remplacer les fonctions `VisionSection()`, `ValuesSection()`, `CTASection()`, et `Footer()`:

```tsx
function VisionSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section ref={ref} id="vision" className="relative py-24 lg:py-32 bg-graphite/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-display font-bold mb-8">
            Our <GradientText>Vision for 2030</GradientText>
          </h2>
          
          <blockquote className="text-3xl lg:text-4xl font-display font-medium text-white/90 max-w-4xl mx-auto leading-relaxed">
            "A fully connected, sustainable energy network across Africa — 
            where power is <GradientText>clean, reliable, and intelligently distributed.</GradientText>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const values = [
    {
      icon: <FaBolt />,
      title: 'Innovation',
      description: "We don't follow trends — we create them."
    },
    {
      icon: <FaShieldAlt />,
      title: 'Reliability',
      description: "99.8% uptime isn't a goal. It's our standard."
    },
    {
      icon: <FaLeaf />,
      title: 'Sustainability',
      description: "Clean energy isn't optional. It's essential."
    },
    {
      icon: <FaNetworkWired />,
      title: 'Partnership',
      description: "Your success is our mission."
    }
  ];

  return (
    <section ref={ref} className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="font-display text-display font-bold mb-4">
            What <GradientText>Drives Us</GradientText>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="p-8 text-center h-full" hover>
                <div className="text-5xl text-energy-green mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-energy-green/20 via-cyber-blue/20 to-plasma-purple/20 blur-3xl"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="font-display text-display font-bold mb-6">
          Ready to Power <GradientText>Your Future?</GradientText>
        </h2>
        
        <p className="text-xl text-white/70 mb-10">
          Let's discuss how our solutions can transform your energy infrastructure.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg"
          >
            Schedule Consultation
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 backdrop-blur-sm bg-white/5 border-2 border-white/20 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
          >
            Download Case Studies
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative bg-deep-black border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-2xl font-display font-bold mb-4">
              DIGITA <GradientText>ENERGY</GradientText>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Energizing Africa's Future Through Innovation & Technology
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Smart Grid</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Digital Infrastructure</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Sustainable Energy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Vision</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>contact@digita-energy.com</li>
              <li>+225 XX XX XX XX XX</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; 2025 Digita Energy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**✅ Validation:** Toutes les sections s'affichent et s'animent correctement.

---

## 📋 PHASE 5: FINALISATION & TESTS (30 minutes)

### ÉTAPE 5.1: Test Complet du Site

**Actions à effectuer:**

1. **Scroll complet** du haut vers le bas
2. **Vérifier toutes les animations** au scroll
3. **Tester les hovers** sur tous les boutons et cartes
4. **Vérifier la navigation** (clic sur les liens)
5. **Test responsive** (redimensionner la fenêtre)

**✅ Checklist:**
- [ ] Hero s'affiche correctement
- [ ] Gradients animés fonctionnent
- [ ] Stats s'animent au scroll
- [ ] Section About apparaît au scroll
- [ ] 3 cartes Services s'affichent
- [ ] Toutes les icônes sont visibles
- [ ] Hovers fonctionnent sur les cartes
- [ ] CTA section visible
- [ ] Footer complet
- [ ] Navigation sticky fonctionne
- [ ] Texture de bruit visible (subtil)

---

### ÉTAPE 5.2: Optimisations de Performance

**Fichier:** `src/index.css`

**Action:** Ajouter à la fin du fichier:

```css
/* Performance optimizations */
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}
```

**✅ Validation:** CSS appliqué, scroll plus fluide.

---

## 📋 PHASE 6: GÉNÉRATION DES IMAGES (À FAIRE SÉPARÉMENT)

### ÉTAPE 6.1: Utiliser les Prompts d'Images

**Référence:** Voir le fichier `COMPLETE_SITE_REIMAGINATION.md` section "COMPLETE IMAGE PROMPT GUIDE"

**Images à générer:**
1. Hero Background - Substation électrique futuriste
2. About Section - Équipe en control room
3. Service 1 - Circuit board macro
4. Service 2 - Server room moderne
5. Service 3 - Solar farm installation

**Outils recommandés:**
- Midjourney (meilleure qualité)
- DALL-E 3 (via ChatGPT Plus)
- Stable Diffusion XL (gratuit)
- Leonardo.ai (hybride)

**Format requis:**
- Résolution: 4K minimum (3840x2160)
- Format: JPG ou WebP
- Ratio: 16:9 ou 4:3 selon section
- Taille fichier: <500KB après optimisation

**Une fois générées, placer dans:** `/public/assets/`

---

## 📋 PHASE 7: INTÉGRATION DES IMAGES (30 minutes)

### ÉTAPE 7.1: Remplacer les Placeholders

**Dans `App.tsx`, section About:**

```tsx
// Remplacer cette ligne:
<div className="text-6xl text-energy-green/30">
  <FaNetworkWired />
</div>

// Par:
<img 
  src="/assets/about-control-room.jpg" 
  alt="Modern Energy Control Room"
  className="w-full h-full object-cover rounded-xl"
/>
```

**Pour les services, ajouter des backgrounds:**

```tsx
// Dans chaque service card, ajouter:
<div 
  className="absolute inset-0 opacity-10 bg-cover bg-center rounded-2xl"
  style={{ backgroundImage: 'url(/assets/service-1.jpg)' }}
/>
```

**✅ Validation:** Images s'affichent correctement.

---

## 📋 RÉCAPITULATIF FINAL

### Ce qui a été accompli:

✅ **Design System moderne** installé  
✅ **Nouvelles couleurs** (Electric Green, Cyber Blue, etc.)  
✅ **Typographie moderne** (Space Grotesk + Inter)  
✅ **Hero Section** avec gradients animés  
✅ **Navigation glassmorphique** sticky  
✅ **Section Stats** avec compteurs animés  
✅ **Section About** avec glass cards  
✅ **Section Services** avec 3 cartes interactives  
✅ **Section Vision** avec quote  
✅ **Section Values** avec 4 valeurs  
✅ **Section CTA** avec background animé  
✅ **Footer** complet  
✅ **Animations au scroll** (Framer Motion)  
✅ **Effets hover** sur tous les éléments interactifs  
✅ **Graphismes** (circuit patterns, noise texture)  
✅ **Responsive** (adaptatif mobile/desktop)

---

## 📝 PROCHAINES ÉTAPES (OPTIONNELLES)

### Pour aller plus loin:

1. **Ajouter particules 3D** (Three.js)
2. **Créer plus de graphismes SVG** personnalisés
3. **Ajouter section Blog**
4. **Créer pages détaillées** pour chaque service
5. **Implémenter formulaire contact** fonctionnel
6. **Ajouter animations de chargement**
7. **Optimiser les images** (compression WebP)
8. **SEO complet** (meta tags, sitemap)
9. **Google Analytics**
10. **Tests A/B** pour conversion

---

## 🎯 RÉSULTAT ATTENDU

Un site web **ultra-moderne**, **visuellement impressionnant**, avec:
- Design digne des meilleurs sites primés
- Animations fluides et professionnelles
- Graphismes riches (lignes, patterns, textures)
- Palette de couleurs vibrante mais sophistiquée
- Expérience utilisateur exceptionnelle
- Temps de chargement optimisé
- Entièrement responsive

---

## 🆘 EN CAS DE PROBLÈME

### Erreur de compilation:
```bash
# Arrêter le serveur
Ctrl + C

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Animations ne fonctionnent pas:
- Vérifier que Framer Motion est installé
- Vérifier la console pour erreurs JavaScript

### Couleurs ne s'affichent pas:
- Vérifier que Tailwind config est correct
- Redémarrer le serveur dev

---

**PLAN D'ACTION COMPLET - PRÊT À EXÉCUTER! 🚀**

Suivre chaque étape dans l'ordre, valider avant de passer à la suivante.
