import { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Composants de sous-pages à importer
import UserProfilePage from './dashboard/UserProfilePage';
import UserVehiclesPage from './dashboard/UserVehiclesPage';
import UserPreferencesPage from './dashboard/UserPreferencesPage';
import UserRidesHistoryPage from './dashboard/UserRidesHistoryPage';
import CreateRidePage from './dashboard/CreateRidePage';

const UserDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Déterminer l'onglet actif en fonction de l'URL
    const path = location.pathname.split('/').pop();
    if (path && path !== 'mon-espace') {
      setActiveTab(path);
    } else {
      setActiveTab('profile');
    }
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-eco-green-50 border-b border-eco-green-100">
          <h1 className="text-2xl font-bold text-gray-900">Mon espace</h1>
          <p className="mt-1 text-sm text-gray-600">
            Bienvenue, {user?.username} ! Gérez votre profil et vos covoiturages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-1">
              <NavLink 
                to="/mon-espace/profile" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Mon profil
                </div>
              </NavLink>

              {(user?.isDriver || user?.isPassenger) && (
                <NavLink 
                  to="/mon-espace/preferences" 
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${isActive 
                      ? 'bg-eco-green-100 text-eco-green-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Mes préférences
                  </div>
                </NavLink>
              )}

              {user?.isDriver && (
                <NavLink 
                  to="/mon-espace/vehicles" 
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${isActive 
                      ? 'bg-eco-green-100 text-eco-green-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Mes véhicules
                  </div>
                </NavLink>
              )}

              {user?.isDriver && (
                <NavLink 
                  to="/mon-espace/create-ride" 
                  className={({ isActive }) => 
                    `block px-3 py-2 rounded-md ${isActive 
                      ? 'bg-eco-green-100 text-eco-green-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Proposer un trajet
                  </div>
                </NavLink>
              )}

              <NavLink 
                to="/mon-espace/rides-history" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Historique des trajets
                </div>
              </NavLink>

              <button 
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </div>
              </button>
            </nav>

            <div className="mt-6 p-3 bg-eco-green-50 rounded-md">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-eco-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2 text-sm font-medium text-eco-green-800">Mes crédits: {user?.credits || 0}</span>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-3 p-4">
            <Routes>
              <Route path="/" element={<UserProfilePage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/vehicles" element={<UserVehiclesPage />} />
              <Route path="/preferences" element={<UserPreferencesPage />} />
              <Route path="/create-ride" element={<CreateRidePage />} />
              <Route path="/rides-history" element={<UserRidesHistoryPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;