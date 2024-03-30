import { createAction, props, Store } from '@ngrx/store';
import { Store as Bank } from '../../store/models/domain/store';

export const createStore = createAction(
  '[Create Store] Store',
  props<{ store: Bank }>()
);
export const storeCreated = createAction(
  '[Store Created] Store',
  props<{ store: Bank }>()
);
export const storesLoaded = createAction(
  '[Store Loaded] Store',
  props<{ store: Bank[] }>()
);

export const storeLoaded = createAction(
  '[Store Loaded] Store',
  props<{ store: Bank }>()
);
export const updateStore = createAction(
  '[Update Store] Store',
  props<{ id: string; store: Bank }>()
);
export const getStore = createAction('[Get Store] Store');

export const getStores = createAction(
  '[Get Stores] Store',
  props<{ stores: Bank[] }>()
);
