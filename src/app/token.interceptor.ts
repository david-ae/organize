import { AppState } from './app.state';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { catchError, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './store/models/domain/user';
import * as storeActions from './app-store/actions/store.actions';
import * as userActions from './app-store/actions/user.actions';
import { Store } from '@ngrx/store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);

  let request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
    },
  });
  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          const userId = (
            JSON.parse(localStorage.getItem('store_user') as string) as User
          ).id;
          const refresh_token = localStorage.getItem('REFRESH_TOKEN');
          return authService
            .refreshToken(userId as string, refresh_token as string)
            .pipe(
              switchMap((response) => {
                if (response) {
                  authService.user_id = response?.user.id;
                  authService.saveToLocalStorage(
                    authService.ACCESS_TOKEN,
                    response?.tokens.access_token
                  );
                  authService.saveToLocalStorage(
                    authService.REFRESH_TOKEN,
                    response?.tokens.refresh_token
                  );
                  authService.saveToLocalStorage(
                    authService.store_user,
                    JSON.stringify(response?.user)
                  );

                  store.dispatch(
                    storeActions.storeLoaded({ payload: response.store })
                  );
                  store.dispatch(
                    userActions.userLoaded({
                      payload: {
                        id: response?.user.id,
                        email: response?.user.email,
                        storeId: response?.store.id,
                        name: `${response?.user.firstName} ${response?.user.lastName}`,
                      },
                    })
                  );
                }

                return next(
                  request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${localStorage.getItem(
                        'ACCESS_TOKEN'
                      )}`,
                    },
                  })
                );
              })
            );
        }
      }

      return next(request);
    })
  );
};
