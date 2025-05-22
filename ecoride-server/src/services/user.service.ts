import api from './api.service';

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

// Mettre à jour le profil
export const updateProfile = async (data: UpdateProfileData) => {
  return api.put('/users/profile', data);
};

// Mettre à jour les préférences
export const updatePreferences = async (data: UpdatePreferencesData) => {
  return api.put('/users/preferences', data);
};

// Obtenir les véhicules de l'utilisateur
export const getUserVehicles = async () => {
  return api.get('/users/vehicles');
};

// Ajouter un véhicule
export const addVehicle = async (data: VehicleData) => {
  return api.post('/users/vehicles', data);
};

// Mettre à jour un véhicule
export const updateVehicle = async (id: number | string, data: VehicleData) => {
  return api.put(`/users/vehicles/${id}`, data);
};

// Supprimer un véhicule
export const deleteVehicle = async (id: number | string) => {
  return api.delete(`/users/vehicles/${id}`);
};