import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Leave {
  id: number;
  employeeId: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  type: string;
  reason: string;
  status: string;
  requestedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private leaves: Leave[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Alice Dupont',
      startDate: '2024-12-20',
      endDate: '2024-12-27',
      type: 'vacation',
      reason: 'Vacances de Noël',
      status: 'approved',
      requestedAt: '2024-11-15'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Bob Martin',
      startDate: '2024-12-15',
      endDate: '2024-12-16',
      type: 'sick',
      reason: 'Grippe',
      status: 'pending',
      requestedAt: '2024-12-10'
    }
  ];

  constructor() { }

  getLeaves(): Observable<Leave[]> {
    return of(this.leaves);
  }

  requestLeave(leave: Omit<Leave, 'id' | 'status' | 'requestedAt'>): Observable<Leave> {
    const newLeave: Leave = {
      ...leave,
      id: this.leaves.length + 1,
      status: 'pending',
      requestedAt: new Date().toISOString().split('T')[0]
    };
    this.leaves.push(newLeave);
    return of(newLeave);
  }
}