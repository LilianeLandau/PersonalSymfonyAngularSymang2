//welcome.component.ts (Composant de bienvenue)
// Import des modules nécessaires depuis Angular
import { Component } from '@angular/core';          // Permet de définir un composant Angular
import { CommonModule } from '@angular/common';     // Fournit des directives Angular de base comme *ngIf, *ngFor, etc.
import { AuthService } from '../services/auth.service'; // Service d'authentification pour gérer la déconnexion
import { Router } from '@angular/router';           // Service de routage pour naviguer entre les pages de l'application

@Component({
  selector: 'app-welcome',    // Nom du sélecteur HTML pour ce composant (utilisable comme <app-welcome></app-welcome>)
  standalone: true,           // Rend le composant autonome, sans besoin d'être déclaré dans un module Angular
  imports: [CommonModule],    // Import des fonctionnalités communes d'Angular
  template: `                 // Définition du template HTML directement dans le fichier TypeScript
    <div class="welcome-container">  <!-- Conteneur principal pour le style -->
      <h2>Bienvenue!</h2>            <!-- Titre de la page de bienvenue -->
      <p>Vous êtes maintenant connecté.</p> <!-- Message d'accueil -->

      <!-- Bouton de déconnexion qui appelle la méthode logout() lors du clic -->
      <button class="btn btn-danger" (click)="logout()">
        Se déconnecter
      </button>
    </div>
  `,
  styles: [`
    /* Styles CSS pour la mise en forme de la page de bienvenue */
    .welcome-container {
      max-width: 600px;        /* Limite la largeur du conteneur */
      margin: 2rem auto;       /* Centre le conteneur verticalement et horizontalement */
      padding: 2rem;           /* Espace intérieur autour du contenu */
      text-align: center;      /* Centre le texte à l'intérieur du conteneur */
    }

    .btn-danger {
      background-color: #dc3545; /* Couleur de fond rouge pour le bouton de déconnexion */
      color: white;              /* Couleur du texte en blanc */
      padding: 0.75rem 1.5rem;   /* Espacement intérieur pour agrandir le bouton */
      border: none;              /* Suppression des bordures par défaut */
      border-radius: 4px;        /* Coins légèrement arrondis pour un effet plus doux */
      cursor: pointer;           /* Change le curseur en "main" lors du survol */
    }
  `]
})
export class WelcomeComponent {
  // Injection des services nécessaires via le constructeur
  constructor(
    private authService: AuthService, // Service pour gérer les opérations d'authentification (login/logout)
    private router: Router            // Service de navigation pour rediriger l'utilisateur après la déconnexion
  ) {}

  // Méthode appelée lorsque l'utilisateur clique sur le bouton "Se déconnecter"
  logout(): void {
    this.authService.logout();         // Appelle la méthode de déconnexion du service AuthService
    this.router.navigate(['/login']);  // Redirige l'utilisateur vers la page de connexion après déconnexion
  }
}

