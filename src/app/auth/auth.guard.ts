import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let auth = inject(AuthService);
  let router = inject(Router);
  const authenticate = auth.isTokenValid();
  if (authenticate) {
    return true;
  }
  else {
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  }
}
