export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    department?: string;
    isActive: boolean;
    lastLogin?: string;
  }
  
  export type UserRole = 'admin' | 'hr' | 'manager' | 'employee';
  
  export interface AuthResponse {
    user: User;
    token: string;
    expiresAt: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export const USER_ROLES = [
    { value: 'admin', label: 'Administrateur', color: 'red' },
    { value: 'hr', label: 'Ressources Humaines', color: 'blue' },
    { value: 'manager', label: 'Manager', color: 'green' },
    { value: 'employee', label: 'Employé', color: 'gray' }
  ];
  
  export const MOCK_USERS: User[] = [
    {
      id: 1,
      email: 'admin@company.com',
      firstName: 'Admin',
      lastName: 'System',
      role: 'admin',
      department: 'IT',
      isActive: true,
      lastLogin: '2024-12-10T08:30:00Z'
    },
    {
      id: 2,
      email: 'alice.dupont@company.com',
      firstName: 'Alice',
      lastName: 'Dupont',
      role: 'employee',
      department: 'Marketing',
      isActive: true,
      lastLogin: '2024-12-10T09:00:00Z'
    },
    {
      id: 3,
      email: 'hr@company.com',
      firstName: 'Marie',
      lastName: 'Dubois',
      role: 'hr',
      department: 'RH',
      isActive: true,
      lastLogin: '2024-12-10T08:45:00Z'
    }
  ];