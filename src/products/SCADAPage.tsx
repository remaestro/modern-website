import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';

function SCADAPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    systemType: '',
    brand: '',
    pointsCount: '',
    networkSize: '',
    integration: '',
    features: [] as string[],
    timeline: '',
    budget: '',
    specificNeeds: ''
  });

  const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('SCADA');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        systemType: '',
        brand: '',
        pointsCount: '',
        networkSize: '',
        integration: '',
        features: [] as string[],
        timeline: '',
        budget: '',
        specificNeeds: ''
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckboxChange = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.includes(feature)
        ? formData.features.filter(f => f !== feature)
        : [...formData.features, feature]
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
              ← Retour aux produits
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
              <FaBolt className="text-4xl text-energy-green" />
              <h1 className="font-display text-5xl lg:text-6xl font-bold">
                Systèmes <GradientText>SCADA</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Supervision, contrôle et acquisition de données en temps réel pour vos réseaux électriques
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Caractéristiques</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Supervision centralisée 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Téléconduite et télécontrôle</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Gestion des alarmes intelligente</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Tableaux de bord personnalisables</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Historisation et reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>API et intégration tiers</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Applications</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Réseaux de distribution HT/MT/BT</li>
                <li>• Centrales de production</li>
                <li>• Sous-stations électriques</li>
                <li>• Micro-réseaux et smart grids</li>
                <li>• Installations industrielles</li>
              </ul>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-display text-3xl font-bold mb-6">
                Détaillez Votre <GradientText>Besoin</GradientText>
              </h2>
              <p className="text-white/70 mb-8">
                Décrivez votre projet SCADA pour obtenir une solution sur mesure adaptée à votre infrastructure.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Entreprise *</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      placeholder="Nom de votre entreprise"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Contact *</label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      placeholder="Votre nom complet"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      placeholder="email@entreprise.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Téléphone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      placeholder="+225 XX XX XX XX"
                    />
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Configuration Système</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type de système *</label>
                      <select
                        name="systemType"
                        value={formData.systemType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="nouveau">Nouveau système</option>
                        <option value="upgrade">Upgrade système existant</option>
                        <option value="extension">Extension système</option>
                        <option value="remplacement">Remplacement</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Marque souhaitée (optionnel)</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Aucune préférence</option>
                        <optgroup label="Leaders mondiaux">
                          <option value="Schneider Electric">Schneider Electric</option>
                          <option value="Siemens">Siemens</option>
                          <option value="ABB">ABB</option>
                          <option value="GE Grid Solutions">GE Grid Solutions</option>
                          <option value="Hitachi Energy">Hitachi Energy</option>
                        </optgroup>
                        <optgroup label="Spécialistes SCADA">
                          <option value="Wonderware">Wonderware (AVEVA)</option>
                          <option value="Iconics">Iconics</option>
                          <option value="Inductive Automation">Inductive Automation (Ignition)</option>
                          <option value="ClearSCADA">ClearSCADA</option>
                          <option value="Simatic WinCC">Simatic WinCC (Siemens)</option>
                          <option value="iFIX">iFIX (GE)</option>
                          <option value="Citect SCADA">Citect SCADA (Schneider)</option>
                        </optgroup>
                        <optgroup label="Solutions open-source">
                          <option value="EPICS">EPICS</option>
                          <option value="OpenSCADA">OpenSCADA</option>
                          <option value="Rapid SCADA">Rapid SCADA</option>
                        </optgroup>
                        <optgroup label="Fournisseurs spécialisés">
                          <option value="Yokogawa">Yokogawa</option>
                          <option value="Emerson">Emerson</option>
                          <option value="Honeywell">Honeywell</option>
                          <option value="Rockwell Automation">Rockwell Automation</option>
                          <option value="OMICRON">OMICRON</option>
                          <option value="SEL">SEL (Schweitzer Engineering)</option>
                        </optgroup>
                        <optgroup label="Autres">
                          <option value="Autre">Autre marque</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre de points *</label>
                      <select
                        name="pointsCount"
                        value={formData.pointsCount}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="0-100">Moins de 100 points</option>
                        <option value="100-500">100 - 500 points</option>
                        <option value="500-1000">500 - 1000 points</option>
                        <option value="1000-5000">1000 - 5000 points</option>
                        <option value="5000+">Plus de 5000 points</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Taille du réseau</label>
                      <input
                        type="text"
                        name="networkSize"
                        value={formData.networkSize}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Ex: 50 km, 10 postes"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Intégration existante</label>
                      <input
                        type="text"
                        name="integration"
                        value={formData.integration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Ex: ERP SAP, GIS Esri"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold mb-3">Fonctionnalités souhaitées</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Téléconduite',
                        'CCN (Contrôle Commande Numérique)',
                        'CRF (Coffret Regroupement Filerie)',
                        'Calculateur',
                        'Gestion des alarmes',
                        'Rapports automatiques',
                        'Analyses prédictives',
                        'Application mobile',
                        'Interface web'
                      ].map((feature) => (
                        <label key={feature} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.features.includes(feature)}
                            onChange={() => handleCheckboxChange(feature)}
                            className="w-4 h-4 bg-white/5 border border-white/10 rounded focus:ring-energy-green"
                          />
                          <span className="text-sm">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Détails du Projet</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Délai de mise en œuvre *</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="urgent">Urgent ({"<"} 2 mois)</option>
                        <option value="2-4">2 à 4 mois</option>
                        <option value="4-6">4 à 6 mois</option>
                        <option value="6+">Plus de 6 mois</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Budget estimé</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="0-50k">Moins de 50 000 USD</option>
                        <option value="50-100k">50 000 - 100 000 USD</option>
                        <option value="100-250k">100 000 - 250 000 USD</option>
                        <option value="250-500k">250 000 - 500 000 USD</option>
                        <option value="500k+">Plus de 500 000 USD</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Description du projet</label>
                    <textarea
                      name="specificNeeds"
                      value={formData.specificNeeds}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez votre infrastructure actuelle, vos besoins en supervision, contraintes techniques, etc."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <p className="text-xs text-white/50">
                    * Champs obligatoires
                  </p>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black"
                  >
                    Envoyer ma demande
                  </motion.button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SCADAPage;
