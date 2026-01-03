import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaChartLine, FaCheckCircle, FaDownload, FaCalendarAlt } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import ProgressStepper from '../components/ui/ProgressStepper';
import { sendEmailWithRetry } from '../services/emailService';

const STEPS = [
  { id: 1, title: 'État des Données', duration: '6-8min' },
  { id: 2, title: 'Objectifs Analytics', duration: '5-6min' },
  { id: 3, title: 'Infrastructure', duration: '4-5min' },
  { id: 4, title: 'Résultats', duration: '2min' }
];

const MATURITY_LEVELS = [
  { level: 1, name: 'Chaotic', desc: 'Excel, silos de données' },
  { level: 2, name: 'Managed', desc: 'Quelques dashboards' },
  { level: 3, name: 'Defined', desc: 'Entrepôt centralisé' },
  { level: 4, name: 'Quantified', desc: 'Analytics avancé' },
  { level: 5, name: 'Optimized', desc: 'AI/ML en production' }
];

interface FormData {
  dataSources: string[];
  dataVolumes: Record<string, string>;
  dataGrowth: string;
  dataQuality: Record<string, number>;
  currentAccess: string[];
  reportDelay: string;
  useCases: Record<string, number>;
  users: Record<string, string>;
  refreshFrequency: string;
  infrastructure: string;
  existingTools: string[];
  teamSize: Record<string, string>;
  governance: string;
  compliance: string[];
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

function DataAnalyticsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    dataSources: [],
    dataVolumes: {},
    dataGrowth: '',
    dataQuality: { completeness: 0, accuracy: 0, consistency: 0, freshness: 0, documentation: 0 },
    currentAccess: [],
    reportDelay: '',
    useCases: { reporting: 0, predictive: 0, anomaly: 0, optimization: 0, customer: 0 },
    users: { exec: '', manager: '', analyst: '', ops: '' },
    refreshFrequency: '',
    infrastructure: '',
    existingTools: [],
    teamSize: { engineers: '', analysts: '', scientists: '' },
    governance: '',
    compliance: [],
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

  const updateRating = (category: string, field: string, rating: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: { ...((prev as any)[category] as Record<string, number>), [field]: rating }
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
        formType: 'DATA_ANALYTICS',
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
    
    // Data sources diversity
    score += formData.dataSources.length * 5;
    
    // Data quality average
    const qualityAvg = Object.values(formData.dataQuality).reduce((a, b) => a + b, 0) / 5;
    score += qualityAvg * 10;
    
    // Use cases priority
    const useCasesTotal = Object.values(formData.useCases).reduce((a, b) => a + b, 0);
    score += Math.min(useCasesTotal, 25);
    
    // Team maturity
    const teamTotal = Object.values(formData.teamSize).filter(v => parseInt(v) > 0).length;
    score += teamTotal * 10;
    
    // Governance
    if (formData.governance === 'yes') score += 20;
    
    return Math.min(Math.round(score), 100);
  };

  const getMaturityLevel = (score: number) => {
    if (score >= 80) return MATURITY_LEVELS[4];
    if (score >= 60) return MATURITY_LEVELS[3];
    if (score >= 40) return MATURITY_LEVELS[2];
    if (score >= 20) return MATURITY_LEVELS[1];
    return MATURITY_LEVELS[0];
  };

  const maturityScore = calculateMaturityScore();
  const maturityLevel = getMaturityLevel(maturityScore);

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
              <h1 className="font-display text-4xl lg:text-5xl font-bold">
                Data & <GradientText>Analytics</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Évaluez votre maturité data et construisez votre roadmap analytics
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
                  <h2 className="text-2xl font-bold mb-6">État Actuel des Données</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Sources de données actuelles *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        'Bases SQL',
                        'NoSQL/MongoDB',
                        'Fichiers CSV/Excel',
                        'APIs externes',
                        'IoT/Capteurs',
                        'ERP/CRM',
                        'Logs',
                        'Data Lake'
                      ].map(source => (
                        <button
                          key={source}
                          onClick={() => toggleArrayValue('dataSources', source)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.dataSources.includes(source)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Qualité des données (1 = faible, 5 = excellent)</label>
                    <div className="space-y-4">
                      {[
                        { key: 'completeness', label: 'Complétude' },
                        { key: 'accuracy', label: 'Exactitude' },
                        { key: 'consistency', label: 'Cohérence' },
                        { key: 'freshness', label: 'Fraîcheur' },
                        { key: 'documentation', label: 'Documentation' }
                      ].map(quality => (
                        <div key={quality.key}>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">{quality.label}</span>
                            <span className="text-sm text-energy-green font-bold">
                              {formData.dataQuality[quality.key] || 0}/5
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => updateRating('dataQuality', quality.key, rating)}
                                className={`flex-1 h-10 rounded transition-all ${
                                  formData.dataQuality[quality.key] >= rating
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

                  <div>
                    <label className="block text-sm font-medium mb-3">Qui accède aux données actuellement ?</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Direction', 'Managers', 'Analystes', 'Équipes opérationnelles', 'Tous'].map(role => (
                        <button
                          key={role}
                          onClick={() => toggleArrayValue('currentAccess', role)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.currentAccess.includes(role)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Délai pour obtenir un rapport</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['< 1 heure', '1-24 heures', '1-7 jours', '> 1 semaine'].map(delay => (
                        <button
                          key={delay}
                          onClick={() => updateFormData('reportDelay', delay)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.reportDelay === delay
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {delay}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Objectifs Analytics</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Priorisez vos cas d'usage (1 = faible, 5 = critique)</label>
                    <div className="space-y-6">
                      {[
                        { key: 'reporting', label: 'Reporting opérationnel', desc: 'Tableaux de bord quotidiens, KPIs' },
                        { key: 'predictive', label: 'Analytics prédictif', desc: 'Prévision demande, maintenance prédictive' },
                        { key: 'anomaly', label: 'Détection d\'anomalies', desc: 'Fraude, pannes, écarts de performance' },
                        { key: 'optimization', label: 'Optimisation', desc: 'Pricing, routage, allocation ressources' },
                        { key: 'customer', label: 'Analyse client', desc: 'Segmentation, recommandations, LTV' }
                      ].map(useCase => (
                        <div key={useCase.key} className="bg-white/5 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <div>
                              <span className="font-bold">{useCase.label}</span>
                              <p className="text-xs text-white/60 mt-1">{useCase.desc}</p>
                            </div>
                            <span className="text-sm text-energy-green font-bold">
                              {formData.useCases[useCase.key] || 0}/5
                            </span>
                          </div>
                          <div className="flex gap-2 mt-3">
                            {[1, 2, 3, 4, 5].map(rating => (
                              <button
                                key={rating}
                                onClick={() => updateRating('useCases', useCase.key, rating)}
                                className={`flex-1 h-10 rounded transition-all ${
                                  formData.useCases[useCase.key] >= rating
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

                  <div>
                    <label className="block text-sm font-medium mb-3">Nombre d'utilisateurs par profil</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { key: 'exec', label: 'Executives' },
                        { key: 'manager', label: 'Managers' },
                        { key: 'analyst', label: 'Analystes' },
                        { key: 'ops', label: 'Opérationnels' }
                      ].map(user => (
                        <div key={user.key}>
                          <label className="text-sm text-white/70 mb-2 block">{user.label}</label>
                          <input
                            type="number"
                            value={(formData.users as Record<string, string>)[user.key]}
                            onChange={(e) => updateFormData('users', { ...formData.users, [user.key]: e.target.value })}
                            placeholder="0"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Fréquence de rafraîchissement</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Temps réel', 'Horaire', 'Quotidien', 'Hebdomadaire'].map(freq => (
                        <button
                          key={freq}
                          onClick={() => updateFormData('refreshFrequency', freq)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.refreshFrequency === freq
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Infrastructure & Équipe</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Infrastructure préférée *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Cloud (AWS/Azure/GCP)', 'On-premise', 'Hybride', 'Indifférent'].map(infra => (
                        <button
                          key={infra}
                          onClick={() => updateFormData('infrastructure', infra)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.infrastructure === infra
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {infra}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Outils existants à conserver</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Tableau', 'PowerBI', 'Qlik', 'Looker', 'dbt', 'Airflow', 'Databricks', 'Aucun'].map(tool => (
                        <button
                          key={tool}
                          onClick={() => toggleArrayValue('existingTools', tool)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.existingTools.includes(tool)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Compétences internes</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { key: 'engineers', label: 'Data Engineers' },
                        { key: 'analysts', label: 'Data Analysts' },
                        { key: 'scientists', label: 'Data Scientists' }
                      ].map(team => (
                        <div key={team.key}>
                          <label className="text-sm text-white/70 mb-2 block">{team.label}</label>
                          <input
                            type="number"
                            value={(formData.teamSize as Record<string, string>)[team.key]}
                            onChange={(e) => updateFormData('teamSize', { ...formData.teamSize, [team.key]: e.target.value })}
                            placeholder="0"
                            className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Gouvernance des données</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'yes', label: 'Oui, politiques en place' },
                        { value: 'partial', label: 'Partiellement' },
                        { value: 'no', label: 'Non, à mettre en place' }
                      ].map(gov => (
                        <button
                          key={gov.value}
                          onClick={() => updateFormData('governance', gov.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.governance === gov.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {gov.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Conformité & sécurité</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['GDPR', 'SOC 2', 'ISO 27001', 'HIPAA', 'PCI DSS', 'Aucune'].map(comp => (
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
                    <h2 className="text-3xl font-bold mb-2">Évaluation Complétée !</h2>
                    <p className="text-white/70">Votre score de maturité data</p>
                  </div>

                  <div className="bg-gradient-to-r from-energy-green/20 to-cyber-blue/20 border border-energy-green/30 rounded-lg p-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Niveau de Maturité Data</h3>
                    <div className="flex items-center justify-center gap-8">
                      <div className="relative w-40 h-40">
                        <svg className="transform -rotate-90 w-40 h-40">
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="transparent"
                            className="text-white/10"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="10"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            strokeDashoffset={`${2 * Math.PI * 70 * (1 - maturityScore / 100)}`}
                            className="text-energy-green transition-all duration-1000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold">{maturityScore}</span>
                          <span className="text-xs text-white/60">/ 100</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-energy-green mb-2">
                          Niveau {maturityLevel.level}
                        </p>
                        <p className="text-lg text-white/70 mb-1">{maturityLevel.name}</p>
                        <p className="text-sm text-white/60">{maturityLevel.desc}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3">📊 État Actuel</h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>• Sources: {formData.dataSources.length} types</li>
                        <li>• Accès: {formData.currentAccess.join(', ')}</li>
                        <li>• Délai rapports: {formData.reportDelay}</li>
                        <li>• Équipe: {Object.values(formData.teamSize).filter(v => parseInt(v) > 0).length} rôles</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3">🎯 Prochaines Étapes</h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>✓ Architecture data recommandée</li>
                        <li>✓ Roadmap par phases (6/12/24 mois)</li>
                        <li>✓ Quick wins identifiés</li>
                        <li>✓ Estimation budgétaire</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="font-bold mb-3">💡 Recommandations Clés</h4>
                    <div className="space-y-2 text-sm text-white/70">
                      {maturityLevel.level < 3 && (
                        <p>• Priorité: consolider les sources dans un data warehouse centralisé</p>
                      )}
                      {formData.reportDelay === '> 1 semaine' && (
                        <p>• Mettre en place dashboards automatisés pour réduire délai à &lt; 24h</p>
                      )}
                      {Object.values(formData.dataQuality).some(v => v < 3) && (
                        <p>• Programme d'amélioration qualité data (nettoyage, validation)</p>
                      )}
                      {parseInt(formData.teamSize.scientists || '0') === 0 && formData.useCases.predictive > 3 && (
                        <p>• Recruter ou former Data Scientists pour analytics prédictif</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-energy-green to-cyber-blue rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <FaDownload /> Télécharger le Rapport
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-energy-green rounded-lg font-bold hover:bg-energy-green/10 transition-all flex items-center justify-center gap-2">
                      <FaCalendarAlt /> Consultation Gratuite
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

export default DataAnalyticsPage;
