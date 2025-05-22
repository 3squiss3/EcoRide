import { useState } from 'react';
import type { FilterState, RideFiltersProps } from '../../types';

const RideFilters = ( { onFilterChange }: RideFiltersProps ) => {
  const [filters, setFilters] = useState<FilterState>({
    isEcological: false,
    maxPrice: '',
    maxDuration: '',
    minRating: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const checked = (e.target as HTMLInputElement).type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : false;

    const newValue = type === 'checkbox' ? checked : value;
    
    const updatedFilters = {
      ...filters,
      [name]: newValue
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Filtres</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isEcological"
              checked={filters.isEcological}
              onChange={handleChange}
              className="h-4 w-4 text-eco-green-600 focus:ring-eco-green-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Voyage écologique uniquement</span>
          </label>
        </div>
        
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Prix maximum
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="maxPrice"
              id="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              className="block w-full pr-12 border-gray-300 rounded-md focus:ring-eco-green-500 focus:border-eco-green-500 sm:text-sm"
              placeholder="0"
              min="0"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">€</span>
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="maxDuration" className="block text-sm font-medium text-gray-700 mb-1">
            Durée maximum (minutes)
          </label>
          <input
            type="number"
            name="maxDuration"
            id="maxDuration"
            value={filters.maxDuration}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md focus:ring-eco-green-500 focus:border-eco-green-500 sm:text-sm"
            placeholder="0"
            min="0"
          />
        </div>
        
        <div>
          <label htmlFor="minRating" className="block text-sm font-medium text-gray-700 mb-1">
            Note minimale
          </label>
          <select
            name="minRating"
            id="minRating"
            value={filters.minRating}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md focus:ring-eco-green-500 focus:border-eco-green-500 sm:text-sm"
          >
            <option value="">Toutes les notes</option>
            <option value="1">1 étoile et plus</option>
            <option value="2">2 étoiles et plus</option>
            <option value="3">3 étoiles et plus</option>
            <option value="4">4 étoiles et plus</option>
            <option value="5">5 étoiles</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default RideFilters;