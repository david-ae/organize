import { isDevMode } from '@angular/core';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import { reducer } from '../app-store/reducers/app.reducer';
import { AppState } from '../app.state';
import { saleReducer } from '../app-store/reducers/sale.reducer';
import { storeReducer } from '../app-store/reducers/store.reducer';
import { LOGOUT } from '../app-store/actions/user.actions';
import { categoryReducer } from '../app-store/reducers/category.reducer';
import { userReducer } from '../app-store/reducers/user.reducer';

export interface State {}

export function clearStateMetaReducer<AppState extends {}>(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function clearStateFn(state: AppState | undefined, action: Action) {
    if (action.type === LOGOUT) {
      state = {} as AppState; // ==> Emptying state here
    }
    return reducer(state, action);
  };
}

export const reducers: ActionReducerMap<AppState> = {
  sale: saleReducer,
  store: storeReducer,
  category: categoryReducer,
  user: userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
