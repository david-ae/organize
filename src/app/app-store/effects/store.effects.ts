import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, of } from 'rxjs';
import { getStore, storesLoaded } from '../actions/store.actions';
import { StoreService } from '../../store/services/store.service';

@Injectable()
export class StoreEffects {
  constructor(private actions$: Actions, private storeService: StoreService) {}

  // loadAllStores$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getStore),
  //     exhaustMap(() => {
  //       return of(this.storeService
  //         .getStore())
  //         .pipe(map((areas) => storesLoaded( areas )));
  //     })
  //   );
  // });
}
