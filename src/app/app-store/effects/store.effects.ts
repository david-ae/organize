import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { loadStoreException, storeLoaded } from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
import { Router } from '@angular/router';
import * as storeActions from './../actions/store.actions';
@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private router: Router
  ) {}

  getStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadStore),
      mergeMap((action) =>
        this.storeService.getStore(action.id).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          catchError(() => of(loadStoreException()))
        )
      )
    )
  );

  createStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.createStore),
      mergeMap((action) =>
        this.storeService.createStore(action.store).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          catchError(() => of(storeActions.loadStoreException()))
        )
      )
    )
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
