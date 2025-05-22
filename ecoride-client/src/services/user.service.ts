import api from './api.service';

export interface UpdateProfileData {
  username: string;
  email: string;
  isDriver: boolean;
  isPassenger: boolean;
}

export interface VehicleData {
  licensePlate: string;
  brand: string;
  model: string;
  color: string;
  registrationYear: number;
  seats: number;
  energy: string;
}

export interface DriverPreferencesData {
  smoking: boolean;
  animals: boolean;
  music: string;
  conversation: string;
  otherPreferences: string;
}

export const updateProfile = async (data: UpdateProfileData) => {
  return api.put('/users/profile', data);
};

export const getUserVehicles = async () => {
  return api.get('/users/vehicles');
};

export const addVehicle = async (data: VehicleData) => {
  return api.post('/users/vehicles', data);
};

export const updateVehicle = async (id: number | string, data: VehicleData) => {
  return api.put(`/users/vehicles/${id}`, data);
};

export const deleteVehicle = async (id: number | string) => {
  return api.delete(`/users/vehicles/${id}`);
};

export const updateDriverPreferences = async (data: DriverPreferencesData) => {
  return api.put('/users/preferences', data);
};