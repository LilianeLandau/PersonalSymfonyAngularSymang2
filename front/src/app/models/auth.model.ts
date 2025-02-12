// src/app/models/auth.model.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  roles: string[];
  redirectUrl: string;
  email: string;
}
