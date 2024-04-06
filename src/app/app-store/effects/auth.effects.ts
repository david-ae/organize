import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { mergeMap, map, catchError, of, exhaustMap } from 'rxjs';
import {
  loadStoreByEmail,
  storeLoaded,
  loadStoreException,
} from '../actions/store.actions';

export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
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
}
