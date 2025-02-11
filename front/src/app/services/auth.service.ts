// Créer un service d'authentification
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core'; // Importe le décorateur Injectable d'Angular
import { HttpClient } from '@angular/common/http'; // Importe HttpClient pour effectuer des requêtes HTTP
import { BehaviorSubject, Observable, tap } from 'rxjs'; // Importe BehaviorSubject, Observable et tap de RxJS
import { LoginRequest, LoginResponse } from '../models/auth.model'; // Importe les interfaces LoginRequest et LoginResponse

@Injectable({providedIn: 'root'}) // Déclare le service comme étant injectable partout dans l'application
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL de base de l'API d'authentification
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Crée un BehaviorSubject pour l'état d'authentification
isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Expose le BehaviorSubject comme un Observable

constructor(private http: HttpClient) {
  // Vérifie si un token existe au démarrage de l'application
const token = localStorage.getItem('token');
this.isAuthenticatedSubject.next(!!token);
}

login(credentials: LoginRequest): Observable<LoginResponse> { // Déclare la méthode login qui renvoie un Observable de type LoginResponse
  return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials) // Effectue une requête POST à l'API de login
  .pipe(tap((response) => { // Utilise l'opérateur tap pour effectuer des actions supplémentaires
    if(response.token){ // Si la réponse contient un token
    localStorage.setItem('token', response.token); // Stocke le token dans le localStorage
    this.isAuthenticatedSubject.next(true); // Met à jour le BehaviorSubject pour indiquer que l'utilisateur est authentifié
    }
  }));
}

logout(): void { // Déclare la méthode logout
  localStorage.removeItem('token'); // Supprime le token du localStorage
  this.isAuthenticatedSubject.next(false); // Met à jour le BehaviorSubject pour indiquer que l'utilisateur n'est plus authentifié
}

isAuthenticated(): boolean { // Déclare la méthode isAuthenticated
  return this.isAuthenticatedSubject.value; // Renvoie la valeur actuelle du BehaviorSubject
}
}

