import { combineReducers } from '@ngrx/store';
import { storeReducer } from './store.reducer';
import { saleReducer } from './sale.reducer';

export const reducer = combineReducers({
  store: storeReducer,
  sale: saleReducer,
});
