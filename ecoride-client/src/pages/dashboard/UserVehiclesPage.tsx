import { useState } from 'react';
import type { Vehicle } from '../../types';

type VehicleFormData = Omit<Vehicle, 'id' | 'driverProfileId'>;

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    brand: 'Renault',
    model: 'Zoé',
    color: 'Bleu',
    licensePlate: 'AB-123-CD',
    registrationYear: 2019,
    seats: 4,
    energy: 'Électrique',
    isElectric: true,
    driverProfileId: 1
  },
  {
    id: 2,
    brand: 'Peugeot',
    model: '308',
    color: 'Gris',
    licensePlate: 'EF-456-GH',
    registrationYear: 2018,
    seats: 5,
    energy: 'Diesel',
    isElectric: false,
    driverProfileId: 1
  }
];

const UserVehiclesPage = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [vehicleForm, setVehicleForm] = useState<VehicleFormData>({
    brand: '',
    model: '',
    color: '',
    licensePlate: '',
    registrationYear: new Date().getFullYear(),
    seats: 4,
    energy: 'Essence',
    isElectric: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const openModal = (vehicle: Vehicle | null = null) => {
    if (vehicle) {
      // Spread operator to copy all properties from the vehicle
      setVehicleForm({
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        licensePlate: vehicle.licensePlate,
        registrationYear: vehicle.registrationYear,
        seats: vehicle.seats,
        energy: vehicle.energy,
        isElectric: vehicle.isElectric
      });
      setSelectedVehicle(vehicle);
    } else {
      setVehicleForm({
        brand: '',
        model: '',
        color: '',
        licensePlate: '',
        registrationYear: new Date().getFullYear(),
        seats: 4,
        energy: 'Essence',
        isElectric: false
      });
      setSelectedVehicle(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    // Si l'énergie est électrique, mettre isElectric à true
    if (name === 'energy' && value === 'Électrique') {
      setVehicleForm(prev => ({
        ...prev,
        [name]: value,
        isElectric: true
      }));
    } else {
      setVehicleForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? parseInt(value) : value,
        // Si l'énergie n'est pas électrique, mettre isElectric à false
        isElectric: name === 'energy' ? false : prev.isElectric
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simuler une requête API
    setTimeout(() => {
      if (selectedVehicle) {
        // Mise à jour d'un véhicule existant
        setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? 
          { 
            ...vehicleForm, 
            id: selectedVehicle.id,
            driverProfileId: selectedVehicle.driverProfileId
          } : v));
        setSuccess('Véhicule mis à jour avec succès !');
      } else {
        // Ajout d'un nouveau véhicule
        const vehicleIds = vehicles.map(v => v.id);
        const newId = vehicleIds.length > 0 ? Math.max(...vehicleIds) + 1 : 1;
        
        const newVehicle: Vehicle = {
          ...vehicleForm,
          id: newId,
          driverProfileId: 1 // Assuming user has a driver profile with ID 1
        };
        setVehicles([...vehicles, newVehicle]);
        setSuccess('Véhicule ajouté avec succès !');
      }
      setLoading(false);
      closeModal();
    }, 1000);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
      setSuccess('Véhicule supprimé avec succès !');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Mes véhicules</h2>
        <button
          onClick={() => openModal()}
          className="btn btn-primary"
        >
          Ajouter un véhicule
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
      
      {vehicles.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun véhicule</h3>
          <p className="text-gray-500">Vous n'avez pas encore ajouté de véhicule</p>
          <button
            onClick={() => openModal()}
            className="mt-4 btn btn-primary"
          >
            Ajouter un véhicule
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-gray-500">{vehicle.licensePlate} • {vehicle.color} • {vehicle.registrationYear}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(vehicle)}
                      className="text-eco-green-600 hover:text-eco-green-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-gray-500">Énergie</p>
                    <p className="font-medium">{vehicle.energy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Places</p>
                    <p className="font-medium">{vehicle.seats}</p>
                  </div>
                </div>
                
                {vehicle.isElectric && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Véhicule électrique
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modal pour ajouter/modifier un véhicule */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              {selectedVehicle ? 'Modifier un véhicule' : 'Ajouter un véhicule'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="brand" className="label">Marque</label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={vehicleForm.brand}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="model" className="label">Modèle</label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={vehicleForm.model}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="color" className="label">Couleur</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={vehicleForm.color}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="licensePlate" className="label">Immatriculation</label>
                  <input
                    type="text"
                    id="licensePlate"
                    name="licensePlate"
                    value={vehicleForm.licensePlate}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="registrationYear" className="label">Année</label>
                  <input
                    type="number"
                    id="registrationYear"
                    name="registrationYear"
                    value={vehicleForm.registrationYear}
                    onChange={handleChange}
                    min="1990"
                    max={new Date().getFullYear()}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="seats" className="label">Places</label>
                  <input
                    type="number"
                    id="seats"
                    name="seats"
                    value={vehicleForm.seats}
                    onChange={handleChange}
                    min="1"
                    max="9"
                    className="input"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="energy" className="label">Énergie</label>
                <select
                  id="energy"
                  name="energy"
                  value={vehicleForm.energy}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="Essence">Essence</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Électrique">Électrique</option>
                  <option value="GPL">GPL</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserVehiclesPage;