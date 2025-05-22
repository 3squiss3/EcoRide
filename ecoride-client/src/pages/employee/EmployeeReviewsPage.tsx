import { useState } from 'react';
import type { PendingReview } from '../../types';

const mockPendingReviews: PendingReview[] = [
  {
    id: 1,
    giver: {
      id: 101,
      username: 'Sophie',
      email: 'sophie@example.com'
    },
    receiver: {
      id: 201,
      username: 'Martin',
      email: 'martin@example.com'
    },
    rating: 4,
    comment: 'Très bon conducteur, ponctuel et sympathique. La voiture était propre et confortable.',
    status: 'PENDING',
    createdAt: '2023-06-18T14:30:00Z',
    ride: {
      id: 301,
      departureCity: 'Paris',
      arrivalCity: 'Lyon',
      departureDate: '2023-06-15'
    }
  },
  {
    id: 2,
    giver: {
      id: 102,
      username: 'Lucas',
      email: 'lucas@example.com'
    },
    receiver: {
      id: 202,
      username: 'Emma',
      email: 'emma@example.com'
    },
    rating: 2,
    comment: 'Conductrice en retard de 15 minutes et conduite un peu brusque. Pas très bavarde non plus.',
    status: 'PENDING',
    createdAt: '2023-06-19T09:15:00Z',
    ride: {
      id: 302,
      departureCity: 'Lyon',
      arrivalCity: 'Marseille',
      departureDate: '2023-06-17'
    }
  },
  {
    id: 3,
    giver: {
      id: 103,
      username: 'Léa',
      email: 'lea@example.com'
    },
    receiver: {
      id: 203,
      username: 'Thomas',
      email: 'thomas@example.com'
    },
    rating: 5,
    comment: 'Parfait ! Thomas est un conducteur exceptionnel, très prévenant et agréable. Je recommande vivement !',
    status: 'PENDING',
    createdAt: '2023-06-20T16:45:00Z',
    ride: {
      id: 303,
      departureCity: 'Bordeaux',
      arrivalCity: 'Toulouse',
      departureDate: '2023-06-19'
    }
  }
]

const EmployeeReviewsPage = () => {
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>(mockPendingReviews);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleApproveReview = (reviewId: number) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut de l'avis
      setPendingReviews(pendingReviews.filter(review => review.id !== reviewId));
      setSuccess(`L'avis #${reviewId} a été approuvé avec succès.`);
      setLoading(false);
    }, 1000);
  };
  
  const handleRejectReview = (reviewId: number) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Simuler une requête API
    setTimeout(() => {
      // Mettre à jour le statut de l'avis
      setPendingReviews(pendingReviews.filter(review => review.id !== reviewId));
      setSuccess(`L'avis #${reviewId} a été rejeté avec succès.`);
      setLoading(false);
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
        <h2 className="text-xl font-semibold text-gray-900">Validation des avis</h2>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {pendingReviews.length} avis en attente
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
      
      {pendingReviews.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tous les avis ont été traités</h3>
          <p className="text-gray-500">Il n'y a aucun avis en attente de validation.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingReviews.map(review => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      En attente
                    </span>
                    <p className="mt-2 text-sm text-gray-500">
                      Avis #{review.id} • Soumis le {formatDate(review.createdAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
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
                
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Commentaire</h3>
                    <p className="mt-1 text-gray-700">"{review.comment}"</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Donné par</h4>
                      <p className="text-gray-900">{review.giver.username}</p>
                      <p className="text-sm text-gray-500">{review.giver.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Reçu par</h4>
                      <p className="text-gray-900">{review.receiver.username}</p>
                      <p className="text-sm text-gray-500">{review.receiver.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500">Trajet concerné</h4>
                    <p className="text-gray-900">{review.ride.departureCity} → {review.ride.arrivalCity}</p>
                    <p className="text-sm text-gray-500">Date du trajet : {new Date(review.ride.departureDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => handleRejectReview(review.id)}
                    className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                    disabled={loading}
                  >
                    Rejeter
                  </button>
                  <button
                    onClick={() => handleApproveReview(review.id)}
                    className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
                    disabled={loading}
                  >
                    Approuver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeReviewsPage;