import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../components/features/SearchForm';
import RideFilters from '../components/features/RideFilters';
import RideCard from '../components/features/RideCard';
import type { FilterState, Ride, SearchParams } from '../types';

const mockRides: Ride[] = [
  {
    id: 1,
    driver: {
      username: 'Martin',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.5
    },
    availableSeats: 3,
    price: 15,
    departureDate: '2023-06-15',
    departureTime: '08:00',
    arrivalTime: '10:30',
    isEcological: true,
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    durationMinutes: 150
  },
  {
    id: 2,
    driver: {
      username: 'Sophie',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5
    },
    availableSeats: 2,
    price: 12,
    departureDate: '2023-06-15',
    departureTime: '09:00',
    arrivalTime: '11:00',
    isEcological: false,
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    durationMinutes: 120
  },
  {
    id: 3,
    driver: {
      username: 'Alex',
      photo: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 3.8
    },
    availableSeats: 1,
    price: 18,
    departureDate: '2023-06-15',
    departureTime: '10:00',
    arrivalTime: '13:00',
    isEcological: true,
    departureCity: 'Paris',
    arrivalCity: 'Lyon',
    durationMinutes: 180
  }
];

const RidesPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const [searchParams, setSearchParams] = useState<SearchParams>({
      departure: queryParams.get('departure') || '',
      destination: queryParams.get('destination') || '',
      date: queryParams.get('date') || ''
    });
    
    const [filters, setFilters] = useState<FilterState>({
      isEcological: false,
      maxPrice: '',
      maxDuration: '',
      minRating: ''
    });
    
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noResults, setNoResults] = useState<boolean>(false);
    
    // Simuler l'appel API pour récupérer les covoiturages
    useEffect(() => {
      if (searchParams.departure && searchParams.destination && searchParams.date) {
        setLoading(true);
        
        // Simulation d'un appel API avec timeout
        setTimeout(() => {
          const filteredRides = mockRides.filter(ride => 
            ride.departureCity.toLowerCase() === searchParams.departure.toLowerCase() &&
            ride.arrivalCity.toLowerCase() === searchParams.destination.toLowerCase() &&
            ride.departureDate === searchParams.date
          );
          
          setRides(filteredRides);
          setNoResults(filteredRides.length === 0);
          setLoading(false);
        }, 1000);
      }
    }, [searchParams]);
    
    // Appliquer les filtres aux covoiturages
    const filteredRides = rides.filter(ride => {
      // Filtre écologique
      if (filters.isEcological && !ride.isEcological) return false;
      
      // Filtre prix maximum
      if (filters.maxPrice && ride.price > parseInt(filters.maxPrice)) return false;
      
      // Filtre durée maximum
      if (filters.maxDuration && ride.durationMinutes > parseInt(filters.maxDuration)) return false;
      
      // Filtre note minimale
      if (filters.minRating && ride.driver.rating < parseInt(filters.minRating)) return false;
      
      return true;
    });
    
    const handleChangeDate = () => {
      setSearchParams(prev => ({
        ...prev,
        date: '2023-06-16'
      }));
    };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Rechercher un covoiturage</h1>
      
      <div className="mb-8">
        <SearchForm initialValues={searchParams} />
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-eco-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-2 text-gray-600">Recherche en cours...</p>
        </div>
      ) : (
        <>
          {rides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <RideFilters onFilterChange={setFilters} />
              </div>
              
              <div className="md:col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {filteredRides.length} {filteredRides.length > 1 ? 'covoiturages disponibles' : 'covoiturage disponible'}
                </h2>
                
                <div className="space-y-4">
                  {filteredRides.length > 0 ? (
                    filteredRides.map(ride => (
                      <RideCard key={ride.id} ride={ride} />
                    ))
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-md">
                      <p className="text-yellow-700">
                        Aucun covoiturage ne correspond à vos filtres. Essayez d'ajuster vos critères.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : noResults && (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-gray-700 mb-4">
                Aucun covoiturage disponible pour cette recherche. Essayez une autre date.
              </p>
              <button
                onClick={handleChangeDate}
                className="px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500"
              >
                Essayer le 16 juin 2023
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RidesPage;