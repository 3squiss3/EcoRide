import api from './api.service';

export interface EmployeeData {
  username: string;
  email: string;
  password: string;
}

export interface SuspensionData {
  userId: number | string;
  duration: number; // Nombre de jours
  reason: string;
}

// Obtenir les statistiques
export const getStats = async () => {
  return api.get('/admin/stats');
};

// Obtenir la liste des employés
export const getEmployees = async () => {
  return api.get('/admin/employees');
};

// Créer un nouvel employé
export const createEmployee = async (data: EmployeeData) => {
  return api.post('/admin/employees', data);
};

// Suspendre/réactiver un employé
export const toggleEmployeeStatus = async (employeeId: number | string, status: 'ACTIVE' | 'SUSPENDED') => {
  return api.patch(`/admin/employees/${employeeId}/status`, { status });
};

// Obtenir la liste des utilisateurs
export const getUsers = async () => {
  return api.get('/admin/users');
};

// Suspendre un utilisateur
export const suspendUser = async (data: SuspensionData) => {
  return api.post('/admin/users/suspend', data);
};

// Réactiver un utilisateur
export const reactivateUser = async (userId: number | string) => {
  return api.patch(`/admin/users/${userId}/reactivate`);
};