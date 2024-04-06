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
  sales: Sale[];
}

export const initialSaleStore: SaleState = {
  sales: [],
};

const saleFeatureState = createFeatureSelector<SaleState>('sale');

export const getSales = createSelector(
  saleFeatureState,
  (state) => state.sales
);

export const saleFeature = createFeature({
  name: saleFeatureState.name,
  reducer: createReducer(
    initialSaleStore,
    on(SaleActions.salesLoaded, (state, action) => {
      return {
        ...state,
        sales: action.payload,
      };
    }),
    on(SaleActions.saleLoaded, (state, action) =>{
      return {
        ...state,
        sales: [...state.sales, action.payload]
      }
    })
  ),
});

export const {
  name: saleFeatureKey,
  reducer: saleReducer,
  selectSales,
} = saleFeature;