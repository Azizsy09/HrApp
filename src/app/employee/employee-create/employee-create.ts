import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-create',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreate {

  employeeForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
      totalLeaveDays: [30, [Validators.required, Validators.min(0)]],
      remainingLeaveDays: [30, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.isSubmitting = true;
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (emp) => {
          alert(`Employé ${emp.firstName} ${emp.lastName} ajouté avec succès !`);
          this.employeeForm.reset({ totalLeaveDays: 30, remainingLeaveDays: 30 });
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          alert('Erreur lors de la création de l\'employé');
          this.isSubmitting = false;
        }
      });
    } else {
      // Marquer tous les champs comme touched pour afficher les erreurs
      Object.keys(this.employeeForm.controls).forEach(key => {
        this.employeeForm.get(key)?.markAsTouched();
      });
    }
  }
}