import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBolt, FaNetworkWired, FaServer, FaChartLine, FaCloud, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';

function ProductsServices() {
  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      <NoiseTexture />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-deep-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform">
            DIGITA <GradientText>ENERGY</GradientText>
          </Link>
          
          <div className="flex gap-8 items-center">
            <Link to="/" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              Accueil
            </Link>
            <Link to="/#about" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              À propos
            </Link>
            <Link to="/#services" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              Services
            </Link>
            <Link to="/products-services" className="text-sm font-medium text-energy-green">
              Produits & Services
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Header */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-display font-bold mb-6">
              Produits & <GradientText>Services</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Une offre complète alliant solutions énergétiques et expertise digitale
            </p>
          </motion.div>
        </div>
      </section>

      {/* Energy Section */}
      <section id="energy" className="relative py-24 bg-graphite/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-block px-4 py-2 mb-6 backdrop-blur-sm bg-energy-green/10 border border-energy-green/30 rounded-full">
              <span className="text-energy-green text-sm font-bold tracking-wider uppercase">
                Solutions Énergie
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Produits & Services <GradientText>Énergétiques</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Products */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaBolt className="text-3xl text-energy-green" />
                <h3 className="font-display text-2xl font-bold">Produits</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-energy-green mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Transformateurs HT/MT/BT</h4>
                    <p className="text-sm text-white/60">Solutions de transformation électrique haute performance</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-energy-green mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Postes de Distribution</h4>
                    <p className="text-sm text-white/60">Infrastructure de distribution intelligente et sécurisée</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-energy-green mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Systèmes SCADA</h4>
                    <p className="text-sm text-white/60">Supervision et contrôle en temps réel</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-energy-green mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Protection & Automatisation</h4>
                    <p className="text-sm text-white/60">Dispositifs de protection et systèmes automatisés</p>
                  </div>
                </li>
              </ul>
            </GlassCard>

            {/* Services */}
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FaNetworkWired className="text-3xl text-cyber-blue" />
                <h3 className="font-display text-2xl font-bold">Services</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-cyber-blue mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Ingénierie & Conception</h4>
                    <p className="text-sm text-white/60">Études techniques et conception de réseaux électriques</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-blue mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Installation & Commissioning</h4>
                    <p className="text-sm text-white/60">Mise en œuvre clé en main de vos infrastructures</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-blue mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Maintenance Préventive</h4>
                    <p className="text-sm text-white/60">Programmes de maintenance avec IA prédictive</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyber-blue mt-1">→</span>
                  <div>
                    <h4 className="font-bold mb-1">Audit & Optimisation</h4>
                    <p className="text-sm text-white/60">Analyse et amélioration de performance réseau</p>
                  </div>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Digital Section */}
      <section id="digital" className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-block px-4 py-2 mb-6 backdrop-blur-sm bg-cyber-blue/10 border border-cyber-blue/30 rounded-full">
              <span className="text-cyber-blue text-sm font-bold tracking-wider uppercase">
                Solutions Digital
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold mb-4">
              Services <GradientText>Digitaux</GradientText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassCard className="p-8" hover>
              <FaCloud className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Cloud & Infrastructure</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ Architecture Cloud Native</li>
                <li>→ Migration Cloud</li>
                <li>→ DevOps & CI/CD</li>
                <li>→ Infrastructure as Code</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <FaServer className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Plateformes IoT</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ Développement IoT</li>
                <li>→ Edge Computing</li>
                <li>→ Gestion de Capteurs</li>
                <li>→ Intégration MQTT/REST</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <FaChartLine className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Data & Analytics</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ Business Intelligence</li>
                <li>→ Data Warehousing</li>
                <li>→ Analytics Temps Réel</li>
                <li>→ Machine Learning</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <FaDatabase className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Systèmes de Gestion</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ ERP Énergétique</li>
                <li>→ Gestion de Flotte</li>
                <li>→ CRM & Facturation</li>
                <li>→ Workflow Automation</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <FaMobileAlt className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Applications Mobiles</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ Apps iOS & Android</li>
                <li>→ Progressive Web Apps</li>
                <li>→ Applications Terrain</li>
                <li>→ Interfaces Utilisateur</li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" hover>
              <FaNetworkWired className="text-4xl text-cyber-blue mb-4" />
              <h3 className="font-display text-xl font-bold mb-3">Intégration & API</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>→ API REST/GraphQL</li>
                <li>→ Intégration Systèmes</li>
                <li>→ Middleware</li>
                <li>→ Microservices</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-graphite/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Besoin d'une Solution <GradientText>Sur Mesure ?</GradientText>
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Discutons de vos besoins spécifiques et construisons ensemble la solution idéale
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg"
          >
            Contactez-Nous
          </motion.button>
        </div>
      </section>
    </div>
  );
}

export default ProductsServices;
