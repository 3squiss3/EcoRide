import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Données fictives pour simulation
const mockRides = [
  {
    id: 1,
    type: 'driver',
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    departureDate: '2023-06-15',
    departureTime: '08:00',
    arrivalTime: '11:30',
    status: 'COMPLETED',
    price: 25,
    passengersCount: 3,
    vehicle: {
      brand: 'Renault',
      model: 'Zoé'
    },
    passengers: [
      { id: 101, username: 'Sophie', photo: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: 102, username: 'Lucas', photo: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 103, username: 'Emma', photo: 'https://randomuser.me/api/portraits/women/2.jpg' }
    ]
  },
  {
    id: 2,
    type: 'passenger',
    departureCity: 'Lyon',
    arrivalCity: 'Marseille',
    departureDate: '2023-06-20',
    departureTime: '14:00',
    arrivalTime: '17:00',
    status: 'CONFIRMED',
    price: 18,
    driver: {
      id: 201,
      username: 'Thomas',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      vehicle: {
        brand: 'Peugeot',
        model: '308'
      }
    }
  },
  {
    id: 3,
    type: 'driver',
    departureCity: 'Nantes',
    arrivalCity: 'Rennes',
    departureDate: '2023-06-25',
    departureTime: '09:00',
    arrivalTime: '10:30',
    status: 'PENDING',
    price: 12,
    passengersCount: 0,
    vehicle: {
      brand: 'Peugeot',
      model: '308'
    },
    passengers: []
  }
];

const UserRidesHistoryPage = () => {
  const { user } = useAuth();
  const [rides, setRides] = useState(mockRides);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [rideToCancel, setRideToCancel] = useState(null);
  
  const filteredRides = rides.filter(ride => {
    if (filter === 'all') return true;
    if (filter === 'driver') return ride.type === 'driver';
    if (filter === 'passenger') return ride.type === 'passenger';
    if (filter === 'upcoming') return ['PENDING', 'CONFIRMED'].includes(ride.status);
    if (filter === 'completed') return ride.status === 'COMPLETED';
    return true;
  });
  
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  const handleCancelRide = (ride) => {
    setRideToCancel(ride);
    setShowCancelModal(true);
  };
  
  const confirmCancelRide = () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut du covoiturage
      setRides(rides.map(r => r.id === rideToCancel.id ? { ...r, status: 'CANCELLED' } : r));
      setSuccess('Le covoiturage a été annulé avec succès.');
      setShowCancelModal(false);
      setRideToCancel(null);
      setLoading(false);
    }, 1000);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'EEEE d MMMM yyyy', { locale: fr });
  };
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'PENDING': return { text: 'En attente', color: 'bg-yellow-100 text-yellow-800' };
      case 'CONFIRMED': return { text: 'Confirmé', color: 'bg-blue-100 text-blue-800' };
      case 'COMPLETED': return { text: 'Terminé', color: 'bg-green-100 text-green-800' };
      case 'CANCELLED': return { text: 'Annulé', color: 'bg-red-100 text-red-800' };
      default: return { text: 'Inconnu', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Historique des covoiturages</h2>
        
        <div>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="input w-auto"
          >
            <option value="all">Tous les covoiturages</option>
            <option value="driver">En tant que conducteur</option>
            <option value="passenger">En tant que passager</option>
            <option value="upcoming">À venir</option>
            <option value="completed">Terminés</option>
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
      
      {filteredRides.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun covoiturage</h3>
          <p className="text-gray-500">Vous n'avez pas encore de covoiturage à afficher.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRides.map(ride => {
            const status = getStatusLabel(ride.status);
            
            return (
              <div key={ride.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.text}
                        </span>
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {ride.type === 'driver' ? 'Conducteur' : 'Passager'}
                        </span>
                      </div>
                      
                      <h3 className="mt-2 text-lg font-medium text-gray-900">
                        {ride.departureCity} → {ride.arrivalCity}
                      </h3>
                      
                      <p className="text-gray-500">
                        {formatDate(ride.departureDate)} • {ride.departureTime} - {ride.arrivalTime}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-eco-green-600">{ride.price} €</p>
                      {ride.type === 'driver' && (
                        <p className="text-sm text-gray-500">
                          {ride.passengersCount} {ride.passengersCount > 1 ? 'passagers' : 'passager'}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    {ride.type === 'driver' ? (
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          Véhicule : {ride.vehicle.brand} {ride.vehicle.model}
                        </p>
                        
                        {ride.passengers.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-700 mb-1">Passagers :</p>
                            <div className="flex -space-x-2 overflow-hidden">
                              {ride.passengers.map(passenger => (
                                <img
                                  key={passenger.id}
                                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                                  src={passenger.photo}
                                  alt={passenger.username}
                                  title={passenger.username}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm text-gray-700 mb-2">
                          Conducteur : {ride.driver.username}
                        </p>
                        <p className="text-sm text-gray-700">
                          Véhicule : {ride.driver.vehicle.brand} {ride.driver.vehicle.model}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    {['PENDING', 'CONFIRMED'].includes(ride.status) && (
                      <button
                        onClick={() => handleCancelRide(ride)}
                        className="btn btn-secondary text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Annuler
                      </button>
                    )}
                    
                    {ride.status === 'CONFIRMED' && ride.type === 'driver' && (
                      <button
                        className="btn btn-primary ml-2"
                      >
                        Démarrer
                      </button>
                    )}
                    
                    {ride.status === 'PENDING' && ride.type === 'driver' && ride.passengersCount > 0 && (
                      <button
                        className="btn btn-primary ml-2"
                      >
                        Confirmer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Modal d'annulation */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirmer l'annulation</h2>
            
            <p className="mb-4">
              Êtes-vous sûr de vouloir annuler ce covoiturage ?
              {rideToCancel.type === 'driver' && rideToCancel.passengersCount > 0 && (
                <span className="block mt-2 text-red-600">
                  Attention : Des passagers sont inscrits à ce covoiturage. Ils seront notifiés de l'annulation.
                </span>
              )}
            </p>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="btn btn-secondary"
              >
                Retour
              </button>
              <button
                type="button"
                onClick={confirmCancelRide}
                className={`btn btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? 'Annulation...' : 'Confirmer l\'annulation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRidesHistoryPage;