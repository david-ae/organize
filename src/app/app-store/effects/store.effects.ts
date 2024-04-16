import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { loadStoreException, storeLoaded } from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
import { Router } from '@angular/router';
import * as storeActions from './../actions/store.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  getStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadStore),
      exhaustMap((action) =>
        this.storeService.getStore(action.id).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          catchError(() => {
            this.toastrService.error('Unable to retrieve your store');
            return of(storeActions.loadStoreException());
          })
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
          tap(() =>
            this.toastrService.success('Your has be created. Congratulations')
          ),
          catchError(() => {
            this.toastrService.error(
              'Unable to create your store. Please try again'
            );
            return of(storeActions.loadStoreException());
          })
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
          tap(() =>
            this.toastrService.success('Your was updated successfully')
          ),
          catchError(() => {
            this.toastrService.error(
              'Unable to update your store. Please try again'
            );
            return of(storeActions.loadStoreException());
          })
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
            tap(() =>
              this.toastrService.success('Categories added to your store')
            ),
            catchError(() => {
              this.toastrService.error('Categories not added to your store');
              return of(storeActions.loadStoreException());
            })
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
          tap(() => this.toastrService.success('Item added to your store')),
          catchError(() => {
            this.toastrService.error('Unable to add item to your store');
            return of(storeActions.loadStoreException());
          })
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
        ofType(storeActions.storeLoaded, storeActions.loadStoreException),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
