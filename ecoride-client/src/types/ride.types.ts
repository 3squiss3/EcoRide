import type { Driver } from './user.types';
import type { Vehicle, Preferences } from './vehicle.types';

// Interface basique pour les cartes de covoiturages
export interface Ride {
  id: number | string;
  driver: Driver;
  availableSeats: number;
  price: number;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  isEcological: boolean;
  departureCity: string;
  arrivalCity: string;
  durationMinutes: number;
}

// Interface étendue pour la page de détail
export interface RideDetail extends Ride {
  departureAddress: string;
  arrivalAddress: string;
  vehicle: Vehicle;
  preferences: Preferences;
}

// Props pour le composant RideCard
export interface RideCardProps {
  ride: Ride;
}