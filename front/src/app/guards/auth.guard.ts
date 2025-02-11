// Créer un guard pour protéger les routes
// src/app/guards/auth.guard.ts
// Importation des modules nécessaires d'Angular
import { inject } from '@angular/core';                  // Permet d'injecter des services dans une fonction
import { Router, type CanActivateFn } from '@angular/router'; // Importation du type CanActivateFn et de Router pour gérer la navigation
import { AuthService } from '../services/auth.service';  // Importation du service AuthService qui gère l'authentification

// Définition du guard sous forme de fonction, de type CanActivateFn
export const authGuard: CanActivateFn = (route, state) => {
  // Injection du service AuthService pour vérifier si l'utilisateur est authentifié
  const authService = inject(AuthService);

  // Injection du service Router pour rediriger l'utilisateur si nécessaire
  const router = inject(Router);

  // Vérifie si l'utilisateur est authentifié en utilisant la méthode isAuthenticated() du service AuthService
  if (authService.isAuthenticated()) {
    return true; // Si l'utilisateur est authentifié, on lui permet d'accéder à la route
  }

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  return router.createUrlTree(['/login']);
};
