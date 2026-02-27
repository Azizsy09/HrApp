import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance';
import { AttendanceRecord } from '../attendance.model';  // <-- NOUVELLE LIGNE
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance-list',
  imports: [
    MatTableModule,
    CommonModule
  ],
  templateUrl: './attendance-list.html',
  styleUrl: './attendance-list.css',
})
export class AttendanceList implements OnInit {

  records: AttendanceRecord[] = [];
  displayedColumns: string[] = ['date', 'employee', 'checkIn', 'checkOut', 'hours', 'status'];

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.attendanceService.getAttendanceRecords().subscribe(data => {
      this.records = data;
    });
  }

  getStatusLabel(status: string): string {
    const labels: {[key: string]: string} = {
      'present': 'Présent',
      'absent': 'Absent',
      'late': 'En retard',
      'half-day': 'Demi-journée',
      'pending': 'En attente'
    };
    return labels[status] || status;
  }
}