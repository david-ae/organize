import { createAction, props, Store } from '@ngrx/store';
import { Store as Bank } from '../../store/models/domain/store';
import { StoreDto } from '../../store/models/valueobjects/store.dto';

export const createStore = createAction(
  '[Create Store] Store',
  props<{ store: StoreDto }>()
);

export const storeCreated = createAction(
  '[Store Created] Store',
  props<{ store: Store }>()
);

export const loadStores = createAction('[Load Stores] Store');

export const storesLoaded = createAction(
  '[Stores Loaded] Store',
  props<{ store: Bank[] }>()
);

export const loadStoresException = createAction('[Load Store Exception] Store');

//#region Load Store
export const loadStore = createAction(
  '[Load Store] Store',
  props<{ id: string }>()
);

export const loadStoreByEmail = createAction(
  '[Load Store] Store',
  props<{ email: string }>()
);

export const storeLoaded = createAction(
  '[Store Loaded] Store',
  props<{ payload: Bank }>()
);

export const loadStoreException = createAction('[Load Store] Store');
//#endregion
export const updateStore = createAction(
  '[Update Store] Store',
  props<{ id: string; store: Bank }>()
);

export const getStore = createAction(
  '[Get Store] Store',
  props<{ id: string }>()
);

export const getStores = createAction(
  '[Get Stores] Store',
  props<{ stores: Bank[] }>()
);
