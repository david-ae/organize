import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addItem } from '../actions/item.actions';
import { tap } from 'rxjs';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions) {}

  addItem$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addItem),
        tap(() => console.log('Add item to store'))
      ),
    { dispatch: false }
  );
}
