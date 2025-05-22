import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-eco-green-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">EcoRide</h3>
            <p className="text-eco-green-100">Covoiturage écologique pour tous</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-eco-green-100">Email: contact@ecoride.fr</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-2">Liens utiles</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/mentions-legales" className="text-eco-green-100 hover:text-white transition">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-eco-green-100 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-eco-green-700 pt-4 text-center">
          <p className="text-sm text-eco-green-200">
            &copy; {new Date().getFullYear()} EcoRide. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;