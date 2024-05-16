import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
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
