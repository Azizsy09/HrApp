import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../project.service';
import { EmployeeService } from '../../employee/employee.service';
import { Employee } from '../../employee/employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './project-create.html',
  styleUrl: './project-create.css',
})
export class ProjectCreate implements OnInit {

  projectForm: FormGroup;
  employees: Employee[] = [];
  selectedEmployeeIds: number[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      priority: ['medium', Validators.required],
      budget: [0],
      managerId: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  isEmployeeSelected(employeeId: number): boolean {
    return this.selectedEmployeeIds.includes(employeeId);
  }

  toggleEmployee(employeeId: number) {
    const index = this.selectedEmployeeIds.indexOf(employeeId);
    if (index > -1) {
      this.selectedEmployeeIds.splice(index, 1);
    } else {
      this.selectedEmployeeIds.push(employeeId);
    }
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.isSubmitting = true;

      const formValue = this.projectForm.value;

      // Créer les assignments pour les employés sélectionnés
      const assignedEmployees = this.selectedEmployeeIds.map(employeeId => {
        const employee = this.employees.find(e => e.id === employeeId)!;
        return {
          employeeId: employee.id,
          employeeName: `${employee.firstName} ${employee.lastName}`,
          role: 'Membre équipe',
          startDate: this.formatDate(formValue.startDate),
          endDate: this.formatDate(formValue.endDate),
          hoursAllocated: 40,
          status: 'assigned' as const
        };
      });

      const manager = this.employees.find(e => e.id === formValue.managerId)!;

      const projectData = {
        name: formValue.name,
        description: formValue.description,
        startDate: this.formatDate(formValue.startDate),
        endDate: this.formatDate(formValue.endDate),
        status: 'planning' as const,
        priority: formValue.priority,
        managerId: formValue.managerId,
        managerName: `${manager.firstName} ${manager.lastName}`,
        assignedEmployees,
        budget: formValue.budget || undefined,
        progress: 0
      };

      this.projectService.createProject(projectData).subscribe({
        next: (project) => {
          alert(`Projet "${project.name}" créé avec succès !`);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          alert('Erreur lors de la création du projet');
          this.isSubmitting = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.projectForm.controls).forEach(key => {
      this.projectForm.get(key)?.markAsTouched();
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}