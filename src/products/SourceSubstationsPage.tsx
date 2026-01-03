import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';

function SourceSubstationsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    substationType: '',
    primaryVoltage: '',
    secondaryVoltage: '',
    power: '',
    configuration: '',
    location: '',
    timeline: '',
    budget: '',
    specificNeeds: ''
  });

  const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('SOURCE_SUBSTATION');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        substationType: '',
        primaryVoltage: '',
        secondaryVoltage: '',
        power: '',
        configuration: '',
        location: '',
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
                Postes Sources <GradientText>HT/MT</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Sous-stations haute et moyenne tension clé en main pour l'alimentation de vos réseaux
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
                  <span>Tensions primaires jusqu'à 225 kV</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Puissances de 10 à 100+ MVA</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Configuration simple ou double jeu de barres</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Appareillage blindé GIS/AIS</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Système de protection et contrôle-commande</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Intégration SCADA et télécommande</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Applications</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Alimentation de zones urbaines</li>
                <li>• Zones industrielles lourdes</li>
                <li>• Mines et sites extractifs</li>
                <li>• Interconnexion de réseaux</li>
                <li>• Centrales de production</li>
              </ul>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-display text-3xl font-bold mb-6">
                Détaillez Votre <GradientText>Besoin</GradientText>
              </h2>
              <p className="text-white/70 mb-8">
                Remplissez ce formulaire pour obtenir une solution de poste source adaptée à vos besoins.
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
                  <h3 className="font-display text-xl font-bold mb-4">Spécifications Techniques</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type de poste *</label>
                      <select
                        name="substationType"
                        value={formData.substationType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="ht-mt">HT/MT</option>
                        <option value="mt-mt">MT/MT</option>
                        <option value="ht-mt-bt">HT/MT/BT</option>
                        <option value="elevation">Poste d'élévation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Tension primaire *</label>
                      <select
                        name="primaryVoltage"
                        value={formData.primaryVoltage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="30kv">30 kV</option>
                        <option value="63kv">63 kV</option>
                        <option value="90kv">90 kV</option>
                        <option value="132kv">132 kV</option>
                        <option value="161kv">161 kV</option>
                        <option value="225kv">225 kV</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Tension secondaire</label>
                      <select
                        name="secondaryVoltage"
                        value={formData.secondaryVoltage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="5.5kv">5,5 kV</option>
                        <option value="10kv">10 kV</option>
                        <option value="15kv">15 kV</option>
                        <option value="20kv">20 kV</option>
                        <option value="30kv">30 kV</option>
                        <option value="33kv">33 kV</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Puissance transformateur *</label>
                      <select
                        name="power"
                        value={formData.power}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="10-20">10 - 20 MVA</option>
                        <option value="20-40">20 - 40 MVA</option>
                        <option value="40-60">40 - 60 MVA</option>
                        <option value="60-100">60 - 100 MVA</option>
                        <option value="100+">Plus de 100 MVA</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Détails du Projet</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Configuration *</label>
                      <select
                        name="configuration"
                        value={formData.configuration}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="simple-jdb">Simple jeu de barres</option>
                        <option value="double-jdb">Double jeu de barres</option>
                        <option value="disjoncteur-demi">Disjoncteur et demi</option>
                        <option value="gis">Appareillage blindé (GIS)</option>
                        <option value="ais">Appareillage classique (AIS)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Type d'emplacement</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="urbain">Zone urbaine dense</option>
                        <option value="periurbain">Zone péri-urbaine</option>
                        <option value="rural">Zone rurale</option>
                        <option value="industriel">Zone industrielle</option>
                        <option value="minier">Site minier/extractif</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Délai souhaité *</label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="6-12">6 à 12 mois</option>
                        <option value="12-18">12 à 18 mois</option>
                        <option value="18-24">18 à 24 mois</option>
                        <option value="24+">Plus de 24 mois</option>
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
                        <option value="0-5m">Moins de 5 M USD</option>
                        <option value="5-10m">5 - 10 M USD</option>
                        <option value="10-20m">10 - 20 M USD</option>
                        <option value="20-50m">20 - 50 M USD</option>
                        <option value="50m+">Plus de 50 M USD</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Besoins spécifiques</label>
                    <textarea
                      name="specificNeeds"
                      value={formData.specificNeeds}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez vos besoins : nombre de départs, système de protection souhaité, contraintes de terrain, normes applicables, etc."
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

export default SourceSubstationsPage;
