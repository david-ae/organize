import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { StoreService } from '../../store/services/store.service';
import { Router } from '@angular/router';
import * as storeActions from './../actions/store.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ItemUpdate } from '../enum/item-update.enum';
@Injectable()
export class StoreEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private toastrService: ToastrService
  ) {}

  updateStoreInventory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeActions.updateStoreInventory),
      mergeMap((action) =>
        this.storeService.updateStoreInventory(action.id, action.store).pipe(
          map((store) => storeActions.storeLoaded({ payload: store })),
          tap(() => {
            if (action.updateType === ItemUpdate.UpdateItem) {
              this.toastrService.success(
                'Your inventory was updated successfully'
              );
            } else {
              this.toastrService.success('Restock successful');
            }
          }),
          catchError(() => {
            if (action.updateType === ItemUpdate.UpdateItem) {
              this.toastrService.error(
                'Unable to update your store. Please try again'
              );
            } else {
              this.toastrService.error(
                'Unable to restock item. Please try again'
              );
            }
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
