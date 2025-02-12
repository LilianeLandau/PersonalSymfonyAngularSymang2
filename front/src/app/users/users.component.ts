// src/app/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users-container">
      <h2>Liste des utilisateurs</h2>

      @if (loading) {
        <p>Chargement...</p>
      } @else {
        <table class="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Rôles</th>
            </tr>
          </thead>
          <tbody>
            @for (user of users; track user.id) {
              <tr>
                <td>{{ user.email }}</td>
                <td>{{ user.roles.join(', ') }}</td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .users-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }
    .users-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .users-table th, .users-table td {
      padding: 0.75rem;
      border: 1px solid #ddd;
      text-align: left;
    }
    .users-table th {
      background-color: #f5f5f5;
    }
  `]
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<User[]>('http://localhost:8000/api/users')
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des utilisateurs:', error);
          this.loading = false;
        }
      });
  }
}
