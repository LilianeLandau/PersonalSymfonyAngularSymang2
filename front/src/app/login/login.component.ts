// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Connexion</h2>

      @if (error) {
        <div class="alert alert-danger">
          {{ error }}
        </div>
      }

      <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="credentials.email"
            required
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            name="password"
            [(ngModel)]="credentials.password"
            required
            class="form-control"
          />
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="loading">
          @if (loading) {
            Connexion en cours...
          } @else {
            Se connecter
          }
        </button>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-control {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .btn {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn:disabled {
      background-color: #ccc;
    }
    .alert {
      padding: 0.75rem;
      margin-bottom: 1rem;
      border-radius: 4px;
    }
    .alert-danger {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }
  `]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.credentials.email || !this.credentials.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response); // Debug
        if (response.redirectUrl) {
          // S'assurer que l'URL est valide
          const url = response.redirectUrl.startsWith('/') ?
            response.redirectUrl.substring(1) : response.redirectUrl;
          console.log('Redirecting to:', url); // Debug
          this.router.navigate([url]);
        } else {
          this.router.navigate(['welcome']);
        }
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.error = 'Identifiants non reconnus';
        this.loading = false;
      }
    });
  }
}
