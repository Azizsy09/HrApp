import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';  // <-- AJOUTEZ throwError
import { Router } from '@angular/router';
import { User, AuthResponse, LoginRequest, MOCK_USERS } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private tokenKey = 'auth_token';
  private userKey = 'current_user';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadStoredSession();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const user = MOCK_USERS.find(u => u.email === credentials.email);

    if (!user || credentials.password !== 'password123') {
      return throwError(() => new Error('Email ou mot de passe incorrect'));  // <-- RETOURNE throwError
    }

    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

    const authResponse: AuthResponse = {
      user,
      token,
      expiresAt
    };

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      localStorage.setItem('token_expires', expiresAt);
    }

    this.currentUserSubject.next(user);

    return of(authResponse);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
      localStorage.removeItem('token_expires');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = localStorage.getItem(this.tokenKey);
    const expiresAt = localStorage.getItem('token_expires');

    if (!token || !expiresAt) {
      return false;
    }

    return new Date(expiresAt) > new Date();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  private generateToken(): string {
    return 'mock_jwt_token_' + Math.random().toString(36).substr(2, 9);
  }

  private loadStoredSession(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const storedUser = localStorage.getItem(this.userKey);
    const token = localStorage.getItem(this.tokenKey);
    const expiresAt = localStorage.getItem('token_expires');

    if (storedUser && token && expiresAt && new Date(expiresAt) > new Date()) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
    } else {
      this.logout();
    }
  }
}