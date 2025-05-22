import type { User } from './user.types';

export interface Issue {
  id: number;
  rideId: number;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  driver: UserWithContact;
  passenger: UserWithContact;
  description: string;
  status: string;
  createdAt: string;
}

export interface IssueResolution {
  id?: number;
  issueId: number;
  note: string;
  resolvedById: number;
  resolvedAt: string;
}

export interface UserWithContact extends User {
  phone?: string;
}