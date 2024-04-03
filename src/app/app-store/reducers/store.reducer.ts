import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Store } from '../../store/models/domain/store';
import * as storeActions from '../actions/store.actions';

export interface StoreState {
  stores: Store[];
  store: Store;
}

export const initialStoreState: StoreState = {
  store: {
    email: '',
    inventory: [],
    phoneNumber: '',
    storename: '',
    categories: [],
    users: [],
  },
  stores: [],
};

const storeFeatureState = createFeatureSelector<StoreState>('store');

export const getStoreDetails = createSelector(
  storeFeatureState,
  (state) => state.store
);

export const getAllStore = createSelector(
  storeFeatureState,
  (state) => state.stores
);

export const storeFeature = createFeature({
  name: storeFeatureState.name,
  reducer: createReducer(
    initialStoreState,
    on(storeActions.createStore, (state, action) => {
      return {
        ...state,
        store: action.store,
      };
    }),
    on(storeActions.updateStore, (state, action) => {
      return {
        ...state,
      };
    }),
    on(storeActions.getStore, (state, action) => {
      return {
        ...state,
      };
    }),
    on(storeActions.storeLoaded, (state, action) => {
      return {
        ...state,
        store: action.payload,
      };
    })
  ),
});

export const {
  name: storeFeatureKey,
  reducer: storeReducer,
  selectStore,
  selectStores,
} = storeFeature;
