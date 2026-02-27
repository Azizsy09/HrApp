export interface Leave {
    id: number;
    employeeId: number;
    employeeName: string;
    startDate: string;
    endDate: string;
    type: LeaveType;
    reason: string;
    status: LeaveStatus;
    requestedAt: string;
    approvedAt?: string;
    approvedBy?: string;
    comments?: string;
  }
  
  export type LeaveType = 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'other';
  
  export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
  
  export const LEAVE_TYPES = [
    { value: 'vacation', label: 'Congés payés', icon: 'beach_access' },
    { value: 'sick', label: 'Maladie', icon: 'local_hospital' },
    { value: 'personal', label: 'Personnel', icon: 'person' },
    { value: 'maternity', label: 'Maternité', icon: 'pregnant_woman' },
    { value: 'paternity', label: 'Paternité', icon: 'child_care' },
    { value: 'other', label: 'Autre', icon: 'more_horiz' }
  ];
  
  export const LEAVE_STATUSES = [
    { value: 'pending', label: 'En attente', color: 'orange', icon: 'schedule' },
    { value: 'approved', label: 'Approuvé', color: 'green', icon: 'check_circle' },
    { value: 'rejected', label: 'Refusé', color: 'red', icon: 'cancel' },
    { value: 'cancelled', label: 'Annulé', color: 'gray', icon: 'block' }
  ];