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

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private spinnerService: NgxSpinnerService
  ) {}

  getStoreByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStoreByEmail),
      exhaustMap((action) =>
        this.authService.getStoreByEmail(action.email).pipe(
          map((store) => storeLoaded({ payload: store })),
          catchError(() => of(loadStoreException()))
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeLoaded),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
