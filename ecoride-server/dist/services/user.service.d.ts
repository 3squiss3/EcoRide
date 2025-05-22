export interface UpdateProfileData {
    username?: string;
    email?: string;
    isDriver?: boolean;
    isPassenger?: boolean;
}
export interface UpdatePreferencesData {
    smoking?: boolean;
    animals?: boolean;
    music?: string;
    conversation?: string;
    otherPreferences?: string;
}
export interface VehicleData {
    licensePlate: string;
    brand: string;
    model: string;
    color: string;
    registrationYear: number;
    seats: number;
    energy: string;
    isElectric: boolean;
}
export declare const updateProfile: (data: UpdateProfileData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updatePreferences: (data: UpdatePreferencesData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const getUserVehicles: () => Promise<import("axios").AxiosResponse<any, any>>;
export declare const addVehicle: (data: VehicleData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const updateVehicle: (id: number | string, data: VehicleData) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const deleteVehicle: (id: number | string) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=user.service.d.ts.map