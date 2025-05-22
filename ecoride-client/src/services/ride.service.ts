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

export interface Ride {
  id: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  availableSeats: number;
  price: number;
  isEcological: boolean;
  driver: {
    id: number;
    username: string;
    rating: number;
    photo: string;
  };
  vehicle: {
    brand: string;
    model: string;
  };
}

export const searchRides = async (params: SearchRideParams): Promise<Ride[]> => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      searchParams.append(key, value.toString());
    }
  });
  
  return api.get(`/rides?${searchParams.toString()}`);
};

export const getRideDetails = async (id: number | string) => {
  return api.get(`/rides/${id}`);
};

export const createRide = async (data: CreateRideData) => {
  return api.post('/rides', data);
};

export const joinRide = async (rideId: number | string) => {
  return api.post(`/rides/${rideId}/join`);
};

export const getUserRides = async () => {
  return api.get('/rides/history');
};

export const cancelRide = async (rideId: number | string) => {
  return api.delete(`/rides/${rideId}/cancel`);
};