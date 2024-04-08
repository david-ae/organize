import { combineReducers } from '@ngrx/store';
import { storeReducer } from './store.reducer';
import { saleReducer } from './sale.reducer';
import { categoryReducer } from './category.reducer';

export const reducer = combineReducers({
  store: storeReducer,
  sale: saleReducer,
  category: categoryReducer,
});
