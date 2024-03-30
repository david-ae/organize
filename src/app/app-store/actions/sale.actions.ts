import { createAction, props } from '@ngrx/store';
import { Sale } from '../../store/models/domain/sale';

export const createSale = createAction(
  '[Create Sale] Sale',
  props<{ sale: Sale }>()
);
