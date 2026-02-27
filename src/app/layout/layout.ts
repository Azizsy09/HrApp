import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';  // <-- AJOUTEZ CETTE LIGNE

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
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
  styleUrl: './layout.css'
})
export class Layout {

  isMobile = false;
  isSidenavOpen = true;
  currentUser: User | null = null;  // <-- AJOUTEZ CETTE PROPRIÉTÉ

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService  // <-- AJOUTEZ CETTE LIGNE
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
      if (this.isMobile) {
        this.isSidenavOpen = false;
      } else {
        this.isSidenavOpen = true;
      }
    });

    // Écouter les changements d'utilisateur
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  logout() {  // <-- AJOUTEZ CETTE MÉTHODE
    this.authService.logout();
  }
}