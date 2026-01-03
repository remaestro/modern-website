import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaServer, FaCheckCircle, FaDownload, FaCalendarAlt, FaWifi, FaMapMarkerAlt } from 'react-icons/fa';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import ProgressStepper from '../components/ui/ProgressStepper';
import { sendEmailWithRetry } from '../services/emailService';

const STEPS = [
  { id: 1, title: 'Use Case & Échelle', duration: '4-5min' },
  { id: 2, title: 'Architecture', duration: '5-6min' },
  { id: 3, title: 'Sécurité', duration: '2-3min' },
  { id: 4, title: 'Déploiement', duration: '2-3min' },
  { id: 5, title: 'Résultats', duration: '2min' }
];

interface FormData {
  sector: string;
  sensorTypes: string[];
  sensorQuantities: Record<string, number>;
  dataFrequency: string;
  connectivity: string[];
  processingLocation: string;
  analyticsNeeds: string[];
  integrations: string[];
  environmentalConstraints: string[];
  securityLevel: string;
  compliance: string[];
  pilotSites: string;
  fullDeployment: string;
  timeline: string;
  slaLevel: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
}

const SENSOR_TYPES = [
  { value: 'temperature', label: 'Température', icon: '🌡️' },
  { value: 'pressure', label: 'Pression', icon: '📊' },
  { value: 'vibration', label: 'Vibration', icon: '〰️' },
  { value: 'gps', label: 'GPS', icon: '📍' },
  { value: 'camera', label: 'Caméras', icon: '📷' },
  { value: 'energy', label: 'Énergie', icon: '⚡' },
  { value: 'humidity', label: 'Humidité', icon: '💧' },
  { value: 'motion', label: 'Mouvement', icon: '🏃' }
];

function IoTPlatformPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    sector: '',
    sensorTypes: [],
    sensorQuantities: {},
    dataFrequency: '',
    connectivity: [],
    processingLocation: '',
    analyticsNeeds: [],
    integrations: [],
    environmentalConstraints: [],
    securityLevel: '',
    compliance: [],
    pilotSites: '',
    fullDeployment: '',
    timeline: '',
    slaLevel: '',
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

  const updateSensorQuantity = (sensor: string, quantity: number) => {
    setFormData(prev => ({
      ...prev,
      sensorQuantities: { ...prev.sensorQuantities, [sensor]: quantity }
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
        formType: 'IOT_PLATFORM',
        data: { ...formData, totalSensors: calculateTotalSensors() }
      });
      setShowResults(true);
      setCurrentStep(5);
    } catch (error) {
      console.error('Erreur envoi:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const calculateTotalSensors = () => {
    return Object.values(formData.sensorQuantities).reduce((sum, val) => sum + val, 0);
  };

  const estimateCosts = () => {
    const totalSensors = calculateTotalSensors();
    const hardwareCost = totalSensors * 150; // Average $150 per sensor
    const cloudCost = totalSensors * 5; // $5/month per sensor
    const developmentCost = 25000 + (formData.integrations.length * 5000);
    
    return {
      hardware: hardwareCost,
      cloud: cloudCost,
      development: developmentCost,
      total: hardwareCost + (cloudCost * 12) + developmentCost
    };
  };

  const costs = estimateCosts();

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
              <FaServer className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold">
                Plateforme <GradientText>IoT</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Configurateur visuel et simulateur de coûts pour votre solution IoT
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
                  <h2 className="text-2xl font-bold mb-6">Use Case & Échelle</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Secteur d'application *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { value: 'energy', label: 'Énergie', icon: '⚡' },
                        { value: 'industry', label: 'Industrie', icon: '🏭' },
                        { value: 'building', label: 'Bâtiment', icon: '🏢' },
                        { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
                        { value: 'transport', label: 'Transport', icon: '🚚' },
                        { value: 'other', label: 'Autre', icon: '📦' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('sector', option.value)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.sector === option.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="text-sm font-bold">{option.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Types de capteurs/devices *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {SENSOR_TYPES.map(sensor => (
                        <button
                          key={sensor.value}
                          onClick={() => toggleArrayValue('sensorTypes', sensor.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.sensorTypes.includes(sensor.value)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="text-xl mb-1">{sensor.icon}</div>
                          <div className="text-xs">{sensor.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.sensorTypes.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium mb-3">Quantité par type de capteur</label>
                      <div className="space-y-3">
                        {formData.sensorTypes.map(sensorType => {
                          const sensor = SENSOR_TYPES.find(s => s.value === sensorType);
                          return (
                            <div key={sensorType} className="flex items-center gap-4">
                              <span className="text-sm w-32">{sensor?.icon} {sensor?.label}</span>
                              <input
                                type="number"
                                value={formData.sensorQuantities[sensorType] || ''}
                                onChange={(e) => updateSensorQuantity(sensorType, parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className="flex-1 p-2 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm text-energy-green mt-3">
                        Total: {calculateTotalSensors()} capteurs
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-3">Fréquence de collecte *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'realtime', label: 'Temps réel', desc: '< 1s' },
                        { value: 'high', label: 'Haute fréquence', desc: '1s - 1min' },
                        { value: 'periodic', label: 'Périodique', desc: '1min - 1h' },
                        { value: 'daily', label: 'Journalière', desc: '1x/jour' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('dataFrequency', option.value)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            formData.dataFrequency === option.value
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
                    <label className="block text-sm font-medium mb-3">Connectivité disponible</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['WiFi', 'Ethernet', '4G/5G', 'LoRaWAN', 'Satellite', 'À déterminer'].map(conn => (
                        <button
                          key={conn}
                          onClick={() => toggleArrayValue('connectivity', conn)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.connectivity.includes(conn)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {conn}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Architecture & Traitement</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Localisation du traitement *</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { value: 'edge', label: 'Edge uniquement', desc: 'Traitement local, latence minimale' },
                        { value: 'cloud', label: 'Cloud uniquement', desc: 'Centralisation, scalabilité' },
                        { value: 'hybrid', label: 'Hybride', desc: 'Edge + Cloud, meilleur des deux' }
                      ].map(option => (
                        <button
                          key={option.value}
                          onClick={() => updateFormData('processingLocation', option.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            formData.processingLocation === option.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold mb-2">{option.label}</div>
                          <div className="text-sm text-white/60">{option.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Besoins d'analytics *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Dashboard temps réel',
                        'Alertes/notifications',
                        'Historique long terme',
                        'Machine learning/prédictif',
                        'Rapports automatisés',
                        'Analyse de tendances'
                      ].map(need => (
                        <button
                          key={need}
                          onClick={() => toggleArrayValue('analyticsNeeds', need)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.analyticsNeeds.includes(need)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Intégrations nécessaires</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'ERP existant',
                        'Systèmes de facturation',
                        'APIs tierces',
                        'Bases de données',
                        'Plateformes BI',
                        'Aucune'
                      ].map(integration => (
                        <button
                          key={integration}
                          onClick={() => toggleArrayValue('integrations', integration)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            formData.integrations.includes(integration)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {integration}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Contraintes environnementales</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'industrial', label: 'Industriel', icon: '🏭' },
                        { value: 'outdoor', label: 'Extérieur', icon: '🌧️' },
                        { value: 'extreme-temp', label: 'Temp. extrêmes', icon: '🌡️' },
                        { value: 'vibration', label: 'Vibrations', icon: '〰️' },
                        { value: 'battery', label: 'Sur batterie', icon: '🔋' },
                        { value: 'none', label: 'Aucune', icon: '✓' }
                      ].map(constraint => (
                        <button
                          key={constraint.value}
                          onClick={() => toggleArrayValue('environmentalConstraints', constraint.value)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.environmentalConstraints.includes(constraint.value)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="text-xl mb-1">{constraint.icon}</div>
                          <div className="text-xs">{constraint.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Sécurité & Conformité</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Niveau de sécurité requis *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'basic', label: 'Basique', desc: 'Sécurité standard' },
                        { value: 'standard', label: 'Standard', desc: 'Chiffrement, auth' },
                        { value: 'high', label: 'Élevé', desc: 'End-to-end, audit' },
                        { value: 'critical', label: 'Critique', desc: 'Max sécurité' }
                      ].map(level => (
                        <button
                          key={level.value}
                          onClick={() => updateFormData('securityLevel', level.value)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            formData.securityLevel === level.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold text-sm mb-1">{level.label}</div>
                          <div className="text-xs text-white/60">{level.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Conformité réglementaire</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['GDPR', 'ISO 27001', 'IEC 62443', 'NERC CIP', 'SOC 2', 'Aucune'].map(comp => (
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
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Déploiement & Maintenance</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">Déploiement pilote</label>
                    <input
                      type="text"
                      value={formData.pilotSites}
                      onChange={(e) => updateFormData('pilotSites', e.target.value)}
                      placeholder="Ex: 3 sites, 50 capteurs"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Déploiement complet</label>
                    <input
                      type="text"
                      value={formData.fullDeployment}
                      onChange={(e) => updateFormData('fullDeployment', e.target.value)}
                      placeholder="Ex: 50 sites, région EMEA"
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Timeline *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['1-3 mois', '3-6 mois', '6-12 mois', '12+ mois'].map(time => (
                        <button
                          key={time}
                          onClick={() => updateFormData('timeline', time)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.timeline === time
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">SLA souhaité *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: '99', label: '99%', desc: '~7h downtime/mois' },
                        { value: '99.9', label: '99.9%', desc: '~43min downtime/mois' },
                        { value: '99.99', label: '99.99%', desc: '~4min downtime/mois' }
                      ].map(sla => (
                        <button
                          key={sla.value}
                          onClick={() => updateFormData('slaLevel', sla.value)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            formData.slaLevel === sla.value
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <div className="font-bold mb-1">{sla.label}</div>
                          <div className="text-xs text-white/60">{sla.desc}</div>
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

              {currentStep === 5 && showResults && (
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
                    <h2 className="text-3xl font-bold mb-2">Configuration Complétée !</h2>
                    <p className="text-white/70">Votre proposition IoT personnalisée</p>
                  </div>

                  <div className="bg-gradient-to-r from-energy-green/20 to-cyber-blue/20 border border-energy-green/30 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Estimation TCO (Total Cost of Ownership)</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-white/60 mb-2">Coûts Hardware</p>
                        <p className="text-2xl font-bold text-energy-green">
                          ${costs.hardware.toLocaleString()}
                        </p>
                        <p className="text-xs text-white/50">{calculateTotalSensors()} capteurs</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-2">Coûts Cloud (an 1)</p>
                        <p className="text-2xl font-bold text-cyber-blue">
                          ${(costs.cloud * 12).toLocaleString()}
                        </p>
                        <p className="text-xs text-white/50">${costs.cloud}/mois</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-2">Développement</p>
                        <p className="text-2xl font-bold text-white">
                          ${costs.development.toLocaleString()}
                        </p>
                        <p className="text-xs text-white/50">One-time cost</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-2">Total (an 1)</p>
                        <p className="text-3xl font-bold bg-gradient-to-r from-energy-green to-cyber-blue bg-clip-text text-transparent">
                          ${costs.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <FaServer className="text-cyber-blue" /> Architecture Recommandée
                      </h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>• Capteurs: {calculateTotalSensors()} unités</li>
                        <li>• Traitement: {formData.processingLocation}</li>
                        <li>• Connectivité: {formData.connectivity.join(', ')}</li>
                        <li>• Analytics: {formData.analyticsNeeds.length} modules</li>
                      </ul>
                    </div>

                    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <h4 className="font-bold mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-energy-green" /> Déploiement
                      </h4>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li>• Pilote: {formData.pilotSites || 'À définir'}</li>
                        <li>• Complet: {formData.fullDeployment || 'À définir'}</li>
                        <li>• Timeline: {formData.timeline}</li>
                        <li>• SLA: {formData.slaLevel}%</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h4 className="font-bold mb-3">💡 Recommandations</h4>
                    <div className="space-y-2 text-sm text-white/70">
                      {formData.securityLevel === 'critical' && (
                        <p>• Sécurité critique: chiffrement end-to-end et HSM recommandés</p>
                      )}
                      {formData.dataFrequency === 'realtime' && (
                        <p>• Temps réel: architecture edge computing pour latence minimale</p>
                      )}
                      {formData.environmentalConstraints.includes('battery') && (
                        <p>• Batterie: optimisation consommation et protocoles low-power (LoRa, NB-IoT)</p>
                      )}
                      {formData.integrations.length > 3 && (
                        <p>• Nombreuses intégrations: plateforme d'intégration (API Gateway) recommandée</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-energy-green to-cyber-blue rounded-lg font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <FaDownload /> Télécharger la Proposition
                    </button>
                    <button className="flex-1 px-6 py-3 border-2 border-energy-green rounded-lg font-bold hover:bg-energy-green/10 transition-all flex items-center justify-center gap-2">
                      <FaCalendarAlt /> Démo PoC Gratuit
                    </button>
                  </div>
                </div>
              )}

              {currentStep < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-6 py-3 rounded-lg border border-white/10 hover:border-energy-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Précédent
                  </button>
                  
                  {currentStep < 4 ? (
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
                      Voir la Proposition
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

export default IoTPlatformPage;
