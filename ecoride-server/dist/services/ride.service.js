"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRideHistory = exports.completeRide = exports.startRide = exports.cancelRideParticipation = exports.joinRide = exports.createRide = exports.getRideDetails = exports.searchRides = void 0;
const api_service_1 = __importDefault(require("./api.service"));
// Rechercher des covoiturages
const searchRides = async (params) => {
    return api_service_1.default.get('/rides', { params });
};
exports.searchRides = searchRides;
// Obtenir les détails d'un covoiturage
const getRideDetails = async (id) => {
    return api_service_1.default.get(`/rides/${id}`);
};
exports.getRideDetails = getRideDetails;
// Créer un nouveau covoiturage
const createRide = async (data) => {
    return api_service_1.default.post('/rides', data);
};
exports.createRide = createRide;
// Participer à un covoiturage
const joinRide = async (rideId) => {
    return api_service_1.default.post(`/rides/${rideId}/join`);
};
exports.joinRide = joinRide;
// Annuler sa participation à un covoiturage
const cancelRideParticipation = async (rideId) => {
    return api_service_1.default.delete(`/rides/${rideId}/join`);
};
exports.cancelRideParticipation = cancelRideParticipation;
// Démarrer un covoiturage (conducteur)
const startRide = async (rideId) => {
    return api_service_1.default.patch(`/rides/${rideId}/start`);
};
exports.startRide = startRide;
// Marquer un covoiturage comme terminé (conducteur)
const completeRide = async (rideId) => {
    return api_service_1.default.patch(`/rides/${rideId}/complete`);
};
exports.completeRide = completeRide;
// Obtenir l'historique des covoiturages
const getRideHistory = async () => {
    return api_service_1.default.get('/rides/history');
};
exports.getRideHistory = getRideHistory;
//# sourceMappingURL=ride.service.js.map