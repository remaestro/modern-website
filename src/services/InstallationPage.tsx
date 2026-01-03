import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle, FaCalendarAlt, FaMapMarkerAlt, FaTools } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';
import { sendEmailWithRetry } from '../services/emailService';

interface FormData {
  projectName: string;
  equipmentType: string[];
  installationScope: string;
  siteLocation: string;
  siteAccess: string;
  powerShutdown: string;
  localTeam: string;
  preferredMonth: string;
  preferredWeek: string;
  duration: string;
  urgency: string;
  preSiteVisit: boolean;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  additionalNotes: string;
}

const MONTHS = [
  { value: '2026-01', label: 'Janvier 2026', available: true },
  { value: '2026-02', label: 'Février 2026', available: true },
  { value: '2026-03', label: 'Mars 2026', available: true },
  { value: '2026-04', label: 'Avril 2026', available: true },
  { value: '2026-05', label: 'Mai 2026', available: false },
  { value: '2026-06', label: 'Juin 2026', available: true },
  { value: '2026-07', label: 'Juillet 2026', available: true },
  { value: '2026-08', label: 'Août 2026', available: true },
  { value: '2026-09', label: 'Septembre 2026', available: true },
  { value: '2026-10', label: 'Octobre 2026', available: true },
  { value: '2026-11', label: 'Novembre 2026', available: false },
  { value: '2026-12', label: 'Décembre 2026', available: true }
];

const WEEKS = [
  { value: 'week1', label: 'Semaine 1', days: '1-7' },
  { value: 'week2', label: 'Semaine 2', days: '8-14' },
  { value: 'week3', label: 'Semaine 3', days: '15-21' },
  { value: 'week4', label: 'Semaine 4', days: '22-fin' }
];

function InstallationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    equipmentType: [],
    installationScope: '',
    siteLocation: '',
    siteAccess: '',
    powerShutdown: '',
    localTeam: '',
    preferredMonth: '',
    preferredWeek: '',
    duration: '',
    urgency: 'normal',
    preSiteVisit: false,
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayToggle = (field: keyof FormData, value: string) => {
    const current = formData[field] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    setFormData({ ...formData, [field]: updated });
  };

  const handleSubmit = async () => {
    try {
      await sendEmailWithRetry({
        formType: 'INSTALLATION',
        data: formData
      });
      alert('✅ Demande d\'installation envoyée ! Notre équipe vous contactera sous 24h.');
    } catch (error) {
      console.error('Erreur envoi:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectName && formData.equipmentType.length > 0 && formData.installationScope;
      case 2:
        return formData.siteLocation && formData.siteAccess && formData.powerShutdown;
      case 3:
        return formData.preferredMonth && formData.preferredWeek && formData.duration;
      case 4:
        return formData.companyName && formData.contactName && formData.email && formData.phone;
      default:
        return false;
    }
  };

  // Calculate team size and cost estimation
  const getEstimation = () => {
    let teamSize = 2;
    let minDays = 1;
    let maxDays = 3;
    let minCost = 5000;
    let maxCost = 15000;

    // Equipment complexity
    if (formData.equipmentType.includes('Transformateurs')) teamSize += 2;
    if (formData.equipmentType.includes('Postes sources')) teamSize += 3;
    if (formData.equipmentType.includes('SCADA')) teamSize += 1;
    
    // Scope impact
    if (formData.installationScope === 'complete') {
      minDays = 5;
      maxDays = 15;
      minCost *= 3;
      maxCost *= 4;
    } else if (formData.installationScope === 'commissioning') {
      minDays = 2;
      maxDays = 5;
      minCost *= 1.5;
      maxCost *= 2;
    }

    // Urgency impact
    if (formData.urgency === 'urgent') {
      minCost *= 1.3;
      maxCost *= 1.3;
    }

    // Pre-site visit
    if (formData.preSiteVisit) {
      minDays += 1;
      minCost += 2000;
      maxCost += 3000;
    }

    return {
      teamSize: Math.min(12, teamSize),
      duration: `${minDays}-${maxDays} jours`,
      cost: `${(minCost / 1000).toFixed(0)} - ${(maxCost / 1000).toFixed(0)} k USD`
    };
  };

  const estimation = getEstimation();

  const selectedMonth = MONTHS.find(m => m.value === formData.preferredMonth);

  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      <NoiseTexture />
      
      <nav className="fixed w-full z-50 bg-deep-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform">
            DIGITA <GradientText>ENERGY</GradientText>
          </Link>
          
          <Link to="/products-services" className="text-sm text-white/70 hover:text-energy-green transition-colors">
            ← Retour aux services
          </Link>
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
              <FaTools className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-5xl lg:text-6xl font-bold">
                Installation & <GradientText>Commissioning</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Planifiez votre intervention en 4 étapes simples
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center">
            {[
              { id: 1, label: 'Projet' },
              { id: 2, label: 'Site' },
              { id: 3, label: 'Planning' },
              { id: 4, label: 'Contact' }
            ].map((step, idx, arr) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep > step.id ? 'bg-energy-green text-deep-black' :
                    currentStep === step.id ? 'bg-cyber-blue text-deep-black' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className={`text-sm mt-2 ${currentStep >= step.id ? 'text-white' : 'text-white/50'}`}>
                    {step.label}
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 ${
                    currentStep > step.id ? 'bg-energy-green' : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-8">
                  {/* Step 1: Project Details */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaBolt className="text-cyber-blue" />
                        Détails du Projet
                      </h2>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Nom du projet *</label>
                        <input
                          type="text"
                          value={formData.projectName}
                          onChange={(e) => handleChange('projectName', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Ex: Installation poste MT Abidjan Nord"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Équipements à installer *</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            { value: 'Transformateurs', icon: '⚡', desc: 'HT/MT/BT' },
                            { value: 'Postes sources', icon: '🏗️', desc: 'Postes préfabriqués/maçonnés' },
                            { value: 'Postes distribution', icon: '📦', desc: 'Postes compacts' },
                            { value: 'SCADA', icon: '💻', desc: 'Systèmes de contrôle' },
                            { value: 'Protection', icon: '🛡️', desc: 'Relais et automatismes' },
                            { value: 'Câblage', icon: '🔌', desc: 'HT/MT/BT et fibre' }
                          ].map(equip => (
                            <button
                              key={equip.value}
                              onClick={() => handleArrayToggle('equipmentType', equip.value)}
                              className={`p-4 rounded-lg border-2 transition-all text-left ${
                                formData.equipmentType.includes(equip.value)
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-2xl">{equip.icon}</div>
                                <div className="flex-1">
                                  <div className="font-semibold">{equip.value}</div>
                                  <div className="text-xs text-white/60">{equip.desc}</div>
                                </div>
                                {formData.equipmentType.includes(equip.value) && (
                                  <FaCheckCircle className="text-cyber-blue" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Étendue de l'intervention *</label>
                        <div className="space-y-3">
                          {[
                            { value: 'installation', label: 'Installation uniquement', desc: 'Pose et montage des équipements' },
                            { value: 'commissioning', label: 'Installation + Commissioning', desc: 'Installation, tests et mise en service' },
                            { value: 'complete', label: 'Clé en main complet', desc: 'Installation, tests, formation et documentation' }
                          ].map(scope => (
                            <button
                              key={scope.value}
                              onClick={() => handleChange('installationScope', scope.value)}
                              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                                formData.installationScope === scope.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="font-semibold mb-1">{scope.label}</div>
                                  <div className="text-sm text-white/60">{scope.desc}</div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  formData.installationScope === scope.value
                                    ? 'border-cyber-blue bg-cyber-blue'
                                    : 'border-white/30'
                                }`}>
                                  {formData.installationScope === scope.value && (
                                    <div className="w-2 h-2 rounded-full bg-deep-black" />
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Site Information */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-cyber-blue" />
                        Informations Site
                      </h2>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-2">Localisation du site *</label>
                        <input
                          type="text"
                          value={formData.siteLocation}
                          onChange={(e) => handleChange('siteLocation', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Adresse complète ou coordonnées GPS"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Accessibilité du site *</label>
                        <select
                          value={formData.siteAccess}
                          onChange={(e) => handleChange('siteAccess', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="facile">Facile - Route bitumée, accès direct</option>
                          <option value="moyen">Moyen - Piste praticable en saison sèche</option>
                          <option value="difficile">Difficile - 4x4 requis ou zone urbaine dense</option>
                          <option value="tres-difficile">Très difficile - Héliportage nécessaire</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Coupure d'alimentation requise *</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            { value: 'oui', label: 'Oui, coupure nécessaire', desc: 'Travaux hors tension' },
                            { value: 'non', label: 'Non, sous tension', desc: 'Travaux en ligne' },
                            { value: 'partiel', label: 'Coupure partielle', desc: 'Certaines zones seulement' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleChange('powerShutdown', option.value)}
                              className={`p-4 rounded-lg border-2 transition-all text-left ${
                                formData.powerShutdown === option.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="font-semibold mb-1">{option.label}</div>
                              <div className="text-xs text-white/60">{option.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Équipe locale disponible</label>
                        <select
                          value={formData.localTeam}
                          onChange={(e) => handleChange('localTeam', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="oui">Oui, équipe disponible pour support</option>
                          <option value="non">Non, équipe complète Digita Energy</option>
                          <option value="partiel">Partiellement (manœuvres uniquement)</option>
                        </select>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
                        <input
                          type="checkbox"
                          id="preSiteVisit"
                          checked={formData.preSiteVisit}
                          onChange={(e) => handleChange('preSiteVisit', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-2 border-cyber-blue"
                        />
                        <label htmlFor="preSiteVisit" className="flex-1 cursor-pointer">
                          <div className="font-semibold mb-1">Demander une visite préalable du site</div>
                          <div className="text-sm text-white/70">
                            Recommandé pour les sites complexes (+1 jour, +2-3k USD)
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Planning with Calendar */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaCalendarAlt className="text-cyber-blue" />
                        Planification
                      </h2>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Urgence du projet</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'normal', label: 'Normal', color: 'cyber-blue' },
                            { value: 'prioritaire', label: 'Prioritaire', color: 'yellow-500' },
                            { value: 'urgent', label: 'Urgent', color: 'red-500' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleChange('urgency', option.value)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.urgency === option.value
                                  ? `border-${option.color} bg-${option.color}/10`
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3">Sélectionnez un mois *</label>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {MONTHS.map(month => (
                            <button
                              key={month.value}
                              onClick={() => month.available && handleChange('preferredMonth', month.value)}
                              disabled={!month.available}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                formData.preferredMonth === month.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : month.available
                                  ? 'border-white/10 hover:border-white/30'
                                  : 'border-white/5 bg-white/5 opacity-50 cursor-not-allowed'
                              }`}
                            >
                              <div className={`text-sm font-semibold ${
                                !month.available ? 'line-through text-white/30' : ''
                              }`}>
                                {month.label.split(' ')[0]}
                              </div>
                              {!month.available && (
                                <div className="text-xs text-red-400 mt-1">Complet</div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.preferredMonth && selectedMonth?.available && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <label className="block text-sm font-semibold mb-3">
                            Semaine préférée de {selectedMonth.label} *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {WEEKS.map(week => (
                              <button
                                key={week.value}
                                onClick={() => handleChange('preferredWeek', week.value)}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  formData.preferredWeek === week.value
                                    ? 'border-energy-green bg-energy-green/10'
                                    : 'border-white/10 hover:border-white/30'
                                }`}
                              >
                                <div className="font-semibold">{week.label}</div>
                                <div className="text-xs text-white/60 mt-1">{week.days}</div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold mb-3">Durée estimée nécessaire *</label>
                        <select
                          value={formData.duration}
                          onChange={(e) => handleChange('duration', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="1-2">1-2 jours</option>
                          <option value="3-5">3-5 jours</option>
                          <option value="1-2w">1-2 semaines</option>
                          <option value="2-4w">2-4 semaines</option>
                          <option value="1m+">Plus d'1 mois</option>
                        </select>
                      </div>

                      {formData.preferredMonth && formData.preferredWeek && (
                        <div className="p-4 bg-energy-green/10 border border-energy-green/30 rounded-lg">
                          <div className="flex items-center gap-2 text-energy-green font-semibold mb-2">
                            <FaCheckCircle />
                            Période sélectionnée
                          </div>
                          <div className="text-sm">
                            {selectedMonth?.label} - {WEEKS.find(w => w.value === formData.preferredWeek)?.label}
                            {' '}({WEEKS.find(w => w.value === formData.preferredWeek)?.days})
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Contact */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Vos Coordonnées</h2>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Entreprise *</label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                            placeholder="Nom de votre entreprise"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Contact *</label>
                          <input
                            type="text"
                            value={formData.contactName}
                            onChange={(e) => handleChange('contactName', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                            placeholder="Votre nom complet"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                            placeholder="email@entreprise.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Téléphone *</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                            placeholder="+225 XX XX XX XX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Informations complémentaires</label>
                        <textarea
                          value={formData.additionalNotes}
                          onChange={(e) => handleChange('additionalNotes', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none resize-none"
                          placeholder="Précisez toute contrainte particulière, équipements spéciaux requis, conditions de sécurité..."
                        />
                      </div>

                      {/* Summary */}
                      <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="font-bold mb-4">Récapitulatif de la demande</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Projet:</span>
                            <span className="font-semibold">{formData.projectName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Équipements:</span>
                            <span className="font-semibold">{formData.equipmentType.length} type(s)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Site:</span>
                            <span className="font-semibold">{formData.siteLocation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Période:</span>
                            <span className="font-semibold">
                              {selectedMonth?.label} - {WEEKS.find(w => w.value === formData.preferredWeek)?.label}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Visite préalable:</span>
                            <span className="font-semibold">{formData.preSiteVisit ? 'Oui' : 'Non'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        ← Précédent
                      </button>
                    )}
                    {currentStep < 4 ? (
                      <button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        disabled={!canProceed()}
                        className={`ml-auto px-6 py-3 rounded-lg font-bold transition-all ${
                          canProceed()
                            ? 'bg-gradient-to-r from-cyber-blue to-energy-green text-deep-black hover:scale-105'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        Suivant →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        disabled={!canProceed()}
                        className={`ml-auto px-8 py-3 rounded-lg font-bold transition-all ${
                          canProceed()
                            ? 'bg-gradient-to-r from-cyber-blue to-energy-green text-deep-black hover:scale-105'
                            : 'bg-white/10 text-white/30 cursor-not-allowed'
                        }`}
                      >
                        Confirmer la demande
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar: Estimation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <GlassCard className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">
                  Estimation <GradientText>Projet</GradientText>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-white/60 mb-2">👥 Taille d'équipe</div>
                    <div className="text-2xl font-bold text-cyber-blue">{estimation.teamSize} personnes</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-2">⏱️ Durée estimée</div>
                    <div className="text-2xl font-bold text-energy-green">{estimation.duration}</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-2">💰 Budget indicatif</div>
                    <div className="text-2xl font-bold text-cyber-blue">{estimation.cost}</div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-white/50 space-y-2">
                      <p>✓ Prix incluant mobilisation</p>
                      <p>✓ Devis détaillé après validation</p>
                      <p>✓ Confirmation sous 24h</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 mt-6">
                <h4 className="font-bold mb-3">Nos Garanties</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Respect des délais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Conformité garantie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Garantie travaux 2 ans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Support post-installation</span>
                  </li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstallationPage;
