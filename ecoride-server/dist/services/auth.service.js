"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAuth = exports.getToken = exports.isAuthenticated = exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'http://localhost:5000/api';
const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else {
        localStorage.removeItem('token');
        delete axios_1.default.defaults.headers.common['Authorization'];
    }
};
const register = async (data) => {
    var _a, _b;
    try {
        const response = await axios_1.default.post(`${API_URL}/auth/register`, data);
        const { token, user } = response.data;
        setAuthToken(token);
        return { token, user };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de l\'inscription';
        }
        throw 'Erreur lors de l\'inscription';
    }
};
exports.register = register;
const login = async (data) => {
    var _a, _b;
    try {
        const response = await axios_1.default.post(`${API_URL}/auth/login`, data);
        const { token, user } = response.data;
        setAuthToken(token);
        return { token, user };
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de la connexion';
        }
        throw 'Erreur lors de la connexion';
    }
};
exports.login = login;
const logout = () => {
    setAuthToken('');
};
exports.logout = logout;
const getProfile = async () => {
    var _a, _b;
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Non authentifié');
        }
        setAuthToken(token);
        const response = await axios_1.default.get(`${API_URL}/auth/profile`);
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Erreur lors de la récupération du profil';
        }
        throw 'Erreur lors de la récupération du profil';
    }
};
exports.getProfile = getProfile;
const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
exports.isAuthenticated = isAuthenticated;
const getToken = () => {
    return localStorage.getItem('token');
};
exports.getToken = getToken;
const initializeAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
        setAuthToken(token);
    }
};
exports.initializeAuth = initializeAuth;
//# sourceMappingURL=auth.service.js.map