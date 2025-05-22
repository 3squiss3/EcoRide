import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Récupérer le message de succès de la création de compte (si applicable)
  const message = location.state?.message || '';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(credentials.email, credentials.password);
      navigate('/mon-espace');
    } catch (err) {
      if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('Une erreur est survenue lors de la connexion');
        }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
        <p className="mt-2 text-gray-600">
          Accédez à votre espace personnel EcoRide
        </p>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          {message}
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="label">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={credentials.email}
              onChange={handleChange}
              className="input"
              placeholder="votre@email.com"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="label">
                Mot de passe
              </label>
              <Link
                to="/mot-de-passe-oublie"
                className="text-sm text-eco-green-600 hover:text-eco-green-500"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={credentials.password}
              onChange={handleChange}
              className="input"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Vous n'avez pas de compte ?{' '}
            <Link to="/inscription" className="text-eco-green-600 hover:text-eco-green-800 font-medium">
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;