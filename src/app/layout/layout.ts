import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';  // <-- AJOUTEZ CETTE LIGNE

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { AuthService } from '../auth/auth.service';  // <-- UNIQUEMENT AuthService
import { User } from '../auth/auth.model';  // <-- User depuis auth.model

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,  // <-- AJOUTEZ CETTE LIGNE
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout implements AfterViewInit {

  isMobile = false;
  isSidenavOpen = true;
  currentUser: User | null = null;  // <-- AJOUTEZ CETTE PROPRIÉTÉ
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService  // <-- AJOUTEZ CETTE LIGNE
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      // If sidenav is available (after view init) open/close via API,
      // otherwise keep the boolean for initial state.
      if (this.sidenav) {
        if (this.isMobile) {
          this.sidenav.close();
        } else {
          this.sidenav.open();
        }
      } else {
        this.isSidenavOpen = !this.isMobile;
      }
    });

    // Écouter les changements d'utilisateur
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidenav() {
    if (this.isMobile && this.sidenav) {
      this.sidenav.toggle();
    } else {
      // desktop: keep controlling via boolean if needed
      if (this.sidenav) {
        this.sidenav.toggle();
      }
      this.isSidenavOpen = !this.isSidenavOpen;
    }
  }

  logout() {  // <-- AJOUTEZ CETTE MÉTHODE
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    // Ensure initial sidenav state after view is ready
    if (this.sidenav) {
      if (this.isMobile) {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    }
  }
}