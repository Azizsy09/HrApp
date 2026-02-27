import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AttendanceRecord } from './attendance.model';  // <-- AJOUTEZ CET IMPORT

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private attendanceRecords: AttendanceRecord[] = [
    {
      id: 1,
      employeeId: 1,
      employeeName: 'Alice Dupont',
      date: '2024-12-10',
      checkInTime: '09:00',
      checkOutTime: '17:30',
      totalHours: 8.5,
      status: 'present'
    },
    {
      id: 2,
      employeeId: 2,
      employeeName: 'Bob Martin',
      date: '2024-12-10',
      checkInTime: '09:15',
      checkOutTime: '17:00',
      totalHours: 7.75,
      status: 'late'
    }
  ];

  // <-- AJOUTEZ TOUTES CES MÉTHODES
  checkIn(employeeId: number, employeeName: string): Observable<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().substring(0, 5);

    const existingRecord = this.attendanceRecords.find(
      record => record.employeeId === employeeId && record.date === today
    );

    if (existingRecord && existingRecord.checkInTime) {
      throw new Error('Déjà pointé aujourd\'hui');
    }

    if (existingRecord) {
      existingRecord.checkInTime = now;
      existingRecord.status = now > '09:00' ? 'late' : 'present';
      return of(existingRecord);
    }

    const newRecord: AttendanceRecord = {
      id: this.attendanceRecords.length + 1,
      employeeId,
      employeeName,
      date: today,
      checkInTime: now,
      status: now > '09:00' ? 'late' : 'present'
    };

    this.attendanceRecords.push(newRecord);
    return of(newRecord);
  }

  checkOut(employeeId: number): Observable<AttendanceRecord> {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().substring(0, 5);

    const record = this.attendanceRecords.find(
      record => record.employeeId === employeeId && record.date === today
    );

    if (!record || !record.checkInTime) {
      throw new Error('Aucun check-in trouvé');
    }

    record.checkOutTime = now;
    
    const checkIn = new Date(`2024-01-01T${record.checkInTime}`);
    const checkOut = new Date(`2024-01-01T${record.checkOutTime}`);
    record.totalHours = Math.round(((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60)) * 100) / 100;

    return of(record);
  }

  getCurrentStatus(employeeId: number): Observable<{checkedIn: boolean, checkedOut: boolean, currentRecord?: AttendanceRecord}> {
    const today = new Date().toISOString().split('T')[0];
    const record = this.attendanceRecords.find(
      r => r.employeeId === employeeId && r.date === today
    );

    return of({
      checkedIn: !!(record?.checkInTime),
      checkedOut: !!(record?.checkOutTime),
      currentRecord: record
    });
  }

  getAttendanceRecords(): Observable<AttendanceRecord[]> {
    return of(this.attendanceRecords);
  }

  getTodayAttendance(): Observable<AttendanceRecord[]> {
    const today = new Date().toISOString().split('T')[0];
    return of(this.attendanceRecords.filter(record => record.date === today));
  }
}