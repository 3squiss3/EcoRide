export interface FilterState {
    isEcological: boolean;
    maxPrice: string;
    maxDuration: string;
    minRating: string;
  }
  
  export interface RideFiltersProps {
    onFilterChange: (filters: FilterState) => void;
  }