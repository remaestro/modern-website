import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaMobileAlt, FaCheckCircle, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import ProgressStepper from '../components/ui/ProgressStepper';

const STEPS = [
  { id: 1, title: 'Concept', duration: '5min' },
  { id: 2, title: 'Fonctionnalités', duration: '7min' },
  { id: 3, title: 'Résultats', duration: '2min' }
];

function MobileAppsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      <NoiseTexture />
      
      <nav className="fixed w-full z-50 bg-deep-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform">
            DIGITA <GradientText>ENERGY</GradientText>
          </Link>
          <div className="flex gap-6 items-center text-sm">
            <Link to="/products-services" className="text-white/70 hover:text-energy-green transition-colors">
              ← Retour aux services
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-6">
              <FaMobileAlt className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold">
                Applications <GradientText>Mobiles</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Configurez votre application mobile - Coming Soon
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <GlassCard className="max-w-4xl mx-auto p-12 text-center">
          <FaMobileAlt className="text-6xl text-cyber-blue mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">
            Configurateur d'Applications Mobiles
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Notre outil de configuration d'applications mobiles sera bientôt disponible. 
            Créez des apps iOS, Android et PWA avec estimation instantanée.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-3 bg-gradient-to-r from-energy-green to-cyber-blue rounded-lg font-bold hover:opacity-90 transition-all">
              Me notifier du lancement
            </button>
            <Link to="/products-services" className="px-6 py-3 border-2 border-energy-green rounded-lg font-bold hover:bg-energy-green/10 transition-all">
              Voir autres services
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default MobileAppsPage;
