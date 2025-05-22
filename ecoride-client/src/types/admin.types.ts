import type { EmployeeStatus, UserRole } from './user.types';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  credits: number;
  isDriver: boolean;
  isPassenger: boolean;
  createdAt: string;
  status: 'ACTIVE' | 'SUSPENDED';
  suspendedUntil?: string | null;
  role?: UserRole;
}

export interface ReviewUser {
  id: number;
  username: string;
  email: string;
}

export interface PendingReview {
  id: number;
  giver: ReviewUser;
  receiver: ReviewUser;
  rating: number;
  comment: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  ride: {
    id: number;
    departureCity: string;
    arrivalCity: string;
    departureDate: string;
  };
}

export interface AdminEmployee {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  status: EmployeeStatus;
}

export interface RideStat {
  date: string;
  count: number;
  credits: number;
}