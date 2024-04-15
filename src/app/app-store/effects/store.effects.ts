import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { loadStoreException, storeLoaded } from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
import { Router } from '@angular/router';
import * as storeActions from './../actions/store.actions';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}

  getStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadStore),
      exhaustMap((action) =>
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

  updateStoreInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.updateStoreInventory),
      mergeMap((action) =>
        this.storeService.updateStoreInventory(action.id, action.store).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          catchError(() => of(storeActions.loadStoreException()))
        )
      )
    )
  );

  addCategoriesToStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addCategoriesToStore),
      mergeMap((action) =>
        this.storeService
          .addCategoriesToStore(action.id, action.categories)
          .pipe(
            map((store) => storeActions.storeLoaded({ payload: store })),
            catchError(() => of(loadStoreException()))
          )
      )
    )
  );

  addItemToStoreInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.addItemToStoreInventory),
      mergeMap((action) =>
        this.storeService.addItemToStoreInventory(action.id, action.item).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          catchError(() => of(loadStoreException()))
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

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(storeActions.storeLoaded),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
