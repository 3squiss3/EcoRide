"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateUser = exports.suspendUser = exports.getUsers = exports.toggleEmployeeStatus = exports.createEmployee = exports.getEmployees = exports.getStats = void 0;
const api_service_1 = __importDefault(require("./api.service"));
// Obtenir les statistiques
const getStats = async () => {
    return api_service_1.default.get('/admin/stats');
};
exports.getStats = getStats;
// Obtenir la liste des employés
const getEmployees = async () => {
    return api_service_1.default.get('/admin/employees');
};
exports.getEmployees = getEmployees;
// Créer un nouvel employé
const createEmployee = async (data) => {
    return api_service_1.default.post('/admin/employees', data);
};
exports.createEmployee = createEmployee;
// Suspendre/réactiver un employé
const toggleEmployeeStatus = async (employeeId, status) => {
    return api_service_1.default.patch(`/admin/employees/${employeeId}/status`, { status });
};
exports.toggleEmployeeStatus = toggleEmployeeStatus;
// Obtenir la liste des utilisateurs
const getUsers = async () => {
    return api_service_1.default.get('/admin/users');
};
exports.getUsers = getUsers;
// Suspendre un utilisateur
const suspendUser = async (data) => {
    return api_service_1.default.post('/admin/users/suspend', data);
};
exports.suspendUser = suspendUser;
// Réactiver un utilisateur
const reactivateUser = async (userId) => {
    return api_service_1.default.patch(`/admin/users/${userId}/reactivate`);
};
exports.reactivateUser = reactivateUser;
//# sourceMappingURL=admin.service.js.map