import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer } from '../app-store/reducers/app.reducer';
import { AppState } from '../app.state';
import { saleReducer } from '../app-store/reducers/sale.reducer';
import { storeReducer } from '../app-store/reducers/store.reducer';

export interface State {}

export const reducers: ActionReducerMap<AppState> = {
  sale: saleReducer,
  store: storeReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
