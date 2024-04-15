import { createAction, props } from '@ngrx/store';
import { CreateSale, Sale } from '../../store/models/domain/sale';

// export const createSale = createAction(
//   '[Create Sale] Sale',
//   props<{ id: string; sale: Sale }>()
// );

export const createSales = createAction(
  '[Create Sale] Sale',
  props<{ sales: CreateSale[] }>()
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

export const loadSpinner = createAction(
  '[Load Spinner] Sale',
  props<{ isLoaded: boolean }>()
);

export const salesCreated = createAction('[Sale Created] Sale');

export const loadSaleException = createAction('[Load Sale] Sale');
