import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  loadStore,
  loadStoreException,
  storeLoaded,
} from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';
@Injectable()
export class StoreEffects {
  constructor(private actions$: Actions, private storeService: StoreService) {}

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
}
