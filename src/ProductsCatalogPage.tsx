import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaBolt,
  FaCubes,
  FaIndustry,
  FaShieldAlt,
  FaCog,
  FaMicrochip,
  FaPlug,
  FaTachometerAlt,
  FaServer
} from 'react-icons/fa';
import GlassCard from './components/ui/GlassCard';
import GradientText from './components/ui/GradientText';
import NoiseTexture from './components/graphics/NoiseTexture';

interface Product {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  brands: string[];
  gradient: string;
  image?: string;
}

const products: Product[] = [
  {
    id: 'cellules-primaires',
    name: 'Cellules Primaires',
    description: 'Cellules haute tension pour postes sources et réseaux de transport. Solutions modulaires pour la distribution primaire d\'énergie.',
    icon: <FaCubes />,
    features: [
      'Tension jusqu\'à 36 kV',
      'Courant nominal jusqu\'à 2500 A',
      'Pouvoir de coupure jusqu\'à 31.5 kA',
      'Technologie SF6 ou vide'
    ],
    brands: ['Schneider Electric', 'ABB', 'Siemens', 'Ormazabal'],
    gradient: 'from-energy-green to-emerald-600',
    image: '/assets/products/cellule-mv.jpg'
  },
  {
    id: 'cellules-secondaires',
    name: 'Cellules Secondaires',
    description: 'Cellules moyenne tension pour la distribution secondaire. Gamme complète de cellules modulaires compactes.',
    icon: <FaServer />,
    features: [
      'Tension 12-24 kV',
      'Interrupteur-sectionneur',
      'Protection par fusibles HPC',
      'Compact et modulaire'
    ],
    brands: ['Schneider SM6', 'ABB SafeRing', 'Siemens 8DJH', 'Eaton'],
    gradient: 'from-cyber-blue to-blue-600'
  },
  {
    id: 'transformateurs',
    name: 'Transformateurs',
    description: 'Transformateurs de puissance HT/MT/BT pour tous types d\'applications industrielles et de distribution.',
    icon: <FaIndustry />,
    features: [
      'Puissance de 50 kVA à 100 MVA',
      'Type sec ou immergé huile',
      'Classe d\'isolation jusqu\'à 36 kV',
      'Rendement optimisé'
    ],
    brands: ['ABB', 'Siemens', 'Schneider', 'Legrand', 'ASTOR'],
    gradient: 'from-orange-500 to-amber-600'
  },
  {
    id: 'postes-prefabriques',
    name: 'Postes Préfabriqués',
    description: 'Solutions compactes clé en main intégrant cellules MT, transformateur et tableau BT dans un seul ensemble.',
    icon: <FaPlug />,
    features: [
      'Installation rapide',
      'Compact et sécurisé',
      'Jusqu\'à 2500 kVA',
      'Conforme IEC 62271-202'
    ],
    brands: ['Schneider Biosco', 'ABB', 'Ormazabal', 'Siemens'],
    gradient: 'from-purple-500 to-violet-600'
  },
  {
    id: 'sectionneurs',
    name: 'Sectionneurs',
    description: 'Appareils de sectionnement et d\'isolement pour réseaux HT et MT. Sectionneurs d\'intérieur et d\'extérieur.',
    icon: <FaCog />,
    features: [
      'Sectionneurs rotatifs',
      'Sectionneurs à couteaux',
      'Commande manuelle ou motorisée',
      'Tension jusqu\'à 420 kV'
    ],
    brands: ['ABB', 'Siemens', 'GE', 'Schneider'],
    gradient: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'parafoudres',
    name: 'Parafoudres',
    description: 'Protection contre les surtensions atmosphériques et de manoeuvre. Parafoudres à oxyde de zinc (ZnO).',
    icon: <FaShieldAlt />,
    features: [
      'Technologie ZnO sans éclateur',
      'Classe de décharge jusqu\'à 20 kA',
      'Tension résiduelle optimisée',
      'Compteur de décharges'
    ],
    brands: ['ABB', 'Siemens', 'GE', 'ARTECHE', 'Schneider'],
    gradient: 'from-red-500 to-rose-600'
  },
  {
    id: 'tt-tc',
    name: 'TT / TC',
    description: 'Transformateurs de tension (TT) et de courant (TC) pour mesure et protection des réseaux électriques.',
    icon: <FaTachometerAlt />,
    features: [
      'Classe de précision 0.2 à 5P',
      'Type sec ou huile',
      'Pour mesure et protection',
      'Conforme IEC 61869'
    ],
    brands: ['ARTECHE', 'ABB', 'Siemens', 'Schneider', 'GE'],
    gradient: 'from-indigo-500 to-blue-600'
  },
  {
    id: 'variateurs',
    name: 'Variateurs de Vitesse',
    description: 'Variateurs de fréquence pour contrôle de moteurs AC. Solutions d\'efficacité énergétique industrielle.',
    icon: <FaMicrochip />,
    features: [
      'Puissance de 0.5 à 2000 kW',
      'Contrôle vectoriel',
      'Communication Modbus/Profibus',
      'Fonctions de sécurité intégrées'
    ],
    brands: ['Schneider Altivar', 'ABB ACS', 'Siemens Sinamics', 'Eaton'],
    gradient: 'from-pink-500 to-fuchsia-600'
  },
  {
    id: 'tableaux-bt',
    name: 'Tableaux de Puissance BT',
    description: 'Tableaux de distribution basse tension pour installations industrielles et tertiaires.',
    icon: <FaBolt />,
    features: [
      'Jusqu\'à 6300 A',
      'IP55 disponible',
      'Forme 4b type testé',
      'Jeux de barres cuivre'
    ],
    brands: ['Schneider Prisma', 'ABB MNS', 'Siemens Sivacon', 'Legrand XL3'],
    gradient: 'from-yellow-500 to-orange-500'
  }
];

function ProductsCatalogPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
            <Link to="/products-catalog" className="text-sm font-medium text-energy-green">
              Produits
            </Link>
            <Link to="/products-services" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
              Services
            </Link>
            <Link to="/partners" className="text-sm font-medium text-white/70 hover:text-energy-green transition-colors duration-200">
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
                <FaBolt /> Catalogue Produits
              </span>
            </div>
            <h1 className="font-display text-display font-bold mb-6">
              Nos <GradientText>Produits</GradientText>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Une gamme complète d'équipements électriques haute et moyenne tension, fournis par les leaders mondiaux de l'industrie
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard
                  className="p-6 h-full cursor-pointer group"
                  hover
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Image or Icon */}
                  <div className={`relative h-40 rounded-xl mb-4 overflow-hidden bg-gradient-to-br ${product.gradient} bg-opacity-20`}>
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-300">
                          {product.icon}
                        </div>
                      </div>
                    )}
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-20`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-bold mb-2 group-hover:text-energy-green transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Brands */}
                  <div className="flex flex-wrap gap-2">
                    {product.brands.slice(0, 3).map((brand, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/50"
                      >
                        {brand}
                      </span>
                    ))}
                    {product.brands.length > 3 && (
                      <span className="px-2 py-1 text-xs text-white/30">
                        +{product.brands.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View More */}
                  <div className="mt-4 text-energy-green text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir détails <span>→</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <GlassCard className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${selectedProduct.gradient} flex items-center justify-center text-3xl text-white`}>
                    {selectedProduct.icon}
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-white/60 text-sm">Équipement électrique</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-white/50 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              <p className="text-white/70 mb-6">
                {selectedProduct.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-bold mb-3 text-energy-green">Caractéristiques</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedProduct.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="text-energy-green">→</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h3 className="font-bold mb-3 text-cyber-blue">Marques disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.brands.map((brand, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-sm bg-white/5 border border-white/10 rounded-lg text-white/70 hover:border-energy-green/50 transition-colors"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Link to="/contact" className="flex-1">
                  <button className="w-full px-6 py-3 bg-energy-gradient rounded-lg font-bold text-deep-black hover:opacity-90 transition-opacity">
                    Demander un devis
                  </button>
                </Link>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 border border-white/20 rounded-lg font-bold hover:bg-white/5 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* CTA Section */}
      <section className="relative py-24 bg-graphite/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Besoin d'un <GradientText>Devis Personnalisé ?</GradientText>
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Nos experts vous accompagnent dans le choix des équipements adaptés à vos besoins
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-energy-gradient rounded-lg font-bold text-deep-black text-lg"
              >
                Contactez-Nous
              </motion.button>
            </Link>
            <Link to="/products-services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border-2 border-white/20 rounded-lg font-bold text-lg hover:bg-white/5 transition-colors"
              >
                Voir nos Services
              </motion.button>
            </Link>
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

export default ProductsCatalogPage;
