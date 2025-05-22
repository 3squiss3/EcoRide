import { useState } from 'react';

// Données fictives pour simulation
const mockVehicles = [
  {
    id: 1,
    brand: 'Renault',
    model: 'Zoé',
    color: 'Bleu',
    licensePlate: 'AB-123-CD',
    registrationYear: 2019,
    seats: 4,
    energy: 'Électrique',
    isElectric: true
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
    isElectric: false
  }
];

const CreateRidePage = () => {
  const [vehicles, _setVehicles] = useState(mockVehicles);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [rideForm, setRideForm] = useState({
    departureCity: '',
    departureAddress: '',
    arrivalCity: '',
    arrivalAddress: '',
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    seats: 3,
    price: 10,
    vehicleId: ''
  });
  
  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    setRideForm({
      ...rideForm,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Vérifier si un véhicule est sélectionné
    if (!rideForm.vehicleId) {
      setError('Veuillez sélectionner un véhicule');
      setLoading(false);
      return;
    }
    
    // Simuler une requête API
    setTimeout(() => {
      setSuccess('Votre covoiturage a été créé avec succès !');
      setLoading(false);
      // Réinitialiser le formulaire
      setRideForm({
        departureCity: '',
        departureAddress: '',
        arrivalCity: '',
        arrivalAddress: '',
        departureDate: '',
        departureTime: '',
        arrivalTime: '',
        seats: 3,
        price: 10,
        vehicleId: ''
      });
    }, 1000);
  };
  
  // Calcul de la commission
  const platformFee = 2; // 2 crédits
  const driverEarns = rideForm.price > platformFee ? rideForm.price - platformFee : 0;
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Proposer un covoiturage</h2>
      
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun véhicule disponible</h3>
          <p className="text-gray-500 mb-4">Vous devez ajouter au moins un véhicule avant de pouvoir proposer un covoiturage.</p>
          
          <a href="/mon-espace/vehicles"
            className="btn btn-primary"
          >
            Ajouter un véhicule
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Itinéraire</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="departureCity" className="label">Ville de départ</label>
                <input
                  type="text"
                  id="departureCity"
                  name="departureCity"
                  value={rideForm.departureCity}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="arrivalCity" className="label">Ville d'arrivée</label>
                <input
                  type="text"
                  id="arrivalCity"
                  name="arrivalCity"
                  value={rideForm.arrivalCity}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="departureAddress" className="label">Adresse de départ</label>
                <input
                  type="text"
                  id="departureAddress"
                  name="departureAddress"
                  value={rideForm.departureAddress}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="arrivalAddress" className="label">Adresse d'arrivée</label>
                <input
                  type="text"
                  id="arrivalAddress"
                  name="arrivalAddress"
                  value={rideForm.arrivalAddress}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Date et heure</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="departureDate" className="label">Date de départ</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={rideForm.departureDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="departureTime" className="label">Heure de départ</label>
                <input
                  type="time"
                  id="departureTime"
                  name="departureTime"
                  value={rideForm.departureTime}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="arrivalTime" className="label">Heure d'arrivée estimée</label>
                <input
                  type="time"
                  id="arrivalTime"
                  name="arrivalTime"
                  value={rideForm.arrivalTime}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Détails du covoiturage</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="vehicleId" className="label">Véhicule</label>
                <select
                  id="vehicleId"
                  name="vehicleId"
                  value={rideForm.vehicleId}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">Sélectionnez un véhicule</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} - {vehicle.licensePlate} {vehicle.isElectric ? '(Électrique)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="seats" className="label">Places disponibles</label>
                <input
                  type="number"
                  id="seats"
                  name="seats"
                  value={rideForm.seats}
                  onChange={handleChange}
                  min="1"
                  max="8"
                  className="input"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="price" className="label">Prix par passager (en crédits)</label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={rideForm.price}
                  onChange={handleChange}
                  min="3"
                  className="input pr-8"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">€</span>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Commission plateforme : {platformFee} crédits • Vous recevez : {driverEarns} crédits
              </p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Création en cours...' : 'Créer le covoiturage'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateRidePage;