"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const auth_service_1 = require("./auth.service");
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Créer une instance axios avec la configuration de base
const api = axios_1.default.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
    const token = (0, auth_service_1.getToken)();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    var _a, _b;
    // Gérer les erreurs d'authentification (401) - redirection vers login
    if (error.response && error.response.status === 401) {
        // Rediriger vers la page de connexion et effacer le token
        localStorage.removeItem('token');
        window.location.href = '/connexion';
    }
    // Gérer les erreurs d'autorisation (403)
    if (error.response && error.response.status === 403) {
        window.location.href = '/acces-refuse';
    }
    return Promise.reject(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Une erreur est survenue');
});
exports.default = api;
//# sourceMappingURL=api.service.js.map