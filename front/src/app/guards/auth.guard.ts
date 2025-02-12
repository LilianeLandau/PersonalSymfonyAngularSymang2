import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Vérifier si l'utilisateur est authentifié
  if (authService.isAuthenticated()) {
    let roles: string[] = [];

    // Safely parse roles from localStorage
    try {
      const rolesData = localStorage.getItem('roles');
      roles = rolesData ? JSON.parse(rolesData) : [];

      // Validate that roles is actually an array
      if (!Array.isArray(roles)) {
        console.error('Roles data is not an array:', roles);
        roles = [];
      }
    } catch (error) {
      console.error('Error parsing roles from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem('roles');
      roles = [];
    }

    // Check admin access for users route
    if (route.routeConfig?.path === 'users') {
      return roles.includes('ROLE_ADMIN')
        ? true
        : router.createUrlTree(['/welcome']);
    }

    return true; // Allow access to other routes
  }

  // Redirect to login if not authenticated
  return router.createUrlTree(['/login']);
};
