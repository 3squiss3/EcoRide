import { useState } from 'react';
import type { AdminUser } from '../../types';

const mockUsers: AdminUser[] = [
  {
    id: 1,
    username: 'martin',
    email: 'martin@example.com',
    credits: 45,
    isDriver: true,
    isPassenger: true,
    createdAt: '2023-01-10T08:30:00Z',
    status: 'ACTIVE'
  },
  {
    id: 2,
    username: 'sophie',
    email: 'sophie@example.com',
    credits: 32,
    isDriver: false,
    isPassenger: true,
    createdAt: '2023-02-15T14:20:00Z',
    status: 'ACTIVE'
  },
  {
    id: 3,
    username: 'lucas',
    email: 'lucas@example.com',
    credits: 18,
    isDriver: true,
    isPassenger: true,
    createdAt: '2023-03-05T11:45:00Z',
    status: 'SUSPENDED'
  }
];

type FilterOption = 'all' | 'active' | 'suspended' | 'drivers' | 'passengers';

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [suspensionDuration, setSuspensionDuration] = useState('7');
  const [suspensionReason, setSuspensionReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Filtrer les utilisateurs en fonction des critères
  const filteredUsers = users.filter(user => {
    // Filtrer par terme de recherche
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtrer par statut
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && user.status === 'ACTIVE') ||
      (filter === 'suspended' && user.status === 'SUSPENDED') ||
      (filter === 'drivers' && user.isDriver) ||
      (filter === 'passengers' && user.isPassenger);
    
    return matchesSearch && matchesFilter;
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as FilterOption);
  };
  
  const openSuspendModal = (user: AdminUser) => {
    setSelectedUser(user);
    setSuspensionDuration('7');
    setSuspensionReason('');
    setIsSuspendModalOpen(true);
  };
  
  const closeSuspendModal = () => {
    setIsSuspendModalOpen(false);
    setSelectedUser(null);
  };
  
  const handleSuspend = () => {
    if (!selectedUser) return;
    
    if (!suspensionReason.trim()) {
      setError('Veuillez saisir une raison de suspension.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Calculer la date de fin de suspension
    const suspensionEnd = new Date();
    suspensionEnd.setDate(suspensionEnd.getDate() + parseInt(suspensionDuration));
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut de l'utilisateur
      setUsers(users.map(u => 
        u.id === selectedUser.id 
          ? { ...u, status: 'SUSPENDED', suspendedUntil: suspensionEnd.toISOString() }
          : u
      ));
      setSuccess(`L'utilisateur ${selectedUser.username} a été suspendu jusqu'au ${suspensionEnd.toLocaleDateString('fr-FR')}.`);
      setLoading(false);
      closeSuspendModal();
    }, 1000);
  };
  
  const handleReactivate = (userId: number) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut de l'utilisateur
      setUsers(users.map(u => 
        u.id === userId 
          ? { ...u, status: 'ACTIVE', suspendedUntil: null }
          : u
      ));
      setSuccess(`L'utilisateur a été réactivé avec succès.`);
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
        <h2 className="text-xl font-semibold text-gray-900">Gestion des utilisateurs</h2>
        
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
          />
          <select
            value={filter}
            onChange={handleFilterChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="suspended">Suspendus</option>
            <option value="drivers">Conducteurs</option>
            <option value="passengers">Passagers</option>
          </select>
        </div>
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
      
      {filteredUsers.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
          <p className="text-gray-500">Aucun utilisateur ne correspond à vos critères de recherche.</p>
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
                  Utilisateur
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crédits
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inscription
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
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      {user.isDriver && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Conducteur
                        </span>
                      )}
                      {user.isPassenger && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Passager
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'ACTIVE' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'ACTIVE' ? 'Actif' : 'Suspendu'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {user.status === 'ACTIVE' ? (
                      <button
                        onClick={() => openSuspendModal(user)}
                        className="text-red-600 hover:text-red-900"
                        disabled={loading}
                      >
                        Suspendre
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReactivate(user.id)}
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
      
      {/* Modal de suspension */}
      {isSuspendModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Suspendre l'utilisateur {selectedUser.username}</h2>
              <button
                onClick={closeSuspendModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">
                Vous êtes sur le point de suspendre l'utilisateur {selectedUser.username} ({selectedUser.email}).
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="suspensionDuration" className="block text-sm font-medium text-gray-700 mb-1">
                Durée de la suspension
              </label>
              <select
                id="suspensionDuration"
                value={suspensionDuration}
                onChange={(e) => setSuspensionDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
              >
                <option value="1">1 jour</option>
                <option value="3">3 jours</option>
                <option value="7">7 jours</option>
                <option value="14">14 jours</option>
                <option value="30">30 jours</option>
                <option value="90">90 jours</option>
                <option value="365">1 an</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="suspensionReason" className="block text-sm font-medium text-gray-700 mb-1">
                Raison de la suspension
              </label>
              <textarea
                id="suspensionReason"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                placeholder="Expliquez la raison de la suspension..."
                required
              ></textarea>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeSuspendModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                onClick={handleSuspend}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Suspension...' : 'Suspendre'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;