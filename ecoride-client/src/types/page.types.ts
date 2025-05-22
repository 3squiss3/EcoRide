import type { Ride } from './ride.types';

export interface RidesPageState {
  searchParams: {
    departure: string;
    destination: string;
    date: string;
  };
  filters: {
    isEcological: boolean;
    maxPrice: string;
    maxDuration: string;
    minRating: string;
  };
  rides: Ride[];
  loading: boolean;
  noResults: boolean;
}