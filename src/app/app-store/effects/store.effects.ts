import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  loadStore,
  loadStoreException,
  storeLoaded,
} from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
import { Router } from '@angular/router';
@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private router: Router
  ) {}

  getStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStore),
      mergeMap((action) =>
        this.storeService.getStore(action.id).pipe(
          map((store) => storeLoaded({ payload: store })),
          catchError(() => of(loadStoreException()))
        )
      )
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeLoaded),
        tap((action) => this.router.navigate(['/store/dashboard']))
      ),
    { dispatch: false }
  );
}
