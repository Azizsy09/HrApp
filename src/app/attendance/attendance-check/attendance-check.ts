import { Component, OnInit, OnDestroy } from '@angular/core';
import { AttendanceService } from '../attendance';
import { AttendanceRecord, EmployeeCard, EMPLOYEE_CARDS } from '../attendance.model';  // <-- CORRIGEZ l'import
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-attendance-check',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
  ],
  templateUrl: './attendance-check.html',
  styleUrl: './attendance-check.css',
})
export class AttendanceCheck implements OnInit, OnDestroy {

  today = new Date();
  currentTime = '';
  currentRecord?: AttendanceRecord;
  currentEmployee?: EmployeeCard;  // <-- AJOUTEZ CETTE PROPRIÉTÉ
  todayRecords: AttendanceRecord[] = [];
  hasCheckedIn = false;
  hasCheckedOut = false;
  isScanning = false;  // <-- AJOUTEZ CETTE PROPRIÉTÉ
  private timeSubscription?: Subscription;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.loadCurrentStatus();
    this.loadTodayRecords();
    this.startClock();
  }

  ngOnDestroy(): void {
    if (this.timeSubscription) {
      this.timeSubscription.unsubscribe();
    }
  }

  private startClock(): void {
    this.updateTime();
    this.timeSubscription = interval(1000).subscribe(() => {
      this.updateTime();
    });
  }

  private updateTime(): void {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }

  loadCurrentStatus() {
    if (this.currentEmployee) {
      this.attendanceService.getCurrentStatus(this.currentEmployee.employeeId).subscribe(status => {
        this.hasCheckedIn = status.checkedIn;
        this.hasCheckedOut = status.checkedOut;
        this.currentRecord = status.currentRecord;
      });
    }
  }

  loadTodayRecords() {
    this.attendanceService.getTodayAttendance().subscribe(records => {
      this.todayRecords = records;
    });
  }

  // <-- AJOUTEZ CES MÉTHODES MANQUANTES
  startScanning() {
    this.isScanning = true;
    setTimeout(() => {
      this.simulateQrScan();
    }, 2000);
  }

  private simulateQrScan() {
    const scannedCard = EMPLOYEE_CARDS[0]; // Alice Dupont
    this.employeeScanned(scannedCard);
  }

  employeeScanned(card: EmployeeCard) {
    this.currentEmployee = card;
    this.isScanning = false;
    this.loadCurrentStatus();
    this.showSuccessMessage(`Bienvenue ${card.employeeName} !`, 'scan');
  }

  showManualEntry() {
    const employeeId = prompt('Entrez votre ID employé (1 ou 2):');
    if (employeeId) {
      const card = EMPLOYEE_CARDS.find(c => c.employeeId.toString() === employeeId);
      if (card) {
        this.employeeScanned(card);
      } else {
        alert('ID employé non trouvé');
      }
    }
  }

  showCardNumber() {
    const cardNumbers = EMPLOYEE_CARDS.map(c => `${c.employeeName}: ${c.cardNumber}`).join('\n');
    alert('Cartes disponibles:\n' + cardNumbers);
  }

  checkIn() {
    if (!this.currentEmployee) return;

    this.attendanceService.checkIn(this.currentEmployee.employeeId, this.currentEmployee.employeeName).subscribe({
      next: (record) => {
        this.currentRecord = record;
        this.hasCheckedIn = true;
        this.loadTodayRecords();
        this.showSuccessMessage(`Arrivée pointée à ${record.checkInTime}`, 'check-in');
      },
      error: (error) => {
        this.showErrorMessage(error.message);
      }
    });
  }

  checkOut() {
    if (!this.currentEmployee) return;

    this.attendanceService.checkOut(this.currentEmployee.employeeId).subscribe({
      next: (record) => {
        this.currentRecord = record;
        this.hasCheckedOut = true;
        this.showSuccessMessage(`Départ pointé à ${record.checkOutTime}. Total: ${record.totalHours}h`, 'check-out');
      },
      error: (error) => {
        this.showErrorMessage(error.message);
      }
    });
  }

  private showSuccessMessage(message: string, type: string) {
    alert(`✅ ${message}`);
  }

  private showErrorMessage(message: string) {
    alert(`❌ Erreur: ${message}`);
  }

  getStatusLabel(status: string): string {
    const labels: {[key: string]: string} = {
      'present': 'À l\'heure',
      'late': 'En retard',
      'absent': 'Absent',
      'pending': 'En attente'
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getPresentCount(): number {
    return this.todayRecords.filter(r => r.status === 'present').length;
  }

  getLateCount(): number {
    return this.todayRecords.filter(r => r.status === 'late').length;
  }

  getAbsentCount(): number {
    return 3 - this.todayRecords.length;
  }
}