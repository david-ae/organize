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
  isLoading: boolean;
  stores: Store[];
  store: Store;
}

export const initialStoreState: StoreState = {
  isLoading: false,
  store: {
    email: '',
    inventory: [],
    phoneNumber: '',
    name: '',
    address: '',
    categories: [],
  },
  stores: [],
};

const storeFeatureState = createFeatureSelector<StoreState>('store');

export const getStoreDetails = createSelector(
  storeFeatureState,
  (state) => state.store
);

export const getStoreInventory = createSelector(
  storeFeatureState,
  (state) => state.store.inventory
);

export const getAllStore = createSelector(
  storeFeatureState,
  (state) => state.stores
);

export const getStoreIsLoadingState = createSelector(
  storeFeatureState,
  (state) => state.isLoading
);

export const storeFeature = createFeature({
  name: storeFeatureState.name,
  reducer: createReducer(
    initialStoreState,
    on(storeActions.updateStore, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(storeActions.updateStoreInventory, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(storeActions.getStore, (state, action) => {
      return {
        ...state,
        isLoading: false,
      };
    }),
    on(storeActions.storeLoaded, (state, action) => {
      return {
        ...state,
        isLoading: false,
        store: action.payload,
      };
    }),
    on(storeActions.loadSpinner, (state, action) => {
      return {
        ...state,
        isLoading: action.isLoaded,
      };
    })
  ),
});

export const {
  name: storeFeatureKey,
  reducer: storeReducer,
  selectStore,
  selectStores,
  selectIsLoading,
} = storeFeature;
