import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { mergeMap, map, catchError, of, exhaustMap, tap } from 'rxjs';
import {
  loadStoreByEmail,
  storeLoaded,
  loadStoreException,
} from '../actions/store.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import * as storeActions from './../actions/store.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) {}

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
