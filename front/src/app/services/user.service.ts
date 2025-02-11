//créer le service UserService
// src/app/services/user.service.ts
import { Injectable } from '@angular/core'; // Importe le décorateur Injectable d'Angular
import { HttpClient } from '@angular/common/http'; // Importe HttpClient pour effectuer des requêtes HTTP
import { Observable } from 'rxjs'; // Importe Observable de RxJS
import { ApiResponse } from '../models/user.model'; // Importe l'interface ApiResponse

@Injectable({ providedIn: 'root' }) // Déclare le service comme étant injectable partout dans l'application
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users'; // URL de l'API utilisateur

  constructor(private http: HttpClient) {} // Injection du service HttpClient dans le constructeur

  getUsers(): Observable<ApiResponse> { // Déclaration de la méthode getUsers qui renvoie un Observable d'ApiResponse
    return this.http.get<ApiResponse>(this.apiUrl); // Effectue une requête GET à l'API et renvoie la réponse
  }
}
