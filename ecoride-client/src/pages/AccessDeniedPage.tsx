import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AccessDeniedPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-600 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Accès refusé</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Vous n'avez pas les autorisations nécessaires pour accéder à cette page.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-eco-green-600 hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500"
          >
            Retour à l'accueil
          </Link>
          
          {user ? (
            <Link
              to="/mon-espace"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500"
            >
              Aller à mon espace
            </Link>
          ) : (
            <Link
              to="/connexion"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500"
            >
              Se connecter
            </Link>
          )}
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Si vous pensez qu'il s'agit d'une erreur, veuillez contacter notre support à{' '}
          <a href="mailto:support@ecoride.fr" className="font-medium text-eco-green-600 hover:text-eco-green-500">
            support@ecoride.fr
          </a>
        </p>
      </div>
    </div>
  );
};

export default AccessDeniedPage;