import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project, PROJECT_STATUSES, PROJECT_PRIORITIES } from '../project.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-list',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    RouterModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.css',
})
export class ProjectList implements OnInit {

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  statusFilter = 'all';
  isMobile = false;

  constructor(
    private projectService: ProjectService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      this.applyFilters();
    });
  }

  applyFilters() {
    if (this.statusFilter === 'all') {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.status === this.statusFilter
      );
    }
  }

  viewProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  getStatusLabel(status: string): string {
    return PROJECT_STATUSES.find(s => s.value === status)?.label || status;
  }

  getStatusIcon(status: string): string {
    return PROJECT_STATUSES.find(s => s.value === status)?.icon || 'help';
  }

  getPriorityLabel(priority: string): string {
    return PROJECT_PRIORITIES.find(p => p.value === priority)?.label || priority;
  }

  getProjectsCount(status: string): number {
    if (status === 'all') return this.projects.length;
    return this.projects.filter(p => p.status === status).length;
  }
}