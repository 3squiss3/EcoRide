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
export declare const searchRides: (params: SearchRideParams) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getRideDetails: (id: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const createRide: (data: CreateRideData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const joinRide: (rideId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const cancelRideParticipation: (rideId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const startRide: (rideId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const completeRide: (rideId: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getRideHistory: () => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=ride.service.d.ts.map