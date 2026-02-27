import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LeaveService } from '../leave';
import { AuthService } from '../../auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-create',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './leave-create.html',
  styleUrl: './leave-create.css',
})
export class LeaveCreate implements OnInit {

  leaveForm: FormGroup;
  isSubmitting = false;
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: AuthService,
    private router: Router
  ) {
    this.minDate.setHours(0, 0, 0, 0); // Début de journée

    this.leaveForm = this.fb.group({
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['']
    });

    // Validation : la date de fin doit être après la date de début
    this.leaveForm.get('startDate')?.valueChanges.subscribe(startDate => {
      if (startDate) {
        this.leaveForm.get('endDate')?.setValidators([
          Validators.required,
          this.dateValidator.bind(this)
        ]);
        this.leaveForm.get('endDate')?.updateValueAndValidity();
      }
    });
  }

  ngOnInit(): void {
    // Pré-remplir avec l'utilisateur actuel si nécessaire
  }

  dateValidator(control: any): { [key: string]: any } | null {
    const startDate = this.leaveForm?.get('startDate')?.value;
    const endDate = control.value;

    if (startDate && endDate && endDate < startDate) {
      return { 'invalidDateRange': true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      this.isSubmitting = true;

      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        alert('Utilisateur non authentifié');
        this.isSubmitting = false;
        return;
      }

      const formValue = this.leaveForm.value;

      const leaveRequest = {
        employeeId: currentUser.id,
        employeeName: `${currentUser.firstName} ${currentUser.lastName}`,
        type: formValue.type,
        startDate: this.formatDate(formValue.startDate),
        endDate: this.formatDate(formValue.endDate),
        reason: formValue.reason || ''
      };

      this.leaveService.requestLeave(leaveRequest).subscribe({
        next: (leave) => {
          this.isSubmitting = false;
          alert('Demande de congé envoyée avec succès !');
          this.router.navigate(['/leaves']);
        },
        error: (error) => {
          this.isSubmitting = false;
          alert('Erreur lors de l\'envoi de la demande : ' + error.message);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.leaveForm.controls).forEach(key => {
      this.leaveForm.get(key)?.markAsTouched();
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}