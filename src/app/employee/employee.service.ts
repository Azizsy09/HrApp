import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    { id: 1, firstName: 'Alice', lastName: 'Dupont', email: 'alice@mail.com', hireDate: '2023-01-10', totalLeaveDays: 30, remainingLeaveDays: 20 },
    { id: 2, firstName: 'Bob', lastName: 'Martin', email: 'bob@mail.com', hireDate: '2022-03-15', totalLeaveDays: 30, remainingLeaveDays: 15 },
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  addEmployee(emp: Employee): Observable<Employee> {
    emp.id = this.employees.length + 1;
    this.employees.push(emp);
    return of(emp);
  }
}
