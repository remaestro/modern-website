import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Réseau Urbain Intelligent',
    location: 'Paris Métropole',
    capacity: '500 MW',
    status: 'En Service',
    image: 'Projet d\'infrastructure de réseau électrique urbain moderne'
  },
  {
    title: 'Centrale Solaire',
    location: 'Provence',
    capacity: '200 MW',
    status: 'En Construction',
    image: 'Installation solaire à grande échelle'
  },
  {
    title: 'Stockage Énergie',
    location: 'Lyon',
    capacity: '150 MWh',
    status: 'Planifié',
    image: 'Système de stockage d\'énergie par batteries'
  }
];

export default function Projects() {
  return (
    <section className="py-32 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-light text-gray-900 mb-4">
            Nos Projets
          </h2>
          <p className="text-xl text-gray-600">
            Transformant l'infrastructure énergétique
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 hover:border-energy-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-energy-green-100 card-hover">
                {/* Image placeholder with gradient */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 via-energy-green-50 to-gray-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-energy-green-400/20 to-transparent group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-sm text-gray-500 px-4 text-center">{project.image}</p>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full ${
                      project.status === 'En Service' ? 'bg-energy-green-500' :
                      project.status === 'En Construction' ? 'bg-amber-500' :
                      'bg-blue-500'
                    } group-hover:animate-pulse`} />
                    <span className="text-sm text-gray-500">{project.status}</span>
                  </div>

                  <h3 className="text-2xl font-light text-gray-900 mb-2 group-hover:text-energy-green-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">{project.location}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Capacité</span>
                    <span className="text-lg font-light text-energy-green-600 group-hover:scale-105 transition-transform duration-300">{project.capacity}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
