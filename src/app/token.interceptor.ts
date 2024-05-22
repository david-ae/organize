import { AppState } from './app.state';
import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Store } from '@ngrx/store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);

  const access_token = localStorage.getItem('ACCESS_TOKEN');

  const cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const newRequest = cloneRequest.clone({
          setHeaders: {
            Authorization: `Bearer ${authService.REFRESH_TOKEN}`,
          },
        });
        return next(newRequest);
      }
      authService.refreshToken().subscribe((value) => console.log(value));
      return next(cloneRequest);
    })
  );
};
