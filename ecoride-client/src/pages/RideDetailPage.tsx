import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Review, RideDetail } from '../types';

const mockRideDetails = {
  id: 1,
  driver: {
    id: 101,
    username: 'Martin',
    photo: 'https://randomuser.me/api/portraits/men/1.jpg',
    rating: 4.5,
    reviews: [
      { id: 201, author: 'Sophie', rating: 5, comment: 'Très ponctuel et sympathique !', date: '2023-05-10' },
      { id: 202, author: 'Lucas', rating: 4, comment: 'Conduite prudente, trajet agréable.', date: '2023-04-22' },
    ]
  },
  availableSeats: 3,
  price: 15,
  departureCity: 'Paris',
  departureAddress: '23 Avenue des Champs-Élysées, 75008 Paris',
  arrivalCity: 'Lyon',
  arrivalAddress: '10 Place Bellecour, 69002 Lyon',
  departureDate: '2023-06-15',
  departureTime: '08:00',
  arrivalTime: '10:30',
  isEcological: true,
  durationMinutes: 150,
  vehicle: {
    brand: 'Tesla',
    model: 'Model 3',
    color: 'Blanc',
    energy: 'Électrique',
    year: 2021
  },
  preferences: {
    smoking: false,
    animals: true,
    music: 'Modérée',
    conversation: 'Amicale'
  }
};

const RideDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ride, setRide] = useState<RideDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setRide(mockRideDetails);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-500"></div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Covoiturage introuvable</h2>
        <p className="mt-2 text-gray-600">Le covoiturage que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link to="/covoiturages" className="mt-4 inline-block text-eco-green-600 hover:text-eco-green-800">
          Retour à la liste des covoiturages
        </Link>
      </div>
    );
  }

  const formattedDate = format(new Date(ride.departureDate), 'EEEE d MMMM yyyy', { locale: fr });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/covoiturages" className="text-eco-green-600 hover:text-eco-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour aux résultats
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* En-tête avec itinéraire */}
        <div className="bg-eco-green-50 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{ride.departureCity} → {ride.arrivalCity}</h1>
              <p className="text-gray-600 capitalize">{formattedDate} • {ride.departureTime} - {ride.arrivalTime}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="font-bold text-2xl text-eco-green-800">{ride.price} €</span>
              <span className="text-gray-500 ml-2">/ personne</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Colonne 1: Informations sur le conducteur */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Conducteur</h2>
              <div className="flex items-center mb-4">
                <img
                  src={ride.driver.photo}
                  alt={ride.driver.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{ride.driver.username}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(ride.driver.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 15.934l-6.18 2.392.944-6.533L.484 6.74l6.524-.75L10 0l2.992 5.99 6.524.75-4.28 5.053.944 6.533z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <span className="ml-1 text-sm text-gray-500">({ride.driver.rating})</span>
                  </div>
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-900 mb-2">Véhicule</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  <span className="font-medium">{ride.vehicle.brand} {ride.vehicle.model}</span>
                </p>
                <p className="text-gray-600 text-sm">
                  {ride.vehicle.color} • {ride.vehicle.year}
                </p>
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ride.isEcological ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ride.vehicle.energy}
                  </span>
                  {ride.isEcological && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-green-100 text-eco-green-800">
                      Voyage écologique
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-md font-semibold text-gray-900 mb-2">Préférences</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <svg className={`h-5 w-5 ${ride.preferences.smoking ? 'text-red-500' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      {ride.preferences.smoking ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      )}
                    </svg>
                    <span className="ml-2 text-sm text-gray-700">{ride.preferences.smoking ? 'Fumeur accepté' : 'Non-fumeur'}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className={`h-5 w-5 ${ride.preferences.animals ? 'text-green-500' : 'text-red-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      {ride.preferences.animals ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      )}
                    </svg>
                    <span className="ml-2 text-sm text-gray-700">{ride.preferences.animals ? 'Animaux acceptés' : 'Pas d\'animaux'}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Musique :</span> {ride.preferences.music}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Conversation :</span> {ride.preferences.conversation}
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne 2: Détails du trajet */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du trajet</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-start mb-6">
                  <div className="flex flex-col items-center mr-4">
                    <div className="h-6 w-6 rounded-full bg-eco-green-500 flex items-center justify-center text-white">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                    <div className="h-6 w-6 rounded-full bg-eco-green-700 flex items-center justify-center text-white">
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <p className="font-medium text-gray-900">{ride.departureTime} • {ride.departureCity}</p>
                      <p className="text-gray-600 text-sm">{ride.departureAddress}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{ride.arrivalTime} • {ride.arrivalCity}</p>
                      <p className="text-gray-600 text-sm">{ride.arrivalAddress}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-4">
                  <div>
                    <span className="font-medium">Durée :</span> {Math.floor(ride.durationMinutes / 60)}h{ride.durationMinutes % 60 ? ` ${ride.durationMinutes % 60}min` : ''}
                  </div>
                  <div>
                    <span className="font-medium">Distance :</span> {Math.ceil(ride.durationMinutes / 60 * 80)} km environ
                  </div>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 mb-4">Avis sur le conducteur</h2>
              {(ride.driver.reviews as Review[]).length > 0 ? (
                <div className="space-y-4">
                  {ride.driver.reviews?.map(review => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">{review.author}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.934l-6.18 2.392.944-6.533L.484 6.74l6.524-.75L10 0l2.992 5.99 6.524.75-4.28 5.053.944 6.533z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Aucun avis pour le moment.</p>
              )}

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Places disponibles</h2>
                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">{ride.availableSeats}</span> {ride.availableSeats > 1 ? 'places disponibles' : 'place disponible'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsParticipateModalOpen(true)}
                    className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                    disabled={ride.availableSeats === 0}
                  >
                    Participer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de participation */}
      {isParticipateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Confirmer votre participation</h2>
            <p className="mb-4">Vous êtes sur le point de participer au trajet de {ride.driver.username} de {ride.departureCity} à {ride.arrivalCity} le {formattedDate}.</p>
            <p className="mb-6">Ce trajet vous coûtera <span className="font-bold">{ride.price} crédits</span>.</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsParticipateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // Dans un cas réel, on enverrait une requête à l'API
                  // Puis on redirigerait l'utilisateur
                  window.location.href = '/connexion'; // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
                }}
                className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RideDetailPage;