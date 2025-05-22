import api from './api.service';

// Obtenir les avis en attente
export const getPendingReviews = async () => {
  return api.get('/employee/reviews/pending');
};

// Approuver un avis
export const approveReview = async (reviewId: number | string) => {
  return api.patch(`/employee/reviews/${reviewId}/approve`);
};

// Rejeter un avis
export const rejectReview = async (reviewId: number | string) => {
  return api.patch(`/employee/reviews/${reviewId}/reject`);
};

// Obtenir les problèmes signalés
export const getReportedIssues = async () => {
  return api.get('/employee/issues');
};

// Résoudre un problème
export const resolveIssue = async (issueId: number | string, note: string) => {
  return api.patch(`/employee/issues/${issueId}/resolve`, { note });
};