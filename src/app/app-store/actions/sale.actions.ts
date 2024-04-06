import { createAction, props } from '@ngrx/store';
import { Sale } from '../../store/models/domain/sale';

export const createSale = createAction(
  '[Create Sale] Sale',
  props<{ sale: Sale }>()
);

export const getSales = createAction(
  '[Get Sales] Sale',
  props<{ storeId: string }>()
);

export const salesLoaded = createAction(
  '[Sales Loaded] Sale',
  props<{ payload: Sale[] }>()
);
export const saleLoaded = createAction(
  '[Sale Loaded] Sale',
  props<{ payload: Sale }>()
);

export const loadSaleException = createAction('[Load Store] Store');
