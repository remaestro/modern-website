import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaCloud, FaCheckCircle, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import ProgressStepper from '../components/ui/ProgressStepper';
import { sendEmailWithRetry } from '../services/emailService';

const STEPS = [
  { id: 1, title: 'État des Lieux', duration: '5-7min' },
  { id: 2, title: 'Profil de Charge', duration: '3-4min' },
  { id: 3, title: 'Roadmap & Budget', duration: '2-3min' },
  { id: 4, title: 'Résultats', duration: '2min' }
];

interface FormData {
  // Step 1
  infrastructure: string;
  serverCount: string;
  monthlyBudget: string;
  problems: string[];
  objectives: Record<string, number>;
  
  // Step 2
  requestsPerDay: string;
  dataVolume: string;
  compliance: string[];
  techStack: string;
  
  // Step 3
  timeline: string;
  devopsCount: string;
  trainingBudget: string;
  
  // Contact
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

function CloudInfrastructurePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    infrastructure: '',
    serverCount: '',
    monthlyBudget: '',
    problems: [],
    objectives: {
      cost: 0,
      scalability: 0,
      availability: 0,
      security: 0,
      innovation: 0
    },
    requestsPerDay: '',
    dataVolume: '',
    compliance: [],
    techStack: '',
    timeline: '',
    devopsCount: '',
    trainingBudget: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const updateObjectiveRating = (objective: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: { ...prev.objectives, [objective]: rating }
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      await sendEmailWithRetry({
        formType: 'CLOUD_INFRASTRUCTURE',
        data: { ...formData, maturityScore: calculateMaturityScore() }
      });
      setShowResults(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Erreur envoi:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const calculateMaturityScore = () => {
    let score = 0;
    
    // Infrastructure type
    if (formData.infrastructure === 'multi-cloud') score += 30;
    else if (formData.infrastructure === 'hybrid') score += 20;
    else if (formData.infrastructure === 'cloud') score += 15;
    
    // Budget allocation
    const budget = parseInt(formData.monthlyBudget.split('-')[0].replace(/\D/g, '')) || 0;
    if (budget > 20000) score += 25;
    else if (budget > 5000) score += 15;
    else if (budget > 1000) score += 10;
    
    // DevOps maturity
    const devops = parseInt(formData.devopsCount) || 0;
    if (devops > 5) score += 20;
    else if (devops > 2) score += 15;
    else if (devops > 0) score += 10;
    
    // Objectives clarity
    const objectivesSet = Object.values(formData.objectives).filter(v => v > 0).length;
    score += objectivesSet * 5;
    
    return Math.min(score, 100);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 80) return { level: 'Mature', color: 'text-energy-green', savings: '10-15%' };
    if (score >= 60) return { level: 'Avancé', color: 'text-cyber-blue', savings: '20-30%' };
    if (score >= 40) return { level: 'Intermédiaire', color: 'text-yellow-500', savings: '30-45%' };
    return { level: 'Débutant', color: 'text-orange-500', savings: '40-60%' };
  };

  const maturityScore = calculateMaturityScore();
  const maturityData = getMaturityLevel(maturityScore);

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
              <FaCloud className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold">
                Cloud & <GradientText>Infrastructure</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Audit technique interactif et devis dynamique pour votre migration cloud
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {!showResults && <ProgressStepper steps={STEPS} currentStep={currentStep} />}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="max-w-4xl mx-auto p-8">
              {currentStep === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">État des Lieux</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Infrastructure actuelle *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { value: 'on-premise', label: 'On-premise uniquement', desc: 'Serveurs physiques/virtuels en interne' },
                        { value: 'hybrid', label: 'Hybride', desc: 'Mix on-premise + cloud' },
                        { value: 'cloud', label: 'Cloud uniquement', desc: 'AWS, Azure, GCP...' },
                        { value: 'multi-cloud', label: 'Multi-cloud', desc: 'Plusieurs fournisseurs cloud' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('infrastructure', option.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.infrastructure === option.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold mb-1">{option.label}</div>
                          <div className="text-sm text-white/60">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Nombre de serveurs/VMs actuels *</label>
                    <input
                      type="number"
                      value={formData.serverCount}
                      onChange={(e) => updateFormData('serverCount', e.target.value)}
                      placeholder="Ex: 25"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                    <p className="text-xs text-white/50 mt-2">Production + Staging + Dev</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Budget infrastructure mensuel actuel *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['$500-$1K', '$1K-$5K', '$5K-$20K', '$20K+'].map(range => (
                        <button
                          key={range}
                          onClick={() => updateFormData('monthlyBudget', range)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.monthlyBudget === range
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Problèmes actuels (plusieurs choix possibles)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Coûts élevés',
                        'Scalabilité limitée',
                        'Sécurité insuffisante',
                        'Manque de monitoring',
                        'Déploiements lents',
                        'Downtime fréquent'
                      ].map(problem => (
                        <button
                          key={problem}
                          onClick={() => toggleArrayValue('problems', problem)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.problems.includes(problem)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {problem}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Priorisez vos objectifs (1 = faible, 5 = élevé)</label>
                    <div className="space-y-4">
                      {[
                        { key: 'cost', label: 'Réduction des coûts' },
                        { key: 'scalability', label: 'Scalabilité automatique' },
                        { key: 'availability', label: 'Haute disponibilité' },
                        { key: 'security', label: 'Conformité/Sécurité' },
                        { key: 'innovation', label: 'Innovation rapide' }
                      ].map(obj => (
                        <div key={obj.key}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">{obj.label}</span>
                            <span className="text-sm text-energy-green font-bold">
                              {formData.objectives[obj.key] || 0}/5
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => updateObjectiveRating(obj.key, rating)}
                                className={`flex-1 h-10 rounded transition-all ${
                                  formData.objectives[obj.key] >= rating
                                    ? 'bg-gradient-to-r from-energy-green to-cyber-blue'
                                    : 'bg-white/10 hover:bg-white/20'
                                }`}
                              >
                                {rating}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Profil de Charge</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Nombre de requêtes par jour</label>
                    <input
                      type="text"
                      value={formData.requestsPerDay}
                      onChange={(e) => updateFormData('requestsPerDay', e.target.value)}
                      placeholder="Ex: 1,000,000"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Volume de données (TB)</label>
                    <input
                      type="text"
                      value={formData.dataVolume}
                      onChange={(e) => updateFormData('dataVolume', e.target.value)}
                      placeholder="Ex: 50 TB"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Conformité requise</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['GDPR', 'ISO 27001', 'SOC 2', 'HIPAA', 'PCI DSS', 'Aucune'].map(comp => (
                        <button
                          key={comp}
                          onClick={() => toggleArrayValue('compliance', comp)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.compliance.includes(comp)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Stack technologique principal</label>
                    <textarea
                      value={formData.techStack}
                      onChange={(e) => updateFormData('techStack', e.target.value)}
                      rows={4}
                      placeholder="Ex: Node.js, React, PostgreSQL, Redis, Nginx..."
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Roadmap & Budget</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Timeline souhaité *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'immediate', label: 'Immédiat', desc: '< 1 mois' },
                        { value: '1-3months', label: '1-3 mois', desc: 'Court terme' },
                        { value: '3-6months', label: '3-6 mois', desc: 'Moyen terme' },
                        { value: '6-12months', label: '6-12 mois', desc: 'Long terme' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('timeline', option.value)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            formData.timeline === option.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold text-sm mb-1">{option.label}</div>
                          <div className="text-xs text-white/60">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Équipe DevOps disponible</label>
                    <input
                      type="number"
                      value={formData.devopsCount}
                      onChange={(e) => updateFormData('devopsCount', e.target.value)}
                      placeholder="Nombre de DevOps Engineers"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Budget formation annuel</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['< $5K', '$5K-$20K', '$20K-$50K', '$50K+'].map(range => (
                        <button
                          key={range}
                          onClick={() => updateFormData('trainingBudget', range)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.trainingBudget === range
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xl font-bold mb-4">Vos coordonnées</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        placeholder="Entreprise *"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => updateFormData('contactName', e.target.value)}
                        placeholder="Nom du contact *"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        placeholder="Email *"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        placeholder="Téléphone *"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && showResults && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="inline-block"
                    >
                      <FaCheckCircle className="text-6xl text-energy-green mb-4" />
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-2">Analyse Complétée !</h2>
                    <p className="text-white/70">Voici votre rapport personnalisé</p>
                  </div>

                  <div className="bg-gradient-to-r from-energy-green/20 to-cyber-blue/20 border border-energy-green/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Score de Maturité Cloud</h3>
                    <div className="flex items-center gap-6">
                      <div className="relative w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-white/10"
                          />
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 56}`}
                            strokeDashoffset={`${2 * Math.PI * 56 * (1 - maturityScore / 100)}`}
                            className="text-energy-green transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">{maturityScore}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-2xl font-bold mb-2 ${maturityData.color}`}>
                          {maturityData.level}
                        </p>
                        <p className="text-white/70 mb-2">
                          Économies potentielles : <span className="text-energy-green font-bold">{maturityData.savings}</span>
                        </p>
                        <p className="text-sm text-white/60">
                          Basé sur votre infrastructure actuelle et vos objectifs
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3">📊 Infrastructure Actuelle</h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>• Type : {formData.infrastructure}</li>
                        <li>• Serveurs : {formData.serverCount}</li>
                        <li>• Budget mensuel : {formData.monthlyBudget}</li>
                        <li>• DevOps : {formData.devopsCount || '0'} engineers</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3">🎯 Prochaines Étapes</h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>✓ Audit technique approfondi</li>
                        <li>✓ Architecture cloud recommandée</li>
                        <li>✓ Plan de migration détaillé</li>
                        <li>✓ Estimation budgétaire précise</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="font-bold mb-3">💡 Recommandations Prioritaires</h4>
                    <div className="space-y-3 text-sm text-white/70">
                      {formData.problems.includes('Coûts élevés') && (
                        <p>• Optimisation des ressources cloud avec auto-scaling pour réduire les coûts de 20-30%</p>
                      )}
                      {formData.problems.includes('Déploiements lents') && (
                        <p>• Mise en place d'un pipeline CI/CD pour accélérer les déploiements de 10x</p>
                      )}
                      {formData.compliance.length > 0 && (
                        <p>• Configuration infrastructure conforme {formData.compliance.join(', ')}</p>
                      )}
                      {parseInt(formData.devopsCount) < 2 && (
                        <p>• Formation DevOps recommandée ou accompagnement managed services</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-energy-green to-cyber-blue rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <FaDownload /> Télécharger le Rapport PDF
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-energy-green rounded-lg font-bold hover:bg-energy-green/10 transition-all flex items-center justify-center gap-2">
                      <FaCalendarAlt /> Planifier une Consultation
                    </button>
                  </div>
                </div>
              )}

              {currentStep < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-6 py-3 rounded-lg border border-white/10 hover:border-energy-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-energy-green to-cyber-blue hover:opacity-90 transition-all"
                    >
                      Suivant
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-energy-green to-cyber-blue hover:opacity-90 transition-all"
                    >
                      Voir les Résultats
                    </button>
                  )}
                </div>
              )}
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CloudInfrastructurePage;
