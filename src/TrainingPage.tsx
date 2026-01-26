import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';
import { useContactForm, SubmitButton, FormFeedback } from './components/ContactForm';

const trainings = [
  {
    id: 'protection-reseaux',
    title: 'Protection Réseaux',
    description: 'Maîtrisez les systèmes de protection des réseaux électriques HT/MT/BT'
  },
  {
    id: 'teleconduite-hta-bt',
    title: 'Téléconduite et Télécommunication pour un réseau HTA/BT',
    description: 'Apprenez à superviser et contrôler les réseaux de distribution à distance'
  },
  {
    id: 'ccn',
    title: 'CCN',
    description: 'Formation complète sur les Centres de Conduite Nationaux'
  },
  {
    id: 'logiciel',
    title: 'Logiciel',
    description: 'Formation sur les logiciels de gestion et supervision des réseaux électriques'
  },
  {
    id: 'exploitation-maintenance-htb-ht',
    title: 'Exploitation et Maintenance des Postes HTB/HT',
    description: 'Techniques d\'exploitation et maintenance préventive des postes haute tension'
  },
  {
    id: 'ccl-protections-htb-ht',
    title: 'CCL et Protections des Postes HTB/HT',
    description: 'Maîtrise des systèmes CCL et des protections pour postes très haute tension'
  },
  {
    id: 'automatismes-protections',
    title: 'Automatismes et Protections d\'exploitation',
    description: 'Formation avancée sur les automatismes et systèmes de protection'
  }
];

function TrainingPage() {
  const { isSubmitting, showSuccess, showError, errorMessage, submitForm } = useContactForm('formation');
  const [selectedTrainings, setSelectedTrainings] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    participants: '1',
    message: ''
  });

  const toggleTraining = (id: string) => {
    setSelectedTrainings(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTrainings.length === 0) {
      alert('Veuillez sélectionner au moins une formation');
      return;
    }
    const success = await submitForm({
      ...formData,
      formations: selectedTrainings.map(id => trainings.find(t => t.id === id)?.title)
    });
    if (success) {
      setFormData({ name: '', email: '', phone: '', company: '', participants: '1', message: '' });
      setSelectedTrainings([]);
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
            <Link to="/contact" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
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
            <div className="inline-block px-4 py-2 mb-6 backdrop-blur-sm bg-energy-green/10 border border-energy-green/30 rounded-full">
              <span className="text-energy-green text-sm font-bold tracking-wider uppercase flex items-center gap-2">
                <FaGraduationCap /> Formations
              </span>
            </div>
            <h1 className="font-display text-display font-bold mb-6">
              Besoin d'une <GradientText>Formation ?</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Nos experts se tiennent à vos côtés pour vous faire monter en compétence sur les technologies et systèmes électriques
            </p>
          </motion.div>
        </div>
      </section>

      {/* Training Content */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Training List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display text-2xl font-bold mb-6">
                Sélectionnez vos <GradientText>formations</GradientText>
              </h2>

              <div className="space-y-4">
                {trainings.map((training, index) => (
                  <motion.div
                    key={training.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard
                      className={`p-4 cursor-pointer transition-all ${
                        selectedTrainings.includes(training.id)
                          ? 'border-energy-green bg-energy-green/10'
                          : 'hover:border-white/30'
                      }`}
                      hover
                      onClick={() => toggleTraining(training.id)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedTrainings.includes(training.id)
                            ? 'border-energy-green bg-energy-green'
                            : 'border-white/30'
                        }`}>
                          {selectedTrainings.includes(training.id) && (
                            <FaCheckCircle className="text-deep-black text-sm" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{training.title}</h3>
                          <p className="text-sm text-white/60">{training.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>

              {selectedTrainings.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-energy-green/10 border border-energy-green/30 rounded-lg"
                >
                  <p className="text-sm text-energy-green">
                    {selectedTrainings.length} formation(s) sélectionnée(s)
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Registration Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Demande d'<GradientText>inscription</GradientText>
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
                      <label className="block text-sm font-medium mb-2">Téléphone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
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
                    <label className="block text-sm font-medium mb-2">Nombre de participants</label>
                    <select
                      name="participants"
                      value={formData.participants}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors text-white"
                    >
                      {[1, 2, 3, 4, 5, '6+'].map(num => (
                        <option key={num} value={num} className="bg-deep-black">{num} participant{num !== 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message (optionnel)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-energy-green focus:outline-none transition-colors resize-none"
                      placeholder="Précisez vos besoins spécifiques, dates souhaitées..."
                    />
                  </div>

                  <FormFeedback showSuccess={showSuccess} showError={showError} errorMessage={errorMessage} />

                  <SubmitButton isSubmitting={isSubmitting} showSuccess={showSuccess} text="Envoyer la demande de formation" />
                </form>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-deep-black border-t border-white/10 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-white/40 text-sm">
            &copy; 2025 Digita Energy. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default TrainingPage;
