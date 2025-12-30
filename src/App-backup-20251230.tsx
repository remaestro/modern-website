function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Ultra Clean */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-digita-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">
          <div className="text-xl font-semibold tracking-tight text-digita-dark">
            DIGITA <span className="text-digita-green font-bold">ENERGY</span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <a href="#about" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors duration-200">
              À propos
            </a>
            <a href="#services" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors duration-200">
              Services
            </a>
            <a href="#values" className="text-sm font-medium text-digita-gray-600 hover:text-digita-green transition-colors duration-200">
              Valeurs
            </a>
            <button className="bg-digita-green hover:bg-digita-green-700 text-white px-7 py-2.5 rounded-md text-sm font-medium transition-all duration-200">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/modern-website/assets/hero-video-2.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-digita-dark/80 via-digita-dark/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Acteur de la Transition
              <span className="block text-digita-green mt-2">Énergétique & Numérique</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-10 leading-relaxed font-light">
              Dans un monde en évolution permanente, nous développons des solutions performantes pour l'énergie et le numérique de demain.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-digita-green hover:bg-digita-green-700 text-white px-10 py-4 rounded-md text-base font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                Découvrir nos services
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-10 py-4 rounded-md text-base font-medium transition-all duration-200 border border-white/30">
                En savoir plus
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/70">
            <span className="text-xs font-medium">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Clean Layout */}
      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <img 
                  src="/modern-website/assets/team-collaboration.jpg" 
                  alt="Équipe Digita Energy"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Accent Element */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-digita-green/10 rounded-lg -z-10"></div>
            </div>

            {/* Right: Content */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-digita-green/10 text-digita-green text-sm font-medium rounded-full mb-6">
                Qui sommes-nous ?
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-digita-dark mb-6 leading-tight">
                Une entreprise qui bâtit et développe
              </h2>
              <div className="space-y-4 text-digita-gray-600 text-lg leading-relaxed">
                <p>
                  Digita Energy se positionne comme un acteur principal de développement de nouveaux modèles pour concrétiser deux axes majeurs : <strong className="text-digita-dark">la transition énergétique et la transformation numérique.</strong>
                </p>
                <p>
                  Nous développons des solutions performantes et innovantes en nous appuyant sur notre expertise de ces deux cœurs de métiers indispensables pour la société d'aujourd'hui et de demain.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-digita-green/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-digita-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-digita-dark font-medium">Transition énergétique</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-digita-green/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-digita-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-digita-dark font-medium">Transformation numérique</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Image-Heavy */}
      <section id="services" className="py-24 lg:py-32 bg-digita-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-white text-digita-green text-sm font-medium rounded-full mb-6">
              Nos services
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-digita-dark mb-4">
              Expertise & Solutions
            </h2>
            <p className="text-xl text-digita-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour répondre à vos enjeux énergétiques et numériques
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Énergie */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/modern-website/assets/hero-energy-infrastructure.jpg" 
                  alt="Infrastructure Énergétique"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-digita-dark/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">Énergie</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-digita-gray-600 mb-4 leading-relaxed">
                  Solutions SmartGrid, infrastructure électrique, et building solutions pour un avenir énergétique durable.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Intégrateur SmartGrid
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Infrastructure électrique
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Building Solutions
                  </li>
                </ul>
                <button className="text-digita-green hover:text-digita-green-700 font-medium text-sm flex items-center gap-2 group">
                  En savoir plus
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Service 2: Numérique */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/modern-website/assets/data-center-servers.jpg" 
                  alt="Infrastructure Numérique"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-digita-dark/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">Numérique</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-digita-gray-600 mb-4 leading-relaxed">
                  Transformation digitale, développement web & logiciel, et gouvernance SI pour votre entreprise.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Transformation numérique
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Développement web & logiciel
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Audit & Conseil
                  </li>
                </ul>
                <button className="text-digita-green hover:text-digita-green-700 font-medium text-sm flex items-center gap-2 group">
                  En savoir plus
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Service 3: Communication */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src="/modern-website/assets/control-room-monitoring.jpg" 
                  alt="Communication Digitale"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-digita-dark/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">Communication</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-digita-gray-600 mb-4 leading-relaxed">
                  Web marketing, production vidéo, conception graphique et community management pour votre marque.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Web Marketing
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Production Vidéo
                  </li>
                  <li className="flex items-center gap-2 text-sm text-digita-gray-600">
                    <span className="w-1.5 h-1.5 bg-digita-green rounded-full"></span>
                    Community Management
                  </li>
                </ul>
                <button className="text-digita-green hover:text-digita-green-700 font-medium text-sm flex items-center gap-2 group">
                  En savoir plus
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section - Infrastructure Showcase */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/modern-website/assets/infrastructure-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-digita-dark/40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Ensemble, Nous Construisons Le Futur
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Des infrastructures modernes pour une Afrique connectée et énergétiquement autonome
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-digita-green/10 text-digita-green text-sm font-medium rounded-full mb-6">
              Nos valeurs
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-digita-dark mb-4">
              Ce qui nous guide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-digita-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-digita-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-digita-dark mb-3">Diversité & Inclusion</h3>
              <p className="text-digita-gray-600 leading-relaxed">
                Nous croyons en l'égalité des chances pour tous, de partout dans le monde.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-digita-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-digita-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-digita-dark mb-3">Audace</h3>
              <p className="text-digita-gray-600 leading-relaxed">
                Nous ne craignons pas de miser sur des projets ambitieux pour changer l'Afrique.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-digita-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-digita-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-digita-dark mb-3">Excellence</h3>
              <p className="text-digita-gray-600 leading-relaxed">
                Nous challengeons sans cesse le statu quo pour l'excellence de nos solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-digita-green">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Contactez-nous pour discuter de vos projets énergétiques et numériques
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white hover:bg-digita-gray-100 text-digita-green px-10 py-4 rounded-md text-base font-medium transition-all duration-200">
              Demander un devis
            </button>
            <button className="bg-digita-green-700 hover:bg-digita-green-800 text-white px-10 py-4 rounded-md text-base font-medium transition-all duration-200 border-2 border-white/20">
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-digita-dark py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-xl font-semibold text-white mb-4">
                DIGITA <span className="text-digita-green">ENERGY</span>
              </div>
              <p className="text-digita-gray-400 text-sm leading-relaxed">
                Ensemble, Nous Construisons Le Futur!
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">Énergie</a></li>
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">Numérique</a></li>
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">Communication</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Entreprise</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">À propos</a></li>
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">Nos valeurs</a></li>
                <li><a href="#" className="text-digita-gray-400 hover:text-digita-green text-sm transition-colors">Carrières</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-digita-gray-400">contact@digita-energy.com</li>
                <li className="text-digita-gray-400">+225 XX XX XX XX XX</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-digita-gray-600 pt-8">
            <p className="text-center text-digita-gray-400 text-sm">
              &copy; 2025 Digita Energy. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
