import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';  // <-- Import depuis le modèle

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.html',
  styleUrls: ['./employee-create.scss']
})
export class EmployeeCreate {

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      hireDate: ['', Validators.required],
      totalLeaveDays: [30, Validators.required],
      remainingLeaveDays: [30, Validators.required]
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      this.employeeService.addEmployee(newEmployee).subscribe(emp => {
        alert(`Employé ${emp.firstName} ${emp.lastName} ajouté !`);
        this.employeeForm.reset({ totalLeaveDays: 30, remainingLeaveDays: 30 });
      });
    }
  }
}