import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaRocket, FaBolt, FaCloud, FaIndustry, FaCheck, FaTimes } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';

interface WizardStep {
  question: string;
  options: {
    label: string;
    value: string;
    icon: any;
    desc: string;
  }[];
}

const WIZARD_STEPS: WizardStep[] = [
  {
    question: "Quel est votre besoin principal ?",
    options: [
      { 
        value: 'energy', 
        label: 'Infrastructures Électriques', 
        icon: FaBolt,
        desc: 'Transformateurs, postes sources, distribution'
      },
      { 
        value: 'digital', 
        label: 'Solutions Digitales', 
        icon: FaCloud,
        desc: 'Cloud, IoT, Analytics, Applications'
      },
      { 
        value: 'both', 
        label: 'Solutions Complètes', 
        icon: FaIndustry,
        desc: 'Énergie + Digital intégrés'
      }
    ]
  },
  {
    question: "Quelle est votre priorité ?",
    options: [
      { value: 'new', label: 'Nouveau projet', icon: FaRocket, desc: 'Installation from scratch' },
      { value: 'upgrade', label: 'Modernisation', icon: FaBolt, desc: 'Upgrade infrastructure existante' },
      { value: 'optimize', label: 'Optimisation', icon: FaCloud, desc: 'Améliorer performance/coûts' },
      { value: 'maintain', label: 'Maintenance', icon: FaCheck, desc: 'Support & maintenance' }
    ]
  }
];

const RECOMMENDATIONS: Record<string, any> = {
  'energy-new': {
    title: 'Infrastructure Électrique Clé en Main',
    solutions: [
      { name: 'Transformateurs HT/MT/BT', url: '/products/transformers' },
      { name: 'Postes Sources', url: '/products/source-substations' },
      { name: 'Engineering & Études', url: '/services/engineering' },
      { name: 'Installation', url: '/services/installation' }
    ]
  },
  'energy-upgrade': {
    title: 'Modernisation Infrastructure',
    solutions: [
      { name: 'SCADA & Supervision', url: '/products/scada' },
      { name: 'Systèmes de Protection', url: '/products/protection' },
      { name: 'Audit & Optimisation', url: '/services/audit' },
      { name: 'Engineering', url: '/services/engineering' }
    ]
  },
  'energy-optimize': {
    title: 'Optimisation Énergétique',
    solutions: [
      { name: 'Audit & Optimisation', url: '/services/audit' },
      { name: 'SCADA & Monitoring', url: '/products/scada' },
      { name: 'Maintenance Préventive', url: '/services/maintenance' },
      { name: 'Data Analytics', url: '/digital/data-analytics' }
    ]
  },
  'energy-maintain': {
    title: 'Maintenance & Support',
    solutions: [
      { name: 'Maintenance Préventive', url: '/services/maintenance' },
      { name: 'Audit Technique', url: '/services/audit' },
      { name: 'SCADA & Monitoring', url: '/products/scada' }
    ]
  },
  'digital-new': {
    title: 'Solutions Digitales',
    solutions: [
      { name: 'Cloud & Infrastructure', url: '/digital/cloud-infrastructure' },
      { name: 'Applications Mobiles', url: '/digital/mobile-apps' },
      { name: 'Plateforme IoT', url: '/digital/iot-platform' },
      { name: 'Data & Analytics', url: '/digital/data-analytics' }
    ]
  },
  'digital-upgrade': {
    title: 'Transformation Digitale',
    solutions: [
      { name: 'Migration Cloud', url: '/digital/cloud-infrastructure' },
      { name: 'Plateforme IoT', url: '/digital/iot-platform' },
      { name: 'Data & Analytics', url: '/digital/data-analytics' }
    ]
  },
  'digital-optimize': {
    title: 'Optimisation Digital',
    solutions: [
      { name: 'Data & Analytics', url: '/digital/data-analytics' },
      { name: 'Cloud Infrastructure', url: '/digital/cloud-infrastructure' },
      { name: 'IoT Platform', url: '/digital/iot-platform' }
    ]
  },
  'digital-maintain': {
    title: 'Support Digital',
    solutions: [
      { name: 'Cloud Infrastructure', url: '/digital/cloud-infrastructure' },
      { name: 'Data Analytics', url: '/digital/data-analytics' }
    ]
  },
  'both-new': {
    title: 'Solution Complète Énergie + Digital',
    solutions: [
      { name: 'Engineering & Études', url: '/services/engineering' },
      { name: 'Postes Sources + SCADA', url: '/products/source-substations' },
      { name: 'Plateforme IoT', url: '/digital/iot-platform' },
      { name: 'Data Analytics', url: '/digital/data-analytics' },
      { name: 'Installation Complète', url: '/services/installation' }
    ]
  },
  'both-upgrade': {
    title: 'Modernisation Complète',
    solutions: [
      { name: 'SCADA & Protection', url: '/products/scada' },
      { name: 'Migration Cloud', url: '/digital/cloud-infrastructure' },
      { name: 'IoT & Capteurs', url: '/digital/iot-platform' },
      { name: 'Audit Technique', url: '/services/audit' }
    ]
  },
  'both-optimize': {
    title: 'Optimisation Globale',
    solutions: [
      { name: 'Audit & Optimisation', url: '/services/audit' },
      { name: 'Data Analytics', url: '/digital/data-analytics' },
      { name: 'IoT Monitoring', url: '/digital/iot-platform' },
      { name: 'Maintenance Prédictive', url: '/services/maintenance' }
    ]
  },
  'both-maintain': {
    title: 'Maintenance & Support Global',
    solutions: [
      { name: 'Maintenance Complète', url: '/services/maintenance' },
      { name: 'SCADA & Monitoring', url: '/products/scada' },
      { name: 'Data Analytics', url: '/digital/data-analytics' }
    ]
  }
};

interface ProjectWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProjectWizard({ isOpen, onClose }: ProjectWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getRecommendation = () => {
    const key = answers.join('-');
    return RECOMMENDATIONS[key] || RECOMMENDATIONS['both-new'];
  };

  if (!isOpen) return null;

  const recommendation = getRecommendation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <NoiseTexture />
        
        <GlassCard className="p-8 md:p-12">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>

          {!showResults ? (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <GradientText>Démarrez Votre Projet</GradientText>
                </h2>
                <p className="text-white/70">Répondez à 2 questions pour trouver vos solutions</p>
              </div>

              <div className="flex justify-center gap-2 mb-8">
                {WIZARD_STEPS.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx <= currentStep ? 'w-12 bg-energy-green' : 'w-8 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center mb-8">
                    {WIZARD_STEPS[currentStep].question}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {WIZARD_STEPS[currentStep].options.map((option) => {
                      const Icon = option.icon;
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-6 rounded-lg border-2 border-white/10 hover:border-energy-green bg-white/5 hover:bg-energy-green/10 transition-all text-left group"
                        >
                          <Icon className="text-4xl text-energy-green mb-3 group-hover:scale-110 transition-transform" />
                          <h4 className="font-bold text-lg mb-2">{option.label}</h4>
                          <p className="text-sm text-white/60">{option.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {currentStep > 0 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 border border-white/20 rounded-lg hover:border-energy-green transition-colors"
                  >
                    ← Retour
                  </button>
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.6 }}
                >
                  <FaCheck className="text-6xl text-energy-green mx-auto mb-4" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">
                  <GradientText>{recommendation.title}</GradientText>
                </h2>
                <p className="text-white/70">Voici les solutions recommandées pour vous</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendation.solutions.map((solution: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Link
                      to={solution.url}
                      onClick={onClose}
                      className="block p-4 rounded-lg border border-white/10 hover:border-energy-green bg-white/5 hover:bg-energy-green/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <FaCheck className="text-energy-green" />
                        <span className="font-medium group-hover:text-energy-green transition-colors">
                          {solution.name}
                        </span>
                        <span className="ml-auto text-white/40 group-hover:text-energy-green transition-colors">
                          →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 justify-center pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-white/20 rounded-lg hover:border-energy-green transition-colors"
                >
                  Recommencer
                </button>
                <Link
                  to="/products-services"
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-energy-green to-cyber-blue rounded-lg font-bold hover:opacity-90 transition-all"
                >
                  Voir toutes les solutions
                </Link>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

export default ProjectWizard;
