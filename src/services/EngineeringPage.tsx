import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle, FaInfoCircle, FaFileUpload } from 'react-icons/fa';

const STEPS = [
  { id: 1, title: 'Type de Projet', duration: '30s' },
  { id: 2, title: 'Caractéristiques', duration: '45s' },
  { id: 3, title: 'Études Souhaitées', duration: '45s' },
  { id: 4, title: 'Contexte & Contraintes', duration: '1m' },
  { id: 5, title: 'Contact & Planning', duration: '30s' }
];

interface FormData {
  // Step 1
  projectType: string;
  urgency: string;
  budgetRange: string;
  // Step 2
  voltageLevel: string[];
  scope: string;
  powerCapacity: string;
  infrastructureType: string;
  // Step 3
  studies: string[];
  // Step 4
  location: string;
  constraints: string[];
  standards: string;
  additionalNotes: string;
  // Step 5
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  contactPreference: string;
}

function EngineeringPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    urgency: '',
    budgetRange: '',
    voltageLevel: [],
    scope: '',
    powerCapacity: '',
    infrastructureType: '',
    studies: [],
    location: '',
    constraints: [],
    standards: '',
    additionalNotes: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    deliveryDate: '',
    contactPreference: 'email'
  });
  const [isSaved, setIsSaved] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('engineeringFormData');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('engineeringFormData', JSON.stringify(formData));
    setIsSaved(true);
    const timer = setTimeout(() => setIsSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [formData]);

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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    localStorage.removeItem('engineeringFormData');
    alert('Demande envoyée avec succès ! Notre équipe vous contactera sous 24h.');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType && formData.urgency && formData.budgetRange;
      case 2:
        return formData.voltageLevel.length > 0 && formData.scope && formData.powerCapacity;
      case 3:
        return formData.studies.length > 0;
      case 4:
        return formData.location && formData.standards;
      case 5:
        return formData.companyName && formData.contactName && formData.email && formData.phone;
      default:
        return false;
    }
  };

  // Dynamic estimation
  const getEstimation = () => {
    let complexity = 0;
    let minMonths = 1;
    let maxMonths = 2;
    let minBudget = 5000;
    let maxBudget = 20000;

    // Calculate complexity
    if (formData.voltageLevel.includes('HT')) complexity += 2;
    if (formData.voltageLevel.includes('MT')) complexity += 1;
    if (formData.studies.length > 4) complexity += 1;
    if (formData.scope === 'tres-grand') complexity += 2;
    else if (formData.scope === 'grand') complexity += 1;

    // Adjust timeline
    if (formData.urgency === 'urgent') {
      minMonths = 0.5;
      maxMonths = 1.5;
    }
    minMonths += formData.studies.length * 0.3;
    maxMonths += formData.studies.length * 0.5;

    // Adjust budget
    minBudget += formData.studies.length * 3000;
    maxBudget += formData.studies.length * 8000;
    if (formData.scope === 'tres-grand') {
      minBudget *= 3;
      maxBudget *= 4;
    } else if (formData.scope === 'grand') {
      minBudget *= 2;
      maxBudget *= 2.5;
    }

    return {
      complexity: Math.min(5, Math.max(1, complexity)),
      timeline: `${Math.round(minMonths)}-${Math.round(maxMonths)} mois`,
      budget: `${(minBudget / 1000).toFixed(0)} - ${(maxBudget / 1000).toFixed(0)} k USD`
    };
  };

  const estimation = getEstimation();

  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      <NoiseTexture />
      
      <nav className="fixed w-full z-50 bg-deep-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform">
            DIGITA <GradientText>ENERGY</GradientText>
          </Link>
          
          <div className="flex gap-6 items-center text-sm">
            {isSaved && (
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-energy-green text-xs"
              >
                💾 Sauvegardé
              </motion.span>
            )}
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
              <FaBolt className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-5xl lg:text-6xl font-bold">
                Ingénierie & <GradientText>Conception</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Décrivez votre projet en 5 étapes pour obtenir une proposition personnalisée
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep > step.id ? 'bg-energy-green text-deep-black' :
                    currentStep === step.id ? 'bg-cyber-blue text-deep-black' :
                    'bg-white/10 text-white/50'
                  }`}>
                    {currentStep > step.id ? '✓' : step.id}
                  </div>
                  <div className="text-xs mt-2 text-center hidden md:block">
                    <div className={currentStep >= step.id ? 'text-white' : 'text-white/50'}>{step.title}</div>
                    <div className="text-white/40">{step.duration}</div>
                  </div>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${
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
                  {/* Step 1: Project Type */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Type de Projet</h2>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3">Nature du projet *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { value: 'nouveau', label: 'Nouveau projet', icon: '🆕' },
                            { value: 'extension', label: 'Extension réseau', icon: '📈' },
                            { value: 'rehabilitation', label: 'Réhabilitation', icon: '🔧' },
                            { value: 'upgrade', label: 'Upgrade/Modernisation', icon: '⚡' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleChange('projectType', option.value)}
                              className={`p-4 rounded-lg border-2 transition-all text-left ${
                                formData.projectType === option.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="font-semibold">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Urgence *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'normal', label: 'Normal' },
                            { value: 'prioritaire', label: 'Prioritaire' },
                            { value: 'urgent', label: 'Urgent' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleChange('urgency', option.value)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.urgency === option.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Budget indicatif *</label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => handleChange('budgetRange', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="0-25k">Moins de 25 000 USD</option>
                          <option value="25-50k">25 000 - 50 000 USD</option>
                          <option value="50-100k">50 000 - 100 000 USD</option>
                          <option value="100-250k">100 000 - 250 000 USD</option>
                          <option value="250k+">Plus de 250 000 USD</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Technical Characteristics */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Caractéristiques Techniques</h2>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3">Niveaux de tension *</label>
                        <div className="grid grid-cols-3 gap-3">
                          {['HT', 'MT', 'BT'].map(level => (
                            <button
                              key={level}
                              onClick={() => handleArrayToggle('voltageLevel', level)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.voltageLevel.includes(level)
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Envergure du projet *</label>
                        <select
                          value={formData.scope}
                          onChange={(e) => handleChange('scope', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="petit">Petit (&lt; 1 km, 1 poste)</option>
                          <option value="moyen">Moyen (1-10 km, 2-5 postes)</option>
                          <option value="grand">Grand (10-50 km, 5-20 postes)</option>
                          <option value="tres-grand">Très grand (&gt; 50 km, 20+ postes)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Puissance totale estimée *</label>
                        <select
                          value={formData.powerCapacity}
                          onChange={(e) => handleChange('powerCapacity', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="0-5">Moins de 5 MVA</option>
                          <option value="5-20">5 - 20 MVA</option>
                          <option value="20-50">20 - 50 MVA</option>
                          <option value="50-100">50 - 100 MVA</option>
                          <option value="100+">Plus de 100 MVA</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Type d'infrastructure</label>
                        <select
                          value={formData.infrastructureType}
                          onChange={(e) => handleChange('infrastructureType', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="aerien">Aérien</option>
                          <option value="souterrain">Souterrain</option>
                          <option value="mixte">Mixte</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Studies */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Études & Livrables Souhaités</h2>
                      <p className="text-sm text-white/60 mb-4">Sélectionnez les études nécessaires (minimum 1)</p>
                      
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { value: 'faisabilite', label: 'Étude de faisabilité', desc: 'Analyse viabilité technique et économique' },
                          { value: 'apd', label: 'Avant-projet détaillé (APD)', desc: 'Conception préliminaire avec estimations' },
                          { value: 'execution', label: 'Projet d\'exécution', desc: 'Plans détaillés prêts pour réalisation' },
                          { value: 'court-circuit', label: 'Calculs courts-circuits', desc: 'Dimensionnement protection' },
                          { value: 'selectivite', label: 'Plan de protection', desc: 'Coordination sélectivité' },
                          { value: 'unifilaire', label: 'Schémas unifilaires', desc: 'Schémas électriques HT/MT/BT' },
                          { value: 'autocad', label: 'Plans AutoCAD/MicroStation', desc: 'Plans d\'implantation détaillés' },
                          { value: 'reglementaire', label: 'Dossier réglementaire', desc: 'Conformité et autorisations' }
                        ].map(study => (
                          <button
                            key={study.value}
                            onClick={() => handleArrayToggle('studies', study.value)}
                            className={`p-4 rounded-lg border-2 transition-all text-left group ${
                              formData.studies.includes(study.value)
                                ? 'border-cyber-blue bg-cyber-blue/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                formData.studies.includes(study.value)
                                  ? 'border-cyber-blue bg-cyber-blue'
                                  : 'border-white/30'
                              }`}>
                                {formData.studies.includes(study.value) && (
                                  <FaCheckCircle className="text-deep-black text-xs" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold mb-1">{study.label}</div>
                                <div className="text-xs text-white/60">{study.desc}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Context */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Contexte & Contraintes</h2>
                      
                      <div>
                        <label className="block text-sm font-semibold mb-3">Zone géographique / Climat *</label>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleChange('location', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                          placeholder="Ex: Abidjan, Côte d'Ivoire - Climat tropical"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Contraintes spécifiques</label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {[
                            'Environnementales',
                            'Réglementaires locales',
                            'Accès difficile',
                            'Zone urbaine dense'
                          ].map(constraint => (
                            <button
                              key={constraint}
                              onClick={() => handleArrayToggle('constraints', constraint)}
                              className={`p-3 rounded-lg border-2 transition-all text-left ${
                                formData.constraints.includes(constraint)
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 ${
                                  formData.constraints.includes(constraint)
                                    ? 'border-cyber-blue bg-cyber-blue'
                                    : 'border-white/30'
                                }`} />
                                <span className="text-sm">{constraint}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Norme de référence *</label>
                        <select
                          value={formData.standards}
                          onChange={(e) => handleChange('standards', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        >
                          <option value="">Sélectionner...</option>
                          <option value="IEC">IEC (International)</option>
                          <option value="IEEE">IEEE (Américaine)</option>
                          <option value="NFC">NFC (Française)</option>
                          <option value="BS">BS (Britannique)</option>
                          <option value="autre">Autre</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Notes complémentaires</label>
                        <textarea
                          value={formData.additionalNotes}
                          onChange={(e) => handleChange('additionalNotes', e.target.value)}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none resize-none"
                          placeholder="Précisez tout élément important : objectifs spécifiques, contraintes particulières, documents existants..."
                        />
                      </div>

                      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                        <FaFileUpload className="text-3xl text-white/40 mx-auto mb-3" />
                        <div className="text-sm text-white/60 mb-2">Upload documents (optionnel)</div>
                        <div className="text-xs text-white/40">Plans de situation, schémas existants, cahier des charges...</div>
                        <button className="mt-4 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                          Parcourir les fichiers
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Contact */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h2 className="font-display text-2xl font-bold mb-6">Contact & Planning</h2>
                      
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
                        <label className="block text-sm font-semibold mb-2">Date de livraison souhaitée</label>
                        <input
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => handleChange('deliveryDate', e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-3">Préférence de contact</label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { value: 'email', label: '📧 Email' },
                            { value: 'phone', label: '📞 Téléphone' },
                            { value: 'visio', label: '💻 Visio' }
                          ].map(option => (
                            <button
                              key={option.value}
                              onClick={() => handleChange('contactPreference', option.value)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.contactPreference === option.value
                                  ? 'border-cyber-blue bg-cyber-blue/10'
                                  : 'border-white/10 hover:border-white/30'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                        <h3 className="font-bold mb-4">Récapitulatif de votre demande</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Type:</span>
                            <span className="font-semibold">{formData.projectType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Tensions:</span>
                            <span className="font-semibold">{formData.voltageLevel.join(', ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Études:</span>
                            <span className="font-semibold">{formData.studies.length} sélectionnées</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Localisation:</span>
                            <span className="font-semibold">{formData.location || 'À préciser'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        ← Précédent
                      </button>
                    )}
                    {currentStep < 5 ? (
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
                        Envoyer ma demande
                      </button>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar: Dynamic Estimation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <GlassCard className="p-6">
                <h3 className="font-display text-xl font-bold mb-6">
                  Estimation <GradientText>Dynamique</GradientText>
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-white/60">Complexité projet</span>
                      <FaInfoCircle className="text-white/40 text-xs" />
                    </div>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 rounded ${
                            i < estimation.complexity
                              ? 'bg-gradient-to-r from-energy-green to-cyber-blue'
                              : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-2">⏱️ Délai estimé</div>
                    <div className="text-2xl font-bold text-cyber-blue">{estimation.timeline}</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-2">💰 Budget indicatif</div>
                    <div className="text-2xl font-bold text-energy-green">{estimation.budget}</div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-white/50 space-y-2">
                      <p>✓ Estimation automatique basée sur vos réponses</p>
                      <p>✓ Prix final après étude détaillée</p>
                      <p>✓ Devis personnalisé sous 48h</p>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 mt-6">
                <h4 className="font-bold mb-3">Nos Garanties</h4>
                <ul className="space-y-2 text-sm text-white/70">
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Réponse sous 24h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Ingénieurs certifiés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FaCheckCircle className="text-cyber-blue mt-1 flex-shrink-0" />
                    <span>Conformité garantie</span>
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

export default EngineeringPage;
