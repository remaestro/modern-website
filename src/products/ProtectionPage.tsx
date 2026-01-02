import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';

function ProtectionPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    protectionType: '',
    voltageLevel: '',
    equipmentType: '',
    quantity: '',
    automation: '',
    timeline: '',
    budget: '',
    specificNeeds: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Demande envoyée avec succès ! Nous vous contacterons sous peu.');
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
                Protection & <GradientText>Automatisation</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Systèmes de protection et automatisation pour la sécurité et l'efficacité de vos réseaux électriques
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
                  <span>Relais de protection numériques</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Automatismes programmables</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Systèmes de réenclenchement</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Protection différentielle</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Contrôle-commande décentralisé</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Communication IEC 61850</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Applications</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Postes HT/MT</li>
                <li>• Lignes de distribution</li>
                <li>• Transformateurs de puissance</li>
                <li>• Groupes électrogènes</li>
                <li>• Réseaux industriels</li>
              </ul>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-display text-3xl font-bold mb-6">
                Détaillez Votre <GradientText>Besoin</GradientText>
              </h2>
              <p className="text-white/70 mb-8">
                Décrivez vos besoins en protection et automatisation pour une solution adaptée à votre installation.
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
                      <label className="block text-sm font-semibold mb-2">Type de protection *</label>
                      <select
                        name="protectionType"
                        value={formData.protectionType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="ligne">Protection de ligne</option>
                        <option value="transformateur">Protection transformateur</option>
                        <option value="moteur">Protection moteur</option>
                        <option value="jeu-barres">Protection jeu de barres</option>
                        <option value="globale">Protection globale</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Niveau de tension *</label>
                      <select
                        name="voltageLevel"
                        value={formData.voltageLevel}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="bt">Basse Tension (BT)</option>
                        <option value="mt">Moyenne Tension (MT)</option>
                        <option value="ht">Haute Tension (HT)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Type d'équipement</label>
                      <select
                        name="equipmentType"
                        value={formData.equipmentType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="relais">Relais numériques</option>
                        <option value="automates">Automates</option>
                        <option value="ensemble">Ensemble complet</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Quantité *</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Nombre d'unités"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Détails du Projet</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Niveau d'automatisation</label>
                      <select
                        name="automation"
                        value={formData.automation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="basic">Basique (protection seule)</option>
                        <option value="intermediate">Intermédiaire (protection + monitoring)</option>
                        <option value="advanced">Avancé (protection + automatismes)</option>
                        <option value="full">Complet (IEC 61850, SCADA)</option>
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
                        <option value="urgent">Urgent ({"<"} 1 mois)</option>
                        <option value="1-2">1 à 2 mois</option>
                        <option value="2-4">2 à 4 mois</option>
                        <option value="4+">Plus de 4 mois</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Budget estimé</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                    >
                      <option value="">Sélectionner...</option>
                      <option value="0-25k">Moins de 25 000 USD</option>
                      <option value="25-50k">25 000 - 50 000 USD</option>
                      <option value="50-100k">50 000 - 100 000 USD</option>
                      <option value="100-250k">100 000 - 250 000 USD</option>
                      <option value="250k+">Plus de 250 000 USD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Description du besoin</label>
                    <textarea
                      name="specificNeeds"
                      value={formData.specificNeeds}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez votre installation, équipements à protéger, contraintes, normes applicables, etc."
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

export default ProtectionPage;
