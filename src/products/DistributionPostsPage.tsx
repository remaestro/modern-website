import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';
import { useContactForm, SubmitButton, FormFeedback } from '../components/ContactForm';

function DistributionPostsPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    postType: '',
    voltage: '',
    capacity: '',
    quantity: '',
    location: '',
    timeline: '',
    budget: '',
    specificNeeds: ''
  });

  const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('DISTRIBUTION_POST');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phone: '',
        postType: '',
        voltage: '',
        capacity: '',
        quantity: '',
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
      
      {/* Navigation */}
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

      {/* Header */}
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
                Postes de <GradientText>Distribution</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Infrastructure de distribution électrique intelligente et sécurisée pour vos réseaux
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Product Info */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Caractéristiques</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Postes préfabriqués et sur mesure</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Tensions MT/BT jusqu'à 36 kV</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Tableaux de distribution modulaires</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Monitoring et télécommande intégrés</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Protection IP44/IP54</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Installation clé en main</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Applications</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Zones urbaines et péri-urbaines</li>
                <li>• Lotissements et quartiers</li>
                <li>• Zones industrielles</li>
                <li>• Centres commerciaux</li>
                <li>• Hôpitaux et écoles</li>
              </ul>
            </GlassCard>
          </div>

          {/* Right: Request Form */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              <h2 className="font-display text-3xl font-bold mb-6">
                Détaillez Votre <GradientText>Besoin</GradientText>
              </h2>
              <p className="text-white/70 mb-8">
                Remplissez ce formulaire pour obtenir une solution adaptée à votre projet de distribution électrique.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Info */}
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

                {/* Technical Requirements */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Spécifications Techniques</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type de Poste *</label>
                      <select
                        name="postType"
                        value={formData.postType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="prefabrique">Poste préfabriqué</option>
                        <option value="cabine">Cabine maçonnée</option>
                        <option value="compact">Poste compact</option>
                        <option value="sur-mesure">Sur mesure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Niveau de tension *</label>
                      <select
                        name="voltage"
                        value={formData.voltage}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="15kv">15 kV</option>
                        <option value="20kv">20 kV</option>
                        <option value="30kv">30 kV</option>
                        <option value="36kv">36 kV</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Capacité souhaitée *</label>
                      <select
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="100-250">100 - 250 kVA</option>
                        <option value="250-500">250 - 500 kVA</option>
                        <option value="500-1000">500 - 1000 kVA</option>
                        <option value="1000+">Plus de 1000 kVA</option>
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
                        placeholder="Nombre de postes"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Détails du Projet</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Type d'emplacement *</label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="urbain">Zone urbaine</option>
                        <option value="periurbain">Zone péri-urbaine</option>
                        <option value="rural">Zone rurale</option>
                        <option value="industriel">Zone industrielle</option>
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
                        <option value="1-3">1 à 3 mois</option>
                        <option value="3-6">3 à 6 mois</option>
                        <option value="6+">Plus de 6 mois</option>
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
                      <option value="0-100k">Moins de 100 000 USD</option>
                      <option value="100-250k">100 000 - 250 000 USD</option>
                      <option value="250-500k">250 000 - 500 000 USD</option>
                      <option value="500k-1m">500 000 - 1 000 000 USD</option>
                      <option value="1m+">Plus de 1 000 000 USD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Besoins spécifiques</label>
                    <textarea
                      name="specificNeeds"
                      value={formData.specificNeeds}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez vos besoins spécifiques : génie civil existant, contraintes d'accès, normes locales, etc."
                    />
                  </div>
                </div>

                {/* Submit */}
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

export default DistributionPostsPage;
