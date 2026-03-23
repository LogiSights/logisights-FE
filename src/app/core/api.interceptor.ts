import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { delay } from 'rxjs/operators';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.currentUserValue ? authService.currentUserValue.id : null;

  let newReq = req;
  if (token) {
    newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  // Add artificial delay to all requests to simulate network loading
  return next(newReq).pipe(delay(800));
};
