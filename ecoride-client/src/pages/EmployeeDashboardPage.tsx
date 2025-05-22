import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

import EmployeeReviewsPage from './employee/EmployeeReviewsPage';
import EmployeeIssuesPage from './employee/EmployeeIssuesPage';

const EmployeeDashboardPage = () => {
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
          <h1 className="text-2xl font-bold text-gray-900">Espace Employé</h1>
          <p className="mt-1 text-sm text-gray-600">
            Bienvenue, {user?.username} ! Gérez les avis et les problèmes signalés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar de navigation */}
          <div className="md:col-span-1 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-1">
              <NavLink 
                to="/espace-employe/avis" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  Validation des avis
                </div>
              </NavLink>

              <NavLink 
                to="/espace-employe/problemes" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md ${isActive 
                    ? 'bg-eco-green-100 text-eco-green-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Problèmes signalés
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
              <Route path="/" element={<EmployeeReviewsPage />} />
              <Route path="/avis" element={<EmployeeReviewsPage />} />
              <Route path="/problemes" element={<EmployeeIssuesPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;