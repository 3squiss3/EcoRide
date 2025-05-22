import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les réponses et les erreurs
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('Erreur API:', error);
    
    // Gérer les erreurs d'authentification (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/connexion';
    }
    
    // Gérer les erreurs d'autorisation (403)
    if (error.response && error.response.status === 403) {
      window.location.href = '/acces-refuse';
    }
    
    return Promise.reject(
      error.response?.data?.message || 'Une erreur est survenue'
    );
  }
);

export default api;