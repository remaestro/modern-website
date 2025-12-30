import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Infrastructure Intelligente',
    description: 'Réseau électrique optimisé par IA pour une efficacité maximale'
  },
  {
    icon: Shield,
    title: 'Fiabilité Totale',
    description: 'Systèmes redondants garantissant une disponibilité 99.99%'
  },
  {
    icon: TrendingUp,
    title: 'Évolutivité',
    description: 'Architecture flexible qui grandit avec vos besoins'
  }
];

export default function Features() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-4">
            Technologie de Pointe
          </h2>
          <p className="text-xl text-gray-600">
            L'avenir de l'énergie, aujourd'hui
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-12 bg-white rounded-3xl border border-gray-200 hover:border-energy-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-energy-green-100 card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-energy-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-12 h-12 mb-8 rounded-xl bg-gradient-to-br from-energy-green-400 to-energy-green-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-energy-green-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
