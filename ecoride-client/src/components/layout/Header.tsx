import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-eco-green-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              {/* <img className="h-10 w-auto" src={Logo} alt="EcoRide Logo" /> */}
              <span className="ml-2 text-xl font-bold">EcoRide</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md hover:bg-eco-green-600 transition">
              Accueil
            </Link>
            <Link to="/covoiturages" className="px-3 py-2 rounded-md hover:bg-eco-green-600 transition">
              Covoiturages
            </Link>
            <Link to="/connexion" className="px-3 py-2 rounded-md hover:bg-eco-green-600 transition">
              Connexion
            </Link>
            <Link to="/contact" className="px-3 py-2 rounded-md hover:bg-eco-green-600 transition">
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-eco-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-eco-green-500">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md hover:bg-eco-green-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/covoiturages"
              className="block px-3 py-2 rounded-md hover:bg-eco-green-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Covoiturages
            </Link>
            <Link
              to="/connexion"
              className="block px-3 py-2 rounded-md hover:bg-eco-green-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md hover:bg-eco-green-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;