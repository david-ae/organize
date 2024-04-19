import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addItem } from '../actions/item.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as storeActions from './../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ItemEffects {
  constructor(
    private actions$: Actions,
    private storeService: StoreService,
    private toastrService: ToastrService
  ) {}

  addItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItem),
        tap(() => console.log('Add item to store'))
      ),
    { dispatch: false }
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
}
