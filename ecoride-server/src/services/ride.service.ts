import api from './api.service';

export interface SearchRideParams {
  departureCity?: string;
  arrivalCity?: string;
  departureDate?: string;
  isEcological?: boolean;
  maxPrice?: number;
  maxDuration?: number;
  minRating?: number;
}

export interface CreateRideData {
  departureCity: string;
  departureAddress: string;
  arrivalCity: string;
  arrivalAddress: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  seats: number;
  price: number;
  vehicleId: number;
}

// Rechercher des covoiturages
export const searchRides = async (params: SearchRideParams) => {
  return api.get('/rides', { params });
};

// Obtenir les détails d'un covoiturage
export const getRideDetails = async (id: number | string) => {
  return api.get(`/rides/${id}`);
};

// Créer un nouveau covoiturage
export const createRide = async (data: CreateRideData) => {
  return api.post('/rides', data);
};

// Participer à un covoiturage
export const joinRide = async (rideId: number | string) => {
  return api.post(`/rides/${rideId}/join`);
};

// Annuler sa participation à un covoiturage
export const cancelRideParticipation = async (rideId: number | string) => {
  return api.delete(`/rides/${rideId}/join`);
};

// Démarrer un covoiturage (conducteur)
export const startRide = async (rideId: number | string) => {
  return api.patch(`/rides/${rideId}/start`);
};

// Marquer un covoiturage comme terminé (conducteur)
export const completeRide = async (rideId: number | string) => {
  return api.patch(`/rides/${rideId}/complete`);
};

// Obtenir l'historique des covoiturages
export const getRideHistory = async () => {
  return api.get('/rides/history');
};