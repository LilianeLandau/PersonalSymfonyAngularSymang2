//modèle pour  l'utilisateur
//src/app/models/user.model.ts
// Déclaration de l'interface User qui représente les informations d'un utilisateur
export interface User {
  id: number;                  // Identifiant unique de l'utilisateur
  email: string;               // Adresse e-mail de l'utilisateur
  roles: string[];             // Liste des rôles de l'utilisateur (ex: ['ROLE_USER', 'ROLE_ADMIN'])
  userIdentifier: string;      // Identifiant de l'utilisateur (peut être un nom d'utilisateur ou autre identifiant)
}

// Déclaration de l'interface ApiResponse qui représente la réponse de l'API pour une liste d'utilisateurs
export interface ApiResponse {
  '@context': string;          // Contexte de l'API (informations de métadonnées)
  '@id': string;               // Identifiant de l'élément API
  '@type': string;             // Type de l'élément API
  totalItems: number;          // Nombre total d'éléments dans la réponse
  member: User[];              // Tableau des utilisateurs (membres) retournés dans la réponse
}
