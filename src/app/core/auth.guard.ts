import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUserValue;
  if (currentUser) {
    const expectedRoles = route.data['roles'] as Array<string>;
    if (expectedRoles && !expectedRoles.includes(currentUser.role)) {
      router.navigate(['/']);
      return false;
    }
    return true;
  }

  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
