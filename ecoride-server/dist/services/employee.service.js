"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveIssue = exports.getReportedIssues = exports.rejectReview = exports.approveReview = exports.getPendingReviews = void 0;
const api_service_1 = __importDefault(require("./api.service"));
// Obtenir les avis en attente
const getPendingReviews = async () => {
    return api_service_1.default.get('/employee/reviews/pending');
};
exports.getPendingReviews = getPendingReviews;
// Approuver un avis
const approveReview = async (reviewId) => {
    return api_service_1.default.patch(`/employee/reviews/${reviewId}/approve`);
};
exports.approveReview = approveReview;
// Rejeter un avis
const rejectReview = async (reviewId) => {
    return api_service_1.default.patch(`/employee/reviews/${reviewId}/reject`);
};
exports.rejectReview = rejectReview;
// Obtenir les problèmes signalés
const getReportedIssues = async () => {
    return api_service_1.default.get('/employee/issues');
};
exports.getReportedIssues = getReportedIssues;
// Résoudre un problème
const resolveIssue = async (issueId, note) => {
    return api_service_1.default.patch(`/employee/issues/${issueId}/resolve`, { note });
};
exports.resolveIssue = resolveIssue;
//# sourceMappingURL=employee.service.js.map