import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project, ProjectAssignment } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[] = [
    {
      id: 1,
      name: 'Refonte site web RH',
      description: 'Modernisation complète de l\'interface employé',
      startDate: '2024-12-01',
      endDate: '2025-03-31',
      status: 'active',
      priority: 'high',
      managerId: 1,
      managerName: 'Alice Dupont',
      budget: 50000,
      progress: 35,
      createdAt: '2024-11-15',
      updatedAt: '2024-12-10',
      assignedEmployees: [
        {
          employeeId: 1,
          employeeName: 'Alice Dupont',
          role: 'Chef de projet',
          startDate: '2024-12-01',
          endDate: '2025-03-31',
          hoursAllocated: 160,
          status: 'active'
        },
        {
          employeeId: 2,
          employeeName: 'Bob Martin',
          role: 'Développeur Frontend',
          startDate: '2024-12-15',
          endDate: '2025-02-28',
          hoursAllocated: 120,
          status: 'assigned'
        }
      ]
    },
    {
      id: 2,
      name: 'Audit sécurité',
      description: 'Révision complète des protocoles de sécurité',
      startDate: '2025-01-15',
      endDate: '2025-02-28',
      status: 'planning',
      priority: 'critical',
      managerId: 3,
      managerName: 'Marie Dubois',
      budget: 25000,
      progress: 0,
      createdAt: '2024-12-01',
      updatedAt: '2024-12-01',
      assignedEmployees: []
    }
  ];

  constructor() { }

  getProjects(): Observable<Project[]> {
    return of(this.projects);
  }

  createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Observable<Project> {
    const newProject: Project = {
      ...project,
      id: this.projects.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    this.projects.push(newProject);
    return of(newProject);
  }

  assignEmployeeToProject(projectId: number, assignment: ProjectAssignment): Observable<Project> {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.assignedEmployees.push(assignment);
      project.updatedAt = new Date().toISOString().split('T')[0];
    }
    return of(project!);
  }
}