import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Layout } from './layout/layout';
import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) 
  },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Dashboard },
      { path: 'dashboard', component: Dashboard },
      { path: 'employees', loadComponent: () => import('./employee/employee-list/employee-list').then(m => m.EmployeeList) },
      { path: 'employees/create', loadComponent: () => import('./employee/employee-create/employee-create').then(m => m.EmployeeCreate) },
      { path: 'leaves', loadComponent: () => import('./leave/leave-list/leave-list').then(m => m.LeaveList) },
      { path: 'leaves/create', loadComponent: () => import('./leave/leave-create/leave-create').then(m => m.LeaveCreate) },
      { path: 'attendance', loadComponent: () => import('./attendance/attendance-check/attendance-check').then(m => m.AttendanceCheck) },
      { path: 'attendance/list', loadComponent: () => import('./attendance/attendance-list/attendance-list').then(m => m.AttendanceList) },
      { path: 'projects', loadComponent: () => import('./project/project-list/project-list').then(m => m.ProjectList) },
      { path: 'projects/create', loadComponent: () => import('./project/project-create/project-create').then(m => m.ProjectCreate) },
      { path: 'calendar', loadComponent: () => import('./planning/planning-calendar/planning-calendar').then(m => m.PlanningCalendar) },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


