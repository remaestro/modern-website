function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Clean & Minimal */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-digita-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-2xl font-semibold tracking-tight text-digita-dark">
            DIGITA <span className="text-digita-green">ENERGY</span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <a href="#about" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors">
              À propos
            </a>
            <a href="#services" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors">
              Services
            </a>
            <a href="#values" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors">
              Valeurs
            </a>
            <a href="#contact" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors">
              Contact
            </a>
            <button className="bg-digita-green hover:bg-digita-green-700 text-white px-6 py-2.5 rounded-md text-sm font-medium transition-all">
              Nous contacter
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white to-digita-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-digita-dark mb-6">
                Acteur de la <span className="text-digita-green">Transition Énergétique</span> et <span className="text-digita-green">Numérique</span>
              </h1>
              <p className="text-xl text-digita-gray-600 mb-8">
                Dans un monde en évolution permanente, Digita Energy se positionne comme un acteur principal de développement de nouveaux modèles pour concrétiser deux axes majeurs de la société.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button className="bg-digita-green hover:bg-digita-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
                  Découvrir nos services
                </button>
                <button className="bg-white hover:bg-digita-gray-100 text-digita-green px-8 py-4 rounded-lg text-lg font-semibold transition border-2 border-digita-green">
                  Nous contacter
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-digita-green/10 rounded-3xl p-8 border-4 border-digita-green/20">
                <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800" alt="Energy" className="rounded-2xl shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-digita-dark mb-4">
              Qui sommes-nous ?
            </h2>
            <div className="w-24 h-1 bg-digita-green mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-digita-green text-white p-2 rounded-full mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-digita-dark mb-2">Acteur de la transition énergétique</h3>
                    <p className="text-digita-gray-600">Solutions performantes et innovantes pour l'énergie de demain</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-digita-green text-white p-2 rounded-full mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-digita-dark mb-2">Acteur de la transformation numérique</h3>
                    <p className="text-digita-gray-600">Accélération du déploiement des nouvelles technologies</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-digita-gray-600 mb-4">
                Partout dans le monde, tout devient interconnecté et nos modes de vie sont en pleine mutations : Connexions, performance, efficience énergétique, Big data, cloud, Intelligence artificielle, Blockchain...
              </p>
              <p className="text-digita-gray-600 mb-4">
                Nous développons des solutions performantes et innovantes en nous appuyant notamment sur notre expertise sur ces deux cœurs de métiers indispensables pour la société d'aujourd'hui et de demain.
              </p>
              <p className="text-xl font-bold text-digita-green">
                Ensemble Nous Construisons Le Futur!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-digita-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-digita-dark mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-digita-gray-600">Une entreprise qui bâtit et développe</p>
            <div className="w-24 h-1 bg-digita-green mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Énergie", 
                icon: "⚡",
                desc: "Solutions SmartGrid, infrastructure électrique, et building solutions pour un avenir énergétique durable",
                items: ["Intégrateur SmartGrid", "Infrastructure", "Building Solution"]
              },
              { 
                title: "Numérique", 
                icon: "💻",
                desc: "Transformation digitale, développement web & logiciel, et gouvernance SI",
                items: ["Transformation numérique", "Développement web", "Audit & Conseil"]
              },
              { 
                title: "Communication Digitale", 
                icon: "📱",
                desc: "Web marketing, production vidéo, conception graphique et community management",
                items: ["Web Marketing", "Production Vidéo", "Community Management"]
              }
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition transform hover:-translate-y-2">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-digita-dark mb-4">{service.title}</h3>
                <p className="text-digita-gray-600 mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-digita-gray-600">
                      <span className="text-digita-green">•</span> {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-6 text-digita-green hover:text-digita-green-700 font-semibold flex items-center gap-2">
                  En savoir plus 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-digita-dark mb-4">
              Nos Valeurs
            </h2>
            <div className="w-24 h-1 bg-digita-green mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Diversité & Inclusion", 
                desc: "Nous croyons en l'égalité des chances pour tous, de partout dans le monde. Nous accueillons des profils de tous horizons."
              },
              { 
                title: "Audace", 
                desc: "Nous faisons le choix de ne pas capituler dans notre vision de changer l'Afrique et de contribuer à son développement."
              },
              { 
                title: "Excellence", 
                desc: "L'excellence est ce que nous incarnons. Bien n'est jamais suffisant, et c'est pourquoi nous challengeons sans cesse le statu quo."
              }
            ].map((value, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-digita-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-white">★</span>
                </div>
                <h3 className="text-2xl font-bold text-digita-dark mb-4">{value.title}</h3>
                <p className="text-digita-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-digita-green">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contactez-nous aujourd'hui pour discuter de vos projets énergétiques et numériques
          </p>
          <button className="bg-white hover:bg-digita-gray-100 text-digita-green px-10 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105">
            Demander un devis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-digita-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-digita-green mb-4">DIGITA ENERGY</h3>
              <p className="text-digita-gray-400">Ensemble Nous Construisons Le Futur!</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-digita-gray-400">
                <li><a href="#" className="hover:text-digita-green transition">Énergie</a></li>
                <li><a href="#" className="hover:text-digita-green transition">Numérique</a></li>
                <li><a href="#" className="hover:text-digita-green transition">Communication</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Entreprise</h4>
              <ul className="space-y-2 text-digita-gray-400">
                <li><a href="#" className="hover:text-digita-green transition">À propos</a></li>
                <li><a href="#" className="hover:text-digita-green transition">Valeurs</a></li>
                <li><a href="#" className="hover:text-digita-green transition">Carrières</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-digita-gray-400">
                <li>contact@digita-energy.com</li>
                <li>+225 XX XX XX XX XX</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-digita-gray-600 pt-8 text-center text-digita-gray-400">
            <p>&copy; 2025 Digita Energy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
