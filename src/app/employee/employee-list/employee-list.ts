import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  displayedColumns: string[] = ['avatar', 'name', 'hireDate', 'leaves', 'actions'];
  isMobile = false;

  // Filtres
  globalSearch = '';
  firstNameFilter = '';
  lastNameFilter = '';
  emailFilter = '';
  hireDateFilter = '';

  constructor(
    private employeeService: EmployeeService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = [...this.employees];

    // Filtre recherche globale
    if (this.globalSearch.trim()) {
      const searchTerm = this.globalSearch.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.firstName.toLowerCase().includes(searchTerm) ||
        employee.lastName.toLowerCase().includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par prénom
    if (this.firstNameFilter.trim()) {
      const firstNameTerm = this.firstNameFilter.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.firstName.toLowerCase().includes(firstNameTerm)
      );
    }

    // Filtre par nom
    if (this.lastNameFilter.trim()) {
      const lastNameTerm = this.lastNameFilter.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.lastName.toLowerCase().includes(lastNameTerm)
      );
    }

    // Filtre par email
    if (this.emailFilter.trim()) {
      const emailTerm = this.emailFilter.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.email.toLowerCase().includes(emailTerm)
      );
    }

    // Filtre par date d'embauche
    if (this.hireDateFilter) {
      const now = new Date();
      filtered = filtered.filter(employee => {
        const hireDate = new Date(employee.hireDate);
        switch (this.hireDateFilter) {
          case 'thisMonth':
            return hireDate.getMonth() === now.getMonth() &&
                   hireDate.getFullYear() === now.getFullYear();
          case 'lastMonth':
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
            return hireDate.getMonth() === lastMonth.getMonth() &&
                   hireDate.getFullYear() === lastMonth.getFullYear();
          case 'thisYear':
            return hireDate.getFullYear() === now.getFullYear();
          case 'lastYear':
            return hireDate.getFullYear() === now.getFullYear() - 1;
          default:
            return true;
        }
      });
    }

    this.filteredEmployees = filtered;
  }

  clearAllFilters() {
    this.globalSearch = '';
    this.firstNameFilter = '';
    this.lastNameFilter = '';
    this.emailFilter = '';
    this.hireDateFilter = '';
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return !!(this.globalSearch || this.firstNameFilter || this.lastNameFilter ||
              this.emailFilter || this.hireDateFilter);
  }
}