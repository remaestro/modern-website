export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-deep-black via-graphite/50 to-deep-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <img 
            src="/logo.png" 
            alt="Digita Energy" 
            className="h-12 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              ENTREPRISE
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Actualités
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Réseaux intelligents
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Énergie renouvelable
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Infrastructure
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              RESSOURCES
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 hover:text-energy-green transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">
              CONTACT
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:infos@digita-energy.com" className="text-white/60 text-sm hover:text-energy-green transition-colors">
                  infos@digita-energy.com
                </a>
              </li>
              <li>
                <a href="tel:+22507071881889" className="text-white/60 text-sm hover:text-energy-green transition-colors">
                  +225 07 07 18 81 89
                </a>
              </li>
              <li className="text-white/60 text-sm">
                Abidjan, Côte d'Ivoire
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-white/40">
            © 2025 Digita Energy. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/40 hover:text-energy-green transition-colors duration-200 text-sm">
              Confidentialité
            </a>
            <a href="#" className="text-white/40 hover:text-energy-green transition-colors duration-200 text-sm">
              Conditions
            </a>
            <a href="#" className="text-white/40 hover:text-energy-green transition-colors duration-200 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
