import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    credits: number;
    isDriver: boolean;
    isPassenger: boolean;
    role: string;
  };
}

const setAuthToken = (token: string) => {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    const { token, user } = response.data;
    
    setAuthToken(token);
    
    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Erreur lors de l\'inscription';
    }
    throw 'Erreur lors de l\'inscription';
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    const { token, user } = response.data;
    
    setAuthToken(token);
    
    return { token, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Erreur lors de la connexion';
    }
    throw 'Erreur lors de la connexion';
  }
};

export const logout = (): void => {
  setAuthToken('');
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non authentifié');
    }
    
    setAuthToken(token);
    
    const response = await axios.get(`${API_URL}/auth/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        throw error.response?.data?.message || 'Erreur lors de la récupération du profil';
    }
    throw 'Erreur lors de la récupération du profil';
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const initializeAuth = (): void => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
};