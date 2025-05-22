import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import AdminEmployeesPage from './admin/AdminEmployeesPage';
import AdminUsersPage from './admin/AdminUsersPage';
import AdminStatsPage from './admin/AdminStatsPage';

const AdminDashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-eco-green-50 border-b border-eco-green-100">
          <h1 className="text-2xl font-bold text-gray-900">Espace Administrateur</h1>
          <p className="mt-1 text-sm text-gray-600">
            Bienvenue, {user?.username} ! Gérez les employés, utilisateurs et consultez les statistiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-1">
              <NavLink 
                to="/admin/employes" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Gestion des employés
                </div>
              </NavLink>

              <NavLink 
                to="/admin/utilisateurs" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Gestion des utilisateurs
                </div>
              </NavLink>

              <NavLink 
                to="/admin/statistiques" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Statistiques
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
          </div>

          {/* Contenu principal */}
          <div className="md:col-span-3 p-4">
            <Routes>
              <Route path="/" element={<AdminStatsPage />} />
              <Route path="/employes" element={<AdminEmployeesPage />} />
              <Route path="/utilisateurs" element={<AdminUsersPage />} />
              <Route path="/statistiques" element={<AdminStatsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;