import { useState } from 'react';
import type { Issue } from '../../types';

const mockIssues: Issue[] = [
  {
    id: 1,
    rideId: 101,
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    departureDate: '2023-06-15',
    departureTime: '08:00',
    arrivalTime: '11:30',
    driver: {
      id: 201,
      username: 'Martin',
      email: 'martin@example.com',
      credits: 50,
      isDriver: true,
      isPassenger: false,
      role: 'USER',
      phone: '+33612345678'
    },
    passenger: {
      id: 301,
      username: 'Sophie',
      email: 'sophie@example.com',
      credits: 30,
      isDriver: false,
      isPassenger: true,
      role: 'USER',
      phone: '+33687654321'
    },
    description: 'Le conducteur n\'est jamais venu au point de rendez-vous. J\'ai attendu 30 minutes puis j\'ai dû trouver une autre solution.',
    status: 'OPEN',
    createdAt: '2023-06-15T12:30:00Z'
  },
];

const EmployeeIssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [resolutionNote, setResolutionNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const openDetailsModal = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsDetailsModalOpen(true);
  };
  
  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedIssue(null);
  };
  
  const openResolutionModal = (issue: Issue) => {
    setSelectedIssue(issue);
    setResolutionNote('');
    setIsResolutionModalOpen(true);
  };
  
  const closeResolutionModal = () => {
    setIsResolutionModalOpen(false);
    setResolutionNote('');
  };
  
  const handleResolveIssue = () => {
    if (!selectedIssue) return;
    
    if (!resolutionNote.trim()) {
      setError('Veuillez saisir une note de résolution.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut du problème
      setIssues(issues.filter(issue => issue.id !== selectedIssue.id));
      setSuccess(`Le problème #${selectedIssue.id} a été résolu avec succès.`);
      setLoading(false);
      closeResolutionModal();
    }, 1000);
  };
  
  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Problèmes signalés</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          {issues.length} problèmes à traiter
        </span>
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
      
      {issues.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tous les problèmes ont été résolus</h3>
          <p className="text-gray-500">Il n'y a aucun problème en attente de traitement.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {issues.map(issue => (
            <div key={issue.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Ouvert
                    </span>
                    <p className="mt-2 text-sm text-gray-500">
                      Problème #{issue.id} • Signalé le {formatDate(issue.createdAt)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Trajet concerné</h3>
                  <p className="text-gray-700">
                    {issue.departureCity} → {issue.arrivalCity} • {new Date(issue.departureDate).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Départ : {issue.departureTime} • Arrivée prévue : {issue.arrivalTime}
                  </p>
                </div>
                
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900">Description du problème</h3>
                  <p className="mt-1 text-gray-700">"{issue.description.length > 150 ? issue.description.substring(0, 150) + '...' : issue.description}"</p>
                </div>
                
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => openDetailsModal(issue)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                  >
                    Voir détails
                  </button>
                  <button
                    onClick={() => openResolutionModal(issue)}
                    className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                  >
                    Résoudre
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal de détails */}
      {isDetailsModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Détails du problème #{selectedIssue.id}</h2>
              <button
                onClick={closeDetailsModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Conducteur</h3>
                  <p className="text-gray-900">{selectedIssue.driver.username}</p>
                  <p className="text-sm text-gray-700">Email : {selectedIssue.driver.email}</p>
                  <p className="text-sm text-gray-700">Téléphone : {selectedIssue.driver.phone}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Passager</h3>
                  <p className="text-gray-900">{selectedIssue.passenger.username}</p>
                  <p className="text-sm text-gray-700">Email : {selectedIssue.passenger.email}</p>
                  <p className="text-sm text-gray-700">Téléphone : {selectedIssue.passenger.phone}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Trajet</h3>
                <p className="text-gray-900">
                  {selectedIssue.departureCity} → {selectedIssue.arrivalCity}
                </p>
                <p className="text-sm text-gray-700">
                  Date : {new Date(selectedIssue.departureDate).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-sm text-gray-700">
                  Départ : {selectedIssue.departureTime} • Arrivée prévue : {selectedIssue.arrivalTime}
                </p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Description du problème</h3>
                <p className="text-gray-700">"{selectedIssue.description}"</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  closeDetailsModal();
                  openResolutionModal(selectedIssue);
                }}
                className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
              >
                Résoudre ce problème
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de résolution */}
      {isResolutionModalOpen && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-bold">Résoudre le problème #{selectedIssue.id}</h2>
              <button
                onClick={closeResolutionModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700">
                Trajet : {selectedIssue.departureCity} → {selectedIssue.arrivalCity} ({new Date(selectedIssue.departureDate).toLocaleDateString('fr-FR')})
              </p>
            </div>
            
            <div className="mb-4">
              <label htmlFor="resolutionNote" className="block text-sm font-medium text-gray-700 mb-1">
                Note de résolution
              </label>
              <textarea
                id="resolutionNote"
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
                placeholder="Décrivez comment vous avez résolu ce problème..."
                required
              ></textarea>
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeResolutionModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                onClick={handleResolveIssue}
                className={`px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Résolution...' : 'Marquer comme résolu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeIssuesPage;