import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GradientText from '../components/ui/GradientText';
import NoiseTexture from '../components/graphics/NoiseTexture';
import { FaBolt, FaCheckCircle } from 'react-icons/fa';

function TransformersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    transformerType: '',
    power: '',
    voltage: '',
    quantity: '',
    installation: '',
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
                Transformateurs <GradientText>HT/MT/BT</GradientText>
              </h1>
            </div>
            <p className="text-xl text-white/70 max-w-3xl">
              Solutions de transformation électrique haute performance pour vos infrastructures énergétiques
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
                  <span>Puissance de 50 kVA à 5000 kVA</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Tensions HT/MT/BT personnalisables</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Rendement optimisé ≥ 98%</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Protection intégrée et monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Conformité normes internationales</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-energy-green mt-1 flex-shrink-0" />
                  <span>Garantie constructeur 5 ans</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-6">
              <h3 className="font-display text-xl font-bold mb-4">Applications</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>• Réseaux de distribution électrique</li>
                <li>• Installations industrielles</li>
                <li>• Centres commerciaux</li>
                <li>• Infrastructures publiques</li>
                <li>• Sites miniers et pétroliers</li>
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
                Remplissez ce formulaire pour que nos experts puissent vous proposer la solution la plus adaptée à votre projet.
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
                      <label className="block text-sm font-semibold mb-2">Type de Transformateur *</label>
                      <select
                        name="transformerType"
                        value={formData.transformerType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="ht-mt">HT/MT</option>
                        <option value="mt-bt">MT/BT</option>
                        <option value="ht-bt">HT/BT</option>
                        <option value="special">Configuration spéciale</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Puissance souhaitée *</label>
                      <select
                        name="power"
                        value={formData.power}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="50-100">50 - 100 kVA</option>
                        <option value="100-250">100 - 250 kVA</option>
                        <option value="250-500">250 - 500 kVA</option>
                        <option value="500-1000">500 - 1000 kVA</option>
                        <option value="1000-2500">1000 - 2500 kVA</option>
                        <option value="2500+">2500+ kVA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Tension primaire</label>
                      <input
                        type="text"
                        name="voltage"
                        value={formData.voltage}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Ex: 33 kV"
                      />
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

                {/* Project Details */}
                <div className="border-t border-white/10 pt-6 mt-6">
                  <h3 className="font-display text-xl font-bold mb-4">Détails du Projet</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Installation prévue *</label>
                      <select
                        name="installation"
                        value={formData.installation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                      >
                        <option value="">Sélectionner...</option>
                        <option value="interieur">Intérieur</option>
                        <option value="exterieur">Extérieur (poste cabine)</option>
                        <option value="souterrain">Souterrain</option>
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
                      <option value="0-50k">Moins de 50 000 USD</option>
                      <option value="50-100k">50 000 - 100 000 USD</option>
                      <option value="100-250k">100 000 - 250 000 USD</option>
                      <option value="250-500k">250 000 - 500 000 USD</option>
                      <option value="500k+">Plus de 500 000 USD</option>
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
                      placeholder="Décrivez vos besoins spécifiques, contraintes techniques, normes particulières, etc."
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

export default TransformersPage;
