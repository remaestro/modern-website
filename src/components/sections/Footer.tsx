export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              ENTREPRISE
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Carrières
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Actualités
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              SOLUTIONS
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Réseaux intelligents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Énergie renouvelable
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Infrastructure
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              RESSOURCES
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-energy-green-600 transition-all duration-200 text-sm hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide">
              CONTACT
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-600 text-sm">
                contact@digitaenergy.com
              </li>
              <li className="text-gray-600 text-sm">
                +33 1 23 45 67 89
              </li>
              <li className="text-gray-600 text-sm">
                Paris, France
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © 2025 Digita Energy. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-energy-green-600 transition-colors duration-200 text-sm">
              Confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-energy-green-600 transition-colors duration-200 text-sm">
              Conditions
            </a>
            <a href="#" className="text-gray-500 hover:text-energy-green-600 transition-colors duration-200 text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
