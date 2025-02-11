//modèle pour l'authentification
// src/app/models/auth.model.ts
// Déclaration de l'interface LoginRequest qui représente la requête pour une authentification
export interface LoginRequest {
  username: string;           // Nom d'utilisateur de l'utilisateur
  password: string;           // Mot de passe de l'utilisateur
}

// Déclaration de l'interface LoginResponse qui représente la réponse de l'API lors de l'authentification
export interface LoginResponse {
  token: string;              // Jeton d'authentification retourné par l'API
}
