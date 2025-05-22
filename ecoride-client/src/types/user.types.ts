import type { Vehicle } from "./vehicle.types";

// Union types au lieu des enums
export type UserRole = 'USER' | 'EMPLOYEE' | 'ADMIN';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// Interfaces
export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  credits: number;
  isDriver: boolean;
  isPassenger: boolean;
  createdAt?: string;
  updatedAt?: string;
  suspendedUntil?: string | null;
  role: UserRole;
  driverProfile?: DriverProfile;
}

export interface DriverProfile {
  id: number;
  userId: number;
  vehicles?: Vehicle[];
  preferences?: DriverPreference;
  rating: number;
  reviewCount: number;
}

export interface DriverPreference {
  id: number;
  driverProfileId: number;
  smoking: boolean;
  animals: boolean;
  music?: string;
  conversation?: string;
  otherPreferences?: string;
}

export interface Review {
  id: number;
  giverId: number;
  receiverId: number;
  rating: number;
  comment?: string;
  status: ReviewStatus;
  createdAt: string;
}

// Pour l'affichage dans l'UI, un Driver simplifié
export interface Driver {
  id: number;
  username: string;
  photo?: string;
  rating: number;
  reviews?: Review[];
}

// Type pour les employés avec statut
export type EmployeeStatus = 'ACTIVE' | 'SUSPENDED';

export interface Employee extends User {
  status: EmployeeStatus;
}

export interface EmployeeFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}