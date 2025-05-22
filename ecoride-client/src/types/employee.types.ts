import type { User } from "./user.types";

export interface Employee extends User {
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
}

export interface EmployeeFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}