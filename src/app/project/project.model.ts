export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    managerId: number;
    managerName: string;
    assignedEmployees: ProjectAssignment[];
    budget?: number;
    progress: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface ProjectAssignment {
    employeeId: number;
    employeeName: string;
    role: string;
    startDate: string;
    endDate: string;
    hoursAllocated: number;
    status: AssignmentStatus;
  }
  
  export type ProjectStatus = 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical';
  export type AssignmentStatus = 'assigned' | 'active' | 'completed' | 'removed';
  
  export const PROJECT_STATUSES = [
    { value: 'planning', label: 'Planification', color: 'blue', icon: 'schedule' },
    { value: 'active', label: 'Actif', color: 'green', icon: 'play_arrow' },
    { value: 'on-hold', label: 'En pause', color: 'orange', icon: 'pause' },
    { value: 'completed', label: 'Terminé', color: 'purple', icon: 'check_circle' },
    { value: 'cancelled', label: 'Annulé', color: 'red', icon: 'cancel' }
  ];
  
  export const PROJECT_PRIORITIES = [
    { value: 'low', label: 'Faible', color: 'green' },
    { value: 'medium', label: 'Moyenne', color: 'yellow' },
    { value: 'high', label: 'Élevée', color: 'orange' },
    { value: 'critical', label: 'Critique', color: 'red' }
  ];