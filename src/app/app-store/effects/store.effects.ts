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

  createStore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.createStore),
      mergeMap((action) =>
        this.storeService.createStore(action.store).pipe(
          map((store) => storeActions.storeCreated({ payload: store })),
          tap(() => this.router.navigate(['/store/dashboard'])),
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
            this.toastrService.success(
              'Your inventory was updated successfully'
            )
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

  getStoreByEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.loadStoreByEmail),
      exhaustMap((action) =>
        this.storeService.getStoreByEmail(action.email).pipe(
          map((store) => storeActions.signedIn({ payload: store })),
          tap(() => this.router.navigate(['/store/dashboard'])),
          catchError(() => {
            this.toastrService.error('Unable to retrieve your store');
            return of(storeActions.loadStoreException());
          })
        )
      )
    )
  );

  closeSpinner$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          storeActions.storeLoaded,
          storeActions.loadStoreException,
          storeActions.signedIn,
          storeActions.storeCreated
        ),
        tap((action) => this.spinnerService.hide())
      ),
    { dispatch: false }
  );
}
