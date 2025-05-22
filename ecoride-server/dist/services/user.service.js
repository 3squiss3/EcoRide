"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.addVehicle = exports.getUserVehicles = exports.updatePreferences = exports.updateProfile = void 0;
const api_service_1 = __importDefault(require("./api.service"));
// Mettre à jour le profil
const updateProfile = async (data) => {
    return api_service_1.default.put('/users/profile', data);
};
exports.updateProfile = updateProfile;
// Mettre à jour les préférences
const updatePreferences = async (data) => {
    return api_service_1.default.put('/users/preferences', data);
};
exports.updatePreferences = updatePreferences;
// Obtenir les véhicules de l'utilisateur
const getUserVehicles = async () => {
    return api_service_1.default.get('/users/vehicles');
};
exports.getUserVehicles = getUserVehicles;
// Ajouter un véhicule
const addVehicle = async (data) => {
    return api_service_1.default.post('/users/vehicles', data);
};
exports.addVehicle = addVehicle;
// Mettre à jour un véhicule
const updateVehicle = async (id, data) => {
    return api_service_1.default.put(`/users/vehicles/${id}`, data);
};
exports.updateVehicle = updateVehicle;
// Supprimer un véhicule
const deleteVehicle = async (id) => {
    return api_service_1.default.delete(`/users/vehicles/${id}`);
};
exports.deleteVehicle = deleteVehicle;
//# sourceMappingURL=user.service.js.map