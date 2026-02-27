export interface AttendanceRecord {
    id: number;
    employeeId: number;
    employeeName: string;
    date: string;
    checkInTime?: string;
    checkOutTime?: string;
    totalHours?: number;
    status: AttendanceStatus;
    notes?: string;
  }
  
  export type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day' | 'pending';
  
  export interface EmployeeCard {
    id: number;
    employeeId: number;
    employeeName: string;
    qrCode: string; // Code unique pour chaque employé
    cardNumber: string;
    isActive: boolean;
  }
  
  export const EMPLOYEE_CARDS: EmployeeCard[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Alice Dupont',
      qrCode: 'EMP001-ALICE-DUPONT',
      cardNumber: 'CARD-001',
      isActive: true
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Bob Martin',
      qrCode: 'EMP002-BOB-MARTIN',
      cardNumber: 'CARD-002',
      isActive: true
    }
  ];