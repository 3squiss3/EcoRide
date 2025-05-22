import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string | null;
}

const ProtectedRoute = ({ children, requiredRole = null }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-500"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/connexion" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/acces-refuse" />;
  }

  return children;
};

export default ProtectedRoute;