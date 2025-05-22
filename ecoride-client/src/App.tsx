import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import RidesPage from './pages/RidesPage';
import RideDetailPage from './pages/RideDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboardPage from './pages/UserDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useEffect } from 'react';
import './index.css'

function App() {
  useEffect(() => {
    document.body.classList.add('page-loaded');
    return () => {
      document.body.classList.remove('page-loaded');
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-b bg-green-50 from-green-50 to-white transition-all duration-300">
          <div className="eco-pattern-overlay"></div>
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6 min-h-[80vh]">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/covoiturages" element={<RidesPage />} />
                <Route path="/covoiturages/:id" element={<RideDetailPage />} />
                <Route path="/inscription" element={<RegisterPage />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentions-legales" element={<LegalPage />} />
                <Route path="/acces-refuse" element={<AccessDeniedPage />} />
               
                {/* Routes protégées par authentification */}
                <Route
                  path="/mon-espace/*"
                  element={
                    <ProtectedRoute>
                      <UserDashboardPage />
                    </ProtectedRoute>
                  }
                />
               
                {/* Routes protégées par rôle EMPLOYEE */}
                <Route
                  path="/espace-employe/*"
                  element={
                    <ProtectedRoute requiredRole="EMPLOYEE">
                      <EmployeeDashboardPage />
                    </ProtectedRoute>
                  }
                />
               
                {/* Routes protégées par rôle ADMIN */}
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute requiredRole="ADMIN">
                      <AdminDashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;