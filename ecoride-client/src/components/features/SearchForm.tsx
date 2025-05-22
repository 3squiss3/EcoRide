import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = ({ initialValues = { departure: '', destination: '', date: '' } }) => {
  const [searchParams, setSearchParams] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Construire les paramètres de requête pour l'URL
    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) queryParams.append(key, value.toString());
    });
    
    // Rediriger vers la page de covoiturage avec les paramètres de recherche
    navigate(`/covoiturages?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
            Départ
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={searchParams.departure}
            onChange={handleChange}
            placeholder="Ville de départ"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={searchParams.destination}
            onChange={handleChange}
            placeholder="Ville d'arrivée"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={searchParams.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-eco-green-500 focus:border-eco-green-500"
            required
          />
        </div>
      </div>
      
      <div className="mt-4">
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-eco-green-600 text-white rounded-md hover:bg-eco-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-500 transition"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchForm;