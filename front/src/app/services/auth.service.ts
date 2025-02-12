// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

interface LoginResponse {
  token: string;
  roles: string[];
  redirectUrl: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { headers: { 'Content-Type': 'application/json' } });


      /*

      .pipe(
        tap(response => {
          if (response.token) {
            // Stockage du token et des informations utilisateur
            localStorage.setItem('roles', JSON.stringify(response.roles));
            localStorage.setItem('email', response.email);
          }
        }),
        map(response => {
          // S'assurer que redirectUrl commence par '/'
          if (response.redirectUrl && !response.redirectUrl.startsWith('/')) {
            response.redirectUrl = '/' + response.redirectUrl;
          }
          return response;
        })
      );

      */
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('email');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes('ROLE_ADMIN');
  }
}
