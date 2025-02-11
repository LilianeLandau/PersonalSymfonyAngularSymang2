// Mettre à jour les routes
// src/app/app.routes.ts
// Importation des modules nécessaires d'Angular
import { Routes } from '@angular/router'; // Importation du type Routes qui permet de définir les chemins de l'application
import { LoginComponent } from './login/login.component'; // Importation du composant LoginComponent pour la page de connexion
import { WelcomeComponent } from './welcome/welcome.component'; // Importation du composant WelcomeComponent pour la page d'accueil après connexion
import { authGuard } from './guards/auth.guard'; // Importation du guard authGuard qui protège les routes nécessitant une authentification

// Définition des routes de l'application
export const routes: Routes = [
  // Route par défaut : redirige vers la page de login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Route pour la page de connexion, le composant LoginComponent sera affiché
  { path: 'login', component: LoginComponent },
  // Route protégée : nécessite l'authentification, le composant WelcomeComponent sera affiché uniquement si l'utilisateur est authentifié
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] }
];
