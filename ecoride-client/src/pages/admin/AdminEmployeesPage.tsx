import { useState } from 'react';
import type { EmployeeStatus, EmployeeFormData, AdminEmployee } from '../../types';

const mockEmployees: AdminEmployee[] = [
  {
    id: 1,
    username: 'thomas_employee',
    email: 'thomas@ecoride.fr',
    createdAt: '2023-01-15T10:00:00Z',
    status: 'ACTIVE'
  },
  {
    id: 2,
    username: 'julie_employee',
    email: 'julie@ecoride.fr',
    createdAt: '2023-02-20T14:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 3,
    username: 'marc_employee',
    email: 'marc@ecoride.fr',
    createdAt: '2023-03-10T09:15:00Z',
    status: 'SUSPENDED'
  }
];

const AdminEmployeesPage = () => {
  const [employees, setEmployees] = useState<AdminEmployee[]>(mockEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState<EmployeeFormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const openModal = () => {
    setEmployeeForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeForm({
      ...employeeForm,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Vérifier que les mots de passe correspondent
    if (employeeForm.password !== employeeForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }
    
    // Simuler une requête API
    setTimeout(() => {
      // Extraire les IDs pour éviter l'erreur avec l'opérateur spread
      const employeeIds = employees.map(e => e.id);
      const newId = employeeIds.length > 0 ? Math.max(...employeeIds) + 1 : 1;
      
      // Ajouter le nouvel employé
      const newEmployee: AdminEmployee = {
        id: newId,
        username: employeeForm.username,
        email: employeeForm.email,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE'
      };
      
      setEmployees([...employees, newEmployee]);
      setSuccess('L\'employé a été créé avec succès.');
      setLoading(false);
      closeModal();
    }, 1000);
  };
  
  const handleStatusChange = (employeeId: number, newStatus: EmployeeStatus) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut de l'employé
      setEmployees(employees.map(employee => 
        employee.id === employeeId 
          ? { ...employee, status: newStatus }
          : employee
      ));
      setSuccess(`Le statut de l'employé a été modifié avec succès.`);
      setLoading(false);
    }, 1000);
  };
  
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Gestion des employés</h2>
        <button
          onClick={openModal}
          className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
        >
          Créer un employé
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      {employees.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun employé</h3>
          <p className="text-gray-500 mb-4">Il n'y a aucun employé dans le système.</p>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
          >
            Créer un employé
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom d'utilisateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(employee.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {employee.status === 'ACTIVE' ? (
                      <button
                        onClick={() => handleStatusChange(employee.id, 'SUSPENDED')}
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        Suspendre
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(employee.id, 'ACTIVE')}
                        className="text-eco-green-600 hover:text-eco-green-900"
                        disabled={loading}
                      >
                        Réactiver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Modal de création d'employé */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Créer un nouvel employé</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={employeeForm.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={employeeForm.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={employeeForm.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={employeeForm.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                  required
                />
                {employeeForm.password !== employeeForm.confirmPassword && employeeForm.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">Les mots de passe ne correspondent pas.</p>
                )}
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                  disabled={loading || employeeForm.password !== employeeForm.confirmPassword}
                >
                  {loading ? 'Création...' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployeesPage;