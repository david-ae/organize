import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import * as storeActions from './../actions/store.actions';
import * as authActions from './../actions/auth.actions';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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

  loadStoreByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loadStoreByEmail),
      exhaustMap((action) =>
        this.authService.loadStoreByEmail(action.email).pipe(
          map((storedetails) =>
            authActions.loadStore({ payload: storedetails })
          ),
          catchError(() => {
            this.toastrService.error('Unable to load your store');
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
            this.toastrService.error(
              'Invalid Credentials. Please check you email or password'
            );
            return of(authActions.loadAuthException());
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap((action) =>
        this.authService.logout(action.payload).pipe(
          map(() => authActions.loggedOut()),
          catchError(() => {
            this.toastrService.error(`Unable to logyou out`);
            return of(authActions.loadAuthException());
          })
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authActions.loadAuthException,
          authActions.signedIn,
          authActions.loadStore
        ),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
