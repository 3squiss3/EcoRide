import { Link } from 'react-router-dom';
import type { RideCardProps } from '../../types';

const RideCard = ({ ride }: RideCardProps) => {
    const {
        id,
        driver,
        availableSeats,
        price,
        departureDate,
        departureTime,
        arrivalTime,
        isEcological,
    } = ride;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <img
            className="h-12 w-12 rounded-full object-cover mr-4"
            src={driver.photo || 'https://via.placeholder.com/100'}
            alt={`${driver.username}`}
          />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{driver.username}</h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < driver.rating ? 'text-yellow-400' : 'text-gray-300'
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
              <span className="ml-1 text-sm text-gray-500">({driver.rating})</span>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{departureDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Prix</p>
              <p className="font-medium">{price} €</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Départ</p>
              <p className="font-medium">{departureTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Arrivée</p>
              <p className="font-medium">{arrivalTime}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {availableSeats} {availableSeats > 1 ? 'places disponibles' : 'place disponible'}
              </span>
              {isEcological && (
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-eco-green-100 text-eco-green-800">
                  Écologique
                </span>
              )}
            </div>
            <Link
              to={`/covoiturages/${id}`}
              className="inline-flex items-center px-3 py-1 border border-eco-green-500 text-sm font-medium rounded-md text-eco-green-700 bg-white hover:bg-eco-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
            >
              Détails
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideCard;