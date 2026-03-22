import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const roleRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasRole('docente')) {
    return router.createUrlTree(['/docente']);
  }

  if (authService.hasRole('studente')) {
    return router.createUrlTree(['/studente']);
  }

  return router.createUrlTree(['/accesso-negato']);
};
