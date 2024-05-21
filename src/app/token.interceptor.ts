import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const access_token = localStorage.getItem('ACCESS_TOKEN');

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.refreshToken$.next(true);
      }
      return throwError(() => error);
    })
  );
};
