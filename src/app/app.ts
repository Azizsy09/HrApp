import { Component, signal, OnInit } from '@angular/core';  // <-- AJOUTEZ OnInit
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {  // <-- IMPLEMENTS OnInit
  protected readonly title = signal('HrApp');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {  // <-- DÉPLACEZ LA LOGIQUE ICI
    // Petite attente pour laisser le temps au service de charger la session
    setTimeout(() => {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
      }
    }, 100);
  }
}