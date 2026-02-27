import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  totalEmployees = 25;
  activeEmployees = 20;
  onLeave = 5;

  // Nouvelles données pour les statistiques avancées
  delayedProjects = [
    {
      name: 'Refonte site web RH',
      endDate: '2024-12-31',
      daysLate: 5
    },
    {
      name: 'Migration serveur',
      endDate: '2024-12-15',
      daysLate: 12
    }
  ];

  pendingLeaves = [
    {
      employeeName: 'Alice Dupont',
      startDate: '2024-12-20',
      endDate: '2024-12-27'
    },
    {
      employeeName: 'Bob Martin',
      startDate: '2024-12-15',
      endDate: '2024-12-16'
    }
  ];

  departmentStats = [
    { name: 'IT', count: 8, percentage: 32 },
    { name: 'RH', count: 5, percentage: 20 },
    { name: 'Finance', count: 4, percentage: 16 },
    { name: 'Marketing', count: 3, percentage: 12 },
    { name: 'Ventes', count: 5, percentage: 20 }
  ];

  leaveEvolution = [
    { month: 'Jul', days: 45 },
    { month: 'Aoû', days: 38 },
    { month: 'Sep', days: 52 },
    { month: 'Oct', days: 41 },
    { month: 'Nov', days: 48 },
    { month: 'Déc', days: 35 }
  ];

  occupationRate = 87;
  productivityRate = 92;
  satisfactionRate = 4.2;
  retentionRate = 95;
  budgetUtilization = 78;
}