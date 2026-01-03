import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaChartLine, FaLightbulb } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';
import { sendEmailWithRetry } from '../services/emailService';
import { emailService } from '../services/emailService';

interface Question {
  id: string;
  question: string;
  options: { value: number; label: string; }[];
}

const questions: Question[] = [
  {
    id: 'monitoring',
    question: 'Avez-vous un système de monitoring de votre consommation électrique ?',
    options: [
      { value: 0, label: 'Non, aucun suivi' },
      { value: 5, label: 'Suivi manuel mensuel' },
      { value: 10, label: 'Système automatisé basique' },
      { value: 15, label: 'Monitoring temps réel complet' }
    ]
  },
  {
    id: 'losses',
    question: 'Connaissez-vous le taux de pertes techniques de votre réseau ?',
    options: [
      { value: 0, label: 'Non, jamais mesuré' },
      { value: 5, label: 'Estimation approximative' },
      { value: 10, label: 'Oui, mesuré il y a > 2 ans' },
      { value: 15, label: 'Oui, mesuré récemment (< 1 an)' }
    ]
  },
  {
    id: 'maintenance',
    question: 'Quelle est votre politique de maintenance ?',
    options: [
      { value: 0, label: 'Maintenance corrective uniquement' },
      { value: 5, label: 'Préventive occasionnelle' },
      { value: 10, label: 'Préventive planifiée' },
      { value: 15, label: 'Prédictive avec monitoring' }
    ]
  },
  {
    id: 'equipment_age',
    question: 'Quel est l\'âge moyen de vos équipements ?',
    options: [
      { value: 0, label: '> 20 ans' },
      { value: 5, label: '10-20 ans' },
      { value: 10, label: '5-10 ans' },
      { value: 15, label: '< 5 ans' }
    ]
  },
  {
    id: 'power_quality',
    question: 'Rencontrez-vous des problèmes de qualité d\'énergie ?',
    options: [
      { value: 0, label: 'Fréquemment (> 5 fois/mois)' },
      { value: 5, label: 'Occasionnellement (2-5 fois/mois)' },
      { value: 10, label: 'Rarement (< 2 fois/mois)' },
      { value: 15, label: 'Jamais' }
    ]
  },
  {
    id: 'load_factor',
    question: 'Optimisez-vous votre facteur de charge ?',
    options: [
      { value: 0, label: 'Non, pas de gestion' },
      { value: 5, label: 'Sensibilisation équipes' },
      { value: 10, label: 'Oui, avec mesures manuelles' },
      { value: 15, label: 'Oui, avec automatisation' }
    ]
  },
  {
    id: 'capacity',
    question: 'Quel est votre taux d\'utilisation de capacité ?',
    options: [
      { value: 0, label: '> 90% (proche saturation)' },
      { value: 5, label: '70-90%' },
      { value: 10, label: '50-70%' },
      { value: 15, label: '< 50% (sous-utilisé)' }
    ]
  },
  {
    id: 'compliance',
    question: 'Êtes-vous conforme aux dernières normes électriques ?',
    options: [
      { value: 0, label: 'Non, normes obsolètes' },
      { value: 5, label: 'Partiellement conforme' },
      { value: 10, label: 'Conforme avec exceptions' },
      { value: 15, label: 'Totalement conforme' }
    ]
  },
  {
    id: 'energy_cost',
    question: 'Quelle part représente l\'énergie dans vos coûts opérationnels ?',
    options: [
      { value: 15, label: '> 30% (très élevé)' },
      { value: 10, label: '20-30%' },
      { value: 5, label: '10-20%' },
      { value: 0, label: '< 10%' }
    ]
  },
  {
    id: 'investment',
    question: 'Quand avez-vous investi dans votre infrastructure électrique ?',
    options: [
      { value: 0, label: 'Jamais ou > 10 ans' },
      { value: 5, label: '5-10 ans' },
      { value: 10, label: '2-5 ans' },
      { value: 15, label: '< 2 ans' }
    ]
  }
];

function AuditPage() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showContactForm, setShowContactForm] = useState(false);

  const [contactData, setContactData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setCurrentStep('results'), 300);
    }
  };

  const calculateScore = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxScore = questions.length * 15;
    return Math.round((total / maxScore) * 100);
  };

  const getScoreAnalysis = (score: number) => {
    if (score >= 80) {
      return {
        level: 'Excellent',
        color: 'text-energy-green',
        savings: '5-10%',
        message: 'Votre réseau est bien géré ! Un audit peut identifier des optimisations fines pour économiser 5-10% supplémentaires.'
      };
    } else if (score >= 60) {
      return {
        level: 'Bon',
        color: 'text-cyber-blue',
        savings: '15-25%',
        message: 'Des améliorations significatives sont possibles. Un audit détaillé peut vous faire économiser 15-25% sur vos coûts énergétiques.'
      };
    } else if (score >= 40) {
      return {
        level: 'Moyen',
        color: 'text-yellow-500',
        savings: '25-40%',
        message: 'Votre réseau a un fort potentiel d\'optimisation. Un audit peut révéler 25-40% d\'économies réalisables rapidement.'
      };
    } else {
      return {
        level: 'Critique',
        color: 'text-red-500',
        savings: '40-60%',
        message: 'Situation critique ! Un audit urgent est recommandé. Vous pourriez économiser 40-60% et éviter des pannes coûteuses.'
      };
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await emailService.sendWithRetry({
        formType: 'AUDIT',
        data: {
          ...contactData,
          score: calculateScore(),
          analysis: getScoreAnalysis(calculateScore())
        }
      });
      alert('✅ Demande d\'audit envoyée avec succès ! Nous vous contacterons rapidement.');
      setContactData({ companyName: '', contactName: '', email: '', phone: '' });
    } catch (error) {
      console.error('Erreur soumission:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const score = calculateScore();
  const analysis = getScoreAnalysis(score);

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaChartLine className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-5xl lg:text-6xl font-bold">
                Audit & <GradientText>Optimisation</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Découvrez votre potentiel d'économies en 2 minutes
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          {/* Intro */}
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard className="p-12 text-center">
                <FaLightbulb className="text-6xl text-energy-green mx-auto mb-6" />
                <h2 className="font-display text-3xl font-bold mb-4">
                  Évaluez votre réseau en <GradientText>10 questions</GradientText>
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                  Notre outil d'auto-évaluation analyse votre infrastructure électrique et estime votre potentiel d'économies. Gratuit et sans engagement.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyber-blue mb-2">2 min</div>
                    <div className="text-sm text-white/60">Durée</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-energy-green mb-2">10</div>
                    <div className="text-sm text-white/60">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-cyber-blue mb-2">0€</div>
                    <div className="text-sm text-white/60">Gratuit</div>
                  </div>
                </div>

                <motion.button
                  onClick={() => setCurrentStep('quiz')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-4 bg-gradient-to-r from-cyber-blue to-energy-green rounded-lg font-bold text-deep-black text-lg"
                >
                  Commencer l'évaluation
                </motion.button>
              </GlassCard>
            </motion.div>
          )}

          {/* Quiz */}
          {currentStep === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/60">Question {currentQuestion + 1} sur {questions.length}</span>
                  <span className="text-sm text-white/60">{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyber-blue to-energy-green"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <GlassCard className="p-8">
                <h3 className="font-display text-2xl font-bold mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyber-blue/50 rounded-lg text-left transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border-2 border-white/30 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-cyber-blue opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span>{option.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Results */}
          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <GlassCard className="p-12">
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="inline-block"
                  >
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <svg className="transform -rotate-90" width="192" height="192">
                        <circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="12"
                          fill="none"
                        />
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="88"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 88}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100) }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00D9FF" />
                            <stop offset="100%" stopColor="#7DFF6E" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold">{score}</div>
                        <div className="text-sm text-white/60">/ 100</div>
                      </div>
                    </div>
                  </motion.div>

                  <h2 className="font-display text-3xl font-bold mb-4">
                    Résultat : <span className={analysis.color}>{analysis.level}</span>
                  </h2>
                  <p className="text-white/70 max-w-2xl mx-auto mb-8">
                    {analysis.message}
                  </p>

                  <div className="inline-block px-8 py-4 bg-gradient-to-r from-energy-green/20 to-cyber-blue/20 border border-energy-green/30 rounded-lg mb-8">
                    <div className="text-sm text-white/60 mb-1">Économies potentielles estimées</div>
                    <div className="text-4xl font-bold text-energy-green">{analysis.savings}</div>
                    <div className="text-sm text-white/60">de vos coûts énergétiques</div>
                  </div>
                </div>

                {!showContactForm ? (
                  <div className="text-center">
                    <motion.button
                      onClick={() => setShowContactForm(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-12 py-4 bg-gradient-to-r from-cyber-blue to-energy-green rounded-lg font-bold text-deep-black text-lg"
                    >
                      Obtenir un audit détaillé GRATUIT
                    </motion.button>
                    <p className="text-xs text-white/50 mt-4">
                      Un de nos experts vous contactera sous 24h
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="font-display text-2xl font-bold mb-6 text-center">
                      Planifiez votre audit <GradientText>gratuit</GradientText>
                    </h3>
                    <form onSubmit={handleContactSubmit} className="max-w-xl mx-auto space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="companyName"
                          value={contactData.companyName}
                          onChange={handleContactChange}
                          required
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Entreprise *"
                        />
                        <input
                          type="text"
                          name="contactName"
                          value={contactData.contactName}
                          onChange={handleContactChange}
                          required
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Nom complet *"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="email"
                          name="email"
                          value={contactData.email}
                          onChange={handleContactChange}
                          required
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Email *"
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={contactData.phone}
                          onChange={handleContactChange}
                          required
                          className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Téléphone *"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-8 py-4 bg-gradient-to-r from-cyber-blue to-energy-green rounded-lg font-bold text-deep-black"
                      >
                        Demander mon audit gratuit
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AuditPage;
