import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';
import { 
  FaBolt, 
  FaNetworkWired, 
  FaSolarPanel, 
  FaShieldAlt, 
  FaLeaf, 
  FaUsers 
} from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

// Counter component with animation
function Counter({ target, suffix = '', decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const timer = setTimeout(() => setHasStarted(true), 1000);
      return () => clearTimeout(timer);
    }

    if (hasStarted && count < target) {
      const increment = target / 50;
      const timer = setTimeout(() => {
        setCount(prev => {
          const next = prev + increment;
          return next > target ? target : next;
        });
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [count, target, hasStarted]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
  return <>{displayValue}{suffix}</>;
}

// Animated rotating words component with color transition
function AnimatedWord() {
  const words = [
    { text: 'ÉNERGISER', color: 'from-orange-500 to-orange-400' },
    { text: 'DÉVELOPPER', color: 'from-blue-500 to-blue-400' },
    { text: 'CHANGER', color: 'from-energy-green to-emerald-400' }
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-none relative h-[1.2em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ 
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1]
          }}
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-r ${words[currentIndex].color} bg-clip-text text-transparent`}
        >
          {words[currentIndex].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="w-full h-full object-cover opacity-70"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <source src="/modern-website/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-deep-black/20 to-deep-black/50 z-10" />
          
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

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          </motion.div>

          <motion.h1 
            className="font-display font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <AnimatedWord />
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold leading-none mt-2 text-center text-white">
              L'AFRIQUE
            </span>
          </motion.h1>



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
              <span className="relative z-10">Découvrir nos solutions</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 backdrop-blur-sm bg-white/5 border-2 border-white/20 rounded-lg font-bold text-lg hover:bg-white/10 hover:border-energy-green/50 transition-all duration-300"
            >
              Démarrer votre projet →
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-energy-green text-3xl mb-3 flex justify-center">
                <FaBolt />
              </div>
              <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
                <GradientText><Counter target={1.2} suffix="GW+" decimals={1} /></GradientText>
              </div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">Énergie Gérée</div>
            </div>
            
            <div className="text-center">
              <div className="text-energy-green text-3xl mb-3 flex justify-center">
                <FaNetworkWired />
              </div>
              <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
                <GradientText><Counter target={450} suffix="+" /></GradientText>
              </div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">Projets Livrés</div>
            </div>
            
            <div className="text-center">
              <div className="text-energy-green text-3xl mb-3 flex justify-center">
                <FaUsers />
              </div>
              <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
                <GradientText><Counter target={12} /></GradientText>
              </div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">Pays</div>
            </div>
            
            <div className="text-center">
              <div className="text-energy-green text-3xl mb-3 flex justify-center">
                <FaShieldAlt />
              </div>
              <div className="text-4xl lg:text-5xl font-display font-bold mb-2">
                <GradientText><Counter target={99.8} suffix="%" decimals={1} /></GradientText>
              </div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">Disponibilité SLA</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs font-medium tracking-wider">DÉFILER</span>
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

// About Section
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
                {/* Placeholder for image */}
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
                Qui Sommes-Nous
              </span>
            </div>

            <h2 className="font-display text-display font-bold mb-6 leading-tight">
              Construire les
              <GradientText className="block">
                Infrastructures de Demain
              </GradientText>
            </h2>

            <p className="text-lg text-white/70 mb-4 leading-relaxed">
              Nous ne nous contentons pas d'installer des systèmes électriques. Nous <span className="text-energy-green font-semibold">concevons l'écosystème énergétique intelligent</span> qui alimentera la révolution numérique de l'Afrique.
            </p>

            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Des réseaux intelligents aux solutions durables, des centres de données aux réseaux de distribution — nous façonnons l'épine dorsale du progrès.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                'Solutions Énergétiques Axées sur la Technologie',
                'Infrastructure Durable et Évolutive',
                'Intégration Numérique à Tous les Niveaux',
                'Innovation Africaine pour Défis Africains'
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

// Services Section
function ServicesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const services = [
    {
      title: 'Solutions Réseau Intelligent',
      subtitle: 'Distribution Électrique Intelligente',
      description: 'Nous concevons, construisons et optimisons des réseaux électriques intelligents combinant infrastructure traditionnelle et IoT de pointe, surveillance IA et maintenance prédictive.',
      features: [
        'Systèmes SCADA & Téléconduite',
        'Intégration Réseau HT/MT/BT',
        'Analytique Réseau en Temps Réel',
        'Infrastructure de Cybersécurité'
      ],
      icon: <FaBolt />,
      gradient: 'from-energy-green to-emerald-400'
    },
    {
      title: 'Infrastructure Numérique',
      subtitle: 'Technologie Qui Alimente le Progrès',
      description: 'De l\'architecture cloud aux logiciels personnalisés, nous construisons l\'épine dorsale numérique dont les systèmes énergétiques modernes ont besoin.',
      features: [
        'Développement Plateforme IoT',
        'Systèmes de Gestion Énergétique',
        'Analytique de Données & BI',
        'Cloud & Edge Computing'
      ],
      icon: <FaNetworkWired />,
      gradient: 'from-cyber-blue to-blue-400'
    },
    {
      title: 'Intégration Durable',
      subtitle: 'Énergie Propre, Mise en Œuvre Intelligente',
      description: 'Systèmes solaires, éoliens, hybrides — intégrés de manière transparente dans l\'infrastructure existante avec commutation intelligente et optimisation du stockage.',
      features: [
        'Intégration des Énergies Renouvelables',
        'Systèmes de Stockage d\'Énergie',
        'Solutions de Micro-réseaux',
        'Suivi Carbone'
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
              Ce Que Nous Faisons
            </span>
          </div>
          
          <h2 className="font-display text-display font-bold mb-4">
            Solutions Complètes <GradientText>Énergie & Numérique</GradientText>
          </h2>
          
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Des solutions complètes qui font le pont entre l'énergie traditionnelle et l'avenir numérique
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
                  En Savoir Plus 
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

// Vision Section
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
            Notre <GradientText>Vision pour 2030</GradientText>
          </h2>
          
          <blockquote className="text-3xl lg:text-4xl font-display font-medium text-white/90 max-w-4xl mx-auto leading-relaxed">
            "Un réseau énergétique durable et entièrement connecté à travers l'Afrique — 
            où l'énergie est <GradientText>propre, fiable et intelligemment distribuée.</GradientText>"
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

// Values Section
function ValuesSection() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  const values = [
    {
      icon: <FaBolt />,
      title: 'Innovation',
      description: "Nous ne suivons pas les tendances — nous les créons."
    },
    {
      icon: <FaShieldAlt />,
      title: 'Fiabilité',
      description: "99,8% de disponibilité n'est pas un objectif. C'est notre standard."
    },
    {
      icon: <FaLeaf />,
      title: 'Durabilité',
      description: "L'énergie propre n'est pas optionnelle. Elle est essentielle."
    },
    {
      icon: <FaNetworkWired />,
      title: 'Partenariat',
      description: "Votre succès est notre mission."
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
            Ce Qui <GradientText>Nous Anime</GradientText>
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

// CTA Section
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
          Prêt à Alimenter <GradientText>Votre Avenir ?</GradientText>
        </h2>
        
        <p className="text-xl text-white/70 mb-10">
          Discutons de la façon dont nos solutions peuvent transformer votre infrastructure énergétique.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg"
          >
            Planifier une Consultation
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 backdrop-blur-sm bg-white/5 border-2 border-white/20 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
          >
            Télécharger les Études de Cas
          </motion.button>
        </div>
      </div>
    </section>
  );
}

// Footer
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
              Énergiser l'Avenir de l'Afrique par l'Innovation et la Technologie
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Réseau Intelligent</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Infrastructure Numérique</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Énergie Durable</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Entreprise</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">À Propos</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Vision</a></li>
              <li><a href="#" className="text-white/60 hover:text-energy-green text-sm transition-colors">Carrières</a></li>
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
            &copy; 2025 Digita Energy. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
