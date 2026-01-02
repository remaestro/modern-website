import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

type MaintenancePlan = 'basic' | 'standard' | 'premium' | 'custom';

interface Equipment {
  type: string;
  quantity: number;
  power: string;
  age: string;
}

function MaintenancePage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<MaintenancePlan | null>(null);
  const [equipments, setEquipments] = useState<Equipment[]>([
    { type: '', quantity: 1, power: '', age: '' }
  ]);
  const [formData, setFormData] = useState({
    // Step 1: Plan selection
    plan: '',
    // Step 2: Equipment inventory
    equipmentList: [] as Equipment[],
    // Step 3: Service options
    preventiveMaintenance: true,
    predictiveMaintenance: false,
    emergency24_7: false,
    sparePartsStock: false,
    performanceReporting: false,
    trainingProgram: false,
    // Step 4: Contract details
    contractDuration: '12',
    startDate: '',
    siteLocation: '',
    accessRestrictions: '',
    // Step 5: Contact
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  const plans = {
    basic: {
      name: 'Basique',
      price: '150',
      features: ['Maintenance préventive annuelle', 'Rapports basiques', 'Support email'],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    standard: {
      name: 'Standard',
      price: '350',
      features: ['Maintenance préventive trimestrielle', 'Rapports détaillés', 'Support téléphonique', 'Intervention sous 48h'],
      color: 'from-cyber-blue to-purple-500',
      popular: true
    },
    premium: {
      name: 'Premium',
      price: '750',
      features: ['Maintenance préventive mensuelle', 'IA prédictive', 'Support 24/7', 'Intervention sous 12h', 'Stock de pièces dédié', 'Formation équipe'],
      color: 'from-energy-green to-cyan-400',
      popular: false
    },
    custom: {
      name: 'Sur Mesure',
      price: 'Sur devis',
      features: ['Configuration personnalisée', 'SLA adapté', 'Services dédiés'],
      color: 'from-purple-500 to-pink-500',
      popular: false
    }
  };

  const addEquipment = () => {
    setEquipments([...equipments, { type: '', quantity: 1, power: '', age: '' }]);
  };

  const removeEquipment = (index: number) => {
    setEquipments(equipments.filter((_, i) => i !== index));
  };

  const updateEquipment = (index: number, field: keyof Equipment, value: string | number) => {
    const updated = [...equipments];
    updated[index] = { ...updated[index], [field]: value };
    setEquipments(updated);
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contract request:', { ...formData, plan: selectedPlan, equipments });
    alert('Demande de contrat envoyée avec succès ! Notre équipe vous contactera sous 24h.');
  };

  const estimatePrice = () => {
    if (!selectedPlan) return 0;
    const basePrice = selectedPlan === 'basic' ? 150 : selectedPlan === 'standard' ? 350 : selectedPlan === 'premium' ? 750 : 500;
    const equipmentCount = equipments.reduce((sum, eq) => sum + eq.quantity, 0);
    const optionsPrice = 
      (formData.predictiveMaintenance ? 200 : 0) +
      (formData.emergency24_7 ? 150 : 0) +
      (formData.sparePartsStock ? 100 : 0) +
      (formData.performanceReporting ? 50 : 0) +
      (formData.trainingProgram ? 80 : 0);
    return (basePrice * equipmentCount) + optionsPrice;
  };

  return (
    <div className="min-h-screen bg-deep-black text-white font-body overflow-x-hidden">
      <NoiseTexture />
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-deep-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold tracking-tight hover:scale-105 transition-transform">
            DIGITA <GradientText>ENERGY</GradientText>
          </Link>
          
          <div className="flex gap-6 items-center text-sm">
            <Link to="/products-services" className="text-white/70 hover:text-cyber-blue transition-colors">
              ← Retour aux services
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
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
                Maintenance <GradientText>Préventive</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Programmes de maintenance avec IA prédictive pour maximiser la disponibilité de vos équipements
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar: Progress & Summary */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              <h3 className="font-display text-sm font-bold mb-4 text-white/60">ÉTAPES</h3>
              <div className="space-y-3 mb-8">
                {[
                  { num: 1, label: 'Formule' },
                  { num: 2, label: 'Équipements' },
                  { num: 3, label: 'Options' },
                  { num: 4, label: 'Contrat' },
                  { num: 5, label: 'Contact' }
                ].map(s => (
                  <div key={s.num} className={`flex items-center gap-3 ${step >= s.num ? 'text-energy-green' : 'text-white/30'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step > s.num ? 'bg-energy-green text-deep-black' :
                      step === s.num ? 'bg-energy-green/20 border-2 border-energy-green' :
                      'bg-white/5'
                    }`}>
                      {step > s.num ? '✓' : s.num}
                    </div>
                    <span className="text-sm font-medium">{s.label}</span>
                  </div>
                ))}
              </div>

              {selectedPlan && (
                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-display text-sm font-bold mb-3">ESTIMATION</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Formule</span>
                      <span className="font-semibold">{plans[selectedPlan].name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Équipements</span>
                      <span className="font-semibold">{equipments.reduce((sum, eq) => sum + eq.quantity, 0)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/10">
                      <span className="text-white/60">Prix mensuel</span>
                      <span className="font-bold text-energy-green text-lg">
                        {estimatePrice().toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Plan Selection */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      Choisissez Votre <GradientText>Formule</GradientText>
                    </h2>
                    <p className="text-white/60 mb-8">Sélectionnez la formule de maintenance qui correspond à vos besoins</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {(Object.keys(plans) as MaintenancePlan[]).map(planKey => (
                        <motion.div
                          key={planKey}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedPlan(planKey)}
                          className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPlan === planKey
                              ? 'border-energy-green bg-energy-green/5'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          {plans[planKey].popular && (
                            <div className="absolute -top-3 right-4 px-3 py-1 bg-energy-gradient rounded-full text-xs font-bold text-deep-black">
                              POPULAIRE
                            </div>
                          )}
                          
                          <h3 className="font-display text-2xl font-bold mb-2">{plans[planKey].name}</h3>
                          <div className="text-3xl font-bold mb-4">
                            <span className={`bg-gradient-to-r ${plans[planKey].color} bg-clip-text text-transparent`}>
                              {plans[planKey].price}
                            </span>
                            {planKey !== 'custom' && <span className="text-sm text-white/60"> USD/mois</span>}
                          </div>
                          
                          <ul className="space-y-2">
                            {plans[planKey].features.map((feature, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <FaCheckCircle className="text-energy-green mt-0.5 flex-shrink-0" />
                                <span className="text-white/70">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Step 2: Equipment Inventory */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      Inventaire <GradientText>Équipements</GradientText>
                    </h2>
                    <p className="text-white/60 mb-8">Listez les équipements à maintenir</p>

                    <div className="space-y-6">
                      {equipments.map((equipment, index) => (
                        <div key={index} className="p-6 bg-white/5 rounded-lg border border-white/10">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold">Équipement {index + 1}</h4>
                            {equipments.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeEquipment(index)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Retirer
                              </button>
                            )}
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-semibold mb-2">Type *</label>
                              <select
                                value={equipment.type}
                                onChange={(e) => updateEquipment(index, 'type', e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                              >
                                <option value="">Sélectionner...</option>
                                <option value="transformateur">Transformateur</option>
                                <option value="disjoncteur">Disjoncteur</option>
                                <option value="protection">Système de protection</option>
                                <option value="scada">Système SCADA</option>
                                <option value="poste">Poste source</option>
                                <option value="autre">Autre</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Puissance</label>
                              <input
                                type="text"
                                value={equipment.power}
                                onChange={(e) => updateEquipment(index, 'power', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                                placeholder="Ex: 500 kVA"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Quantité *</label>
                              <input
                                type="number"
                                value={equipment.quantity}
                                onChange={(e) => updateEquipment(index, 'quantity', parseInt(e.target.value) || 1)}
                                required
                                min="1"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-semibold mb-2">Âge</label>
                              <select
                                value={equipment.age}
                                onChange={(e) => updateEquipment(index, 'age', e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                              >
                                <option value="">Sélectionner...</option>
                                <option value="0-2">Moins de 2 ans</option>
                                <option value="2-5">2 à 5 ans</option>
                                <option value="5-10">5 à 10 ans</option>
                                <option value="10-20">10 à 20 ans</option>
                                <option value="20+">Plus de 20 ans</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addEquipment}
                        className="w-full py-3 border-2 border-dashed border-white/20 rounded-lg text-white/60 hover:border-energy-green hover:text-energy-green transition-colors"
                      >
                        + Ajouter un équipement
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Step 3: Service Options */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      Options <GradientText>Supplémentaires</GradientText>
                    </h2>
                    <p className="text-white/60 mb-8">Personnalisez votre contrat avec des services additionnels</p>

                    <div className="space-y-4">
                      {[
                        { key: 'preventiveMaintenance', label: 'Maintenance Préventive', desc: 'Visites régulières programmées', price: 'Inclus', locked: true },
                        { key: 'predictiveMaintenance', label: 'Maintenance Prédictive IA', desc: 'Analyse prédictive des pannes', price: '+200 USD/mois' },
                        { key: 'emergency24_7', label: 'Support Urgence 24/7', desc: 'Intervention d\'urgence à tout moment', price: '+150 USD/mois' },
                        { key: 'sparePartsStock', label: 'Stock de Pièces Dédié', desc: 'Pièces de rechange en stock pour votre site', price: '+100 USD/mois' },
                        { key: 'performanceReporting', label: 'Rapports de Performance', desc: 'Rapports mensuels détaillés', price: '+50 USD/mois' },
                        { key: 'trainingProgram', label: 'Formation Équipe', desc: 'Formation continue de vos équipes', price: '+80 USD/mois' }
                      ].map(option => (
                        <label
                          key={option.key}
                          className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData[option.key as keyof typeof formData]
                              ? 'border-energy-green bg-energy-green/5'
                              : 'border-white/10 hover:border-white/30'
                          } ${option.locked ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={formData[option.key as keyof typeof formData] as boolean}
                            onChange={(e) => setFormData({ ...formData, [option.key]: e.target.checked })}
                            disabled={option.locked}
                            className="mt-1 w-5 h-5 rounded border-white/30 text-energy-green focus:ring-energy-green"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold">{option.label}</h4>
                              <span className="text-sm text-energy-green font-bold">{option.price}</span>
                            </div>
                            <p className="text-sm text-white/60">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Step 4: Contract Details */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      Détails du <GradientText>Contrat</GradientText>
                    </h2>
                    <p className="text-white/60 mb-8">Définissez la durée et les modalités du contrat</p>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Durée du contrat *</label>
                          <select
                            value={formData.contractDuration}
                            onChange={(e) => setFormData({ ...formData, contractDuration: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                          >
                            <option value="12">12 mois (-5%)</option>
                            <option value="24">24 mois (-10%)</option>
                            <option value="36">36 mois (-15%)</option>
                            <option value="48">48 mois (-20%)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Date de début souhaitée *</label>
                          <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Localisation du site *</label>
                        <input
                          type="text"
                          value={formData.siteLocation}
                          onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                          placeholder="Ville, pays"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Restrictions d'accès</label>
                        <textarea
                          value={formData.accessRestrictions}
                          onChange={(e) => setFormData({ ...formData, accessRestrictions: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none resize-none"
                          placeholder="Horaires d'accès, badges requis, autorisations spéciales..."
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Step 5: Contact & Summary */}
              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard className="p-8">
                    <h2 className="font-display text-3xl font-bold mb-2">
                      Informations de <GradientText>Contact</GradientText>
                    </h2>
                    <p className="text-white/60 mb-8">Dernière étape avant l'envoi de votre demande</p>

                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Entreprise *</label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                            placeholder="Nom de votre entreprise"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Nom complet *</label>
                          <input
                            type="text"
                            value={formData.contactName}
                            onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                            placeholder="Votre nom"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                            placeholder="email@entreprise.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Téléphone *</label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none"
                            placeholder="+225 XX XX XX XX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Notes additionnelles</label>
                        <textarea
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none resize-none"
                          placeholder="Informations complémentaires..."
                        />
                      </div>

                      {/* Summary */}
                      <div className="border-t border-white/10 pt-6">
                        <h3 className="font-display text-xl font-bold mb-4">Récapitulatif</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">Formule</span>
                            <span className="font-semibold">{selectedPlan && plans[selectedPlan].name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Équipements</span>
                            <span className="font-semibold">{equipments.reduce((sum, eq) => sum + eq.quantity, 0)} unités</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/60">Durée</span>
                            <span className="font-semibold">{formData.contractDuration} mois</span>
                          </div>
                          <div className="flex justify-between pt-3 border-t border-white/10">
                            <span className="font-semibold">Prix mensuel estimé</span>
                            <span className="font-bold text-energy-green text-xl">
                              {estimatePrice().toLocaleString()} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    step === 1
                      ? 'opacity-0 pointer-events-none'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <FaChevronLeft />
                  Précédent
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={step === 1 && !selectedPlan}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                      (step === 1 && !selectedPlan)
                        ? 'bg-white/5 text-white/30 cursor-not-allowed'
                        : 'bg-energy-gradient text-deep-black hover:scale-105'
                    }`}
                  >
                    Suivant
                    <FaChevronRight />
                  </button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-energy-gradient rounded-lg font-bold text-deep-black"
                  >
                    Envoyer la demande
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenancePage;
