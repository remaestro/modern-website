import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';
import { useContactForm, SubmitButton, FormFeedback } from './components/ContactForm';

function ContactPage() {
  const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('contact-general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(formData);
    if (success) {
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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

          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              Accueil
            </Link>
            <Link to="/products-services" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              Produits & Services
            </Link>
            <Link to="/contact" className="text-sm font-medium text-energy-green">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-display font-bold mb-6">
              <GradientText>Contactez-Nous</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <GlassCard className="p-6" hover>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-energy-green/20 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-energy-green text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Email</h3>
                    <a href="mailto:infos@digita-energy.com" className="text-white/70 hover:text-energy-green transition-colors">
                      infos@digita-energy.com
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6" hover>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyber-blue/20 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-cyber-blue text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Téléphone</h3>
                    <a href="tel:+22507071881889" className="text-white/70 hover:text-cyber-blue transition-colors">
                      +225 07 07 18 81 89
                    </a>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6" hover>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-plasma-purple/20 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-plasma-purple text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Adresse</h3>
                    <p className="text-white/70">
                      Abidjan, Côte d'Ivoire
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Horaires */}
              <GlassCard className="p-6">
                <h3 className="font-bold mb-4">Horaires d'ouverture</h3>
                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="text-energy-green">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="text-white/50">9h00 - 13h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-white/50">Fermé</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <GlassCard className="p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Planifier une <GradientText>Consultation</GradientText>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nom complet *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Téléphone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="+225 XX XX XX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Entreprise</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors text-white"
                    >
                      <option value="" className="bg-deep-black">Sélectionnez un sujet</option>
                      <option value="consultation" className="bg-deep-black">Planifier une consultation</option>
                      <option value="devis" className="bg-deep-black">Demande de devis</option>
                      <option value="partenariat" className="bg-deep-black">Partenariat</option>
                      <option value="formation" className="bg-deep-black">Formation</option>
                      <option value="support" className="bg-deep-black">Support technique</option>
                      <option value="autre" className="bg-deep-black">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                  </div>

                  <FormFeedback showSuccess={showSuccess} showError={showError} errorMessage={errorMessage} />

                  <SubmitButton isSubmitting={isSubmitting} showSuccess={showSuccess} text="Envoyer le message" />
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-deep-black border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; 2025 Digita Energy. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ContactPage;
