import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Sale } from '../../store/models/domain/sale';
import * as SaleActions from './../actions/sale.actions';

export interface SaleState {
  isLoading: boolean;
  sales: Sale[];
}

export const initialSaleStore: SaleState = {
  isLoading: false,
  sales: [],
};

const saleFeatureState = createFeatureSelector<SaleState>('sale');

export const getSales = createSelector(
  saleFeatureState,
  (state) => state.sales
);

export const getSaleIsLoadingState = createSelector(
  saleFeatureState,
  state => state.isLoading
)

export const saleFeature = createFeature({
  name: saleFeatureState.name,
  reducer: createReducer(
    initialSaleStore,
    on(SaleActions.salesLoaded, (state, action) => {
      return {
        ...state,
        isLoading: false,
        sales: action.payload,
      };
    }),
    on(SaleActions.saleLoaded, (state, action) =>{
      return {
        ...state,
        isLoading: false,
        sales: [...state.sales, action.payload]
      }
    })
  ),
});

export const {
  name: saleFeatureKey,
  reducer: saleReducer,
  selectSales,
  selectIsLoading
} = saleFeature;
