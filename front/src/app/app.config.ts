// Importation des modules nécessaires d'Angular
import { ApplicationConfig } from '@angular/core';  // Type pour la configuration de l'application Angular
import { provideRouter } from '@angular/router';    // Fournisseur pour configurer le routeur Angular
import { routes } from './app.routes';               // Import des routes définies dans le fichier 'app.routes.ts'
import { provideHttpClient } from '@angular/common/http'; // Fournisseur pour la configuration du client HTTP Angular

// Définition de la configuration de l'application Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Fournisseur pour configurer le routeur avec les routes spécifiées dans 'app.routes.ts'
    provideRouter(routes),

    // Fournisseur pour configurer le client HTTP Angular
    provideHttpClient()
  ]
};
