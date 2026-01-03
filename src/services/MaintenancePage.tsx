import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle, FaInfoCircle, FaTools } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';
import { sendEmailWithRetry } from '../services/emailService';

const STEPS = [
  { id: 1, title: 'Type de Maintenance', duration: '30s' },
  { id: 2, title: 'Équipements', duration: '45s' },
  { id: 3, title: 'Fréquence & Planning', duration: '45s' },
  { id: 4, title: 'Détails & Contraintes', duration: '1m' },
  { id: 5, title: 'Contact & Validation', duration: '30s' }
];

interface FormData {
  maintenanceType: string;
  urgency: string;
  contractType: string;
  equipmentType: string[];
  voltageLevel: string;
  quantity: string;
  frequency: string;
  preferredSchedule: string;
  location: string;
  accessConstraints: string[];
  additionalNotes: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  startDate: string;
  contactPreference: string;
}

function MaintenancePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    maintenanceType: '',
    urgency: '',
    contractType: '',
    equipmentType: [],
    voltageLevel: '',
    quantity: '',
    frequency: '',
    preferredSchedule: '',
    location: '',
    accessConstraints: [],
    additionalNotes: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    startDate: '',
    contactPreference: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await sendEmailWithRetry({
        formType: 'MAINTENANCE',
        data: formData
      });
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCurrentStep(1);
        setFormData({
          maintenanceType: '',
          urgency: '',
          contractType: '',
          equipmentType: [],
          voltageLevel: '',
          quantity: '',
          frequency: '',
          preferredSchedule: '',
        location: '',
        accessConstraints: [],
        additionalNotes: '',
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        startDate: '',
        contactPreference: ''
      });
    }, 3000);
    } catch (error) {
      console.error('Erreur envoi:', error);
      alert('❌ Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

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
              <FaTools className="text-4xl text-cyber-blue" />
              <h1 className="font-display text-4xl lg:text-5xl font-bold">
                Maintenance <GradientText>Préventive & Corrective</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Configurez votre contrat de maintenance pour assurer la fiabilité et la longévité de vos équipements électriques
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="max-w-5xl mx-auto mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-10" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-energy-green to-cyber-blue -z-10 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                    currentStep >= step.id 
                      ? 'bg-gradient-to-r from-energy-green to-cyber-blue text-white' 
                      : 'bg-white/10 text-white/40'
                  }`}
                  animate={{ scale: currentStep === step.id ? 1.2 : 1 }}
                >
                  {currentStep > step.id ? <FaCheckCircle /> : step.id}
                </motion.div>
                <p className="text-xs text-white/60 text-center max-w-20">{step.title}</p>
                <p className="text-xs text-white/40">{step.duration}</p>
              </div>
            ))}
          </div>
        </div>

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
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Type de Maintenance</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Type de service *</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Préventive', 'Corrective', 'Prédictive', 'Contrat annuel'].map(type => (
                        <button
                          key={type}
                          onClick={() => updateFormData('maintenanceType', type)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.maintenanceType === type
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Urgence *</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Planifiée', 'Sous 1 mois', 'Urgente'].map(urgency => (
                        <button
                          key={urgency}
                          onClick={() => updateFormData('urgency', urgency)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.urgency === urgency
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {urgency}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Type de contrat</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Ponctuel', 'Annuel', 'Pluriannuel'].map(contract => (
                        <button
                          key={contract}
                          onClick={() => updateFormData('contractType', contract)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.contractType === contract
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {contract}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Équipements à Maintenir</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Type d'équipement *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {['Transformateurs', 'Postes sources', 'Postes de distribution', 'Protections', 'SCADA', 'Câbles'].map(equip => (
                        <button
                          key={equip}
                          onClick={() => toggleArrayValue('equipmentType', equip)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.equipmentType.includes(equip)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {equip}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Niveau de tension</label>
                    <select
                      value={formData.voltageLevel}
                      onChange={(e) => updateFormData('voltageLevel', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="BT">Basse Tension (BT) - &lt; 1 kV</option>
                      <option value="MT">Moyenne Tension (MT) - 1-36 kV</option>
                      <option value="HT">Haute Tension (HT) - 36-150 kV</option>
                      <option value="THT">Très Haute Tension (THT) - &gt; 150 kV</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre d'équipements</label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => updateFormData('quantity', e.target.value)}
                      placeholder="Ex: 5 transformateurs, 2 postes..."
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Fréquence & Planning</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Fréquence de maintenance *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'].map(freq => (
                        <button
                          key={freq}
                          onClick={() => updateFormData('frequency', freq)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.frequency === freq
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Créneau préféré</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Heures ouvrées', 'Nuit', 'Weekend'].map(schedule => (
                        <button
                          key={schedule}
                          onClick={() => updateFormData('preferredSchedule', schedule)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.preferredSchedule === schedule
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {schedule}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Détails & Contraintes</h2>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Localisation</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      placeholder="Ville, région..."
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Contraintes d'accès</label>
                    <div className="grid grid-cols-2 gap-4">
                      {['Site isolé', 'Autorisation requise', 'Arrêt de production', 'Conditions météo'].map(constraint => (
                        <button
                          key={constraint}
                          onClick={() => toggleArrayValue('accessConstraints', constraint)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.accessConstraints.includes(constraint)
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {constraint}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Informations complémentaires</label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                      rows={4}
                      placeholder="Historique de pannes, équipements critiques, exigences particulières..."
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Contact & Validation</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Entreprise *</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => updateFormData('companyName', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom du contact *</label>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => updateFormData('contactName', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                        className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Date de début souhaitée</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateFormData('startDate', e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:border-energy-green outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Préférence de contact</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Email', 'Téléphone', 'Rendez-vous'].map(pref => (
                        <button
                          key={pref}
                          onClick={() => updateFormData('contactPreference', pref)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.contactPreference === pref
                              ? 'border-energy-green bg-energy-green/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {pref}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-700">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-3 rounded-lg border border-white/10 hover:border-energy-green disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Précédent
                </button>
                
                {currentStep < STEPS.length ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-energy-green to-cyber-blue hover:opacity-90 transition-all"
                  >
                    Envoyer la demande
                  </button>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-graphite/90 backdrop-blur-xl p-8 rounded-2xl border border-energy-green max-w-md"
              >
                <div className="text-center">
                  <FaCheckCircle className="text-6xl text-energy-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Demande envoyée !</h3>
                  <p className="text-white/70">
                    Nous vous contacterons sous 24-48h pour discuter de votre contrat de maintenance.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default MaintenancePage;
