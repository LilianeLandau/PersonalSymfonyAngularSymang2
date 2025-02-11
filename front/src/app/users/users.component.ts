import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User, ApiResponse } from '../models/user.model'; // Import des interfaces

@Component({
  selector: 'app-users', // Sélecteur du composant (utilisé dans le HTML parent)
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import des modules nécessaires
  templateUrl: './users.component.html',     // Fichier HTML associé
  styleUrls: ['./users.component.css']       // Fichier CSS associé
  // Suppression de 'providers' car UserService est déjà injecté globalement
})
export class UsersComponent implements OnInit {
  users: User[] = [];       // Tableau typé pour stocker les utilisateurs
  error: string = '';       // Message d'erreur en cas de problème
  loading: boolean = true;  // Indicateur de chargement

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); // Charge les utilisateurs au démarrage du composant
  }

  loadUsers(): void {
    this.loading = true; // Active l'indicateur de chargement

    this.userService.getUsers().subscribe({
      next: (response: ApiResponse) => {   // Typage de la réponse API
        this.users = response.member;      // On stocke les utilisateurs dans le tableau
        this.loading = false;              // Désactive l'indicateur de chargement
      },
      error: (err) => {                    // Gestion des erreurs
        console.error('Erreur lors du chargement des utilisateurs :', err);
        this.error = 'Impossible de charger les utilisateurs.';
        this.loading = false;              // Désactive l'indicateur de chargement même en cas d'erreur
      }
    });
  }
}
