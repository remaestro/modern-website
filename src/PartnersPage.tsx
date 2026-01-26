import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandshake, FaBolt } from 'react-icons/fa';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';

const allPartners = [
  { name: 'Schneider Electric', logo: '/assets/partners/schneider.png' },
  { name: 'ABB', logo: '/assets/partners/abb.png' },
  { name: 'Siemens', logo: '/assets/partners/siemens.png' },
  { name: 'General Electric', logo: '/assets/partners/GE-Logo-blanc-noir.png' },
  { name: 'Alstom', logo: '/assets/partners/alstom.png' },
  { name: 'Eaton', logo: '/assets/partners/eaton.png' },
  { name: 'Legrand', logo: '/assets/partners/legrand.png' },
  { name: 'ETAP', logo: '/assets/partners/etap.png' },
  { name: '3M', logo: '/assets/partners/3m.png' },
  { name: 'Megger', logo: '/assets/partners/meggerlogo.png' },
  { name: 'EKOS', logo: '/assets/partners/ekoslogo-couleurs.png' },
  { name: 'EUROPOWER', logo: '/assets/partners/eupower.png' },
  { name: 'ASTOR', logo: '/assets/partners/astor.png' },
  { name: 'EVA ELEKTRIC', logo: '/assets/partners/eva-logo-part-transparent.png' },
  { name: 'ARTECHE', logo: '/assets/partners/th_arteche.png' },
  { name: 'TSTY ELECTRIC' },
  { name: 'ULUSOY' },
  { name: 'ORMAZABAL' },
  { name: 'DIgSILENT' }
];

function PartnersPage() {
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
            <Link to="/partners" className="text-sm font-medium text-energy-green">
              Partenaires
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
              <span className="text-energy-green text-sm font-bold tracking-wider uppercase flex items-center gap-2 justify-center">
                <FaBolt /> Solutions Énergie
              </span>
            </div>
            <h1 className="font-display text-display font-bold mb-6">
              Nos Partenaires <GradientText>Technologiques</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Nous collaborons avec les leaders mondiaux de l'industrie pour vous offrir les solutions les plus performantes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <GlassCard className="p-6 h-40 flex items-center justify-center" hover>
                  <div className="text-center">
                    {partner.logo ? (
                      <>
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="h-16 mx-auto mb-3 object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <p className="text-white/60 text-sm font-medium">{partner.name}</p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 mx-auto mb-2 bg-energy-green/10 rounded-lg flex items-center justify-center">
                          <FaHandshake className="text-energy-green text-xl" />
                        </div>
                        <p className="text-white/80 text-sm font-medium">{partner.name}</p>
                      </>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-white/50 text-sm mt-8"
          >
            Et bien d'autres partenaires stratégiques...
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-graphite/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Devenir <GradientText>Partenaire</GradientText>
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Rejoignez notre écosystème et développons ensemble des solutions innovantes pour le secteur énergétique africain
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg"
            >
              Nous Contacter
            </motion.button>
          </Link>
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

export default PartnersPage;
