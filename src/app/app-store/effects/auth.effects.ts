import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as storeActions from './../actions/store.actions';
import * as authActions from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private spinnerService: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.createStore),
      mergeMap((action) =>
        this.authService.signUp(action.onboard).pipe(
          map((response) => authActions.signUp({ payload: response })),
          catchError(() => {
            this.toastrService.error(
              'Unable to create your store. Please try again'
            );
            return of(authActions.loadAuthException());
          })
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signIn),
      exhaustMap((action) =>
        this.authService.signIn(action.credentials).pipe(
          map((store) => authActions.signedIn({ payload: store })),
          catchError(() => {
            this.toastrService.error('Unable to retrieve your store');
            return of(authActions.loadAuthException());
          })
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeActions.storeLoaded, storeActions.loadStoreException),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeActions.storeLoaded),
        tap((action) => this.router.navigate(['/store/dashboard']))
      ),
    { dispatch: false }
  );
}
